import React from "react";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => (
  <>
  <AuthProvider>
    <RoutesApp />
  </AuthProvider>
  </>
);

export default App;