import React from 'react'
import { withRouter,useHistory ,useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Container, Typography,Button,TextField,Box } from '@mui/material';


// this a component to edit a question
function EditQuestion() {
    const [questionQcm, setQuestion] = useState({});

    // get the question id from the url
    const {questionId} = useParams();
    const {qcmId} = useParams();
    const history = useHistory();

    // GET request to get the question from the database localhost:8080/question/{id} using useEffect
    useEffect(() => {
        fetch("http://localhost:8080/question/" + questionId)
            .then((response) => response.json())
            .then((data) => {
                setQuestion(data.question);
                console.log(data);
            });
    },[]);

    // PUT request to update the question in the database localhost:8080/question/{id}
    const handleSubmit = (event) => {
        event.preventDefault();
        const question = {
            question: questionQcm,
            qcm: {
                id: qcmId,
            },
        };
        console.log(question);
        fetch("http://localhost:8080/question/" + questionId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(question),
        }).then((response) => {
            if (response.ok) {
                alert('Question modifiée avec succès')
                history.push("/manage/qcm/details/" + qcmId );
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
                    Edit Question
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                    >
                        Edit Question
                    </Button>
                </Box>
            </Box>
        </Container>


    </div>
  )
}

export default withRouter(EditQuestion);