export default function ContentManagerFooter() {
  return (
    <footer className="bg-gradient-to-b from-slate-800 to-slate-900 border-t border-slate-700/50 text-center text-sm text-slate-400 py-4">
      <div className="cms-footer">
        <span>© {new Date().getFullYear()} GENAI-CMS. All rights reserved.</span>
        {/* <nav className="mt-1">
          <a href="/privacy-policy" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">Privacy Policy</a>
          <span className="text-slate-600"> | </span>
          <a href="/terms-of-service" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">Terms of Service</a>
        </nav> */}
      </div>
    </footer>
  );
}
