
export async function addHabits(token, data){
    try {
        const response = await fetch("http://localhost:5000/api/habit/addhabit", {
            method: "POST",
            headers: {
                "auth-token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        return response;

    } catch (error) {
        console.log(error);
    }
} 