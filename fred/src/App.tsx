import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore";

function App() {
  return (
    <>
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/explore" element={<Explore />} />
          </Routes>
        </Router>
      </Layout>
    </>
  );
}

export default App;