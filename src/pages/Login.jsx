import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import Icon from '../components/Icon';
export default function Login(){
 const [email,setEmail]=useState(''),[password,setPassword]=useState(''),[error,setError]=useState(''),[loading,setLoading]=useState(false);const navigate=useNavigate();
 const submit=async e=>{e.preventDefault();setLoading(true);setError('');try{const {data}=await API.post('/api/auth/login',{email:email.trim(),password});if(!data.token||!['admin','student'].includes(data.role))throw new Error('The API returned an invalid login response. Check the backend URL.');localStorage.setItem('token',data.token);localStorage.setItem('role',data.role);navigate(data.role==='admin'?'/':'/student');}catch(err){setError(err.response?.data?.error||(err.response?.status>=500?'The backend is unavailable. Confirm that it is running and connected to the database containing your account.':err.code==='ERR_NETWORK'||err.code==='ECONNABORTED'?'Cannot reach the backend. Start your backend on port 5000 and restart the frontend after changing its configuration.':err.message||'Unable to sign in. Please try again.'));}finally{setLoading(false);}};
 return <div className="centered-login-page">
  <section className="centered-login-card" aria-labelledby="login-title">
   <img className="login-ipu-logo" src="/ipu_logo.png" alt="Guru Gobind Singh Indraprastha University logo"/>
   <span className="eyebrow">UNIVERSITY ACADEMIC PORTAL</span>
   <h1 id="login-title">Welcome back</h1>
   <p className="centered-login-description">Sign in to your Student Monitoring System account.</p>
   <form onSubmit={submit}>{error&&<div className="notice notice-error" role="alert">{error}</div>}<label className="field">Email address<input type="email" autoComplete="username" placeholder="you@college.edu" value={email} onChange={e=>setEmail(e.target.value)} required/></label><label className="field">Password<input type="password" autoComplete="current-password" placeholder="Enter your password" value={password} onChange={e=>setPassword(e.target.value)} required/></label><button className="button button-primary login-submit" disabled={loading}>{loading?'Signing in…':'Sign in to workspace'}<Icon name="arrow" size={18}/></button></form>
  </section>
  <footer className="centered-login-footer"><span>© {new Date().getFullYear()} Student Monitoring System</span><a href="https://www.pexels.com/photo/books-in-library-3747513/" target="_blank" rel="noreferrer">Books photo · Pexels</a></footer>
 </div>;
}
