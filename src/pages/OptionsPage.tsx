// OptionsPage.tsx

import { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import './OptionsPage.css';

interface WebsiteItem {
  id: number;
  url: string;
}

export function OptionsPage() {
  const [websiteInput, setWebsiteInput] = useState('');
  const [websiteList, setWebsiteList] = useState<WebsiteItem[]>([]);

  useEffect(() => {
    // Load data from local storage on component mount
    const storedWebsites = JSON.parse(localStorage.getItem('websiteList') || '[]');
    setWebsiteList(storedWebsites);
  }, []);

  const updateLocalStorage = (newWebsiteList: WebsiteItem[]) => {
    // Update local storage whenever the websiteList changes
    localStorage.setItem('websiteList', JSON.stringify(newWebsiteList));
  };

  const handleAddWebsite = () => {
    if (websiteInput.trim() !== '') {
      const newWebsiteItem: WebsiteItem = { id: Date.now(), url: websiteInput.trim() };
      const newWebsiteList = [...websiteList, newWebsiteItem];

      setWebsiteList(newWebsiteList);
      updateLocalStorage(newWebsiteList);

      setWebsiteInput('');
    }
  };

  const handleDeleteWebsite = (id: number) => {
    const newWebsiteList = websiteList.filter((item) => item.id !== id);

    setWebsiteList(newWebsiteList);
    updateLocalStorage(newWebsiteList);
  };

  return (
    <>
      <Typography variant="h4">Duck Blocker</Typography>
      <Typography variant="body2" color="textSecondary">Choose websites to block</Typography>

      {/* Textfield and Add Button */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginTop: '16px',
        marginBottom: '24px' 
      }}>
        <TextField
          label="Enter a domain (ex: reddit.com)"
          variant="outlined"
          size="small"
          style={{ width: '400px' }}
          value={websiteInput}
          onChange={(e) => setWebsiteInput(e.target.value)}
        />
        <Button 
          variant="contained" 
          onClick={handleAddWebsite} 
          style={{ 
            marginLeft: '8px',
            backgroundColor: '#3491f2',
            borderRadius: '10px',
          }}
        >
          + Add
        </Button>
      </div>

      {/* Table displaying added websites */}
      <Table>
        <TableHead>
          <TableRow>
            <Typography variant="h5">Blocked Sites</Typography>
          </TableRow>
        </TableHead>
        <TableBody>
          {websiteList.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.url}</TableCell>
              <TableCell>
                <IconButton 
                  aria-label="delete" 
                  // color="black"
                  style={{color: 'black'}} 
                  onClick={() => handleDeleteWebsite(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
