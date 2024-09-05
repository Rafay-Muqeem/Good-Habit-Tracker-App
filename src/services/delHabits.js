
export async function delHabits(id, token){
    try {
        const response = await fetch(`https://cyan-equable-silence.glitch.me/api/habit/deletehabit/${id}`, {
            method: "DELETE",
            headers: {
                "auth-token": token,
                "Content-Type": "application/json"
            }
        })

        return response.json();

    } catch (error) {
        throw error
    }
}