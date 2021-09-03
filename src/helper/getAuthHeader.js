
export const getAuthHeader = ({authToken}) => {
    const authHeader = new Headers();
    authHeader.append("Authorization", `Bearer ${authToken}`);
    authHeader.append("Content-Type", "application/json");
    return authHeader;
}
