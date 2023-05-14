import React, { useState, useEffect } from "react";
import AdminService from "../../service/AdminService";

function EspaceAdmin(props) {

    const [admin, setAdmin] = useState([]);
    const { adminId } = props;


    useEffect(() => {
      async function getAdmin() {
        const Admin = await AdminService.getAdminById(adminId);
        setAdmin(Admin);
      }
      getAdmin();
    }, []);
    return (
      <div className="admin-container">
        <div className="admin-header">
          <h1>Bienvenue {admin.firstName} sur ton espace Admin</h1>
        </div>
        <div className="admin-card">
        <div className="admin-header2">
        <h1>Mes informations </h1>
        </div>
          <div className="admin-card-body">
            <div className="admin-row">
              <div className="col-12 col-md-6">
                <p className="admin-label">Nom :</p>
                <p className="value">{admin.lastName}</p>
              </div>
              <div className="col-12 col-md-6">
                <p className="admin-label">Prénom :</p>
                <p className="admin-value">{admin.firstName}</p>
              </div>
            </div>
            <div className="admin-row">
              <div className="col-12 col-md-6">
                <p className="admin-label">Email :</p>
                <p className="admin-value">{admin.email}</p>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    );
  }

export default EspaceAdmin;