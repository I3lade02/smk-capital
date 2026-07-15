import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { PageNavigation } from "./components/layout/PageNavigation";
import { Sidebar } from "./components/layout/Sidebar";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { AppRoutes } from "./routes/AppRoutes";

export default function App() {
  const location = useLocation();

  useScrollReveal(location.pathname);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    document
      .querySelector<HTMLElement>("#main-content")
      ?.focus({ preventScroll: true });
  }, [location.pathname]);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-(--page-bg) text-[#061a34] focus:outline-none"
    >
      <div className="mx-auto grid min-h-screen lg:grid-cols-[160px_1fr]">
        <Sidebar />

        <div className="relative overflow-hidden">
          <Header />
          <AppRoutes />
          <PageNavigation />
          <Footer />
        </div>
      </div>
    </main>
  );
}
