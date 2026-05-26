"use client";

import React, { useRef, useState, useEffect } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import {
  Copy,
  Trash2,
  GripVertical,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import type { EditorNode } from "@/types/editor";
import { useEditorStore } from "@/store/editorStore";
import { cn } from "@/lib/utils";

interface CanvasNodeProps {
  node: EditorNode;
  isRoot?: boolean;
  index?: number;
  isDragActive?: boolean;
}

function BesideZone({ nodeId, side }: { nodeId: string; side: "left" | "right" }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `beside-${side}-${nodeId}`,
    data: { type: "BESIDE", nodeId, side },
  });
  return (
    <div
      ref={setNodeRef}
      className={cn(
        "absolute inset-y-0 w-1/3 z-20 transition-all duration-150",
        side === "left" ? "left-0" : "right-0",
        isOver
          ? side === "left"
            ? "bg-gradient-to-r from-indigo-400/20 dark:from-[#CEFF00]/15 to-transparent"
            : "bg-gradient-to-l from-indigo-400/20 dark:from-[#CEFF00]/15 to-transparent"
          : "bg-transparent",
      )}
    >
      {isOver && (
        <div
          className={cn(
            "absolute inset-y-2 w-0.5 rounded-full bg-indigo-500 dark:bg-[#CEFF00]",
            side === "left" ? "left-1" : "right-1",
          )}
        />
      )}
    </div>
  );
}

const VOID_TAGS = new Set(["input", "textarea", "img", "br", "hr", "meta", "link"]);

export default function CanvasNode({
  node,
  isRoot = false,
  index,
  isDragActive = false,
}: CanvasNodeProps) {
  const {
    selectedId,
    hoveredId,
    selectNode,
    hoverNode,
    removeNode,
    duplicateNode,
    updateNode,
    showOutlines,
    nodes,
  } = useEditorStore();

  const isSelected = selectedId === node.id;
  const isHovered = hoveredId === node.id && !isSelected;
  const [isEditing, setIsEditing] = useState(false);
  const contentRef = useRef<HTMLElement>(null);

  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    isDragging,
  } = useDraggable({
    id: `node-${node.id}`,
    data: { type: "NODE", nodeId: node.id },
  });

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: `drop-${node.id}`,
    data: { type: "CANVAS_DROP", nodeId: node.id },
  });

  const Tag = node.tag as React.ElementType;
  const isVoid = VOID_TAGS.has(node.tag);
  const hasChildren = !isVoid && node.children !== undefined;
  // Only leaf nodes with text content are editable
  const canEdit = !isVoid && !hasChildren && node.content !== undefined;

  const rootIdx = isRoot ? index : undefined;
  const canMoveUp = isRoot && rootIdx !== undefined && rootIdx > 0;
  const canMoveDown = isRoot && rootIdx !== undefined && rootIdx < nodes.length - 1;

  const outlineClass = isDragging
    ? ""
    : isEditing
      ? "outline outline-2 outline-indigo-400 dark:outline-[#CEFF00]/60"
      : isOver
        ? "outline outline-2 outline-green-500"
        : isSelected
          ? "outline outline-2 outline-indigo-600 dark:outline-[#CEFF00]"
          : isHovered
            ? "outline outline-1 outline-indigo-200 dark:outline-[#CEFF00]/30"
            : showOutlines
              ? "outline outline-1 outline-black/6"
              : "";

  // Focus + place cursor at end when editing starts
  useEffect(() => {
    if (!isEditing || !contentRef.current) return;
    const el = contentRef.current;
    el.focus();
    try {
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(el);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    } catch {
      // ignore selection errors on void-like elements
    }
  }, [isEditing]);

  const commitEdit = () => {
    if (!isEditing || !contentRef.current) return;
    const content = contentRef.current.textContent ?? "";
    updateNode(node.id, { content });
    setIsEditing(false);
  };

  const nodeProps: Record<string, unknown> = {
    className: cn(
      node.className,
      "relative focus:outline-none",
      isDragging && "opacity-30",
      outlineClass,
      isEditing && "select-text cursor-text",
    ),
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isEditing) selectNode(node.id);
    },
    onMouseEnter: (e: React.MouseEvent) => {
      e.stopPropagation();
      hoverNode(node.id);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      e.stopPropagation();
      hoverNode(null);
    },
    onDoubleClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      if (canEdit) {
        e.preventDefault();
        selectNode(node.id);
        setIsEditing(true);
      }
    },
    onBlur: () => {
      if (isEditing) commitEdit();
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Escape") commitEdit();
      // Prevent Enter from adding a block element inside inline nodes
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        commitEdit();
      }
    },
    ref: (el: HTMLElement | null) => {
      setDragRef(el);
      if (hasChildren) setDropRef(el);
      (contentRef as React.MutableRefObject<HTMLElement | null>).current = el;
    },
  };

  const childContent = hasChildren ? (
    <>
      {node.children?.map((child, i) => (
        <CanvasNode
          key={child.id}
          node={child}
          index={i}
          isDragActive={isDragActive}
        />
      ))}
      {isOver && (!node.children || node.children.length === 0) && (
        <div className="border-2 border-dashed border-green-400/50 rounded-lg m-2 p-4 text-center text-green-600/70 text-xs">
          Drop here
        </div>
      )}
    </>
  ) : (
    node.content
  );

  return (
    <div className={cn("relative group/node", isDragging && "z-50")}>
      {/* Side drop zones — only on root nodes while dragging */}
      {isRoot && isDragActive && !isDragging && (
        <>
          <BesideZone nodeId={node.id} side="left" />
          <BesideZone nodeId={node.id} side="right" />
        </>
      )}

      {/* Floating toolbar */}
      {isSelected && !isEditing && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-8 left-0 z-50 flex items-center rounded-md shadow-lg overflow-hidden bg-indigo-600 dark:bg-[#CEFF00]"
        >
          {isRoot && (
            <>
              <button
                disabled={!canMoveUp}
                className="p-1.5 disabled:opacity-30 transition-opacity text-white dark:text-black"
                onClick={(e) => {
                  e.stopPropagation();
                  if (canMoveUp && rootIdx !== undefined)
                    useEditorStore.getState().reorderNodes(node.id, nodes[rootIdx - 1].id);
                }}
              >
                <ChevronUp className="w-3 h-3" />
              </button>
              <button
                disabled={!canMoveDown}
                className="p-1.5 disabled:opacity-30 transition-opacity text-white dark:text-black"
                onClick={(e) => {
                  e.stopPropagation();
                  if (canMoveDown && rootIdx !== undefined)
                    useEditorStore.getState().reorderNodes(node.id, nodes[rootIdx + 1].id);
                }}
              >
                <ChevronDown className="w-3 h-3" />
              </button>
            </>
          )}
          <div
            className="p-1.5 cursor-grab active:cursor-grabbing text-white dark:text-black"
            {...listeners}
            {...attributes}
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical className="w-3 h-3" />
          </div>
          <button
            className="p-1.5 transition-opacity hover:opacity-70 text-white dark:text-black"
            onClick={(e) => {
              e.stopPropagation();
              duplicateNode(node.id);
            }}
            title="Duplicate"
          >
            <Copy className="w-3 h-3" />
          </button>
          <button
            className="p-1.5 hover:bg-red-500/20 transition-colors text-white dark:text-black"
            onClick={(e) => {
              e.stopPropagation();
              removeNode(node.id);
            }}
            title="Delete"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </motion.div>
      )}

      {/* Tag label badge */}
      {(isHovered || isSelected) && !isDragging && (
        <div className="absolute -top-5 left-0 text-[10px] px-1.5 py-0.5 rounded-sm z-40 pointer-events-none font-mono leading-tight bg-indigo-600 dark:bg-[#CEFF00] text-white dark:text-black">
          {node.tag}
        </div>
      )}

      {/* ── Render ── */}
      {isVoid ? (
        <Tag {...(nodeProps as React.HTMLAttributes<HTMLElement>)} />
      ) : isEditing && canEdit ? (
        /* contentEditable editing mode — dangerouslySetInnerHTML sets initial
           content once; React won't overwrite user edits while isEditing is true */
        <Tag
          {...(nodeProps as React.HTMLAttributes<HTMLElement>)}
          contentEditable
          suppressContentEditableWarning
          dangerouslySetInnerHTML={{ __html: node.content ?? "" }}
        />
      ) : (
        <Tag {...(nodeProps as React.HTMLAttributes<HTMLElement>)}>
          {childContent}
        </Tag>
      )}
    </div>
  );
}
