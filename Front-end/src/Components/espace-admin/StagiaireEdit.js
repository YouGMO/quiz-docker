import React from 'react';
import { useState,useEffect } from 'react';
import { useParams,useHistory, withRouter } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// Fonction pour modifier un stagiaire 
function StagiaireEdit(props) {
    const {stagiaireId} = useParams();
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [societe, setSociete] = useState("");
    const history = useHistory();
    

    // requête GET pour récupérer les informations du stagiaire
    useEffect(() => {
        fetch("http://localhost:8080/stagiaire/" + stagiaireId)
            .then((response) => response.json())
            .then((data) => {
                setLastName(data.lastName);
                setFirstName(data.firstName);
                setEmail(data.email);
                setSociete(data.societe);
            });
    },[]);
    // requête PUT pour mettre à jour les informations du stagiaire
    const handleSubmit = (event) => {
        event.preventDefault();
        const stagiaire = {
            lastName: lastName,
            firstName: firstName,
            email: email,
            societe: societe,
        };
        console.log(stagiaire);
        fetch("http://localhost:8080/auth/stagiaire/" + stagiaireId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(stagiaire),
        }).then((response) => {
            if (response.ok) {
                alert('Stagiaire modifié avec succès')
                history.push("/gestion/stagiaire");
            }
        });
    }   

    const handleEdit = (stagiaireId) => {
        history.push(`/gestion/stagiaire/edit/password/${stagiaireId}`);
      };

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
                   Modifier les informations du Stagiaire
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Nom"
                        name="lastName"
                        autoComplete="lastName"
                        autoFocus
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="firstName"
                        label="Prenom"
                        type="firstName"
                        id="firstName"
                        autoComplete="current-firstName"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        id="email"
                        autoComplete="current-email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="societe"
                        label="Societe"
                        type="societe"
                        id="societe"
                        autoComplete="current-societe"
                        value={societe}
                        onChange={(event) => setSociete(event.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 1 }}
                    >
                        Enregistrer
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 0, mb: 2 }}
                        color="success"
                        onClick={() => handleEdit(stagiaireId)}
                    >
                        Modifier son password
                    </Button>
                </Box>
            </Box>
        </Container>
    </div>
  )
}

export default withRouter(StagiaireEdit) ;