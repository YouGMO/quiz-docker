const API_URL = 'http://localhost:8080/admin';

const AdminService = {

    async getAdminById(adminId) {
      const response = await fetch(`${API_URL}/${adminId}`);
      const data = await response.json();
      return data;
    },
  };
  
  export default AdminService;