import TopicItem from "./TopicItem";

const TopicTable = ({ topics = [] }) => {
  console.log(topics);

  const topicItem = topics.map((topic) => (
    <TopicItem key={topic.topicId} topicObject={topic} />
  ));

  return (
    topicItem && (
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
            <th>Likes</th>
          </tr>
        </thead>
        <tbody>{topicItem}</tbody>
      </table>
    )
  );
};

export default TopicTable;
