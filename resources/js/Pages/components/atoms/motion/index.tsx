import { motion, spring } from 'framer-motion';
import React from 'react';

interface MotionProps {
    children?: React.ReactNode;
}

const Motion: React.FC<MotionProps> = ({ children }) => (
    <motion.div
        style={{
            height: '100%'
        }}
        initial={{ transform: 'translateY(100%)' }}
        animate={{ transform: 'translateY(0%)' }}
        transition={{ duration: 1 }}
    >{children}
    </motion.div>
);

Motion.defaultProps = {
    children: undefined,
};

export default Motion;
