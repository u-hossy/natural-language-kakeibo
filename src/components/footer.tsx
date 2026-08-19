export default function Footer() {
  return (
    <footer className="flex flex-col items-center px-4">
      <a
        className="text-muted-foreground"
        href="https://github.com/yufo211/natural-language-kakeibo"
      >
        GitHub
      </a>
      <p className="mt-1 text-muted-foreground text-sm">
        バグや不具合などの報告は
        <a href="https://github.com/yufo211/natural-language-kakeibo/issues">
          GitHubのIssue
        </a>
        まで
      </p>
      <p className="my-2 text-muted-foreground">
        Made by <a href="https://github.com/yufo211">yufo211</a>
      </p>
    </footer>
  );
}
