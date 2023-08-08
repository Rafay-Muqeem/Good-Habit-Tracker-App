
export async function fetctHabits(token){
    try{
        const habitsArray = await fetch("https://odd-cuff-links-elk.cyclic.app/api/habit/fetchallhabits", {
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
