import { registerSW } from "virtual:pwa-register";
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
import "./components/ErrorView/ErrorView";
import "./components/LoadingBar/LoadingBar";
import "./components/IconBase/IconBase";
import "./components/CoverModal/CoverModal";
import "./components/SliceParagraph/SliceParagraph";
import "./components/StarSet/StarSet";
import "./components/TeleportPortal/TeleportPortal";

import "./reset.scss";
import "./color.scss";

const mountPosition = document.getElementById("app");
const App = document.createElement("ai-app");
mountPosition.appendChild(App);

const updateSW = registerSW();
