import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [habits, setHabits] = useState([]);
  const [habitInput, setHabitInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("habits");
    if (saved) {
      setHabits(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (!habitInput.trim()) return;

    const newHabit = {
      id: Date.now(),
      name: habitInput,
      streak: 0,
    };

    setHabits([...habits, newHabit]);
    setHabitInput("");
  };

  const increaseStreak = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id
          ? { ...habit, streak: habit.streak + 1 }
          : habit
      )
    );
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  return (
    <div className="container">
      <h1>Habit Tracker</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter habit"
          value={habitInput}
          onChange={(e) => setHabitInput(e.target.value)}
        />

        <button onClick={addHabit}>Add Habit</button>
      </div>

      <div className="habit-list">
        {habits.map((habit) => (
          <div className="habit-card" key={habit.id}>
            <h2>{habit.name}</h2>
            <p>🔥 Streak: {habit.streak}</p>

            <button onClick={() => increaseStreak(habit.id)}>
              Completed Today
            </button>

            <button onClick={() => deleteHabit(habit.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
