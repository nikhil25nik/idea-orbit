import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helper/getEnv";
import moment from "moment";
import userIcon from "../assets/images/user.png";

export default function CommentLists({ props }) {
  const user = useSelector((state) => state.user);

  const {
    data: commentData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/api/comment/get/${props.blogid}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (loading) return <div>Loading...</div>;

  const totalComments = props.newComment
    ? (commentData?.comments?.length || 0) + 1
    : commentData?.comments?.length || 0;

  return (
    <div className="border-t mb-5">
      <h4 className="font-bold text-2xl mb-5">{totalComments} Comments</h4>


      {props.newComment && (
        <div
          key={props.newComment._id}
          className="flex gap-3 border-t py-4"
        >
          <Avatar>
            <AvatarImage src={user?.user?.avatar || userIcon} />
          </Avatar>

          <div>
            <p className="font-bold">{user?.user?.name}</p>
            <p className="text-sm text-muted-foreground">
              {moment(props.newComment.createdAt).format("DD-MM-YYYY")}
            </p>

            <div className="pt-2">
              <p>{props.newComment.comment}</p>
            </div>
          </div>
        </div>
      )}

    
      {commentData?.comments?.length > 0 &&
        commentData.comments.map((comment) => (
          <div
            key={comment._id}
            className="flex gap-3 border-t py-4"
          >
            <Avatar>
              <AvatarImage src={comment.user?.avatar || userIcon} />
            </Avatar>

            <div>
              <p className="font-bold">{comment.user?.name}</p>
              <p className="text-sm text-muted-foreground">
                {moment(comment.createdAt).format("DD-MM-YYYY")}
              </p>

              <div className="pt-2">
                <p>{comment.comment}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
