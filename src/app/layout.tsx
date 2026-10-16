// src/app/layout.tsx

import "./globals.css";
import Script from "next/script";
import { TooltipProvider } from "@/components/ui/tooltip";
import DraggableChatbase from "@/components/chatbase/DraggableChatbase";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider>{children}</TooltipProvider>

        <Script id="chatbase-widget" strategy="afterInteractive">
          {`
            (function () {
              if (
                !window.chatbase ||
                window.chatbase("getState") !== "initialized"
              ) {
                window.chatbase = (...arguments) => {
                  if (!window.chatbase.q) {
                    window.chatbase.q = [];
                  }
                  window.chatbase.q.push(arguments);
                };

                window.chatbase = new Proxy(window.chatbase, {
                  get(target, prop) {
                    if (prop === "q") {
                      return target.q;
                    }
                    return (...args) => target(prop, ...args);
                  }
                });
              }

              const onLoad = function () {
                if (document.getElementById("kb7EDUojle9U7iyXXiloJ")) {
                  return;
                }

                const script = document.createElement("script");
                script.src = "https://www.chatbase.co/embed.min.js";
                script.id = "kb7EDUojle9U7iyXXiloJ";
                script.domain = "www.chatbase.co";
                document.body.appendChild(script);

                const positionChatbase = () => {
                  const launcher = document.querySelector(
                    "#chatbase-bubble-button"
                  );

                  const chatWindow = document.querySelector(
                    "#chatbase-bubble-window"
                  );

                  const notifications = document.querySelector(
                    "#chatbase-message-bubbles"
                  );

                  if (launcher) {
                    launcher.style.setProperty(
                      "left",
                      "16px",
                      "important"
                    );
                    launcher.style.setProperty(
                      "right",
                      "auto",
                      "important"
                    );
                    launcher.style.setProperty(
                      "bottom",
                      "16px",
                      "important"
                    );
                  }

                  if (chatWindow) {
                    chatWindow.style.setProperty(
                      "left",
                      "16px",
                      "important"
                    );
                    chatWindow.style.setProperty(
                      "right",
                      "auto",
                      "important"
                    );
                  }

                  if (notifications) {
                    notifications.style.setProperty(
                      "left",
                      "16px",
                      "important"
                    );
                    notifications.style.setProperty(
                      "right",
                      "auto",
                      "important"
                    );
                  }
                };

                window.setTimeout(positionChatbase, 1000);
                window.setTimeout(positionChatbase, 2500);
                window.setTimeout(positionChatbase, 5000);
              };

              if (document.readyState === "complete") {
                onLoad();
              } else {
                window.addEventListener("load", onLoad, {
                  once: true
                });
              }
            })();
          `}
        </Script>

        <DraggableChatbase />
      </body>
    </html>
  );
}
