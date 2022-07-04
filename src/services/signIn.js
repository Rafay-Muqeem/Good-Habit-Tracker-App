
export async function signIn(data){
    try {
        const user = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const response = await user.json();
        return response;

    } catch (error) {
        console.log(error);
    }
}