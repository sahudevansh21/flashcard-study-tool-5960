"use client";

import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Initialize some dummy data for localStorage if it's empty
    const decks = JSON.parse(localStorage.getItem('flashcardDecks') || '[]');
    if (decks.length === 0) {
      const initialDecks = [
        {
          id: 'deck-1',
          name: 'Next.js Basics',
          cards: [
            { id: 'card-1-1', front: 'What is Next.js?', back: 'A React framework for building full-stack web applications.', mastered: false },
            { id: 'card-1-2', front: 'What is App Router?', back: 'A new routing paradigm in Next.js 13+ that enables server components, streaming, and nested layouts.', mastered: false },
            { id: 'card-1-3', front: 'Purpose of `"use client"`?', back: 'Marks a component or module as client-side, enabling hooks and browser APIs.', mastered: false }
          ]
        },
        {
          id: 'deck-2',
          name: 'React Hooks',
          cards: [
            { id: 'card-2-1', front: 'What is `useState`?', back: 'A Hook that lets you add React state to function components.', mastered: false },
            { id: 'card-2-2', front: 'What is `useEffect`?', back: 'A Hook that lets you perform side effects in function components.', mastered: false }
          ]
        }
      ];
      localStorage.setItem('flashcardDecks', JSON.stringify(initialDecks));
    }
  }, []);

  return (
    <div className="home-container">
      <div className="glass-card wide-card text-center">
        <h1>Flashcard Study Tool</h1>
        <p className="description">Your interactive platform to create, organize, and master flashcards for any subject. Track your progress and boost your learning!</p>
        <Link href="/my-decks" className="button primary">
          Get Started
        </Link>
      </div>
    </div>
  );
}
