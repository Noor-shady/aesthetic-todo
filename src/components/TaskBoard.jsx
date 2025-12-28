import React, { useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import confetti from 'canvas-confetti';
// Generates unique IDs
import { v4 as uuidv4 } from 'uuid';
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';
import useLocalStorage from '../hooks/useLocalStorage';

const TaskBoard = ({ onTaskComplete }) => {
  const [tasks, setTasks] = useLocalStorage('my-aesthetic-tasks', []);
  const [newTask, setNewTask] = useState('');

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const newTasks = Array.from(tasks);
    
    const todoList = newTasks.filter(t => t.status === 'todo');
    const doneList = newTasks.filter(t => t.status === 'done');

    // If reordering within the same list logic would go here
    // For simplicity, I just handle the Status Change logic:
    
    if (source.droppableId === 'todo' && destination.droppableId === 'done') {
      // Find the task and update it
      const movedTaskIndex = newTasks.findIndex(t => t.id === result.draggableId);
      newTasks[movedTaskIndex].status = 'done';
      
      triggerConfetti();
      if (onTaskComplete) onTaskComplete();
    } 
    else if (source.droppableId === 'done' && destination.droppableId === 'todo') {
      const movedTaskIndex = newTasks.findIndex(t => t.id === result.draggableId);
      newTasks[movedTaskIndex].status = 'todo';
    }

    setTasks(newTasks);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task = {
      id: uuidv4(),
      content: newTask,
      status: 'todo',
      createdAt: new Date().toISOString()
    };

    setTasks([...tasks, task]);
    setNewTask('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFC0CB', '#FFB6C1', '#C1E1C1', '#FFF']