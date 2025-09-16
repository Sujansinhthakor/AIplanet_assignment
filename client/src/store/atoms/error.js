import { atom } from "recoil";

const myError = atom({
  key: "myError",
  default: false,
});
export default myError;
