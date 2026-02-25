"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useCallback, useEffect } from "react";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
};

export function RichTextEditor({ value, onChange, placeholder, className = "" }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Placeholder.configure({ placeholder: placeholder ?? "Start writing…" }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm dark:prose-invert max-w-none min-h-[120px] focus:outline-none px-3 py-2 rounded-lg border border-border bg-background text-foreground",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  const handleUpdate = useCallback(
    ({ editor }: { editor: { getHTML: () => string } }) => {
      onChange(editor.getHTML());
    },
    [onChange]
  );

  useEffect(() => {
    if (editor) {
      editor.on("update", handleUpdate);
      return () => {
        editor.off("update", handleUpdate);
      };
    }
  }, [editor, handleUpdate]);

  if (!editor) return null;

  return (
    <div
      className={`rounded-lg border border-border bg-background ${className}`}
      onClick={() => editor.commands.focus()}
    >
      <div className="flex flex-wrap gap-1 border-b border-border p-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded px-2 py-1 text-sm ${editor.isActive("bold") ? "bg-accent/20 text-accent" : "text-muted hover:bg-foreground/5"}`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded px-2 py-1 text-sm ${editor.isActive("bulletList") ? "bg-accent/20 text-accent" : "text-muted hover:bg-foreground/5"}`}
        >
          Bullets
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rounded px-2 py-1 text-sm ${editor.isActive("orderedList") ? "bg-accent/20 text-accent" : "text-muted hover:bg-foreground/5"}`}
        >
          Numbered
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
