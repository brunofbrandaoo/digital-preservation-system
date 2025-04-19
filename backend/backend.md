# Backend - Digital Preservation System

This is the backend service for the Digital Preservation System, built using the [NestJS](https://nestjs.com/) framework.

## Description

This backend provides the API endpoints and business logic for the system. It utilizes Prisma for database interactions.

## Current Status

- **Framework:** NestJS
- **Database ORM:** Prisma
- **Core Modules:**
  - [`AppModule`](backend/src/app.module.ts): The root module of the application.
  - [`AppController`](backend/src/app.controller.ts): Handles incoming requests for the root path.
  - [`AppService`](backend/src/app.service.ts): Contains the basic business logic.
- **Endpoints:**
  - `GET /`: Returns "Hello World!". Implemented in [`AppController.getHello`](backend/src/app.controller.ts).
- **Database:** Prisma is configured. The schema can be found in [`prisma/schema.prisma`](backend/prisma/schema.prisma). Migrations are managed in the `prisma/migrations` directory.
- **Testing:** Basic unit tests ([`app.controller.spec.ts`](backend/src/app.controller.spec.ts)) and end-to-end tests ([`test/app.e2e-spec.ts`](backend/test/app.e2e-spec.ts)) are set up.

## Getting Started

### Prerequisites

- Node.js (version recommended by NestJS)
- npm or yarn
- A running database instance compatible with the Prisma configuration.

### Installation

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up your environment variables. Copy the example file:

    ```bash
    cp .env.example .env
    ```

    Update `.env` with your database connection string and any other required variables (like `PORT`).

4.  Apply database migrations:
    ```bash
    npx prisma migrate dev
    ```

### Running the App

```bash
# Development mode
npm run start

# Watch mode (reloads on file changes)
npm run start:dev

# Production mode
npm run build
npm run start:prod
```
