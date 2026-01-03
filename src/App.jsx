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