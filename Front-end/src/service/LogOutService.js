const API_URL = 'http://localhost:8080/auth';

const LogOutService = {
  async logOutUser() {
    const response = await fetch(`${API_URL}/signout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.status;
  
  },

};

export default LogOutService;