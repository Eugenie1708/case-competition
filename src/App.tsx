import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { StudentDashboard } from './pages/StudentDashboard';
import { FacultyDashboard } from './pages/FacultyDashboard';
import { IndustryDashboard } from './pages/IndustryDashboard';
import { LeadershipDashboard } from './pages/LeadershipDashboard';
import { StudentDetail } from './pages/StudentDetail';
import { FacultyProfile } from './pages/FacultyProfile';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="student" element={<StudentDashboard />} />
        <Route path="student/detail/:theme" element={<StudentDetail />} />
        <Route path="faculty" element={<FacultyDashboard />} />
        <Route path="faculty/:id" element={<FacultyProfile />} />
        <Route path="industry" element={<IndustryDashboard />} />
        <Route path="leadership" element={<LeadershipDashboard />} />
      </Route>
    </Routes>
  );
}
