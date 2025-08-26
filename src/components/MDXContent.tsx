"use client";
import { useMDXComponent } from "next-contentlayer/hooks";
import React from "react";

const components = {
  pre: (props: any) => <pre className="rounded-2xl border border-border bg-black/40 p-4 overflow-x-auto" {...props} />,
  code: (props: any) => <code className="font-mono text-sm" {...props} />,
  a: (props: any) => <a className="underline decoration-dotted hover:decoration-solid" {...props} />,
};

export default function MDXContent({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
