import "./components/RouterLink/RouterLink";
import "./components/RouterProvider/RouterProvider";
import "./components/AiApp/AiApp";
import "./components/AiHeader/AiHeader";
import "./components/StickyRenderer/StickyRenderer";
import "./components/DaySelector/DaySelector";
import "./components/HamburgerButton/HamburgerButton";
import "./components/StarRating/StarRating";
import "./components/AnimeList/AnimeList";
import "./components/AnimeCard/AnimeCard";
import "./components/OptimizedImage/OptimizedImage";
import "./components/TagList/TagList";

import "./reset.scss";
import "./color.scss";

const mountPosition = document.getElementById("app");
const App = document.createElement("ai-app");
mountPosition.appendChild(App);
