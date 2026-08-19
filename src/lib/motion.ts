import { type Transition, type Variants } from "framer-motion";

/**
 * Editorial, restrained motion presets.
 * Follows the standard Apple / Linear deceleration curve.
 */
export const transitions = {
  spring: {
    type: "spring",
    damping: 30,
    stiffness: 300,
  } as Transition,
  smooth: {
    duration: 0.25,
    ease: [0.16, 1, 0.3, 1], // ease-out-expo
  } as Transition,
  subtle: {
    duration: 0.15,
    ease: [0.16, 1, 0.3, 1],
  } as Transition,
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.smooth,
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};
