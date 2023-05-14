import React from 'react'
import { useState,useEffect } from 'react'
import { useParams,useHistory} from 'react-router-dom';
import { Container,Box, Button, TextField, Typography } from "@mui/material";

// Add a question to a qcm with the id qcmId



function AddQuestion() {
    const [question, setQuestion] = useState("");
    const {qcmId} = useParams();
    const history = useHistory();

    const addClick = (event) => {
        event.preventDefault();
        fetch("http://localhost:8080/question/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                question: question,
                qcm: {
                    id: qcmId,
                },
            }),
        }).then((response) => {
            if (response.ok) {
                alert('Question ajoutée avec succès')
                history.push('/manage/qcm/details/' + qcmId);
            }
        });
    }


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
                    Ajouter une question
                </Typography>
                <Box component="form" onSubmit={addClick} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="question"
                        label="Question"
                        name="question"
                        autoFocus
                        onChange={(event) => setQuestion(event.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Ajouter
                    </Button>
                </Box>
            </Box>
        </Container>
    </div>
  )
}

export default AddQuestion