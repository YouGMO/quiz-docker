const API_URL = 'http://localhost:8080/qcm';

const QCMService = {
  async getQCM() {
    const response = await fetch(`${API_URL}/all`);
    const data = await response.json();
    return data;
  },

  async getQCMById(qcmId) {
    const response = await fetch(`${API_URL}/${qcmId}`);
    const data = await response.json();
    return data;
  },
};

export default QCMService;
