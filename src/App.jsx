import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TaskBoard from './components/TaskBoard';
import RewardModal from './components/RewardModal';
import useStreak from './hooks/useStreak';

function App() {
  const { streak, totalCompleted, incrementStreak } = useStreak();
  
  // State for the Pop-up Reward Modal
  const [showReward, setShowReward] = useState(false);
  const [currentReward, setCurrentReward] = useState(null);

  // I need this list here so I know WHICH sticker to show in the pop-up
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

  useEffect(() => {
    // Find if the new streak matches a specific reward threshold
    const newlyUnlocked = stickers.find(s => s.threshold === streak);
    
    // If I just hit a milestone, show the modal!
    if (newlyUnlocked) {
      // Small delay (500ms) so the user sees the number update first, then the pop-up
      setTimeout(() => {
        setCurrentReward(newlyUnlocked);
        setShowReward(true);
      }, 500);
    }
  }, [streak]);

  return (
    <div className="app-container">