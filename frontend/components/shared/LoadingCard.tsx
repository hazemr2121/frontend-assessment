export function LoadingCard({ label = "Loading..." }: { label?: string }) {
  return (
    <section className="card" style={{ padding: "1rem" }} aria-live="polite">
      <p style={{ margin: 0 }}>{label}</p>
    </section>
  );
}
