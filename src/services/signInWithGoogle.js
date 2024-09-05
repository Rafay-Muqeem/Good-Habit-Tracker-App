
export async function signInWithGoogle(data) {
    try {
        const user = await fetch('https://cyan-equable-silence.glitch.me/api/auth/loginwithgoogle', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        return user;

    } catch (error) {
        console.log(error);
    }
}
