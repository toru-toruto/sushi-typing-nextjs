"use client";

import { useCustomUnityContext } from "@/hooks/useCustomUnityContext";
import { Unity } from "react-unity-webgl";

export default function Home() {
  const { unityProvider } = useCustomUnityContext();

  return (
    <main className="flex min-h-screen flex-col">
      <Unity className="w-full" unityProvider={unityProvider} />
    </main>
  );
}
