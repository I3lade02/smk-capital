import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { AppRoutes } from "./routes/AppRoutes";

export default function App() {
  return (
    <main className="min-h-screen bg-[#f7f3ed] text-[#061a34]">
      <div className="mx-auto grid min-h-screen max-w-480 lg:grid-cols-[160px_1fr]">
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
