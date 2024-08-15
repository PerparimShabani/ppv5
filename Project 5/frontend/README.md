# Idea Sharing Platform

## Overview

This is a simple idea sharing platform where users can register, create, view, edit, and delete ideas. Each idea can be upvoted, downvoted, and commented on. The frontend is built with React and Bootstrap, while the backend is powered by Django Rest Framework (DRF).

## Features

- User Authentication (Register, Login, Logout)
- JWT based Authorization
- CRUD operations for ideas
- Upvote and Downvote ideas
- Comment on ideas
- Search and Sort ideas
- User profile management

## Tech Stack

- **Frontend**: React, Bootstrap
- **Backend**: Django, Django Rest Framework
- **Database**: SQLite (for simplicity)
- **Authentication**: JWT (JSON Web Tokens)

## Setup Instructions

### Prerequisites

- Node.js and npm
- Python 3.x
- pip (Python package installer)
- Virtualenv (recommended)

### Backend Setup

1. **Clone the repository**

   ```sh
   cd backend
   ```

2. **Create a virtual environment and activate it**

   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install backend dependencies**

   ```sh
   pip install -r requirements.txt
   ```

4. **Apply migrations**

   ```sh
   python manage.py migrate
   ```

5. **Run the backend server**

   ```sh
   python manage.py runserver
   ```

   The backend will be running on `http://localhost:8000`.

### Frontend Setup

1. **Navigate to the frontend directory**

   ```sh
   cd ../frontend
   ```

2. **Install frontend dependencies**

   ```sh
   npm install
   ```

3. **Run the frontend development server**

   ```sh
   npm start
   ```

   The frontend will be running on `http://localhost:3000`.

## Usage

1. **Register a new user**

   - Navigate to `http://localhost:3000/register`
   - Fill in the registration form and submit

2. **Login**

   - Navigate to `http://localhost:3000/login`
   - Fill in your credentials and submit

3. **Create a new idea**

   - After logging in, navigate to `http://localhost:3000/idea/create`
   - Fill in the idea details and submit

4. **View ideas**

   - Navigate to `http://localhost:3000`
   - Click on any idea card to view its details

5. **Edit or delete your ideas**

   - Navigate to `http://localhost:3000/profile`
   - Click on the edit or delete button for any of your ideas

## API Endpoints

- **Authentication**

  - `POST /api/register/`: Register a new user
  - `POST /api/token/`: Obtain JWT token
  - `POST /api/token/refresh/`: Refresh JWT token

- **Ideas**

  - `GET /api/ideas/`: List all ideas
  - `POST /api/ideas/`: Create a new idea
  - `GET /api/ideas/:id/`: Retrieve a specific idea
  - `PUT /api/ideas/:id/`: Update a specific idea
  - `DELETE /api/ideas/:id/`: Delete a specific idea

- **Comments**

  - `GET /api/ideas/:id/comments/`: List all comments for an idea
  - `POST /api/ideas/:id/comments/`: Create a new comment for an idea

- **Votes**
  - `POST /api/ideas/:id/upvote/`: Upvote an idea
  - `POST /api/ideas/:id/downvote/`: Downvote an idea
