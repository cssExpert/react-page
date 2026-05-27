"use client";

import { useState, useEffect } from "react";
import { X, Search, Loader2 } from "lucide-react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { COMPONENT_BLOCKS, CATEGORIES } from "@/lib/componentBlocks";
import type { ComponentBlock } from "@/types/editor";
import { cn } from "@/lib/utils";

// ─── Mini block preview ───────────────────────────────────────────────────────

function BlockPreview({ category }: { category: string }) {
  switch (category) {
    case "Hero":
      return (
        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-indigo-900 flex flex-col items-center justify-center gap-1.5 p-3">
          <div className="h-2 w-1/2 rounded bg-white/60" />
          <div className="h-1.5 w-2/3 rounded bg-white/35" />
          <div className="h-1 w-5/6 rounded bg-white/20" />
          <div className="h-4 w-1/3 rounded-full bg-white/80 mt-1" />
        </div>
      );
    case "Navbar":
      return (
        <div className="w-full h-full bg-white flex items-center px-3 justify-between border-b border-gray-100">
          <div className="h-2 w-1/5 rounded bg-gray-900" />
          <div className="flex gap-1.5 items-center">
            <div className="h-1 w-5 rounded bg-gray-300" />
            <div className="h-1 w-5 rounded bg-gray-300" />
            <div className="h-1 w-5 rounded bg-gray-300" />
            <div className="h-4 w-10 rounded-md bg-blue-600" />
          </div>
        </div>
      );
    case "Features":
      return (
        <div className="w-full h-full bg-gray-50 flex gap-1.5 p-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex-1 rounded-lg bg-white border border-gray-100 flex flex-col gap-1 p-1.5"
            >
              <div className="w-4 h-4 rounded-md bg-indigo-100" />
              <div className="h-1.5 w-3/4 rounded bg-gray-200" />
              <div className="h-1 w-full rounded bg-gray-100" />
              <div className="h-1 w-5/6 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      );
    case "Pricing":
      return (
        <div className="w-full h-full bg-white flex gap-1.5 p-2 items-stretch">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "flex-1 rounded-lg p-1.5 flex flex-col gap-1",
                i === 1 ? "bg-indigo-600" : "bg-gray-50 border border-gray-100",
              )}
            >
              <div
                className={cn(
                  "h-1.5 w-2/3 rounded",
                  i === 1 ? "bg-white/60" : "bg-gray-300",
                )}
              />
              <div
                className={cn(
                  "h-2.5 w-1/2 rounded",
                  i === 1 ? "bg-white/80" : "bg-gray-200",
                )}
              />
              <div className="flex flex-col gap-0.5 mt-0.5">
                {[0, 1, 2].map((j) => (
                  <div
                    key={j}
                    className={cn(
                      "h-1 rounded",
                      i === 1 ? "bg-white/30" : "bg-gray-100",
                    )}
                    style={{ width: `${75 - j * 15}%` }}
                  />
                ))}
              </div>
              <div
                className={cn(
                  "h-4 rounded-md mt-auto",
                  i === 1 ? "bg-white" : "bg-indigo-600",
                )}
              />
            </div>
          ))}
        </div>
      );
    case "Testimonials":
      return (
        <div className="w-full h-full bg-slate-50 flex gap-1.5 p-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex-1 rounded-lg bg-white border border-gray-100 p-1.5 flex flex-col gap-1"
            >
              <div className="h-1 w-full rounded bg-gray-100" />
              <div className="h-1 w-3/4 rounded bg-gray-100" />
              <div className="h-1 w-5/6 rounded bg-gray-100" />
              <div className="flex items-center gap-1 mt-auto pt-1">
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-indigo-300 to-violet-400" />
                <div className="h-1 w-1/2 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      );
    case "FAQ":
      return (
        <div className="w-full h-full bg-white flex flex-col gap-1 p-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded bg-gray-50 border border-gray-100 px-2 py-1 flex items-center justify-between gap-2"
            >
              <div
                className="h-1 rounded bg-gray-200 flex-1"
                style={{ width: `${80 - i * 10}%` }}
              />
              <span className="text-gray-300 text-[10px] font-light leading-none">
                +
              </span>
            </div>
          ))}
        </div>
      );
    case "Team":
      return (
        <div className="w-full h-full bg-white flex gap-2 items-center justify-center p-2">
          {[
            "from-blue-300 to-purple-400",
            "from-rose-300 to-pink-400",
            "from-emerald-300 to-teal-400",
            "from-amber-300 to-orange-400",
          ].map((g, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${g}`} />
              <div className="h-1 w-6 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      );
    case "Footer":
      return (
        <div className="w-full h-full bg-slate-900 flex gap-2 p-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex-1 flex flex-col gap-0.5">
              <div className="h-1.5 w-3/4 rounded bg-white/30 mb-0.5" />
              <div className="h-1 w-full rounded bg-white/12" />
              <div className="h-1 w-2/3 rounded bg-white/12" />
              <div className="h-1 w-3/4 rounded bg-white/12" />
            </div>
          ))}
        </div>
      );
    case "Portfolio":
      return (
        <div className="w-full h-full bg-white flex flex-col gap-1 p-1.5">
          <div className="h-1.5 w-1/4 rounded bg-gray-200 self-center mb-0.5" />
          <div className="flex-1 grid grid-cols-3 gap-0.5">
            {[
              "from-blue-300 to-cyan-300",
              "from-violet-300 to-pink-300",
              "from-orange-300 to-amber-300",
              "from-green-300 to-teal-300",
              "from-rose-300 to-red-300",
              "from-indigo-300 to-blue-300",
            ].map((g, i) => (
              <div key={i} className={`rounded bg-gradient-to-br ${g}`} />
            ))}
          </div>
        </div>
      );
    case "Cards":
      return (
        <div className="w-full h-full bg-gray-50 flex items-center justify-center p-2">
          <div className="w-4/5 rounded-xl bg-white border border-gray-100 overflow-hidden shadow-sm">
            <div className="h-7 bg-gradient-to-r from-blue-400 to-indigo-500" />
            <div className="p-1.5 flex flex-col gap-0.5">
              <div className="h-1.5 w-2/3 rounded bg-gray-200" />
              <div className="h-1 w-full rounded bg-gray-100" />
              <div className="h-1 w-1/3 rounded bg-blue-200" />
            </div>
          </div>
        </div>
      );
    case "Typography":
      return (
        <div className="w-full h-full bg-white flex flex-col justify-center gap-1.5 p-3">
          <div className="h-3.5 w-3/4 rounded bg-gray-900" />
          <div className="h-2 w-1/2 rounded bg-gray-600" />
          <div className="h-1 w-full rounded bg-gray-200" />
          <div className="h-1 w-5/6 rounded bg-gray-200" />
          <div className="h-1 w-4/5 rounded bg-gray-200" />
        </div>
      );
    case "Buttons":
      return (
        <div className="w-full h-full bg-white flex flex-wrap gap-1.5 items-center justify-center p-2">
          <div className="h-5 w-14 rounded-lg bg-blue-600" />
          <div className="h-5 w-14 rounded-lg border-2 border-gray-900" />
          <div className="h-5 w-14 rounded-lg bg-gray-100" />
        </div>
      );
    case "Containers":
      return (
        <div className="w-full h-full bg-gray-50 flex flex-col gap-1 p-2">
          <div className="flex gap-1 h-1/2">
            <div className="flex-1 rounded-md bg-gray-200" />
            <div className="flex-1 rounded-md bg-gray-200" />
          </div>
          <div className="flex gap-1 h-1/2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex-1 rounded-md bg-gray-200" />
            ))}
          </div>
        </div>
      );
    case "Images":
      return (
        <div className="w-full h-full bg-gray-50 flex items-center justify-center p-2">
          <div className="w-4/5 aspect-video rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <div className="w-6 h-6 rounded-md bg-gray-400/40" />
          </div>
        </div>
      );
    case "Forms":
      return (
        <div className="w-full h-full bg-white flex flex-col gap-1.5 p-2.5">
          <div className="h-4 w-full rounded-md border border-gray-200 bg-gray-50" />
          <div className="h-4 w-full rounded-md border border-gray-200 bg-gray-50" />
          <div className="h-7 w-full rounded-md border border-gray-200 bg-gray-50" />
          <div className="h-5 w-full rounded-md bg-blue-600" />
        </div>
      );
    case "Contact":
      return (
        <div className="w-full h-full bg-gray-50 flex flex-col gap-1.5 p-2.5">
          <div className="h-1.5 w-1/3 rounded bg-gray-300 self-center" />
          <div className="flex gap-1">
            <div className="h-4 flex-1 rounded border border-gray-200 bg-white" />
            <div className="h-4 flex-1 rounded border border-gray-200 bg-white" />
          </div>
          <div className="h-4 w-full rounded border border-gray-200 bg-white" />
          <div className="h-5 w-full rounded-md bg-blue-600" />
        </div>
      );
    default:
      return (
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="w-8 h-8 rounded-lg bg-gray-300" />
        </div>
      );
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

interface BlockPickerModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (block: ComponentBlock) => void;
}

export default function BlockPickerModal({
  open,
  onClose,
  onSelect,
}: BlockPickerModalProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // isSearching is derived — true during the debounce window, never stored in state
  const isSearching = search !== debouncedSearch;

  // Only depends on `search`; debouncedSearch is the lagging mirror
  useEffect(() => {
    if (!search.trim()) {
      // setDebouncedSearch(search);
      return;
    }
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  function clearSearch() {
    setSearch("");
    setDebouncedSearch(""); // sync immediately so isSearching stays false
  }

  const allCategories = ["All", ...CATEGORIES];

  const visible = COMPONENT_BLOCKS.filter((b) => {
    const matchCat = activeCategory === "All" || b.category === activeCategory;
    const matchSearch =
      !debouncedSearch.trim() ||
      b.label.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      b.category.toLowerCase().includes(debouncedSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  function handleSelect(block: ComponentBlock) {
    onSelect(block);
    onClose();
  }

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      onClose();
      clearSearch();
    }
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop
          className="fixed inset-0 z-150 bg-black/40 backdrop-blur-sm
            data-open:animate-in data-open:fade-in-0
            data-closed:animate-out data-closed:fade-out-0 duration-150"
        />
        <DialogPrimitive.Popup
          className="fixed top-1/2 left-1/2 z-250 -translate-x-1/2 -translate-y-1/2
            w-[calc(100vw-2rem)] max-w-4xl max-h-[calc(100vh-4rem)]
            flex flex-col bg-white dark:bg-[#1c1c1c]
            rounded-2xl shadow-2xl outline-none overflow-hidden
            data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95
            data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95
            duration-150"
        >
          {/* Header */}
          <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-100 dark:border-white/8 shrink-0">
            <DialogPrimitive.Title className="text-base font-semibold text-gray-900 dark:text-white shrink-0">
              Add Block
            </DialogPrimitive.Title>

            {/* Search */}
            <div className="relative flex-1">
              {/* Left icon: spinner while debouncing, magnifier otherwise */}
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                {isSearching ? (
                  <Loader2 className="w-3.5 h-3.5 text-indigo-500 dark:text-[#CEFF00] animate-spin" />
                ) : (
                  <Search className="w-3.5 h-3.5 text-gray-400" />
                )}
              </div>

              <input
                type="text"
                placeholder="Search blocks…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 py-1.5 rounded-lg text-sm
                  bg-gray-100 dark:bg-white/8
                  text-gray-900 dark:text-white
                  placeholder:text-gray-400 dark:placeholder:text-neutral-500
                  border border-transparent focus:border-indigo-400 dark:focus:border-[#CEFF00]/50
                  focus:outline-none transition-colors"
                style={{ paddingRight: search ? "2rem" : "0.75rem" }}
              />

              {/* Clear button — only when there's text */}
              {search && (
                <button
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2
                    w-5 h-5 rounded-full flex items-center justify-center
                    bg-gray-300 dark:bg-white/15
                    text-gray-600 dark:text-neutral-300
                    hover:bg-gray-400 dark:hover:bg-white/25
                    transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              )}
            </div>

            <DialogPrimitive.Close
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100
                dark:text-neutral-500 dark:hover:text-neutral-300 dark:hover:bg-white/8 transition-colors shrink-0"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </DialogPrimitive.Close>
          </div>

          {/* Body */}
          <div className="flex flex-1 min-h-0">
            {/* Category sidebar */}
            <aside className="w-44 shrink-0 border-r border-gray-100 dark:border-white/8 p-3 flex flex-col gap-0.5 overflow-y-auto">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "text-left px-3 py-1.5 rounded-lg text-sm transition-colors",
                    activeCategory === cat
                      ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-medium"
                      : "text-gray-500 dark:text-neutral-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/6",
                  )}
                >
                  {cat}
                </button>
              ))}
            </aside>

            {/* Block grid */}
            <div className="flex-1 overflow-y-auto p-4">
              {isSearching ? (
                <div className="flex flex-col items-center justify-center h-48 gap-3">
                  <Loader2 className="w-6 h-6 text-indigo-400 dark:text-[#CEFF00] animate-spin" />
                  <p className="text-sm text-gray-400 dark:text-neutral-500">
                    Searching…
                  </p>
                </div>
              ) : visible.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-center gap-2">
                  <p className="text-sm font-medium text-gray-500 dark:text-neutral-400">
                    No blocks found
                  </p>
                  <p className="text-xs text-gray-400 dark:text-neutral-500">
                    Try a different keyword or{" "}
                    <button
                      onClick={clearSearch}
                      className="underline underline-offset-2 hover:text-indigo-500 dark:hover:text-[#CEFF00] transition-colors"
                    >
                      clear the search
                    </button>
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-3">
                  {visible.map((block) => (
                    <button
                      key={block.id}
                      onClick={() => handleSelect(block)}
                      className="group flex flex-col rounded-xl overflow-hidden border border-gray-100 dark:border-white/8
                        hover:border-indigo-400 dark:hover:border-[#CEFF00]/50
                        hover:shadow-md dark:hover:shadow-black/20
                        focus:outline-none focus-visible:border-indigo-400
                        transition-all duration-150 bg-white dark:bg-[#252525]"
                    >
                      {/* Preview */}
                      <div className="h-24 w-full overflow-hidden shrink-0 bg-gray-50 dark:bg-[#1a1a1a]">
                        <BlockPreview category={block.category} />
                      </div>

                      {/* Label */}
                      <div className="px-3 py-2.5 text-left">
                        <p className="text-xs font-semibold text-gray-800 dark:text-white leading-tight truncate">
                          {block.label}
                        </p>
                        <p className="text-[11px] text-gray-400 dark:text-neutral-500 mt-0.5 truncate">
                          {block.category}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
