import { atom } from "recoil";

const isChat = atom({
  key: "showChat",
  default: false,
});
export default isChat;
