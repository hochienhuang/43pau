// client: src/uploadSubmission.js
// 呼叫此函式於考試結束時將 submission 上傳到 testSubmissions
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, enableIndexedDbPersistence } from "firebase/firestore";

const firebaseConfig = {
  // TODO: 把你的 Firebase config 填這裡
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 啟用離線持久化（若需要）
enableIndexedDbPersistence(db).catch((err) => {
  console.warn("IndexedDB persistence failed:", err);
});

// submission 範例:
// { nickname, mode, modeName, scorePercent, pointsEarned, correctCount, totalQuestions }
export async function uploadSubmission(submission) {
  if (!submission || !submission.nickname) {
    throw new Error("submission 必須包含 nickname");
  }
  const submissionsRef = collection(db, "testSubmissions");
  const payload = {
    ...submission,
    submittedAt: serverTimestamp()
  };
  const docRef = await addDoc(submissionsRef, payload);
  return docRef.id;
}
