# Cloud Function: update leaderboard on new testSubmissions

This function listens to `testSubmissions` and updates `leaderboard/{nickname}` automatically.

## Deploy

```bash
cd functions
npm install
firebase deploy --only functions
firebase deploy --only firestore:rules
```

## Frontend

```js
import { uploadSubmission } from "./src/uploadSubmission";

await uploadSubmission({
  nickname: "alice",
  mode: "normal",
  modeName: "Normal",
  scorePercent: 85,
  pointsEarned: 85,
  correctCount: 17,
  totalQuestions: 20
});
```
