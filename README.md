# কাগজপত্র (Kagojpotro)
## Personal Document Management System

A fully-functional, secure, local document management system built with Next.js, TypeScript, Prisma, and AES-256-GCM encryption.

---

## Prerequisites

- **Node.js** 20+ — [Download](https://nodejs.org/)
- **npm** 10+ (comes with Node.js)
- **Windows** 10/11 (or macOS/Linux)

---

## Installation

### 1. Clone or Extract the Project

```bash
# If cloning from git:
git clone <repo-url> kagojpotro
cd kagojpotro

# Or extract the zip and navigate to the folder
cd path/to/kagojpotro
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
# Copy the example environment file
copy .env.example .env
```

Open `.env` and set a strong `ENCRYPTION_MASTER_KEY` (64 hex characters = 32 bytes):

```env
DATABASE_URL="file:./prisma/data/kagojpotro.db"
ENCRYPTION_MASTER_KEY="your-64-hex-character-key-here"
SESSION_SECRET="your-random-session-secret"
```

> **Important:** Generate a secure key with:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

### 4. Initialize Database

```bash
# Push schema to SQLite
npx prisma db push

# Seed default categories, owner account, and dummy documents
node prisma/seed.js
```

### 5. Start the Application

**Development mode (with hot reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

Open your browser and go to: `http://localhost:3000`

---

## Default Credentials

> **Change these immediately after first login!**

| Field       | Value                          |
|-------------|--------------------------------|
| Email       | `admin@kagojpotro.local`       |
| Phone       | `01700000000`                  |
| Password    | `Password123!`                 |
| Recovery Key | `KAGJ-7X9P-4M2K-8W1N-9Q3B`   |

---

## Storage Location

All encrypted documents are stored in:
```
kagojpotro/
└── storage/
    ├── encrypted_vault/      # Encrypted document files (.enc)
    │   ├── land/
    │   ├── personal/
    │   ├── educational/
    │   ├── financial/
    │   ├── medical/
    │   └── legal/
    ├── backups/              # Local backup archives (.kbp)
    └── temp/                 # Temporary upload staging
```

The database is at: `prisma/data/kagojpotro.db`

---

## Backup & Recovery

### Create a Backup

1. Navigate to **Backup & Recovery** in the sidebar
2. Click **নতুন ব্যাকআপ** (New Backup)
3. The system creates an encrypted `.kbp` archive in `storage/backups/`

### Verify Integrity

Click **যাচাই** (Verify) next to any backup to check its integrity hash.

### Restore a Backup

1. Click **পুনরুদ্ধার** (Restore) on a backup record, OR
2. Upload a `.kbp` file using the **ফাইল আপলোড করুন** button

> Restoring merges documents from the backup without overwriting newer files.

---

## Password Recovery

If you forget your password:

1. Go to `http://localhost:3000/recover`
2. Enter your **Recovery Key** (shown during setup, format: `XXXX-XXXX-XXXX-XXXX-XXXX`)
3. Set a new password

> **Store your recovery key safely!** It cannot be regenerated.

---

## Security Features

| Feature | Implementation |
|---------|---------------|
| File Encryption | AES-256-GCM |
| Password Hashing | Argon2id |
| Session Management | Secure HTTP-only cookies |
| Rate Limiting | 5 attempts / 15 min lockout |
| Audit Logging | All actions logged |
| Path Traversal Protection | Sanitized filenames |
| CSRF Protection | SameSite=Strict cookies |
| Secure Headers | X-Content-Type-Options, etc. |

---

## Android Integration (Capacitor)

The app is pre-configured for Android via Capacitor.

### Setup

```bash
npm install @capacitor/core @capacitor/android
npx cap add android
npx cap sync
```

### Connect Android to Local Server

1. Ensure your phone and laptop are on the **same Wi-Fi network**
2. Find your laptop's local IP: `ipconfig` (Windows) → look for `IPv4 Address`
3. Update `capacitor.config.ts`:
   ```typescript
   server: {
     url: 'http://192.168.1.xxx:3000',  // Your laptop's IP
     cleartext: true
   }
   ```
4. Build the Android app: `npx cap open android`

> For remote access, use a VPN (e.g., WireGuard, Tailscale). **Never expose directly to the internet.**

---

## Project Structure

```
kagojpotro/
├── src/
│   ├── app/                  # Next.js App Router pages & API routes
│   │   ├── api/              # Backend API endpoints
│   │   ├── documents/        # Main documents page
│   │   ├── dashboard/        # Dashboard
│   │   ├── categories/       # Category pages
│   │   ├── favorites/        # Favorites
│   │   ├── trash/            # Trash & restore
│   │   ├── backup/           # Backup & recovery
│   │   ├── settings/         # Settings & users
│   │   ├── audit/            # Audit logs
│   │   ├── login/            # Login page
│   │   ├── setup/            # First-run setup
│   │   └── recover/          # Password recovery
│   ├── components/           # Reusable UI components
│   │   ├── layout/           # Sidebar, MacWindowFrame
│   │   └── documents/        # Document-related components
│   ├── lib/                  # Core utilities
│   │   ├── auth.ts           # Authentication (Argon2id)
│   │   ├── crypto.ts         # AES-256-GCM encryption
│   │   ├── storage.ts        # File storage management
│   │   ├── backup.ts         # Backup & restore logic
│   │   ├── audit.ts          # Audit logging
│   │   ├── db.ts             # Prisma singleton
│   │   └── format.ts         # Client-safe formatters
│   └── middleware.ts         # Auth protection middleware
├── prisma/
│   ├── schema.prisma         # Database schema
│   ├── seed.js               # Database seeder
│   └── data/
│       └── kagojpotro.db     # SQLite database
├── storage/
│   ├── encrypted_vault/      # Encrypted files
│   ├── backups/              # Backup archives
│   └── temp/                 # Temp files
├── public/                   # Static assets
├── capacitor.config.ts       # Android/Capacitor config
├── .env                      # Environment variables (DO NOT COMMIT)
├── .env.example              # Example environment file
└── README.md                 # This file
```

---

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build production bundle |
| `npm start` | Start production server |
| `npx prisma studio` | Open Prisma DB GUI |
| `npx prisma db push` | Sync schema to database |
| `node prisma/seed.js` | Re-seed the database |

---

## Troubleshooting

**Port 3000 in use:**
```bash
# Change port:
npm run dev -- -p 3001
```

**Database issues:**
```bash
npx prisma db push --force-reset
node prisma/seed.js
```

**Permission issues on Windows (OneDrive):**
```bash
# Run as administrator, or move project off OneDrive Desktop:
xcopy /E /I kagojpotro C:\Projects\kagojpotro
```

---

## License

Private, personal use only. All rights reserved.
