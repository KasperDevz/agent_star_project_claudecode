import Icon from './Icon';

interface StarPillProps { count: number; sm?: boolean; }

export default function StarPill({ count, sm = false }: StarPillProps) {
  return (
    <span className={`star-pill${sm ? ' sm' : ''}`}>
      <Icon name="star" size={sm ? 11 : 13} />
      {count.toLocaleString()}
    </span>
  );
}
