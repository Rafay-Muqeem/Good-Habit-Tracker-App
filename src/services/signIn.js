export async function signIn(data){
    try {
        const user = await fetch("https://cyan-equable-silence.glitch.me/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
       
        return user;

    } catch (error) {
        console.log(error);
    }
}