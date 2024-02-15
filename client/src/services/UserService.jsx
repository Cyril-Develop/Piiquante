class UserService {
    async getUserInfos(token, id) {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/auth/user/${id}`, {
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

export default new UserService();