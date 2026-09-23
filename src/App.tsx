import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import IntroAnimation from './components/IntroAnimation';
import Home from './pages/Home';
import StartBusinessFlow from './pages/StartBusinessFlow';
import ExploreTasks from './pages/ExploreTasks';
import TaskRunnerPage from './pages/TaskRunnerPage';
import MyVyaparMitraPage from './pages/MyVyaparMitraPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ImpactPage from './pages/ImpactPage';
import VerificationPage from './pages/VerificationPage';
import { RuralLensOcr } from './components/RuralLensOcr';

function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroAnimation />} />
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/start-business" element={<StartBusinessFlow />} />
        <Route path="/explore" element={<ExploreTasks />} />
        <Route path="/task/:taskId" element={<TaskRunnerPage />} />
        <Route path="/ocr" element={<div className="py-10 max-w-4xl mx-auto"><RuralLensOcr /></div>} />
        <Route path="/dashboard" element={<MyVyaparMitraPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
