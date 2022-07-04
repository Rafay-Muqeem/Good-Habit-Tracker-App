
export async function doneHabit(id, token){
    try {
        const response = await fetch(`http://localhost:5000/api/habit/donehabit/${id}`, {
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