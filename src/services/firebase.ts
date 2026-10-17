import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  addDoc,
  collection, 
  getDocs, 
  getDocFromServer,
  onSnapshot, 
  type Firestore,
  type Unsubscribe
} from 'firebase/firestore';
import defaultConfig from '../../firebase-applet-config.json';
import { UserStats, UserStatsManager } from '../utils/userStats.ts';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: false,
      isAnonymous: true,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const FIREBASE_CONFIG_STORAGE_KEY = 'm114a1_artillery_custom_firebase_config_v1';

export interface FirebaseClientConfig {
  apiKey: string;
  authDomain?: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  firestoreDatabaseId?: string;
}

class FirebaseSyncService {
  private app: FirebaseApp | null = null;
  private db: Firestore | null = null;
  private isConnected = false;
  private connectionError: string | null = null;
  private lastSyncTime: Date | null = null;
  private statusListeners: Array<(status: { isConnected: boolean; error: string | null; lastSync: Date | null }) => void> = [];

  constructor() {
    this.initialize();
  }

  public getStoredConfig(): FirebaseClientConfig | null {
    if (typeof window === 'undefined') return null;
    try {
      const custom = localStorage.getItem(FIREBASE_CONFIG_STORAGE_KEY);
      if (custom) {
        const parsed = JSON.parse(custom);
        if (parsed && parsed.projectId) return parsed;
      }
    } catch {
      // ignore
    }

    // Fall back to firebase-applet-config.json if it has a projectId
    if (defaultConfig && defaultConfig.projectId && defaultConfig.projectId !== 'remixed-project-id') {
      return defaultConfig as FirebaseClientConfig;
    }

    // Check Vite env
    if (import.meta.env.VITE_FIREBASE_PROJECT_ID) {
      return {
        apiKey: (import.meta.env.VITE_FIREBASE_API_KEY as string) || '',
        authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string) || '',
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
        appId: (import.meta.env.VITE_FIREBASE_APP_ID as string) || '',
        firestoreDatabaseId: '(default)'
      };
    }

    return null;
  }

  public setCustomConfig(cfg: FirebaseClientConfig | null) {
    if (typeof window === 'undefined') return;
    if (!cfg) {
      localStorage.removeItem(FIREBASE_CONFIG_STORAGE_KEY);
    } else {
      localStorage.setItem(FIREBASE_CONFIG_STORAGE_KEY, JSON.stringify(cfg));
    }
    this.initialize();
  }

  public initialize(): boolean {
    const config = this.getStoredConfig();
    if (!config || !config.projectId) {
      this.app = null;
      this.db = null;
      this.isConnected = false;
      this.connectionError = null;
      this.notifyStatus();
      return false;
    }

    try {
      if (getApps().length > 0) {
        this.app = getApp();
      } else {
        this.app = initializeApp(config);
      }
      this.db = getFirestore(this.app, config.firestoreDatabaseId || '(default)');
      this.testConnection();
      return true;
    } catch (e: any) {
      console.warn('Firebase init warning:', e);
      this.connectionError = e?.message || '初始化失敗';
      this.isConnected = false;
      this.notifyStatus();
      return false;
    }
  }

  private async testConnection() {
    if (!this.db) return;
    try {
      // Per Firestore spec: test server connectivity
      await getDocFromServer(doc(this.db, 'leaderboard', '__test_ping__'));
      this.isConnected = true;
      this.connectionError = null;
    } catch (error: any) {
      // If the named database was not found, attempt falling back to '(default)'
      if (error && (error.code === 'not-found' || error.message?.includes('Database not found') || error.message?.includes('database was not found'))) {
        if (this.app) {
          try {
            this.db = getFirestore(this.app, '(default)');
            await getDocFromServer(doc(this.db, 'leaderboard', '__test_ping__'));
            this.isConnected = true;
            this.connectionError = null;
            this.notifyStatus();
            return;
          } catch (innerError: any) {
            if (innerError && (innerError.code === 'permission-denied' || innerError.message?.includes('Missing or insufficient permissions'))) {
              this.isConnected = true;
              this.connectionError = null;
              this.notifyStatus();
              return;
            }
          }
        }
      }

      // Permission denied is also an indicator that Firestore server is reachable
      if (error && (error.code === 'permission-denied' || error.message?.includes('Missing or insufficient permissions'))) {
        this.isConnected = true;
        this.connectionError = null;
      } else if (error && error.message?.includes('the client is offline')) {
        this.isConnected = false;
        this.connectionError = '離線中，請檢查網路連線或 Firebase 專案設定';
      } else {
        this.isConnected = true; // Still attempt writes/reads
        this.connectionError = null;
      }
    }
    this.notifyStatus();
  }

  public isReady(): boolean {
    return !!this.db;
  }

  public getStatus() {
    return {
      isConfigured: !!this.getStoredConfig(),
      isConnected: this.isConnected,
      error: this.connectionError,
      lastSync: this.lastSyncTime,
      projectId: this.getStoredConfig()?.projectId || null
    };
  }

  public onStatusChange(listener: (status: { isConnected: boolean; error: string | null; lastSync: Date | null }) => void) {
    this.statusListeners.push(listener);
    listener({
      isConnected: this.isConnected,
      error: this.connectionError,
      lastSync: this.lastSyncTime
    });
    return () => {
      this.statusListeners = this.statusListeners.filter(l => l !== listener);
    };
  }

  private notifyStatus() {
    const payload = {
      isConnected: this.isConnected,
      error: this.connectionError,
      lastSync: this.lastSyncTime
    };
    this.statusListeners.forEach(fn => fn(payload));
  }

  /**
   * Syncs a single student's updated stats to the cloud Firestore
   */
  public async syncUserToCloud(user: UserStats): Promise<boolean> {
    if (!this.db) return false;
    const sanitizedNick = user.nickname.trim();
    if (!sanitizedNick) return false;

    const payload = {
      nickname: sanitizedNick,
      totalPoints: user.totalPoints,
      singleCorrectCount: user.singleCorrectCount,
      multipleCorrectCount: user.multipleCorrectCount,
      totalTestsTaken: user.totalTestsTaken,
      formalExamsTaken: user.formalExamsTaken,
      formalExamsPassed: user.formalExamsPassed,
      totalWrongQuestionsCount: Object.keys(user.wrongQuestionHistory || {}).length,
      createdAt: user.createdAt || new Date().toISOString(),
      lastActiveAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(this.db, 'leaderboard', sanitizedNick), payload, { merge: true });
      this.lastSyncTime = new Date();
      this.isConnected = true;
      this.notifyStatus();
      return true;
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `leaderboard/${sanitizedNick}`);
      return false;
    }
  }

  /**
   * Records a test completion session to Firestore
   */
  public async recordTestSubmission(submission: {
    nickname: string;
    mode: string;
    modeName: string;
    scorePercent: number;
    pointsEarned: number;
    correctCount: number;
    totalQuestions: number;
  }): Promise<boolean> {
    if (!this.db) return false;
    try {
      await addDoc(collection(this.db, 'testSubmissions'), {
        nickname: submission.nickname.trim(),
        mode: submission.mode,
        modeName: submission.modeName,
        scorePercent: submission.scorePercent,
        pointsEarned: submission.pointsEarned,
        correctCount: submission.correctCount,
        totalQuestions: submission.totalQuestions,
        submittedAt: new Date().toISOString()
      });
      return true;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'testSubmissions');
      return false;
    }
  }

  /**
   * Subscribe to real-time leaderboard updates from Firestore.
   * When any student submits on their device, this triggers and updates local state.
   */
  public subscribeLeaderboard(onUpdate: (cloudList: any[]) => void): Unsubscribe | null {
    if (!this.db) return null;

    try {
      const unsub = onSnapshot(
        collection(this.db, 'leaderboard'),
        (snapshot) => {
          const list: any[] = [];
          snapshot.forEach((docSnap) => {
            if (docSnap.id === '__test_ping__') return;
            list.push(docSnap.data());
          });
          this.lastSyncTime = new Date();
          this.isConnected = true;
          this.notifyStatus();

          // Merge cloud users into local user storage seamlessly
          this.mergeCloudUsersToLocal(list);
          onUpdate(list);
        },
        (error) => {
          handleFirestoreError(error, OperationType.GET, 'leaderboard');
        }
      );
      return unsub;
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, 'leaderboard');
      return null;
    }
  }

  /**
   * Merge cloud ranking data into local localStorage
   */
  public mergeCloudUsersToLocal(cloudUsers: any[]) {
    if (!Array.isArray(cloudUsers) || cloudUsers.length === 0) return;
    const local = UserStatsManager.getAllUsers();
    let changed = false;

    cloudUsers.forEach((cu) => {
      if (!cu || !cu.nickname) return;
      const nick = cu.nickname.trim();
      if (!local[nick]) {
        local[nick] = {
          nickname: nick,
          totalPoints: Number(cu.totalPoints || 0),
          singleCorrectCount: Number(cu.singleCorrectCount || 0),
          multipleCorrectCount: Number(cu.multipleCorrectCount || 0),
          totalTestsTaken: Number(cu.totalTestsTaken || 0),
          formalExamsTaken: Number(cu.formalExamsTaken || 0),
          formalExamsPassed: Number(cu.formalExamsPassed || 0),
          createdAt: cu.createdAt || new Date().toISOString(),
          lastActiveAt: cu.lastActiveAt || new Date().toISOString(),
          wrongQuestionHistory: {},
          historyList: []
        };
        changed = true;
      } else {
        // If cloud points are higher or more recent tests taken, update local points
        if (Number(cu.totalPoints || 0) > local[nick].totalPoints) {
          local[nick].totalPoints = Number(cu.totalPoints);
          local[nick].singleCorrectCount = Math.max(local[nick].singleCorrectCount, Number(cu.singleCorrectCount || 0));
          local[nick].multipleCorrectCount = Math.max(local[nick].multipleCorrectCount, Number(cu.multipleCorrectCount || 0));
          local[nick].totalTestsTaken = Math.max(local[nick].totalTestsTaken, Number(cu.totalTestsTaken || 0));
          local[nick].formalExamsTaken = Math.max(local[nick].formalExamsTaken, Number(cu.formalExamsTaken || 0));
          local[nick].formalExamsPassed = Math.max(local[nick].formalExamsPassed, Number(cu.formalExamsPassed || 0));
          local[nick].lastActiveAt = cu.lastActiveAt || local[nick].lastActiveAt;
          changed = true;
        }
      }
    });

    if (changed) {
      UserStatsManager.saveAllUsers(local);
    }
  }

  /**
   * Push all local users to cloud (Batch initial sync)
   */
  public async pushAllLocalUsersToCloud(): Promise<{ count: number; error?: string }> {
    if (!this.db) {
      return { count: 0, error: 'Firebase 尚未連線，請先設定' };
    }
    const all = UserStatsManager.getAllUsers();
    const users = Object.values(all);
    let successCount = 0;

    for (const u of users) {
      try {
        await this.syncUserToCloud(u);
        successCount++;
      } catch (e: any) {
        console.error(`Failed to sync user ${u.nickname}`, e);
      }
    }
    return { count: successCount };
  }
}

export const firebaseSync = new FirebaseSyncService();
