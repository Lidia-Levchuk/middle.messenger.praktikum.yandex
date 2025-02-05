import avatar1 from "../../assets/images/01.jpg";
import avatar2 from "../../assets/images/02.jpg";
import avatar from "../../assets/images/example_avatar.jpg";

const dialogueInfo = {
  name: "Евгения",
  conversation: {
    id: 1,
    participants: [
      {
        id: "partner",
        name: "Евгения",
        avatarUrl: avatar2,
      },
      {
        id: "user",
        name: "Лида",
        avatarUrl: avatar,
      },
    ],
    messages: [
      {
        id: "msg1",
        senderId: "partner",
        content: "Привет! Предлагаю встретиться на выходных, у меня выходной, у тебя выходной, разве есть препятствия для встречи у меня в 14:00 в субботу?",
        timestamp: "2024-10-12T10:15:30Z",
        type: "text",
        attachment: null,
      },
      {
        id: "msg2",
        senderId: "partner",
        content: null,
        timestamp: "2024-10-12T10:17:00Z",
        type: "image",
        attachment: {
          url: avatar1,
        },
      },
      {
        id: "msg3",
        senderId: "user",
        content: "Хорошо, тогда договорились)",
        timestamp: "2024-10-12T10:18:00Z",
        type: "text",
        attachment: null,
      },
    ],
  },
}
export default dialogueInfo
