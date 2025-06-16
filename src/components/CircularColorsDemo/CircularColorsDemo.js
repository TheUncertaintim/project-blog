"use client";
import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";
import { motion, MotionConfig } from "framer-motion";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [timeElapsed, setTimeElapsed] = React.useState(0);

  const selectedColor = COLORS[timeElapsed % COLORS.length];

  React.useEffect(() => {
    let intervalId;
    if (isPlaying) {
      intervalId = window.setInterval(
        () => setTimeElapsed((currentTime) => (currentTime += 1)),
        1000
      );
    }
    return () => window.clearInterval(intervalId);
  }, [isPlaying]);

  const togglePlayState = () => setIsPlaying(!isPlaying);
  function toggleReset() {
    // cancel timer
    setIsPlaying(false);
    // reset counter
    setTimeElapsed(0);
  }

  return (
    <Card as="section" className={styles.wrapper}>
      <MotionConfig reducedMotion="user">
        <ul className={styles.colorsWrapper}>
          {COLORS.map((color, index) => {
            const isSelected = color.value === selectedColor.value;

            return (
              <li className={styles.color} key={index}>
                {isSelected && (
                  <motion.div
                    layoutId="borderOutline"
                    className={styles.selectedColorOutline}
                  />
                )}
                <div
                  className={clsx(
                    styles.colorBox,
                    isSelected && styles.selectedColorBox
                  )}
                  style={{
                    backgroundColor: color.value,
                  }}
                >
                  <VisuallyHidden>{color.label}</VisuallyHidden>
                </div>
              </li>
            );
          })}
        </ul>
      </MotionConfig>
      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={togglePlayState}>
            {isPlaying ? (
              <>
                <Pause />
                <VisuallyHidden>Pause</VisuallyHidden>
              </>
            ) : (
              <>
                <Play />
                <VisuallyHidden>Play</VisuallyHidden>
              </>
            )}
          </button>
          <button onClick={toggleReset}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
