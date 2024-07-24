import { flushSync } from "react-dom";
import { createRoot } from 'react-dom/client';

export function renderToString(component: React.ReactNode) {
  const div = document.createElement("div");
  const root = createRoot(div);
  flushSync(() => {
    root.render(component);
  });
  return div.innerHTML;
}
