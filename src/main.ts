import Handlebars from "handlebars";
import { registerHelpers } from "./helpers";
import * as Components from "./components";
import * as Pages from "./pages";

import avatar1 from "./assets/images/01.jpg"
import avatar2 from "./assets/images/02.jpg"
import avatar3 from "./assets/images/03.jpg"
import avatar from "./assets/images/example_avatar.jpg"

registerHelpers();

const pages = {
  "login": [ Pages.LoginPage ],
  "registration": [ Pages.RegistrationPage ],
  "error": [ Pages.ErrorPage, {
    title: "500",
    text: "Сервер не отвечает. Мы уже работаем над этим.<br>Попробуйте зайти на страницу позднее или вернуться обратно.",
    buttonText: "Назад к чатам"
  }],
  "list": [ Pages.ListPage, {
    users: [
      {avatar: avatar1, name: "Александр", lastMessage: "И да, привет)", lastMessageOwner: "partner", dateTime: "12:00", newMessagesCount: "2"},
      {avatar: avatar2, name: "Евгения", lastMessage: "Хорошо, тогда договорились)", lastMessageOwner: "you", dateTime: "12:00", newMessagesCount: "0", active: true},
      {avatar: avatar3, name: "Валентина Ивановна", lastMessage: "В итоге, не знаю, как у Вас, а у меня страница не открывается.", lastMessageOwner: "partner", dateTime: "12 Апр 2024", newMessagesCount: "4"},
    ],
    isDialogueOpen: true,
    dialogueOpenInfo: {
      name: 'Евгения',
      conversation: {
        id: "1",
        participants: [
          {
            id: "partner",
            name: "Евгения",
            avatarUrl: avatar2
          },
          {
            id: "user",
            name: "Лида",
            avatarUrl: avatar
          }
        ],
        messages: [
          {
            id: "msg1",
            senderId: "partner",
            content: "Привет! Предлагаю встретиться на выходных, у меня выходной, у тебя выходной, разве есть препятствия для встречи у меня в 14:00 в субботу?",
            timestamp: "2024-10-12T10:15:30Z",
            type: "text",
            attachment: null
          },
          {
            id: "msg2",
            senderId: "partner",
            content: null,
            timestamp: "2024-10-12T10:17:00Z",
            type: "image",
            attachment: {
              url: avatar1
            }
          },
          {
            id: "msg3",
            senderId: "user",
            content: "Хорошо, тогда договорились)",
            timestamp: "2024-10-12T10:18:00Z",
            type: "text",
            attachment: null
          }
        ]
      }
    },
    showDialog: false
  }],
  "profile": [ Pages.ProfilePage, {
    user: {
      avatar: avatar,
      email: "pochta@yandex.ru",
      login: "ivanivanov",
      firstName: "Иван",
      secondName: "Иванов",
      displayName: "Иван",
      phone: "+7 (909) 967 30 30"
    },
    showDialog: false,
    changeUserData: false,
    changePassword: false
  }],
  "nav": [ Pages.NavigatePage ]
};

Object.entries(Components).forEach(([ name, template ]) => {
  Handlebars.registerPartial(name, template);
});

function navigate(page: string) {
  //@ts-ignore
  const [ source, context ] = pages[page];
  const container = document.getElementById("app")!;

  const temlpatingFunction = Handlebars.compile(source);
  container.innerHTML = temlpatingFunction(context);
}

document.addEventListener("DOMContentLoaded", () => navigate("nav"));

document.addEventListener("click", e => {
  //@ts-ignore
  const page = e.target.getAttribute("page");
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
