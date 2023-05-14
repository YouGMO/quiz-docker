import React from "react"
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Logo from '../../assets/lotus2.png'

function Login (props) {



 async function handleSubmit(event) {
      event.preventDefault();

      const response = await login(event.target);
      props.onLogin(response);

      
      
  }


  async function login(formData) {
    var data = new FormData(formData);
    var object = {};
    data.forEach((value, key) => object[key] = value);
    var json = JSON.stringify(object);
    const response = await fetch("http://localhost:8080/auth/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        mode: "cors",
        body: json
    })

    const reponseBack = await response.json();

    if (response.status === 200) {
       console.log('User authentifié', reponseBack.id);
       return reponseBack;
    } else {
      console.log('Erreur lors de l\'authentification', reponseBack);
      alert('Email ou  mot de passe incorrect')
    }
}

  return (
 
    
      <Grid container component="main" sx={{ height: '100vh' }}>
         
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src={Logo} alt="Logo2" style={{ width: 100, height: 100 , color: "#fff"}} />
            <Typography component="h1" variant="h5">
              Se connecter
            </Typography>
            {props.showAlert && (
            <div className="alert">
              Vous avez été déconnecté avec succès
            </div>
                )}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Connexion
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}

export default Login;