import React from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link, useHistory, withRouter } from 'react-router-dom';


// create a add qcm form with a title and a description and a button to save the qcm

function AddQcmForm(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();
  const { adminId } = props;

  // POST request to save the qcm from the form to the database 
  const handleSubmit = (event) => {
    event.preventDefault();
    const qcm = {
      title: title,
      description: description,
      administrateur: {
        id: adminId,
      },
    };
    console.log(qcm);
    fetch("http://localhost:8080/qcm/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(qcm),
    }).then((response) => {
      if (response.ok) {
        alert('Qcm ajouté avec succès')
        history.push("/manage/qcm");

      }
    });
  }
  return (


    <div>
      
       <Container component="main" maxWidth="xs">
        
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Add a new QCM
          </Typography>
          
          <Box component="form"   onSubmit={handleSubmit}sx={{ mt: 3 , display: 'flex',flexDirection: 'column' }}>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="description"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  variant="outlined"
                  autoFocus
                />
                 
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Enregistrer
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>


        
    </div>
  )
}

export default withRouter(AddQcmForm);
