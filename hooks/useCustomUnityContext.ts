import { useCallback } from "react";
import { useUnityContext } from "react-unity-webgl";

type MessageDestination = "ScreenshotMessageReceiver";

type UnityMessageJson = {
  messageType: UnityMessageType;
  messageBody: string;
};

const UnityMessageType = {
  SimpleMessage: 0,
  SceneIsLoaded: 1,
  ScreenshotGenerated: 2,
} as const;
type UnityMessageType =
  (typeof UnityMessageType)[keyof typeof UnityMessageType];

export const useCustomUnityContext = () => {
  const buildFilePath = "/unity/build/webgl";
  const {
    unityProvider,
    isLoaded,
    addEventListener,
    removeEventListener,
    sendMessage,
  } = useUnityContext({
    loaderUrl: `${buildFilePath}.loader.js`,
    dataUrl: `${buildFilePath}.data`,
    frameworkUrl: `${buildFilePath}.framework.js`,
    codeUrl: `${buildFilePath}.wasm`,
  });

  const handleSimpleMessage = (msgObj: UnityMessageJson) => {
    console.log(
      `Unity: SimpleMessage, ${msgObj.messageType}, ${msgObj.messageBody}`
    );
  };

  const postMessageToUnity = useCallback(
    (gameObject: MessageDestination, message: string) => {
      if (!isLoaded) return;
      sendMessage(gameObject, "OnMessageReceived", message);
    },
    [isLoaded, sendMessage]
  );

  return {
    unityProvider,
    isLoaded,
    addEventListener,
    removeEventListener,
    postMessageToUnity,
    handleSimpleMessage,
  };
};
