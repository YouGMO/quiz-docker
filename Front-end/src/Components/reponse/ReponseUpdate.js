import React, { useState, useEffect } from "react";
import {useParams, withRouter} from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useHistory } from "react-router-dom";
import ReponseService from "../../service/ReponseService";

function ReponseUpdate(props) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        reponse: "",
        isCorrect: "",
    });
    const { reponseId,questionId,qcmId} = useParams();

    useEffect(() => {
        async function getReponse() {
            const reponse = await ReponseService.getReponseById(reponseId);
            setFormData({
                reponse: reponse.reponse,
                isCorrect: reponse.isCorrect,
                question_id: reponse.question_id
            });
        }
        getReponse();
    }, [reponseId]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = {
            reponse: formData.get("reponse"),
            isCorrect: formData.get("isCorrect"),
            question: {
                id: questionId,
            },
        };
        await ReponseService.formUpdateReponse(data, reponseId);
        history.push(`/reponse/${qcmId}/${questionId}/${reponseId}`);
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
                        Réponse
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="reponse"
                            label="Contenu de la réponse"
                            name="reponse"
                            value={formData.reponse}
                            onChange={(e) => setFormData({ ...formData, reponse: e.target.value })}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="reponse"
                            label="Réponse correcte"
                            value={formData.isCorrect}
                            onChange={(e) => setFormData({ ...formData, isCorrect: e.target.value })}
                            name="isCorrect"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Modifier
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default withRouter(ReponseUpdate);