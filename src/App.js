import "./App.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import MainPageLayout from "./Components/Pages/MainPageLayout";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Login2 from "./Components/Pages/Login";
import Register from "./Components/Register";
import Register2 from "./Components/Pages/Register";
import { extendTheme } from "@chakra-ui/react";
// import ReduxProvider from './redux/ReduxProvider';
import { UserContextProvider } from "./Components/Context/UserContext";
import "@fontsource-variable/urbanist";
import StudentMainPageLayout from "./Components/Pages/StudentMainPageLayout";
import HomePage from "./Components/Pages/HomePage";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
  fonts: {
    heading: `'Urbanist Variable', sans-serif`,
    body: `'Urbanist Variable', sans-serif`,
  },
  styles: {
    global: (props) => ({
      "html, body": {
        bg: props.colorMode === "dark" ? "gray.770" : "gray.300",
      },
    }),
  },
});

function App() {
  return (
    // <ReduxProvider>
    // <UserContextProvider>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <div style={{ height: "100vh"}}>
        <Routes>
          <Route
            path="/trainer/*"
            element={
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard/*" element={<MainPageLayout />} />
              </Routes>
            }
          />
          <Route
            path="/student/*"
            element={
              <Routes>
                <Route path="/" element={<Login2 />} />
                <Route path="/login" element={<Login2 />} />
                <Route path="/register" element={<Register2 />} />
                <Route path="/dashboard/*" element={<StudentMainPageLayout/>} />
              </Routes>
            }
          />
          <Route
            path="/*"
            element={
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login2 />} />
                <Route path="/register" element={<Register2 />} />
              </Routes>
            }
          />
        </Routes>
      </div>
      
    </ChakraProvider>
    // </UserContextProvider>
    // </ReduxProvider>
  );
}

export default App;
