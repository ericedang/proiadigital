import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function Drawer({ isOpen, onClose, title, subtitle, children }: DrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-end">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full max-w-3xl h-full bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white text-primary">
              <div>
                <h2 className="text-2xl font-display font-black tracking-tighter uppercase">
                  {title}
                </h2>
                {subtitle && <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">{subtitle}</p>}
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 transition-colors rounded-full">
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// MJ Commit
