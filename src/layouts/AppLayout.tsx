import { Link, NavLink, Outlet } from 'react-router-dom';
import { BarChart3, Cog, FileText, Home, Menu, ShieldCheck, Users } from 'lucide-react';
import { useUIStore } from '@/store/ui-store';
import { Button } from '@/components/ui';

const navItems = [
  ['dashboard', 'dashboard', BarChart3],
  ['players', 'players', Users],
  ['teams', 'teams', ShieldCheck],
  ['matches', 'matches', Home],
  ['market', 'market', BarChart3],
  ['scoring', 'scoring', FileText],
  ['settings', 'settings', Cog],
  ['manuals', 'manuals', FileText],
] as const;

export function AppLayout() {
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex">
        <aside className={`border-r border-slate-800 p-4 transition-all ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden p-0'} md:w-64`}>
          <Link to="dashboard" className="block p-2 text-lg font-semibold">SoccerIQ <span className="text-emerald-500">Moneyball Platform</span></Link>
          <nav className="mt-6 space-y-1">
            {navItems.map(([label, to, Icon]) => (
              <NavLink key={to} to={to} className={({ isActive }) => `flex items-center gap-2 rounded-xl p-3 text-sm ${isActive ? 'bg-slate-900 text-emerald-400' : 'text-slate-300'}`}>
                <Icon size={16} /> {label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <div className="flex-1 p-4 md:p-6">
          <div className="mb-4 flex justify-between">
            <Button className="md:hidden" onClick={toggleSidebar}><Menu size={16} /></Button>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
