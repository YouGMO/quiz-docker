import React, { Component } from "react"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useHistory, withRouter } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function SignupStagiaire(props){
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        var object = {};
        data.forEach((value, key) => object[key] = value);
        var json = JSON.stringify(object);
        await fetch("http://localhost:8080/auth/signup/stagiaire", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: json
        }).then((response) => {
            if (response.ok) {
              alert('Stagiaire crée avec succès')
              history.push("/gestion/stagiaire");
      
            }
          });
    };

    
    
        return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <PersonAddIcon sx={{ m: 1, width: 70, height:70,  }}>
            
          </PersonAddIcon>
          <Typography component="h1" variant="h5">
            Créer un nouveau stagiaire
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Nom"
                  name="lastName"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Prenom"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="societe"
                  label="Societe"
                  type="societe"
                  id="societe"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Enregistrer
            </Button>
          </Box>
        </Box>
      </Container>
        )
    }

export default withRouter(SignupStagiaire);