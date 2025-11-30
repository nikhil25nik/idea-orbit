import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { getEnv } from "@/helper/getEnv"
import { useFetch } from "@/hooks/useFetch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteData } from "@/helper/handelDelete";
import { showToast } from "@/helper/showToast";
import Loading from "@/components/Loading";
import { useState } from "react";

export default function CommentDetails(){
  const [refresh,setRefresh] = useState(false)

  const {data,loading,error} = useFetch(`${getEnv("VITE_API_BASE_URL")}/api/comment/get-all-comments`,{
    method:"GET",
    credentials:"include"
  },[refresh])


  const handleDelete = async(id)=>{
    const response = await deleteData(`${getEnv("VITE_API_BASE_URL")}/api/comment/delete/${id}`)

    if(response){
      showToast("success","Comment deleted successfully")
      setRefresh(!refresh)
    }else{
      showToast("error","Comment not be deleted")
    }
  }

  if(loading) return <Loading/>
    return(
              <div>
      <Card>
        <CardHeader>
          <div>
            <h2 className="text-2xl text-orange-500 font-bold">Your Comments</h2>
            {/* <Button>
              <Link to={RouteAddBlog}>Add Category</Link>
            </Button> */}
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Blog</TableHead>
                <TableHead>Commented by</TableHead>
                
                <TableHead>Comment</TableHead>
              
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.getComments.length > 0 ? (
                <>
                  {data.getComments.map((comment) => (
              
                    <TableRow key={comment?._id}>
                      <TableCell>{comment?.blogid?.title}</TableCell>
                      <TableCell>{comment?.user?.name}</TableCell>
                      <TableCell>{comment?.comment}</TableCell>
                      <TableCell className="flex gap-2">
                    
                        <Button
                          onClick={() => handleDelete(comment._id)}
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
    </div>
    )
}