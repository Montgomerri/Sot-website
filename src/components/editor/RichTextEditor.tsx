"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";

import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";

import EditorToolbar from "./EditorToolbar";

const lowlight = createLowlight();

lowlight.register("javascript", javascript);
lowlight.register("typescript", typescript);
lowlight.register("python", python);


export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (content: string) => void;
}) {

  const editor = useEditor({

    extensions: [

      StarterKit.configure({
        codeBlock: false,
      }),

      CodeBlockLowlight.configure({
        lowlight,
      }),

      Placeholder.configure({
        placeholder:
          "Explain your problem. Include code, errors, and details...",
      }),

    ],

    content: value,

    editorProps: {
      attributes: {
        class:
          "min-h-[300px] outline-none prose prose-sm max-w-none p-5",
      },
    },


    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },

  });


  if (!editor) {
    return null;
  }


  return (
    <div className="rounded-xl border bg-white overflow-hidden">

      <EditorToolbar editor={editor} />


      <EditorContent editor={editor} />

    </div>
  );
}