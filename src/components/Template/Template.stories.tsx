import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

import { Template } from '.';

const meta: Meta<typeof Template> = {
  title: 'components/Template',
  component: Template,
  args: {},
};

export default meta;

type Story = StoryObj<typeof Template>;

const image = faker.image.avatar();

export const TemplateDefault: Story = {
  render: () => (
    <Template>
      <Template.Title>
        <h1>제목</h1>
      </Template.Title>
      <Template.Description>
        <div>설명문</div>
      </Template.Description>
      <Template.Content>
        <Image src={image} width={200} height={200} alt="mocking" />
      </Template.Content>
    </Template>
  ),
};

export const TemplateWithButton: Story = {
  render: () => (
    <Template>
      <Template.Title>
        <h1>제목</h1>
      </Template.Title>
      <Template.Description>
        <div>설명문</div>
      </Template.Description>
      <Template.Content>
        <Image src={image} width={200} height={200} alt="mocking" />
      </Template.Content>
      <Template.Button>완료</Template.Button>
    </Template>
  ),
};
