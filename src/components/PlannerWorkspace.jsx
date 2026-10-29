import { useEffect, useState } from 'react';
import API from '../api/api';
import Icon from './Icon';
import { Notice } from './UI';
import WeeklyTimetable from './WeeklyTimetable';
import PersonalizedPlan from './PersonalizedPlan';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const fullDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const newClass = () => ({ subject:'', day:'Monday', time:'09:00', duration:60 });
function initialSettings(student) {
  const saved = student.preferences || {};
  let draft = {};
  try { draft = JSON.parse(localStorage.getItem('attend-planner-draft-' + student._id)) || {}; } catch { /* Ignore an obsolete browser draft. */ }
  const availability = Object.fromEntries(days.map(day => [day, {
    enabled:saved.availability?.[day]?.enabled ?? (!saved.preferredDays?.length || saved.preferredDays.includes(day)),
    start:saved.availability?.[day]?.start || draft.availability?.[day]?.start || '09:00',
    end:saved.availability?.[day]?.end || draft.availability?.[day]?.end || '18:00',
  }]));
  return { targetAttendance:saved.targetAttendance || 75, semesterStart:saved.semesterStart || draft.start || '', semesterEnd:saved.semesterEnd || draft.end || '', maxClassesPerDay:saved.maxClassesPerDay || draft.maxClasses || 4, availability };
}
export default function PlannerWorkspace({ student, schedule, plan, onTimetableChange, onPreferencesChange, onPlanChange, demo=false }) {
  const [settings, setSettings] = useState(() => initialSettings(student));
  const [file, setFile] = useState(null);
  const [reference, setReference] = useState(null);
  const [busy, setBusy] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [entries, setEntries] = useState([]);
  const [dirty, setDirty] = useState(false);
  useEffect(() => () => { if (reference) URL.revokeObjectURL(reference.url); }, [reference]);
  const change = (field, value) => { setSettings(old => ({...old,[field]:value})); setDirty(true); };
  const changeDay = (day, field, value) => { setSettings(old => ({...old,availability:{...old.availability,[day]:{...old.availability[day],[field]:value}}})); setDirty(true); };
  const failure = err => err.response?.data?.message || err.response?.data?.error || err.message || 'Unable to complete this request.';
  const selectFile = selected => {
    setError(''); setMessage('');
    if (!selected) return;
    if (!/\.(pdf|docx|xlsx|xls|csv|png|jpe?g|webp)$/i.test(selected.name)) { setError('Choose PDF, DOCX, Excel, CSV, PNG, JPG or WebP.'); return; }
    if (selected.size > 5*1024*1024) { setError('Please choose a file smaller than 5 MB.'); return; }
    setFile(selected);
    setReference({url:URL.createObjectURL(selected),image:/\.(png|jpe?g|webp)$/i.test(selected.name)});
  };
  const upload = async () => {
    if (!file) return;
    setBusy('upload'); setError(''); setMessage('');
    try {
      if (reference?.image) {
        setEntries([newClass()]); setEditing(true);
        setMessage('Image opened as a reference. Automatic image recognition is not configured; enter the classes below and save.');
        return;
      }
      if (demo) { setMessage('Preview mode does not upload files. Sign in to import your timetable.'); return; }
      const form = new FormData(); form.append('file',file); form.append('studentId',student._id);
      const {data} = await API.post('/api/timetable/upload',form);
      const imported = data.timetable?.schedule || [];
      const weekdays = imported.filter(entry => fullDays.includes(entry.day));
      setEntries(weekdays); setEditing(true);
      setMessage('Review the extracted subjects and times, then save. ' + (imported.length !== weekdays.length ? 'Weekend entries were excluded. ' : '') + 'An omitted duration is initially 60 minutes; correct it if needed.');
    } catch (err) {
      setError(failure(err));
      setEntries(schedule.length ? schedule.map(entry=>({...entry})) : [newClass()]);
      setEditing(true);
    } finally { setBusy(''); }
  };
  const refreshPlan = async () => {
    if (demo) return;
    const {data} = await API.get('/api/scheduler/my-recommendations');
    onPlanChange(data);
  };
  const save = async event => {
    event.preventDefault(); setError(''); setMessage('');
    if (settings.semesterEnd < settings.semesterStart) { setError('Semester end must be on or after its start.'); return; }
    if (!days.some(day=>settings.availability[day].enabled)) { setError('Choose at least one available weekday.'); return; }
    for (const day of days) {
      const window = settings.availability[day];
      if (window.enabled && (window.start < '09:00' || window.end > '18:00' || window.start >= window.end || (window.start >= '13:00' && window.end <= '13:30'))) { setError(day + ': choose a valid availability window between 09:00 and 18:00, with time outside lunch.'); return; }
    }
    if (editing) { setError('Save or cancel your timetable edits before generating a plan.'); return; }
    if (!schedule.length) { setError('Upload or enter your timetable and save it first.'); return; }
    setBusy('plan');
    try {
      if (demo) { setMessage('Preview mode: settings are not sent to the server. Sign in to generate your personal plan.'); return; }
      const {data} = await API.post('/api/students/preferences',settings);
      onPreferencesChange(data.student.preferences);
      onPlanChange(null);
      await refreshPlan();
      setDirty(false); setMessage('Your preferences are saved and your attendance plan has been recalculated.');
    } catch (err) { setError(failure(err)); } finally { setBusy(''); }
  };
  const editEntry = (index, field, value) => setEntries(old=>old.map((entry,i)=>i===index?{...entry,[field]:value}:entry));
  const saveEntries = async event => {
    event.preventDefault(); setBusy('timetable'); setError(''); setMessage('');
    try {
      if (!entries.length) throw new Error('Add at least one class before saving.');
      let next = entries;
      if (!demo) { const {data} = await API.put('/api/timetable/'+student._id,{schedule:entries}); next = data.timetable.schedule; }
      onTimetableChange(next); onPlanChange(null); setEditing(false); setFile(null);
      setMessage(demo?'Preview timetable updated for this session.':'Timetable saved. Set your semester dates and availability, then generate your plan.');
      if (!demo) await refreshPlan();
    } catch (err) { setError(failure(err)); } finally { setBusy(''); }
  };
  const openEditor = () => { setEntries(schedule.length?schedule.map(entry=>({...entry})):[newClass()]); setEditing(true); };
  return <div className="planner-workspace">
    <div className="planner-intro"><Icon name="calendar"/><span>Choose real classes around your weekday availability.</span><span className="tag">09:00–18:00 · MON–FRI</span></div>
    {message && <Notice>{message}</Notice>}{error && <Notice error>{error}</Notice>}
    <div className="planner-columns"><div className="planner-main">
      <section className="panel">
        <div className="step-heading"><span>01</span><div><h2>Upload and review your timetable</h2><p>Review the extracted classes before saving them.</p></div></div>
        <div className="upload-zone" onDragOver={event=>event.preventDefault()} onDrop={event=>{event.preventDefault();selectFile(event.dataTransfer.files[0]);}}>
          <span className="upload-icon"><Icon name="upload" size={26}/></span><h3>{file?file.name:'Drop your timetable here'}</h3><p>Text PDF, DOCX, Excel or CSV · images for manual review · up to 5 MB</p>
          <label className="button button-secondary file-button">Choose file<input aria-label="Choose timetable file" type="file" accept=".pdf,.docx,.xlsx,.xls,.csv,.png,.jpg,.jpeg,.webp" disabled={!!busy} onChange={event=>selectFile(event.target.files[0])}/></label>
          {file && <button type="button" className="button button-primary" disabled={!!busy} onClick={upload}>{busy==='upload'?'Reading file…':reference?.image?'Open image & enter classes':'Import & review'}<Icon name="arrow" size={16}/></button>}
        </div>
        <div className="upload-bottom"><a className="text-button" href="/timetable-template.csv" download>Download CSV template</a><button className="text-button" onClick={openEditor} disabled={!!busy}>Enter or edit classes <Icon name="plus" size={14}/></button></div>
      </section>
      <form className="panel preferences-panel" onSubmit={save}>
        <div className="step-heading"><span>02</span><div><h2>Semester and attendance target</h2><p>These settings are saved to your student account.</p></div></div>
        <div className="form-grid">
          <label className="field">Semester starts<input type="date" required value={settings.semesterStart} onChange={event=>change('semesterStart',event.target.value)}/></label>
          <label className="field">Semester ends<input type="date" required min={settings.semesterStart} value={settings.semesterEnd} onChange={event=>change('semesterEnd',event.target.value)}/></label>
          <label className="field">Attendance target per subject (%)<input type="number" min="1" max="100" required value={settings.targetAttendance} onChange={event=>change('targetAttendance',Number(event.target.value))}/></label>
          <label className="field">Maximum classes per day<select value={settings.maxClassesPerDay} onChange={event=>change('maxClassesPerDay',Number(event.target.value))}>{Array.from({length:12},(_,i)=>i+1).map(count=><option key={count} value={count}>{count} {count===1?'class':'classes'}</option>)}</select></label>
        </div>
        <div className="availability-heading"><h3>Your repeating weekly availability</h3><span className="tag">LUNCH 13:00–13:30</span></div><p className="helper-text">Choose different start and end times for each weekday. A class must fit completely inside your window; its original time is never moved.</p>
        <div className="availability-list">{days.map(day=><div className="availability-row" key={day}>
          <label className="availability-day"><input type="checkbox" aria-label={'Available on '+day} checked={settings.availability[day].enabled} onChange={event=>changeDay(day,'enabled',event.target.checked)}/><b>{day}</b></label>
          <label className="field">From<input type="time" required min="09:00" max="18:00" disabled={!settings.availability[day].enabled} value={settings.availability[day].start} onChange={event=>changeDay(day,'start',event.target.value)}/></label>
          <label className="field">Until<input type="time" required min="09:00" max="18:00" disabled={!settings.availability[day].enabled} value={settings.availability[day].end} onChange={event=>changeDay(day,'end',event.target.value)}/></label>
          <span>{settings.availability[day].enabled?'Available':'Day off'}</span>
        </div>)}</div>
        <p className="helper-text">Saturday/Sunday, lunch and classes outside 09:00–18:00 are excluded. End your availability at 17:30 if that is your college’s closing time.</p>
        <Notice>National holidays on 26 January, 15 August and 2 October are excluded automatically. Other university closures must be maintained in the college calendar by the administrator.</Notice>
        {dirty && <p className="helper-text">You have unsaved changes. Generate the plan to apply them.</p>}
        <button className="button button-primary" disabled={!!busy||editing}>{busy==='plan'?'Generating plan…':'Save & generate personalized plan'}<Icon name="calendar" size={17}/></button>
      </form>
    </div><aside className="planner-aside"><section className="plan-guide"><span className="eyebrow">HOW YOUR PLAN IS CALCULATED</span><h2>Actual classes.<br/>Your availability.<br/><em>A weekly plan.</em></h2><div className="guide-art"><Icon name="calendar" size={70}/></div><div className="guide-item"><Icon name="check"/><div><b>Semester-aware targets</b><p>All remaining classes count, including those outside your availability.</p></div></div><div className="guide-item"><Icon name="clock"/><div><b>Exact weekday hours</b><p>No evening slots, weekends or lunch-time classes.</p></div></div><div className="guide-item"><Icon name="warning"/><div><b>Honest shortfall reporting</b><p>If your target is not achievable, review the extra sessions and changes required.</p></div></div></section></aside></div>
    {editing && <section className="panel timetable-editor">
      <div className="section-heading"><div><span className="eyebrow">REVIEW BEFORE SAVING</span><h2>Confirm your weekly classes</h2></div><button type="button" className="button button-secondary" disabled={!!busy} onClick={()=>setEditing(false)}>Cancel edits</button></div>
      {reference?.image && <div className="timetable-reference"><img src={reference.url} alt="Uploaded timetable reference"/><p>Image recognition is not configured. Enter the class details from this reference.</p></div>}
      {reference&&!reference.image&&<a className="text-button" href={reference.url} target="_blank" rel="noreferrer">Open original file for reference</a>}
      <form onSubmit={saveEntries}>{entries.map((entry,index)=><div className="editor-row" key={index}>
        <label className="field">Subject<input required value={entry.subject} onChange={event=>editEntry(index,'subject',event.target.value)}/></label>
        <label className="field">Day<select value={entry.day} onChange={event=>editEntry(index,'day',event.target.value)}>{fullDays.map(day=><option key={day}>{day}</option>)}</select></label>
        <label className="field">Start<input type="time" required min="09:00" max="17:59" value={String(entry.time||'').padStart(5,'0')} onChange={event=>editEntry(index,'time',event.target.value)}/></label>
        <label className="field">Minutes<input type="number" required min="1" max="270" value={entry.duration} onChange={event=>editEntry(index,'duration',Number(event.target.value))}/></label>
        <button type="button" className="icon-button" aria-label={'Remove class '+(index+1)} onClick={()=>setEntries(old=>old.filter((_,i)=>i!==index))}><Icon name="close"/></button>
      </div>)}<p className="helper-text">Classes must end by 18:00, must not overlap each other, and cannot cross the 13:00–13:30 lunch break. Split a long session only if your official timetable lists separate classes.</p><div className="button-row"><button type="button" className="button button-secondary" onClick={()=>setEntries(old=>[...old,newClass()])}><Icon name="plus" size={16}/>Add class</button><button className="button button-primary" disabled={!!busy}>{busy==='timetable'?'Saving…':'Confirm & save timetable'}<Icon name="check" size={16}/></button></div></form>
    </section>}
    {!dirty && !editing && <PersonalizedPlan plan={plan}/>}
    <WeeklyTimetable schedule={schedule} onUpload={openEditor}/>
  </div>;
}
