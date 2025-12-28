import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const RewardModal = ({ isOpen, onClose, reward }) => {
  
  useEffect(() => {
    if (isOpen) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFC0CB', '#FFD700', '#FFF']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFC0CB', '#FFD700', '#FFF']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && reward && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // Close if clicking outside
          onClick={onClose}
        >
          <motion.div 
            className="modal-content glass-panel"
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Close Button */}
            <button className="close-btn" onClick={onClose}>
              <X size={24} color="#586E75" />
            </button>

            {/* Content */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <Sparkles size={40} color="#FFD700" fill="#FFD700" />
              </div>

              <h2 style={{ color: '#FFC0CB', fontSize: '2rem', margin: '0 0 10px 0' }}>
                New Sticker!
              </h2>
              
              <p style={{ color: '#7D7D7D', margin: '0 0 2rem 0' }}>
                You've reached a <strong>{reward.threshold}-day streak!</strong>
              </p>

              <div className="reward-glow">
                <img 
                  src={reward.img} 
                  alt={reward.label} 
                  style={{ width: '120px', height: '120px', objectFit: 'contain' }} 
                />
              </div>

              <h3 style={{ color: '#586E75', marginTop: '1.5rem' }}>
                "{reward.label}"
              </h3>
              
              <button className="collect-btn" onClick={onClose}>
                Collect Reward
              </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RewardModal;