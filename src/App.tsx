
import { useState } from 'react'
import './App.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function App() {
  const [colour, setColour] = useState('');

  const onclick = async () => {
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id! },
      args: [colour],
      func: (colour) => {
        // alert('Hello from my extension!');
        document.body.style.backgroundColor = colour;
      }
    });
  }

  return (
    <>
      <h1>Duck Blocker</h1>
      <div className="card">
        <input type='color' onChange={(e) => setColour(e.currentTarget.value)}/>
        <button onClick={() => onclick()}>
          click me
        </button>

        <Stack spacing={2} direction="column">
          <Button variant="contained">Turn On</Button>
          <Button variant="contained">Options</Button>
        </Stack>
      </div>
      <p>
        Please rate us!
      </p>
    </>
  )
}

export default App
