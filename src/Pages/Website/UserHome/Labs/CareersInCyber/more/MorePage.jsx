import { useParams } from "react-router-dom";
import { lazy, Suspense } from "react";

const morePageMap = {
  ShowMore1: lazy(() => import("./cyberAnalyst.jsx")),
  ShowMore2: lazy(() => import("./DigitalForensicsExaminer.jsx")),
  ShowMore3: lazy(() => import("./IncidentResponder.jsx")),
  ShowMore4: lazy(() => import("./MalwareAnalyst.jsx")),
  ShowMore5: lazy(() => import("./PenetrationTester.jsx")),
  ShowMore6: lazy(() => import("./RedTeamer.jsx")),
  ShowMore7: lazy(() => import("./SecurityEngineer.jsx")),
};

export default function MorePage() {
  const { page } = useParams();

  const Component = morePageMap[page];
  if (!Component) return <p>Page not found</p>;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
}
