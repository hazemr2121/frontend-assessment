export function ErrorCard({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <section
      className="card"
      style={{ padding: "1rem", borderColor: "#e3b4c0", background: "#fff8fa" }}
      role="alert"
    >
      <p
        style={{
          marginTop: 0,
          marginBottom: "0.75rem",
          color: "var(--danger)",
        }}
      >
        {message}
      </p>
      <button type="button" className="button" onClick={onRetry}>
        Retry
      </button>
    </section>
  );
}
