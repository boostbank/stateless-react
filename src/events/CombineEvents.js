import AddNameEvent from "./AddNameEvent";
import AddNameErrorEvent from "./AddNameErrorEvent";
import MockApiEvent from "./MockApiEvent";
import { addEvent } from "@boostbank/stateless/lib/stateless";
export default function combineEvents() {
  addEvent(AddNameEvent().id);
  addEvent(AddNameErrorEvent().id);
  addEvent(MockApiEvent().id);
}
