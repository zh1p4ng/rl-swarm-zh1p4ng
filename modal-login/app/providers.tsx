"use client";
import { config, queryClient } from "@/config";
import { AlchemyClientState } from "@account-kit/core";
import { AlchemyAccountProvider } from "@account-kit/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useEffect, useState } from "react";

export const Providers = (
  props: PropsWithChildren<{ initialState?: AlchemyClientState }>,
) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 检查必要的环境变量是否存在
    if (!process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
      console.error("缺少 NEXT_PUBLIC_ALCHEMY_API_KEY 环境变量");
      setError("配置错误：缺少 Alchemy API 密钥");
    }
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center text-center">
        <div className="card">
          <div className="flex flex-col gap-2 p-4">
            <p className="text-xl font-bold text-red-500">配置错误</p>
            <p>{error}</p>
            <p className="text-sm mt-2">请检查环境变量和配置文件</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AlchemyAccountProvider
        config={config}
        queryClient={queryClient}
        initialState={props.initialState}
      >
        {props.children}
      </AlchemyAccountProvider>
    </QueryClientProvider>
  );
};
