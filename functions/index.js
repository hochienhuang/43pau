const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.onNewSubmission = functions.firestore
  .document("testSubmissions/{submissionId}")
  .onCreate(async (snap) => {
    const sub = snap.data();
    if (!sub || !sub.nickname) return null;

    const lbRef = db.doc(`leaderboard/${sub.nickname}`);
    const points = typeof sub.pointsEarned === "number" ? sub.pointsEarned : 0;

    return db.runTransaction(async (t) => {
      const lbSnap = await t.get(lbRef);
      const now = admin.firestore.FieldValue.serverTimestamp();

      if (!lbSnap.exists) {
        t.set(lbRef, {
          nickname: sub.nickname,
          totalPoints: points,
          singleCorrectCount: sub.singleCorrectCount || 0,
          multipleCorrectCount: sub.multipleCorrectCount || 0,
          totalTestsTaken: 1,
          formalExamsTaken: 0,
          formalExamsPassed: 0,
          totalWrongQuestionsCount: 0,
          createdAt: now,
          lastActiveAt: now
        });
      } else {
        const data = lbSnap.data() || {};
        t.update(lbRef, {
          totalPoints: (data.totalPoints || 0) + points,
          totalTestsTaken: (data.totalTestsTaken || 0) + 1,
          lastActiveAt: now
        });
      }
    });
  });
