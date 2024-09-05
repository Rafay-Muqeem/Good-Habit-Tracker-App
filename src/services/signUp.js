export async function signUp(data){
    try {
        const res = await fetch("https://cyan-equable-silence.glitch.me/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        return res;
    } catch (error) {
        console.log(error);
    }
}