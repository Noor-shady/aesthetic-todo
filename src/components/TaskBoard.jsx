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
    
