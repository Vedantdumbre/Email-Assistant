import { useState } from 'react'
import './App.css'
import axios from 'axios';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress, Typography} from '@mui/material';


function App() {
  const [emailContent , setEmailContent] = useState('');
  const [tone , setTone] = useState('');
  const [generatedReply , setGeneratedReply] = useState('');
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState('');

  const handleSubmit = async() =>{
      setLoading(true)
      setError('');
      try {
        const response = await axios.post("http://localhost:8080/api/email/generate", {
          emailContent,
          tone
      });
        setGeneratedReply(typeof response.data ==='string'? response.data: JSON.stringify(response.data));
      } catch (error) {
        setError('Failed to generate email reply .Please try again');
        console.error(error);
      } finally{
        setLoading(false);
      }
  };

  return (
    <>
      <Container maxWidth="md" sx={{py:4}} >
        <div className="hero1">MailNova</div>
        <Box sx={{mx : 3}} >
          <TextField 
          fullWidth
          multiline
          rows={10}
          variant='outlined'
          label =" Original Email Content"
          value={emailContent || ''}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{mb : 2}}/>
          <FormControl fullWidth sx={{mb : 2}} >
            <InputLabel>Tone (Optional)</InputLabel>
            <Select 
              value={tone || ''}
              label={"Tone Optional"} 
              onChange={(e) => setTone(e.target.value)}>
                <MenuItem value="none" >None</MenuItem>
                <MenuItem value="professional" >Professional</MenuItem>
                <MenuItem value="friendly" >Friendly</MenuItem>
                <MenuItem value="sarcasm" >Sarcasm</MenuItem>
                <MenuItem value="casual" >Casual</MenuItem>
              </Select>
          </FormControl>

          <Button
          variant=''
          onClick={handleSubmit}
          disabled = {!emailContent || loading}
          fullWidth>
            {loading ? <CircularProgress size={24}/> : "Generated Reply"}
          </Button>
        </Box>

        {error && (
          <Typography color='error' sx={{mb:2}} >
            {error}
          </Typography>
        )}

        {generatedReply && (
          <Box sx={{mt : 3}}>
            <Typography variant='h6' gutterBottom>
              Generated Replay:
            </Typography>
            <TextField 
              fullWidth
              multiline
              rows={6}
              variant='outlined'
              value={generatedReply || ''}
              inputProps={{readOnly : true}} />

              <Button
                variant='outlined'
                sx={{mt : 2}}
                onClick={() => navigator.clipboard.writeText(generatedReply)}>
                Copy to Clipboard
              </Button>
          </Box>
        )}
      </Container>
    </>
  )
}

export default App
