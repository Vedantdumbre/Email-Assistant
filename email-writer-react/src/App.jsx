import { useState } from 'react'
import './App.css'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


function App() {
  const [emailContent , setEmailContent] = useState('');
  const [tone , setTone] = useState('');
  const [generatedReply , setGeneratedReply] = useState('');
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState('');
  return (
    <>
      <Container maxWidth="md" sx={{py:4}} >
        <div className="hero1">Email Assistant</div>
        <Box sx={{mx : 3}} >
          <TextField 
          fullWidth
          multiline
          rows={10}
          variant='outlined'
          label =" Original Email Content"
          value={emailContent || ''}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{mb : 3}}
          />
        </Box>
      </Container>
    </>
  )
}

export default App
