import { useState } from 'react';

export default function RepetitionExercise({ name, imageSrc }) {
  const [count, setCount] = useState(0);

  return (
    <section className="workoutScreen">
      <h1 className="workoutTitle">{name}</h1>

      <div className="workoutHero">
        {imageSrc ? (
          <img className="workoutHeroImg workoutHeroImg--contain" src={imageSrc} alt={`${name}`} />
        ) : (
          <div className="workoutHeroImage workoutHeroImage--pushups" aria-hidden="true">
            Push Ups
          </div>
        )}
      </div>

      <div className="workoutStepper" aria-label="Repetition stepper">
        <button
          className="stepperButton"
          type="button"
          onClick={() => setCount((c) => Math.max(0, c - 1))}
          aria-label="Decrease"
        >
          −
        </button>
        <div className="stepperValue" aria-label="Repetition count">
          {count}
        </div>
        <button className="stepperButton" type="button" onClick={() => setCount((c) => c + 1)} aria-label="Increase">
          +
        </button>
      </div>

      <button className="workoutReset" type="button" onClick={() => setCount(0)}>
        Reset
      </button>
    </section>
  );
}
