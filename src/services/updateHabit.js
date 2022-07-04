
export async function updateHabit(id, data, token){

    try {
        const response = await fetch(`http://localhost:5000/api/habit/updatehabit/${id}`, {
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