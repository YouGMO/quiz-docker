const API_URL = 'http://localhost:8080/donnee';

const DataService = {
  
  async getDonneeByStagaireId(stagiaireId) {
    const response = await fetch(`${API_URL}/stagiaire/${stagiaireId}`);
    const data = await response.json();

    return data;
  },

  async postDonnee(donnee) {
   await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donnee),
      });
  }

  


};

export default DataService;
