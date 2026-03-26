import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token) => {
    if (!token) return false;
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        // If token expires in less than 10seconds it is invalid
        return decoded.exp > (currentTime + 10);
    } catch (error) {
        return false;
    }
};