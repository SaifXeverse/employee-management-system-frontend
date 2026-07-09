export default function Loading() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-violet-600 border-t-transparent"></div>
    </div>
  );
}