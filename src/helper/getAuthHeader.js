
export const getAuthHeader = ({authToken,contentType="application/json"}) => {
    const authHeader = new Headers();
    authHeader.append("Authorization", `Bearer ${authToken}`);
    authHeader.append("Content-Type", contentType);
    return authHeader;
}
