import React, { useState, useEffect } from "react";
import { useParams, withRouter } from "react-router-dom";
import Countdown from "react-countdown";

import QCMService from "../../service/QCMService";
import { Button } from "@mui/material";

function QCMDetail(props) {
  const [QCM, setQCM] = useState({});
  const [isStarted, setIsStarted] = useState(false);
  const { qcmId } = useParams();

  useEffect(() => {
    async function getQCMById() {
      const qcm = await QCMService.getQCMById(qcmId);
      setQCM(qcm);
    }
    getQCMById();
  }, [qcmId]);

  const handleStartClick = () => {
    setIsStarted(true);
  };

  const handleTimerComplete = () => {
    props.history.push(`/question/qcm/${qcmId}`);
  };

  const styleCount = ({ seconds, completed }) => {
    if (completed) {
      return null;
    } else {
      return (
          <div className="countdown">
            <div className="countdown-item">
              <span className="countdown-item-label">Le QCM commence dans</span>
              <div className="countdown-item-value">{seconds}</div>
              <span className="countdown-item-label">secondes</span>
            </div>
          </div>

       
      );
    }
  };

  return (
    <div className="qcmDetail">
      <div className={`text ${isStarted ? "hide" : ""}`}>
        <h1>Vous avez choisi le QCM : {QCM.title}</h1>
        <p>Cliquez sur START pour commencer: </p>
        <br/>
      </div>
      {!isStarted && (
          <div className="start-button">
          <Button variant="contained" color="primary" onClick={handleStartClick}>
            Start
          </Button>
        </div>
       
      )}
      {isStarted && (
        <div>
          <Countdown date={Date.now() + 3000} onComplete={handleTimerComplete} renderer={styleCount} />
        </div>
      )}
    </div>
  );
}

export default withRouter(QCMDetail);
