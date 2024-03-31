import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import PlayButton from './playbutton';
import PauseButton from './pause';
import Setting from './setting';
import { useContext, useState, useEffect, useRef } from 'react';
import SettingContext from './settingcontext';

function Timer() {
  const settingsInfo = useContext(SettingContext);
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('work'); //work // break or pause 
  const [secondsLeft, setSecondsLeft] = useState(settingsInfo.workMinutes * 60);
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  useEffect(() => {
    secondsLeftRef.current = secondsLeft;
  }, [secondsLeft]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  function initTimer() {
    setSecondsLeft(settingsInfo.workMinutes * 60);
  }

  useEffect(() => {
    initTimer();

    const intervalId = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current > 0) {
        setSecondsLeft(secondsLeftRef.current - 1);
      } else {
        if (modeRef.current === 'work') {
          setMode('break');
          setSecondsLeft(settingsInfo.breakMinutes * 60);
        } else {
          setMode('work');
          setSecondsLeft(settingsInfo.workMinutes * 60);
        }
      }
    }, 1000); // 1000 milliseconds = 1 second

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [settingsInfo]);

  const totalSeconds = mode === 'work' ? settingsInfo.workMinutes * 60 : settingsInfo.breakMinutes * 60;
  const percentage = Math.round(secondsLeft / totalSeconds * 100);
  const minutes = Math.floor(secondsLeft / 60);
  let seconds = Math.floor(secondsLeft % 60);
  if (seconds < 10) seconds = '0' + seconds;
  const styles = buildStyles({
    rotation: 0.5,
    strokeLinecap: 'butt',
    textColor: '#fff',
    pathColor: mode === 'work' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 255, 0, 1)',
    trailColor: 'rgba(169,169,169,1)',
    pathTransition: 'none', // This disables the animation
    strokeWidth: 0.1, // This sets the width of the progress bar
  });
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '500px', height: '500px' }}>
        <CircularProgressbar
          value={percentage}
          text={minutes + ':' + seconds}
          styles={styles}
          strokeWidth={0.5}
          
        />
        <div style={{ marginLeft: '85px' }}>
          {isPaused ? <PlayButton onClick={()=>{setIsPaused(false);isPausedRef.current = false;}}/> 
          : <PauseButton onClick={()=>{setIsPaused(true);isPausedRef.current = true;}} />}
        </div>
        <div style={{ marginTop: '20px', marginLeft: '120px' }}><Setting onClick={() => settingsInfo.setShowSettings(true)} /></div>
      </div>
    </div>
  );
}

export default Timer;