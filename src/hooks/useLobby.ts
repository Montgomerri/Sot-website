"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

import {
  getLobbyMessages,
  getLobbyMessageById,
  sendLobbyMessage,
  updateLobbyMessage,
  deleteLobbyMessage,
} from "@/services/lobby/lobby";

import { LobbyMessage } from "@/types/lobby";

export default function useLobby() {
  const [messages, setMessages] = useState<LobbyMessage[]>([]);
  const [currentUserId, setCurrentUserId] =
    useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    let channel:
      | ReturnType<typeof supabase.channel>
      | null = null;

    let cancelled = false;

    async function setupRealtime() {
      // -----------------------------------------
      // CURRENT USER
      // -----------------------------------------

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (cancelled) return;

      if (user) {
        setCurrentUserId(user.id);
      }

      // -----------------------------------------
      // SESSION
      // -----------------------------------------

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (cancelled) return;

      if (!session) {
        console.error("No authenticated session found.");
        return;
      }

      // -----------------------------------------
      // REALTIME AUTH
      // -----------------------------------------

      supabase.realtime.setAuth(
        session.access_token
      );

      // -----------------------------------------
      // INSERT HANDLER
      // -----------------------------------------

      async function handleInsert(
        payload: {
          new: Record<string, unknown>;
        }
      ) {
        const messageId =
          payload.new.id as string;

        try {
          /*
           * Wait briefly for the INSERT to be
           * fully visible to the normal Supabase
           * query before hydrating it.
           */
          await new Promise<void>((resolve) =>
            setTimeout(resolve, 150)
          );

          const completeMessage =
            await getLobbyMessageById(
              messageId
            );

          if (
            cancelled ||
            !completeMessage
          ) {
            return;
          }

          setMessages((current) => {
            const index = current.findIndex(
              (message) =>
                message.id ===
                completeMessage.id
            );

            // Already exists.
            if (index !== -1) {
              const updated = [...current];

              updated[index] =
                completeMessage;

              return updated;
            }

            // New message.
            return [
              ...current,
              completeMessage,
            ];
          });
        } catch (error) {
          console.error(
            "Failed to process new lobby message:",
            error
          );
        }
      }

      // -----------------------------------------
      // UPDATE HANDLER
      // -----------------------------------------

      async function handleUpdate(
        payload: {
          new: Record<string, unknown>;
        }
      ) {
        const messageId =
          payload.new.id as string;

        try {
          const completeMessage =
            await getLobbyMessageById(
              messageId
            );

          if (
            cancelled ||
            !completeMessage
          ) {
            return;
          }

          setMessages((current) =>
            current.map((message) =>
              message.id ===
              completeMessage.id
                ? completeMessage
                : message
            )
          );
        } catch (error) {
          console.error(
            "Failed to update lobby message:",
            error
          );
        }
      }

      // -----------------------------------------
      // DELETE HANDLER
      // -----------------------------------------

      function handleDelete(
        payload: {
          old: Record<string, unknown>;
        }
      ) {
        const deletedId =
          payload.old.id as string;

        setMessages((current) =>
          current.filter(
            (message) =>
              message.id !== deletedId
          )
        );
      }

      // -----------------------------------------
      // CREATE REALTIME CHANNEL
      // -----------------------------------------

      channel = supabase
        .channel("lobby-room")

        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "lobby_messages",
          },
          handleInsert
        )

        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "lobby_messages",
          },
          handleUpdate
        )

        .on(
          "postgres_changes",
          {
            event: "DELETE",
            schema: "public",
            table: "lobby_messages",
          },
          handleDelete
        );

      // -----------------------------------------
      // SUBSCRIBE FIRST
      // -----------------------------------------

      await new Promise<void>((resolve) => {
        if (!channel) {
          resolve();
          return;
        }

        channel.subscribe((status, error) => {
          console.log(
            "Realtime subscription status:",
            status
          );

          if (error) {
            console.error(
              "Realtime subscription error:",
              error
            );
          }

          if (
            status === "SUBSCRIBED" ||
            status === "CHANNEL_ERROR" ||
            status === "TIMED_OUT" ||
            status === "CLOSED"
          ) {
            resolve();
          }
        });
      });

      if (cancelled) return;

      // -----------------------------------------
      // LOAD EXISTING MESSAGES
      // -----------------------------------------

      const data =
        await getLobbyMessages();

      if (cancelled) return;

      /*
       * Replace the current state with the
       * authoritative database state.
       *
       * Because realtime is already subscribed,
       * new messages created after this point
       * will continue arriving through realtime.
       */
      setMessages(data);
    }

    setupRealtime();

    // -----------------------------------------
    // CLEANUP
    // -----------------------------------------

    return () => {
      cancelled = true;

      if (channel) {
        supabase.removeChannel(channel);
        channel = null;
      }
    };
  }, []);

  // -----------------------------------------
  // SEND MESSAGE
  // -----------------------------------------

  async function sendMessage(
    content: string,
    imageUrl?: string | null,
    replyToId?: string | null
  ) {
    await sendLobbyMessage(
      content,
      imageUrl,
      replyToId
    );
  }

  // -----------------------------------------
  // EDIT MESSAGE
  // -----------------------------------------

  async function editMessage(
    id: string,
    content: string
  ) {
    await updateLobbyMessage(
      id,
      content
    );
  }

  // -----------------------------------------
  // DELETE MESSAGE
  // -----------------------------------------

  async function deleteMessage(
    id: string
  ) {
    await deleteLobbyMessage(id);
  }

  return {
    messages,
    currentUserId,
    sendMessage,
    editMessage,
    deleteMessage,
  };
}