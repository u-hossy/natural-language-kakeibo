import { useState } from "react";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";

function App() {
  const [userInput, setUserInput] = useState<string>("");

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
        <div className="m-4 flex flex-row gap-4">
          <Button className="w-20" variant="outline">
            クリア
          </Button>
          <Button className="w-20">計算</Button>
        </div>

        <p>{userInput}</p>
      </div>
    </>
  );
}

export default App;
