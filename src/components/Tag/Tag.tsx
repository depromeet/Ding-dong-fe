import { CharacterType } from '@/types/id-cards.type';

type TagProps = {
  type: CharacterType;
  label: string;
};

const colors: Record<CharacterType, string> = {
  BUDDY: 'text-buddy-700 bg-buddy-200 border-buddy-400',
  TOBBY: 'text-tobby-700 bg-tobby-200 border-tobby-400',
  PIPI: 'text-pipi-700 bg-pipi-200 border-pipi-400',
  TRUE: 'text-true-700 bg-true-200 border-true-400',
};

const getCharacterColor = (type: CharacterType) => {
  return `${colors[type]}`;
};

const getClassName = (type: CharacterType) => {
  return `${getCharacterColor(
    type,
  )} inline-block rounded border border-solid px-2 py-1 text-detail font-medium`;
};

const Tag = ({ type, label }: TagProps) => {
  return <div className={getClassName(type)}>{label}</div>;
};

export default Tag;
