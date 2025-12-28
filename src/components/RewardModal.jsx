import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const RewardModal = ({ isOpen, onClose, reward }) => {
  
