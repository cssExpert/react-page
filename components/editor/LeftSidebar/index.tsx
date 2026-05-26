"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDraggable } from "@dnd-kit/core";
import {
  Search,
  ChevronDown,
  ChevronRight,
  Layers,
  Feather,
  Grid3x3,
} from "lucide-react";
import Link from "next/link";
import { COMPONENT_BLOCKS, CATEGORIES } from "@/lib/componentBlocks";
import { useEditorStore } from "@/store/editorStore";
import type { ComponentBlock, EditorNode } from "@/types/editor";
import { cn } from "@/lib/utils";

function DraggableBlock({ block }: { block: ComponentBlock }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `block-${block.id}`,
    data: { type: "BLOCK", blockId: block.id, template: block.template },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "group relative flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-grab active:cursor-grabbing select-none",
        "border border-transparent transition-all duration-150",
        "hover:bg-indigo-50 hover:border-indigo-200 dark:hover:bg-[#CEFF00]/10 dark:hover:border-[#CEFF00]/25",
        isDragging && "opacity-30 scale-95",
      )}
    >
      <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-colors bg-gray-100 dark:bg-[#252525] text-gray-500 dark:text-[#A0A0A0]">
        <Grid3x3 className="w-3.5 h-3.5" />
      </div>
      <span className="text-sm font-medium truncate text-gray-600 dark:text-[#A0A0A0]">
        {block.label}
      </span>
    </div>
  );
}

function CategorySection({
  category,
  blocks,
}: {
  category: string;
  blocks: ComponentBlock[];
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-0.5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors
          text-gray-500 dark:text-[#7A7A7A] hover:text-gray-600 dark:hover:text-[#C0C0C0]"
      >
        <span className="text-[10px] font-semibold uppercase tracking-widest">
          {category}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] opacity-50">{blocks.length}</span>
          {open ? (
            <ChevronDown className="w-3 h-3" />
          ) : (
            <ChevronRight className="w-3 h-3" />
          )}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.14 }}
            className="overflow-hidden"
          >
            <div className="pb-1">
              {blocks.map((b) => (
                <DraggableBlock key={b.id} block={b} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Brand() {
  return (
    <div className="w-full p-3">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-9 h-9 rounded-lg bg-indigo-600 dark:bg-[#CEFF00] flex items-center justify-center">
          <Feather className="w-6 h-6 text-white dark:text-black" />
        </div>
        <span className="font-bold text-md md:text-xl text-gray-900 dark:text-[#E8E8E8]">
          Feather
        </span>
      </Link>
    </div>
  );
}

export default function LeftSidebar() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"blocks" | "layers">("blocks");
  const [mounted, setMounted] = useState(false);
  const { selectedId } = useEditorStore();

  // Delay rendering until client hydration is finished
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedId) {
      // Delays execution to the next tick, safely clearing the cascading render phase
      const timer = setTimeout(() => {
        setActiveTab("layers");
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [selectedId]);

  const filtered = search.trim()
    ? COMPONENT_BLOCKS.filter(
        (b) =>
          b.label.toLowerCase().includes(search.toLowerCase()) ||
          b.category.toLowerCase().includes(search.toLowerCase()),
      )
    : null;

  return (
    <aside className="w-60 flex flex-col h-full overflow-hidden border-r bg-white dark:bg-[#1D1D1D] border-gray-200 dark:border-[#2A2A2A]">
      <Brand />

      {/* Tab bar + Search */}
      <div className="shrink-0 p-2 border-b border-gray-200 dark:border-[#2A2A2A]">
        {/* Tabs */}
        <div className="flex gap-1 mb-2 rounded-lg p-0.5 bg-gray-100 dark:bg-[#252525]">
          {(["blocks", "layers"] as const).map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all",
                  active
                    ? "bg-indigo-600 dark:bg-[#CEFF00] text-white dark:text-black"
                    : "text-gray-500 dark:text-[#7A7A7A]",
                )}
              >
                {tab === "blocks" ? (
                  <Grid3x3 className="w-3.5 h-3.5" />
                ) : (
                  <Layers className="w-3.5 h-3.5" />
                )}
                <span className="capitalize">{tab}</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-gray-500 dark:text-[#7A7A7A]" />
          <input
            type="text"
            placeholder={
              activeTab === "blocks" ? "Search blocks…" : "Search layers…"
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-md text-xs transition-colors
              bg-gray-100 dark:bg-[#252525]
              border border-gray-200 dark:border-[#383838]
              text-gray-900 dark:text-[#E8E8E8]
              focus:outline-none focus:border-indigo-500 dark:focus:border-[#CEFF00]"
          />
        </div>
      </div>

      {/* Content Side panel with hydration check */}
      <div className="flex-1 overflow-y-auto py-1.5 custom-scrollbar">
        {!mounted ? (
          <div className="w-full h-20 animate-pulse bg-gray-50 dark:bg-neutral-900/50" />
        ) : activeTab === "blocks" ? (
          filtered ? (
            <div className="px-1">
              {filtered.length === 0 ? (
                <p className="text-xs text-center py-10 text-gray-500 dark:text-[#7A7A7A]">
                  No blocks found
                </p>
              ) : (
                filtered.map((b) => <DraggableBlock key={b.id} block={b} />)
              )}
            </div>
          ) : (
            <div className="px-1">
              {CATEGORIES.map((cat) => (
                <CategorySection
                  key={cat}
                  category={cat}
                  blocks={COMPONENT_BLOCKS.filter((b) => b.category === cat)}
                />
              ))}
            </div>
          )
        ) : (
          <LayersPanel />
        )}
      </div>
    </aside>
  );
}

function LayersPanel() {
  const { nodes, selectedId, selectNode } = useEditorStore();

  if (nodes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-14 px-4 text-center h-full">
        <Layers className="w-8 h-8 mb-2 text-gray-500 dark:text-[#7A7A7A]" />
        <p className="text-xs text-gray-500 dark:text-[#7A7A7A]">
          No elements on canvas yet
        </p>
      </div>
    );
  }

  return (
    <div className="px-2 py-1">
      {nodes.map((node: EditorNode) => (
        <LayerItem
          key={node.id}
          node={node}
          depth={0}
          selectedId={selectedId}
          onSelect={selectNode}
        />
      ))}
    </div>
  );
}

function LayerItem({
  node,
  depth,
  selectedId,
  onSelect,
}: {
  node: EditorNode;
  depth: number;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const [open, setOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedId === node.id;

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-1 py-1 px-2 rounded-md cursor-pointer text-xs transition-colors",
          isSelected
            ? "bg-indigo-50 dark:bg-[#CEFF00]/10 text-indigo-600 dark:text-[#CEFF00]"
            : "text-gray-600 dark:text-[#A0A0A0] hover:bg-gray-100 dark:hover:bg-[#252525]",
        )}
        style={{ paddingLeft: `${8 + depth * 12}px` }}
        onClick={() => onSelect(node.id)}
      >
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            className="text-gray-500 dark:text-[#7A7A7A]"
          >
            {open ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
          </button>
        ) : (
          <span className="w-3 h-3 shrink-0" />
        )}
        <span className="font-mono text-gray-500 dark:text-[#7A7A7A]">
          &lt;{node.tag}&gt;
        </span>
        <span className="truncate ml-1">{node.type}</span>
      </div>
      {hasChildren &&
        open &&
        node.children!.map((child) => (
          <LayerItem
            key={child.id}
            node={child}
            depth={depth + 1}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        ))}
    </div>
  );
}
