import type { ReactNode } from "react";
import ThemeProvider from "../features/theme/context/ThemeContext";
import AuthProvider from "../features/auth/context/AuthContext";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};

export default Providers;
