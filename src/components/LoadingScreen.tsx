export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center gap-1 mb-6">
          <span className="w-2 h-2 bg-[#3B82F6] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-[#3B82F6] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-[#3B82F6] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <h2 className="text-xl font-bold text-white tracking-tighter">
          CABINET <span className="text-[#3B82F6]">PRODIGITAL</span>
        </h2>
        <p className="text-xs text-slate-500 mt-2 uppercase tracking-widest font-bold">
          Chargement...
        </p>
      </div>
    </div>
  );
}

// MJ Commit
