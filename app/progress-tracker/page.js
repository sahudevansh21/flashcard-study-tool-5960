"use client";

import { useState, useEffect } from 'react';

export default function ProgressTracker() {
  const [progress, setProgress] = useState({
    totalDecks: 0,
    totalCards: 0,
    masteredCards: 0,
    reviewCards: 0,
  });

  useEffect(() => {
    const storedDecks = JSON.parse(localStorage.getItem('flashcardDecks') || '[]');

    let totalCards = 0;
    let masteredCards = 0;

    storedDecks.forEach((deck) => {
      totalCards += deck.cards.length;
      deck.cards.forEach((card) => {
        if (card.mastered) {
          masteredCards++;
        }
      });
    });

    setProgress({
      totalDecks: storedDecks.length,
      totalCards: totalCards,
      masteredCards: masteredCards,
      reviewCards: totalCards - masteredCards,
    });
  }, []);

  const getProgressPercentage = (count, total) => {
    if (total === 0) return '0%';
    return ((count / total) * 100).toFixed(0) + '%';
  };

  return (
    <div className="progress-summary">
      <h1>Your Learning Progress</h1>
      <p className="description">A summary of your flashcard mastery across all decks.</p>

      <div className="progress-grid">
        <div className="glass-card progress-card text-center">
          <h2>{progress.totalDecks}</h2>
          <p>Total Decks</p>
        </div>

        <div className="glass-card progress-card text-center">
          <h2>{progress.totalCards}</h2>
          <p>Total Cards</p>
        </div>

        <div className="glass-card progress-card text-center">
          <h2>{progress.masteredCards}</h2>
          <p>Mastered Cards</p>
          <p className="text-muted">{getProgressPercentage(progress.masteredCards, progress.totalCards)}</p>
        </div>

        <div className="glass-card progress-card text-center">
          <h2>{progress.reviewCards}</h2>
          <p>Cards to Review</p>
          <p className="text-muted">{getProgressPercentage(progress.reviewCards, progress.totalCards)}</p>
        </div>
      </div>
    </div>
  );
}
