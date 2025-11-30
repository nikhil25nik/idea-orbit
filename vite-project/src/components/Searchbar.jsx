import { useState } from "react";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { RouteSearch } from "@/helper/RouteName";


export default function Searchbar(){
    const navigate = useNavigate()

    const [query,setQuery] = useState();

    const onInputChange = (e)=>{
      
        setQuery(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        navigate(RouteSearch(query))
    }
    return(
        <form onSubmit={handleSubmit}>
            <Input name="q" onInput={onInputChange} className="rounded-full bg-gray-50 h-9" placeholder="Search here...."/>
        </form>
    )
}