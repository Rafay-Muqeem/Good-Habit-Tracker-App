
export async function signInWithGoogle(data) {
    try {
        const user = await fetch('https://habit-app-backend.herokuapp.com/api/auth/loginwithgoogle', {
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
