import React, { useState, useEffect } from "react";
import { useParams, withRouter } from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ReponseService from "../../service/ReponseService";
import { useHistory } from "react-router-dom";

function ReponseAdd(props) {
    const history = useHistory();
    const {questionId,qcmId} = useParams();
    // const [isCorrect, setIsCorrect] = useState(0)
    const [empty, setIsEmpty] = useState(false)
    const [isCorrect, setIsCorrect] = useState()



    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        if(formData.get("reponse")==="" || formData.get("isCorrect") === ""){
            setIsEmpty(true)
        } else {
            const data = {
                reponse: formData.get("reponse"),
                // si Vrai = 1 sinon 0
                isCorrect: isCorrect === "vrai" ? 1 : 0,
                question: {
                    id: questionId,
                },
                
            };
            await ReponseService.formAddReponse(data);
            history.push("/question/details/"+qcmId+"/"+questionId );

        }

        
    };
    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />

            <Grid item xs={12} sm={8}  component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Réponses
                    </Typography>
                    <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="reponse"
                            label="Contenu de la réponse"
                            name="reponse"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="isCorrect"
                            label="Réponse Correcte"
                            name="isCorrect"
                            onChange={(e) => {setIsCorrect(e.target.value)}}

                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Ajouter une réponse
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default withRouter(ReponseAdd);