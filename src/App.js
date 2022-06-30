import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompanyTable from "./components/Company/CompanyTable";
import SearchCompany from "./components/Company/SearchCompany";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/addcompany" element={<CompanyTable />} />
        <Route exact path="/" element={<SearchCompany />}></Route>
        <Route exact path="/*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
