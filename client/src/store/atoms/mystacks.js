import { atom } from "recoil";

const myStackAtom = atom({
  key: "myStack",
  default: [],
});
export default myStackAtom;
