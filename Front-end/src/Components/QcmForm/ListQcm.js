import React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useHistory, withRouter } from "react-router-dom";


/*********** */
function ListQcm() {
  const [change, setChange] = useState(false);
  const [qcms, setQcms] = useState([]);
  const history = useHistory();

  const handleDetails = (id) => {
    history.push("/manage/qcm/details/" + id);
  };
  const handleAdd = () => {
    history.push("/manage/qcm/add");
  };
  const handleEdit = (id) => {
    history.push("/manage/qcm/edit/" + id);
  };
  const handleDelete = (id) => {
    // add a pop up to confirm the deletion
    const confirm = window.confirm("Voulez-vous vraiment supprimer ce QCM ?");
    if (confirm) {
      
      fetch("http://localhost:8080/qcm/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          setChange(!change);
          alert("Qcm supprimé avec succès");
          history.push("/manage/qcm");
        }
      });
    }
  };

  // GET request to get all the qcms from the database localhost:8080/qcm/all
  useEffect(() => {
    fetch("http://localhost:8080/qcm/all")
      .then((response) => response.json())
      .then((data) => {
        setQcms(data);
        console.log(data);
      });
  }, [change]);

  return (
    <div>
      <Button
        sx={{margin:'10px'}}
        variant="contained"
        color="primary"
        onClick={() => {
          handleAdd();
        }}
      >
        Ajouter un QCM
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="table Qcms">
          <TableHead >
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Titre</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
            {qcms.map((qcm) => (
              <TableRow
                key={`${qcm.id}qcm`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {qcm.id}
                </TableCell>
                <TableCell align="right">{qcm.title}</TableCell>
                <TableCell align="right">{qcm.description}</TableCell>
                <TableCell align="right" >
                  <Button
                    variant="contained"
                    sx={{marginRight:'10px'}}
                    color="primary"
                    onClick={() => {
                      handleDetails(qcm.id);
                    }}
                  >
                    Details
                  </Button>
                  <Button
                    sx={{marginRight:'10px'}}
                    variant="contained"
                    color="success"
                    onClick={() => {
                      handleEdit(qcm.id);
                    }}
                  >
                    Modifier
                  </Button>
                  <Button
                    sx={{marginRight:'10px'}}
                    variant="contained"
                    color="error"
                    onClick={() => {
                      handleDelete(qcm.id);
                    }}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    
    </div>
  );
}

export default withRouter(ListQcm) ;
