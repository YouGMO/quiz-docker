import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container,Box,Button,Typography } from '@mui/material';
import './question.css';

function QuestionList() {
  const [change, setChange] = useState(false);
  const [questions, setQuestions] = useState([]);
  const { qcmId } = useParams();
  const history = useHistory();
  

  const addClick = () => {
    history.push('/question/add/' + qcmId);
  };

  const deleteQuestion = (id) => {
    // add a pop up to confirm the deletion
    const confirm = window.confirm('Voulez-vous vraiment supprimer cette question ?');
    if (confirm) {
    fetch('http://localhost:8080/question/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        alert('Question supprimée avec succès');
        setChange(!change);
        history.push('/manage/qcm/details/' + qcmId);
      }
    });
  }
  };

  const editQuestion = (id) => {
    history.push(`/question/edit/${qcmId}/${id}`)
  };

  const detailsQuestion = (id) => {
    history.push(`/question/details/${qcmId}/${id}`)
  };


  useEffect(() => {
    fetch('http://localhost:8080/question/qcm/' + qcmId)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      });
  },[change]);

  return (
    <div className="question-list-container">
      <Container component="main" maxWidth="xs">
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
        >
            <Typography component="h1" variant="h5">
                Liste des questions
            </Typography>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={addClick}
            >
                Ajouter une question
            </Button>
        </Box>
        
            <div className="question-list">
            {questions.map((ques) => (
            <div key={ques.id} className="question-item">
            <Typography variant="body1" className="question-text">{ques.question}</Typography>
            <Button sx={{marginRight:'10px'}} variant='contained' color='primary' onClick={() => detailsQuestion(ques.id)}>Details</Button>
            <Button sx={{marginRight:'10px'}} variant='contained' color='success' onClick={() => editQuestion(ques.id)}>Edit</Button>
            <Button sx={{marginRight:'10px'}} variant='contained' color='error' onClick={() => deleteQuestion(ques.id)}>Supprimer</Button>
            </div>
        ))}
        </div>
        

        </Container>
                                             
    </div>
  );
}

export default QuestionList;
