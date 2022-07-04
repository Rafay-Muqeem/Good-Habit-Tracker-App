
export async function delHabits(id, token){
    try {
        const response = await fetch(`http://localhost:5000/api/habit/deletehabit/${id}`, {
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