import { dispatch } from "@boostbank/stateless/lib/stateless";
import MockApiEvent from "./../events/MockApiEvent";

const mockNamesFromApi = ["Wilber", "Nelson", "Grace", "Serena", "Loxus"];

export default function MockApi() {
  setTimeout(() => {
    if (Math.random() > 0.6) {
      dispatch(
        MockApiEvent(
          false,
          true,
          "Server had an error! (Not really its a 40% fail rate in code (Try again))",
          []
        )
      );
    } else {
      dispatch(MockApiEvent(true, false, "OK", mockNamesFromApi));
    }
  }, 2000);
}
