import { Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

import Home from "./pages/Home";
import ToursPage from "./pages/ToursPage";
import TourDetail from "./pages/TourDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ComplaintsBook from "./pages/ComplaintsBook";
import Privacy from "./pages/policies/Privacy";
import Terms from "./pages/policies/Terms";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="tours" element={<ToursPage />} />
        <Route path="tours/:slug" element={<TourDetail />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="complaints-book" element={<ComplaintsBook />} />
        <Route path="policies/privacy" element={<Privacy />} />
        <Route path="policies/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
