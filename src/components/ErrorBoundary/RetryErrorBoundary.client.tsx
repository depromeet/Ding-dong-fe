'use client';

import { ErrorBoundary } from 'react-error-boundary';

const RetryErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary }) => (
        <div>
          <p> 데이터를 불러오는데 실패했어요 😭😭😭</p>
          <button onClick={() => resetErrorBoundary()}> 다시 시도 </button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default RetryErrorBoundary;
