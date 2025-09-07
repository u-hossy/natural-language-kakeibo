import { expect, test } from "vitest";
import { calculateTotal } from "../../src/lib/calculate";
import type { Input } from "../../src/types";

test("calculateTotal: パターン1 - ¥あり、円あり（¥1000円）", () => {
  const tokens: Input[] = [
    { content: "¥", contentType: "YenMark" },
    { content: "1000", contentType: "number" },
    { content: "円", contentType: "Yen" },
    { content: " ", contentType: "space" },
    { content: "500", contentType: "number" },
    { content: "映画代", contentType: "other" },
  ];

  expect(calculateTotal(false, false, tokens)).toBe(1500);
  expect(calculateTotal(true, false, tokens)).toBe(1000);
  expect(calculateTotal(false, true, tokens)).toBe(1000);
  expect(calculateTotal(true, true, tokens)).toBe(1000);
});

test("calculateTotal: パターン2 - ¥あり、円なし（¥1000）", () => {
  const tokens: Input[] = [
    { content: "¥", contentType: "YenMark" },
    { content: "1000", contentType: "number" },
    { content: " ", contentType: "space" },
    { content: "500", contentType: "number" },
    { content: "映画代", contentType: "other" },
  ];

  expect(calculateTotal(false, false, tokens)).toBe(1500);
  expect(calculateTotal(true, false, tokens)).toBe(1000);
  expect(calculateTotal(false, true, tokens)).toBe(0);
  expect(calculateTotal(true, true, tokens)).toBe(0);
});

test("calculateTotal: パターン3 - ¥なし、円あり（1000円）", () => {
  const tokens: Input[] = [
    { content: "1000", contentType: "number" },
    { content: "円", contentType: "Yen" },
    { content: " ", contentType: "space" },
    { content: "500", contentType: "number" },
    { content: "映画代", contentType: "other" },
  ];

  expect(calculateTotal(false, false, tokens)).toBe(1500);
  expect(calculateTotal(true, false, tokens)).toBe(0);
  expect(calculateTotal(false, true, tokens)).toBe(1000);
  expect(calculateTotal(true, true, tokens)).toBe(0);
});

test("calculateTotal: パターン4 - ¥なし、円なし（1000）", () => {
  const tokens: Input[] = [
    { content: "1000", contentType: "number" },
    { content: " ", contentType: "space" },
    { content: "500", contentType: "number" },
    { content: "映画代", contentType: "other" },
  ];

  expect(calculateTotal(false, false, tokens)).toBe(1500);
  expect(calculateTotal(true, false, tokens)).toBe(0);
  expect(calculateTotal(false, true, tokens)).toBe(0);
  expect(calculateTotal(true, true, tokens)).toBe(0);
});

test("calculateTotal: 複合パターン - 4種類の数値が混在", () => {
  const tokens: Input[] = [
    { content: "¥", contentType: "YenMark" },
    { content: "1000", contentType: "number" },
    { content: "円", contentType: "Yen" },
    { content: " ", contentType: "space" },
    { content: "¥", contentType: "YenMark" },
    { content: "500", contentType: "number" },
    { content: " ", contentType: "space" },
    { content: "300", contentType: "number" },
    { content: "円", contentType: "Yen" },
    { content: " ", contentType: "space" },
    { content: "200", contentType: "number" },
    { content: "映画代", contentType: "other" },
  ];

  expect(calculateTotal(false, false, tokens)).toBe(2000);
  expect(calculateTotal(true, false, tokens)).toBe(1500);
  expect(calculateTotal(false, true, tokens)).toBe(1300);
  expect(calculateTotal(true, true, tokens)).toBe(1000);
});

test("calculateTotal: 空の配列", () => {
  const tokens: Input[] = [];

  expect(calculateTotal(false, false, tokens)).toBe(0);
  expect(calculateTotal(true, false, tokens)).toBe(0);
  expect(calculateTotal(false, true, tokens)).toBe(0);
  expect(calculateTotal(true, true, tokens)).toBe(0);
});
