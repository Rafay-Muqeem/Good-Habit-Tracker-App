
export async function delHabits(id, token){
    try {
        const response = await fetch(`https://odd-cuff-links-elk.cyclic.app/api/habit/deletehabit/${id}`, {
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