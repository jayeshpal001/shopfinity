# Project Setup & Run

## 1Clone Repository

```bash
git clone <your-repo-link>
cd project
```

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables (Backend)

Create a `.env` file inside `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret

EMAIL_USER=your_email
EMAIL_PASS=your_password

GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_secret

CLOUDINARY_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

---

## Run URLs

- Frontend → http://localhost:5173  
- Backend → http://localhost:5000  
