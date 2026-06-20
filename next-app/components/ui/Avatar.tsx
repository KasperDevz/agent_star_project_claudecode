interface AvatarProps { initials: string; size?: number; }

export function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2);
}

export default function Avatar({ initials, size = 40 }: AvatarProps) {
  return (
    <div
      className="avatar"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.38) }}
    >
      {initials}
    </div>
  );
}
