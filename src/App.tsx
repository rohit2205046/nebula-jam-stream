// Example code change
const exampleFunction = () => {
    console.log('This is a test function');
};

// Existing code below
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Library from "./pages/Library";
import Referral from "./pages/Referral";
import Chat from "./pages/Chat";
import Premium from "./pages/Premium";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";

const PUBLISHABLE_KEY = "pk_test_YWN0dWFsLXdhbGxleWUtMTUuY2xlcmsuYWNjb3VudHMuZGV2JA";
if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Clerk Publishable Key");
}

const queryClient = new QueryClient();

const App = () => (
    <ClerkProvider
          publishableKey={PUBLISHABLE_KEY}
          clerkJSVersion="5.56.0-snapshot.v20250312225817"
          signInUrl="/auth"
          signUpUrl="/auth"
          signInFallbackRedirectUrl="/"
          signUpFallbackRedirectUrl="/"
          afterSignOutUrl="/"
        >
        <QueryClientProvider client={queryClient}>
              <TooltipProvider>
                      <Toaster />
                      <Sonner />
                      <BrowserRouter>
                                <Routes>
                                  {/* Removed SignedIn/SignedOut wrappers to allow direct access */}
                                            <Route path="/" element={<Index />} />
                                            <Route path="/explore" element={<Explore />} />
                                            <Route path="/library" element={<Library />} />
                                            <Route path="/referral" element={<Referral />} />
                                            <Route path="/chat" element={<Chat />} />
                                            <Route path="/premium" element={<Premium />} />
                                            <Route path="/auth" element={<AuthPage />} />
                                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                                            <Route path="*" element={<NotFound />} />
                                          </Routes>Routes>
                              </BrowserRouter>BrowserRouter>
                    </TooltipProvider>TooltipProvider>
            </QueryClientProvider>QueryClientProvider>
      </ClerkProvider>ClerkProvider>
  );

export default App;
</ClerkProvider>
