import * as React from 'react';
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import { useHistory, withRouter } from "react-router-dom";

function StagiaireList() {
  const [change, setChange] = useState(false);
    const [stagiaires, setStagiaires] = useState([]);
    const history = useHistory();
  
    const handleAdd = () => {
      history.push("/gestion/stagiaire/add");
    };
    const handleEdit = (id) => {
      history.push("/gestion/stagiaire/edit/" + id);
    };
    const handleDelete = (id) => {

      const confirm = window.confirm("Voulez-vous vraiment supprimer ce Stagiaire ?");
    if (confirm) {
      fetch("http://localhost:8080/auth/stagiaire/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          setChange(!change);
          alert("Stagiaire supprimé avec succès");
          history.push("/gestion/stagiaire");
        }
      });
    }
    };

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


useEffect(() => {
    fetch("http://localhost:8080/auth/stagiaire/all")
      .then((response) => response.json())
      .then((data) => {
        setStagiaires(data);
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
        Ajouter un stagiaire
      </Button>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align="right">Nom</StyledTableCell>
            <StyledTableCell align="right">Prenom&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Mail&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Societe&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Action&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stagiaires.map((stagiaire) => (
            <StyledTableRow key={`${stagiaire.id}stagiaire`}>
              <StyledTableCell component="th" scope="row">
                {stagiaire.id}
              </StyledTableCell>
              <StyledTableCell align="right">{stagiaire.lastName}</StyledTableCell>
              <StyledTableCell align="right">{stagiaire.firstName}</StyledTableCell>
              <StyledTableCell align="right">{stagiaire.email}</StyledTableCell>
              <StyledTableCell align="right">{stagiaire.societe}</StyledTableCell>
              <StyledTableCell align="right">
              <Button
                    sx={{marginRight:'10px'}}
                    variant="contained"
                    color="success"
                    onClick={() => {
                      handleEdit(stagiaire.id);
                    }}
                  >
                    Modifier
                  </Button>
                  <Button
                    sx={{marginRight:'10px'}}
                    variant="contained"
                    color="error"
                    onClick={() => {
                      handleDelete(stagiaire.id);
                    }}
                  >
                    Supprimer
                  </Button>
                  </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
);

}

export default withRouter(StagiaireList);