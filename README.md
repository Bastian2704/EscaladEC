# Escalada ECU 

This project is built with:
- [SvelteKit](https://kit.svelte.dev/)
- [Node.js](https://nodejs.org/)
- [Lucia](https://lucia-auth.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)

## Dependencies
> ⚠️ This section will be updated once the project configuration is finalized.  

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
