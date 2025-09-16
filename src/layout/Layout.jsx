import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ModernCursor from "../components/cursor/ModernCursor";
import { useIsDesktop } from "../components/cursor/useIsDesktop"; 
import ErrorBoundary from "../adminPanel/commonPage/ErrorBoundary";

const Layout = () => {
  const isDesktop = useIsDesktop();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {isDesktop && <ModernCursor />}

      <main className="flex-grow">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
