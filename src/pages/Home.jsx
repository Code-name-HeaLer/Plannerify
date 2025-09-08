import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, Plus, Search, Menu, X, CalendarDays, Notebook, Settings, Home as HomeIcon, TrendingUp } from 'lucide-react';

const Home = ({ darkMode, setDarkMode }) => {
    const navigate = useNavigate();
    const [greeting, setGreeting] = useState('');
    const [entries, setEntries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) setGreeting('Good Morning');
        else if (hour >= 12 && hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');

        // Load entries from localStorage
        const savedEntries = JSON.parse(localStorage.getItem('plannerEntries') || '[]');
        setEntries(savedEntries.sort((a, b) => new Date(b.date) - new Date(a.date)));
    }, []);

    const filteredEntries = entries.filter(entry =>
        entry.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.mood.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getMoodEmoji = (mood) => {
        const moods = {
            'happy': '😊',
            'sad': '😢',
            'neutral': '😐',
            'excited': '🎉',
            'tired': '😴',
            'angry': '😠'
        };
        return moods[mood] || '😊';
    };

    return (
        <div className="min-h-screen">
            {/* Mobile top bar */}
            <div className="md:hidden sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between px-4 py-3">
                    <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="text-lg font-semibold">{greeting}, HeaLer</div>
                    <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                        {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <aside className={`fixed md:static inset-y-0 left-0 z-30 w-72 transform md:transform-none transition-transform duration-200 ease-in-out bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                    <div className="flex items-center justify-between px-4 py-4 md:py-6 border-b border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">DP</div>
                            <div className="font-semibold">Daily Planner</div>
                        </div>
                        <button onClick={() => setSidebarOpen(false)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <nav className="p-4 space-y-1">
                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
                            <HomeIcon className="w-5 h-5" />
                            <span>Dashboard</span>
                        </button>
                        <button onClick={() => navigate('/planner')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
                            <Notebook className="w-5 h-5" />
                            <span>New Entry</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
                            <CalendarDays className="w-5 h-5" />
                            <span>Calendar</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
                            <Settings className="w-5 h-5" />
                            <span>Settings</span>
                        </button>
                    </nav>

                    <div className="mt-auto p-4 hidden md:block">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white">
                            <div className="font-semibold mb-1">Stay consistent!</div>
                            <div className="text-white/90 text-sm">Track your day and improve habits.</div>
                        </div>
                    </div>
                </aside>

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 md:hidden" />
                )}

                {/* Main content */}
                <main className="flex-1 md:ml-0 md:pl-0 ml-0 md:pr-0 w-full md:w-auto">
                    <div className="px-4 md:px-8 py-6 md:py-8">
                        {/* Desktop header */}
                        <header className="hidden md:flex justify-between items-center mb-8">
                            <div className="text-2xl font-bold text-gray-800 dark:text-white">
                                {greeting}, HeaLer
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                                </button>
                                <button
                                    onClick={() => navigate('/planner')}
                                    className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    <Plus className="w-5 h-5" />
                                    New Entry
                                </button>
                            </div>
                        </header>

                        {/* Search and quick actions */}
                        <div className="mb-6">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search entries..."
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Quick stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <div className="stat-card">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Total Entries</div>
                                        <div className="text-2xl font-semibold">{entries.length}</div>
                                    </div>
                                    <Notebook className="w-6 h-6 text-primary" />
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">This Month</div>
                                        <div className="text-2xl font-semibold">{entries.filter(e => new Date(e.date).getMonth() === new Date().getMonth()).length}</div>
                                    </div>
                                    <CalendarDays className="w-6 h-6 text-primary" />
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Most Common Mood</div>
                                        <div className="text-2xl font-semibold">
                                            {(() => {
                                                const counts = entries.reduce((acc, e) => { acc[e.mood] = (acc[e.mood] || 0) + 1; return acc; }, {});
                                                const mood = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
                                                return mood ? `${mood} ${getMoodEmoji(mood)}` : '—';
                                            })()}
                                        </div>
                                    </div>
                                    <TrendingUp className="w-6 h-6 text-primary" />
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Water Streak (max)</div>
                                        <div className="text-2xl font-semibold">{entries.reduce((max, e) => Math.max(max, e.waterIntake || 0), 0)}</div>
                                    </div>
                                    <span className="text-primary text-2xl">💧</span>
                                </div>
                            </div>
                        </div>

                        {/* Entries grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredEntries.map((entry, index) => (
                                <div
                                    key={index}
                                    onClick={() => navigate('/planner', { state: { entry } })}
                                    className="entry-card cursor-pointer"
                                >
                                    {/* Mood accent bar */}
                                    <span
                                        className={`entry-accent ${entry.mood === 'happy' ? 'bg-green-500' :
                                            entry.mood === 'sad' ? 'bg-blue-500' :
                                                entry.mood === 'neutral' ? 'bg-gray-400' :
                                                    entry.mood === 'excited' ? 'bg-purple-500' :
                                                        entry.mood === 'tired' ? 'bg-amber-500' :
                                                            entry.mood === 'angry' ? 'bg-red-500' :
                                                                'bg-primary'
                                            }`}
                                    />
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">{entry.date}</h3>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {entry.goals?.slice(0, 100)}...
                                            </p>
                                        </div>
                                        <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                                        {entry.weather && <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700">Weather: {entry.weather}</span>}
                                        {Array.isArray(entry.todos) && entry.todos.length > 0 && (
                                            <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700">
                                                Tasks: {entry.todos.filter(t => t.completed).length}/{entry.todos.length}
                                            </span>
                                        )}
                                        {entry.waterIntake ? <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700">Water: {entry.waterIntake}</span> : null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Home;