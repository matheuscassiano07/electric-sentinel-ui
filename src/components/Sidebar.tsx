import { cn } from "@/lib/utils";
import { Activity, BarChart3, Settings, Zap } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Activity },
    { id: "reports", label: "Relatórios IA", icon: BarChart3 },
    { id: "settings", label: "Configurações", icon: Settings },
  ];

  return (
    <div className="w-64 h-screen bg-sidebar border-r border-sidebar-border">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow-primary">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-sidebar-foreground">
            Sentinela Elétrico
          </h1>
        </div>

        <nav className="space-y-2">
          {menuItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                activeTab === id
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow-primary"
                  : "text-sidebar-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};