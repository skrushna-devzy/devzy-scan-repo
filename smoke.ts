type ApiResponse<T> =
  T extends string
    ? { type: "text"; value: T }
    : T extends number
      ? { type: "number"; value: T }
      : { type: "object"; value: T };

function createResponse<T>(
  value: T
): ApiResponse<T> {
  if (typeof value === "string") {
    return {
      type: "text",
      value
    } as ApiResponse<T>;
  }

  if (typeof value === "number") {
    return {
      type: "number",
      value
    } as ApiResponse<T>;
  }

  return {
    type: "object",
    value
  } as ApiResponse<T>;
}

const a = createResponse("Hello");
const b = createResponse(100);
