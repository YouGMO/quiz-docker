import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataService from "../../service/DataService";



function Resultat (props){
    const [listDonnees,setDonnee] = useState([])
    const { stagiaireId } = props;

  useEffect(() => {
    async function getDonneeByStagaireId() {
      const donnees = await DataService.getDonneeByStagaireId(stagiaireId);
      setDonnee(donnees);
    }
    getDonneeByStagaireId();
  }, []);


  return (
    
    <div className="resultat-container">
      <h1 className="titre">Parcours effectués</h1>
      {listDonnees.length === 0 ? (
        <div className="resultat-card bg-light">
          <div className="resultat-card-body">
            <h5 className="resultat-card-title">Aucun résultat trouvé</h5>
            <p className="resultat-card-text">Vous n'avez pas encore passé de QCM. 😢😢😢</p>
            <Link to={`/qcm`} className="resultat-card-text"> Voir la liste des QCMs disponibles</Link>
          </div>
        </div>
      ) : (
        <div className="list-group">
          {listDonnees.map((donnee) => (
            //<Link to={`/resultats/${donnee.id}`} className="list-group-item list-group-item-action" key={donnee.id}>
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h5 className="mb-1">{donnee.qcm.title}</h5>
                  <p className="mb-1">{donnee.qcm.description}</p>
                  <small>Effectué le : {donnee.dateQCMDebut}</small>
                </div>
                <div className="col-md-4 text-right">
                <h5 className="mb-1">Score</h5>
                  <h5 className="mb-1">{donnee.score}</h5>
                  <small>Temps : {donnee.dureeQCM}s</small>
                </div>
              </div>
            //</Link>
          ))}
        </div>
      )}
    </div>
    
  );
          }

export default Resultat;