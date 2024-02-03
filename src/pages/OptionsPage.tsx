import { useState } from 'react';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import './OptionsPage.css'

interface WebsiteItem {
  id: number;
  url: string;
}

export function OptionsPage() {
  const [websiteInput, setWebsiteInput] = useState('');
  const [websiteList, setWebsiteList] = useState<WebsiteItem[]>([]);

  const handleAddWebsite = () => {
    if (websiteInput.trim() !== '') {
      setWebsiteList(prevList => [
        ...prevList,
        { id: Date.now(), url: websiteInput.trim() }
      ]);
      setWebsiteInput('');
    }
  };

  return (
    <>
      <Typography variant="h4">Duck Blocker</Typography>
      <Typography variant="body2" color="textSecondary">Choose websites to block</Typography>

      {/* Textfield and Add Button */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <TextField
          label="Enter a domain (ex: reddit.com)"
          variant="outlined"
          size="small"
          value={websiteInput}
          onChange={(e) => setWebsiteInput(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddWebsite} style={{ marginLeft: '8px' }}>
          Add
        </Button>
      </div>

      {/* Table displaying added websites */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Blocked Sites</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {websiteList.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.url}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
