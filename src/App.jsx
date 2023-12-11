import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import StudentForm from "./pages/StudentForm.jsx";
import TeacherPanel from "./pages/TeacherPanel.jsx";


const App = () => (
    <div >
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/student-form" element={<StudentForm />} />
                <Route path="/teacher-panel" element={<TeacherPanel />} />
            </Routes>
        </Router>

    </div>
);

export default App;