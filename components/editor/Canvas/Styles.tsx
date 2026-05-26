"use client";

import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";

import SectionTitle from "@/components/common/SectionTitle";
import { Trash2 } from "lucide-react";

const inputCls =
  "w-full min-h-10 w-full min-w-0 border border-input px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:border-indigo-500 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 rounded-sm bg-white focus:border-indigo-500! focus:ring-2 focus:ring-indigo-500/20! dark:focus:border-[#CEFF00]! dark:focus-visible:ring-[#CEFF00]/25!";

const Styles = () => {
  return (
    <>
      <SectionTitle
        title="Styles"
        paragraph="Add styles from an external file or paste it inline."
      />
      <div className="rounded-lg border border-gray-300 dark:border-[#2A2A2A] bg-gray-50 dark:bg-[#1D1D1D] p-4">
        <div className="grid space-y-4">
          <div className="flex items-start gap-4 p-6">
            <Field className="flex flex-col items-end justify-end shrink-0 relative w-40">
              <FieldLabel htmlFor="html-js-code" className="inline text-end">
                CSS code
              </FieldLabel>
            </Field>

            <div className="flex-1 flex flex-col gap-3">
              <div className="relative">
                <Textarea
                  rows={4}
                  id="html-js-code"
                  placeholder="Please enter your CSS code. Do not include <style> tag here."
                  className={inputCls + " resize-none h-full min-h-50"}
                />
              </div>

              <div className="flex flex-col gap-2.5 mt-1">
                <FieldGroup className="mx-0 gap-0 space-y-2.5">
                  <Field orientation="horizontal" className="items-center">
                    <Checkbox
                      id="checkbox-all-pages"
                      name="checkbox-all-pages"
                      className="peer w-5 h-5 rounded border-slate-300 dark:border-white/20 text-indigo-600 focus:ring-indigo-500 bg-transparent data-checked:bg-indigo-500 dark:data-checked:bg-[#CEFF00] dark:data-checked:border-[#323232]"
                    />
                    <FieldLabel htmlFor="checkbox-all-pages">
                      Add this CSS to all pages.
                    </FieldLabel>
                  </Field>
                </FieldGroup>
              </div>
            </div>

            <div className="shrink-0">
              <button
                type="button"
                className="flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#C94A4A] hover:bg-[#B33E3E] text-white text-sm font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/20"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Styles;
