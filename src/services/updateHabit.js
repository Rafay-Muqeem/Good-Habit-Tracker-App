
export async function updateHabit(id, data, token){

    try {
        const response = await fetch(`https://cyan-equable-silence.glitch.me/api/habit/updatehabit/${id}`, {
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