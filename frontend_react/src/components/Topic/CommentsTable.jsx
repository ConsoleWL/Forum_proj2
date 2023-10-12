import CommentItem from "./CommentItem";

const CommentsTable = ({ topicReviews = [] }) => {
  const commentItem = topicReviews.map((comment) => (
    <CommentItem comment={comment} key={comment.commentId} />
  ));

  return (
    topicReviews && (
      <table className="table dable">
        <thead>
          <tr>
            <th>Comment</th>
            <th>User</th>
            <th>Posted</th>
            <th>Edited</th>
            <th>Likes</th>
          </tr>
        </thead>
        <tbody>{commentItem}</tbody>
      </table>
    )
  );
};

export default CommentsTable;
