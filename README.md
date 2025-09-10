# Vrinsoft-Technical-Task

## 🛠️ Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd <your-project-folder>
npm install
```

---

## ⚙️ Environment Setup

Create a `.env` file in the root directory and configure the following variables:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=admin
DB_NAME=vrinsoft_db
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h

REDIS_URL=redis://127.0.0.1:6379

REDIS_CHANNEL=events_channel
```

---

## ▶️ Running the Project

Start the development server:

```bash
npm run dev
```

Start the worker (for Redis event listening & publishing):

```bash
npm run worker
```

---
