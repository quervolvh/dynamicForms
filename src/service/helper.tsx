export const authorizedHeader = (token: string, isImageUpload?: boolean) => ({
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": isImageUpload ? 'multipart/form-data' : 'application/json'
    }
});
