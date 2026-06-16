"use client";

import { useState, useEffect } from 'react';

const MOOD_TAGS = ['Happy', 'Sad', 'Excited', 'Relaxing', 'Intense', 'Thought-Provoking', 'Funny', 'Romantic', 'Scary', 'Inspiring'];
const GENRES = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'Animation', 'Documentary', 'Family', 'Musical', 'Western'];
const TYPE_OPTIONS = ['Movie', 'TV Show'];

export default function SuggestAWatchPage() {
  const [collection, setCollection] = useState([]);
  const [suggestedItem, setSuggestedItem] = useState(null);
  const [criteria, setCriteria] = useState({
    type: '',
    genre: '',
    mood: '',
  });

  // Load collection from local storage on mount
  useEffect(() => {
    const storedCollection = localStorage.getItem('watchlistCollection');
    if (storedCollection) {
      setCollection(JSON.parse(storedCollection));
    }
  }, []);

  const handleCriteriaChange = (e) => {
    const { name, value } = e.target;
    setCriteria(prev => ({ ...prev, [name]: value }));
  };

  const generateSuggestion = () => {
    if (collection.length === 0) {
      alert("Your collection is empty! Add some items first on the 'My Collection' page.");
      setSuggestedItem(null);
      return;
    }

    const eligibleItems = collection.filter(item => {
      const matchesType = criteria.type ? item.type === criteria.type : true;
      const matchesGenre = criteria.genre ? item.genre.includes(criteria.genre) : true;
      const matchesMood = criteria.mood ? item.moodTags.includes(criteria.mood) : true;
      return matchesType && matchesGenre && matchesMood;
    });

    if (eligibleItems.length === 0) {
      setSuggestedItem(null);
      alert("No items match your selected criteria. Try broadening your search!");
      return;
    }

    const randomIndex = Math.floor(Math.random() * eligibleItems.length);
    setSuggestedItem(eligibleItems[randomIndex]);
  };

  return (
    <>
      <h1>Suggest a Watch</h1>
      <p style={{color: 'var(--text-color-secondary)'}}>
        Can't decide what to watch? Let the Watchlist Curator pick something for you!
      </p>

      <div className="glass-card mb-4">
        <div className="form-group">
          <label htmlFor="type">Filter by Type:</label>
          <select id="type" name="type" value={criteria.type} onChange={handleCriteriaChange}>
            <option value="">Any Type</option>
            {TYPE_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="genre">Filter by Genre:</label>
          <select id="genre" name="genre" value={criteria.genre} onChange={handleCriteriaChange}>
            <option value="">Any Genre</option>
            {GENRES.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="mood">Filter by Mood:</label>
          <select id="mood" name="mood" value={criteria.mood} onChange={handleCriteriaChange}>
            <option value="">Any Mood</option>
            {MOOD_TAGS.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        <button onClick={generateSuggestion} className="btn mt-4">Surprise Me!</button>
      </div>

      {suggestedItem && (
        <>
          <h2 className="mt-4">Your Suggested Watch:</h2>
          <div className="glass-card">
            <h2 style={{ marginBottom: '0.5rem' }}>{suggestedItem.title}</h2>
            <p><strong>Type:</strong> {suggestedItem.type}</p>
            <p><strong>Genre:</strong> {suggestedItem.genre.join(', ') || 'N/A'}</p>
            <p><strong>Actors:</strong> {suggestedItem.actors || 'N/A'}</p>
            <p><strong>Mood:</strong> {suggestedItem.moodTags.join(', ') || 'N/A'}</p>
            <p><strong>Runtime/Seasons:</strong> {suggestedItem.runtime || 'N/A'}</p>
            {suggestedItem.notes && <p><strong>Notes:</strong> {suggestedItem.notes}</p>}
          </div>
        </>
      )}

      {!suggestedItem && collection.length > 0 && (
        <p className="mt-4 text-center" style={{ color: 'var(--text-color-secondary)' }}>
          Select your preferences and click "Surprise Me!" to get a suggestion.
        </p>
      )}
    </>
  );
}
