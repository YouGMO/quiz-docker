

const API_URL = 'http://localhost:8080/reponse';

const ReponseService = {

    async getReponse(questionId) {
        const response = await fetch(`${API_URL}/question/${questionId}`);
        const data = await response.json();
        return data;
    },

    async getReponseById(reponseId) {
        const response = await fetch(`${API_URL}/${reponseId}`);
        const data = await response.json();
        return data;
    },

    async formAddReponse(formData) {
        const response = await fetch(`${API_URL}/create`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        return data;
    },

    async formUpdateReponse(formData, reponseId) {
        const response = await fetch(`${API_URL}/${reponseId}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        return data;
    },

    async deleteReponse(reponseId) {
        const response = await fetch(`${API_URL}/${reponseId}`,{
            method: "DELETE"
        });
        const data = await response.json();
        return data;
    },
};

export default ReponseService;