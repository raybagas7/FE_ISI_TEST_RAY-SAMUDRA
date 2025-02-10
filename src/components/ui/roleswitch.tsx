'use client';

import { motion } from 'framer-motion';

interface Props {
  role: 'LEAD' | 'TEAM';
  setRole: (role: 'LEAD' | 'TEAM') => void;
}

const RoleSwitch = ({ role, setRole }: Props) => {
  return (
    <div
      className="relative w-full h-12 bg-background border border-gray-400 rounded-full flex items-center justify-between cursor-pointer"
      onClick={() => setRole(role === 'LEAD' ? 'TEAM' : 'LEAD')}
    >
      <motion.div
        className="absolute w-1/2 h-full bg-primary rounded-full"
        layout
        initial={false}
        animate={{ x: role === 'LEAD' ? 0 : '100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />

      <div
        className={`relative z-10 flex-1 text-center text-sm font-semibold transition ${
          role === 'LEAD' ? 'text-background' : 'text-primary'
        }`}
      >
        LEADER
      </div>

      <div
        className={`relative z-10 flex-1 text-center text-sm font-semibold transition ${
          role === 'TEAM' ? 'text-background' : 'text-primary'
        }`}
      >
        TEAM
      </div>
    </div>
  );
};

export default RoleSwitch;
