import { atom } from "recoil";

const nodeAtom = atom({
  key: "nodes",
  default: [
    // {
    //   id: "n1",
    //   type: "userQuery",
    //   position: { x: 100, y: 100 },
    // },
  ],
});
export default nodeAtom;
