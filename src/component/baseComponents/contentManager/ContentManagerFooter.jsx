export default function ContentManagerFooter() {
  return (
    <footer className=" text-center text-sm  text-gray-600">
      <div className="cms-footer ">
        <span>© {new Date().getFullYear()} GENAI-CMS. All rights reserved.</span>
        {/* <nav className="mt-1">
          <a href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</a>
          <span> | </span>
          <a href="/terms-of-service" className="text-blue-500 hover:underline">Terms of Service</a>
        </nav> */}
      </div>
    </footer>
  );
}
