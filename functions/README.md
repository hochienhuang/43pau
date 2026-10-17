# Cloud Function: update leaderboard on new testSubmissions

This folder contains a Cloud Function that listens for new documents in `testSubmissions` and updates the `leaderboard/{nickname}` document atomically.

Steps to deploy

1. Install dependencies

```bash
cd functions
npm install
```

2. Ensure Firebase CLI is installed and you're logged in

```bash
npm install -g firebase-tools
firebase login
```

3. Select your Firebase project (if needed)

```bash
firebase use --add
```

4. Deploy functions

```bash
firebase deploy --only functions
```

5. Deploy Firestore rules (if you want to apply the provided rules)

```bash
firebase deploy --only firestore:rules
```

Frontend usage

- Add `src/uploadSubmission.js` to your web app and fill `firebaseConfig` with your project's config.
- Call `uploadSubmission(submission)` when the exam finishes. The function will write to `testSubmissions` and the Cloud Function will update `leaderboard`.

Notes

- Cloud Functions use the Admin SDK and bypass Firestore security rules, so leaderboard writes are safe.
- If you rely on offline persistence on client, writes will sync when network connectivity returns.
