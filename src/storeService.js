export const setUserToken = (token) => {
    localStorage.setItem("accessToken", token)
}

export const setUserRole = (role) => {
    localStorage.setItem("role", role)
}