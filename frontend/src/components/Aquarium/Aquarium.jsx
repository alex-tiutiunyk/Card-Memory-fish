import { useEffect } from 'react';
import { generateBubbles } from '../../utils/bubbleGenerator';
import { generateFish } from '../../utils/fishGenerator';
import styles from './Aquarium.module.css';

export default function Aquarium() {
  useEffect(() => {
    const intervalBubbles = setInterval(generateBubbles, 500);
    const intervalFishes = setInterval(generateFish, 1500);
    return () => {
      clearInterval(intervalBubbles);
      clearInterval(intervalFishes);
    };
  }, []);

  useEffect(() => {
    let event = '';
    const isTouchSupported =
      'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    isTouchSupported ? (event = 'touchmove') : (event = 'mousemove');

    const onMove = (e) => {
      let clientEvent = e;

      if (isTouchSupported) {
        const touch = e.touches[0];
        clientEvent = touch;
      }

      Object.assign(document.documentElement, {
        style: `
        --move-x: ${((clientEvent.clientX - window.innerWidth / 2) * -0.007).toFixed(1)}deg;
        --move-y: ${((clientEvent.clientY - window.innerHeight / 2) * 0.015).toFixed(1)}deg;
      `,
      });
    };

    document.addEventListener(event, onMove);

    return () => document.removeEventListener(event, onMove);
  }, []);

  return (
    <div className={`aquarium ${styles.container}`}>
      <div className={styles.layer}></div>
      <div className={styles.coral_1}></div>
      <div className={styles.coral_2}></div>
      <div className={styles.coral_3}></div>
    </div>
  );
}
