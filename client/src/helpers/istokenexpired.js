export const isTokenExpired = (token) => {
    console.log("token en isTokenExpired:", token);
    if (!token) return true;

    try {
        const parts = token.split('.');
        if (parts.length !== 3) {
            console.log("Token no tiene el formato esperado. Partes encontradas:", parts);
            return true; // Verifica que el token tenga tres partes
        }

        // Convierte el formato Base64-URL a Base64 estándar
        const base64Url = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64Url));
        console.log("Payload del token:", payload);

        if (!payload.exp) {
            console.log("Campo 'exp' no encontrado en el payload");
            return true; // Considera el token expirado si no tiene el campo exp
        }

        const expiry = payload.exp * 1000;
        console.log("Expiración del token:", expiry);
        console.log("Fecha de expiración:", new Date(expiry), "Fecha actual:", new Date(Date.now()));
        return Date.now() > expiry;
    } catch (error) {
        console.error("Error parsing token:", error);
        return true; // Si hay un error, considera el token como expirado
    }
};