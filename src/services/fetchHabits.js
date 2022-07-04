
export async function fetctHabits(token){
    try{
        const habitsArray = await fetch("http://localhost:5000/api/habit/fetchallhabits", {
            method: "GET",
            headers: {
                "auth-token": token
            }
        })
        const response = await habitsArray.json();

        return response;
    }
    catch(error){
        console.log(error);
    }
}
