require('dotenv').config();

export async function addHabits(token, data){
    try {
        const response = await fetch("https://cyan-equable-silence.glitch.me/api/habit/addhabit", {
            method: "POST",
            headers: {
                "auth-token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        return response;

    } catch (error) {
        console.log(error);
    }
} 