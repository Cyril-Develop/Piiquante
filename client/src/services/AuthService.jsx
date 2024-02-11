class AuthService {
	async login(email, password) {
		const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});
		if (!response.ok) {
			const error = await response.json();
			throw error;
		}
		return await response.json();
	}

	async register(formValues) {
		const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/auth/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formValues)
		});
		if (!response.ok) {
			const error = await response.json();
			throw error;
		}
	}

	async logout() {
		localStorage.removeItem('user');
	}
}

export default new AuthService();