"use client";

import { useEffect, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { motion } from "framer-motion";

import dynamic from "next/dynamic";

const LeftSidebar = dynamic(() => import("./LeftSidebar"), {
  ssr: false,
  loading: () => (
    <div className="w-60 h-full animate-pulse bg-gray-50 dark:bg-neutral-900/50" />
  ),
});
const BottomToolbar = dynamic(() => import("./BottomToolbar"), {
  ssr: false,
});

// import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useEditorStore } from "@/store/editorStore";
import { COMPONENT_BLOCKS } from "@/lib/componentBlocks";
import Canvas from "./Canvas";
import RightSidebar from "./RightSidebar";
import ThemeSwitcher from "./ThemeSwitcher";
import { nanoid } from "nanoid";
import type { EditorNode } from "@/types/editor";

function deepCloneWithNewIds(node: EditorNode): EditorNode {
  return {
    ...node,
    id: nanoid(8),
    children: node.children?.map(deepCloneWithNewIds),
  };
}

function EditorHeader() {
  return (
    <header
      className="shrink-0 h-auto flex items-center justify-between px-8 pt-4 z-40
      bg-none
      dark:bg-[#131313]"
    >
      {/* Page name */}
      {/* <input
        defaultValue="Untitled Page"
        className="text-sm font-medium bg-transparent border-none outline-none rounded px-2 py-0.5 text-center w-40
          text-gray-500 hover:bg-gray-50 focus:bg-gray-50
          dark:text-[#A0A0A0] dark:hover:bg-[#252525] dark:focus:bg-[#252525]
          transition-colors"
      /> */}

      {/* Right actions */}
      <div className="flex flex-1 items-center justify-between gap-3">
        <ThemeSwitcher />
        <div className="inline-flex items-center gap-2">
          <a
            href="#"
            className="flex items-center gap-1.5 text-sm font-medium transition-colors
            text-gray-500 hover:text-gray-900
            dark:text-[#A0A0A0] dark:hover:text-[#E8E8E8]"
          >
            Preview in new tab
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            className="text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors
          bg-indigo-600 hover:bg-indigo-700 text-white
          dark:bg-[#CEFF00] dark:hover:bg-[#D4FF1A] dark:text-black"
          >
            Publish
          </button>
        </div>
      </div>
    </header>
  );
}

export default function EditorLayout() {
  const { addNode, reorderNodes, selectNode, wrapInRow } = useEditorStore();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const {
        selectedId,
        removeNode,
        duplicateNode,
        copyNode,
        pasteNode,
        undo,
        redo,
      } = useEditorStore.getState();
      const t = e.target as HTMLElement;
      if (
        t.tagName === "INPUT" ||
        t.tagName === "TEXTAREA" ||
        t.contentEditable === "true"
      )
        return;

      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        e.preventDefault();
        removeNode(selectedId);
      } else if (e.key === "Escape") {
        selectNode(null);
      } else if (e.key === "d" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (selectedId) duplicateNode(selectedId);
      } else if (e.key === "c" && (e.metaKey || e.ctrlKey) && selectedId) {
        copyNode(selectedId);
      } else if (e.key === "v" && (e.metaKey || e.ctrlKey)) {
        pasteNode();
      } else if (e.key === "z" && (e.metaKey || e.ctrlKey) && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (
        (e.key === "z" && (e.metaKey || e.ctrlKey) && e.shiftKey) ||
        (e.key === "y" && (e.metaKey || e.ctrlKey))
      ) {
        e.preventDefault();
        redo();
      }
    },
    [selectNode],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeData = active.data.current;
    const overData = over.data.current;
    if (!activeData) return;

    if (activeData.type === "BLOCK") {
      const block = COMPONENT_BLOCKS.find((b) => `block-${b.id}` === active.id);
      if (!block) return;
      const newNode = deepCloneWithNewIds(block.template);

      if (overData?.type === "INSERT_ZONE") {
        addNode(newNode, undefined, overData.index as number);
      } else if (overData?.type === "BESIDE") {
        wrapInRow(
          overData.nodeId as string,
          newNode,
          (overData.side as string) === "left" ? "before" : "after",
        );
      } else if (over.id === "canvas-root") {
        addNode(newNode);
      } else if (overData?.type === "CANVAS_DROP") {
        addNode(newNode, overData.nodeId as string);
      } else {
        addNode(newNode);
      }
      return;
    }

    if (activeData.type === "NODE") {
      const activeId = activeData.nodeId as string;
      if (typeof over.id === "string" && over.id.startsWith("node-")) {
        const overId = over.id.replace("node-", "");
        if (activeId !== overId) reorderNodes(activeId, overId);
      }
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-screen overflow-hidden bg-slate-100 dark:bg-[#131313]">
        <div className="flex flex-1 min-h-0 overflow-hidden select-none">
          <LeftSidebar />
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <EditorHeader />
            <Canvas />
            <BottomToolbar />
          </div>
          <RightSidebar />
        </div>
      </div>

      <DragOverlay>
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="rounded-lg px-3 py-2 text-xs font-semibold shadow-2xl pointer-events-none
            bg-indigo-600 text-white
            dark:bg-[#CEFF00] dark:text-black"
        >
          Drop to add
        </motion.div>
      </DragOverlay>
    </DndContext>
  );
}
