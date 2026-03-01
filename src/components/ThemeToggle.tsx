'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full border border-border/50">
      <Sun className={`w-4 h-4 transition-colors ${theme === 'light' ? 'text-orange-500' : 'text-muted-foreground'}`} />
      <Switch 
        checked={theme === 'dark'} 
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-primary"
      />
      <Moon className={`w-4 h-4 transition-colors ${theme === 'dark' ? 'text-primary' : 'text-muted-foreground'}`} />
    </div>
  );
}
