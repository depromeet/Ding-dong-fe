import { Chip } from '@/components/Chip/Chip';

type KeywordInputProps = object;

// eslint-disable-next-line no-empty-pattern
export const KeywordInput = ({}: KeywordInputProps) => {
  return (
    <div>
      <h3>라벨</h3>
      <div>입력 받는 부분</div>
      <div>
        <label>이런 키워드는 어때요?</label>
        <ul>
          {TEMP_RECOMMEND_KEYWORD_LIST.map(recommendKeyword => (
            <Chip key={recommendKeyword} text="recommendKeyword" />
          ))}
        </ul>
      </div>
    </div>
  );
};

const TEMP_RECOMMEND_KEYWORD_LIST = [
  '재치 발랄',
  '엽기 떡볶이',
  '맛집투어',
  'FE 짱짱',
  '7팀 최고',
  '디프만 최고~',
];
