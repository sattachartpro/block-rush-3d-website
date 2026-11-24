export interface GameScreenshot {
  id: string;
  filename: string;
  src: string;
  title: string;
  caption: string;
  alt: string;
  width: number;
  height: number;
}

const BASE_URL = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

function screenshotUrl(filename: string): string {
  return `${BASE_URL}screenshots/${filename}`;
}

export const GAME_SCREENSHOTS: GameScreenshot[] = [
  {
    id: 'active-gameplay-track',
    filename: 'IMG_20261123_182012.jpg',
    src: screenshotUrl('IMG_20261123_182012.jpg'),
    title: 'Active 3D Gameplay',
    caption: 'Live run showing score, distance, coins, stacked blocks, color gates, and slide/jump controls.',
    alt: 'BLOCK RUSH 3D active gameplay on a 3-lane track with score HUD, coins, color gates, and slide/jump buttons',
    width: 1076,
    height: 2212,
  },
  {
    id: 'home-menu-modes',
    filename: 'IMG_20261123_181916.jpg',
    src: screenshotUrl('IMG_20261123_181916.jpg'),
    title: 'Home Screen & Modes',
    caption: 'Main lobby featuring Endless, Lvl 1, Daily, and Practice modes with high score display.',
    alt: 'BLOCK RUSH 3D main menu displaying Endless, Lvl 1, Daily, and Practice game modes',
    width: 1076,
    height: 2024,
  },
  {
    id: 'run-summary-revive',
    filename: 'IMG_20261123_182021.jpg',
    src: screenshotUrl('IMG_20261123_182021.jpg'),
    title: 'Run Summary & Revive',
    caption: 'Post-run results showing final score, distance, gates solved, coins earned, and revive option.',
    alt: 'BLOCK RUSH 3D run summary screen showing final score, distance, coins earned, and revive button',
    width: 1076,
    height: 2204,
  },
  {
    id: 'arcade-missions',
    filename: 'IMG_20261123_181930.jpg',
    src: screenshotUrl('IMG_20261123_181930.jpg'),
    title: 'Arcade Missions',
    caption: 'Track mission progress across block collection, level clears, distance, and coin milestones.',
    alt: 'BLOCK RUSH 3D Arcade Missions screen listing block, level, distance, and coin objectives',
    width: 1076,
    height: 2180,
  },
  {
    id: 'daily-rewards-calendar',
    filename: 'IMG_20261123_181942.jpg',
    src: screenshotUrl('IMG_20261123_181942.jpg'),
    title: '7-Day Daily Rewards',
    caption: 'Daily seeded run challenge paired with a 7-day coin reward calendar.',
    alt: 'BLOCK RUSH 3D 7-Day Daily Rewards screen with Daily Prism Gauntlet and coin calendar',
    width: 1076,
    height: 2176,
  },
  {
    id: 'career-achievements',
    filename: 'IMG_20261123_181952.jpg',
    src: screenshotUrl('IMG_20261123_181952.jpg'),
    title: 'Career Achievements',
    caption: 'Milestone achievements awarding coin bonuses for runs, blocks, distance, and levels.',
    alt: 'BLOCK RUSH 3D Career Achievements screen showing First Run, Block Collector, and Distance Master',
    width: 1076,
    height: 2184,
  },
  {
    id: 'armory-and-themes',
    filename: 'IMG_20261123_182001.jpg',
    src: screenshotUrl('IMG_20261123_182001.jpg'),
    title: 'Arcade Armory & Themes',
    caption: 'Unlock runners, armor skins, block materials, and 3D track themes using earned coins.',
    alt: 'BLOCK RUSH 3D Arcade Armory and Themes screen with Runners, Skins, Blocks, and Tracks tabs',
    width: 1076,
    height: 2204,
  },
  {
    id: 'runner-profile',
    filename: 'IMG_20261123_182030.jpg',
    src: screenshotUrl('IMG_20261123_182030.jpg'),
    title: 'Runner Profile & Stats',
    caption: 'Customize runner username, avatar icon, accent color, and view career statistics.',
    alt: 'BLOCK RUSH 3D Runner Profile screen showing username customization, avatar options, and career stats',
    width: 1076,
    height: 2208,
  },
  {
    id: 'runner-lobby-showcase',
    filename: 'IMG_20261124_025056.jpg',
    src: screenshotUrl('IMG_20261124_025056.jpg'),
    title: '3D Block Stack Runner',
    caption: 'Home track view with the runner carrying stacked colored blocks ready to launch.',
    alt: 'BLOCK RUSH 3D home track showing the runner character carrying three stacked colored blocks',
    width: 1076,
    height: 2024,
  },
  {
    id: 'mission-milestones-view',
    filename: 'IMG_20261124_025132.jpg',
    src: screenshotUrl('IMG_20261124_025132.jpg'),
    title: 'Progression Milestones',
    caption: 'Live mission bars tracking collected blocks, distance traveled, and claimable coins.',
    alt: 'BLOCK RUSH 3D mission progression view with progress bars and coin reward claim buttons',
    width: 1076,
    height: 2180,
  },
];
