import type { Input } from "../types";

function tokenize(inputText: string): Input[] {
  // 正規表現パターン
  // (¥) → 円マーク
  // (円) → 円
  // ([0-9]{1,3}(?:,[0-9]{3})*) → カンマ区切りの数字
  // (\n) → 改行
  // (\s+) → 空白文字（改行以外）
  // ([^¥円0-9\s\n]+) → その他
  const regex =
    /([¥￥])|(円)|([0-9]+(?:,[0-9]{3})*)|(\n)|(\s+)|([^¥円0-9\s\n]+)/g;

  const result: Input[] = [];
  let match;

  while ((match = regex.exec(inputText)) !== null) {
    if (match[1]) {
      result.push({ content: match[1], contentType: "YenMark" });
    } else if (match[2]) {
      result.push({ content: "円", contentType: "Yen" });
    } else if (match[3]) {
      result.push({ content: match[3], contentType: "number" });
    } else if (match[4]) {
      result.push({ content: match[4], contentType: "LF" });
    } else if (match[5]) {
      result.push({ content: match[5], contentType: "space" });
    } else if (match[6]) {
      result.push({ content: match[6], contentType: "other" });
    }
  }

  return result;
}

export { tokenize };
