'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

const variants = {
  out: {
    opacity: 0,
    transition: {
      duration: 0.3,
    }
  },
  in: {
    opacity: 1,
    transition: {
      duration: 0.5,
    }
  }
};

const Transition = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Transition;

/**key={pathname}
        variants={variants}
        initial="out"
        animate="in"
        exit="out"
        className="w-full h-full" */