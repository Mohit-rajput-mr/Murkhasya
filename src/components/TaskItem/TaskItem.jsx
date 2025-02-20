import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import sound from '../../assets/mixkit-facility-alarm-sound-999.wav';

const alarmSound = new Audio(sound);
alarmSound.loop = true; // Ensures continuous playing

const TaskItem = ({ task, updateTask, deleteTask }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [editing, setEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(task.name);
  const [updatedTime, setUpdatedTime] = useState(task.reminderTime);
  const [alarmEnabled, setAlarmEnabled] = useState(true);
  const [alarmPlaying, setAlarmPlaying] = useState(task.alarmPlayed || false); // Preserve state

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const taskTime = new Date(task.reminderTime).getTime();
      const diff = taskTime - now;

      if (diff <= 0) {
        // Notify only once when time reaches zero
        if (!task.alarmPlayed && alarmEnabled) {
          toast.info(`Reminder: ${task.name}`);
          alarmSound.play().catch(err => console.error('Error playing alarm:', err));
          setAlarmPlaying(true);
          updateTask(task.id, { alarmPlayed: true }); // Prevents repeated notifications
        }
        setTimeLeft('Time Over');
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [task.reminderTime, alarmEnabled, task.alarmPlayed]);

  const stopAlarm = () => {
    alarmSound.pause();
    alarmSound.currentTime = 0; 
    setAlarmPlaying(false);
    updateTask(task.id, { alarmPlayed: false }); // Reset for future reminders
  };

  const toggleAlarm = () => {
    if (alarmPlaying) {
      stopAlarm();
    }
    setAlarmEnabled(!alarmEnabled);
  };

  return (
    <div className="task-item">
      {editing ? (
        <>
          <input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
          <input type="datetime-local" value={updatedTime} onChange={(e) => setUpdatedTime(e.target.value)} />
          <button onClick={() => { updateTask(task.id, { name: updatedName, reminderTime: updatedTime, alarmPlayed: false }); setEditing(false); }}>Save</button>
        </>
      ) : (
        <>
          <p>{task.name} - {timeLeft}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>🗑️ Delete</button>
        </>
      )}
      <button onClick={toggleAlarm}>
        {alarmEnabled ? '🔕 Alarm Off' : '🔔 Alarm On'}
      </button>
    </div>
  );
};

export default TaskItem;
