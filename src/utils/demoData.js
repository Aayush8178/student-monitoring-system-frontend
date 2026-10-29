// Explicit preview fixtures. Never substituted for failed live requests.
export const demoStudent = {_id:'demo-student',name:'Alex Morgan',attendedClasses:82,totalClasses:100,attendancePercentage:82,averageScore:86,totalTests:12,preferences:{targetAttendance:75,availableSlots:'morning',preferredDays:['Mon','Tue','Wed','Thu','Fri'],focusSubjects:[]}};
export const demoSchedule = [
 ['Mathematics','Monday','09:00',60],['Computer Science','Monday','11:00',60],['Physics','Monday','14:00',60],
 ['English','Tuesday','09:00',60],['Mathematics','Tuesday','11:00',60],
 ['Computer Science','Wednesday','09:00',60],['Physics','Wednesday','11:00',60],['English','Wednesday','14:00',60],
 ['Mathematics','Thursday','09:00',60],['Computer Science','Thursday','14:00',60],
 ['Physics','Friday','09:00',60],['English','Friday','11:00',60]
].map(([subject,day,time,duration])=>({subject,day,time,duration}));
export const demoAttendance = Array.from({length:10},(_,i)=>({_id:'attendance-'+i,subject:['Mathematics','Physics','English','Computer Science'][i%4],status:i===1||i===4?'absent':'present',date:new Date(2026,8,28-Math.floor(i/2)).toISOString()}));
export const demoAssessments = [['Mathematics',91],['Physics',78],['English',88],['Computer Science',87]].map(([subject,score],i)=>({_id:'assessment-'+i,subject,score,testDate:'2026-09-'+(24-i)}));
export const demoRecommendations = {summary:'Physics needs a little extra attention.',recommendations:[{subject:'Physics',currentAttendance:66.67,requiredSessions:4,priority:'REQUIRED',recommendedDates:[{day:'Wednesday',date:'2026-09-30',time:'11:00',duration:60},{day:'Friday',date:'2026-10-02',time:'09:00',duration:60}]}]};
export const demoStudents = [demoStudent,{_id:'2',name:'Jamie Chen',attendancePercentage:92,averageScore:89,riskLevel:'LOW'},{_id:'3',name:'Sam Rivera',attendancePercentage:58,averageScore:62,riskLevel:'HIGH'},{_id:'4',name:'Taylor Reed',attendancePercentage:88,averageScore:94,riskLevel:'LOW'},{_id:'5',name:'Jordan Lee',attendancePercentage:71,averageScore:38,riskLevel:'MEDIUM'}];
export const demoAlerts = [{_id:'a1',studentId:demoStudents[2],reason:'Low Attendance (<60%)',status:'pending'},{_id:'a2',studentId:demoStudents[4],reason:'Low Academic Performance (<40%)',status:'sent'}];
