import { Card, Select } from '@/components/ui';
import { useUIStore } from '@/store/ui-store';

export function SettingsPage() {
  const { theme, setTheme, role, setRole } = useUIStore();
  return (
    <Card className='space-y-3'>
      <h1 className='text-xl font-semibold'>Settings</h1>
      <label className='block'>Theme<Select value={theme} onChange={(e) => setTheme(e.target.value as 'dark' | 'light')}><option value='dark'>Dark</option><option value='light'>Light</option></Select></label>
      <label className='block'>Role<Select value={role} onChange={(e) => setRole(e.target.value as 'admin' | 'scout')}><option value='admin'>Admin</option><option value='scout'>Scout</option></Select></label>
    </Card>
  );
}
