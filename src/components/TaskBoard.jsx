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
    // For simplicity, I will just handle the Status Change logic:
    
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
    });
  };

  return (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      
      {/* Input Section */}
      <form onSubmit={addTask} style={{ marginBottom: '2rem', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          className="glass-panel"
          placeholder="✨ Add a new focus..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{
            flex: 1,
            padding: '16px',
            border: 'none',
            outline: 'none',
            fontSize: '1rem',
            color: '#586E75'
          }}
        />
        <button 
          type="submit" 
          className="glass-panel"
          style={{
            padding: '0 20px',
            cursor: 'pointer',
            background: '#FFC0CB',
            border: 'none',
            color: 'white'
          }}
        >
          <Plus size={24} />
        </button>
      </form>

      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          
          <div className="glass-panel" style={{ padding: '1rem', minHeight: '400px' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#FFB6C1', textAlign: 'center' }}>To Do</h3>
            <Droppable droppableId="todo">
              {(provided) => (
                <div 
                  ref={provided.innerRef} 
                  {...provided.droppableProps} 
                  style={{ minHeight: '300px' }}
                >
                  {tasks
                    .filter(t => t.status === 'todo')
                    .map((task, index) => (
                      <TaskCard key={task.id} task={task} index={index} onDelete={deleteTask} />
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* DONE COLUMN */}
          <div className="glass-panel" style={{ padding: '1rem', minHeight: '400px', background: 'rgba(255,255,255,0.4)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#C1E1C1', textAlign: 'center' }}>Done</h3>
            <Droppable droppableId="done">
              {(provided) => (
                <div 
                  ref={provided.innerRef} 
                  {...provided.droppableProps} 
                  style={{ minHeight: '300px' }}
                >
                  {tasks
                    .filter(t => t.status === 'done')
                    .map((task, index) => (
                      <TaskCard key={task.id} task={task} index={index} onDelete={deleteTask} />
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;