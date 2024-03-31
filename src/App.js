import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Timer from "./timer";
import Extra from "./settings"; 
import { useState } from 'react';
import SettingContext from './settingcontext';

function App() {
  const [showSettings, setShowSettings] = useState(true);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <main>
      <SettingContext.Provider value={{
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
        showSettings,
        setShowSettings,
      }}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/" element={showSettings ? <Extra/> : <Timer/>} />
            {/* Add more routes as needed */}
          </Routes>
        </BrowserRouter>
      </SettingContext.Provider>
    </main>
  );
}

export default App;