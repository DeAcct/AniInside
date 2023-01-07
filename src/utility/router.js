import DAY from "@/constants/day";
import { usePathName } from "./location";
export function useRouter(to, method) {
  if (usePathName() === to.replace("/", "")) {
    return;
  }
  const path = to === "/" ? `/${new DAY().now}` : to;
  const historyEvent = new CustomEvent("history-change", {
    detail: {
      path,
      method: method ? "replace" : "push",
    },
  });
  window.dispatchEvent(historyEvent);
}
