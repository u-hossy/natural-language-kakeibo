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

// 特定のトークンが計算対象かどうかを判定する関数
function isTokenIncludedInCalculation(
  token: Input,
  _index: number, // 将来の拡張のために残しておく
  tokens: Input[],
  onlyAfterYenMark: boolean,
  onlyBeforeYen: boolean,
): boolean {
  // 数値以外は対象外
  if (token.contentType !== "number") {
    return false;
  }

  // フィルタリングされたトークンに含まれているかチェック
  const filteredTokens = filterTokens(onlyAfterYenMark, onlyBeforeYen, tokens);

  // 元のトークンと一致するものがフィルタリング結果に含まれているかチェック
  return filteredTokens.some(
    (filteredToken) =>
      filteredToken.content === token.content &&
      filteredToken.contentType === token.contentType,
  );
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

export { calculateTotal, isTokenIncludedInCalculation };
