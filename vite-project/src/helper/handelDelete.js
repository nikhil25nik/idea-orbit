export const deleteData = async(endpoint)=>{
    let c = confirm("Are you sure to delete this")

    if(c){

        try{
        const response = await fetch(endpoint,{
            method:"DELETE",
            credentials:"include"
        })
        const data = await response.json()
        if(!response.ok){
           throw new Error(data.message || "Failed to delete");
        }
        
        return true
        }catch(err){

        }
    }else{
        return false
    }


}