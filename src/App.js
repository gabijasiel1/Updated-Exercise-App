import './App.css';
import { useMemo, useState } from 'react';

import DurationExercise from './components/DurationExercise';
import RepetitionExercise from './components/RepetitionExercise';
import RunningExercise from './components/RunningExercise';

function App() {
  const publicImage = (filename) => `${process.env.PUBLIC_URL}/images/${filename}`;
  const exerciseImages = useMemo(
    () => ({
      'push-ups': 'pushups.png',
      plank: 'plank.png',
      running: 'run.png',
    }),
    []
  );

  const exercises = useMemo(
    () => [
      { id: 'push-ups', name: 'Push Up', type: 'repetition' },
      { id: 'plank', name: 'Plank', type: 'duration' },
      { id: 'running', name: 'Running', type: 'running' },
    ],
    []
  );

  const [selectedExerciseId, setSelectedExerciseId] = useState(null);

  const selectedExercise = useMemo(() => {
    if (!selectedExerciseId) return null;
    return exercises.find((e) => e.id === selectedExerciseId) ?? null;
  }, [exercises, selectedExerciseId]);

  const header = (
    <header className="appHeader">
      <div className="logoMark">
        <img className="logoImage" src={publicImage('Logo.jpg')} alt="FitTrack logo" />
      </div>
      <button className="notifButton" type="button" aria-label="Notifications">
        •
      </button>
    </header>
  );

  const bottomNav = (
    <nav className="bottomNav" aria-label="Bottom navigation">
      <button className="bottomNavItem" type="button">
        Profile
      </button>
      <button
        className="bottomNavItem bottomNavItem--active"
        type="button"
        onClick={() => setSelectedExerciseId(null)}
      >
        Home
      </button>
      <button className="bottomNavItem" type="button">
        Activity
      </button>
    </nav>
  );

  let screen = (
    <section className="homeScreen" aria-label="Workout menu">
      <div className="homeTitleRow">
        <h1 className="homeTitle">
          My Workouts <span aria-hidden="true">→</span>
        </h1>
      </div>

      <div className="workoutList">
        {exercises.map((exercise) => (
          <button
            key={exercise.id}
            className="workoutCard"
            type="button"
            onClick={() => setSelectedExerciseId(exercise.id)}
          >
            <div className="workoutThumb" aria-hidden="true">
              <img className="workoutThumbImg" src={publicImage(exerciseImages[exercise.id])} alt="" />
            </div>
            <div className="workoutCardBody">
              <div className="workoutCardTitle">{exercise.name}</div>
            </div>
            <div className="workoutCardChevron" aria-hidden="true">
              ›
            </div>
          </button>
        ))}
      </div>
    </section>
  );

  if (selectedExercise) {
    let exerciseComponent = null;
    const imageSrc = publicImage(exerciseImages[selectedExercise.id]);

    if (selectedExercise.type === 'repetition') {
      exerciseComponent = <RepetitionExercise name={selectedExercise.name} imageSrc={imageSrc} />;
    } else if (selectedExercise.type === 'duration') {
      exerciseComponent = <DurationExercise name={selectedExercise.name} imageSrc={imageSrc} />;
    } else if (selectedExercise.type === 'running') {
      exerciseComponent = (
        <RunningExercise name={selectedExercise.name} imageSrc={imageSrc} onQuit={() => setSelectedExerciseId(null)} />
      );
    }

    screen = (
      <section className="detailShell" aria-label={`${selectedExercise.name} screen`}>
        {exerciseComponent}
        <button className="floatingBack" type="button" onClick={() => setSelectedExerciseId(null)} aria-label="Back">
          ←
        </button>
      </section>
    );
  }

  return (
    <div className="phoneFrame">
      <div className="phoneGradient" aria-hidden="true" />
      <div className="phoneContent">
        {header}
        <main className="phoneMain">{screen}</main>
        {bottomNav}
      </div>
    </div>
  );
}

export default App;
