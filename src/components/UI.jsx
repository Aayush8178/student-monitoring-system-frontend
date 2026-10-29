import Icon from './Icon';
export function PageHeader({ eyebrow, title, description, action }) { return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action}</div>; }
export function StatCard({ label, value, detail, icon, tone = '' }) { return <div className={'stat-card ' + tone}><div className="stat-top"><span>{label}</span><span className="stat-icon"><Icon name={icon}/></span></div><strong>{value}</strong><p>{detail}</p></div>; }
export function EmptyState({ title, children, icon = 'book' }) { return <div className="empty-state"><span className="empty-icon"><Icon name={icon} size={26}/></span><h3>{title}</h3><p>{children}</p></div>; }
export function Notice({ children, error = false }) { return <div className={'notice ' + (error ? 'notice-error' : '')} role={error ? 'alert' : 'status'}><Icon name={error ? 'warning' : 'calendar'}/><div>{children}</div></div>; }
export function LoadingState() { return <div className="loading-grid" aria-label="Loading dashboard" role="status">{[1,2,3,4,5,6].map(n=><div key={n} className="loading-block"/>)}</div>; }
