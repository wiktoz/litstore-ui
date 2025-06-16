'use client'

import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ContentOnCheckboxProps {
  isChecked: boolean;
  children: ReactNode;
}

const ContentOnCheckbox = ({ isChecked, children }: ContentOnCheckboxProps) => {
  return (
    <AnimatePresence initial={false}>
      {isChecked && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContentOnCheckbox;