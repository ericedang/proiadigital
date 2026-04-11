import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6">
          <div className="max-w-lg w-full text-center">
            <div className="w-20 h-20 bg-[#3B82F6]/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">
              Une erreur est survenue
            </h1>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Nous rencontrons un problème technique. Veuillez rafraîchir la page ou réessayer plus tard.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#3B82F6] text-white px-8 py-4 rounded-none text-sm font-bold uppercase tracking-widest hover:bg-[#2563EB] transition-colors"
            >
              Rafraîchir la page
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="text-xs text-slate-500 cursor-pointer uppercase tracking-widest font-bold">
                  Détails techniques
                </summary>
                <pre className="mt-4 p-4 bg-slate-800 text-red-400 text-xs overflow-auto rounded-lg">
                  {this.state.error.message}
                  {'\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// MJ Commit
