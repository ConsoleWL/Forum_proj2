import dayjs from "dayjs";

const TopicItem = ({ topic }) => {
  console.log(topic);

  // time posted
  const shortDateFormat = dayjs(topic.timePosted).format("MM/DD/YYYY");

  return (
    <tr>
      <td>{topic.topicId}</td>
      <td>{topic.title}</td>
      <td>{topic.authorOfTopic.userName}</td>
      <td>{topic.shortDateFormat}</td>
      <td>{topic.likes}</td>
    </tr>
  );
};

export default TopicItem;
