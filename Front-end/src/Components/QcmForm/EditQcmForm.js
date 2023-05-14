import React from 'react'
import { useState,useEffect } from 'react'
import { useParams,useHistory, withRouter } from 'react-router-dom'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// this function is used to edit a qcm from the database localhost:8080/qcm/{id}
function EditQcmForm(props) {
    const {qcmId} = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const history = useHistory();
    const { adminId } = props;

    // GET request to get the qcm from the database localhost:8080/qcm/{id} using useEffect
    useEffect(() => {
        fetch("http://localhost:8080/qcm/" + qcmId)
            .then((response) => response.json())
            .then((data) => {
                setTitle(data.title);
                setDescription(data.description);
            });
    },[]);
    // PUT request to update the qcm from the form to the database localhost:8080/qcm/{id}
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
        fetch("http://localhost:8080/qcm/" + qcmId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(qcm),
        }).then((response) => {
            if (response.ok) {
                alert('Qcm modifié avec succès')
                history.push("/manage/qcm");
            }
        });
    }   
    // Using Material UI display the form to edit the qcm
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
                    Edit QCM
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        autoComplete="title"
                        autoFocus
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="description"
                        label="Description"
                        type="description"
                        id="description"
                        autoComplete="current-description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
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
    </div>
  )
}

export default withRouter(EditQcmForm) ;