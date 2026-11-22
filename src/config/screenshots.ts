export interface ScreenshotSlot {
  id: string;
  slotNumber: string;
  title: string;
  captureSubject: string;
  /**
   * Relative path to an actual Android gameplay capture (e.g. "./screenshots/gameplay-01.png").
   * Keep null until real in-game Android screenshots are captured and added.
   */
  imageSrc: string | null;
  alt: string;
}

export const SCREENSHOT_SLOTS: ScreenshotSlot[] = [
  {
    id: 'slot-gameplay-run',
    slotNumber: 'Slot 01',
    title: '3D Block Course',
    captureSubject: 'Core 3D block navigation and obstacle track during an active run.',
    imageSrc: null,
    alt: 'BLOCK RUSH 3D official gameplay screenshot slot 01 for 3D block course',
  },
  {
    id: 'slot-score-progression',
    slotNumber: 'Slot 02',
    title: 'Score Progression',
    captureSubject: 'In-game score counter and personal best progression display.',
    imageSrc: null,
    alt: 'BLOCK RUSH 3D official gameplay screenshot slot 02 for score progression',
  },
  {
    id: 'slot-coin-rewards',
    slotNumber: 'Slot 03',
    title: 'Coin Rewards',
    captureSubject: 'In-game coin pickup and collected coin reward summary.',
    imageSrc: null,
    alt: 'BLOCK RUSH 3D official gameplay screenshot slot 03 for coin rewards',
  },
  {
    id: 'slot-revive-feature',
    slotNumber: 'Slot 04',
    title: 'Revive Screen',
    captureSubject: 'Post-collision revive option allowing players to continue their run.',
    imageSrc: null,
    alt: 'BLOCK RUSH 3D official gameplay screenshot slot 04 for revive feature',
  },
];
