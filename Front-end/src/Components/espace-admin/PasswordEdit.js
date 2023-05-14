import React from 'react'
import { useState,useEffect } from 'react'
import { useParams,useHistory, withRouter } from 'react-router-dom'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// Fonction pour modifier le mot de passe du stagiaire
function PasswordEdit(props) {
    const {stagiaireId} = useParams();
    const [password, setPassword] = useState("");
    const history = useHistory();
    
    // requête PUT pour mettre à jour le mdp du stagiaire
    const handleSubmit = (event) => {
        event.preventDefault();
        const stagiaire = {
            password: password,
        };
        console.log(stagiaire);
        fetch("http://localhost:8080/auth/stagiaire/password/" + stagiaireId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(stagiaire),
        }).then((response) => {
            if (response.ok) {
                alert('Password modifié avec succès')
                history.push("/gestion/stagiaire/edit/"+ stagiaireId);
            }
        });
    }   
    // Mise en forme du formulaire
  return (
    <div>
        <Container component="main" maxWidth="xs">
            <Box sx={{

                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Typography component="h1" variant="h5">
                        Nouveau mot de passe
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 1 }}
                    >
                        Enregistrer
                    </Button>
                </Box>
            </Box>
        </Container>
    </div>
  )
}

export default withRouter(PasswordEdit) ;