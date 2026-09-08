import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion.js';
import styles from './Typewriter.module.css';

/**
 * Escribe `text` carácter a carácter. Respeta prefers-reduced-motion
 * (muestra el texto completo de inmediato).
 *
 * @param {object} props
 * @param {string} props.text
 * @param {number} [props.speed=45] - ms por carácter.
 * @param {number} [props.startDelay=0] - ms antes de empezar.
 * @param {boolean} [props.cursor=true]
 * @param {() => void} [props.onDone]
 */
export function Typewriter({
  text,
  speed = 45,
  startDelay = 0,
  cursor = true,
  onDone,
  className = '',
}) {
  const [output, setOutput] = useState('');
  const reduced = usePrefersReducedMotion();

  // Mantenemos `onDone` en un ref, actualizado fuera del render (en un effect),
  // para no recrear el temporizador cada vez que cambie la función.
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  });

  useEffect(() => {
    const timers = [];

    // Programamos el trabajo en un timer (no en el cuerpo del effect) para
    // que ningún setState sea síncrono dentro del effect.
    timers.push(
      setTimeout(() => {
        if (reduced) {
          setOutput(text);
          onDoneRef.current?.();
          return;
        }
        setOutput('');
        let i = 0;
        const tick = () => {
          i += 1;
          setOutput(text.slice(0, i));
          if (i < text.length) {
            timers.push(setTimeout(tick, speed));
          } else {
            onDoneRef.current?.();
          }
        };
        timers.push(setTimeout(tick, startDelay));
      }, 0),
    );

    return () => timers.forEach(clearTimeout);
  }, [text, speed, startDelay, reduced]);

  return (
    <span className={[styles.type, className].filter(Boolean).join(' ')}>
      {output}
      {cursor && (
        <span className={styles.cursor} aria-hidden="true">
          ▮
        </span>
      )}
    </span>
  );
}
