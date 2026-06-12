# Product Management App

A full-stack product management application built with the MERN stack, allowing users to manage categories, subcategories, and products with variants. Includes wishlist, search, filter, and pagination features.

## Tech Stack

**Frontend:** React, Vite, Bootstrap, React Router DOM, React Toastify  
**Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose, JWT, Multer  
**Architecture:** MVC (Model - View - Controller)

Backend setup
Create a `.env` file in `app-server/`:

```env
CONNECTION_STRING=your_mongodb_atlas_connection_string
SECRET_KEY=your_jwt_secret_key
```
Start the server:
nodemon
Backend runs on `http://localhost:3001`

Frontend Setup
Start the server:
npm run dev
Frontend runs on `http://localhost:5173`

## Deployment

- **Frontend** hosted on Vercel
- **Backend** hosted on Render

> Note: Product images are stored in the local `uploads/` folder.  

