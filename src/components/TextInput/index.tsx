import { TextInputBorder } from './TextInputBorder';
import { TextInputContent } from './TextInputContent';
import { TextInputLabel } from './TextInputLabel';
import { TextInputWrapper } from './TextInputWrapper';

export * from './useTextInput';

export const TextInput = Object.assign(TextInputWrapper, {
  Label: TextInputLabel,
  Content: TextInputContent,
  Border: TextInputBorder,
});
