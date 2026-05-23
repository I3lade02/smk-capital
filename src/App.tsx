import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { AppRoutes } from "./routes/AppRoutes";
import { useLocation } from "react-router-dom";

export default function App() {
  const location = useLocation();

  useScrollReveal(location.pathname);

  return (
    <main className="min-h-screen bg-(--page-bg) text-[#061a34]">
      <div className="mx-auto grid min-h-screen lg:grid-cols-[160px_1fr]">
        <Sidebar />

        <div className="relative overflow-hidden">
          <Header />
          <AppRoutes />
          <Footer />
        </div>
      </div>
    </main>
  );
}
