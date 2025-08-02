
import Navbar from "./components/Navbar";
import { AppRoutes } from "./routes/AppRoutes";

const App = () => {
  return (
    <>
      <div className="mt-20">
        <Navbar />
      </div>
      <AppRoutes />
    </>
  );
};

export default App;
