import React, { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import QuestionService from '../../service/QuestionService';
import '../../App.css';
import DataService from '../../service/DataService';
import moment from 'moment/moment';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function QuestionList(props)  {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [dateQCMDebut, setDateQCMDebut] = useState({});
  const [postDone, setPostDone] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [answerNull, setAnswerNull] = useState(0);

  const { qcmId } = useParams();
  const { stagiaireId } = props;


  useEffect(() =>  {
    const currentDate = moment().format('YYYY-MM-DDTHH:mm:ss');
    const localDateTime = moment(currentDate).format('YYYY-MM-DDTHH:mm:ss');
    setDateQCMDebut(localDateTime);
  }, [])

  useEffect(() => {
    async function getQuestionsByQcm_Id() {
      const listQuestions = await QuestionService.getQuestionsByQcm_Id(qcmId);
      setQuestions(listQuestions);
    }
    getQuestionsByQcm_Id();
  }, []);

  useEffect(() => {
    let interval;
    if (questionIndex < questions.length) {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [questionIndex, questions.length,time]);


  
  useEffect(() => {
    if (questionIndex >= questions.length && !postDone && questions.length > 0) {
      async function postData() {
        const donnee = {
          dateQCMDebut: dateQCMDebut,
          score: score,
          dureeQCM: time,
          qcm: {
            id: qcmId,
          },
          stagiaire: {
            id: stagiaireId,
          },
        };
  
        await DataService.postDonnee(donnee);
        setPostDone(true);
      }
  
      postData();
    }
  }, [questionIndex, questions.length, postDone, qcmId, score, time, dateQCMDebut, stagiaireId]);
  


  function handleAnswerChange(reponse) {
        if (selectedAnswer.includes(reponse)) {
          setSelectedAnswer(prevSelectedAnswer => prevSelectedAnswer.filter(id => id !== reponse));
        } else {
          setSelectedAnswer(prevSelectedAnswer => [...prevSelectedAnswer, reponse]);
        }
  }

  const handleValidateClick = () => {
    if(selectedAnswer.length === 0){
        setAnswerNull(answerNull + 1)
    } else {
      let allCorrect = false;

      selectedAnswer.map((answer) => {
        if (answer.isCorrect === 1 ) {
          allCorrect = true;
        }
      });
 
  if (allCorrect) {
    setScore(score + 1);

  }


    }

    
    if (questionIndex + 1 <= questions.length) {
      setQuestionIndex(questionIndex + 1);
    } 

    setSelectedAnswer([])
  };



  if (!questions || questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (questionIndex >= questions.length) {
  return (
    <Dialog open={true}>
      <DialogTitle>Félicitations</DialogTitle>
      <DialogContent>
        <div>Le QCM est terminé. Ton score est de {score}. Tu as pris {time} secondes pour le terminer.</div>
        {
          answerNull > 0 ? (
          <div>Vous n'avez pas répondu à {answerNull} question(s) sur {questions.length}.</div>
         ) : (<div>Vous avez répondu à toutes les questions</div>)
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRestartDialog}>Recommencer ce QCM</Button>
        <Button onClick={handleCloseDialog}>Retour à la page d'accueil</Button>
      </DialogActions>
    </Dialog>
  );
}


function handleCloseDialog() {
  setOpen(false);
  props.history.push(`/`);

}

function handleRestartDialog() {
  setOpen(false);
  props.history.push(`/qcm/${qcmId}`);

}

  const question = questions[questionIndex];

  return (
    <div className="qcm-container">
      <div className="qcm-timer">{time}</div>
      <div className="qcm-choix">Choisissez la ou les bonnes réponses</div>
      <div className="qcm-question">{question.question}</div>
      <ul className="qcm-reponses">
        {question.listReponses && question.listReponses.map((reponse) => (
          <li key={reponse.id} className="qcm-reponse">
            <label>
              <input type="checkbox" name="reponse" value={reponse.id}  onChange={() => handleAnswerChange(reponse)} />
              <span>{reponse.reponse}</span>
            </label>
          </li>
        ))}
      </ul>
      <button onClick={() => handleValidateClick() } >Valider</button>
    </div>
  );
}

export default withRouter(QuestionList);
