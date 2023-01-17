import DAY from "@/constants/day";
import { usePathName } from "./location";
import { useCustomEvent } from "./event";
export function useRouter(to, method) {
  if (usePathName() === to.replace("/", "")) {
    return;
  }
  const path = to === "/" ? `/${new DAY().now}` : to;
  useCustomEvent("history-change", {
    detail: {
      path,
      method: method ? "replace" : "push",
    },
  });
}
