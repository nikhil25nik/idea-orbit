import { Card, CardContent } from "./ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RxAvatar } from "react-icons/rx";
import { FaCalendarAlt } from "react-icons/fa";
import moment from "moment";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "@/helper/RouteName";

export default function BlogCard({ props }) {
  return (
    <Link to={RouteBlogDetails(props.category.slug, props.slug)}>
      <Card className="pt-5 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
        <CardContent className="px-4 sm:px-6">

          {/* Top Section */}
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={props.author.avatar} />
                <AvatarFallback>
                  <RxAvatar className="text-xl" />
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm sm:text-base">
                {props.author.name}
              </span>
            </div>

            {props.author.role === "admin" && (
              <Badge className="bg-amber-500 text-[10px] sm:text-xs px-2 py-1 rounded">
                Admin
              </Badge>
            )}
          </div>

          {/* Featured Image */}
          <div className="my-4 w-full">
            <img
              src={props.featuredImage}
              alt=""
              className="rounded-lg w-full h-40 sm:h-52 object-cover"
            />
          </div>

          {/* Details Section */}
          <div>
            <p className="flex items-center gap-2 text-gray-500 text-sm mb-2">
              <FaCalendarAlt className="text-xs" />
              <span>{moment(props.createdAt).format("DD-MM-YYYY")}</span>
            </p>

            <h2 className="text-xl sm:text-2xl font-semibold line-clamp-2 leading-snug">
              {props.title}
            </h2>
          </div>

        </CardContent>
      </Card>
    </Link>
  );
}
