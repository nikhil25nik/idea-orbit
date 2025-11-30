import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helper/getEnv";
import moment from "moment";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteData } from "@/helper/handelDelete";
import { showToast } from "@/helper/showToast";
import Loading from "@/components/Loading";
import { useState } from "react";
import userIcon from "../assets/images/user.png"

export default function Users(){

    const [refresh,setRefresh] = useState(false)
    const {data,loading,error} = useFetch(`${getEnv("VITE_API_BASE_URL")}/api/user/get-all-users`,{
        method:"GET",
        credentials:"include"
    },[refresh])



    const handleDelete = async(id)=>{
        const response = await deleteData(`${getEnv("VITE_API_BASE_URL")}/api/user/delete/${id}`)

        if(response){
            showToast("success","User deleted successfully")
            setRefresh(!refresh)
        }else{
            showToast("error","user are not deleted")
        }
    }
  if (loading) return <Loading />;
    return(
        <div>      <div>
              <Card >
        
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Role</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Avatar</TableHead>
                        <TableHead>Dated</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data && data.users.length > 0 ? (
                        <>
                          {data.users.map((user) => (
                            <TableRow key={user?._id}>
                              <TableCell>{user?.role}</TableCell>
                              <TableCell>{user?.name}</TableCell>
                              <TableCell>{user?.email}</TableCell>
                              <TableCell><img  className="h-[40px] rounded-4xl" src={user?.avatar || userIcon} alt="" /></TableCell>
                              <TableCell>{moment(user.createdAt).format("DD-MM-YYYY")}</TableCell>
                              <TableCell className="flex gap-2">
                              
                                <Button
                                  onClick={() => handleDelete(user._id)}
                                  variant="outline"
                                  className="hover:bg-amber-600 hover:text-white"
                                >
                                  <RiDeleteBin6Line />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      ) : (
                        <>
                          <TableRow>
                            <TableCell colSpan="3">Data not found!</TableCell>
                          </TableRow>
                        </>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div></div>
    )
}