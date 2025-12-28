import useLocalStorage from './useLocalStorage';
import { isSameDay, isYesterday, parseISO } from 'date-fns';

const useStreak = () => {
  // We store all streak data in one object in LocalStorage
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