import {
  BellIcon,
  CodeIcon,
  DashboardIcon,
  GearIcon,
  InfoCircledIcon,
  ReaderIcon,
  GlobeIcon,
  CubeIcon,
} from "@radix-ui/react-icons";
import type { AppRoute } from "../../hooks/use-hash-route";

const items: Array<{
  route: Exclude<AppRoute, "not-found">;
  label: string;
  icon: typeof DashboardIcon;
}> = [
  { route: "overview", label: "Overview", icon: DashboardIcon },
  { route: "informations", label: "Information", icon: InfoCircledIcon },
  { route: "alarms", label: "Alarms", icon: BellIcon },
  { route: "testarea", label: "Test area", icon: CodeIcon },
  { route: "checkout", label: "Checkout", icon: ReaderIcon },
  { route: "cross-border", label: "Cross-border", icon: GlobeIcon },
  { route: "sui", label: "Sui network", icon: CubeIcon },
];

export function Sidebar({ activeRoute }: { activeRoute: AppRoute }) {
  return (
    <aside className="sidebar">
      <nav className="sidebar-section" aria-label="Workspace">
        <span className="sidebar-label">Workspace</span>
        {items.map(({ route, label, icon: Icon }) => (
          <a
            key={route}
            href={`#/${route}`}
            className={activeRoute === route ? "selected" : ""}
            aria-current={activeRoute === route ? "page" : undefined}
          >
            <Icon width={17} height={17} />
            {label}
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="merchant-avatar">AC</div>
        <div>
          <strong>Atlas Commerce</strong>
          <small>Merchant sandbox</small>
        </div>
        <button aria-label="Merchant settings" type="button">
          <GearIcon />
        </button>
      </div>
    </aside>
  );
}
