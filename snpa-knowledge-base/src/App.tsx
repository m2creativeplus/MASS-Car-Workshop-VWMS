import { useState, useEffect, useCallback } from 'react';
import './App.css';

// Types
interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  category: string;
  source: string;
  createdAt: string;
  tags: string[];
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  project?: string;
  timeSpent: number; // minutes
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  progress: number;
  tasks: number;
  completedTasks: number;
}

// Sample Data - SNPA Knowledge Base
const sampleKnowledge: KnowledgeItem[] = [
  {
    id: '1',
    title: 'SNPA Overview',
    content: 'SNPA (Somaliland National Productivity Agency) is a strategic initiative focused on enhancing national productivity through digital transformation, capacity building, and policy reform.',
    category: 'Overview',
    source: 'ChatGPT Conversation',
    createdAt: '2026-01-07',
    tags: ['strategy', 'government', 'productivity']
  },
  {
    id: '2',
    title: 'Digital Transformation Framework',
    content: 'The SNPA digital transformation framework encompasses e-government services, data-driven decision making, and citizen-centric service delivery models.',
    category: 'Framework',
    source: 'Policy Document',
    createdAt: '2026-01-06',
    tags: ['digital', 'framework', 'e-government']
  },
  {
    id: '3',
    title: 'Productivity Metrics',
    content: 'Key productivity indicators include GDP per capita growth, labor force participation, digital adoption rates, and public service efficiency scores.',
    category: 'Metrics',
    source: 'Research',
    createdAt: '2026-01-05',
    tags: ['metrics', 'KPIs', 'measurement']
  },
  {
    id: '4',
    title: 'Capacity Building Programs',
    content: 'SNPA capacity building includes training programs for civil servants, digital literacy initiatives, and partnerships with international organizations.',
    category: 'Programs',
    source: 'ChatGPT Conversation',
    createdAt: '2026-01-04',
    tags: ['training', 'capacity', 'skills']
  },
  {
    id: '5',
    title: 'Policy Reform Roadmap',
    content: 'The policy reform roadmap outlines legislative changes, regulatory frameworks, and institutional restructuring needed to support productivity goals.',
    category: 'Policy',
    source: 'Strategic Plan',
    createdAt: '2026-01-03',
    tags: ['policy', 'reform', 'legislation']
  }
];

const sampleTasks: Task[] = [
  { id: '1', title: 'Complete SNPA Strategy Document', description: 'Finalize the national productivity strategy', status: 'in-progress', priority: 'high', project: 'SNPA Core', timeSpent: 240 },
  { id: '2', title: 'Design Productivity Dashboard', description: 'Create interactive dashboard for tracking KPIs', status: 'todo', priority: 'high', project: 'SNPA Core', timeSpent: 0 },
  { id: '3', title: 'Stakeholder Interviews', description: 'Conduct interviews with ministry representatives', status: 'done', priority: 'medium', project: 'Research', timeSpent: 180 },
  { id: '4', title: 'Data Collection Framework', description: 'Establish data collection methodology', status: 'in-progress', priority: 'medium', project: 'Research', timeSpent: 120 },
  { id: '5', title: 'International Benchmarking', description: 'Compare with regional productivity agencies', status: 'todo', priority: 'low', project: 'Research', timeSpent: 0 },
];

const sampleProjects: Project[] = [
  { id: '1', name: 'SNPA Core Strategy', description: 'Core strategy development and documentation', status: 'active', progress: 65, tasks: 12, completedTasks: 8 },
  { id: '2', name: 'Digital Infrastructure', description: 'Technology infrastructure and systems', status: 'active', progress: 40, tasks: 8, completedTasks: 3 },
  { id: '3', name: 'Capacity Building', description: 'Training and development programs', status: 'on-hold', progress: 25, tasks: 6, completedTasks: 1 },
  { id: '4', name: 'Policy Reform', description: 'Legislative and regulatory changes', status: 'active', progress: 30, tasks: 10, completedTasks: 3 },
];

// Components
function Sidebar({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const tabs = [
    { id: 'knowledge', label: 'Knowledge Base', icon: '📚' },
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'tasks', label: 'Tasks', icon: '✓' },
    { id: 'productivity', label: 'Productivity', icon: '📊' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">SNPA</span>
        </div>
        <p className="logo-subtitle">Knowledge Hub</p>
      </div>
      <nav className="sidebar-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="nav-icon">{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="avatar">MA</div>
          <div className="user-details">
            <span className="user-name">Mahmoud Awaleh</span>
            <span className="user-role">Administrator</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function KnowledgeBase({ searchQuery }: { searchQuery: string }) {
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', ...new Set(sampleKnowledge.map(k => k.category))];
  
  const filteredItems = sampleKnowledge.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="knowledge-base">
      <div className="knowledge-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${filterCategory === cat ? 'active' : ''}`}
            onClick={() => setFilterCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      <div className="knowledge-grid">
        <div className="knowledge-list">
          {filteredItems.map(item => (
            <article
              key={item.id}
              className={`knowledge-card glass-card ${selectedItem?.id === item.id ? 'selected' : ''}`}
              onClick={() => setSelectedItem(item)}
            >
              <div className="knowledge-card-header">
                <span className="badge">{item.category}</span>
                <span className="knowledge-date">{item.createdAt}</span>
              </div>
              <h3>{item.title}</h3>
              <p className="knowledge-excerpt">{item.content.substring(0, 120)}...</p>
              <div className="knowledge-tags">
                {item.tags.map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
              <div className="knowledge-source">
                <span>Source: {item.source}</span>
              </div>
            </article>
          ))}
        </div>
        {selectedItem && (
          <div className="knowledge-detail glass-card animate-fade-in">
            <div className="detail-header">
              <span className="badge badge-success">{selectedItem.category}</span>
              <button className="btn btn-secondary" onClick={() => setSelectedItem(null)}>✕</button>
            </div>
            <h2>{selectedItem.title}</h2>
            <div className="detail-meta">
              <span>📅 {selectedItem.createdAt}</span>
              <span>📎 {selectedItem.source}</span>
            </div>
            <div className="detail-content">
              <p>{selectedItem.content}</p>
            </div>
            <div className="detail-tags">
              {selectedItem.tags.map(tag => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TasksView() {
  const [tasks, setTasks] = useState(sampleTasks);
  const [filter, setFilter] = useState<'all' | 'todo' | 'in-progress' | 'done'>('all');

  const filteredTasks = tasks.filter(t => filter === 'all' || t.status === filter);
  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const doneTasks = tasks.filter(t => t.status === 'done');

  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'badge-error';
      case 'medium': return 'badge-warning';
      default: return 'badge-success';
    }
  };

  return (
    <div className="tasks-view">
      <div className="tasks-stats">
        <div className="stat-card glass-card">
          <span className="stat-value">{tasks.length}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat-card glass-card">
          <span className="stat-value">{todoTasks.length}</span>
          <span className="stat-label">To Do</span>
        </div>
        <div className="stat-card glass-card">
          <span className="stat-value">{inProgressTasks.length}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-card glass-card">
          <span className="stat-value">{doneTasks.length}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>

      <div className="tasks-filters">
        {(['all', 'todo', 'in-progress', 'done'] as const).map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : f.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </button>
        ))}
      </div>

      <div className="tasks-kanban">
        <div className="kanban-column">
          <div className="column-header">
            <h3>📋 To Do</h3>
            <span className="count">{todoTasks.length}</span>
          </div>
          <div className="column-tasks">
            {todoTasks.map(task => (
              <div key={task.id} className="task-card glass-card">
                <div className="task-header">
                  <span className={`badge ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                  {task.project && <span className="task-project">{task.project}</span>}
                </div>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <div className="task-actions">
                  <button className="btn btn-primary" onClick={() => updateTaskStatus(task.id, 'in-progress')}>
                    Start →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="kanban-column">
          <div className="column-header">
            <h3>🔄 In Progress</h3>
            <span className="count">{inProgressTasks.length}</span>
          </div>
          <div className="column-tasks">
            {inProgressTasks.map(task => (
              <div key={task.id} className="task-card glass-card">
                <div className="task-header">
                  <span className={`badge ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                  {task.project && <span className="task-project">{task.project}</span>}
                </div>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <div className="task-time">
                  <span>⏱ {Math.floor(task.timeSpent / 60)}h {task.timeSpent % 60}m</span>
                </div>
                <div className="task-actions">
                  <button className="btn btn-secondary" onClick={() => updateTaskStatus(task.id, 'todo')}>
                    ← Back
                  </button>
                  <button className="btn btn-accent" onClick={() => updateTaskStatus(task.id, 'done')}>
                    Done ✓
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="kanban-column">
          <div className="column-header">
            <h3>✅ Done</h3>
            <span className="count">{doneTasks.length}</span>
          </div>
          <div className="column-tasks">
            {doneTasks.map(task => (
              <div key={task.id} className="task-card glass-card completed">
                <div className="task-header">
                  <span className={`badge ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                  {task.project && <span className="task-project">{task.project}</span>}
                </div>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <div className="task-time">
                  <span>⏱ {Math.floor(task.timeSpent / 60)}h {task.timeSpent % 60}m</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsView() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'badge-success';
      case 'completed': return 'badge-success';
      case 'on-hold': return 'badge-warning';
      default: return '';
    }
  };

  return (
    <div className="projects-view">
      <div className="projects-header">
        <h2>Projects</h2>
        <button className="btn btn-primary">+ New Project</button>
      </div>
      <div className="projects-grid">
        {sampleProjects.map(project => (
          <article key={project.id} className="project-card glass-card">
            <div className="project-header">
              <span className={`badge ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className="project-progress">
              <div className="progress-header">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="progress">
                <div className="progress-bar" style={{ width: `${project.progress}%` }}></div>
              </div>
            </div>
            <div className="project-stats">
              <span>{project.completedTasks}/{project.tasks} tasks</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProductivityDashboard() {
  const [activeTimer, setActiveTimer] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: number;
    if (activeTimer !== null) {
      interval = window.setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTimer]);

  const formatTime = useCallback((seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }, []);

  const totalTimeSpent = sampleTasks.reduce((acc, t) => acc + t.timeSpent, 0);
  const completedTasks = sampleTasks.filter(t => t.status === 'done').length;
  const completionRate = Math.round((completedTasks / sampleTasks.length) * 100);

  return (
    <div className="productivity-dashboard">
      <div className="dashboard-header">
        <h2>Productivity Dashboard</h2>
        <span className="date-display">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>

      <div className="productivity-stats">
        <div className="stat-card glass-card large">
          <div className="stat-icon">⏱</div>
          <div className="stat-content">
            <span className="stat-value">{Math.floor(totalTimeSpent / 60)}h {totalTimeSpent % 60}m</span>
            <span className="stat-label">Total Time Tracked</span>
          </div>
        </div>
        <div className="stat-card glass-card large">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <span className="stat-value">{completedTasks}</span>
            <span className="stat-label">Tasks Completed</span>
          </div>
        </div>
        <div className="stat-card glass-card large">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <span className="stat-value">{completionRate}%</span>
            <span className="stat-label">Completion Rate</span>
          </div>
        </div>
        <div className="stat-card glass-card large">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <span className="stat-value">{sampleProjects.filter(p => p.status === 'active').length}</span>
            <span className="stat-label">Active Projects</span>
          </div>
        </div>
      </div>

      <div className="timer-section glass-card">
        <h3>Focus Timer</h3>
        <div className="timer-display">
          <span className="timer-value">{formatTime(elapsedTime)}</span>
        </div>
        <div className="timer-controls">
          {activeTimer === null ? (
            <button className="btn btn-primary" onClick={() => setActiveTimer(Date.now())}>
              ▶ Start Timer
            </button>
          ) : (
            <>
              <button className="btn btn-secondary" onClick={() => { setActiveTimer(null); }}>
                ⏸ Pause
              </button>
              <button className="btn btn-accent" onClick={() => { setActiveTimer(null); setElapsedTime(0); }}>
                ⏹ Stop & Save
              </button>
            </>
          )}
        </div>
      </div>

      <div className="productivity-charts">
        <div className="chart-card glass-card">
          <h3>Weekly Progress</h3>
          <div className="bar-chart">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
              const height = Math.random() * 80 + 20;
              return (
                <div key={day} className="bar-item">
                  <div className="bar" style={{ height: `${height}%` }}></div>
                  <span className="bar-label">{day}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="chart-card glass-card">
          <h3>Project Distribution</h3>
          <div className="project-breakdown">
            {sampleProjects.map(project => (
              <div key={project.id} className="breakdown-item">
                <div className="breakdown-header">
                  <span>{project.name}</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="progress">
                  <div className="progress-bar" style={{ width: `${project.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('knowledge');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="app">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        <header className="main-header">
          <div className="search-container">
            <input
              type="text"
              className="input search-input"
              placeholder="Search knowledge base, tasks, projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary">🔔</button>
            <button className="btn btn-primary">+ Add New</button>
          </div>
        </header>
        <div className="content-area">
          {activeTab === 'knowledge' && <KnowledgeBase searchQuery={searchQuery} />}
          {activeTab === 'tasks' && <TasksView />}
          {activeTab === 'projects' && <ProjectsView />}
          {activeTab === 'productivity' && <ProductivityDashboard />}
        </div>
      </main>
    </div>
  );
}

export default App;
