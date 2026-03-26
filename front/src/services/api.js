const API_URL = "http://localhost:8080/api/v1/";

export const authService = {

    /**
     * Send credentials and receives the encrypt envelop
     */
    async login(email, passwordHash) {
        const response = await fetch(`${API_URL}users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, passwordHash })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error on login");
        }

        return await response.json(); // token, wrappedDek, iv, salt
    },

    /**
     * Registers user sending encrypted DEK from client
     */
    async signup(signupData) {
        // signupData contains: email, password, salt, wrappedDek, iv
        const response = await fetch(`${API_URL}users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signupData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error on signup");
        }

        return await response.json(); // Returns new JWT
    },

    async getSalt(email) {
        const response = await fetch(`${API_URL}users/salt?email=${email}`);
        if (!response.ok) throw new Error("User not found");
        return await response.json();
    }

};