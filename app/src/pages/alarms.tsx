import {
  BellIcon,
  CheckCircledIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  LightningBoltIcon,
} from "@radix-ui/react-icons";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const alarms = [
  {
    title: "RPC latency elevated",
    description: "Devnet public RPC is responding above the preferred 800 ms threshold.",
    time: "4 minutes ago",
    status: "Investigating",
    variant: "warning" as const,
    Icon: ClockIcon,
  },
  {
    title: "Settlement completed",
    description: "Batch PP-2048 settled successfully to the configured treasury.",
    time: "18 minutes ago",
    status: "Resolved",
    variant: "success" as const,
    Icon: CheckCircledIcon,
  },
  {
    title: "Merchant configuration incomplete",
    description: "A production fee treasury has not been configured.",
    time: "Today",
    status: "Action required",
    variant: "danger" as const,
    Icon: ExclamationTriangleIcon,
  },
];

export function AlarmsPage() {
  return (
    <main className="content page-content" id="alarms">
      <header className="page-heading">
        <div>
          <Badge variant="warning" dot>3 operational notices</Badge>
          <h1>Alarms and operational health</h1>
          <p>Prioritize RPC, settlement, wallet, and merchant configuration events.</p>
        </div>
        <button className="secondary-button" type="button">
          <BellIcon />
          Notification settings
        </button>
      </header>

      <section className="alarm-summary-grid">
        <Card tone="warning">
          <CardDescription>Open alarms</CardDescription>
          <strong className="summary-number">2</strong>
          <span>One requires merchant action</span>
        </Card>
        <Card tone="success">
          <CardDescription>Resolved today</CardDescription>
          <strong className="summary-number">7</strong>
          <span>Median response: 3m 42s</span>
        </Card>
        <Card>
          <CardDescription>RPC availability</CardDescription>
          <strong className="summary-number">99.98%</strong>
          <span>Rolling 30-day window</span>
        </Card>
      </section>

      <section className="alarm-list" aria-label="Operational alarms">
        {alarms.map(({ Icon, title, description, time, status, variant }) => (
          <Card key={title} className="alarm-item" interactive>
            <span className={`alarm-item__icon alarm-item__icon--${variant}`}>
              <Icon width={19} height={19} />
            </span>
            <div className="alarm-item__body">
              <CardHeader>
                <div>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </div>
                <Badge variant={variant}>{status}</Badge>
              </CardHeader>
              <div className="alarm-item__meta">
                <span>{time}</span>
                <button className="text-button" type="button">
                  <LightningBoltIcon /> Inspect event
                </button>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </main>
  );
}
