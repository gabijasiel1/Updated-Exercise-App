import { useEffect, useMemo, useRef, useState } from 'react';

function pad2(value) {
  return String(value).padStart(2, '0');
}

function formatStopwatch(totalMs) {
  const totalCentiseconds = Math.floor(totalMs / 10);
  const minutes = Math.floor(totalCentiseconds / 6000);
  const seconds = Math.floor((totalCentiseconds % 6000) / 100);
  const centiseconds = totalCentiseconds % 100;
  return `${pad2(minutes)}:${pad2(seconds)}:${pad2(centiseconds)}`;
}

export default function DurationExercise({ name }) {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);

  const startTimeRef = useRef(0);
  const baseElapsedRef = useRef(0);

  useEffect(() => {
    if (!isRunning) return undefined;

    startTimeRef.current = performance.now();
    baseElapsedRef.current = elapsedMs;

    const intervalId = setInterval(() => {
      const now = performance.now();
      const delta = now - startTimeRef.current;
      setElapsedMs(baseElapsedRef.current + delta);
    }, 10);

    return () => clearInterval(intervalId);
  }, [isRunning, elapsedMs]);

  const timeText = useMemo(() => formatStopwatch(elapsedMs), [elapsedMs]);

  return (
    <section>
      <h1 className="screenTitle">{name}</h1>

      <div className="card">
        <div className="bigValue" aria-label="Timer value">
          {timeText}
        </div>

        <div className="buttonRow">
          {!isRunning ? (
            <button className="primary" type="button" onClick={() => setIsRunning(true)}>
              Start
            </button>
          ) : (
            <button className="secondary" type="button" onClick={() => setIsRunning(false)}>
              Pause
            </button>
          )}

          <button
            className="secondary"
            type="button"
            onClick={() => {
              setIsRunning(false);
              setElapsedMs(0);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}
