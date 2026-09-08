"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MyDecks() {
  const [decks, setDecks] = useState([]);
  const [newDeckName, setNewDeckName] = useState('');
  const [cardFront, setCardFront] = useState('');
  const [cardBack, setCardBack] = useState('');
  const [selectedDeckId, setSelectedDeckId] = useState(null);
  const [showAddCardForm, setShowAddCardForm] = useState(false);

  useEffect(() => {
    const storedDecks = JSON.parse(localStorage.getItem('flashcardDecks') || '[]');
    setDecks(storedDecks);
  }, []);

  useEffect(() => {
    localStorage.setItem('flashcardDecks', JSON.stringify(decks));
  }, [decks]);

  const addDeck = (e) => {
    e.preventDefault();
    if (newDeckName.trim()) {
      const newDeck = { id: Date.now().toString(), name: newDeckName.trim(), cards: [] };
      setDecks((prevDecks) => [...prevDecks, newDeck]);
      setNewDeckName('');
    }
  };

  const deleteDeck = (id) => {
    setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== id));
  };

  const handleAddCardClick = (deckId) => {
    setSelectedDeckId(deckId);
    setShowAddCardForm(true);
  };

  const addCardToDeck = (e) => {
    e.preventDefault();
    if (cardFront.trim() && cardBack.trim() && selectedDeckId) {
      setDecks((prevDecks) =>
        prevDecks.map((deck) =>
          deck.id === selectedDeckId
            ? {
                ...deck,
                cards: [...deck.cards, { id: Date.now().toString(), front: cardFront.trim(), back: cardBack.trim(), mastered: false }],
              }
            : deck
        )
      );
      setCardFront('');
      setCardBack('');
      setShowAddCardForm(false);
      setSelectedDeckId(null);
    }
  };

  return (
    <div className="deck-list-container">
      <h1>My Decks</h1>

      <div className="glass-card wide-card">
        <h2>Create New Deck</h2>
        <form onSubmit={addDeck} className="form-group">
          <input
            type="text"
            placeholder="Deck Name"
            value={newDeckName}
            onChange={(e) => setNewDeckName(e.target.value)}
            required
          />
          <div className="form-actions" style={{marginTop: '1rem'}}>
            <button type="submit" className="button primary">Add Deck</button>
          </div>
        </form>
      </div>

      {showAddCardForm && selectedDeckId && (
        <div className="glass-card wide-card">
          <h2>Add Card to &quot;{decks.find(d => d.id === selectedDeckId)?.name}&quot;</h2>
          <form onSubmit={addCardToDeck}>
            <div className="form-group">
              <label htmlFor="card-front">Card Front</label>
              <input
                id="card-front"
                type="text"
                placeholder="Question or term"
                value={cardFront}
                onChange={(e) => setCardFront(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="card-back">Card Back</label>
              <input
                id="card-back"
                type="text"
                placeholder="Answer or definition"
                value={cardBack}
                onChange={(e) => setCardBack(e.target.value)}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="button primary">Add Card</button>
              <button type="button" onClick={() => setShowAddCardForm(false)} className="button secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <h2>Your Decks</h2>
      {decks.length === 0 ? (
        <p>No decks created yet. Start by adding a new one!</p>
      ) : (
        <div className="grid-container">
          {decks.map((deck) => (
            <div key={deck.id} className="glass-card deck-item">
              <div className="deck-item-content">
                <h3>{deck.name}</h3>
                <p>{deck.cards.length} cards</p>
              </div>
              <div className="deck-actions">
                <Link href={`/study-session?deckId=${deck.id}`} className="button primary">
                  Study
                </Link>
                <button onClick={() => handleAddCardClick(deck.id)} className="button secondary">
                  Add Card
                </button>
                <button onClick={() => deleteDeck(deck.id)} className="button danger">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
