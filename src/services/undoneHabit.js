
export async function undoneHabit(id, token){
    try {
        const response = await fetch(`https://odd-cuff-links-elk.cyclic.app/api/habit/undonehabit/${id}`, {
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