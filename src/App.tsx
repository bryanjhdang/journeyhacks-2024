
// import { useState } from 'react'
import './App.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function App() {
  // const [colour, setColour] = useState('');

  // const onclick = async () => {
  //   let [tab] = await chrome.tabs.query({ active: true });
  //   chrome.scripting.executeScript<string[], void>({
  //     target: { tabId: tab.id! },
  //     args: [colour],
  //     func: (colour) => {
  //       // alert('Hello from my extension!');
  //       document.body.style.backgroundColor = colour;
  //     }
  //   });
  // }

  const optionsClick = async () => {
    console.log("clicked on options");
  }

  return (
    <>
      <Typography variant="h1" component="h2">Duck Blocker</Typography>
      <div className="card">
        {/* <input type='color' onChange={(e) => setColour(e.currentTarget.value)}/> */}

        <Stack spacing={2} direction="column">
          <Button variant="contained">
            Turn On
          </Button>
          <Button variant="contained" onClick={() => optionsClick()}>
            Options
          </Button>
        </Stack>
      </div>

      <Typography>
        Please rate us!
      </Typography>
    </>
  )
}

export default App
