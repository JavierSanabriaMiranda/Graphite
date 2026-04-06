import { jwtDecode } from "jwt-decode";

/**
 * Checks if the inserted JWT token is valid and is not expired
 * 
 * @param {String} token - token to check validity
 * @returns true if the token is valid, false otherwise
 */
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