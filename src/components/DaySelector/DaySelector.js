const DAY_DATA = [
  {
    key: "sunday",
    day: "일",
  },
  {
    key: "monday",
    day: "월",
  },
  {
    key: "tuesday",
    day: "화",
  },
  {
    key: "wednesday",
    day: "수",
  },
  {
    key: "thursday",
    day: "목",
  },
  {
    key: "friday",
    day: "금",
  },
  {
    key: "saturday",
    day: "토",
  },
];

class DaySelector extends Component {
  template() {
    return `<ul>
      ${DAY_DATA.map(
        (data) => `
          <styled-button>${data.day}요일</styled-button>
        `
      )}
    </ul>
    
    `;
  }
}
