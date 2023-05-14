import React, { useState, useEffect } from "react";
import { Link, withRouter,useParams } from "react-router-dom";
import ReponseService from "../../service/ReponseService";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box, Button, Container } from "@mui/material";

function ReponseList(){
    const [ReponseList, setReponseList] = useState([]);
    const { questionId,qcmId } = useParams();

    useEffect(() => {
        async function getReponse(id) {
            const listReponse = await ReponseService.getReponse(id);
            setReponseList(listReponse);
        }
        getReponse(questionId);
    }, []);
    console.log(ReponseList);

    return (
        <div className="container">
            <h1 className="text-center mb-4">Liste des réponses</h1>
            <Container component='main' sx={{ width:'400px' ,display: 'flex',flexDirection:'column' , justifyContent: 'center' }}>
            <div>
                {ReponseList.map((reponse) => (
                    <div className="col" key={reponse.id}>
                        <Link to={`/reponse/${qcmId}/${questionId}/${reponse.id}`} className="card text-white bg-primary mb-3 text-decoration-none">
                            <div className="card-header">{reponse.reponse}
                            {
                                reponse.isCorrect === 0 ? <Button sx={{marginLeft:5}} variant="contained" color="error">Faux</Button> : <Button sx={{marginLeft:5}} variant="contained" color="success">Vrai</Button>
                            }
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <div >
                <Link to={`/reponse/create/${qcmId}/${questionId}`}  className="card text-white bg-success mb-3 justify-content-center text-decoration-none">
                    <div className="card-header">Ajouter une réponse</div>
                </Link>
                {/* <Button variant="contained" color="success" href={`/reponse/create`}>Ajouter une réponse</Button> */}
            </div>
            </Container>
        </div>
    );


};
export default withRouter(ReponseList);