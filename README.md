# Todo Management - Backend

This is the backend API component of the Todo Management Full-Stack Application, built with [NestJS](https://nestjs.com/) and [MongoDB](https://www.mongodb.com/).

## Overview

The backend is responsible for handling business logic, user authentication via JWT, and data persistence. It serves as a RESTful API for the Next.js frontend application.

### Tech Stack
- **Framework:** [NestJS](https://nestjs.com/)
- **Language:** TypeScript
- **Database:** [MongoDB](https://www.mongodb.com/) (interfaced via [Mongoose](https://mongoosejs.com/))
- **Authentication:** JWT (JSON Web Tokens)

## Project Structure (API Endpoints)

The application is modular and split into several domain areas:

- **Auth** (`/auth`): Handles user login and registration, issuing JWTs.
- **Users** (`/users`): Manages user accounts (typically role-protected for admins).
- **Todos** (`/todos`): The core task management API for creating, updating, completing, and tracking time for todos.
- **Attendance** (`/attendance`): Handles user daily check-ins and check-outs.

## Getting Started

For full installation, environment variable configuration, and comprehensive running instructions, please refer to the [Main Project README](../README.md) in the root directory.

### Quick Start (Development)

Ensure your `.env` file is properly configured with your `MONGO_URI` and `JWT_SECRET` (see `.env.example` if available).

```bash
# Install dependencies
npm install

# Start the development server (with hot-reload)
npm run start:dev
```

The server will start running on [http://localhost:3001](http://localhost:3001) by default.

## Seeding the Database

To create an initial administrator account, you can execute the included seed script:

```bash
npx ts-node seed.ts
```
*Note: Ensure your MongoDB instance is running and your `.env` variables are loaded before seeding.*
