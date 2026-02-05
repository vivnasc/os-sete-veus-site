"use client";

interface AvatarProps {
  name: string;
  url?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
  xl: "h-20 w-20 text-2xl",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getColor(name: string) {
  const colors = [
    "bg-veu-500",
    "bg-pink-500",
    "bg-blue-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-red-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function Avatar({ name, url, size = "md" }: AvatarProps) {
  if (url) {
    return (
      <img
        src={url}
        alt={name}
        className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-white`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} ${getColor(name)} inline-flex items-center justify-center rounded-full font-semibold text-white ring-2 ring-white`}
    >
      {getInitials(name)}
    </div>
  );
}
