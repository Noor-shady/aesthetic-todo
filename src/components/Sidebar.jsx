import React from 'react';
import { Trophy, Flame, Lock } from 'lucide-react';

const Sidebar = ({ streak = 0, completedCount = 0 }) => {
  
  // Paths assume your images are in: public/assets/stickers/
  const stickers = [
    { id: 1, img: '/assets/stickers/note.png',          label: 'First Step',   threshold: 1 },
    { id: 2, img: '/assets/stickers/star.png',          label: 'Rising Star',  threshold: 3 },
    { id: 3, img: '/assets/stickers/heart.png',         label: 'Sweet',        threshold: 5 },
    { id: 4, img: '/assets/stickers/ribbon.png',        label: 'Winner',       threshold: 7 },
    { id: 5, img: '/assets/stickers/chick.png',         label: 'Hatching',     threshold: 10 },
    { id: 6, img: '/assets/stickers/kitty.png',         label: 'Purrfect',     threshold: 14 },
    { id: 7, img: '/assets/stickers/butterflies.png',   label: 'Flutter',      threshold: 21 },
    { id: 8, img: '/assets/stickers/butterflies-2.png', label: 'Soaring',      threshold: 30 },
    { id: 9, img: '/assets/stickers/moon.png',          label: 'Dreamer',      threshold: 45 },
    { id: 10, img: '/assets/stickers/love.png',         label: 'Forever',      threshold: 60 },
  ];

  return (
    <aside className="sidebar glass-panel">
      {/* Header Section */}
      <div className="sidebar-header">
        <h2 style={{ color: '#586E75', marginBottom: '1.5rem', fontSize: '1.5rem' }}>My Journey</h2>
        
        <div className="streak-container">
          {/* Streak Box */}
          <div className="stat-box">
            <Flame size={28} color="#FFC0CB" fill="#FFC0CB" />
            <span className="stat-value">{streak}</span>
            <span className="stat-label">Day Streak</span>
          </div>
          
          {/* Tasks Done Box */}
          <div className="stat-box">
            <Trophy size={28} color="#FFD700" fill="#FFD700" />
            <span className="stat-value">{completedCount}</span>
            <span className="stat-label">Tasks Done</span>
          </div>
        </div>
      </div>