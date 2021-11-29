import { render } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const wrapConfig = (Component: JSX.Element) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{Component}</QueryClientProvider>
  );
};
