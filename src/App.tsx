
import { useState } from 'react'
import './App.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function App() {
  const [isTurnedOn, setIsTurnedOn] = useState(false);

  const turnOnButtonClick = () => {
    setIsTurnedOn(!isTurnedOn);
    // Add logic to handle the "Turn On" button click
  };

  const optionsClick = () => {
    console.log("clicked on options");
    // Add logic here to handle the "Options" button click
  }

  return (
    <>
      <Typography variant='h4'>Duck Blocker</Typography>
      <div className="card">
        <Stack spacing={2} direction="column">
          <Button
            variant="contained"
            style={{ 
              backgroundColor: isTurnedOn ? '#F63550' : '#2eb071',
              borderRadius: '10px'
            }}
            onClick={turnOnButtonClick}
          >
            {isTurnedOn ? 'Turn Off' : 'Turn On'}
          </Button>
          <Button 
            variant="contained"
            style={{ 
              backgroundColor: '#3491f2',
              borderRadius: '10px'
            }} 
            onClick={optionsClick}
          >
            Options
          </Button>
        </Stack>
      </div>

      <Typography>Please rate us!</Typography>
    </>
  )
}

export default App
