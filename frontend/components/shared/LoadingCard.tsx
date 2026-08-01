export function LoadingCard({ label = "Loading..." }: { label?: string }) {
  return (
    <section className="card" aria-live="polite">
      <p style={{ margin: 0 }}>{label}</p>
    </section>
  );
}
