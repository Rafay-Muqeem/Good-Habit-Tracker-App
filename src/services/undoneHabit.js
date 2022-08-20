
export async function undoneHabit(id, token){
    try {
        const response = await fetch(`https://habit-app-backend.herokuapp.com/api/habit/undonehabit/${id}`, {
            method: "PUT",
            headers: {
                "auth-token" : token,
                "Content-Type": "application/json"
            },
        })

        return response;

    } catch (error) {
        console.log(error);
    }
}