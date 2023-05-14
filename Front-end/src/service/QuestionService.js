const API_URL = 'http://localhost:8080/question';

const QuestionService = {
  async getQuestionsByQcm_Id(qcmId) {
    const response = await fetch(`${API_URL}/qcm/${qcmId}`);
    const data = await response.json();
    return data;
  },

};

export default QuestionService;