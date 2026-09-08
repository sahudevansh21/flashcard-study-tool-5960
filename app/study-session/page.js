"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function StudySession() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deckId = searchParams.get('deckId');

  const [deck, setDeck] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (deckId) {
      const storedDecks = JSON.parse(localStorage.getItem('flashcardDecks') || '[]');
      const foundDeck = storedDecks.find((d) => d.id === deckId);
      if (foundDeck) {
        setDeck(foundDeck);
        // Start with non-mastered cards if available, otherwise all cards
        const initialCards = foundDeck.cards.filter(card => !card.mastered);
        if (initialCards.length > 0) {
          setDeck({ ...foundDeck, cards: initialCards });
        } else if (foundDeck.cards.length > 0) {
          setMessage('All cards mastered in this deck! Reviewing all cards now.');
        }
      } else {
        setMessage('Deck not found.');
      }
    } else {
      setMessage('No deck selected. Please go to My Decks.');
    }
    setLoading(false);
  }, [deckId]);

  useEffect(() => {
    // When the deck state changes, update localStorage
    if (deck) {
      const storedDecks = JSON.parse(localStorage.getItem('flashcardDecks') || '[]');
      const updatedDecks = storedDecks.map(d => (d.id === deck.id ? deck : d));
      localStorage.setItem('flashcardDecks', JSON.stringify(updatedDecks));
    }
  }, [deck]);

  const handleFlipCard = () => {
    setIsCardFlipped(!isCardFlipped);
  };

  const handleNextCard = (masteredStatus) => {
    if (!deck || deck.cards.length === 0) return;

    const updatedCards = deck.cards.map((card, index) =>
      index === currentCardIndex ? { ...card, mastered: masteredStatus } : card
    );
    setDeck({ ...deck, cards: updatedCards });

    setIsCardFlipped(false);

    const nextIndex = currentCardIndex + 1;
    if (nextIndex < updatedCards.length) {
      setCurrentCardIndex(nextIndex);
    } else {
      setMessage('You have reviewed all cards in this session!');
      setCurrentCardIndex(0); // Reset for another round or go back
    }
  };

  if (loading) {
    return <div className="study-session-container"><p>Loading session...</p></div>;
  }

  if (message) {
    return (
      <div className="study-session-container">
        <div className="glass-card wide-card text-center">
          <p>{message}</p>
          {deckId && deck && deck.cards.length === 0 && (
            <p>This deck has no cards. Go to "My Decks" to add some!</p>
          )}
          <button onClick={() => router.push('/my-decks')} className="button primary" style={{marginTop: '1rem'}}>
            Go to My Decks
          </button>
        </div>
      </div>
    );
  }

  const currentCard = deck.cards[currentCardIndex];

  return (
    <div className="study-session-container">
      <h1>Study Session: {deck.name}</h1>
      <p>Card {currentCardIndex + 1} of {deck.cards.length}</p>

      <div className={`flashcard-display ${isCardFlipped ? 'flipped' : ''}`}>
        <div className="flashcard-inner">
          <div className="flashcard-front glass-card">
            <p>{currentCard.front}</p>
          </div>
          <div className="flashcard-back glass-card">
            <p>{currentCard.back}</p>
          </div>
        </div>
      </div>

      <div className="study-controls">
        <button onClick={handleFlipCard} className="button secondary">
          Flip Card
        </button>
        {isCardFlipped && (
          <>
            <button onClick={() => handleNextCard(true)} className="button primary">
              Mark as Learned
            </button>
            <button onClick={() => handleNextCard(false)} className="button secondary">
              Need Review
            </button>
          </>
        )}
      </div>
    </div>
  );
}
