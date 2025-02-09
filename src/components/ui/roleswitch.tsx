'use client';

import { motion } from 'framer-motion';

interface Props {
  role: 'LEAD' | 'TEAM';
  setRole: (role: 'LEAD' | 'TEAM') => void;
}

const RoleSwitch = ({ role, setRole }: Props) => {
  return (
    <div
      className="relative w-full h-12 bg-primary border border-gray-400 rounded-full flex items-center justify-between cursor-pointer"
      onClick={() => setRole(role === 'LEAD' ? 'TEAM' : 'LEAD')}
    >
      <motion.div
        className="absolute w-1/2 h-full bg-secondary rounded-full"
        layout
        initial={false}
        animate={{ x: role === 'LEAD' ? 0 : '100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />

      <div
        className={`relative z-10 flex-1 text-center text-sm font-semibold transition ${
          role === 'LEAD' ? 'text-primary' : 'text-secondary'
        }`}
      >
        LEADER
      </div>

      <div
        className={`relative z-10 flex-1 text-center text-sm font-semibold transition ${
          role === 'TEAM' ? 'text-primary' : 'text-secondary'
        }`}
      >
        TEAM
      </div>
    </div>
  );
};

export default RoleSwitch;
