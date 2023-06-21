import { TemplateButton } from './TemplateButton';
import { TemplateContent } from './TemplateContent';
import { TemplateDescription } from './TemplateDescription';
import { TemplateTitle } from './TemplateTitle';
import { TemplateWrapper } from './TemplateWrapper';

export const Template = Object.assign(TemplateWrapper, {
  Title: TemplateTitle,
  Description: TemplateDescription,
  Content: TemplateContent,
  Button: TemplateButton,
});
