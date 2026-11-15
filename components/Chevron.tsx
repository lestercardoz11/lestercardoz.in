export function Chevron({ back = false }: { back?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden style={back ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
