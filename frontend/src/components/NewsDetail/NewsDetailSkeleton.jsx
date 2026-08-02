import React from "react";

export default function NewsDetailSkeleton() {
  return (
    <section className="py-16 bg-slate-50/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-6 w-32 bg-slate-200 animate-pulse rounded mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-10 w-3/4 bg-slate-200 animate-pulse rounded" />
            <div className="aspect-[16/9] w-full bg-slate-200 animate-pulse rounded-2xl" />
          </div>
          <div className="space-y-4">
            <div className="h-8 bg-slate-200 animate-pulse rounded w-1/2" />
            <div className="h-20 bg-slate-200 animate-pulse rounded" />
            <div className="h-20 bg-slate-200 animate-pulse rounded" />
          </div>
        </div>
      </div>
    </section>
  );
}
