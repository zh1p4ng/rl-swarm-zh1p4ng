'use client';

import { useEffect, useState } from "react";
import { config, queryClient } from "@/config";
import { cookieToInitialState, AlchemyClientState } from "@account-kit/core";
import { AlchemyAccountProvider } from "@account-kit/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

export const Providers = (props: PropsWithChildren) => {
  const [initialState, setInitialState] = useState<AlchemyClientState | null>(null);

  useEffect(() => {
    const state = cookieToInitialState(config, document.cookie);
    setInitialState(state);
  }, []);

  if (!initialState) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <AlchemyAccountProvider
        config={config}
        queryClient={queryClient}
        initialState={initialState}
      >
        {props.children}
      </AlchemyAccountProvider>
    </QueryClientProvider>
  );
};
