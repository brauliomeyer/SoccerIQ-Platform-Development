import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6', className)} {...props} />;
}

export function StatCard({ title, value, subtitle }: { title: string; value: React.ReactNode; subtitle: string }) {
  return (
    <Card className="p-4">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="text-2xl font-semibold text-white mt-1">{value}</p>
      <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
    </Card>
  );
}

export function DataTable<T extends Record<string, React.ReactNode>>({
  columns,
  rows,
}: {
  columns: string[];
  rows: T[];
}) {
  return (
    <div className="overflow-auto rounded-2xl border border-slate-800">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-900/70 text-slate-300">
          <tr>{columns.map((c) => <th className="p-3 text-left font-medium" key={c}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className="border-t border-slate-800 text-white">
              {columns.map((c) => <td key={c} className="p-3">{r[c]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Modal({ title, trigger, children }: { title: string; trigger: React.ReactNode; children: React.ReactNode }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-800 bg-slate-950 p-6">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold text-white">{title}</Dialog.Title>
            <Dialog.Close className="text-slate-400"><X size={18} /></Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1 text-sm">
      <span className="text-slate-300">{label}</span>
      {children}
      {error ? <span className="text-xs text-red-400">{error}</span> : null}
    </label>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card className="text-center">
      <p className="text-white font-medium">{title}</p>
      <p className="text-slate-400 text-sm mt-2">{description}</p>
    </Card>
  );
}

export function LoadingSkeleton() {
  return <div className="h-32 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/40" />;
}

export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn('rounded-xl px-4 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-60', className)} {...props} />;
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn('w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-white', className)} {...props} />;
}

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn('w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-white', className)} {...props} />;
}
