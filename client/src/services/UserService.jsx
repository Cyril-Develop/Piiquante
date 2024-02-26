class UserService {

    async getUserId(email) {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        if (!response.ok) {
            const error = await response.json();
            throw error;
        }
        return response.json();
    }

    async getUserInfos(token, id) {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/user/${id}`, {
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

    async updatePassword(password, id) {
		const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/auth/password/:${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ password })
		});
		if (!response.ok) {
			const error = await response.json();
			throw error;
		}
	}

    async sendEmail(email, userId) {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/auth/email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, userId })
        });
        if (!response.ok) {
            const error = await response.json();
            throw error;
        }
    }
}

export default new UserService();