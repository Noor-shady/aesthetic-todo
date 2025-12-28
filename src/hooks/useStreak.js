import useLocalStorage from './useLocalStorage';
import { isSameDay, isYesterday, parseISO } from 'date-fns';

const useStreak = () => {
  // I will store all streak data in one object in LocalStorage
  const [streakData, setStreakData] = useLocalStorage('my-aesthetic-streak', {
    streak: 0,
    lastCompletionDate: null,
    totalCompleted: 0
  });

  const incrementStreak = () => {
    const today = new Date();
    
    setStreakData((prev) => {
      let newStreak = prev.streak;
      const lastDate = prev.lastCompletionDate ? parseISO(prev.lastCompletionDate) : null;

      if (!lastDate) {
        newStreak = 1;
      } 