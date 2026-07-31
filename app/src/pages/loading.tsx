import {
  StartupScreen,
  type StartupPhase,
} from "../components/system/StartupScreen";

export function LoadingPage({
  phase = "networks",
}: {
  phase?: StartupPhase;
}) {
  return <StartupScreen phase={phase} compact />;
}
