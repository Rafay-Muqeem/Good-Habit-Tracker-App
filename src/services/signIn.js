
export async function signIn(data){
    try {
        const user = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        // const response = await user.json();
        // if (user.status >= 200 && user.status <= 299) {
            // console.log(user.status);
            return user;
        // }else {
            // return user;
        // }
        // return response;

    } catch (error) {
        console.log(error);
    }
}