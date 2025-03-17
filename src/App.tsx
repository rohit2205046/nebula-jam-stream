
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClerkProvider, SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
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
            <Route 
              path="/" 
              element={
                <>
                  <SignedIn>
                    <Index />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/auth" replace />
                  </SignedOut>
                </>
              } 
            />
            <Route 
              path="/explore" 
              element={
                <>
                  <SignedIn>
                    <Explore />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/auth" replace />
                  </SignedOut>
                </>
              } 
            />
            <Route 
              path="/library" 
              element={
                <>
                  <SignedIn>
                    <Library />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/auth" replace />
                  </SignedOut>
                </>
              } 
            />
            <Route 
              path="/referral" 
              element={
                <>
                  <SignedIn>
                    <Referral />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/auth" replace />
                  </SignedOut>
                </>
              } 
            />
            <Route 
              path="/chat" 
              element={
                <>
                  <SignedIn>
                    <Chat />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/auth" replace />
                  </SignedOut>
                </>
              } 
            />
            <Route 
              path="/premium" 
              element={
                <>
                  <SignedIn>
                    <Premium />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/auth" replace />
                  </SignedOut>
                </>
              } 
            />
            <Route path="/auth" element={<AuthPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;
