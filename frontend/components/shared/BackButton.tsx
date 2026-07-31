import Link from "next/link";

export function BackButton() {
  return (
    <nav>
      <Link href="/" className="button">
        Back
      </Link>
    </nav>
  );
}
