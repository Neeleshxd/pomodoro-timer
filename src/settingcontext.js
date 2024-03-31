import React from 'react';
const defaultValue = { workMinutes: 0, breakMinutes: 0 };
const SettingContext = React.createContext(defaultValue);
export default SettingContext;