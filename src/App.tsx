
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GeneralFeedback from "./components/donor-feedback/pages/GeneralFeedback";
import FeedbackForm from "./components/donor-feedback/components/FeedbackForm";
import FeedbackPage from "./components/donor-feedback/pages/FeedbackPage";
import SurveyPage from "./components/donor-feedback/pages/SurveyPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/general-feedback" element={<GeneralFeedback />} />
          <Route path="/donation-feedback" element={<FeedbackForm />} />
          <Route path="/feedback-management" element={<FeedbackPage />} />
          <Route path="/survey" element={<SurveyPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
