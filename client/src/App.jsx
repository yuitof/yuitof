import ContactForm from "./components/ContactForm.jsx";
import Bio from "./components/Bio.jsx";
import { useState } from 'react';
import { Routes, Route } from "react-router";

function App() {
  const [state, setState] = useState("");
  return (
    <Routes>
      <Route path="/" element={<Bio state={{value: state, setter: setState}} />} />
      <Route path="/contact" element={<ContactForm state={{value: state, setter: setState}} />} />
    </Routes>
  );
}

export default App
