import React from 'react'
import { withRouter } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import QuestionList from '../QuestionsForm/QuestionList'


function DetailQcm() {
    const {qcmId} = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const history = useHistory();
    // GET request to get the qcm from the database localhost:8080/qcm/{id} using useEffect
    useEffect(() => {
        fetch("http://localhost:8080/qcm/" + qcmId)
            .then((response) => response.json())
            .then((data) => {
                setTitle(data.title);
                setDescription(data.description);
            });
    },[]);
    
     
    // Using Material UI display the form to edit the qcm
  return (
    <div>
        <Container component="main" maxWidth="xs">
            <Box sx={{

                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Typography component="h1" variant="h5">
                    Details QCM
                </Typography>
                <Box component="form"  noValidate sx={{ mt: 1 }}>
                    <TextField 
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        autoComplete="title"
                        autoFocus
                        disabled
                        value={title}
                        sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#0652DD", }, }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="description"
                        label="Description"
                        type="description"
                        id="description"
                        autoComplete="current-description"
                        value={description}
                        disabled
                        onChange={(event) => setDescription(event.target.value)}
                        sx={{ "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#0652DD", }, }}
                    />
                </Box>
            </Box>
        </Container>
        <QuestionList/>
    </div>
  )
}

export default withRouter(DetailQcm) ;