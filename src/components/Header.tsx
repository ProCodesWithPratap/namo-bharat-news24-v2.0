const Header = () => {
  return (
    <header className="bg-red-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">
          {process.env.NEXT_PUBLIC_SITE_TITLE || 'Namo Bharat News'}
        </a>
        <nav className="space-x-4 hidden md:block">
          <a href="/category/politics" className="hover:underline">
            राजनीति
          </a>
          <a href="/category/world" className="hover:underline">
            दुनिया
          </a>
          <a href="/category/business" className="hover:underline">
            कारोबार
          </a>
          <a href="/search" className="hover:underline">
            खोज
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;