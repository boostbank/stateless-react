const id = "MockApiEvent";

export default function MockApiEvent(success, error, message, names) {
  return {
    id,
    payload: {
      success,
      error,
      names,
      message
    }
  };
}
