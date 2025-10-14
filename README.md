# Escalada ECU 
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-%23FF3E00.svg?logo=svelte&logoColor=white)](https://kit.svelte.dev/)
[![Docker Compose](https://img.shields.io/badge/Docker-Compose-blue?logo=docker&logoColor=white)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![ESLint](https://img.shields.io/badge/Code%20Style-ESLint-4B32C3.svg?logo=eslint)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Code%20Formatter-Prettier-ff69b4.svg?logo=prettier)](https://prettier.io/)

> ✨ *

---

## 🧭 Table of Contents

- [Technologies](https://github.com/Bastian2704/EscaladEC?tab=readme-ov-file#technologies)
- [Recommended Development Environment](https://github.com/Bastian2704/EscaladEC?tab=readme-ov-file#0-recommended-development-environment)
- [Prerequisites](https://github.com/Bastian2704/EscaladEC?tab=readme-ov-file#10-prerequisites)
- [Clone the Repository]([#-clone-the-repositor](https://github.com/Bastian2704/EscaladEC?tab=readme-ov-file#2-clone-the-repository)
- [Install Dependencies](https://github.com/Bastian2704/EscaladEC?tab=readme-ov-file#3-install-dependencies)
- [Environment Variables](https://github.com/Bastian2704/EscaladEC?tab=readme-ov-file#4-environment-variables)
- [Database Setup](https://github.com/Bastian2704/EscaladEC?tab=readme-ov-file#5-run-postgresql-with-docker)
- [Run Migrations](https://github.com/Bastian2704/EscaladEC?tab=readme-ov-file#6-database-migrations-with-drizzle)
- [Start Development Server](https://github.com/Bastian2704/EscaladEC?tab=readme-ov-file#7-development-server)
- [Commit & Branching Rules](https://github.com/Bastian2704/EscaladEC?tab=readme-ov-file#commit--branching-rules)
- [Contributors](https://github.com/Bastian2704/EscaladEC?tab=readme-ov-file#contributors)

---

## Technologies

This project is built with:

- [SvelteKit](https://kit.svelte.dev/)
- [Node.js](https://nodejs.org/)
- [Lucia](https://lucia-auth.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Docker Compose](https://www.docker.com/)

---

## Dependencies
### 0. Recommended Development Environment
- Editor: Visual Studio Code
- VS Code Extensions:
- Svelte for VS Code
- ESLint
- Prettier – Code Formatter
- Docker

### 1.0 Prerequisites
#### 1.1 Node.js & npm

Install Node.js LTS 20.x
```sh
node -v
npm -v
```

#### 1.2 pnpm (Package Manager)
Install globally:
```sh
npm install -g pnpm
pnpm -v
```

#### 1.3 Docker Desktop
Install [Docker Desktop](https://www.docker.com/)
Enable WSL2 on Windows
Verify installation:
```sh
docker --version
docker compose version
```

### 2. Clone the Repository
# Choose a folder on your machine (e.g., C:\Projects)
```sh
git clone https://github.com/Bastian2704/EscaladEC.git
cd EscaladEC
```
💡 Recommendation: Keep the repo outside of OneDrive to avoid Docker file locks.

### 3. Install Dependencies
```sh
pnpm install
```

### 4. Environment Variables
Create a .env file from the example:
```sh

cp .env.example .env
```

#### Edit .env according to your configuration:
```sh
DATABASE_URL=postgres://root:mysecretpassword@localhost:5432/local
ORIGIN=http://localhost:5173
AUTH_SECRET=<secrets>
```
##### ASK FOR SECRETS

### 5. Run PostgreSQL with Docker
```sh
docker compose up -d
```
#### Verify container:
```sh
docker ps
```
Connect to the database:
```sh
docker exec -it escaladec-db-1 psql -U root -d local -c "\dt"
```

### 6. Database Migrations with Drizzle
```sh
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

generate: creates the SQL migration file.
migrate: applies it to the Postgres DB.

Verify:
```sh
docker exec -it escaladec-db-1 psql -U root -d local -c "\dt"
```


### 7. Development Server
Start the dev server:
```sh
pnpm dev
```

---

## Commit & Branching Rules

### 1. Create a branch locally with the task number

```sh
git checkout -b {Ticket Number e.g. AE-1}

```

### 2. Switch back to an existing branch

```sh
git checkout {Ticket Number}
```
### 3. Before making a Pull Request
 Check code formatting with Prettier:

```sh
npm run format
# or directly
npx prettier --write .```
```
Check typing and linting with ESLint:
```sh
npm run lint
# or directly
npx eslint .
```

### 4. If everything is correct, make a commit
Follow this convention:
```sh
git commit -m "{Ticket Number e.g. AE-1}: {short description starting with a verb in present tense}"
```

### 5. Push your branch

```sh
git push -u origin {Ticket Number e.g. AE-1}
```
Important
❌ Do NOT merge into main until:
You have explicit approval from someone in the development team.
You have resolved any questions or requested changes in the Pull Request.

---
### Contributors

<a href="https://github.com/Bastian2704/EscaladEC/graphs/contributors"> <img src="https://contrib.rocks/image?repo=Bastian2704/EscaladEC" /> </a>
