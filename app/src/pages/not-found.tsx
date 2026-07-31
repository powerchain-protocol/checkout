import { ArrowLeftIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export function NotFoundPage() {
  return (
    <main className="route-state route-state--centered">
      <Card className="route-state__card">
        <CardContent>
          <Badge variant="warning">404 · route not found</Badge>
          <span className="route-state__icon" aria-hidden="true">
            <MagnifyingGlassIcon width={30} height={30} />
          </span>
          <h1>This workspace page does not exist.</h1>
          <p>
            The address may be outdated, or the feature is not enabled for this
            merchant environment.
          </p>
          <a className="primary-button route-state__link" href="#overview">
            <ArrowLeftIcon />
            Return to overview
          </a>
        </CardContent>
      </Card>
    </main>
  );
}
