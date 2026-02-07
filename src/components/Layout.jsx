import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
