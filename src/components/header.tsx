import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <header className="px-4 h-16 flex flex-row justify-between border border-b">
      <div className="font-bold text-lg my-auto">
        <span>自然言語計算ツール</span>
      </div>
      <div className="my-auto">
        <ModeToggle />
      </div>
    </header>
  );
}
