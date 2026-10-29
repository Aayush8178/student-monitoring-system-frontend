import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Icon from './Icon';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const demo = location.pathname.startsWith('/preview');
  const admin = demo ? location.pathname.includes('/admin') : localStorage.getItem('role') === 'admin';
  const base = demo ? '/preview' : '/student';
  const links = admin
    ? [[demo ? '/preview/admin' : '/', 'grid', 'Overview'], [demo ? '/preview/admin/analytics' : '/analytics', 'chart', 'Analytics'], [demo ? '/preview/admin/at-risk' : '/at-risk', 'shield', 'Student alerts'], [demo ? '/preview/admin/settings' : '/settings', 'settings', 'Data & settings']]
    : [[base, 'grid', 'Overview'], [base + '/planner', 'calendar', 'My planner'], [base + '/records', 'book', 'Academic records']];
  const logout = () => {
    if (!demo) { localStorage.removeItem('token'); localStorage.removeItem('role'); }
    setOpen(false);
    navigate('/login');
  };
  return <header className="university-navbar">
    <div className="navbar-inner">
      <Link to={links[0][0]} className="brand" onClick={() => setOpen(false)}>
        <span className="brand-mark"><img className="university-logo" src="/ipu_logo.png" alt="Guru Gobind Singh Indraprastha University logo"/></span>
        <span className="brand-name">Student Monitoring System<small>UNIVERSITY ACADEMIC PORTAL</small></span>
      </Link>
      <button className="navbar-toggle" aria-label="Toggle navigation" aria-expanded={open} aria-controls="university-navigation" onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'}/></button>
      <div id="university-navigation" className={'navbar-content ' + (open ? 'is-open' : '')}>
        <nav aria-label="Main navigation">{links.map(([to, icon, label]) => <NavLink key={to} end to={to} onClick={() => setOpen(false)} className={({isActive}) => 'nav-item ' + (isActive ? 'active' : '')}><Icon name={icon} size={17}/>{label}</NavLink>)}</nav>
        <div className="navbar-account">
          {demo ? <Link className="preview-switch" to={admin ? '/preview' : '/preview/admin'} onClick={() => setOpen(false)}>View {admin ? 'student' : 'faculty'} preview</Link> : <span className="account-label">{admin ? 'Faculty' : 'Student'} account</span>}
          <button className="navbar-signout" onClick={logout}><Icon name="logout" size={16}/>{demo ? 'Exit preview' : 'Sign out'}</button>
        </div>
      </div>
    </div>
  </header>;
}
