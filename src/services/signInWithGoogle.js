
export async function signInWithGoogle(data) {
    try {
        const res = await fetch('http://localhost:5000/api/auth/loginwithgoogle', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        return res;

    } catch (error) {
        console.log(error);
    }
}
