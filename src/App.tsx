import { useState, useEffect } from 'react';
import './App.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function App() {
  const [isTurnedOn, setIsTurnedOn] = useState(false);

  // Load the initial state from chrome.storage
  useEffect(() => {
    chrome.storage.sync.get('isTurnedOn', (data) => {
      setIsTurnedOn(!!data.isTurnedOn); // Convert undefined to false
    });
  }, []);

  const turnOnButtonClick = () => {
    const newIsTurnedOn = !isTurnedOn;
    setIsTurnedOn(newIsTurnedOn);

    // Save the state to chrome.storage
    chrome.storage.sync.set({ isTurnedOn: newIsTurnedOn });
  };

  const optionsClick = () => {
    chrome.tabs.create({ url: "./src/pages/options.html" });
  };

  return (
    <>
      <Typography variant='h4'>Duck Blocker</Typography>
      <div className="card">
        <Stack spacing={2} direction="column">
          <Button
            variant="contained"
            style={{ 
              backgroundColor: isTurnedOn ? '#F63550' : '#2eb071',
              borderRadius: '10px',
              width: '200px'
            }}
            onClick={turnOnButtonClick}
          >
            {isTurnedOn ? 'Turn Off' : 'Turn On'}
          </Button>
          <Button 
            variant="contained"
            style={{ 
              backgroundColor: '#3491f2',
              borderRadius: '10px',
              width: '200px'
            }} 
            onClick={optionsClick}
          >
            Options
          </Button>
        </Stack>
      </div>
    </>
  );
}

export default App;
