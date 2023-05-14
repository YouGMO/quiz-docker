import React, { useState, useEffect } from "react";
import {Link, useParams, withRouter,useHistory} from "react-router-dom";

import ReponseService from "../../service/ReponseService";

function ReponseDetail(props) {
    const [Reponse, setReponse] = useState({});
    const { reponseId,qcmId ,questionId} = useParams();
    const history = useHistory();
    useEffect(() => {
        async function getReponseById() {
            const reponse = await ReponseService.getReponseById(reponseId);
            setReponse(reponse);
        }
        getReponseById();
    }, [reponseId]);

    const handleDelete = async () => {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette réponse ?");
        if(confirmed){
            await ReponseService.deleteReponse(reponseId);
            history.push(`/question/details/${qcmId}/${questionId}`); // redirige vers la liste des catégories après la suppression
        }
    };
    // {Reponse.isCorrect = 0 ? 'Faux' : 'Vrai'}
    return (
        <div className="reponseDetail">
            <h1>Détail de la réponse</h1>
            <h4>Contenu : {Reponse.reponse}</h4>
            <p>Réponse correcte : {Reponse.isCorrect === 0 ? 'Faux' : 'Vrai'}</p>
            <br/>
            <div className="container w-50">
                <Link to={`/reponse/${qcmId}/${questionId}/${reponseId}/update`}  className="card text-white bg-primary mb-3 justify-content-center text-decoration-none">
                    <div className="card-header">Modifier cette réponse</div>
                </Link>
                <button
                    className="card text-white bg-danger mb-3 justify-content-center  btn btn-danger"
                    onClick={handleDelete}
                >
                    Supprimer cette réponse
                </button>
            </div>

        </div>
    );
}

export default withRouter(ReponseDetail);