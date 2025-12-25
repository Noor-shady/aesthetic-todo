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