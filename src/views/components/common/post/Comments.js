import Comment from "./Comment";

const Comments = ({comments}) => {
    console.log(comments);
  return (
      <div className="w-full h-[257px] overflow-y-scroll mt-4 no-scrollbar">
          {
              comments.map(comment => <Comment key={comment._id} comment={comment} />)
          }
      </div>
  )
}

export default Comments;