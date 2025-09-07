import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <header className="flex h-16 flex-row justify-between border-b px-4">
      <div className="my-auto text-lg font-bold">
        <a href="/">自然言語内の数値計算ツール</a>
      </div>
      <div className="my-auto">
        <ModeToggle />
      </div>
    </header>
  );
}
