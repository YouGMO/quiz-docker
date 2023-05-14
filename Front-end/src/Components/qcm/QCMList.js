import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QCMService from "../../service/QCMService";
import 'bootstrap/dist/css/bootstrap.min.css';


function QCMList() {
  const [QCMList, setQCMList] = useState([]);

  useEffect(() => {
    async function getQCM() {
      const listQCM = await QCMService.getQCM();
      setQCMList(listQCM);
    }
        getQCM();
  }, []);

  return (
  <div className="container">
    <h1 className="titre">Liste des QCMs</h1>
    <ul className="qcmlist-group">
      {QCMList.map((qcm) => (
        <li className="qcmlist-group-item list-group-item-action" key={qcm.id}>
          <Link to={`/qcm/${qcm.id}`}>
            <div> Titre du QCM : {qcm.title}</div>
            <div>Description du QCM : {qcm.description}</div>
            <div>Nombre de question dans ce QCM : {qcm.listQuestions.length} </div>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
}

export default QCMList;
