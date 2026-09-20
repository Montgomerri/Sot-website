"use client";

import { useState } from "react";

export default function MessageComposer() {

  const [message, setMessage] =
    useState("");


  function sendMessage() {

    if (!message.trim())
      return;


    console.log(message);

    setMessage("");

  }


  return (
    <div
      className="
        border-t
        border-gray-200
        bg-white
        p-4
      "
    >

      <div
        className="
          flex
          items-center
          gap-3
          rounded-xl
          border
          border-gray-200
          px-4
          py-2
          focus-within:border-blue-500
        "
      >

        <input
          value={message}
          onChange={(e)=>
            setMessage(e.target.value)
          }
          placeholder="Message #general"
          className="
            flex-1
            bg-transparent
            outline-none
            text-sm
          "
        />


        <button
          onClick={sendMessage}
          className="
            rounded-lg
            bg-blue-500
            px-4
            py-2
            text-sm
            font-medium
            text-white
            hover:bg-blue-600
          "
        >
          Send
        </button>


      </div>

    </div>
  );
}