"use client";

import {
  Bold,
  Italic,
  Code,
  List,
  Quote,
} from "lucide-react";


export default function EditorToolbar({
  editor,
}: {
  editor: any;
}) {

  return (
    <div className="flex items-center gap-2 border-b bg-gray-50 p-3">


      <button
        onClick={() =>
          editor.chain().focus().toggleBold().run()
        }
        className="p-2 rounded hover:bg-gray-200"
      >
        <Bold size={18}/>
      </button>


      <button
        onClick={() =>
          editor.chain().focus().toggleItalic().run()
        }
        className="p-2 rounded hover:bg-gray-200"
      >
        <Italic size={18}/>
      </button>


      <button
        onClick={() =>
          editor.chain().focus().toggleCode().run()
        }
        className="p-2 rounded hover:bg-gray-200"
      >
        <Code size={18}/>
      </button>


      <button
        onClick={() =>
          editor.chain().focus().toggleBulletList().run()
        }
        className="p-2 rounded hover:bg-gray-200"
      >
        <List size={18}/>
      </button>


      <button
        onClick={() =>
          editor.chain().focus().toggleBlockquote().run()
        }
        className="p-2 rounded hover:bg-gray-200"
      >
        <Quote size={18}/>
      </button>


    </div>
  );
}