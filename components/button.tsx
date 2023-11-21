export default function Button({
  label,
  onClick,
  type = "primary",
  className = "",
}: {
  label: string;
  onClick: () => void;
  type?: string;
  className?: string;
}) {
  const secondaryClass =
    "w-full rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50";
  const primaryClass =
    "w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";

  return (
    <div className={className}>
      <button
        onClick={onClick}
        type="button"
        className={type === "primary" ? primaryClass : secondaryClass}
      >
        {label}
      </button>
    </div>
  );
}
