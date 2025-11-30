import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RouteAddCategory, RouteEditCategory } from "@/helper/RouteName";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helper/getEnv";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteData } from "@/helper/handelDelete";
import { showToast } from "@/helper/showToast";
import { useState } from "react";

export default function CategoryDetails() {

    let [refresh,setRefresh] = useState(false);
  const {
    data: categoryData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/api/category/all-category`, {
    method: "GET",
    credentials: "include",
  },[refresh]);

  const handleDelete = async (id) => {
    const response = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/api/category/delete/${id}`
    );

    if (response) {
      showToast("success", "Data deleted");
      setRefresh(!refresh)
    } else {
      showToast("error", "Data not deleted");
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <Button>
              <Link to={RouteAddCategory}>Add Category</Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryData && categoryData.category.length >= 0 ? (
                <>
                  {categoryData.category.map((category) => (
                    <TableRow key={category._id}>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>{category.slug}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          variant="outline"
                          className="hover:bg-amber-600 hover:text-white"
                        >
                          <Link to={RouteEditCategory(category._id)}>
                            <FaRegEdit />
                          </Link>
                        </Button>
                        <Button
                          onClick={() => handleDelete(category._id)}
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
  );
}
