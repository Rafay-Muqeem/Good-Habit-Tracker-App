
export async function delHabits(id, token){
    try {
        const response = await fetch(`https://habit-app-backend.herokuapp.com/api/habit/deletehabit/${id}`, {
            method: "DELETE",
            headers: {
                "auth-token": token,
                "Content-Type": "application/json"
            }
        })

        return response.json();

    } catch (error) {
        console.log(error);
    }
}