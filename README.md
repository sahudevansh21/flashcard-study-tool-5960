# Flashcard Study Tool

This is a Next.js 14 App Router project for an interactive flashcard study tool.

## Project Description
Students and lifelong learners often find it difficult to effectively memorize new information and track their learning progress across various subjects. Traditional physical flashcards are cumbersome to manage, and it's hard to prioritize which topics need more focused review. This website provides an interactive platform for users to create, organize, and study custom flashcard decks for any subject. It helps users track their mastery by marking cards as learned or needing review, allowing for a personalized and efficient study experience, all managed client-side in the browser using `localStorage`.

## Features
- Create and manage custom flashcard decks.
- Add, edit, and delete flashcards within decks.
- Interactive study sessions with card flipping and progress marking (learned/review).
- Client-side data persistence using `localStorage`.
- Responsive, glassmorphic UI with vibrant gradient accents.

## Getting Started

First, clone the repository:

```bash
git clone [repository-url]
cd flashcard-study-tool
```

Then, install the dependencies:

```bash
npm install
# or
yarn install
```

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the pages by modifying `app/*.js` files. The auto-update will reflect changes as you save.

## Project Structure
- `app/layout.js`: The root layout for the application, including the Navbar.
- `app/page.js`: The Home page, serving as the entry point and initial setup for `localStorage`.
- `app/globals.css`: All global styles, including design system variables, glassmorphism effects, and responsiveness.
- `app/my-decks/page.js`: Page for managing (creating, deleting, adding cards to) flashcard decks.
- `app/study-session/page.js`: Page for conducting a study session for a selected deck.
- `app/progress-tracker/page.js`: Page to view overall learning progress.
- `app/components/Navbar.js`: Reusable navigation component.

All interactive components use the `"use client"` directive and manage state with React Hooks (`useState`, `useEffect`) and persist data to `localStorage`.
