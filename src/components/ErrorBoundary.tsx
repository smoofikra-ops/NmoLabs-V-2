import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--surface-brand)] p-6" dir="rtl">
          <div className="max-w-md w-full bg-[var(--surface-primary)] border border-[var(--border-default)] rounded-3xl p-8 text-center shadow-2xl">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">عذراً، حدث خطأ غير متوقع</h1>
            <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
              واجه النظام مشكلة أثناء تحميل هذه الصفحة. يرجى المحاولة مرة أخرى أو العودة للصفحة الرئيسية.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-[var(--text-primary)] py-3.5 rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
              <RefreshCw size={18} />
              تحديث الصفحة
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
