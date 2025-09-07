import type { Input } from "@/types";

function filterTokens(
  onlyAfterYenMark: boolean,
  onlyBeforeYen: boolean,
  tokens: Input[],
): Input[] {
  const tokensWithNoSpace = tokens.filter(
    (token) => token.contentType !== "space",
  );

  if (onlyAfterYenMark && onlyBeforeYen) {
    const filteredTokens = tokensWithNoSpace.filter(
      (token, index) =>
        token.contentType === "number" &&
        index > 0 &&
        tokensWithNoSpace[index - 1].contentType === "YenMark" &&
        index < tokensWithNoSpace.length - 1 &&
        tokensWithNoSpace[index + 1].contentType === "Yen",
    );
    return filteredTokens;
  } else if (onlyAfterYenMark) {
    const filteredTokens = tokensWithNoSpace.filter(
      (token, index) =>
        token.contentType === "number" &&
        index > 0 &&
        tokensWithNoSpace[index - 1].contentType === "YenMark",
    );
    return filteredTokens;
  } else if (onlyBeforeYen) {
    const filteredTokens = tokensWithNoSpace.filter(
      (token, index) =>
        token.contentType === "number" &&
        index < tokensWithNoSpace.length - 1 &&
        tokensWithNoSpace[index + 1].contentType === "Yen",
    );
    return filteredTokens;
  } else {
    const filteredTokens = tokensWithNoSpace.filter(
      (token) => token.contentType === "number",
    );
    return filteredTokens;
  }
}

function calculateTotal(
  onlyAfterYenMark: boolean,
  onlyBeforeYen: boolean,
  tokens: Input[],
): number {
  const filteredTokens = filterTokens(onlyAfterYenMark, onlyBeforeYen, tokens);
  return filteredTokens.reduce((sum, token) => {
    const number = parseInt(token.content.replace(/,/g, ""), 10);
    return sum + (isNaN(number) ? 0 : number);
  }, 0);
}

export { calculateTotal };
