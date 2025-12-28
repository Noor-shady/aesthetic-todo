import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Trash2, GripVertical } from 'lucide-react';

const TaskCard = ({ task, index, onDelete }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className="task-card glass-panel"
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            ...provided.draggableProps.style,
            marginBottom: '12px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: snapshot.isDragging ? '#fff' : 'rgba(255, 255, 255, 0.6)',
            transform: snapshot.isDragging ? 'scale(1.05)' : 'scale(1)',
            transition: 'background 0.2s, transform 0.2s',
            borderLeft: task.status === 'done' ? '4px solid #C1E1C1' : '4px solid #FFC0CB'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Drag Handle Icon */}
            <div {...provided.dragHandleProps} style={{ cursor: 'grab', color: '#ccc' }}>
              <GripVertical size={18} />
            </div>
            
            <span style={{ 
              textDecoration: task.status === 'done' ? 'line-through' : 'none',
              color: task.status === 'done' ? '#A0A0A0' : '#586E75',
              fontWeight: '600'
            }}>
              {task.content}
            </span>
          </div>

          <button 
            onClick={() => onDelete(task.id)}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              color: '#ffb7b2',
              opacity: 0.6
            }}
            onMouseOver={(e) => e.target.style.opacity = 1}
            onMouseOut={(e) => e.target.style.opacity = 0.6}
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;