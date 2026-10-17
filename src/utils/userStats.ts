export interface MissedQuestionRecord {
  key: string; // e.g. "single_1" or "multiple_2"
  questionId: number;
  type: 'single' | 'multiple';
  questionText: string;
  options: string[];
  correctAnswers: number[];
  missCount: number;
  lastMissedAt: string;
  source: string;
  difficulty: string;
  explanation?: string;
}

export interface TestHistoryEntry {
  id: string;
  mode: string; // 'formal' | 'single' | 'multiple' | 'all' | 'custom'
  modeName: string;
  scorePercent: number;
  pointsEarned: number;
  correctCount: number;
  totalQuestions: number;
  date: string;
}

export interface UserStats {
  nickname: string;
  totalPoints: number; // Single: +1, Multiple: +1.5
  singleCorrectCount: number;
  multipleCorrectCount: number;
  totalTestsTaken: number;
  formalExamsTaken: number;
  formalExamsPassed: number;
  createdAt: string;
  lastActiveAt: string;
  wrongQuestionHistory: Record<string, MissedQuestionRecord>;
  historyList: TestHistoryEntry[];
}

const STORAGE_KEY = 'm114a1_artillery_user_stats_v1';
const CURRENT_USER_KEY = 'm114a1_artillery_current_nickname_v1';
const GUEST_MODE_KEY = 'm114a1_artillery_guest_mode_v1';

export class UserStatsManager {
  static readonly GUEST_NICKNAME = '匿名訪客 (Guest)';

  static isGuestMode(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(GUEST_MODE_KEY) === 'true';
  }

  static setGuestMode(enabled: boolean) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(GUEST_MODE_KEY, enabled ? 'true' : 'false');
    if (enabled) {
      localStorage.setItem(CURRENT_USER_KEY, this.GUEST_NICKNAME);
      this.ensureUser(this.GUEST_NICKNAME);
    } else {
      if (localStorage.getItem(CURRENT_USER_KEY) === this.GUEST_NICKNAME) {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }
  }

  static getAllUsers(): Record<string, UserStats> {
    if (typeof window === 'undefined') return {};
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      return JSON.parse(raw);
    } catch (e) {
      console.error('Failed to load user stats from localStorage', e);
      return {};
    }
  }

  static saveAllUsers(data: Record<string, UserStats>) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save user stats', e);
    }
  }

  static getCurrentNickname(): string {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem(CURRENT_USER_KEY) || '';
  }

  static setCurrentNickname(nickname: string) {
    if (typeof window === 'undefined') return;
    const trimmed = nickname.trim();
    if (trimmed === this.GUEST_NICKNAME) {
      localStorage.setItem(GUEST_MODE_KEY, 'true');
    } else {
      localStorage.setItem(GUEST_MODE_KEY, 'false');
    }
    localStorage.setItem(CURRENT_USER_KEY, trimmed);
    if (trimmed) {
      this.ensureUser(trimmed);
    }
  }

  static ensureUser(nickname: string): UserStats {
    const all = this.getAllUsers();
    const trimmed = nickname.trim();
    if (!all[trimmed]) {
      all[trimmed] = {
        nickname: trimmed,
        totalPoints: 0,
        singleCorrectCount: 0,
        multipleCorrectCount: 0,
        totalTestsTaken: 0,
        formalExamsTaken: 0,
        formalExamsPassed: 0,
        createdAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
        wrongQuestionHistory: {},
        historyList: []
      };
      this.saveAllUsers(all);
    }
    return all[trimmed];
  }

  static migrateGuestToNickname(newNickname: string): UserStats | null {
    const trimmed = newNickname.trim();
    if (!trimmed || trimmed === this.GUEST_NICKNAME) return null;
    const all = this.getAllUsers();
    const guestUser = all[this.GUEST_NICKNAME];
    const targetUser = this.ensureUser(trimmed);

    if (guestUser && guestUser.totalPoints > 0) {
      targetUser.totalPoints = Number((targetUser.totalPoints + guestUser.totalPoints).toFixed(1));
      targetUser.singleCorrectCount += guestUser.singleCorrectCount;
      targetUser.multipleCorrectCount += guestUser.multipleCorrectCount;
      targetUser.totalTestsTaken += guestUser.totalTestsTaken;
      targetUser.formalExamsTaken += guestUser.formalExamsTaken;
      targetUser.formalExamsPassed += guestUser.formalExamsPassed;
      targetUser.lastActiveAt = new Date().toISOString();

      Object.entries(guestUser.wrongQuestionHistory || {}).forEach(([k, rec]) => {
        if (!targetUser.wrongQuestionHistory[k]) {
          targetUser.wrongQuestionHistory[k] = { ...rec };
        } else {
          targetUser.wrongQuestionHistory[k].missCount += rec.missCount;
          targetUser.wrongQuestionHistory[k].lastMissedAt = rec.lastMissedAt;
        }
      });

      all[this.GUEST_NICKNAME] = {
        nickname: this.GUEST_NICKNAME,
        totalPoints: 0,
        singleCorrectCount: 0,
        multipleCorrectCount: 0,
        totalTestsTaken: 0,
        formalExamsTaken: 0,
        formalExamsPassed: 0,
        createdAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
        wrongQuestionHistory: {},
        historyList: []
      };
    }

    all[trimmed] = targetUser;
    this.saveAllUsers(all);
    this.setGuestMode(false);
    this.setCurrentNickname(trimmed);
    return targetUser;
  }

  static getUser(nickname: string): UserStats | null {
    const all = this.getAllUsers();
    return all[nickname.trim()] || null;
  }

  static recordQuizCompletion(params: {
    nickname: string;
    mode: 'formal' | 'single' | 'multiple' | 'all' | 'custom';
    modeName: string;
    singleCorrect: number;
    multipleCorrect: number;
    wrongQuestions: {
      questionId: number;
      type: 'single' | 'multiple';
      questionText: string;
      options: string[];
      correctAnswers: number[];
      source: string;
      difficulty: string;
      explanation?: string;
    }[];
    totalQuestions: number;
    scorePercent: number;
  }): { pointsEarned: number; updatedStats: UserStats } {
    const trimmed = params.nickname.trim();
    const user = this.ensureUser(trimmed);

    // Scoring rule per user request:
    // 單選題答對一題 1 分，多選題 1.5 分，持續累積
    const pointsEarned = Number((params.singleCorrect * 1.0 + params.multipleCorrect * 1.5).toFixed(1));

    user.totalPoints = Number((user.totalPoints + pointsEarned).toFixed(1));
    user.singleCorrectCount += params.singleCorrect;
    user.multipleCorrectCount += params.multipleCorrect;
    user.totalTestsTaken += 1;
    user.lastActiveAt = new Date().toISOString();

    if (params.mode === 'formal') {
      user.formalExamsTaken += 1;
      if (params.scorePercent >= 70) {
        user.formalExamsPassed += 1;
      }
    }

    // Record or update missed questions
    const now = new Date().toISOString();
    params.wrongQuestions.forEach((wq) => {
      const key = `${wq.type}_${wq.questionId}`;
      if (!user.wrongQuestionHistory[key]) {
        user.wrongQuestionHistory[key] = {
          key,
          questionId: wq.questionId,
          type: wq.type,
          questionText: wq.questionText,
          options: wq.options,
          correctAnswers: wq.correctAnswers,
          missCount: 1,
          lastMissedAt: now,
          source: wq.source,
          difficulty: wq.difficulty,
          explanation: wq.explanation
        };
      } else {
        user.wrongQuestionHistory[key].missCount += 1;
        user.wrongQuestionHistory[key].lastMissedAt = now;
      }
    });

    // Record history entry
    user.historyList.unshift({
      id: `test_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      mode: params.mode,
      modeName: params.modeName,
      scorePercent: params.scorePercent,
      pointsEarned,
      correctCount: params.singleCorrect + params.multipleCorrect,
      totalQuestions: params.totalQuestions,
      date: now
    });

    // Limit history list to last 50 tests to keep storage light
    if (user.historyList.length > 50) {
      user.historyList = user.historyList.slice(0, 50);
    }

    const all = this.getAllUsers();
    all[trimmed] = user;
    this.saveAllUsers(all);

    return { pointsEarned, updatedStats: user };
  }

  static getAllNicknames(): string[] {
    const all = this.getAllUsers();
    return Object.keys(all).filter(n => n !== this.GUEST_NICKNAME);
  }

  static getLeaderboard(): (UserStats & { rank: number; totalWrongQuestionsCount: number })[] {
    const all = this.getAllUsers();
    const sorted = Object.values(all)
      .filter(u => u.nickname !== this.GUEST_NICKNAME)
      .sort((a, b) => {
        if (b.totalPoints !== a.totalPoints) {
          return b.totalPoints - a.totalPoints;
        }
        return b.totalTestsTaken - a.totalTestsTaken;
      });

    return sorted.map((user, idx) => ({
      ...user,
      rank: idx + 1,
      totalWrongQuestionsCount: Object.keys(user.wrongQuestionHistory || {}).length
    }));
  }

  static getPersonalWrongQuestions(nickname: string): MissedQuestionRecord[] {
    const user = this.getUser(nickname);
    if (!user || !user.wrongQuestionHistory) return [];
    return Object.values(user.wrongQuestionHistory).sort((a, b) => b.missCount - a.missCount);
  }

  static exportStatsJSON(): string {
    const all = this.getAllUsers();
    const ranked = this.getLeaderboard();
    const payload = {
      system: '155榴砲訓練與測考學習系統 (M114A1)',
      description: '砲手測考學員榮譽排行榜、累計積分與個人歷史錯題紀錄資料庫',
      exportedAt: new Date().toISOString(),
      scoringRules: {
        singleChoicePoints: 1.0,
        multipleChoicePoints: 1.5,
        pointsPolicy: '持續累積 (單選答對 1 分，多選答對 1.5 分，不扣分)'
      },
      formalExamStandard: {
        singleCount: 20,
        multipleCount: 10,
        totalQuestions: 30,
        maxPoints: 35.0,
        passingScorePercent: 70
      },
      summary: {
        totalLearners: Object.keys(all).length,
        totalPointsIssued: Number(ranked.reduce((acc, u) => acc + u.totalPoints, 0).toFixed(1)),
        totalTestsTaken: ranked.reduce((acc, u) => acc + u.totalTestsTaken, 0),
        totalFormalExamsTaken: ranked.reduce((acc, u) => acc + u.formalExamsTaken, 0)
      },
      leaderboard: ranked.map(u => ({
        rank: u.rank,
        nickname: u.nickname,
        totalPoints: u.totalPoints,
        singleCorrectCount: u.singleCorrectCount,
        multipleCorrectCount: u.multipleCorrectCount,
        totalTestsTaken: u.totalTestsTaken,
        formalExamsTaken: u.formalExamsTaken,
        formalExamsPassed: u.formalExamsPassed,
        totalMissedQuestionsRecorded: u.totalWrongQuestionsCount,
        lastActiveAt: u.lastActiveAt
      })),
      userDatabase: all
    };
    return JSON.stringify(payload, null, 2);
  }

  static exportUserStatsJSON(nickname: string): string {
    const user = this.getUser(nickname);
    if (!user) return JSON.stringify({ error: 'User not found' }, null, 2);
    const missed = this.getPersonalWrongQuestions(nickname);
    const payload = {
      user: user.nickname,
      totalPoints: user.totalPoints,
      singleCorrectCount: user.singleCorrectCount,
      multipleCorrectCount: user.multipleCorrectCount,
      totalTestsTaken: user.totalTestsTaken,
      formalExamsTaken: user.formalExamsTaken,
      formalExamsPassed: user.formalExamsPassed,
      lastActiveAt: user.lastActiveAt,
      wrongQuestionsSummary: {
        totalUniqueWrongQuestions: missed.length,
        totalMissOccurrences: missed.reduce((acc, q) => acc + q.missCount, 0),
        topMissedQuestions: missed.slice(0, 10).map(m => ({
          questionId: m.questionId,
          type: m.type,
          missCount: m.missCount,
          questionText: m.questionText,
          source: m.source
        }))
      },
      fullWrongQuestionHistory: missed
    };
    return JSON.stringify(payload, null, 2);
  }

  static importStatsJSON(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.userDatabase && typeof parsed.userDatabase === 'object') {
        this.saveAllUsers(parsed.userDatabase);
        return true;
      } else if (parsed && typeof parsed === 'object' && !parsed.userDatabase && !parsed.leaderboard) {
        this.saveAllUsers(parsed);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  }

  static clearStats() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  }
}

