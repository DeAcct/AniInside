import { DAY_DATA } from "@/constants/day";
export default function useRouter(to, method) {
  const path = to === "/" ? `/${DAY_DATA[new Date().getDay()].day}` : to;
  console.log(path);
  const historyEvent = new CustomEvent("history-change", {
    detail: {
      path,
      method: method ? method : "push",
    },
  });
  dispatchEvent(historyEvent);
}
