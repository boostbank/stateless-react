export const id = "AddNameEvent";

export default function AddNameEvent(name) {
  return {
    id,
    payload: { name }
  };
}
