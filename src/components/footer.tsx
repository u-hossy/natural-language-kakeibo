export default function Footer() {
  return (
    <footer className="flex flex-col items-center px-4">
      <a
        className="text-muted-foreground"
        href="https://github.com/u-hossy/natural-language-kakeibo"
      >
        GitHub
      </a>
      <p className="text-muted-foreground mt-1 text-sm">
        バグや不具合などの報告は
        <a href="https://github.com/u-hossy/natural-language-kakeibo//issues">
          GitHubのIssue
        </a>
        まで
      </p>
      <p className="text-muted-foreground my-2">
        Made by <a href="https://github.com/u-hossy">u-hossy</a>
      </p>
    </footer>
  );
}
