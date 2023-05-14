import React from "react";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import QuizIcon from '@mui/icons-material/Quiz';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png'
import { Typography } from '@mui/material';
import CopyrightIcon from '@mui/icons-material/Copyright';
import '../../App.css';
import LogOutService from "../../service/LogOutService";
import CategoryIcon from '@mui/icons-material/Category';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';



function SideBarAdmin (props) {

  async function LogOutUser(){
        const response = await LogOutService.logOutUser();
        if (response === 200) {
          props.onLogout(response)
        }

  }



  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#0408FD',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List >
      <ListItem sx={{ justifyContent: 'space-around' }}>
          <img src={Logo} alt="Logo" style={{ width: 50, height: 50 , color: "#fff"}} />
          <Typography variant="h8" color="#fff" noWrap>
            QCM Prime
          </Typography>
        </ListItem>
        <ListItem 
          button 
          component={Link} 
          to="/" 
          key="home">
            <ListItemIcon>
              <HomeIcon  className="sidebar-icon"/>
            </ListItemIcon>
            <ListItemText primary="Accueil" className="sidebar-text" />
          </ListItem>
          <ListItem 
          button 
          component={Link} 
          to="/espace-admin" 
          key="admin">
            <ListItemIcon>
              <Diversity1Icon  className="sidebar-icon"/>
            </ListItemIcon>
            <ListItemText primary="Espace admin" className="sidebar-text" />
          </ListItem>

          <ListItem
              button
              component={Link}
              to="/manage/qcm"
              key="qcm"
          >

              <ListItemIcon>
                  <CategoryIcon className="sidebar-icon" />
              </ListItemIcon>
              <ListItemText primary="Gestion QCM" className="sidebar-text" />
          </ListItem>

          <ListItem
              button
              component={Link}
              to="/gestion/stagiaire"
              key="gestion"
          >
              <ListItemIcon>
                  <ManageAccountsIcon className="sidebar-icon" />
              </ListItemIcon>
              <ListItemText primary="Gestion Stagiaire" className="sidebar-text" />
          </ListItem>
   
      </List>
      <List sx={{ marginTop: 'auto' }}>
        <ListItem button
         onClick = {LogOutUser}>
          <ListItemIcon>
          <ExitToAppIcon  className="sidebar-icon"/>
          </ListItemIcon>
      <ListItemText primary="Déconnexion" className="sidebar-text" />
      </ListItem>
      <ListItem >
          <ListItemIcon>
          <CopyrightIcon  className="sidebar-icon" />
          </ListItemIcon>
      <ListItemText primary="Lotus, QCM Prime" className="sidebar-text" />
      </ListItem>
      </List>
    </Drawer>
  );

};

export default SideBarAdmin;
