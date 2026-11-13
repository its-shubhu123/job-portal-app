# Job Portal

A full-stack job portal built with the MERN stack. Students can search and apply for jobs, and recruiters can create companies and post openings.

**Live demo:** https://job-portal-app-green.vercel.app
**Backend API:** https://job-portal-app-2z47.onrender.com

> The backend runs on Render's free tier, so the first request after a period of inactivity can take 30 to 60 seconds while the server wakes up.

## Features

- User registration and login with two roles: **Student** and **Recruiter**
- Secure authentication using JWT stored in an HTTP-only cookie
- Passwords hashed with bcrypt
- Profile photo upload at signup and resume upload on the profile page (stored on Cloudinary)
- Students can browse, search and apply for jobs
- Recruiters can register companies, post jobs and view applicants
- Update profile details (name, phone, bio, skills, resume)

## Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | React (Vite), React Router              |
| Backend   | Node.js, Express                        |
| Database  | MongoDB Atlas with Mongoose             |
| Auth      | JSON Web Tokens, bcryptjs, cookies      |
| Storage   | Cloudinary (images and resumes)         |
| Hosting   | Vercel (frontend), Render (backend)     |

## Project Structure

```
job-portal-app/
├── backend/
│   ├── controllers/     # Route logic (user, job, company, application)
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routes
│   ├── middlewares/     # Auth and file upload middleware
│   ├── utils/           # DB connection, Cloudinary, data URI helper
│   └── index.js         # Server entry point
└── frontend/
    ├── public/
    ├── src/
    ├── index.html
    └── vercel.json      # SPA rewrite rules for Vercel
```

## Getting Started (Local Setup)

### Prerequisites

- Node.js 18 or later
- A MongoDB database (local, or a free cluster on MongoDB Atlas)
- A free Cloudinary account

### 1. Clone the repository

```bash
git clone https://github.com/its-shubhu123/job-portal-app.git
cd job-portal-app
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_long_random_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

Start the server:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd ../frontend
npm install
npm run dev
```

Make sure the API base URLs in the frontend (for example in `src/utils/constant.js`) point to your local backend, such as `http://localhost:8000/api/v1/...`.

## API Overview

All routes are prefixed with `/api/v1`.

| Prefix          | Purpose                                         |
|-----------------|-------------------------------------------------|
| `/user`         | Register, login, logout, update profile         |
| `/company`      | Create, view and update companies (recruiter)   |
| `/job`          | Post jobs, list and search jobs, job details    |
| `/application`  | Apply for a job, view applicants and status     |

Most routes require the user to be logged in. Authentication is handled by the `token` cookie set at login.

## Deployment Notes

- **Frontend (Vercel):** `vercel.json` rewrites all paths to `index.html` so that refreshing on a React Router page does not return a 404.
- **Backend (Render):** set the Root Directory to `backend`, use `npm install` as the build command and `npm start` as the start command. Add all the environment variables listed above in Render's Environment settings.
- **Database (MongoDB Atlas):** allow network access from `0.0.0.0/0` since Render's free tier has no fixed IP.
- **CORS and cookies:** the backend allows the Vercel frontend origin with credentials, and sets the login cookie with `httpOnly`, `secure` and `sameSite: "none"` so it works across domains.

## Environment Variables

| Variable      | Description                              |
|---------------|------------------------------------------|
| `PORT`        | Port for the server (set by Render in production) |
| `MONGO_URI`   | MongoDB connection string                |
| `SECRET_KEY`  | Secret used to sign JWT tokens           |
| `CLOUD_NAME`  | Cloudinary cloud name                    |
| `API_KEY`     | Cloudinary API key                       |
| `API_SECRET`  | Cloudinary API secret                    |

Never commit your `.env` file. Keep it listed in `.gitignore`.

## Author

Built by [its-shubhu123](https://github.com/its-shubhu123).
