export const id = "AddNameError";

export default function AddNameError(error) {
  return {
    id,
    payload: { error }
  };
}
