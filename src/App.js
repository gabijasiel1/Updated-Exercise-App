import './App.css';
import { useMemo, useState } from 'react';

import DurationExercise from './components/DurationExercise';
import RepetitionExercise from './components/RepetitionExercise';

function App() {
  const exercises = useMemo(
    () => [
      { id: 'push-ups', name: 'Push Ups', type: 'repetition' },
      { id: 'sit-ups', name: 'Sit Ups', type: 'repetition' },
      { id: 'plank', name: 'Plank', type: 'duration' },
      { id: 'jumping-jacks', name: 'Jumping Jacks', type: 'duration' },
    ],
    []
  );

  const [selectedExerciseId, setSelectedExerciseId] = useState(null);

  const selectedExercise = useMemo(() => {
    if (!selectedExerciseId) return null;
    return exercises.find((e) => e.id === selectedExerciseId) ?? null;
  }, [exercises, selectedExerciseId]);

  let screen = (
    <section className="menuScreen">
      <h1 className="appTitle">Exercise Tracker</h1>
      <p className="subTitle">Choose an exercise:</p>

      <div className="menuGrid">
        {exercises.map((exercise) => (
          <button
            key={exercise.id}
            className="menuButton"
            type="button"
            onClick={() => setSelectedExerciseId(exercise.id)}
          >
            <div className="menuButtonTitle">{exercise.name}</div>
            <div className="menuButtonMeta">{exercise.type}</div>
          </button>
        ))}
      </div>
    </section>
  );

  if (selectedExercise) {
    const exerciseComponent =
      selectedExercise.type === 'repetition' ? (
        <RepetitionExercise name={selectedExercise.name} />
      ) : (
        <DurationExercise name={selectedExercise.name} />
      );

    screen = (
      <section className="exerciseScreen">
        <div className="topBar">
          <button className="backButton" type="button" onClick={() => setSelectedExerciseId(null)}>
            ← Menu
          </button>
          <div className="topBarMeta">{selectedExercise.type}</div>
        </div>
        {exerciseComponent}
      </section>
    );
  }

  return (
    <div className="AppShell">
      <main className="AppMain">{screen}</main>
    </div>
  );
}

export default App;
