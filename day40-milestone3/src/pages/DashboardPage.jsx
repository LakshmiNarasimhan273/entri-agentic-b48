// The original dashboard is a static design (fixed numbers and activity items), kept as-is.
const STATS = [
  { value: '120', label: 'Total Contacts' },
  { value: '45', label: 'Total Leads' },
  { value: '$150k', label: 'Deals Won' },
  { value: '8', label: 'Pending Tasks' },
];

const ACTIVITY = [
  { icon: 'fa-user-plus', title: 'New contact added: John Doe', time: '2 hours ago' },
  { icon: 'fa-dollar-sign', title: 'Deal Won: Project Alpha', time: '5 hours ago' },
  { icon: 'fa-tasks', title: 'Task Completed: Call Jane Smith', time: 'Yesterday' },
];

export default function DashboardPage() {
  return (
    <>
      <div className="dashboard-grid">
        {STATS.map((s) => (
          <div className="card dashboard-card" key={s.label}>
            <div className="card-body">
              <div className="value">{s.value}</div>
              <div className="label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">Recent Activity</div>
        <div className="card-body activity-list">
          {ACTIVITY.map((a) => (
            <div className="activity-item" key={a.title}>
              <i className={`activity-icon fas ${a.icon}`}></i>
              <div className="activity-details">
                <div className="title">{a.title}</div>
                <div className="time">{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
