import React from 'react';
import './loadingOverlay.css';
import {motion, AnimatePresence} from 'framer-motion';

export const Overlay = ({isVisible}) => (
  <AnimatePresence>
    {!isVisible && (
      <motion.div
        initial={{opacity: 1, x: 0}}
        className="loading-overlay"
        exit={{opacity: 1, x: window.innerWidth}}>
        Pieni hetki. Ladataan sisältöä...
      </motion.div>
    )}
  </AnimatePresence>
);

export default Overlay;
