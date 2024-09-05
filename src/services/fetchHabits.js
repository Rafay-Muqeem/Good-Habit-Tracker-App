
export async function fetctHabits(token){
    try{
        const habitsArray = await fetch("https://cyan-equable-silence.glitch.me/api/habit/fetchallhabits", {
            method: "GET",
            headers: {
                "auth-token": token
            }
        })

        return habitsArray;
    }
    catch(error){
        throw error;
    }
}
