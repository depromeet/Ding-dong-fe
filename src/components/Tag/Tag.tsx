import { CharacterNameModel } from '~/types/idCard';

type TagProps = {
  type: CharacterNameModel;
  label: string;
};

const colors: Record<CharacterNameModel, string> = {
  BUDDY: 'text-buddy-700 border-buddy-200',
  TOBBY: 'text-tobby-700 border-tobby-200',
  PIPI: 'text-pipi-700 border-pipi-200',
  TRUE: 'text-true-700 border-true-200',
};

const getCharacterColor = (type: CharacterNameModel) => {
  return `${colors[type]}`;
};

const getClassName = (type: CharacterNameModel) => {
  return `${getCharacterColor(
    type,
  )} inline-block rounded-xl border border-solid px-2 py-1 text-detail font-medium bg-white`;
};

const Tag = ({ type, label }: TagProps) => {
  return <div className={getClassName(type)}>{label}</div>;
};

export default Tag;
