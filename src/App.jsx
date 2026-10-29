import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import AtRiskStudents from './pages/AtRiskStudents';
import Settings from './pages/Settings';
import StudentDashboard from './pages/StudentDashboard';
import Navbar from './components/Navbar';
import RequireRole from './components/RequireRole';
import Icon from './components/Icon';
import './App.css';
function AppRoutes() {
 const location = useLocation(); const login = location.pathname === '/login'; const demo = location.pathname.startsWith('/preview');
 return <div className={login?'auth-shell':'app-shell'}>{!login&&<Navbar/>}<main id="main-content" className={login?'':'main-content'}>{!login&&<header className="topbar"><span>My workspace <span className="breadcrumb-slash">/</span> <b>{location.pathname.includes('planner')?'Attendance planner':location.pathname.includes('records')?'Academic records':location.pathname.includes('analytics')?'Analytics':location.pathname.includes('at-risk')?'Student alerts':location.pathname.includes('settings')?'Data & settings':'Overview'}</b></span><div className="topbar-right">{demo&&<span className="demo-pill">Preview · sample data</span>}<span className="topbar-date"><Icon name="calendar" size={16}/>{new Date().toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</span></div></header>}
 <div className={login?'':'page-content'}><Routes><Route path="/login" element={<Login/>}/><Route path="/" element={<RequireRole role="admin"><Dashboard/></RequireRole>}/><Route path="/analytics" element={<RequireRole role="admin"><Analytics/></RequireRole>}/><Route path="/at-risk" element={<RequireRole role="admin"><AtRiskStudents/></RequireRole>}/><Route path="/settings" element={<RequireRole role="admin"><Settings/></RequireRole>}/><Route path="/student/*" element={<RequireRole role="student"><StudentDashboard/></RequireRole>}/><Route path="/preview/admin" element={<Dashboard demo/>}/><Route path="/preview/admin/analytics" element={<Analytics demo/>}/><Route path="/preview/admin/at-risk" element={<AtRiskStudents demo/>}/><Route path="/preview/admin/settings" element={<Settings demo/>}/><Route path="/preview/*" element={<StudentDashboard demo/>}/><Route path="*" element={<Navigate to="/login" replace/>}/></Routes></div>{!login&&<footer className="app-footer"><span>University Academic Portal</span><span>Student Monitoring System</span></footer>}</main></div>;
}
export default function App(){return <BrowserRouter><a className="skip-link" href="#main-content">Skip to content</a><AppRoutes/></BrowserRouter>;}
