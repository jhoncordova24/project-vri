import React from "react";

export default function NewsDetailSkeleton() {
  return (
    <section className="pt-24 md:pt-28 pb-16 bg-slate-50/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-white border border-slate-200 p-6 sm:p-10 lg:p-12 space-y-6">
            <div className="h-4 w-40 bg-slate-200 animate-pulse" />
            <div className="h-9 w-4/5 bg-slate-200 animate-pulse" />
            <div className="h-3 w-32 bg-slate-200 animate-pulse mb-6" />

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="h-4 bg-slate-200 animate-pulse w-full" />
              <div className="h-4 bg-slate-200 animate-pulse w-11/12" />
              <div className="h-4 bg-slate-200 animate-pulse w-full" />
              <div className="h-4 bg-slate-200 animate-pulse w-3/4" />
            </div>

            <div className="h-72 w-full bg-slate-100 border border-slate-200 animate-pulse mt-8" />
          </div>

          <div className="bg-white border border-slate-200 p-5 sm:p-6 space-y-4">
            <div className="h-4 w-32 bg-slate-200 animate-pulse mb-4 pb-3 border-b border-slate-100" />
            <div className="flex gap-3 items-center">
              <div className="w-24 h-16 bg-slate-200 animate-pulse shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-3 bg-slate-200 animate-pulse w-1/3" />
                <div className="h-3 bg-slate-200 animate-pulse w-full" />
                <div className="h-3 bg-slate-200 animate-pulse w-1/2" />
              </div>
            </div>
            <div className="flex gap-3 items-center pt-3 border-t border-slate-100">
              <div className="w-24 h-16 bg-slate-200 animate-pulse shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-3 bg-slate-200 animate-pulse w-1/3" />
                <div className="h-3 bg-slate-200 animate-pulse w-full" />
                <div className="h-3 bg-slate-200 animate-pulse w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
