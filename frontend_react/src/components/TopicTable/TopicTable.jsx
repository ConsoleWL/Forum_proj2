import TopicItem from "./TopicItem";

const TopicTable = ({ topics = [] }) => {
  const topicItem = topics.map((topic) => (
    <TopicItem key={topic.topicId} topicObject={topic} />
  ));

  return (
    topicItem && (
      <table className="table dable">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>

            <th>Author</th>
            <th>Published</th>
            <th>Edited</th>
            <th>Likes</th>
          </tr>
        </thead>
        <tbody>{topicItem}</tbody>
      </table>
    )
  );
};

export default TopicTable;
