import DAY from "@/constants/day";
export default function useRouter(to, method) {
  const path = to === "/" ? `/${new DAY().now}` : to;
  const historyEvent = new CustomEvent("history-change", {
    detail: {
      path,
      method: method ? "replace" : "push",
    },
  });
  window.dispatchEvent(historyEvent);
}
