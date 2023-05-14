const API_URL = 'http://localhost:8080/stagiaire';

const StagiaireService = {

    async getStagiaireById(stagiaireId) {
      const response = await fetch(`${API_URL}/${stagiaireId}`);
      const data = await response.json();
      return data;
    },
  };
  
  export default StagiaireService;
  