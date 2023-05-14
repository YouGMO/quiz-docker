import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import QCMList from "./components/qcm/QCMList";
import QCMDetail from "./components/qcm/QCMDetail";
import QuestionList from "./components/question/QuestionList";
import Sidebar from "./components/global/Sidebar";
import SideBarAdmin from "./components/global/SideBarAdmin";
import './App.css';
import Resultat from "./components/resultat/Resultat";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import EspaceStagiaire from "./components/espace-stagiaire/EspaceStagiaire";
import EspaceAdmin from "./components/espace-admin/EspaceAdmin";
import ReponseDetail from "./components/reponse/ReponseDetail";
import ReponseUpdate from "./components/reponse/ReponseUpdate";
import ReponseAdd from "./components/reponse/ReponseAdd";
import ListQcm from "./components/QcmForm/ListQcm";
import AddQcmForm from "./components/QcmForm/AddQcmForm";
import EditQcmForm from "./components/QcmForm/EditQcmForm";
import DetailQcm from "./components/QcmForm/DetailQcm";
import AddQuestion from "./components/QuestionsForm/AddQuestion";
import EditQuestion from "./components/QuestionsForm/EditQuestion";
import DetailQuestion from "./components/QuestionsForm/DetailQuestion";
import SignupStagiaire from "./components/espace-admin/SignupStagiaire";
import StagiaireList from "./components/espace-admin/StagiaireList";
import StagiaireEdit from "./components/espace-admin/StagiaireEdit";
import PasswordEdit from "./components/espace-admin/PasswordEdit";
function App(props) {

  const [loggedIn, setLoggedIn] = useState("echec");
  const [userId, setUserId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);





  function handleLogin(response) {
    if(response.id !== null && response.societe !== null) {
      setLoggedIn("stagiaire");
      setUserId(response.id)

    }

    if(response.id !== null && response.societe === null) {
      setLoggedIn("admin");
      setUserId(response.id)

    }
  }

    function handleLogout(response) {
      if(response === 200) {
        setLoggedIn("echec");
        setShowAlert(true);


      }
  
  }



  return (
    <BrowserRouter>
      <div className="App">
      { loggedIn === "echec" &&
        <Login onLogin={handleLogin} showAlert={showAlert} setShowAlert={setShowAlert}/>
      }
      {loggedIn === "admin" &&
      <div className="main-content">
      <SideBarAdmin onLogout= {handleLogout}/>
        <Switch>
        <Route exact path="/">
            <Home/>
            </Route>
            <Route exact path="/espace-admin">
              <EspaceAdmin adminId = {userId}/>
              </Route>
        <Route exact path="/reponse/create/:qcmId/:questionId">
        <ReponseAdd />
      </Route>
      <Route exact path="/reponse/:qcmId/:questionId/:reponseId">
        <ReponseDetail />
      </Route>
      <Route exact path="/reponse/:qcmId/:questionId/:reponseId/update">
        <ReponseUpdate />
      </Route>
      <Route exact path="/manage/qcm">
                <ListQcm/>
              </Route>
              <Route exact path="/manage/qcm/add">
                <AddQcmForm adminId = {userId}/>
              </Route>
              <Route exact path="/manage/qcm/edit/:qcmId">
                <EditQcmForm adminId = {userId}/>
              </Route>
              <Route exact path="/manage/qcm/details/:qcmId">
                <DetailQcm/>
              </Route>
              <Route exact path="/question/add/:qcmId">
                <AddQuestion/>
              </Route>
              <Route exact path="/question/edit/:qcmId/:questionId">
                <EditQuestion/>
              </Route>
              <Route exact path="/question/details/:qcmId/:questionId">
                <DetailQuestion/>
              </Route>
              <Route exact path="/manage/qcm">
                <ListQcm/>
              </Route>
              <Route exact path="/gestion/stagiaire">
                <StagiaireList/>
              </Route>
              <Route exact path="/gestion/stagiaire/add">
                <SignupStagiaire />
              </Route>
              <Route exact path="/gestion/stagiaire/edit/:stagiaireId">
                <StagiaireEdit />
              </Route>
              <Route exact path="/gestion/stagiaire/edit/password/:stagiaireId">
                <PasswordEdit />
              </Route>
              <Route exact path="/gestion/stagiaire/details/:stagiaireId">
                <DetailQcm/>
              </Route>
              <Route exact path="/question/add/:qcmId">
                <AddQuestion/>
              </Route>
              <Route exact path="/question/edit/:qcmId/:questionId">
                <EditQuestion/>
              </Route>
      </Switch>
        </div>
      }
      {loggedIn === "stagiaire" &&
        <div className="main-content">
        <Sidebar onLogout= {handleLogout}/>
          <Switch>
          <Route exact path="/">
              <Home/>
              </Route>
          <Route exact path="/espace-stagiaire">
              <EspaceStagiaire stagiaireId = {userId}/>
              </Route>
            <Route exact path="/qcm">
              <QCMList />
            </Route>
            <Route exact path="/qcm/:qcmId">
              <QCMDetail />
            </Route>
            <Route exact path="/question/qcm/:qcmId">
              <QuestionList stagiaireId = {userId}/>
            </Route>
            <Route exact path="/resultats">
              <Resultat  stagiaireId = {userId}/>
            </Route>
          </Switch>
        </div>
      }
      </div>
    </BrowserRouter>
  );
}
export default App;