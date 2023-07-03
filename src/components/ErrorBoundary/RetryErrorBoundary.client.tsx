'use client';

import { ErrorBoundary } from 'react-error-boundary';

const RetryErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary }) => (
        <div className="flex flex-col items-center px-24pxr py-40pxr">
          <p className="text-h5 text-black">문제가 발생했습니다</p>
          <p className="mt-2pxr text-b3 text-grey-600">페이지를 불러오는데 실패했습니다.</p>
          <button
            className="mt-16pxr rounded-lg bg-grey-200 px-12pxr py-8pxr text-13pxr font-bold text-grey-800"
            onClick={() => resetErrorBoundary()}
          >
            다시 불러오기
          </button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default RetryErrorBoundary;
