import { atom } from "recoil";

const edgeAtom = atom({
  key: "edges",
  default: [{ id: "n1-n3", source: "n1", target: "n3", type: "simplebezier" }],
});
export default edgeAtom;
