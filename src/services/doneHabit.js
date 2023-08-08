
export async function doneHabit(id, token){
    try {
        const response = await fetch(`https://odd-cuff-links-elk.cyclic.app/api/habit/donehabit/${id}`, {
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