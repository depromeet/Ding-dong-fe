'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { ButtonHTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useGetTester } from '@/hooks/api/tester.query';
import useTesterStore from '@/stores/tester.store';

export type TesterProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const rhfSchema = yupResolver(
  yup
    .object({
      nickname: yup.string().required('닉네임이 입력되지 않았습니다.'),
      password: yup
        .string()
        .required('비밀번호가 입력되지 않았습니다.')
        .min(8, '비밀번호는 8자 이상이어야 합니다.')
        .max(20, '비밀번호는 20자 이하이어야 합니다.'),
    })
    .required(),
);

const Tester = ({ disabled }: TesterProps) => {
  const setTesterInfo = useTesterStore(state => state.setTesterInfo);
  const testerNicknameReadOnly = useTesterStore(state => state.nickname);
  const { data, isLoading, isError } = useGetTester();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: '',
      password: '',
    },
    mode: 'onChange',
    resolver: rhfSchema,
  });

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error...</>;

  const { id, nickname } = data.data.tester;

  const onSubmit = (submitData: { nickname: string; password: string }) => {
    setTesterInfo(id, submitData.nickname);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('nickname')} className="text-black" />
        <p>{errors.nickname?.message}</p>

        <input {...register('password')} type="password" className="text-black" />
        <p>{errors.password?.message}</p>
        <button
          className="w- h-10 w-full rounded-md bg-blue-600 text-white hover:bg-blue-200 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-30"
          disabled={disabled}
        >
          <p>{nickname}</p>
        </button>
      </form>
      <div>
        <label>zustand</label>
        <div>nickname: {testerNicknameReadOnly}</div>
      </div>
    </div>
  );
};

export default Tester;
