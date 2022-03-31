import React from "react";
import produce from "immer";

export interface ChatMessage {
  content: string;
  senderId: string;
}

export interface IChatContext {
  pushMessage(newMessage: ChatMessage): void;
  messages: ChatMessage[];
}

const ChatContext = React.createContext<IChatContext>(null!);

export const ChatContextProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = React.useState<IChatContext["messages"]>([]);

  const pushMessage: IChatContext["pushMessage"] = React.useCallback(
    (newMessage: ChatMessage) => {
      setMessages(
        produce((messagesDraft) => {
          messagesDraft.push({ ...newMessage });
        })
      );
    },
    []
  );

  const value: IChatContext = { messages, pushMessage };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  const ctx = React.useContext(ChatContext);

  if (!ctx) {
    throw new Error(
      "You need to call useChatContext within an ChatContextProvider"
    );
  }

  return ctx;
};

export default useChatContext;
