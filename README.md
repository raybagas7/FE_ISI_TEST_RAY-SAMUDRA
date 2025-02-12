# Ihsan Solusi Fullstack Engineer Take-home Assignment

## Overview

Todo App with role based account, project and task management

## Prerequisites

- Docker

## Tech Stack

- React 18
- Next.js 14 with TypeScript
- Redux
- React Query
- Tailwind
- Radix
- Framer Motion
- Postgres
- Drizzle ORM
- Axios
- React-Day-Picker
- lucide-react
- AuthJs/Credentials Provider

## Development Dependencies

- ESLint

## Installation / Run Locally

Clone the project

```bash
git clone https://github.com/raybagas7/Todo-Task-App.git
```

Go to the project directory

```bash
cd Todo-Task-App
```

Install dependencies

```bash
npm install
```

Environment variable

```bash
cp .env.example .env
```

**_follow the .env.example and fill every variable and base api url with your needs_**

Start the application in Development mode.

```bash
npm run dev
```

**_(Web app will run on port 3000)_**

To build and start the application you can run this command

```bash
npm run build
```

```bash
npm run start
```

**_(Web app will run on port 3000)_**

## Running the apps with Docker

Before get into docker build, ensure you have Docker installed on your machine. You can download and install Docker from the . [official website](https://www.docker.com)

Ensure that you have set the .env to the root directory:

```bash
cp .env.example .env
```

**_follow the .env.example and fill every variable and base api url with your needs_**

- **Navigate** to the project when you clone this project already.

- **Run** the Docker container

  ```bash
  docker-compose up --build
  ```

  This command will start the Docker container and run the application. To stop the container, press Ctrl + C in the terminal where it's running or run:

  ```bash
  docker-compose down
  ```

This command will start the Docker container and run the application.

Once the Docker container is running, you can access the Node.js application by opening a web browser and navigating to localhost:3000.
**To run application in development mode in docker**

Currently this application can run development mode in docker with this command

```bash
docker-compose -f docker-compose.prod.yml up --build
```

Unforinately for current version the volume won't work
