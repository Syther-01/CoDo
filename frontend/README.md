# CoDo — CP & DSA Analytics Platform

CoDo is a full-stack analytics platform for Competitive Programming and DSA learners.
It analyzes Codeforces and LeetCode activity to generate topic insights, contest bottlenecks, and performance analytics.

---

# Features

## Codeforces Analytics

* Profile dashboard
* Contest history analysis
* Topic rating analytics
* Contest bottleneck detection
* AI-based contest insights
* Strongest & weakest topics
* Interactive charts

## LeetCode Analytics

* Profile stats
* Topic-wise analysis
* Difficulty breakdown
* Strongest & weakest topics
* DSA growth tracking

---

# How CoDo Works

## Topic Rating Logic

For every topic:

1. Accepted submissions are grouped by rating
2. Cumulative solved counts are calculated
3. Highest rating with at least 10 solved problems is assigned as topic rating

This prevents unreliable ratings from very small sample sizes.

---

## Contest Depth Analyzer

For each Codeforces contest:

1. Contest problems are fetched
2. First unsolved problem is detected
3. Important tags are extracted
4. Repeated bottleneck topics are counted
5. Weak areas are visualized using charts

This helps users understand where contests usually break down.

---

# Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Recharts

## Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication

---

# APIs Used

## Codeforces API

* user.info
* user.rating
* user.status
* problemset.problems

## LeetCode GraphQL API

Used server-side for profile and topic analytics.

---

# Installation

## Backend

```bash
cd backend
npm install
npm start
```

Create `.env`

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=5000
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Create `.env`

```env
VITE_BACKEND_URL=http://localhost:5000
```

---

# Deployment

* Frontend → Vercel
* Backend → Render
* Database → MongoDB Atlas

---

# Future Improvements

* AI training plans
* Problem recommendations
* Heatmaps & streaks
* Friend comparison
* Contest prediction system

---

# Author

Arnav Dixit
IIITDM Jabalpur
