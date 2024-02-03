
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
  };

  let duckPopupWindow: chrome.windows.Window | null = null;

  const toggle = async () => {
    if (!duckPopupWindow) {
      duckPopupWindow = await chrome.windows.create({
        url: 'duck-popup.html',
        type: 'popup',
        width: 400,
        height: 400,
        top: 100,
        left: 100,
      });

      // Periodically update the window to stay always on top
      setInterval(() => {
        chrome.windows.update(duckPopupWindow!.id!, { alwaysOnTop: true } as any);
      }, 1000); // Update every second (adjust as needed)
    } else {
      // If the window is already open, focus on it
      chrome.windows.update(duckPopupWindow.id!, { focused: true, drawAttention: true  });
    }
  };

  return (
    <>
      <h1>Duck Blocker</h1>
      <div className="card">
        <input type='color' onChange={(e) => setColour(e.currentTarget.value)}/>
        <button onClick={() => onclick()}>
          click me
        </button>

        <Stack spacing={2} direction="column">
          <Button variant="contained" onClick={() => toggle()}>Turn On</Button>
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
