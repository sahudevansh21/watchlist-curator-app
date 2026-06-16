"use client";

import { useState, useEffect } from 'react';

const MOOD_TAGS = ['Happy', 'Sad', 'Excited', 'Relaxing', 'Intense', 'Thought-Provoking', 'Funny', 'Romantic', 'Scary', 'Inspiring'];
const GENRES = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'Animation', 'Documentary', 'Family', 'Musical', 'Western'];
const TYPE_OPTIONS = ['Movie', 'TV Show'];

export default function MyCollectionPage() {
  const [collection, setCollection] = useState([]);
  const [newItem, setNewItem] = useState({
    id: '',
    title: '',
    type: 'Movie',
    genre: [],
    actors: '',
    moodTags: [],
    runtime: '',
    notes: '',
    addedDate: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [filterMood, setFilterMood] = useState('');
  const [filterType, setFilterType] = useState('');

  // Load collection from local storage on mount
  useEffect(() => {
    const storedCollection = localStorage.getItem('watchlistCollection');
    if (storedCollection) {
      setCollection(JSON.parse(storedCollection));
    }
  }, []);

  // Save collection to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('watchlistCollection', JSON.stringify(collection));
  }, [collection]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleGenreChange = (e) => {
    const { value, checked } = e.target;
    setNewItem(prev => ({
      ...prev,
      genre: checked
        ? [...prev.genre, value]
        : prev.genre.filter(g => g !== value)
    }));
  };

  const handleMoodTagChange = (e) => {
    const { value, checked } = e.target;
    setNewItem(prev => ({
      ...prev,
      moodTags: checked
        ? [...prev.moodTags, value]
        : prev.moodTags.filter(m => m !== value)
    }));
  };

  const resetForm = () => {
    setNewItem({
      id: '',
      title: '',
      type: 'Movie',
      genre: [],
      actors: '',
      moodTags: [],
      runtime: '',
      notes: '',
      addedDate: '',
    });
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem.title) {
      alert('Title is required!');
      return;
    }

    if (isEditing) {
      setCollection(prev => prev.map(item => item.id === newItem.id ? newItem : item));
      alert('Item updated successfully!');
    } else {
      const id = Date.now().toString(); // Simple unique ID
      setCollection(prev => [...prev, { ...newItem, id, addedDate: new Date().toISOString().split('T')[0] }]);
      alert('Item added to collection!');
    }
    resetForm();
  };

  const handleEdit = (item) => {
    setNewItem(item);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top for editing
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setCollection(prev => prev.filter(item => item.id !== id));
      alert('Item deleted!');
    }
  };

  const filteredCollection = collection.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.actors.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = filterGenre ? item.genre.includes(filterGenre) : true;
    const matchesMood = filterMood ? item.moodTags.includes(filterMood) : true;
    const matchesType = filterType ? item.type === filterType : true;
    return matchesSearch && matchesGenre && matchesMood && matchesType;
  });

  return (
    <>
      <h1>{isEditing ? 'Edit Watchlist Item' : 'Add New Watchlist Item'}</h1>
      <div className="glass-card mb-4">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newItem.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <select id="type" name="type" value={newItem.type} onChange={handleInputChange}>
              {TYPE_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Genre:</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {GENRES.map(genre => (
                <label key={genre} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input
                    type="checkbox"
                    value={genre}
                    checked={newItem.genre.includes(genre)}
                    onChange={handleGenreChange}
                  />
                  {genre}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="actors">Actors (comma-separated):</label>
            <input
              type="text"
              id="actors"
              name="actors"
              value={newItem.actors}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Mood Tags:</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {MOOD_TAGS.map(tag => (
                <label key={tag} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input
                    type="checkbox"
                    value={tag}
                    checked={newItem.moodTags.includes(tag)}
                    onChange={handleMoodTagChange}
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="runtime">Runtime (e.g., "2h 30m" or "3 seasons"):</label>
            <input
              type="text"
              id="runtime"
              name="runtime"
              value={newItem.runtime}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes:</label>
            <textarea
              id="notes"
              name="notes"
              value={newItem.notes}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="flex-row gap-4 mt-4">
            <button type="submit" className="btn">
              {isEditing ? 'Update Item' : 'Add to Collection'}
            </button>
            {isEditing && (
              <button type="button" onClick={resetForm} className="btn btn-secondary">
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <h1 className="mt-4">My Current Collection ({filteredCollection.length})</h1>

      <div className="glass-card mb-4">
        <div className="flex-row flex-wrap gap-4 mb-4">
          <div className="form-group" style={{ flex: '1 1 auto', minWidth: '180px', marginBottom: '0' }}>
            <label htmlFor="search">Search Title/Actors/Notes:</label>
            <input
              type="text"
              id="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="form-group" style={{ flex: '1 1 auto', minWidth: '120px', marginBottom: '0' }}>
            <label htmlFor="filterType">Filter by Type:</label>
            <select id="filterType" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="">All Types</option>
              {TYPE_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ flex: '1 1 auto', minWidth: '120px', marginBottom: '0' }}>
            <label htmlFor="filterGenre">Filter by Genre:</label>
            <select id="filterGenre" value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)}>
              <option value="">All Genres</option>
              {GENRES.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ flex: '1 1 auto', minWidth: '120px', marginBottom: '0' }}>
            <label htmlFor="filterMood">Filter by Mood:</label>
            <select id="filterMood" value={filterMood} onChange={(e) => setFilterMood(e.target.value)}>
              <option value="">All Moods</option>
              {MOOD_TAGS.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid-container">
        {filteredCollection.length === 0 ? (
          <p style={{ color: 'var(--text-color-secondary)', gridColumn: '1 / -1', textAlign: 'center' }}>
            {collection.length === 0 ? 'Your collection is empty. Add some items above!' : 'No items match your filters.'}
          </p>
        ) : (
          filteredCollection.map(item => (
            <div key={item.id} className="glass-card">
              <h2 style={{ marginBottom: '0.5rem' }}>{item.title}</h2>
              <p style={{ fontSize: '0.9em', color: 'var(--text-color-secondary)' }}>Added: {item.addedDate}</p>
              <p><strong>Type:</strong> {item.type}</p>
              <p><strong>Genre:</strong> {item.genre.join(', ') || 'N/A'}</p>
              <p><strong>Actors:</strong> {item.actors || 'N/A'}</p>
              <p><strong>Mood:</strong> {item.moodTags.join(', ') || 'N/A'}</p>
              <p><strong>Runtime/Seasons:</strong> {item.runtime || 'N/A'}</p>
              {item.notes && <p><strong>Notes:</strong> {item.notes}</p>}
              <div className="flex-row gap-4 mt-4">
                <button onClick={() => handleEdit(item)} className="btn btn-secondary">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="btn" style={{ background: 'linear-gradient(45deg, #e43a15, #e65245)' }}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
