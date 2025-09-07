type ContentType = "number" | "Yen" | "YenMark" | "LF" | "space" | "other";

interface Input {
  content: string;
  contentType: ContentType;
}

export type { Input };
