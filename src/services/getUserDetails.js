export async function getUserDetails(token){
    try {
        const userInfo = await fetch("https://cyan-equable-silence.glitch.me/api/auth/getuser", {
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