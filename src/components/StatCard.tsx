export default function StatCard({
  label,
  value,
  icon,
  accent = "text-amber-700",
  onClick,
}: {
  label: string;
  value: string | number;
  icon: string;
  accent?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className="card flex w-full items-center gap-3 p-4 text-left transition enabled:hover:shadow-card-hover"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-paper-100 text-2xl">
        {icon}
      </div>
      <div className="min-w-0">
        <div className={`text-2xl font-extrabold leading-tight ${accent}`}>{value}</div>
        <div className="truncate text-sm text-stone-500">{label}</div>
      </div>
    </button>
  );
}
