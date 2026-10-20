# SDNDBZ Companion — Desktop

A standalone Windows app version of the companion tool: character sheets, NPCs,
combat tracker, tables, notes — all live-shared with your table over the internet
using a free Firebase backend.

## 1. One-time setup

**Requirements on your Linux machine:** Node.js (18+), npm, and Wine (for
cross-building the Windows `.exe`).

```bash
sudo apt update
sudo apt install -y wine64 wine32 mono-complete
cd sdndbz-desktop
npm install
```

## 2. Create your free Firebase project (~5 minutes)

1. Go to https://console.firebase.google.com and create a new project (no
   credit card needed).
2. Click the **`</>`** (web app) icon to register a new web app. Give it any
   nickname.
3. Firebase shows you a `firebaseConfig` object with 6 values
   (`apiKey`, `authDomain`, `projectId`, `storageBucket`,
   `messagingSenderId`, `appId`). Copy them.
4. Open `renderer/firebase-config.js` in this project and paste your values
   in place of the `PASTE_YOUR_...` placeholders.
5. In the Firebase console sidebar: **Build → Firestore Database → Create
   database**. Choose "Start in test mode."
6. Go to the **Rules** tab of Firestore and replace the rules with:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} { allow read, write: if true; }
     }
   }
   ```
   (This makes the database open to anyone who has your Firebase config —
   fine for a private home game, not something to publish publicly.)

## 3. Build the Windows `.exe`

```bash
npm run dist:win
```

This produces an installer at `release/SDNDBZ Companion Setup 1.0.0.exe`.
Send that file to your players. Running it installs the app like any normal
Windows program (it's unsigned, so Windows SmartScreen may show a "Windows
protected your PC" warning — click "More info" → "Run anyway").

## 4. Using it

The first time the app opens, everyone enters the same **Room Code**
(any word you all agree on, e.g. `FRIEZA-CREW`). Everyone using that code
sees the same live characters, NPCs, combat tracker, and shared notes —
updates from one player's screen appear on everyone else's within a second
or two. Each player can still export their own character sheet to a local
`.json` file from the character screen, independent of the shared room data.

## Re-building after changes

Any time the app's code changes, just re-run:
```bash
npm run dist:win
```
and re-share the new installer.
# SDNDB-Companion-App
# SDNDB-Companion-App
