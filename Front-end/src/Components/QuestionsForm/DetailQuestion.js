import React from 'react'
import { withRouter } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import ReponseList from '../reponse/ReponseList';


function DetailQuestion() {
    const {qcmId, questionId} = useParams();
    const [questionQcm, setQuestion] = useState({});
    const history = useHistory();
    useEffect(() => {
        fetch("http://localhost:8080/question/" + questionId)
            .then((response) => response.json())
            .then((data) => {
                setQuestion(data.question);
                console.log(data);
            });
    },[]);

    const editQuestion = (questionId) => {
        history.push(`/question/edit/${qcmId}/${questionId}`)
      };

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
                    Details Question
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
                        
                        value={questionQcm}
                        onChange={(event) => setQuestion(event.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => editQuestion(questionId)}
                    >
                        Edit Question
                    </Button>
                </Box>
            </Box>
        </Container>

        <ReponseList qcmId={qcmId} questionId={questionId} />

    </div>
  )
}

export default withRouter(DetailQuestion);