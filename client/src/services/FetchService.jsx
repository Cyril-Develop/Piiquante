class FetchService {
    async getAllSauces(token) {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/sauces`, {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        if(!response.ok) {
            const error = await response.json();
            throw error;
        }
        return response.json();
    }

    async getSauce(id, token) {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/sauces/${id}`, {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        if(!response.ok) {
            const error = await response.json();
            throw error;
        }
        return response.json();
    }
}

export default new FetchService();