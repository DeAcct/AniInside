import { registerSW } from "virtual:pwa-register";
import "./components/AiApp/AiApp";
import "./components/AiHeader/AiHeader";
import "./components/AnimeCard/AnimeCard";
import "./components/AnimeList/AnimeList";
import "./components/CoverModal/CoverModal";
import "./components/DaySelector/DaySelector";
import "./components/ErrorView/ErrorView";
import "./components/HamburgerButton/HamburgerButton";
import "./components/IconBase/IconBase";
import "./components/AiToggle/AiToggle";
import "./components/LoadingBar/LoadingBar";
import "./components/OptimizedImage/OptimizedImage";
import "./components/RouterLink/RouterLink";
import "./components/RouterProvider/RouterProvider";
import "./components/SliceParagraph/SliceParagraph";
import "./components/StarRating/StarRating";
import "./components/StickyRenderer/StickyRenderer";
import "./components/TagList/TagList";
import "./components/TeleportPortal/TeleportPortal";

import "./reset.scss";
import "./color.scss";

const mountPosition = document.getElementById("app");
const App = document.createElement("ai-app");
mountPosition.appendChild(App);

const updateSW = registerSW();
