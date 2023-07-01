"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";

// queryclient가 요청당 한 번만 생성되도록 하면서 사용자 및 요청 간에 데이타가 공유되는 것을 방지
// queryclient의 요청 범위 싱글톤 인스턴스를 생성.
// 여러 서버 구성 요소내에서 데이터를 가져와 <Hydrate> 여러 위치에서 사용 가능.
const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 5000 } },
  });
  const [client] = useState(queryClient);

  return (
    <QueryClientProvider client={client}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default Providers;
