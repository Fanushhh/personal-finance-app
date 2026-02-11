export function Avatar({ src, fallback }: { src?: string | null; fallback: string }) {
  if (src) return <img src={src} alt="avatar" className="h-8 w-8 rounded-full object-cover" />;
  return <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs text-white">{fallback}</div>;
}
