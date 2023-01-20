import { registerSW } from "virtual:pwa-register";
import "./components/AiApp/AiApp";
import "./components/AiExpandable/AiExpandable";
import "./components/AiHeader/AiHeader";
import "./components/AiSelect/AiSelect";
import "./components/AiToggle/AiToggle";
import "./components/AnimeCard/AnimeCard";
import "./components/AnimeList/AnimeList";
import "./components/OverayUI/CoverModal/CoverModal";
import "./components/OverayUI/BottomSheet/BottomSheet";
import "./components/DaySelector/DaySelector";
import "./components/ErrorView/ErrorView";
import "./components/FrameHolder/FrameHolder";
import "./components/LoadingBar/LoadingBar";
import "./components/OptimizedImage/OptimizedImage";
import "./components/RouterLink/RouterLink";
import "./components/RouterProvider/RouterProvider";
import "./components/SliceParagraph/SliceParagraph";
import "./components/StarRating/StarRating";
import "./components/StickyRenderer/StickyRenderer";
import "./components/TagList/TagList";

import "./reset.scss";
import "./color.scss";

const mountPosition = document.body;
const App = document.createElement("ai-app");
mountPosition.insertBefore(App, mountPosition.firstChild);

const updateSW = registerSW();
