import { useState } from 'react';

export default function RepetitionExercise({ name }) {
  const [count, setCount] = useState(0);

  return (
    <section>
      <h1 className="screenTitle">{name}</h1>

      <div className="card">
        <div className="bigValue" aria-label="Repetition count">
          {count}
        </div>

        <div className="buttonRow">
          <button className="primary" type="button" onClick={() => setCount((c) => c + 1)}>
            +1 Rep
          </button>
          <button className="secondary" type="button" onClick={() => setCount(0)}>
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}

