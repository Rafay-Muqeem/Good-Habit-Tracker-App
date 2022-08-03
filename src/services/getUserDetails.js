export async function getUserDetails(token){
    try {
        const userInfo = await fetch("https://habit-app-backend.herokuapp.com/api/auth/getuser", {
            method: "POST",
            headers: {
                "auth-token": token
            }
        })
        
        return userInfo;

    } catch (error) {
        return error;
    }
}