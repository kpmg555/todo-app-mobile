import { Platform } from "react-native";

if (Platform.OS !== "web") {
  if (typeof global.DOMException === "undefined") {
    // @ts-ignore
    global.DOMException = class DOMException extends Error {
      constructor(message?: string, name?: string) {
        super(message);
        this.name = name || "DOMException";
      }
    };
  }


}
