import { Route, Routes, useNavigate } from "react-router";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";
import HomeAfterLogin from "./pages/HomeAfterLogin";
import { addUserToDatabase } from "./apiClient";
import { useEffect } from "react";
import { LoginCallBack } from "@opencampus/ocid-connect-js";
import { toast } from "sonner";
import HomeBeforeLogin from "./pages/HomeBeforeLogin";




function App() {
  const navigate = useNavigate();
  const { authenticated, user } = usePrivy();
  
  useEffect(() => {
    if (authenticated) {
      addUserToDatabase(user);
    }
  }, [user]);

  const loginSuccess = () => {
    toast.success("Open Campus Connect Successful");
    navigate("/profile");
  };

  const loginError = () => {
    toast.error("Open Campus Connect Failed");
    navigate("/profile");
  };
  const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Number.POSITIVE_INFINITY,
        },
    },
});

  return (
    <>
<QueryClientProvider client={queryClient}>
      {authenticated ? (
        <HomeAfterLogin />
      ) : (
        <>
          <HomeBeforeLogin />
          <Routes>
            <Route
              path="/redirect"
              element={
                <LoginCallBack
                  errorCallback={loginError}
                  successCallback={loginSuccess}
                  customErrorComponent={undefined}
                  customLoadingComponent={undefined}
                />
              }
            />


          </Routes>
        </>
      )}
      </QueryClientProvider>
    </>
  );
}

export default App;