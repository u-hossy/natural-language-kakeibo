import { useState } from "react";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Label } from "./components/ui/label";
import { Switch } from "./components/ui/switch";
import { Textarea } from "./components/ui/textarea";
import type { Input } from "./types";
import { tokenize } from "./lib/tokenize";
import { calculateTotal } from "./lib/calculate";

function App() {
  const [userInput, setUserInput] = useState<string>("");
  const [filterInput, setFilterInput] = useState<Input[]>([]);

  const [onlyAfterYenMark, setOnlyAfterYenMark] = useState<boolean>(false);
  const [onlyBeforeYen, setOnlyBeforeYen] = useState<boolean>(false);

  const handleClear = () =>
    window.confirm("入力された内容がクリアされます。よろしいですか？") &&
    setUserInput("");
  const handleCalculate = () => {
    const t = tokenize(userInput);
    setFilterInput(t);
    // console.log(userInput);
    // console.log(t);
    // console.log(filterInput);
  };

  return (
    <>
      <Header />
      <div className="mx-auto flex min-h-svh flex-col items-center justify-center p-4 md:w-3xl">
        <Label
          htmlFor="user_input"
          className="mb-2 items-start self-start font-semibold"
        >
          計算したい内容を入力してください
        </Label>
        <Textarea
          id="user_input"
          className="h-48 resize-y"
          placeholder="ここに内容を貼り付けてください。（例：¥2,000 映画代）"
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
          value={userInput}
        />

        <div className="m-4 flex flex-col">
          <div className="m-2 flex items-center space-x-2">
            <Switch
              id="only_after_yen_mark"
              checked={onlyAfterYenMark}
              onCheckedChange={setOnlyAfterYenMark}
            />
            <Label htmlFor="only_after_yen_mark">
              前に「¥」がついている数字だけを計算に含める
            </Label>
          </div>
          <div className="m-2 flex items-center space-x-2">
            <Switch
              id="only_before_yen"
              checked={onlyBeforeYen}
              onCheckedChange={setOnlyBeforeYen}
            />
            <Label htmlFor="only_before_yen">
              後ろに「円」がついている数字だけを計算に含める
            </Label>
          </div>
        </div>

        <div className="m-4 flex flex-row gap-4">
          <Button className="w-20" variant="outline" onClick={handleClear}>
            クリア
          </Button>
          <Button className="w-20" onClick={handleCalculate}>
            計算
          </Button>
        </div>

        {/* トークン結果表示エリア */}
        {filterInput.length > 0 && (
          <div className="w-full max-w-3xl">
            <Label className="mb-2 font-semibold">解析結果:</Label>
            <div className="mb-4 rounded-md border bg-gray-50 p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap">
              {filterInput.map((token, index) => {
                if (token.contentType === "LF") {
                  return "\n";
                }

                return (
                  <span
                    key={index}
                    className={`${
                      token.contentType === "number"
                        ? "bg-green-200 text-green-800"
                        : token.contentType === "space"
                          ? ""
                          : "bg-red-200 text-red-800"
                    }`}
                  >
                    {token.content}
                  </span>
                );
              })}
            </div>

            {/* 合計値表示 */}
            <div className="rounded-md border bg-blue-50 p-4">
              <Label className="text-lg font-semibold">
                合計: ¥
                {calculateTotal(
                  onlyAfterYenMark,
                  onlyBeforeYen,
                  filterInput,
                ).toLocaleString()}
              </Label>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
