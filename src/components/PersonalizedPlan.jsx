import { useState } from 'react';
import Icon from './Icon';
import { EmptyState, Notice } from './UI';
import DataTable from './DataTable';
const days = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
const addDays = (date, amount) => new Date(Date.parse(date+'T00:00:00Z')+amount*86400000).toISOString().slice(0,10);
const label = date => new Date(date+'T00:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'short',timeZone:'UTC'});
export default function PersonalizedPlan({plan}) {
  const [weekIndex,setWeekIndex] = useState(0);
  if (!plan?.status) return <section className="panel recommendations-panel"><EmptyState title="Your personalized plan will appear here" icon="calendar">Save your timetable, semester dates and weekday availability to generate a plan.</EmptyState></section>;
  if (plan.setupRequired) return <Notice error={plan.status==='review_required'}>{plan.summary}</Notice>;
  const startDay = new Date(plan.planningStart+'T00:00:00Z').getUTCDay();
  const firstMonday = addDays(plan.planningStart,-((startDay+6)%7));
  const weekCount = Math.max(1,Math.ceil((Date.parse(plan.semesterEnd)-Date.parse(firstMonday)+86400000)/(7*86400000)));
  const selectedWeek = Math.min(weekIndex,weekCount-1);
  const monday = addDays(firstMonday,selectedWeek*7);
  return <section className="panel personalized-plan">
    <div className="section-heading"><div><span className="eyebrow">YOUR PERSONALIZED ATTENDANCE PLAN</span><h2>Recommended classes by week</h2></div><span className="tag">TARGET {plan.targetAttendance}% PER SUBJECT</span></div>
    <Notice error={!plan.feasible}>{plan.summary}</Notice>
    <div className="plan-metrics"><div><span>Selected sessions</span><strong>{plan.sessions.length}</strong></div><div><span>Projected overall attendance</span><strong>{plan.projectedAttendance===null?'—':plan.projectedAttendance+'%'}</strong></div><div><span>Additional sessions needed</span><strong>{plan.shortage}</strong></div></div>
    {plan.status!=='complete'&&<><div className="plan-week-toolbar"><label className="field">View week<select value={selectedWeek} onChange={event=>setWeekIndex(Number(event.target.value))}>{Array.from({length:weekCount},(_,index)=><option key={index} value={index}>{label(addDays(firstMonday,index*7))} – {label(addDays(firstMonday,index*7+4))}</option>)}</select></label><span>Lunch 13:00–13:30 · Weekends off</span></div>
    <div className="week-scroll"><div className="week-grid">{days.map((day,index)=>{
      const date=addDays(monday,index),sessions=plan.sessions.filter(session=>session.date===date);
      const off=plan.holidays.includes(date),outside=date<plan.planningStart||date>plan.semesterEnd;
      return <div className="week-day" key={date}><div className="day-heading">{day.slice(0,3).toUpperCase()}<span>{label(date)}</span></div><div className="day-classes">{outside?<p className="day-empty">Outside planning period</p>:off?<p className="day-empty holiday-day">Holiday · no classes</p>:sessions.length?sessions.map((session,i)=><div className={'class-block class-color-'+(i%4)} key={session.subject+session.time}><span className="class-time">{session.time}</span><strong>{session.subject}</strong><small>{session.duration} min · Attend</small></div>):<p className="day-empty">No attendance recommended this day</p>}</div></div>;
    })}</div></div></>}
    <h3 className="plan-subheading">Subject projections</h3><DataTable rowKey="subject" data={plan.recommendations} columns={[
      {key:'subject',label:'Subject'},
      {key:'currentAttendance',label:'Current',render:value=>value===null?'No records':value+'%'},
      {key:'remainingClasses',label:'Remaining classes'},
      {key:'requiredSessions',label:'Required attendance'},
      {key:'selectedClasses',label:'Selected'},
      {key:'projectedAttendance',label:'Projected',render:value=>value===null?'—':value+'%'},
      {key:'shortage',label:'Shortfall',render:value=><b className={value?'text-danger':'text-green'}>{value}</b>},
    ]}/>
    {plan.recommendations.filter(subject=>subject.shortage>0).map(subject=><div className="plan-shortfall" key={subject.subject}><Icon name="warning" size={18}/><div><b>{subject.subject}: {subject.shortage} additional sessions needed</b><p>{subject.reason}</p>{subject.additionalOptions.length>0&&<p>Other scheduled sessions to consider: {subject.additionalOptions.map(session=>label(session.date)+' at '+session.time).join('; ')}. These are options to review, not an automatically feasible replacement plan.</p>}</div></div>)}
    <details className="plan-assumptions"><summary>Calendar and calculation assumptions</summary><ul>{plan.assumptions.map(text=><li key={text}>{text}</li>)}</ul></details>
  </section>;
}
