
export async function signInWithGoogle(data) {
    try {
        const user = await fetch('https://odd-cuff-links-elk.cyclic.app/bapi/auth/loginwithgoogle', {
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
