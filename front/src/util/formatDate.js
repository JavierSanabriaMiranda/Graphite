/**
 * Normalizes any date string to the format: YYYY-MM-DD HH:mm:ss
 * This removes 'T', 'Z', and milliseconds.
 */
export const formatDateForServer = (dateInput) => {
    if (!dateInput) return null;
    
    // Convert to Date object to handle various formats (ISO, SQL, etc.)
    const d = new Date(dateInput);
    
    // Check if valid date
    if (isNaN(d.getTime())) return dateInput; 

    const pad = (n) => n.toString().padStart(2, '0');

    const date = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const time = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    
    return `${date} ${time}`;
};