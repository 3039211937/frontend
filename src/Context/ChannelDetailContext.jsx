import { createContext } from "react";

/* =========================
   CONTEXTO DEL CANAL
========================= */

export const ChannelDetailContext = createContext({
  isChannelDetailLoading: false,
  channelMessages: [],
  onCreateNewMessage: () => {},
  reloadMessages: () => {},
});
