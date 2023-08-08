export async function getUserDetails(token){
    try {
        const userInfo = await fetch("https://odd-cuff-links-elk.cyclic.app/api/auth/getuser", {
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