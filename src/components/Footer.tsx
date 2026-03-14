const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-100 text-gray-700 mt-8">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>
          © {year} {process.env.NEXT_PUBLIC_SITE_TITLE || 'Namo Bharat News'}. सभी
          अधिकार सुरक्षित।
        </p>
      </div>
    </footer>
  );
};

export default Footer;