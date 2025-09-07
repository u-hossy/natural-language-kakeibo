import { expect, test } from "vitest";
import { tokenize } from "../../src/lib/tokenize";

test("Tokenize #1", () => {
  expect(tokenize("100円")).toStrictEqual([
    {
      content: "100",
      contentType: "number",
    },
    {
      content: "円",
      contentType: "Yen",
    },
  ]);
});

test("Tokenize #2", () => {
  expect(tokenize("1,000円")).toStrictEqual([
    {
      content: "1,000",
      contentType: "number",
    },
    {
      content: "円",
      contentType: "Yen",
    },
  ]);
});

test("Tokenize #3.1: 半角円マーク", () => {
  expect(tokenize("¥500")).toStrictEqual([
    { content: "¥", contentType: "YenMark" },
    { content: "500", contentType: "number" },
  ]);
});

test("Tokenize #3.2: 全角円マーク", () => {
  expect(tokenize("￥500")).toStrictEqual([
    { content: "￥", contentType: "YenMark" },
    { content: "500", contentType: "number" },
  ]);
});

test("Tokenize #4: 改行", () => {
  expect(tokenize("100円\n200円")).toStrictEqual([
    { content: "100", contentType: "number" },
    { content: "円", contentType: "Yen" },
    { content: "\n", contentType: "LF" },
    { content: "200", contentType: "number" },
    { content: "円", contentType: "Yen" },
  ]);
});

test("Tokenize #5: 空白文字", () => {
  expect(tokenize("100 円")).toStrictEqual([
    { content: "100", contentType: "number" },
    { content: " ", contentType: "space" },
    { content: "円", contentType: "Yen" },
  ]);
});

test("Tokenize #6: タブや複数空白", () => {
  expect(tokenize("100\t円  200円")).toStrictEqual([
    { content: "100", contentType: "number" },
    { content: "\t", contentType: "space" },
    { content: "円", contentType: "Yen" },
    { content: "  ", contentType: "space" },
    { content: "200", contentType: "number" },
    { content: "円", contentType: "Yen" },
  ]);
});

test("Tokenize #7: お母さんケース", () => {
  expect(tokenize("¥1000（昼ごはん）")).toStrictEqual([
    { content: "¥", contentType: "YenMark" },
    { content: "1000", contentType: "number" },
    { content: "（昼ごはん）", contentType: "other" },
  ]);
});

test("Tokenize #8: 複雑な混合", () => {
  expect(tokenize("合計: 1,000円 +¥500")).toStrictEqual([
    { content: "合計:", contentType: "other" },
    { content: " ", contentType: "space" },
    { content: "1,000", contentType: "number" },
    { content: "円", contentType: "Yen" },
    { content: " ", contentType: "space" },
    { content: "+", contentType: "other" },
    { content: "¥", contentType: "YenMark" },
    { content: "500", contentType: "number" },
  ]);
});

test("Tokenize #9: 空文字", () => {
  expect(tokenize("")).toStrictEqual([]);
});
