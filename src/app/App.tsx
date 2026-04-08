
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import ThemeProvider from "../features/theme/context/ThemeContext";

const App = () => {
  
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
