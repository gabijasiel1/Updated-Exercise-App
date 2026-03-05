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

export default function RunningExercise({ name, imageSrc, onQuit }) {
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
    <section className="workoutScreen">
      <h1 className="workoutTitle">{name}</h1>

      <div className="workoutHero">
        {imageSrc ? (
          <img className="workoutHeroImg" src={imageSrc} alt={`${name}`} />
        ) : (
          <div className="workoutHeroImage workoutHeroImage--running" aria-hidden="true">
            Running
          </div>
        )}
      </div>

      <div className="workoutValuePill" aria-label="Timer value">
        {timeText}
      </div>

      <div className="workoutActionRow">
        {!isRunning ? (
          <button className="iconButton" type="button" onClick={() => setIsRunning(true)}>
            Start
          </button>
        ) : (
          <button className="iconButton" type="button" onClick={() => setIsRunning(false)}>
            Pause
          </button>
        )}

        <button
          className="iconButton"
          type="button"
          onClick={() => {
            setIsRunning(false);
            onQuit?.();
          }}
        >
          Quit
        </button>
      </div>

      <button
        className="workoutReset"
        type="button"
        onClick={() => {
          setIsRunning(false);
          setElapsedMs(0);
        }}
      >
        Reset
      </button>
    </section>
  );
}
