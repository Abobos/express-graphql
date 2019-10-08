export const encodeCursor = cursor => Buffer.from(cursor).toString("base64");

export const decodeCursor = endcodedCursor =>
  Buffer.from(endcodedCursor, "base64").toString("ascii");
