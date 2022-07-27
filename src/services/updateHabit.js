
export async function updateHabit(id, data, token){

    try {
        const response = await fetch(`https://habit-app-backend.herokuapp.com/api/habit/updatehabit/${id}`, {
            method: "PUT",
            headers: {
                "auth-token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        return response.json();

    } catch (error) {
        console.log(error);
    }
}