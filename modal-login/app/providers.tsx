"use client";
import { config, queryClient } from "@/config";
import { AlchemyClientState } from "@account-kit/core";
import { AlchemyAccountProvider, Hydrate } from "@account-kit/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

export const Providers = (
  props: PropsWithChildren<{ initialState?: AlchemyClientState }>,
) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AlchemyAccountProvider
        config={config}
        queryClient={queryClient}
        initialState={props.initialState}
      >
        <Hydrate state={props.initialState}>
          {props.children}
        </Hydrate>
      </AlchemyAccountProvider>
    </QueryClientProvider>
  );
};
