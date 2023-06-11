import { TextAreaBorder } from './TextAreaBorder';
import { TextAreaContent } from './TextAreaContent';
import { TextAreaHeader } from './TextAreaHeader';
import { TextAreaImage } from './TextAreaImage';
import { TextAreaLabel } from './TextAreaLabel';
import { TextAreaWrapper } from './TextAreaWrapper';

export * from './useTextArea';

export const TextArea = Object.assign(TextAreaWrapper, {
  Label: TextAreaLabel,
  Header: TextAreaHeader,
  Content: TextAreaContent,
  Border: TextAreaBorder,
  Image: TextAreaImage,
});
