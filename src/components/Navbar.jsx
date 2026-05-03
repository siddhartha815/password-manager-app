const Navbar = () => {
  return (
    <div className="bg-slate-800 flex justify-between flex-wrap gap-2 h-auto min-h-10 items-center px-4 sm:px-12 md:px-28 lg:px-52 py-2">
      <div className="font-bold text-xl">
        <span className="text-[#FF9933]">&lt;Sur</span>
        <span className="text-white">ak</span>
        <span className="text-green-700">sha/&gt;</span>
      </div>
      <div className="text-white cursor-pointer bg-green-800 pr-1.5 rounded-full">
        <a href="https://www.google.com" className="flex gap-1 justify-center items-center" target="_blank">
          <lord-icon src="https://cdn.lordicon.com/ioihllwu.json" trigger="hover" colors="primary:#109121,secondary:#e4e4e4"></lord-icon>
          <span>GitHub</span>
        </a>
      </div>
    </div>
  );
};
export default Navbar;