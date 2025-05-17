import useLogout from "../../utils/hooks/logout";

// Sidebar.tsx
type SidebarProps = {
  onSelectMenu: (menu: string) => void;
};

export default function Sidebar({ onSelectMenu }: SidebarProps) {
  return (
    <aside className="text-white bg-blue-400 w-2/12 flex flex-col items-start justify-center p-8 gap-4">
      <a onClick={() => onSelectMenu("project")} className="cursor-pointer">Project</a>
      <a onClick={() => onSelectMenu("work")} className="cursor-pointer">Work Experience</a>
      <a onClick={() => onSelectMenu("projectExp")} className="cursor-pointer">Project Experience</a>
      
      {/* LOGOUT */}
      <a onClick={useLogout()} className="cursor-pointer">Logout</a>
    </aside>
  );
}
