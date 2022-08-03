
export async function fetctHabits(token){
    try{
        const habitsArray = await fetch("https://habit-app-backend.herokuapp.com/api/habit/fetchallhabits", {
            method: "GET",
            headers: {
                "auth-token": token
            }
        })

        return habitsArray;
    }
    catch(error){
        console.log(error);
    }
}
