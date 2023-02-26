import Comment from "./Comment";

const Comments = ({comments}) => {
  return (
      <div className="w-full mt-4">
          {
              comments.map(comment => <Comment key={comment._id} comment={comment} />)
          }
      </div>
  )
}

export default Comments;