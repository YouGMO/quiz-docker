import React, { useState, useEffect } from "react";
import StagiaireService from "../../service/StagiaireService";

function EspaceStagiaire(props) {

    const [stagiaire, setStagiaire] = useState([]);
    const { stagiaireId } = props;


    useEffect(() => {
      async function getStagiaire() {
        const stagiaire = await StagiaireService.getStagiaireById(stagiaireId);
        setStagiaire(stagiaire);
      }
      getStagiaire();
    }, []);
    return (
      <div className="stagiaire-container">
        <div className="stagiaire-header">
          <h1>Bienvenue {stagiaire.firstName} sur ton espace stagiaire</h1>
        </div>
        <div className="stagiaire-card">
        <div className="stagiaire-header2">
        <h1>Mes informations </h1>
        </div>
          <div className="stagiaire-card-body">
            <div className="stagiaire-row">
              <div className="col-12 col-md-6">
                <p className="stagiaire-label">Nom :</p>
                <p className="value">{stagiaire.lastName}</p>
              </div>
              <div className="col-12 col-md-6">
                <p className="stagiaire-label">Prénom :</p>
                <p className="stagiaire-value">{stagiaire.firstName}</p>
              </div>
            </div>
            <div className="stagiaire-row">
              <div className="col-12 col-md-6">
                <p className="stagiaire-label">Email :</p>
                <p className="stagiaire-value">{stagiaire.email}</p>
              </div>
              <div className="col-12 col-md-6">
                <p className="stagiaire-label">Société :</p>
                <p className="stagiaire-value">{stagiaire.societe}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default EspaceStagiaire;
