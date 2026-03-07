export const ICON_CATEGORIES = [
    { id: 'ui', label: 'icons.categories.ui', icon: 'M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2 M 14 2 h 8 v 8 h -8 Z' },
    { id: 'media', label: 'icons.categories.media', icon: 'M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z M 12, 13 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0' },
    { id: 'communication', label: 'icons.categories.communication', icon: 'M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1' },
    { id: 'files', label: 'icons.categories.files', icon: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z M2 10h20' },
    { id: 'arrows', label: 'icons.categories.arrows', icon: 'M11 19H5v-6 M13 5h6v6 M19 5 5 19' }
];

export const ICON_DATA = [
  {
    "id": "a-arrow-down",
    "char": "m14 12 4 4 4-4 M18 16V7 m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16 M3.304 13h6.392",
    "category": "arrows",
    "tags": "letter font size text formatting smaller"
  },
  {
    "id": "a-arrow-up",
    "char": "m14 11 4-4 4 4 M18 16V7 m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16 M3.304 13h6.392",
    "category": "arrows",
    "tags": "letter font size text formatting larger bigger"
  },
  {
    "id": "a-large-small",
    "char": "m15 16 2.536-7.328a1.02 1.02 1 0 1 1.928 0L22 16 M15.697 14h5.606 m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16 M3.304 13h6.392",
    "category": "ui",
    "tags": "letter font size text formatting"
  },
  {
    "id": "accessibility",
    "char": "M 16, 4 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 m18 19 1-7-6 1 m5 8 3-3 5.5 3-2.36 3.5 M4.24 14.5a5 5 0 0 0 6.88 6 M13.76 17.5a5 5 0 0 0-6.88-6",
    "category": "ui",
    "tags": "disability disabled dda wheelchair"
  },
  {
    "id": "activity",
    "char": "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
    "category": "ui",
    "tags": "pulse action motion movement exercise fitness healthcare heart rate monitor vital signs vitals emergency room er intensive care hospital defibrillator earthquake siesmic magnitude richter scale aftershock tremor shockwave audio waveform synthesizer synthesiser music"
  },
  {
    "id": "air-vent",
    "char": "M18 17.5a2.5 2.5 0 1 1-4 2.03V12 M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2 M6 8h12 M6.6 15.572A2 2 0 1 0 10 17v-5",
    "category": "ui",
    "tags": "air conditioner ac central air cooling climate-control"
  },
  {
    "id": "airplay",
    "char": "M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1 m12 15 5 6H7Z",
    "category": "media",
    "tags": "stream cast mirroring screen monitor macos osx"
  },
  {
    "id": "alarm-clock-check",
    "char": "M 12, 13 m -8, 0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0 M5 3 2 6 m22 6-3-3 M6.38 18.7 4 21 M17.64 18.67 20 21 m9 13 2 2 4-4",
    "category": "ui",
    "tags": "done todo tick complete task"
  },
  {
    "id": "alarm-clock-minus",
    "char": "M 12, 13 m -8, 0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0 M5 3 2 6 m22 6-3-3 M6.38 18.7 4 21 M17.64 18.67 20 21 M9 13h6",
    "category": "ui",
    "tags": "remove"
  },
  {
    "id": "alarm-clock-off",
    "char": "M6.87 6.87a8 8 0 1 0 11.26 11.26 M19.9 14.25a8 8 0 0 0-9.15-9.15 m22 6-3-3 M6.26 18.67 4 21 m2 2 20 20 M4 4 2 6",
    "category": "ui",
    "tags": "morning turn-off"
  },
  {
    "id": "alarm-clock-plus",
    "char": "M 12, 13 m -8, 0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0 M5 3 2 6 m22 6-3-3 M6.38 18.7 4 21 M17.64 18.67 20 21 M12 10v6 M9 13h6",
    "category": "ui",
    "tags": "add"
  },
  {
    "id": "alarm-clock",
    "char": "M 12, 13 m -8, 0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0 M12 9v4l2 2 M5 3 2 6 m22 6-3-3 M6.38 18.7 4 21 M17.64 18.67 20 21",
    "category": "ui",
    "tags": "morning"
  },
  {
    "id": "alarm-smoke",
    "char": "M11 21c0-2.5 2-2.5 2-5 M16 21c0-2.5 2-2.5 2-5 m19 8-.8 3a1.25 1.25 0 0 1-1.2 1H7a1.25 1.25 0 0 1-1.2-1L5 8 M21 3a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a1 1 0 0 1 1-1z M6 21c0-2.5 2-2.5 2-5",
    "category": "ui",
    "tags": "fire alert warning detector carbon monoxide safety equipment amenities"
  },
  {
    "id": "album",
    "char": "M 3 3 h 18 v 18 h -18 Z",
    "category": "ui",
    "tags": "photo book"
  },
  {
    "id": "align-center-horizontal",
    "char": "M2 12h20 M10 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4 M10 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4 M20 16v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1 M14 8V7c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1",
    "category": "ui",
    "tags": "items flex justify"
  },
  {
    "id": "align-center-vertical",
    "char": "M12 2v20 M8 10H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h4 M16 10h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4 M8 20H7a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h1 M16 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1",
    "category": "ui",
    "tags": "items flex justify"
  },
  {
    "id": "align-end-horizontal",
    "char": "M 4 2 h 6 v 16 h -6 Z M 14 9 h 6 v 9 h -6 Z M22 22H2",
    "category": "ui",
    "tags": "items bottom flex justify"
  },
  {
    "id": "align-end-vertical",
    "char": "M 2 4 h 16 v 6 h -16 Z M 9 14 h 9 v 6 h -9 Z M22 22V2",
    "category": "ui",
    "tags": "items right flex justify"
  },
  {
    "id": "align-horizontal-distribute-center",
    "char": "M 4 5 h 6 v 14 h -6 Z M 14 7 h 6 v 10 h -6 Z M17 22v-5 M17 7V2 M7 22v-3 M7 5V2",
    "category": "ui",
    "tags": "items flex justify space evenly around"
  },
  {
    "id": "align-horizontal-distribute-end",
    "char": "M 4 5 h 6 v 14 h -6 Z M 14 7 h 6 v 10 h -6 Z M10 2v20 M20 2v20",
    "category": "ui",
    "tags": "right items flex justify"
  },
  {
    "id": "align-horizontal-distribute-start",
    "char": "M 4 5 h 6 v 14 h -6 Z M 14 7 h 6 v 10 h -6 Z M4 2v20 M14 2v20",
    "category": "ui",
    "tags": "left items flex justify"
  },
  {
    "id": "align-horizontal-justify-center",
    "char": "M 2 5 h 6 v 14 h -6 Z M 16 7 h 6 v 10 h -6 Z M12 2v20",
    "category": "ui",
    "tags": "center items flex justify"
  },
  {
    "id": "align-horizontal-justify-end",
    "char": "M 2 5 h 6 v 14 h -6 Z M 12 7 h 6 v 10 h -6 Z M22 2v20",
    "category": "ui",
    "tags": "right items flex justify"
  },
  {
    "id": "align-horizontal-justify-start",
    "char": "M 6 5 h 6 v 14 h -6 Z M 16 7 h 6 v 10 h -6 Z M2 2v20",
    "category": "ui",
    "tags": "left items flex justify"
  },
  {
    "id": "align-horizontal-space-around",
    "char": "M 9 7 h 6 v 10 h -6 Z M4 22V2 M20 22V2",
    "category": "ui",
    "tags": "center items flex justify distribute between"
  },
  {
    "id": "align-horizontal-space-between",
    "char": "M 3 5 h 6 v 14 h -6 Z M 15 7 h 6 v 10 h -6 Z M3 2v20 M21 2v20",
    "category": "ui",
    "tags": "around items bottom flex justify"
  },
  {
    "id": "align-start-horizontal",
    "char": "M 4 6 h 6 v 16 h -6 Z M 14 6 h 6 v 9 h -6 Z M22 2H2",
    "category": "ui",
    "tags": "top items flex justify"
  },
  {
    "id": "align-start-vertical",
    "char": "M 6 14 h 9 v 6 h -9 Z M 6 4 h 16 v 6 h -16 Z M2 2v20",
    "category": "ui",
    "tags": "left items flex justify"
  },
  {
    "id": "align-vertical-distribute-center",
    "char": "M22 17h-3 M22 7h-5 M5 17H2 M7 7H2 M 5 14 h 14 v 6 h -14 Z M 7 4 h 10 v 6 h -10 Z",
    "category": "ui",
    "tags": "items flex justify space evenly around"
  },
  {
    "id": "align-vertical-distribute-end",
    "char": "M 5 14 h 14 v 6 h -14 Z M 7 4 h 10 v 6 h -10 Z M2 20h20 M2 10h20",
    "category": "ui",
    "tags": "bottom items flex justify"
  },
  {
    "id": "align-vertical-distribute-start",
    "char": "M 5 14 h 14 v 6 h -14 Z M 7 4 h 10 v 6 h -10 Z M2 14h20 M2 4h20",
    "category": "ui",
    "tags": "top items flex justify"
  },
  {
    "id": "align-vertical-justify-center",
    "char": "M 5 16 h 14 v 6 h -14 Z M 7 2 h 10 v 6 h -10 Z M2 12h20",
    "category": "ui",
    "tags": "center items flex justify distribute between"
  },
  {
    "id": "align-vertical-justify-end",
    "char": "M 5 12 h 14 v 6 h -14 Z M 7 2 h 10 v 6 h -10 Z M2 22h20",
    "category": "ui",
    "tags": "bottom items flex justify distribute between"
  },
  {
    "id": "align-vertical-justify-start",
    "char": "M 5 16 h 14 v 6 h -14 Z M 7 6 h 10 v 6 h -10 Z M2 2h20",
    "category": "ui",
    "tags": "top items flex justify distribute between"
  },
  {
    "id": "align-vertical-space-around",
    "char": "M 7 9 h 10 v 6 h -10 Z M22 20H2 M22 4H2",
    "category": "ui",
    "tags": "center items flex justify distribute between"
  },
  {
    "id": "align-vertical-space-between",
    "char": "M 5 15 h 14 v 6 h -14 Z M 7 3 h 10 v 6 h -10 Z M2 21h20 M2 3h20",
    "category": "ui",
    "tags": "center items flex justify distribute between"
  },
  {
    "id": "ambulance",
    "char": "M10 10H6 M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2 M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14 M8 8v4 M9 18h6 M 17, 18 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 7, 18 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "ambulance emergency medical vehicle siren healthcare transportation rescue urgent first aid"
  },
  {
    "id": "ampersand",
    "char": "M16 12h3 M17.5 12a8 8 0 0 1-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-4 8-8.5a3 3 0 1 0-6 0c0 3 2.5 8.5 12 13",
    "category": "ui",
    "tags": "and typography operator join concatenate code &"
  },
  {
    "id": "ampersands",
    "char": "M10 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5 M22 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5",
    "category": "ui",
    "tags": "and operator then code &&"
  },
  {
    "id": "amphora",
    "char": "M10 2v5.632c0 .424-.272.795-.653.982A6 6 0 0 0 6 14c.006 4 3 7 5 8 M10 5H8a2 2 0 0 0 0 4h.68 M14 2v5.632c0 .424.272.795.652.982A6 6 0 0 1 18 14c0 4-3 7-5 8 M14 5h2a2 2 0 0 1 0 4h-.68 M18 22H6 M9 2h6",
    "category": "ui",
    "tags": "pottery artifact artefact vase ceramics clay archaeology museum wine oil"
  },
  {
    "id": "anchor",
    "char": "M12 6v16 m19 13 2-1a9 9 0 0 1-18 0l2 1 M9 11h6 M 12, 4 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "ship"
  },
  {
    "id": "angry",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M16 16s-1.5-2-4-2-4 2-4 2 M7.5 8 10 9 m14 9 2.5-1 M9 10h.01 M15 10h.01",
    "category": "ui",
    "tags": "emoji anger face emotion"
  },
  {
    "id": "annoyed",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M8 15h8 M8 9h2 M14 9h2",
    "category": "ui",
    "tags": "emoji nuisance face emotion"
  },
  {
    "id": "antenna",
    "char": "M2 12 7 2 m7 12 5-10 m12 12 5-10 m17 12 5-10 M4.5 7h15 M12 16v6",
    "category": "ui",
    "tags": "signal connection connectivity tv television broadcast live frequency tune scan channels aerial receiver transmission transducer terrestrial satellite cable"
  },
  {
    "id": "anvil",
    "char": "M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4 M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z M9 12v5 M15 12v5 M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1",
    "category": "ui",
    "tags": "metal iron alloy materials heavy weight blacksmith forge acme"
  },
  {
    "id": "aperture",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 m14.31 8 5.74 9.94 M9.69 8h11.48 m7.38 12 5.74-9.94 M9.69 16 3.95 6.06 M14.31 16H2.83 m16.62 12-5.74 9.94",
    "category": "ui",
    "tags": "camera photo pictures shutter exposure"
  },
  {
    "id": "app-window-mac",
    "char": "M 2 4 h 20 v 16 h -20 Z M6 8h.01 M10 8h.01 M14 8h.01",
    "category": "ui",
    "tags": "application menu bar pane preferences macos osx executable"
  },
  {
    "id": "app-window",
    "char": "M 2 4 h 20 v 16 h -20 Z M10 4v4 M2 8h20 M6 4v4",
    "category": "ui",
    "tags": "application menu bar pane executable"
  },
  {
    "id": "apple",
    "char": "M12 6.528V3a1 1 0 0 1 1-1h0 M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21",
    "category": "ui",
    "tags": "fruit food healthy snack nutrition fresh produce grocery organic harvest vitamin red green juicy sweet tart bite orchard plant core raw diet"
  },
  {
    "id": "archive-restore",
    "char": "M 2 3 h 20 v 5 h -20 Z M4 8v11a2 2 0 0 0 2 2h2 M20 8v11a2 2 0 0 1-2 2h-2 m9 15 3-3 3 3 M12 12v9",
    "category": "communication",
    "tags": "unarchive index backup box storage records"
  },
  {
    "id": "archive-x",
    "char": "M 2 3 h 20 v 5 h -20 Z M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8 m9.5 17 5-5 m9.5 12 5 5",
    "category": "ui",
    "tags": "index backup box storage records junk"
  },
  {
    "id": "archive",
    "char": "M 2 3 h 20 v 5 h -20 Z M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8 M10 12h4",
    "category": "communication",
    "tags": "index backup box storage records"
  },
  {
    "id": "armchair",
    "char": "M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3 M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z M5 18v2 M19 18v2",
    "category": "ui",
    "tags": "sofa furniture leisure lounge loveseat couch"
  },
  {
    "id": "arrow-big-down-dash",
    "char": "M15 11a1 1 0 0 0 1 1h2.939a1 1 0 0 1 .75 1.811l-6.835 6.836a1.207 1.207 0 0 1-1.707 0L4.31 13.81a1 1 0 0 1 .75-1.811H8a1 1 0 0 0 1-1V9a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1z M9 4h6",
    "category": "arrows",
    "tags": "backwards reverse slow direction south download"
  },
  {
    "id": "arrow-big-down",
    "char": "M15 11a1 1 0 0 0 1 1h2.939a1 1 0 0 1 .75 1.811l-6.835 6.836a1.207 1.207 0 0 1-1.707 0L4.31 13.81a1 1 0 0 1 .75-1.811H8a1 1 0 0 0 1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1z",
    "category": "arrows",
    "tags": "backwards reverse direction south"
  },
  {
    "id": "arrow-big-left-dash",
    "char": "M13 9a1 1 0 0 1-1-1V5.061a1 1 0 0 0-1.811-.75l-6.835 6.836a1.207 1.207 0 0 0 0 1.707l6.835 6.835a1 1 0 0 0 1.811-.75V16a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z M20 9v6",
    "category": "arrows",
    "tags": "previous back direction west turn corner"
  },
  {
    "id": "arrow-big-left",
    "char": "M13 9a1 1 0 0 1-1-1V5.061a1 1 0 0 0-1.811-.75l-6.835 6.836a1.207 1.207 0 0 0 0 1.707l6.835 6.835a1 1 0 0 0 1.811-.75V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z",
    "category": "arrows",
    "tags": "previous back direction west indicate turn"
  },
  {
    "id": "arrow-big-right-dash",
    "char": "M11 9a1 1 0 0 0 1-1V5.061a1 1 0 0 1 1.811-.75l6.836 6.836a1.207 1.207 0 0 1 0 1.707l-6.836 6.835a1 1 0 0 1-1.811-.75V16a1 1 0 0 0-1-1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z M4 9v6",
    "category": "arrows",
    "tags": "next forward direction east turn corner"
  },
  {
    "id": "arrow-big-right",
    "char": "M11 9a1 1 0 0 0 1-1V5.061a1 1 0 0 1 1.811-.75l6.836 6.836a1.207 1.207 0 0 1 0 1.707l-6.836 6.835a1 1 0 0 1-1.811-.75V16a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z",
    "category": "arrows",
    "tags": "next forward direction east indicate turn"
  },
  {
    "id": "arrow-big-up-dash",
    "char": "M9 13a1 1 0 0 0-1-1H5.061a1 1 0 0 1-.75-1.811l6.836-6.835a1.207 1.207 0 0 1 1.707 0l6.835 6.835a1 1 0 0 1-.75 1.811H16a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z M9 20h6",
    "category": "arrows",
    "tags": "caps lock capitals keyboard button mac forward direction north faster speed boost"
  },
  {
    "id": "arrow-big-up",
    "char": "M9 13a1 1 0 0 0-1-1H5.061a1 1 0 0 1-.75-1.811l6.836-6.835a1.207 1.207 0 0 1 1.707 0l6.835 6.835a1 1 0 0 1-.75 1.811H16a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z",
    "category": "arrows",
    "tags": "shift keyboard button mac capitalize capitalise forward direction north"
  },
  {
    "id": "arrow-down-0-1",
    "char": "m3 16 4 4 4-4 M7 20V4 M 15 4 h 4 v 6 h -4 Z M17 20v-6h-2 M15 20h4",
    "category": "arrows",
    "tags": "filter sort ascending descending increasing decreasing rising falling numerical"
  },
  {
    "id": "arrow-down-1-0",
    "char": "m3 16 4 4 4-4 M7 20V4 M17 10V4h-2 M15 10h4 M 15 14 h 4 v 6 h -4 Z",
    "category": "arrows",
    "tags": "filter sort ascending descending increasing decreasing rising falling numerical"
  },
  {
    "id": "arrow-down-a-z",
    "char": "m3 16 4 4 4-4 M7 20V4 M20 8h-5 M15 10V6.5a2.5 2.5 0 0 1 5 0V10 M15 14h5l-5 6h5",
    "category": "arrows",
    "tags": "filter sort ascending descending increasing decreasing rising falling alphabetical"
  },
  {
    "id": "arrow-down-from-line",
    "char": "M19 3H5 M12 21V7 m6 15 6 6 6-6",
    "category": "arrows",
    "tags": "backwards reverse direction south download expand fold vertical"
  },
  {
    "id": "arrow-down-left",
    "char": "M17 7 7 17 M17 17H7V7",
    "category": "arrows",
    "tags": "direction south-west diagonal"
  },
  {
    "id": "arrow-down-narrow-wide",
    "char": "m3 16 4 4 4-4 M7 20V4 M11 4h4 M11 8h7 M11 12h10",
    "category": "arrows",
    "tags": "filter sort ascending descending increasing decreasing rising falling"
  },
  {
    "id": "arrow-down-right",
    "char": "m7 7 10 10 M17 7v10H7",
    "category": "arrows",
    "tags": "direction south-east diagonal"
  },
  {
    "id": "arrow-down-to-dot",
    "char": "M12 2v14 m19 9-7 7-7-7 M 12, 21 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0",
    "category": "arrows",
    "tags": "direction south waypoint location step into"
  },
  {
    "id": "arrow-down-to-line",
    "char": "M12 17V3 m6 11 6 6 6-6 M19 21H5",
    "category": "arrows",
    "tags": "behind direction south download save git version control pull collapse fold vertical"
  },
  {
    "id": "arrow-down-up",
    "char": "m3 16 4 4 4-4 M7 20V4 m21 8-4-4-4 4 M17 4v16",
    "category": "arrows",
    "tags": "bidirectional two-way 2-way swap switch network traffic flow mobile data internet sort reorder move"
  },
  {
    "id": "arrow-down-wide-narrow",
    "char": "m3 16 4 4 4-4 M7 20V4 M11 4h10 M11 8h7 M11 12h4",
    "category": "arrows",
    "tags": "filter sort ascending descending increasing decreasing rising falling"
  },
  {
    "id": "arrow-down-z-a",
    "char": "m3 16 4 4 4-4 M7 4v16 M15 4h5l-5 6h5 M15 20v-3.5a2.5 2.5 0 0 1 5 0V20 M20 18h-5",
    "category": "arrows",
    "tags": "filter sort ascending descending increasing decreasing rising falling alphabetical reverse"
  },
  {
    "id": "arrow-down",
    "char": "M12 5v14 m19 12-7 7-7-7",
    "category": "arrows",
    "tags": "backwards reverse direction south"
  },
  {
    "id": "arrow-left-from-line",
    "char": "m9 6-6 6 6 6 M3 12h14 M21 19V5",
    "category": "arrows",
    "tags": "previous back direction west expand fold horizontal <-|"
  },
  {
    "id": "arrow-left-right",
    "char": "M8 3 4 7l4 4 M4 7h16 m16 21 4-4-4-4 M20 17H4",
    "category": "arrows",
    "tags": "bidirectional two-way 2-way swap switch transaction reorder move <- ->"
  },
  {
    "id": "arrow-left-to-line",
    "char": "M3 19V5 m13 6-6 6 6 6 M7 12h14",
    "category": "arrows",
    "tags": "previous back direction west collapse fold horizontal |<-"
  },
  {
    "id": "arrow-left",
    "char": "m12 19-7-7 7-7 M19 12H5",
    "category": "arrows",
    "tags": "previous back direction west <-"
  },
  {
    "id": "arrow-right-from-line",
    "char": "M3 5v14 M21 12H7 m15 18 6-6-6-6",
    "category": "arrows",
    "tags": "next forward direction east export expand fold horizontal |->"
  },
  {
    "id": "arrow-right-left",
    "char": "m16 3 4 4-4 4 M20 7H4 m8 21-4-4 4-4 M4 17h16",
    "category": "arrows",
    "tags": "bidirectional two-way 2-way swap switch transaction reorder move <- ->"
  },
  {
    "id": "arrow-right-to-line",
    "char": "M17 12H3 m11 18 6-6-6-6 M21 5v14",
    "category": "arrows",
    "tags": "next forward direction east tab keyboard mac indent collapse fold horizontal ->|"
  },
  {
    "id": "arrow-right",
    "char": "M5 12h14 m12 5 7 7-7 7",
    "category": "arrows",
    "tags": "forward next direction east ->"
  },
  {
    "id": "arrow-up-0-1",
    "char": "m3 8 4-4 4 4 M7 4v16 M 15 4 h 4 v 6 h -4 Z M17 20v-6h-2 M15 20h4",
    "category": "arrows",
    "tags": "filter sort ascending descending increasing decreasing rising falling numerical"
  },
  {
    "id": "arrow-up-1-0",
    "char": "m3 8 4-4 4 4 M7 4v16 M17 10V4h-2 M15 10h4 M 15 14 h 4 v 6 h -4 Z",
    "category": "arrows",
    "tags": "filter sort ascending descending increasing decreasing rising falling numerical"
  },
  {
    "id": "arrow-up-a-z",
    "char": "m3 8 4-4 4 4 M7 4v16 M20 8h-5 M15 10V6.5a2.5 2.5 0 0 1 5 0V10 M15 14h5l-5 6h5",
    "category": "arrows",
    "tags": "filter sort ascending descending increasing decreasing rising falling alphabetical"
  },
  {
    "id": "arrow-up-down",
    "char": "m21 16-4 4-4-4 M17 20V4 m3 8 4-4 4 4 M7 4v16",
    "category": "arrows",
    "tags": "bidirectional two-way 2-way swap switch network mobile data internet sort reorder move"
  },
  {
    "id": "arrow-up-from-dot",
    "char": "m5 9 7-7 7 7 M12 16V2 M 12, 21 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0",
    "category": "arrows",
    "tags": "direction north step out"
  },
  {
    "id": "arrow-up-from-line",
    "char": "m18 9-6-6-6 6 M12 3v14 M5 21h14",
    "category": "arrows",
    "tags": "forward direction north upload git version control push expand fold vertical"
  },
  {
    "id": "arrow-up-left",
    "char": "M7 17V7h10 M17 17 7 7",
    "category": "arrows",
    "tags": "direction north-west diagonal"
  },
  {
    "id": "arrow-up-narrow-wide",
    "char": "m3 8 4-4 4 4 M7 4v16 M11 12h4 M11 16h7 M11 20h10",
    "category": "arrows",
    "tags": "filter sort ascending descending increasing decreasing rising falling"
  },
  {
    "id": "arrow-up-right",
    "char": "M7 7h10v10 M7 17 17 7",
    "category": "arrows",
    "tags": "direction north-east diagonal"
  },
  {
    "id": "arrow-up-to-line",
    "char": "M5 3h14 m18 13-6-6-6 6 M12 7v14",
    "category": "arrows",
    "tags": "forward direction north upload collapse fold vertical"
  },
  {
    "id": "arrow-up-wide-narrow",
    "char": "m3 8 4-4 4 4 M7 4v16 M11 12h10 M11 16h7 M11 20h4",
    "category": "arrows",
    "tags": "filter sort ascending descending increasing decreasing rising falling"
  },
  {
    "id": "arrow-up-z-a",
    "char": "m3 8 4-4 4 4 M7 4v16 M15 4h5l-5 6h5 M15 20v-3.5a2.5 2.5 0 0 1 5 0V20 M20 18h-5",
    "category": "arrows",
    "tags": "filter sort ascending descending increasing decreasing rising falling alphabetical reverse"
  },
  {
    "id": "arrow-up",
    "char": "m5 12 7-7 7 7 M12 19V5",
    "category": "arrows",
    "tags": "forward direction north"
  },
  {
    "id": "arrows-up-from-line",
    "char": "m4 6 3-3 3 3 M7 17V3 m14 6 3-3 3 3 M17 17V3 M4 21h16",
    "category": "arrows",
    "tags": "direction orientation this way up vertical package box fragile postage shipping"
  },
  {
    "id": "asterisk",
    "char": "M12 6v12 M17.196 9 6.804 15 m6.804 9 10.392 6",
    "category": "ui",
    "tags": "reference times multiply multiplication operator code glob pattern wildcard *"
  },
  {
    "id": "at-sign",
    "char": "M 12, 12 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0 M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8",
    "category": "communication",
    "tags": "mention at email message @"
  },
  {
    "id": "atom",
    "char": "M 12, 12 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z",
    "category": "ui",
    "tags": "atomic nuclear physics particle element molecule electricity energy chemistry"
  },
  {
    "id": "audio-lines",
    "char": "M2 10v3 M6 6v11 M10 3v18 M14 8v7 M18 5v13 M22 10v3",
    "category": "ui",
    "tags": "graphic equaliser sound noise listen hearing hertz frequency wavelength vibrate sine synthesizer synthesiser levels track music playback radio broadcast airwaves voice vocals singer song"
  },
  {
    "id": "audio-waveform",
    "char": "M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2",
    "category": "ui",
    "tags": "sound noise listen hearing hertz frequency wavelength vibrate sine synthesizer synthesiser levels track music playback radio broadcast airwaves voice vocals singer song"
  },
  {
    "id": "award",
    "char": "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526 M 12, 8 m -6, 0 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0",
    "category": "ui",
    "tags": "achievement badge rosette prize winner"
  },
  {
    "id": "axe",
    "char": "m14 12-8.381 8.38a1 1 0 0 1-3.001-3L11 9 M15 15.5a.5.5 0 0 0 .5.5A6.5 6.5 0 0 0 22 9.5a.5.5 0 0 0-.5-.5h-1.672a2 2 0 0 1-1.414-.586l-5.062-5.062a1.205 1.205 0 0 0-1.704 0L9.352 5.648a1.205 1.205 0 0 0 0 1.704l5.062 5.062A2 2 0 0 1 15 13.828z",
    "category": "ui",
    "tags": "hatchet weapon chop sharp equipment fireman firefighter brigade lumberjack woodcutter logger forestry"
  },
  {
    "id": "axis-3d",
    "char": "M13.5 10.5 15 9 M4 4v15a1 1 0 0 0 1 1h15 M4.293 19.707 6 18 m9 15 1.5-1.5",
    "category": "ui",
    "tags": "gizmo coordinates"
  },
  {
    "id": "baby",
    "char": "M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5 M15 12h.01 M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1 M9 12h.01",
    "category": "ui",
    "tags": "child childproof children"
  },
  {
    "id": "backpack",
    "char": "M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z M8 10h8 M8 18h8 M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6 M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2",
    "category": "ui",
    "tags": "bag hiking travel camping school childhood"
  },
  {
    "id": "badge-alert",
    "char": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
    "category": "ui",
    "tags": "check verified unverified security safety issue"
  },
  {
    "id": "badge-cent",
    "char": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z M12 7v10 M15.4 10a4 4 0 1 0 0 4",
    "category": "ui",
    "tags": "discount offer sale voucher tag monetization marketing finance financial exchange transaction payment cents dollar usd $ ¢"
  },
  {
    "id": "badge-check",
    "char": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z m9 12 2 2 4-4",
    "category": "ui",
    "tags": "verified check"
  },
  {
    "id": "badge-dollar-sign",
    "char": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8 M12 18V6",
    "category": "ui",
    "tags": "discount offer sale voucher tag monetization marketing finance financial exchange transaction payment usd $"
  },
  {
    "id": "badge-euro",
    "char": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z M7 12h5 M15 9.4a4 4 0 1 0 0 5.2",
    "category": "ui",
    "tags": "discount offer sale voucher tag monetization marketing finance financial exchange transaction payment €"
  },
  {
    "id": "badge-indian-rupee",
    "char": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z M8 8h8 M8 12h8 m13 17-5-1h1a4 4 0 0 0 0-8",
    "category": "ui",
    "tags": "discount offer sale voucher tag monetization marketing finance financial exchange transaction payment inr ₹"
  },
  {
    "id": "badge-info",
    "char": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
    "category": "ui",
    "tags": "verified unverified help"
  },
  {
    "id": "badge-japanese-yen",
    "char": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z m9 8 3 3v7 m12 11 3-3 M9 12h6 M9 16h6",
    "category": "ui",
    "tags": "discount offer sale voucher tag monetization marketing finance financial exchange transaction payment jpy ¥"
  },
  {
    "id": "badge-minus",
    "char": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
    "category": "ui",
    "tags": "verified unverified delete remove erase"
  },
  {
    "id": "badge-percent",
    "char": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z m15 9-6 6 M9 9h.01 M15 15h.01",
    "category": "ui",
    "tags": "verified unverified sale discount offer marketing sticker price tag"
  },
  {
    "id": "badge-plus",
    "char": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
    "category": "ui",
    "tags": "verified unverified add create new"
  },
  {
    "id": "badge-pound-sterling",
    "char": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z M8 12h4 M10 16V9.5a2.5 2.5 0 0 1 5 0 M8 16h7",
    "category": "ui",
    "tags": "discount offer sale voucher tag monetization marketing finance financial exchange transaction payment british gbp £"
  },
  {
    "id": "badge-question-mark",
    "char": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
    "category": "ui",
    "tags": "verified unverified help"
  },
  {
    "id": "badge-russian-ruble",
    "char": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z M9 16h5 M9 12h5a2 2 0 1 0 0-4h-3v9",
    "category": "ui",
    "tags": "discount offer sale voucher tag monetization marketing finance financial exchange transaction payment rub ₽"
  },
  {
    "id": "badge-swiss-franc",
    "char": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z M11 17V8h4 M11 12h3 M9 16h4",
    "category": "ui",
    "tags": "discount offer sale voucher tag monetization marketing finance financial exchange transaction payment chf ₣"
  },
  {
    "id": "badge-turkish-lira",
    "char": "M11 7v10a5 5 0 0 0 5-5 m15 8-6 3 M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76",
    "category": "ui",
    "tags": "discount offer sale voucher tag monetization marketing finance financial exchange transaction payment try ₺"
  },
  {
    "id": "badge-x",
    "char": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
    "category": "ui",
    "tags": "verified unverified lost delete remove"
  },
  {
    "id": "badge",
    "char": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
    "category": "ui",
    "tags": "check verified unverified"
  },
  {
    "id": "baggage-claim",
    "char": "M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2 M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10 M 8 6 h 13 v 8 h -13 Z M 18, 20 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 9, 20 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "baggage luggage travel cart trolley suitcase"
  },
  {
    "id": "balloon",
    "char": "M12 16v1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v1 M12 6a2 2 0 0 1 2 2 M18 8c0 4-3.5 8-6 8s-6-4-6-8a6 6 0 0 1 12 0",
    "category": "ui",
    "tags": "party festival congratulations celebration decoration colorful floating fun birthday event entertainment"
  },
  {
    "id": "ban",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M4.929 4.929 19.07 19.071",
    "category": "ui",
    "tags": "cancel no stop forbidden prohibited error incorrect mistake wrong failure circle slash null void"
  },
  {
    "id": "banana",
    "char": "M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5 M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z",
    "category": "ui",
    "tags": "fruit food"
  },
  {
    "id": "bandage",
    "char": "M10 10.01h.01 M10 14.01h.01 M14 10.01h.01 M14 14.01h.01 M18 6v12 M6 6v12 M 2 6 h 20 v 12 h -20 Z",
    "category": "ui",
    "tags": "plaster band-aid first aid medical health wound injury care treatment healing protection emergency aid safety patch"
  },
  {
    "id": "banknote-arrow-down",
    "char": "M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5 m16 19 3 3 3-3 M18 12h.01 M19 16v6 M6 12h.01 M 12, 12 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "arrows",
    "tags": "bill currency money payment funds transaction cash finance withdraw expense out payout refund debit spending decrease"
  },
  {
    "id": "banknote-arrow-up",
    "char": "M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5 M18 12h.01 M19 22v-6 m22 19-3-3-3 3 M6 12h.01 M 12, 12 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "arrows",
    "tags": "bill currency money payment funds transaction cash finance deposit earnings income in credit prepaid growth increase"
  },
  {
    "id": "banknote-x",
    "char": "M13 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5 m17 17 5 5 M18 12h.01 m22 17-5 5 M6 12h.01 M 12, 12 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "bill currency money payment funds transaction cash finance error failed rejected canceled declined lost delete remove"
  },
  {
    "id": "banknote",
    "char": "M 2 6 h 20 v 12 h -20 Z M 12, 12 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M6 12h.01M18 12h.01",
    "category": "ui",
    "tags": "currency money payment"
  },
  {
    "id": "barcode",
    "char": "M3 5v14 M8 5v14 M12 5v14 M17 5v14 M21 5v14",
    "category": "ui",
    "tags": "scan checkout till cart transaction purchase buy product packaging retail consumer"
  },
  {
    "id": "barrel",
    "char": "M10 3a41 41 0 0 0 0 18 M14 3a41 41 0 0 1 0 18 M17 3a2 2 0 0 1 1.68.92 15.25 15.25 0 0 1 0 16.16A2 2 0 0 1 17 21H7a2 2 0 0 1-1.68-.92 15.25 15.25 0 0 1 0-16.16A2 2 0 0 1 7 3z M3.84 17h16.32 M3.84 7h16.32",
    "category": "ui",
    "tags": "keg drum tank wine beer oak wood firkin hogshead kilderkin barrique solera aging whiskey brewery distillery winery vineyard"
  },
  {
    "id": "baseline",
    "char": "M4 20h16 m6 16 6-12 6 12 M8 12h8",
    "category": "ui",
    "tags": "text format color"
  },
  {
    "id": "bath",
    "char": "M10 4 8 6 M17 19v2 M2 12h20 M7 19v2 M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5",
    "category": "ui",
    "tags": "amenities services bathroom shower"
  },
  {
    "id": "battery-charging",
    "char": "m11 7-3 5h4l-3 5 M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935 M22 14v-4 M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936",
    "category": "ui",
    "tags": "power electricity energy accumulator charge"
  },
  {
    "id": "battery-full",
    "char": "M10 10v4 M14 10v4 M22 14v-4 M6 10v4 M 2 6 h 16 v 12 h -16 Z",
    "category": "ui",
    "tags": "power electricity energy accumulator charge"
  },
  {
    "id": "battery-low",
    "char": "M22 14v-4 M6 14v-4 M 2 6 h 16 v 12 h -16 Z",
    "category": "ui",
    "tags": "power electricity energy accumulator charge"
  },
  {
    "id": "battery-medium",
    "char": "M10 14v-4 M22 14v-4 M6 14v-4 M 2 6 h 16 v 12 h -16 Z",
    "category": "ui",
    "tags": "power electricity energy accumulator charge"
  },
  {
    "id": "battery-plus",
    "char": "M10 9v6 M12.543 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.605 M22 14v-4 M7 12h6 M7.606 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.606",
    "category": "ui",
    "tags": "power electricity energy accumulator charge plus economy health add new maximum upgrade extra +"
  },
  {
    "id": "battery-warning",
    "char": "M10 17h.01 M10 7v6 M14 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2 M22 14v-4 M6 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2",
    "category": "ui",
    "tags": "power electricity energy accumulator charge exclamation mark"
  },
  {
    "id": "battery",
    "char": "M 22 14 L 22 10 M 2 6 h 16 v 12 h -16 Z",
    "category": "ui",
    "tags": "power electricity energy accumulator charge"
  },
  {
    "id": "beaker",
    "char": "M4.5 3h15 M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3 M6 14h12",
    "category": "ui",
    "tags": "cup lab chemistry experiment test"
  },
  {
    "id": "bean-off",
    "char": "M9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22a13.96 13.96 0 0 0 9.9-4.1 M10.75 5.093A6 6 0 0 1 22 8c0 2.411-.61 4.68-1.683 6.66 M5.341 10.62a4 4 0 0 0 6.487 1.208M10.62 5.341a4.015 4.015 0 0 1 2.039 2.04",
    "category": "ui",
    "tags": "soy free legume soy food seed allergy intolerance diet"
  },
  {
    "id": "bean",
    "char": "M10.165 6.598C9.954 7.478 9.64 8.36 9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22c7.732 0 14-6.268 14-14a6 6 0 0 0-11.835-1.402Z M5.341 10.62a4 4 0 1 0 5.279-5.28",
    "category": "ui",
    "tags": "legume soy food seed"
  },
  {
    "id": "bed-double",
    "char": "M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8 M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4 M12 4v6 M2 18h20",
    "category": "ui",
    "tags": "sleep hotel furniture"
  },
  {
    "id": "bed-single",
    "char": "M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8 M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4 M3 18h18",
    "category": "ui",
    "tags": "sleep hotel furniture"
  },
  {
    "id": "bed",
    "char": "M2 4v16 M2 8h18a2 2 0 0 1 2 2v10 M2 17h20 M6 8v9",
    "category": "ui",
    "tags": "sleep hotel furniture"
  },
  {
    "id": "beef",
    "char": "M16.4 13.7A6.5 6.5 0 1 0 6.28 6.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3 m18.5 6 2.19 4.5a6.48 6.48 0 0 1-2.29 7.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5 M 12.5, 8.5 m -2.5, 0 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0",
    "category": "ui",
    "tags": "food dish restaurant course meal meat bbq steak"
  },
  {
    "id": "beer-off",
    "char": "M13 13v5 M17 11.47V8 M17 11h1a3 3 0 0 1 2.745 4.211 m2 2 20 20 M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3 M7.536 7.535C6.766 7.649 6.154 8 5.5 8a2.5 2.5 0 0 1-1.768-4.268 M8.727 3.204C9.306 2.767 9.885 2 11 2c1.56 0 2 1.5 3 1.5s1.72-.5 2.5-.5a1 1 0 1 1 0 5c-.78 0-1.5-.5-2.5-.5a3.149 3.149 0 0 0-.842.12 M9 14.6V18",
    "category": "ui",
    "tags": "alcohol bar beverage brewery drink"
  },
  {
    "id": "beer",
    "char": "M17 11h1a3 3 0 0 1 0 6h-1 M9 12v6 M13 12v6 M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8",
    "category": "ui",
    "tags": "alcohol bar beverage brewery drink"
  },
  {
    "id": "bell-dot",
    "char": "M10.268 21a2 2 0 0 0 3.464 0 M11.68 2.009A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673c-.824-.85-1.678-1.731-2.21-3.348 M 18, 5 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "alarm notification sound reminder unread"
  },
  {
    "id": "bell-electric",
    "char": "M18.518 17.347A7 7 0 0 1 14 19 M18.8 4A11 11 0 0 1 20 9 M9 9h.01 M 20, 16 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 9, 9 m -7, 0 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0 M 4 16 h 10 v 6 h -10 Z",
    "category": "ui",
    "tags": "fire alarm flames smoke firefighter fireman department brigade station emergency alert safety school bell period break recess doorbell entrance entry ring reception"
  },
  {
    "id": "bell-minus",
    "char": "M10.268 21a2 2 0 0 0 3.464 0 M15 8h6 M16.243 3.757A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673A9.4 9.4 0 0 1 18.667 12",
    "category": "ui",
    "tags": "alarm notification silent reminder delete remove erase"
  },
  {
    "id": "bell-off",
    "char": "M10.268 21a2 2 0 0 0 3.464 0 M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742 m2 2 20 20 M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05",
    "category": "ui",
    "tags": "alarm notification silent reminder"
  },
  {
    "id": "bell-plus",
    "char": "M10.268 21a2 2 0 0 0 3.464 0 M15 8h6 M18 5v6 M20.002 14.464a9 9 0 0 0 .738.863A1 1 0 0 1 20 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 8.75-5.332",
    "category": "ui",
    "tags": "notification silent reminder add create new"
  },
  {
    "id": "bell-ring",
    "char": "M10.268 21a2 2 0 0 0 3.464 0 M22 8c0-2.3-.8-4.3-2-6 M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326 M4 2C2.8 3.7 2 5.7 2 8",
    "category": "ui",
    "tags": "alarm notification sound reminder"
  },
  {
    "id": "bell",
    "char": "M10.268 21a2 2 0 0 0 3.464 0 M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
    "category": "ui",
    "tags": "alarm notification sound reminder"
  },
  {
    "id": "between-horizontal-end",
    "char": "M 3 3 h 13 v 7 h -13 Z m22 15-3-3 3-3 M 3 14 h 13 v 7 h -13 Z",
    "category": "ui",
    "tags": "insert add left slot squeeze space vertical grid table rows cells excel spreadsheet accountancy data enter entry entries blocks rectangles chevron"
  },
  {
    "id": "between-horizontal-start",
    "char": "M 8 3 h 13 v 7 h -13 Z m2 9 3 3-3 3 M 8 14 h 13 v 7 h -13 Z",
    "category": "ui",
    "tags": "insert add right slot squeeze space vertical grid table rows cells excel spreadsheet accountancy data enter entry entries blocks rectangles chevron"
  },
  {
    "id": "between-vertical-end",
    "char": "M 3 3 h 7 v 13 h -7 Z m9 22 3-3 3 3 M 14 3 h 7 v 13 h -7 Z",
    "category": "ui",
    "tags": "insert add top slot squeeze space vertical grid table columns cells data enter entry entries blocks rectangles chevron"
  },
  {
    "id": "between-vertical-start",
    "char": "M 3 8 h 7 v 13 h -7 Z m15 2-3 3-3-3 M 14 8 h 7 v 13 h -7 Z",
    "category": "ui",
    "tags": "insert add bottom slot squeeze space vertical grid table columns cells data enter entry entries blocks rectangles chevron"
  },
  {
    "id": "biceps-flexed",
    "char": "M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-9 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C2.118 12.723 2.627 2 10 2a3 3 0 0 1 3 3 2 2 0 0 1-2 2c-1.105 0-1.64-.444-2-1 M15 14a5 5 0 0 0-7.584 2 M9.964 6.825C8.019 7.977 9.5 13 8 15",
    "category": "ui",
    "tags": "arm muscle strong working out athletic toned muscular forelimb curled"
  },
  {
    "id": "bike",
    "char": "M 18.5, 17.5 m -3.5, 0 a 3.5,3.5 0 1,0 7,0 a 3.5,3.5 0 1,0 -7,0 M 5.5, 17.5 m -3.5, 0 a 3.5,3.5 0 1,0 7,0 a 3.5,3.5 0 1,0 -7,0 M 15, 5 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M12 17.5V14l-3-3 4-3 2 3h2",
    "category": "ui",
    "tags": "bicycle transport trip"
  },
  {
    "id": "binary",
    "char": "M 14 14 h 4 v 6 h -4 Z M 6 4 h 4 v 6 h -4 Z M6 20h4 M14 10h4 M6 14h2v6 M14 4h2v6",
    "category": "ui",
    "tags": "code digits computer zero one boolean"
  },
  {
    "id": "binoculars",
    "char": "M10 10h4 M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3 M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z M 22 16 L 2 16 M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3",
    "category": "ui",
    "tags": "field glasses lorgnette pince-nez observation sightseeing nature wildlife birdwatching scouting surveillance search discovery monitoring lookout viewpoint travel tourism research"
  },
  {
    "id": "biohazard",
    "char": "M 12, 11.9 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M6.7 3.4c-.9 2.5 0 5.2 2.2 6.7C6.5 9 3.7 9.6 2 11.6 m8.9 10.1 1.4.8 M17.3 3.4c.9 2.5 0 5.2-2.2 6.7 2.4-1.2 5.2-.6 6.9 1.5 m15.1 10.1-1.4.8 M16.7 20.8c-2.6-.4-4.6-2.6-4.7-5.3-.2 2.6-2.1 4.8-4.7 5.2 M12 13.9v1.6 M13.5 5.4c-1-.2-2-.2-3 0 M17 16.4c.7-.7 1.2-1.6 1.5-2.5 M5.5 13.9c.3.9.8 1.8 1.5 2.5",
    "category": "ui",
    "tags": "fallout waste biology chemistry chemical element"
  },
  {
    "id": "bird",
    "char": "M16 7h.01 M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20 m20 7 2 .5-2 .5 M10 18v3 M14 17.75V21 M7 18a6 6 0 0 0 3.84-10.61",
    "category": "ui",
    "tags": "peace freedom wing avian tweet"
  },
  {
    "id": "birdhouse",
    "char": "M12 18v4 m17 18 1.956-11.468 m3 8 7.82-5.615a2 2 0 0 1 2.36 0L21 8 M4 18h16 M7 18 5.044 6.532 M 12, 10 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "birdhouse bird garden home house woodwork"
  },
  {
    "id": "bitcoin",
    "char": "M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727",
    "category": "ui",
    "tags": "currency money payment"
  },
  {
    "id": "blend",
    "char": "M 9, 9 m -7, 0 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0 M 15, 15 m -7, 0 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0",
    "category": "ui",
    "tags": "mode overlay multiply screen opacity transparency alpha filters lenses mixed shades tints hues saturation brightness overlap colors colours"
  },
  {
    "id": "blinds",
    "char": "M3 3h18 M20 7H8 M20 11H8 M10 19h10 M8 15h12 M4 3v14 M 4, 19 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "shades screen curtain shutter roller blind window lighting household home"
  },
  {
    "id": "blocks",
    "char": "M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2 M 14 2 h 8 v 8 h -8 Z",
    "category": "ui",
    "tags": "addon plugin integration extension package build stack toys kids children learning squares corner"
  },
  {
    "id": "bluetooth-connected",
    "char": "m7 7 10 10-5 5V2l5 5L7 17",
    "category": "ui",
    "tags": "paired"
  },
  {
    "id": "bluetooth-off",
    "char": "m17 17-5 5V12l-5 5 m2 2 20 20 M14.5 9.5 17 7l-5-5v4.5",
    "category": "ui",
    "tags": "lost"
  },
  {
    "id": "bluetooth-searching",
    "char": "m7 7 10 10-5 5V2l5 5L7 17 M20.83 14.83a4 4 0 0 0 0-5.66 M18 12h.01",
    "category": "ui",
    "tags": "pairing"
  },
  {
    "id": "bluetooth",
    "char": "m7 7 10 10-5 5V2l5 5L7 17",
    "category": "ui",
    "tags": "wireless"
  },
  {
    "id": "bold",
    "char": "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8",
    "category": "ui",
    "tags": "text strong format"
  },
  {
    "id": "bolt",
    "char": "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z M 12, 12 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
    "category": "ui",
    "tags": "nut screw settings preferences configuration controls edit diy fixed build construction parts"
  },
  {
    "id": "bomb",
    "char": "M 11, 13 m -9, 0 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0 M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.4 0l1.6 1.6a2.4 2.4 0 0 1 0 3.4l-1.95 1.95 m22 2-1.5 1.5",
    "category": "ui",
    "tags": "fatal error crash blockbuster mine explosion explode explosive"
  },
  {
    "id": "bone",
    "char": "M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z",
    "category": "ui",
    "tags": "health skeleton skull death pets dog"
  },
  {
    "id": "book-a",
    "char": "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20 m8 13 4-7 4 7 M9.1 11h5.7",
    "category": "files",
    "tags": "dictionary define definition thesaurus encyclopedia encyclopaedia reading booklet magazine leaflet pamphlet tome library writing written writer author story script fiction novel information knowledge education high school university college academy student study learning homework research language translate alphabetical a-z ordered"
  },
  {
    "id": "book-alert",
    "char": "M12 13h.01 M12 6v3 M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
    "category": "ui",
    "tags": "reading paperback booklet magazine leaflet pamphlet tome library writing written writer author story script fiction novel information knowledge education high school university college academy student study learning homework research documentation warning alert danger exclamation mark"
  },
  {
    "id": "book-audio",
    "char": "M12 6v7 M16 8v3 M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20 M8 8v3",
    "category": "files",
    "tags": "audiobook reading listening sound story fiction novel information knowledge education student study learning research"
  },
  {
    "id": "book-check",
    "char": "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20 m9 9.5 2 2 4-4",
    "category": "ui",
    "tags": "read booklet magazine leaflet pamphlet library written authored published informed knowledgeable educated schooled homework examined tested marked passed graduated studied learned lesson researched documented revealed blank plain language true truth verified corrected task todo done completed finished ticked"
  },
  {
    "id": "book-copy",
    "char": "M5 7a2 2 0 0 0-2 2v11 M5.803 18H5a2 2 0 0 0 0 4h9.5a.5.5 0 0 0 .5-.5V21 M9 15V4a2 2 0 0 1 2-2h9.5a.5.5 0 0 1 .5.5v14a.5.5 0 0 1-.5.5H11a2 2 0 0 1 0-4h10",
    "category": "files",
    "tags": "code coding version control git repository clone fork duplicate multiple books library copies copied plagiarism plagiarised plagiarized reading list information informed knowledge knowledgeable knowledgable education high school university college academy student study learning research smart intelligent intellectual"
  },
  {
    "id": "book-dashed",
    "char": "M12 17h1.5 M12 22h1.5 M12 2h1.5 M17.5 22H19a1 1 0 0 0 1-1 M17.5 2H19a1 1 0 0 1 1 1v1.5 M20 14v3h-2.5 M20 8.5V10 M4 10V8.5 M4 19.5V14 M4 4.5A2.5 2.5 0 0 1 6.5 2H8 M8 22H6.5a1 1 0 0 1 0-5H8",
    "category": "files",
    "tags": "code coding version control git repository template draft script screenplay writing writer author unwritten unpublished untold"
  },
  {
    "id": "book-down",
    "char": "M12 13V7 M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20 m9 10 3 3 3-3",
    "category": "files",
    "tags": "code coding version control git repository pull"
  },
  {
    "id": "book-headphones",
    "char": "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20 M8 12v-2a4 4 0 0 1 8 0v2 M 15, 12 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 9, 12 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0",
    "category": "communication",
    "tags": "audiobook reading listening sound story fiction novel information knowledge education student study learning research"
  },
  {
    "id": "book-heart",
    "char": "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20 M8.62 9.8A2.25 2.25 0 1 1 12 6.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z",
    "category": "files",
    "tags": "diary romance novel journal entry entries personal private secret crush like love emotion feminine girls teens teenager therapy theraputic therapist planner organizer organiser notes notepad stationery sketchbook writing written reading favorite favourite high school"
  },
  {
    "id": "book-image",
    "char": "m20 13.7-2.1-2.1a2 2 0 0 0-2.8 0L9.7 17 M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20 M 10, 8 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "media",
    "tags": "images pictures photos album collection event magazine catalog catalogue brochure browse gallery"
  },
  {
    "id": "book-key",
    "char": "M13 2H6.5A2.5 2.5 0 0 0 4 4.5v15 M17 2v6 M17 4h2 M20 15.2V21a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20 M 17, 10 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "files",
    "tags": "code coding version control git repository private public secret unlocked hidden revealed knowledge learning"
  },
  {
    "id": "book-lock",
    "char": "M18 6V4a2 2 0 1 0-4 0v2 M20 15v6a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20 M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H10 M 12 6 h 8 v 5 h -8 Z",
    "category": "files",
    "tags": "code coding version control git repository private secret hidden knowledge"
  },
  {
    "id": "book-marked",
    "char": "M10 2v8l3-3 3 3V2 M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
    "category": "files",
    "tags": "dictionary reading booklet magazine leaflet pamphlet tome library writing written writer author story script fiction novel information knowledge education high school university college academy student study learning homework research documentation saved later future reference index code coding version control git repository"
  },
  {
    "id": "book-minus",
    "char": "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20 M9 10h6",
    "category": "files",
    "tags": "code coding version control git repository remove delete censor cancel forbid prohibit ban uneducated re-educate unlearn downgrade"
  },
  {
    "id": "book-open-check",
    "char": "M12 21V7 m16 12 2 2 4-4 M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3",
    "category": "ui",
    "tags": "read pages booklet magazine leaflet pamphlet library written authored published informed knowledgeable educated schooled homework examined tested marked passed graduated studied learned lesson researched documented revealed blank plain language true truth verified corrected task todo done completed finished ticked"
  },
  {
    "id": "book-open-text",
    "char": "M12 7v14 M16 12h2 M16 8h2 M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z M6 12h2 M6 8h2",
    "category": "ui",
    "tags": "reading pages booklet magazine leaflet pamphlet library writing written writer author story script fiction novel information knowledge education high school university college academy student study learning homework research documentation revealed"
  },
  {
    "id": "book-open",
    "char": "M12 7v14 M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
    "category": "files",
    "tags": "reading pages booklet magazine leaflet pamphlet library writing written writer author story script screenplay fiction novel information knowledge education high school university college academy student study learning homework research documentation revealed blank plain"
  },
  {
    "id": "book-plus",
    "char": "M12 7v6 M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20 M9 10h6",
    "category": "ui",
    "tags": "code coding version control git repository remove delete read write author publish inform graduate re-educate study learn research knowledge improve upgrade level up"
  },
  {
    "id": "book-search",
    "char": "M11 22H5.5a1 1 0 0 1 0-5h4.501 m21 22-1.879-1.878 M3 19.5v-15A2.5 2.5 0 0 1 5.5 2H18a1 1 0 0 1 1 1v8 M 17, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "reading library study education research knowledge discover browsing lookup finding scanning"
  },
  {
    "id": "book-text",
    "char": "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20 M8 11h8 M8 7h6",
    "category": "ui",
    "tags": "reading booklet magazine leaflet pamphlet tome library writing written writer author story script fiction novel information knowledge education high school university college academy student study learning homework research documentation"
  },
  {
    "id": "book-type",
    "char": "M10 13h4 M12 6v7 M16 8V6H8v2 M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
    "category": "files",
    "tags": "thesaurus synonym reading booklet magazine leaflet pamphlet tome library writing written writer author story script fiction novel information knowledge education high school university college academy student study learning homework research language translate typography fonts collection"
  },
  {
    "id": "book-up-2",
    "char": "M12 13V7 M18 2h1a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20 M4 19.5v-15A2.5 2.5 0 0 1 6.5 2 m9 10 3-3 3 3 m9 5 3-3 3 3",
    "category": "files",
    "tags": "code coding version control git repository push force"
  },
  {
    "id": "book-up",
    "char": "M12 13V7 M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20 m9 10 3-3 3 3",
    "category": "files",
    "tags": "code coding version control git repository push"
  },
  {
    "id": "book-user",
    "char": "M15 13a3 3 0 1 0-6 0 M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20 M 12, 8 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "person people family friends acquaintances contacts details addresses phone numbers directory listing networking"
  },
  {
    "id": "book-x",
    "char": "m14.5 7-5 5 M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20 m9.5 7 5 5",
    "category": "ui",
    "tags": "code coding version control git repository remove delete reading misinformation disinformation misinformed charlatan sophistry false lies untruth propaganda censored cancelled forbidden prohibited banned uneducated re-education unlearn"
  },
  {
    "id": "book",
    "char": "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
    "category": "files",
    "tags": "reading paperback booklet magazine leaflet pamphlet tome library writing written writer author story script fiction novel information knowledge education high school university college academy student study learning homework research documentation"
  },
  {
    "id": "bookmark-check",
    "char": "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z m9 10 2 2 4-4",
    "category": "ui",
    "tags": "read finished complete clip marker tag task todo"
  },
  {
    "id": "bookmark-minus",
    "char": "M15 10H9 M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
    "category": "files",
    "tags": "delete remove"
  },
  {
    "id": "bookmark-plus",
    "char": "M12 7v6 M15 10H9 M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
    "category": "ui",
    "tags": "add"
  },
  {
    "id": "bookmark-x",
    "char": "m14.5 7.5-5 5 M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z m9.5 7.5 5 5",
    "category": "ui",
    "tags": "read clip marker tag cancel close delete remove clear"
  },
  {
    "id": "bookmark",
    "char": "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
    "category": "files",
    "tags": "save favorite mark label attachment file stick pin read clip marker tag"
  },
  {
    "id": "boom-box",
    "char": "M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4 M8 8v1 M12 8v1 M16 8v1 M 2 9 h 20 v 12 h -20 Z M 8, 15 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 16, 15 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "radio speakers audio music sound broadcast live frequency"
  },
  {
    "id": "bot-message-square",
    "char": "M12 6V2H8 M15 11v2 M2 12h2 M20 12h2 M20 16a2 2 0 0 1-2 2H8.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 4 20.286V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z M9 11v2",
    "category": "communication",
    "tags": "robot ai chat assistant"
  },
  {
    "id": "bot-off",
    "char": "M13.67 8H18a2 2 0 0 1 2 2v4.33 M2 14h2 M20 14h2 M22 22 2 2 M8 8H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 1.414-.586 M9 13v2 M9.67 4H12v2.33",
    "category": "ui",
    "tags": "robot ai chat assistant"
  },
  {
    "id": "bot",
    "char": "M12 8V4H8 M 4 8 h 16 v 12 h -16 Z M2 14h2 M20 14h2 M15 13v2 M9 13v2",
    "category": "ui",
    "tags": "robot ai chat assistant"
  },
  {
    "id": "bottle-wine",
    "char": "M10 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a6 6 0 0 0 1.2 3.6l.6.8A6 6 0 0 1 17 13v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-8a6 6 0 0 1 1.2-3.6l.6-.8A6 6 0 0 0 10 5z M17 13h-4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h4",
    "category": "ui",
    "tags": "alcohol drink glass goblet chalice vineyard winery red white rose dry sparkling bar party nightclub nightlife sommelier restaurant dinner meal"
  },
  {
    "id": "bow-arrow",
    "char": "M17 3h4v4 M18.575 11.082a13 13 0 0 1 1.048 9.027 1.17 1.17 0 0 1-1.914.597L14 17 M7 10 3.29 6.29a1.17 1.17 0 0 1 .6-1.91 13 13 0 0 1 9.03 1.05 M7 14a1.7 1.7 0 0 0-1.207.5l-2.646 2.646A.5.5 0 0 0 3.5 18H5a1 1 0 0 1 1 1v1.5a.5.5 0 0 0 .854.354L9.5 18.207A1.7 1.7 0 0 0 10 17v-2a1 1 0 0 0-1-1z M9.707 14.293 21 3",
    "category": "arrows",
    "tags": "archer archery game war weapon"
  },
  {
    "id": "box",
    "char": "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z m3.3 7 8.7 5 8.7-5 M12 22V12",
    "category": "ui",
    "tags": "cube package container storage geometry 3d isometric"
  },
  {
    "id": "boxes",
    "char": "M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z m7 16.5-4.74-2.85 m7 16.5 5-3 M7 16.5v5.17 M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z m17 16.5-5-3 m17 16.5 4.74-2.85 M17 16.5v5.17 M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z M12 8 7.26 5.15 m12 8 4.74-2.85 M12 13.5V8",
    "category": "ui",
    "tags": "cubes packages parts group units collection cluster geometry"
  },
  {
    "id": "braces",
    "char": "M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1 M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1",
    "category": "ui",
    "tags": "json code token curly brackets data { }"
  },
  {
    "id": "brackets",
    "char": "M16 3h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-3 M8 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3",
    "category": "ui",
    "tags": "code token array list square [ ]"
  },
  {
    "id": "brain-circuit",
    "char": "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z M9 13a4.5 4.5 0 0 0 3-4 M6.003 5.125A3 3 0 0 0 6.401 6.5 M3.477 10.896a4 4 0 0 1 .585-.396 M6 18a4 4 0 0 1-1.967-.516 M12 13h4 M12 18h6a2 2 0 0 1 2 2v1 M12 8h8 M16 8V5a2 2 0 0 1 2-2 M 16, 13 m -.5, 0 a .5,.5 0 1,0 1,0 a .5,.5 0 1,0 -1,0 M 18, 3 m -.5, 0 a .5,.5 0 1,0 1,0 a .5,.5 0 1,0 -1,0 M 20, 21 m -.5, 0 a .5,.5 0 1,0 1,0 a .5,.5 0 1,0 -1,0 M 20, 8 m -.5, 0 a .5,.5 0 1,0 1,0 a .5,.5 0 1,0 -1,0",
    "category": "ui",
    "tags": "mind intellect artificial intelligence ai deep learning machine learning computing"
  },
  {
    "id": "brain-cog",
    "char": "m10.852 14.772-.383.923 m10.852 9.228-.383-.923 m13.148 14.772.382.924 m13.531 8.305-.383.923 m14.772 10.852.923-.383 m14.772 13.148.923.383 M17.598 6.5A3 3 0 1 0 12 5a3 3 0 0 0-5.63-1.446 3 3 0 0 0-.368 1.571 4 4 0 0 0-2.525 5.771 M17.998 5.125a4 4 0 0 1 2.525 5.771 M19.505 10.294a4 4 0 0 1-1.5 7.706 M4.032 17.483A4 4 0 0 0 11.464 20c.18-.311.892-.311 1.072 0a4 4 0 0 0 7.432-2.516 M4.5 10.291A4 4 0 0 0 6 18 M6.002 5.125a3 3 0 0 0 .4 1.375 m9.228 10.852-.923-.383 m9.228 13.148-.923.383 M 12, 12 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "mind intellect artificial intelligence ai deep learning machine learning computing"
  },
  {
    "id": "brain",
    "char": "M12 18V5 M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4 M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5 M17.997 5.125a4 4 0 0 1 2.526 5.77 M18 18a4 4 0 0 0 2-7.464 M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517 M6 18a4 4 0 0 1-2-7.464 M6.003 5.125a4 4 0 0 0-2.526 5.77",
    "category": "ui",
    "tags": "medical mind mental intellect cerebral consciousness genius artificial intelligence ai think thought insight intelligent smart"
  },
  {
    "id": "brick-wall-fire",
    "char": "M16 3v2.107 M17 9c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 22 17a5 5 0 0 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C13 11.5 16 9 17 9 M21 8.274V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.938 M3 15h5.253 M3 9h8.228 M8 15v6 M8 3v6",
    "category": "ui",
    "tags": "firewall security bricks mortar cement materials construction builder labourer quantity surveyor blocks stone campfire camping wilderness outdoors lit warmth wood twigs sticks"
  },
  {
    "id": "brick-wall-shield",
    "char": "M12 9v1.258 M16 3v5.46 M21 9.118V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5.75 M22 17.5c0 2.499-1.75 3.749-3.83 4.474a.5.5 0 0 1-.335-.005c-2.085-.72-3.835-1.97-3.835-4.47V14a.5.5 0 0 1 .5-.499c1 0 2.25-.6 3.12-1.36a.6.6 0 0 1 .76-.001c.875.765 2.12 1.36 3.12 1.36a.5.5 0 0 1 .5.5z M3 15h7 M3 9h12.142 M8 15v6 M8 3v6",
    "category": "ui",
    "tags": "firewall security bricks mortar cement materials construction builder labourer quantity surveyor blocks stone cybersecurity secure safety protection guardian armored armoured defense defence defender block threat prevention antivirus vigilance vigilant detection scan find strength strong tough invincible invincibility invulnerable undamaged audit admin verification crest bravery knight foot soldier infantry trooper pawn battle war military army cadet scout"
  },
  {
    "id": "brick-wall",
    "char": "M 3 3 h 18 v 18 h -18 Z M12 9v6 M16 15v6 M16 3v6 M3 15h18 M3 9h18 M8 15v6 M8 3v6",
    "category": "ui",
    "tags": "bricks mortar cement materials construction builder labourer quantity surveyor blocks stone"
  },
  {
    "id": "briefcase-business",
    "char": "M12 12h.01 M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2 M22 13a18.15 18.15 0 0 1-20 0 M 2 6 h 20 v 14 h -20 Z",
    "category": "ui",
    "tags": "work bag baggage folder portfolio"
  },
  {
    "id": "briefcase-conveyor-belt",
    "char": "M10 20v2 M14 20v2 M18 20v2 M21 20H3 M6 20v2 M8 16V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12 M 4 6 h 16 v 10 h -16 Z",
    "category": "ui",
    "tags": "baggage luggage travel suitcase conveyor carousel"
  },
  {
    "id": "briefcase-medical",
    "char": "M12 11v4 M14 13h-4 M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2 M18 6v14 M6 6v14 M 2 6 h 20 v 14 h -20 Z",
    "category": "ui",
    "tags": "doctor medicine first aid"
  },
  {
    "id": "briefcase",
    "char": "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16 M 2 6 h 20 v 14 h -20 Z",
    "category": "ui",
    "tags": "work bag baggage folder"
  },
  {
    "id": "bring-to-front",
    "char": "M 8 8 h 8 v 8 h -8 Z M4 10a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2 M14 20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2",
    "category": "ui",
    "tags": "bring send move over forward front overlap layer order"
  },
  {
    "id": "brush-cleaning",
    "char": "m16 22-1-4 M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1 M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z m8 22 1-4",
    "category": "ui",
    "tags": "cleaning utensil housekeeping tool sweeping scrubbing hygiene maintenance household cleaner chores equipment sanitation bristles handle home care sanitize purify wash disinfect sterilize scrub polish decontaminate wipe spotless remove empty erase purge eliminate"
  },
  {
    "id": "brush",
    "char": "m11 10 3 3 M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031",
    "category": "ui",
    "tags": "clean sweep refactor remove draw paint color artist"
  },
  {
    "id": "bubbles",
    "char": "M7.001 15.085A1.5 1.5 0 0 1 9 16.5 M 18.5, 8.5 m -3.5, 0 a 3.5,3.5 0 1,0 7,0 a 3.5,3.5 0 1,0 -7,0 M 7.5, 16.5 m -5.5, 0 a 5.5,5.5 0 1,0 11,0 a 5.5,5.5 0 1,0 -11,0 M 7.5, 4.5 m -2.5, 0 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0",
    "category": "ui",
    "tags": "water cleaning soap bath hygiene freshness wash foam cleanliness shampoo purity splash lightness airy relaxation spa bubbly fluid floating drop"
  },
  {
    "id": "bug-off",
    "char": "M12 20v-8 M12.656 7H14a4 4 0 0 1 4 4v1.344 M14.12 3.88 16 2 M17.123 17.123A6 6 0 0 1 6 14v-3a4 4 0 0 1 1.72-3.287 m2 2 20 20 M21 5a4 4 0 0 1-3.55 3.97 M22 13h-3.344 M3 21a4 4 0 0 1 3.81-4 M3 5a4 4 0 0 0 3.55 3.97 M6 13H2 m8 2 1.88 1.88 M9.712 4.06A3 3 0 0 1 15 6v1.13",
    "category": "ui",
    "tags": "issue fixed resolved testing debug code insect kill exterminate pest control"
  },
  {
    "id": "bug-play",
    "char": "M10 19.655A6 6 0 0 1 6 14v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 3.97 M14 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z M14.12 3.88 16 2 M21 5a4 4 0 0 1-3.55 3.97 M3 21a4 4 0 0 1 3.81-4 M3 5a4 4 0 0 0 3.55 3.97 M6 13H2 m8 2 1.88 1.88 M9 7.13V6a3 3 0 1 1 6 0v1.13",
    "category": "media",
    "tags": "issue testing debug reproduce code insect"
  },
  {
    "id": "bug",
    "char": "M12 20v-9 M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z M14.12 3.88 16 2 M21 21a4 4 0 0 0-3.81-4 M21 5a4 4 0 0 1-3.55 3.97 M22 13h-4 M3 21a4 4 0 0 1 3.81-4 M3 5a4 4 0 0 0 3.55 3.97 M6 13H2 m8 2 1.88 1.88 M9 7.13V6a3 3 0 1 1 6 0v1.13",
    "category": "ui",
    "tags": "issue error defect testing troubleshoot problem report debug code insect beetle"
  },
  {
    "id": "building-2",
    "char": "M10 12h4 M10 8h4 M14 21v-3a2 2 0 0 0-4 0v3 M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2 M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16",
    "category": "ui",
    "tags": "business company enterprise skyscraper organisation organization city"
  },
  {
    "id": "building",
    "char": "M12 10h.01 M12 14h.01 M12 6h.01 M16 10h.01 M16 14h.01 M16 6h.01 M8 10h.01 M8 14h.01 M8 6h.01 M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3 M 4 2 h 16 v 20 h -16 Z",
    "category": "ui",
    "tags": "organisation organization"
  },
  {
    "id": "bus-front",
    "char": "M4 6 2 7 M10 6h4 m22 7-2-1 M 4 3 h 16 v 16 h -16 Z M4 11h16 M8 15h.01 M16 15h.01 M6 19v2 M18 21v-2",
    "category": "ui",
    "tags": "coach vehicle trip road"
  },
  {
    "id": "bus",
    "char": "M8 6v6 M15 6v6 M2 12h19.6 M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3 M 7, 18 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M9 18h5 M 16, 18 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "bus vehicle transport trip"
  },
  {
    "id": "cable-car",
    "char": "M10 3h.01 M14 2h.01 m2 9 20-5 M12 12V6.5 M 4 12 h 16 v 10 h -16 Z M9 12v5 M15 12v5 M4 17h16",
    "category": "ui",
    "tags": "ski lift winter holiday alpine resort mountains"
  },
  {
    "id": "cable",
    "char": "M17 19a1 1 0 0 1-1-1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1z M17 21v-2 M19 14V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V10 M21 21v-2 M3 5V3 M4 10a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2z M7 5V3",
    "category": "ui",
    "tags": "cord wire connector connection link signal console computer equipment electricity energy electronics recharging charger power supply disconnected unplugged plugs interface input output audio video av rca scart tv television optical"
  },
  {
    "id": "cake-slice",
    "char": "M16 13H3 M16 17H3 m7.2 7.9-3.388 2.5A2 2 0 0 0 3 12.01V20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8.654c0-2-2.44-6.026-6.44-8.026a1 1 0 0 0-1.082.057L10.4 5.6 M 9, 7 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "birthday birthdate celebration party surprise gateaux dessert candles wish fondant icing sugar sweet baking"
  },
  {
    "id": "cake",
    "char": "M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8 M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1 M2 21h20 M7 8v3 M12 8v3 M17 8v3 M7 4h.01 M12 4h.01 M17 4h.01",
    "category": "ui",
    "tags": "birthday birthdate celebration party surprise gateaux dessert fondant icing sugar sweet baking"
  },
  {
    "id": "calculator",
    "char": "M 4 2 h 16 v 20 h -16 Z M16 10h.01 M12 10h.01 M8 10h.01 M12 14h.01 M8 14h.01 M12 18h.01 M8 18h.01",
    "category": "ui",
    "tags": "count calculating machine"
  },
  {
    "id": "calendar-1",
    "char": "M11 14h1v4 M16 2v4 M3 10h18 M8 2v4 M 3 4 h 18 v 18 h -18 Z",
    "category": "ui",
    "tags": "date month year event single singular once 1 first"
  },
  {
    "id": "calendar-arrow-down",
    "char": "m14 18 4 4 4-4 M16 2v4 M18 14v8 M21 11.354V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.343 M3 10h18 M8 2v4",
    "category": "arrows",
    "tags": "date month year event sort order ascending descending increasing decreasing rising falling"
  },
  {
    "id": "calendar-arrow-up",
    "char": "m14 18 4-4 4 4 M16 2v4 M18 22v-8 M21 11.343V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9 M3 10h18 M8 2v4",
    "category": "arrows",
    "tags": "date month year event sort order ascending descending increasing decreasing rising falling"
  },
  {
    "id": "calendar-check-2",
    "char": "M8 2v4 M16 2v4 M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8 M3 10h18 m16 20 2 2 4-4",
    "category": "ui",
    "tags": "date day month year event confirm subscribe schedule done todo tick complete task"
  },
  {
    "id": "calendar-check",
    "char": "M8 2v4 M16 2v4 M 3 4 h 18 v 18 h -18 Z M3 10h18 m9 16 2 2 4-4",
    "category": "ui",
    "tags": "date day month year event confirm subscribe schedule done todo tick complete task"
  },
  {
    "id": "calendar-clock",
    "char": "M16 14v2.2l1.6 1 M16 2v4 M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5 M3 10h5 M8 2v4 M 16, 16 m -6, 0 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0",
    "category": "ui",
    "tags": "date day month year event clock hour"
  },
  {
    "id": "calendar-cog",
    "char": "m15.228 16.852-.923-.383 m15.228 19.148-.923.383 M16 2v4 m16.47 14.305.382.923 m16.852 20.772-.383.924 m19.148 15.228.383-.923 m19.53 21.696-.382-.924 m20.772 16.852.924-.383 m20.772 19.148.924.383 M21 10.592V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6 M3 10h18 M8 2v4 M 18, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "date day month year events settings gear cog"
  },
  {
    "id": "calendar-days",
    "char": "M8 2v4 M16 2v4 M 3 4 h 18 v 18 h -18 Z M3 10h18 M8 14h.01 M12 14h.01 M16 14h.01 M8 18h.01 M12 18h.01 M16 18h.01",
    "category": "ui",
    "tags": "date month year event"
  },
  {
    "id": "calendar-fold",
    "char": "M3 20a2 2 0 0 0 2 2h10a2.4 2.4 0 0 0 1.706-.706l3.588-3.588A2.4 2.4 0 0 0 21 16V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z M15 22v-5a1 1 0 0 1 1-1h5 M8 2v4 M16 2v4 M3 10h18",
    "category": "ui",
    "tags": "date month year event birthday birthdate ics"
  },
  {
    "id": "calendar-heart",
    "char": "M12.127 22H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.125 M14.62 18.8A2.25 2.25 0 1 1 18 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z M16 2v4 M3 10h18 M8 2v4",
    "category": "ui",
    "tags": "date month year event heart favourite subscribe valentines day"
  },
  {
    "id": "calendar-minus-2",
    "char": "M8 2v4 M16 2v4 M 3 4 h 18 v 18 h -18 Z M3 10h18 M10 16h4",
    "category": "ui",
    "tags": "date day month year event delete remove"
  },
  {
    "id": "calendar-minus",
    "char": "M16 19h6 M16 2v4 M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5 M3 10h18 M8 2v4",
    "category": "ui",
    "tags": "date day month year event delete remove"
  },
  {
    "id": "calendar-off",
    "char": "M4.2 4.2A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18 M21 15.5V6a2 2 0 0 0-2-2H9.5 M16 2v4 M3 10h7 M21 10h-5.5 m2 2 20 20",
    "category": "ui",
    "tags": "date day month year event delete remove"
  },
  {
    "id": "calendar-plus-2",
    "char": "M8 2v4 M16 2v4 M 3 4 h 18 v 18 h -18 Z M3 10h18 M10 16h4 M12 14v4",
    "category": "ui",
    "tags": "date day month year event add subscribe create new"
  },
  {
    "id": "calendar-plus",
    "char": "M16 19h6 M16 2v4 M19 16v6 M21 12.598V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5 M3 10h18 M8 2v4",
    "category": "ui",
    "tags": "date day month year event add subscribe create new"
  },
  {
    "id": "calendar-range",
    "char": "M 3 4 h 18 v 18 h -18 Z M16 2v4 M3 10h18 M8 2v4 M17 14h-6 M13 18H7 M7 14h.01 M17 18h.01",
    "category": "ui",
    "tags": "date day month year event range period"
  },
  {
    "id": "calendar-search",
    "char": "M16 2v4 M21 11.75V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.25 m22 22-1.875-1.875 M3 10h18 M8 2v4 M 18, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "date day month year events search lens"
  },
  {
    "id": "calendar-sync",
    "char": "M11 10v4h4 m11 14 1.535-1.605a5 5 0 0 1 8 1.5 M16 2v4 m21 18-1.535 1.605a5 5 0 0 1-8-1.5 M21 22v-4h-4 M21 8.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4.3 M3 10h4 M8 2v4",
    "category": "ui",
    "tags": "repeat refresh reconnect transfer backup date month year event subscribe recurring schedule reminder automatic auto"
  },
  {
    "id": "calendar-x-2",
    "char": "M8 2v4 M16 2v4 M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8 M3 10h18 m17 22 5-5 m17 17 5 5",
    "category": "ui",
    "tags": "date day month year event remove"
  },
  {
    "id": "calendar-x",
    "char": "M8 2v4 M16 2v4 M 3 4 h 18 v 18 h -18 Z M3 10h18 m14 14-4 4 m10 14 4 4",
    "category": "ui",
    "tags": "date day month year event remove busy"
  },
  {
    "id": "calendar",
    "char": "M8 2v4 M16 2v4 M 3 4 h 18 v 18 h -18 Z M3 10h18",
    "category": "ui",
    "tags": "date month year event birthday birthdate"
  },
  {
    "id": "calendars",
    "char": "M12 2v2 M15.726 21.01A2 2 0 0 1 14 22H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2 M18 2v2 M2 13h2 M8 8h14 M 8 3 h 14 v 14 h -14 Z",
    "category": "ui",
    "tags": "date month year event dates months years events"
  },
  {
    "id": "camera-off",
    "char": "M14.564 14.558a3 3 0 1 1-4.122-4.121 m2 2 20 20 M20 20H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 .819-.175 M9.695 4.024A2 2 0 0 1 10.004 4h3.993a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v7.344",
    "category": "media",
    "tags": "photo webcam video"
  },
  {
    "id": "camera",
    "char": "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z M 12, 13 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "media",
    "tags": "photography lens focus capture shot visual image device equipment photo webcam video"
  },
  {
    "id": "candy-cane",
    "char": "M5.7 21a2 2 0 0 1-3.5-2l8.6-14a6 6 0 0 1 10.4 6 2 2 0 1 1-3.464-2 2 2 0 1 0-3.464-2Z M17.75 7 15 2.1 M10.9 4.8 13 9 m7.9 9.7 2 4.4 M4.9 14.7 7 18.9",
    "category": "ui",
    "tags": "sugar food sweet christmas xmas"
  },
  {
    "id": "candy-off",
    "char": "M10 10v7.9 M11.802 6.145a5 5 0 0 1 6.053 6.053 M14 6.1v2.243 m15.5 15.571-.964.964a5 5 0 0 1-7.071 0 5 5 0 0 1 0-7.07l.964-.965 M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4 m2 2 20 20 M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4",
    "category": "ui",
    "tags": "sugar free food sweet allergy intolerance diet"
  },
  {
    "id": "candy",
    "char": "M10 7v10.9 M14 6.1V17 M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4 M16.536 7.465a5 5 0 0 0-7.072 0l-2 2a5 5 0 0 0 0 7.07 5 5 0 0 0 7.072 0l2-2a5 5 0 0 0 0-7.07 M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4",
    "category": "ui",
    "tags": "sugar food sweet"
  },
  {
    "id": "cannabis-off",
    "char": "M12 22v-4c1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5 M13.988 8.327C13.902 6.054 13.365 3.82 12 2a9.3 9.3 0 0 0-1.445 2.9 M17.375 11.725C18.882 10.53 21 7.841 21 6c-2.324 0-5.08 1.296-6.662 2.684 m2 2 20 20 M21.024 15.378A15 15 0 0 0 22 15c-.426-1.279-2.67-2.557-4.25-2.907 M6.995 6.992C5.714 6.4 4.29 6 3 6c0 2 2.5 5 4 6-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3",
    "category": "ui",
    "tags": "cannabis weed leaf"
  },
  {
    "id": "cannabis",
    "char": "M12 22v-4 M7 12c-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3 1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5 0 0 2.5.5 6-1-.5-1.5-3.5-3-5-3 1.5-1 4-4 4-6-2.5 0-5.5 1.5-7 3 0-2.5-.5-5-2-7-1.5 2-2 4.5-2 7-1.5-1.5-4.5-3-7-3 0 2 2.5 5 4 6",
    "category": "ui",
    "tags": "cannabis weed leaf"
  },
  {
    "id": "captions-off",
    "char": "M10.5 5H19a2 2 0 0 1 2 2v8.5 M17 11h-.5 M19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2 m2 2 20 20 M7 11h4 M7 15h2.5",
    "category": "ui",
    "tags": "closed captions subtitles subhead transcription transcribe dialogue accessibility"
  },
  {
    "id": "captions",
    "char": "M 3 5 h 18 v 14 h -18 Z M7 15h4M15 15h2M7 11h2M13 11h4",
    "category": "ui",
    "tags": "closed captions subtitles subhead transcription transcribe dialogue accessibility"
  },
  {
    "id": "car-front",
    "char": "m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8 M7 14h.01 M17 14h.01 M 3 10 h 18 v 8 h -18 Z M5 18v2 M19 18v2",
    "category": "ui",
    "tags": "vehicle drive trip journey"
  },
  {
    "id": "car-taxi-front",
    "char": "M10 2h4 m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8 M7 14h.01 M17 14h.01 M 3 10 h 18 v 8 h -18 Z M5 18v2 M19 18v2",
    "category": "ui",
    "tags": "cab vehicle drive trip journey"
  },
  {
    "id": "car",
    "char": "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2 M 7, 17 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M9 17h6 M 17, 17 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "vehicle drive trip journey"
  },
  {
    "id": "caravan",
    "char": "M18 19V9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a2 2 0 0 0 2 2h2 M2 9h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2 M22 17v1a1 1 0 0 1-1 1H10v-9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v9 M 8, 19 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "trailer tow camping campsite mobile home holiday nomadic wilderness outdoors"
  },
  {
    "id": "card-sim",
    "char": "M12 14v4 M14.172 2a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 20 7.828V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z M8 14h8 M 8 10 h 8 v 8 h -8 Z",
    "category": "ui",
    "tags": "cellphone smartphone mobile network cellular service provider signal coverage disk data format storage flash digital contacts phone book contractual circuit board chip"
  },
  {
    "id": "carrot",
    "char": "M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM8.64 14l-2.05-2.04M15.34 15l-2.46-2.46 M22 9s-1.33-2-3.5-2C16.86 7 15 9 15 9s1.33 2 3.5 2S22 9 22 9z M15 2s-2 1.33-2 3.5S15 9 15 9s2-1.84 2-3.5C17 3.33 15 2 15 2z",
    "category": "ui",
    "tags": "vegetable food eat"
  },
  {
    "id": "case-lower",
    "char": "M10 9v7 M14 6v10 M 17.5, 12.5 m -3.5, 0 a 3.5,3.5 0 1,0 7,0 a 3.5,3.5 0 1,0 -7,0 M 6.5, 12.5 m -3.5, 0 a 3.5,3.5 0 1,0 7,0 a 3.5,3.5 0 1,0 -7,0",
    "category": "ui",
    "tags": "text letters characters font typography"
  },
  {
    "id": "case-sensitive",
    "char": "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16 M22 9v7 M3.304 13h6.392 M 18.5, 12.5 m -3.5, 0 a 3.5,3.5 0 1,0 7,0 a 3.5,3.5 0 1,0 -7,0",
    "category": "ui",
    "tags": "text letters characters font typography"
  },
  {
    "id": "case-upper",
    "char": "M15 11h4.5a1 1 0 0 1 0 5h-4a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h3a1 1 0 0 1 0 5 m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16 M3.304 13h6.392",
    "category": "ui",
    "tags": "text letters characters font typography"
  },
  {
    "id": "cassette-tape",
    "char": "M 2 4 h 20 v 16 h -20 Z M 8, 10 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M8 12h8 M 16, 10 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 m6 20 .7-2.9A1.4 1.4 0 0 1 8.1 16h7.8a1.4 1.4 0 0 1 1.4 1l.7 3",
    "category": "ui",
    "tags": "audio music recording play"
  },
  {
    "id": "cast",
    "char": "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6 M2 12a9 9 0 0 1 8 8 M2 16a5 5 0 0 1 4 4",
    "category": "ui",
    "tags": "chromecast airplay screen"
  },
  {
    "id": "castle",
    "char": "M10 5V3 M14 5V3 M15 21v-3a3 3 0 0 0-6 0v3 M18 3v8 M18 5H6 M22 11H2 M22 9v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9 M6 3v8",
    "category": "ui",
    "tags": "fortress stronghold palace chateau building"
  },
  {
    "id": "cat",
    "char": "M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z M8 14v.5 M16 14v.5 M11.25 16.25h1.5L12 17l-.75-.75Z",
    "category": "ui",
    "tags": "animal pet kitten feline"
  },
  {
    "id": "cctv",
    "char": "M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97 M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15 M2 21v-4 M7 9h.01",
    "category": "ui",
    "tags": "camera surveillance recording film videotape crime watching"
  },
  {
    "id": "chart-area",
    "char": "M3 3v16a2 2 0 0 0 2 2h16 M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z",
    "category": "ui",
    "tags": "statistics analytics diagram graph area"
  },
  {
    "id": "chart-bar-big",
    "char": "M3 3v16a2 2 0 0 0 2 2h16 M 7 13 h 9 v 4 h -9 Z M 7 5 h 12 v 4 h -12 Z",
    "category": "ui",
    "tags": "statistics analytics diagram graph"
  },
  {
    "id": "chart-bar-decreasing",
    "char": "M3 3v16a2 2 0 0 0 2 2h16 M7 11h8 M7 16h3 M7 6h12",
    "category": "ui",
    "tags": "statistics analytics diagram graph trending down"
  },
  {
    "id": "chart-bar-increasing",
    "char": "M3 3v16a2 2 0 0 0 2 2h16 M7 11h8 M7 16h12 M7 6h3",
    "category": "ui",
    "tags": "statistics analytics diagram graph trending up"
  },
  {
    "id": "chart-bar-stacked",
    "char": "M11 13v4 M15 5v4 M3 3v16a2 2 0 0 0 2 2h16 M 7 13 h 9 v 4 h -9 Z M 7 5 h 12 v 4 h -12 Z",
    "category": "ui",
    "tags": "statistics analytics diagram graph multivariate categorical comparison"
  },
  {
    "id": "chart-bar",
    "char": "M3 3v16a2 2 0 0 0 2 2h16 M7 16h8 M7 11h12 M7 6h3",
    "category": "ui",
    "tags": "statistics analytics diagram graph"
  },
  {
    "id": "chart-candlestick",
    "char": "M9 5v4 M 7 9 h 4 v 6 h -4 Z M9 15v2 M17 3v2 M 15 5 h 4 v 8 h -4 Z M17 13v3 M3 3v16a2 2 0 0 0 2 2h16",
    "category": "ui",
    "tags": "trading trader financial markets portfolio assets prices value valuation commodities currencies currency stocks exchange hedge fund statistics analytics diagram graph"
  },
  {
    "id": "chart-column-big",
    "char": "M3 3v16a2 2 0 0 0 2 2h16 M 15 5 h 4 v 12 h -4 Z M 7 8 h 4 v 9 h -4 Z",
    "category": "ui",
    "tags": "statistics analytics diagram graph"
  },
  {
    "id": "chart-column-decreasing",
    "char": "M13 17V9 M18 17v-3 M3 3v16a2 2 0 0 0 2 2h16 M8 17V5",
    "category": "ui",
    "tags": "statistics analytics diagram graph trending down"
  },
  {
    "id": "chart-column-increasing",
    "char": "M13 17V9 M18 17V5 M3 3v16a2 2 0 0 0 2 2h16 M8 17v-3",
    "category": "ui",
    "tags": "statistics analytics diagram graph trending up"
  },
  {
    "id": "chart-column-stacked",
    "char": "M11 13H7 M19 9h-4 M3 3v16a2 2 0 0 0 2 2h16 M 15 5 h 4 v 12 h -4 Z M 7 8 h 4 v 9 h -4 Z",
    "category": "ui",
    "tags": "statistics analytics diagram graph multivariate categorical comparison"
  },
  {
    "id": "chart-column",
    "char": "M3 3v16a2 2 0 0 0 2 2h16 M18 17V9 M13 17V5 M8 17v-3",
    "category": "ui",
    "tags": "statistics analytics diagram graph"
  },
  {
    "id": "chart-gantt",
    "char": "M10 6h8 M12 16h6 M3 3v16a2 2 0 0 0 2 2h16 M8 11h7",
    "category": "ui",
    "tags": "diagram graph timeline planning"
  },
  {
    "id": "chart-line",
    "char": "M3 3v16a2 2 0 0 0 2 2h16 m19 9-5 5-4-4-3 3",
    "category": "ui",
    "tags": "statistics analytics diagram graph"
  },
  {
    "id": "chart-network",
    "char": "m13.11 7.664 1.78 2.672 m14.162 12.788-3.324 1.424 m20 4-6.06 1.515 M3 3v16a2 2 0 0 0 2 2h16 M 12, 6 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 16, 12 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 9, 15 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "statistics analytics diagram graph topology cluster web nodes connections edges"
  },
  {
    "id": "chart-no-axes-column-decreasing",
    "char": "M5 21V3 M12 21V9 M19 21v-6",
    "category": "ui",
    "tags": "statistics analytics diagram graph trending down"
  },
  {
    "id": "chart-no-axes-column-increasing",
    "char": "M5 21v-6 M12 21V9 M19 21V3",
    "category": "ui",
    "tags": "statistics analytics diagram graph trending up"
  },
  {
    "id": "chart-no-axes-column",
    "char": "M5 21v-6 M12 21V3 M19 21V9",
    "category": "ui",
    "tags": "statistics analytics diagram graph"
  },
  {
    "id": "chart-no-axes-combined",
    "char": "M12 16v5 M16 14v7 M20 10v11 m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15 M4 18v3 M8 14v7",
    "category": "ui",
    "tags": "statistics analytics diagram graph trending up"
  },
  {
    "id": "chart-no-axes-gantt",
    "char": "M6 5h12 M4 12h10 M12 19h8",
    "category": "ui",
    "tags": "projects manage overview roadmap plan intentions timeline deadline date event range period productivity work agile code coding"
  },
  {
    "id": "chart-pie",
    "char": "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z M21.21 15.89A10 10 0 1 1 8 2.83",
    "category": "ui",
    "tags": "statistics analytics diagram presentation"
  },
  {
    "id": "chart-scatter",
    "char": "M 7.5, 7.5 m -.5, 0 a .5,.5 0 1,0 1,0 a .5,.5 0 1,0 -1,0 M 18.5, 5.5 m -.5, 0 a .5,.5 0 1,0 1,0 a .5,.5 0 1,0 -1,0 M 11.5, 11.5 m -.5, 0 a .5,.5 0 1,0 1,0 a .5,.5 0 1,0 -1,0 M 7.5, 16.5 m -.5, 0 a .5,.5 0 1,0 1,0 a .5,.5 0 1,0 -1,0 M 17.5, 14.5 m -.5, 0 a .5,.5 0 1,0 1,0 a .5,.5 0 1,0 -1,0 M3 3v16a2 2 0 0 0 2 2h16",
    "category": "ui",
    "tags": "statistics analytics diagram graph"
  },
  {
    "id": "chart-spline",
    "char": "M3 3v16a2 2 0 0 0 2 2h16 M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7",
    "category": "ui",
    "tags": "statistics analytics diagram graph curve continuous smooth polynomial quadratic function interpolation"
  },
  {
    "id": "check-check",
    "char": "M18 6 7 17l-5-5 m22 10-7.5 7.5L13 16",
    "category": "ui",
    "tags": "done received double todo tick complete task"
  },
  {
    "id": "check-line",
    "char": "M20 4L9 15 M21 19L3 19 M9 15L4 10",
    "category": "ui",
    "tags": "done todo tick complete task"
  },
  {
    "id": "check",
    "char": "M20 6 9 17l-5-5",
    "category": "ui",
    "tags": "done todo tick complete task"
  },
  {
    "id": "chef-hat",
    "char": "M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z M6 17h12",
    "category": "ui",
    "tags": "cooking food kitchen restaurant"
  },
  {
    "id": "cherry",
    "char": "M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12 M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z",
    "category": "ui",
    "tags": "fruit food"
  },
  {
    "id": "chess-bishop",
    "char": "M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z M15 18c1.5-.615 3-2.461 3-4.923C18 8.769 14.5 4.462 12 2 9.5 4.462 6 8.77 6 13.077 6 15.539 7.5 17.385 9 18 m16 7-2.5 2.5 M9 2h6",
    "category": "ui",
    "tags": "mitre miter piece board game religion"
  },
  {
    "id": "chess-king",
    "char": "M4 20a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z m6.7 18-1-1C4.35 15.682 3 14.09 3 12a5 5 0 0 1 4.95-5c1.584 0 2.7.455 4.05 1.818C13.35 7.455 14.466 7 16.05 7A5 5 0 0 1 21 12c0 2.082-1.359 3.673-2.7 5l-1 1 M10 4h4 M12 2v6.818",
    "category": "ui",
    "tags": "ruler crown piece board game stalemate"
  },
  {
    "id": "chess-knight",
    "char": "M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z M16.5 18c1-2 2.5-5 2.5-9a7 7 0 0 0-7-7H6.635a1 1 0 0 0-.768 1.64L7 5l-2.32 5.802a2 2 0 0 0 .95 2.526l2.87 1.456 m15 5 1.425-1.425 m17 8 1.53-1.53 M9.713 12.185 7 18",
    "category": "ui",
    "tags": "piece horse board game"
  },
  {
    "id": "chess-pawn",
    "char": "M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z m14.5 10 1.5 8 M7 10h10 m8 18 1.5-8 M 12, 6 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
    "category": "ui",
    "tags": "piece board game"
  },
  {
    "id": "chess-queen",
    "char": "M4 20a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z m12.474 5.943 1.567 5.34a1 1 0 0 0 1.75.328l2.616-3.402 m20 9-3 9 m5.594 8.209 2.615 3.403a1 1 0 0 0 1.75-.329l1.567-5.34 M7 18 4 9 M 12, 4 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 20, 7 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 4, 7 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "ruler crown piece board game stalemate"
  },
  {
    "id": "chess-rook",
    "char": "M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z M10 2v2 M14 2v2 m17 18-1-9 M6 2v5a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2 M6 4h12 m7 18 1-9",
    "category": "ui",
    "tags": "castle piece board game"
  },
  {
    "id": "chevron-down",
    "char": "m6 9 6 6 6-6",
    "category": "arrows",
    "tags": "backwards reverse slow dropdown"
  },
  {
    "id": "chevron-first",
    "char": "m17 18-6-6 6-6 M7 6v12",
    "category": "arrows",
    "tags": "previous music"
  },
  {
    "id": "chevron-last",
    "char": "m7 18 6-6-6-6 M17 6v12",
    "category": "arrows",
    "tags": "skip next music"
  },
  {
    "id": "chevron-left",
    "char": "m15 18-6-6 6-6",
    "category": "arrows",
    "tags": "back previous less than fewer menu <"
  },
  {
    "id": "chevron-right",
    "char": "m9 18 6-6-6-6",
    "category": "arrows",
    "tags": "forward next more than greater menu code coding command line terminal prompt shell >"
  },
  {
    "id": "chevron-up",
    "char": "m18 15-6-6-6 6",
    "category": "arrows",
    "tags": "caret keyboard mac control ctrl superscript exponential power ahead fast ^ dropdown"
  },
  {
    "id": "chevrons-down-up",
    "char": "m7 20 5-5 5 5 m7 4 5 5 5-5",
    "category": "arrows",
    "tags": "collapse fold vertical"
  },
  {
    "id": "chevrons-down",
    "char": "m7 6 5 5 5-5 m7 13 5 5 5-5",
    "category": "arrows",
    "tags": "backwards reverse slower"
  },
  {
    "id": "chevrons-left-right-ellipsis",
    "char": "M12 12h.01 M16 12h.01 m17 7 5 5-5 5 m7 7-5 5 5 5 M8 12h.01",
    "category": "arrows",
    "tags": "internet network connection cable lan port router switch hub modem web online networking communication socket plug slot controller connector interface console signal data input output"
  },
  {
    "id": "chevrons-left-right",
    "char": "m9 7-5 5 5 5 m15 7 5 5-5 5",
    "category": "arrows",
    "tags": "expand horizontal unfold"
  },
  {
    "id": "chevrons-left",
    "char": "m11 17-5-5 5-5 m18 17-5-5 5-5",
    "category": "arrows",
    "tags": "turn corner"
  },
  {
    "id": "chevrons-right-left",
    "char": "m20 17-5-5 5-5 m4 17 5-5-5-5",
    "category": "arrows",
    "tags": "collapse fold horizontal"
  },
  {
    "id": "chevrons-right",
    "char": "m6 17 5-5-5-5 m13 17 5-5-5-5",
    "category": "arrows",
    "tags": "turn corner"
  },
  {
    "id": "chevrons-up-down",
    "char": "m7 15 5 5 5-5 m7 9 5-5 5 5",
    "category": "arrows",
    "tags": "expand unfold vertical"
  },
  {
    "id": "chevrons-up",
    "char": "m17 11-5-5-5 5 m17 18-5-5-5 5",
    "category": "arrows",
    "tags": "forward ahead faster speed boost"
  },
  {
    "id": "chromium",
    "char": "M10.88 21.94 15.46 14 M21.17 8H12 M3.95 6.06 8.54 14 M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M 12, 12 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
    "category": "ui",
    "tags": "browser logo"
  },
  {
    "id": "church",
    "char": "M10 9h4 M12 7v5 M14 21v-3a2 2 0 0 0-4 0v3 m18 9 3.52 2.147a1 1 0 0 1 .48.854V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6.999a1 1 0 0 1 .48-.854L6 9 M6 21V7a1 1 0 0 1 .376-.782l5-3.999a1 1 0 0 1 1.249.001l5 4A1 1 0 0 1 18 7v14",
    "category": "ui",
    "tags": "temple building"
  },
  {
    "id": "cigarette-off",
    "char": "M12 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h13 M18 8c0-2.5-2-2.5-2-5 m2 2 20 20 M21 12a1 1 0 0 1 1 1v2a1 1 0 0 1-.5.866 M22 8c0-2.5-2-2.5-2-5 M7 12v4",
    "category": "ui",
    "tags": "smoking no-smoking"
  },
  {
    "id": "cigarette",
    "char": "M17 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14 M18 8c0-2.5-2-2.5-2-5 M21 16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1 M22 8c0-2.5-2-2.5-2-5 M7 12v4",
    "category": "ui",
    "tags": "smoking"
  },
  {
    "id": "circle-alert",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0",
    "category": "ui",
    "tags": "warning alert danger exclamation mark"
  },
  {
    "id": "circle-arrow-down",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M12 8v8 m8 12 4 4 4-4",
    "category": "arrows",
    "tags": "backwards reverse direction south sign button"
  },
  {
    "id": "circle-arrow-left",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 m12 8-4 4 4 4 M16 12H8",
    "category": "arrows",
    "tags": "previous back direction west sign turn button <-"
  },
  {
    "id": "circle-arrow-out-down-left",
    "char": "M2 12a10 10 0 1 1 10 10 m2 22 10-10 M8 22H2v-6",
    "category": "arrows",
    "tags": "outwards direction south-west diagonal"
  },
  {
    "id": "circle-arrow-out-down-right",
    "char": "M12 22a10 10 0 1 1 10-10 M22 22 12 12 M22 16v6h-6",
    "category": "arrows",
    "tags": "outwards direction south-east diagonal"
  },
  {
    "id": "circle-arrow-out-up-left",
    "char": "M2 8V2h6 m2 2 10 10 M12 2A10 10 0 1 1 2 12",
    "category": "arrows",
    "tags": "outwards direction north-west diagonal keyboard button escape"
  },
  {
    "id": "circle-arrow-out-up-right",
    "char": "M22 12A10 10 0 1 1 12 2 M22 2 12 12 M16 2h6v6",
    "category": "arrows",
    "tags": "outwards direction north-east diagonal"
  },
  {
    "id": "circle-arrow-right",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 m12 16 4-4-4-4 M8 12h8",
    "category": "arrows",
    "tags": "next forward direction east sign turn button ->"
  },
  {
    "id": "circle-arrow-up",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 m16 12-4-4-4 4 M12 16V8",
    "category": "arrows",
    "tags": "forward direction north sign button"
  },
  {
    "id": "circle-check-big",
    "char": "M21.801 10A10 10 0 1 1 17 3.335 m9 11 3 3L22 4",
    "category": "ui",
    "tags": "done todo tick complete task"
  },
  {
    "id": "circle-check",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 m9 12 2 2 4-4",
    "category": "ui",
    "tags": "done todo tick complete task"
  },
  {
    "id": "circle-chevron-down",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 m16 10-4 4-4-4",
    "category": "arrows",
    "tags": "back menu"
  },
  {
    "id": "circle-chevron-left",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 m14 16-4-4 4-4",
    "category": "arrows",
    "tags": "back previous less than fewer menu <"
  },
  {
    "id": "circle-chevron-right",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 m10 8 4 4-4 4",
    "category": "arrows",
    "tags": "back more than greater menu >"
  },
  {
    "id": "circle-chevron-up",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 m8 14 4-4 4 4",
    "category": "arrows",
    "tags": "caret ahead menu ^"
  },
  {
    "id": "circle-dashed",
    "char": "M10.1 2.182a10 10 0 0 1 3.8 0 M13.9 21.818a10 10 0 0 1-3.8 0 M17.609 3.721a10 10 0 0 1 2.69 2.7 M2.182 13.9a10 10 0 0 1 0-3.8 M20.279 17.609a10 10 0 0 1-2.7 2.69 M21.818 10.1a10 10 0 0 1 0 3.8 M3.721 6.391a10 10 0 0 1 2.7-2.69 M6.391 20.279a10 10 0 0 1-2.69-2.7",
    "category": "ui",
    "tags": "pending dot progress issue draft code coding version control"
  },
  {
    "id": "circle-divide",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0",
    "category": "ui",
    "tags": "calculate math ÷ /"
  },
  {
    "id": "circle-dollar-sign",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8 M12 18V6",
    "category": "ui",
    "tags": "monetization marketing currency money payment"
  },
  {
    "id": "circle-dot-dashed",
    "char": "M10.1 2.18a9.93 9.93 0 0 1 3.8 0 M17.6 3.71a9.95 9.95 0 0 1 2.69 2.7 M21.82 10.1a9.93 9.93 0 0 1 0 3.8 M20.29 17.6a9.95 9.95 0 0 1-2.7 2.69 M13.9 21.82a9.94 9.94 0 0 1-3.8 0 M6.4 20.29a9.95 9.95 0 0 1-2.69-2.7 M2.18 13.9a9.93 9.93 0 0 1 0-3.8 M3.71 6.4a9.95 9.95 0 0 1 2.7-2.69 M 12, 12 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0",
    "category": "ui",
    "tags": "pending dot progress issue draft code coding version control"
  },
  {
    "id": "circle-dot",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M 12, 12 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0",
    "category": "ui",
    "tags": "pending dot progress issue code coding version control choices multiple choice choose"
  },
  {
    "id": "circle-ellipsis",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M17 12h.01 M12 12h.01 M7 12h.01",
    "category": "ui",
    "tags": "ellipsis et cetera etc loader loading progress pending throbber menu options operator code spread rest more further extra overflow dots … ..."
  },
  {
    "id": "circle-equal",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M7 10h10 M7 14h10",
    "category": "ui",
    "tags": "calculate shape ="
  },
  {
    "id": "circle-fading-arrow-up",
    "char": "M12 2a10 10 0 0 1 7.38 16.75 m16 12-4-4-4 4 M12 16V8 M2.5 8.875a10 10 0 0 0-.5 3 M2.83 16a10 10 0 0 0 2.43 3.4 M4.636 5.235a10 10 0 0 1 .891-.857 M8.644 21.42a10 10 0 0 0 7.631-.38",
    "category": "arrows",
    "tags": "north up upgrade improve circle button"
  },
  {
    "id": "circle-fading-plus",
    "char": "M12 2a10 10 0 0 1 7.38 16.75 M12 8v8 M16 12H8 M2.5 8.875a10 10 0 0 0-.5 3 M2.83 16a10 10 0 0 0 2.43 3.4 M4.636 5.235a10 10 0 0 1 .891-.857 M8.644 21.42a10 10 0 0 0 7.631-.38",
    "category": "ui",
    "tags": "stories social media instagram facebook meta snapchat sharing content"
  },
  {
    "id": "circle-gauge",
    "char": "M15.6 2.7a10 10 0 1 0 5.7 5.7 M 12, 12 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M13.4 10.6 19 5",
    "category": "ui",
    "tags": "dashboard dial meter speed pressure measure level"
  },
  {
    "id": "circle-minus",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M8 12h8",
    "category": "ui",
    "tags": "subtract remove decrease reduce calculate line operator code coding minimum downgrade -"
  },
  {
    "id": "circle-off",
    "char": "m2 2 20 20 M8.35 2.69A10 10 0 0 1 21.3 15.65 M19.08 19.08A10 10 0 1 1 4.92 4.92",
    "category": "ui",
    "tags": "diameter zero Ø nothing null void cancel ban no stop forbidden prohibited error incorrect mistake wrong failure"
  },
  {
    "id": "circle-parking-off",
    "char": "M12.656 7H13a3 3 0 0 1 2.984 3.307 M13 13H9 M19.071 19.071A1 1 0 0 1 4.93 4.93 m2 2 20 20 M8.357 2.687a10 10 0 0 1 12.956 12.956 M9 17V9",
    "category": "ui",
    "tags": "parking lot car park no parking"
  },
  {
    "id": "circle-parking",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M9 17V7h4a3 3 0 0 1 0 6H9",
    "category": "ui",
    "tags": "parking lot car park"
  },
  {
    "id": "circle-pause",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0",
    "category": "media",
    "tags": "music audio stop"
  },
  {
    "id": "circle-percent",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 m15 9-6 6 M9 9h.01 M15 15h.01",
    "category": "ui",
    "tags": "verified unverified sale discount offer marketing sticker price tag"
  },
  {
    "id": "circle-pile",
    "char": "M 12, 19 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 12, 5 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 16, 12 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 20, 19 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 4, 19 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 8, 12 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "off zero record shape circle-pile circle pile stack layer structure form group collection stock inventory materials warehouse"
  },
  {
    "id": "circle-play",
    "char": "M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0",
    "category": "media",
    "tags": "music start run"
  },
  {
    "id": "circle-plus",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M8 12h8 M12 8v8",
    "category": "ui",
    "tags": "add new increase increment positive calculate crosshair aim target scope sight reticule maximum upgrade extra operator join concatenate code coding +"
  },
  {
    "id": "circle-pound-sterling",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M10 16V9.5a1 1 0 0 1 5 0 M8 12h4 M8 16h7",
    "category": "ui",
    "tags": "monetization coin penny marketing currency money payment british gbp £"
  },
  {
    "id": "circle-power",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M12 7v4 M7.998 9.003a5 5 0 1 0 8-.005",
    "category": "ui",
    "tags": "on off device switch toggle binary boolean reboot restart button keyboard troubleshoot"
  },
  {
    "id": "circle-question-mark",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3 M12 17h.01",
    "category": "ui",
    "tags": "question mark"
  },
  {
    "id": "circle-slash-2",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M22 2 2 22",
    "category": "ui",
    "tags": "diameter zero ø nothing null void ban math divide division half split / average avg mean median normal"
  },
  {
    "id": "circle-slash",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0",
    "category": "ui",
    "tags": "diameter zero Ø nothing null void cancel ban no stop forbidden prohibited error incorrect mistake wrong failure divide division or /"
  },
  {
    "id": "circle-small",
    "char": "M 12, 12 m -6, 0 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0",
    "category": "ui",
    "tags": "shape bullet gender genderless"
  },
  {
    "id": "circle-star",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z",
    "category": "ui",
    "tags": "badge medal honour decoration order pin laurel trophy medallion insignia bronze silver gold"
  },
  {
    "id": "circle-stop",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M 9 9 h 6 v 6 h -6 Z",
    "category": "media",
    "tags": "media music"
  },
  {
    "id": "circle-user-round",
    "char": "M18 20a6 6 0 0 0-12 0 M 12, 10 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0 M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0",
    "category": "ui",
    "tags": "person account contact"
  },
  {
    "id": "circle-user",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M 12, 10 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662",
    "category": "ui",
    "tags": "person account contact"
  },
  {
    "id": "circle-x",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 m15 9-6 6 m9 9 6 6",
    "category": "ui",
    "tags": "cancel close delete remove times clear error incorrect wrong mistake failure linter multiply multiplication"
  },
  {
    "id": "circle",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0",
    "category": "ui",
    "tags": "off zero record shape"
  },
  {
    "id": "circuit-board",
    "char": "M 3 3 h 18 v 18 h -18 Z M11 9h4a2 2 0 0 0 2-2V3 M 9, 9 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M7 21v-4a2 2 0 0 1 2-2h4 M 15, 15 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "computing electricity electronics"
  },
  {
    "id": "citrus",
    "char": "M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z M19.65 15.66A8 8 0 0 1 8.35 4.34 m14 10-5.5 5.5 M14 17.85V10H6.15",
    "category": "ui",
    "tags": "lemon orange grapefruit fruit"
  },
  {
    "id": "clapperboard",
    "char": "m12.296 3.464 3.02 3.956 M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z m6.18 5.276 3.1 3.899",
    "category": "ui",
    "tags": "movie film video camera cinema cut action television tv show entertainment"
  },
  {
    "id": "clipboard-check",
    "char": "M 8 2 h 8 v 4 h -8 Z M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2 m9 14 2 2 4-4",
    "category": "ui",
    "tags": "copied pasted done todo tick complete task"
  },
  {
    "id": "clipboard-clock",
    "char": "M16 14v2.2l1.6 1 M16 4h2a2 2 0 0 1 2 2v.832 M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2 M 16, 16 m -6, 0 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0 M 8 2 h 8 v 4 h -8 Z",
    "category": "files",
    "tags": "copy paste history log clock time watch alarm hour minute reminder scheduled deadline pending time tracking timesheets appointment logbook"
  },
  {
    "id": "clipboard-copy",
    "char": "M 8 2 h 8 v 4 h -8 Z M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2 M16 4h2a2 2 0 0 1 2 2v4 M21 14H11 m15 10-4 4 4 4",
    "category": "files",
    "tags": "copy paste"
  },
  {
    "id": "clipboard-list",
    "char": "M 8 2 h 8 v 4 h -8 Z M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2 M12 11h4 M12 16h4 M8 11h.01 M8 16h.01",
    "category": "files",
    "tags": "copy paste tasks"
  },
  {
    "id": "clipboard-minus",
    "char": "M 8 2 h 8 v 4 h -8 Z M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2 M9 14h6",
    "category": "files",
    "tags": "copy delete remove erase document medical report doctor"
  },
  {
    "id": "clipboard-paste",
    "char": "M11 14h10 M16 4h2a2 2 0 0 1 2 2v1.344 m17 18 4-4-4-4 M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113 M 8 2 h 8 v 4 h -8 Z",
    "category": "files",
    "tags": "copy paste"
  },
  {
    "id": "clipboard-pen-line",
    "char": "M 8 2 h 8 v 4 h -8 Z M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5 M16 4h2a2 2 0 0 1 1.73 1 M8 18h1 M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
    "category": "files",
    "tags": "paste"
  },
  {
    "id": "clipboard-pen",
    "char": "M16 4h2a2 2 0 0 1 2 2v2 M21.34 15.664a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z M8 22H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2 M 8 2 h 8 v 4 h -8 Z",
    "category": "files",
    "tags": "paste signature"
  },
  {
    "id": "clipboard-plus",
    "char": "M 8 2 h 8 v 4 h -8 Z M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2 M9 14h6 M12 17v-6",
    "category": "ui",
    "tags": "copy paste add create new document medical report doctor"
  },
  {
    "id": "clipboard-type",
    "char": "M 8 2 h 8 v 4 h -8 Z M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2 M9 12v-1h6v1 M11 17h2 M12 11v6",
    "category": "files",
    "tags": "paste format text"
  },
  {
    "id": "clipboard-x",
    "char": "M 8 2 h 8 v 4 h -8 Z M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2 m15 11-6 6 m9 11 6 6",
    "category": "ui",
    "tags": "copy paste discard remove"
  },
  {
    "id": "clipboard",
    "char": "M 8 2 h 8 v 4 h -8 Z M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
    "category": "files",
    "tags": "copy paste"
  },
  {
    "id": "clock-1",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M12 6v6l2-4",
    "category": "ui",
    "tags": "time watch alarm"
  },
  {
    "id": "clock-10",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M12 6v6l-4-2",
    "category": "ui",
    "tags": "time watch alarm"
  },
  {
    "id": "clock-11",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M12 6v6l-2-4",
    "category": "ui",
    "tags": "time watch alarm"
  },
  {
    "id": "clock-12",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M12 6v6",
    "category": "ui",
    "tags": "time watch alarm noon midnight"
  },
  {
    "id": "clock-2",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M12 6v6l4-2",
    "category": "ui",
    "tags": "time watch alarm"
  },
  {
    "id": "clock-3",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M12 6v6h4",
    "category": "ui",
    "tags": "time watch alarm"
  },
  {
    "id": "clock-4",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M12 6v6l4 2",
    "category": "ui",
    "tags": "time watch alarm"
  },
  {
    "id": "clock-5",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M12 6v6l2 4",
    "category": "ui",
    "tags": "time watch alarm"
  },
  {
    "id": "clock-6",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M12 6v10",
    "category": "ui",
    "tags": "time watch alarm"
  },
  {
    "id": "clock-7",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M12 6v6l-2 4",
    "category": "ui",
    "tags": "time watch alarm"
  },
  {
    "id": "clock-8",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M12 6v6l-4 2",
    "category": "ui",
    "tags": "time watch alarm"
  },
  {
    "id": "clock-9",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M12 6v6H8",
    "category": "ui",
    "tags": "time watch alarm"
  },
  {
    "id": "clock-alert",
    "char": "M12 6v6l4 2 M20 12v5 M20 21h.01 M21.25 8.2A10 10 0 1 0 16 21.16",
    "category": "ui",
    "tags": "time watch alarm warning wrong"
  },
  {
    "id": "clock-arrow-down",
    "char": "M12 6v6l2 1 M12.337 21.994a10 10 0 1 1 9.588-8.767 m14 18 4 4 4-4 M18 14v8",
    "category": "arrows",
    "tags": "time watch alarm sort order ascending descending increasing decreasing rising falling"
  },
  {
    "id": "clock-arrow-up",
    "char": "M12 6v6l1.56.78 M13.227 21.925a10 10 0 1 1 8.767-9.588 m14 18 4-4 4 4 M18 22v-8",
    "category": "arrows",
    "tags": "time watch alarm sort order ascending descending increasing decreasing rising falling"
  },
  {
    "id": "clock-check",
    "char": "M12 6v6l4 2 M22 12a10 10 0 1 0-11 9.95 m22 16-5.5 5.5L14 19",
    "category": "ui",
    "tags": "time watch alarm"
  },
  {
    "id": "clock-fading",
    "char": "M12 2a10 10 0 0 1 7.38 16.75 M12 6v6l4 2 M2.5 8.875a10 10 0 0 0-.5 3 M2.83 16a10 10 0 0 0 2.43 3.4 M4.636 5.235a10 10 0 0 1 .891-.857 M8.644 21.42a10 10 0 0 0 7.631-.38",
    "category": "ui",
    "tags": "time watch alarm"
  },
  {
    "id": "clock-plus",
    "char": "M12 6v6l3.644 1.822 M16 19h6 M19 16v6 M21.92 13.267a10 10 0 1 0-8.653 8.653",
    "category": "ui",
    "tags": "time watch alarm add create new"
  },
  {
    "id": "clock",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M12 6v6l4 2",
    "category": "ui",
    "tags": "time watch alarm"
  },
  {
    "id": "closed-caption",
    "char": "M10 9.17a3 3 0 1 0 0 5.66 M17 9.17a3 3 0 1 0 0 5.66 M 2 5 h 20 v 14 h -20 Z",
    "category": "ui",
    "tags": "tv movie video closed captions subtitles subhead transcription transcribe dialogue accessibility"
  },
  {
    "id": "cloud-alert",
    "char": "M12 12v4 M12 20h.01 M8.128 16.949A7 7 0 1 1 15.71 8h1.79a1 1 0 0 1 0 9h-1.642",
    "category": "ui",
    "tags": "weather danger warning alert error sync network exclamation"
  },
  {
    "id": "cloud-backup",
    "char": "M21 15.251A4.5 4.5 0 0 0 17.5 8h-1.79A7 7 0 1 0 3 13.607 M7 11v4h4 M8 19a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5 4.82 4.82 0 0 0-3.41 1.41L7 15",
    "category": "ui",
    "tags": "storage memory bytes servers backup timemachine rotate synchronize synchronise refresh reconnect transfer data security upload save remote safety"
  },
  {
    "id": "cloud-check",
    "char": "m17 15-5.5 5.5L9 18 M5.516 16.07A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 3.501 7.327",
    "category": "ui",
    "tags": "sync network success done completed saved persisted"
  },
  {
    "id": "cloud-cog",
    "char": "m10.852 19.772-.383.924 m13.148 14.228.383-.923 M13.148 19.772a3 3 0 1 0-2.296-5.544l-.383-.923 m13.53 20.696-.382-.924a3 3 0 1 1-2.296-5.544 m14.772 15.852.923-.383 m14.772 18.148.923.383 M4.2 15.1a7 7 0 1 1 9.93-9.858A7 7 0 0 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2 m9.228 15.852-.923-.383 m9.228 18.148-.923.383",
    "category": "ui",
    "tags": "computing ai cluster network"
  },
  {
    "id": "cloud-download",
    "char": "M12 13v8l-4-4 m12 21 4-4 M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284",
    "category": "files",
    "tags": "import"
  },
  {
    "id": "cloud-drizzle",
    "char": "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242 M8 19v1 M8 14v1 M16 19v1 M16 14v1 M12 21v1 M12 16v1",
    "category": "ui",
    "tags": "weather shower"
  },
  {
    "id": "cloud-fog",
    "char": "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242 M16 17H7 M17 21H9",
    "category": "ui",
    "tags": "weather mist"
  },
  {
    "id": "cloud-hail",
    "char": "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242 M16 14v2 M8 14v2 M16 20h.01 M8 20h.01 M12 16v2 M12 22h.01",
    "category": "ui",
    "tags": "weather rainfall"
  },
  {
    "id": "cloud-lightning",
    "char": "M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973 m13 12-3 5h4l-3 5",
    "category": "ui",
    "tags": "weather bolt"
  },
  {
    "id": "cloud-moon-rain",
    "char": "M11 20v2 M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36 M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24 M7 19v2",
    "category": "ui",
    "tags": "weather partly night rainfall"
  },
  {
    "id": "cloud-moon",
    "char": "M13 16a3 3 0 0 1 0 6H7a5 5 0 1 1 4.9-6z M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36",
    "category": "ui",
    "tags": "weather night"
  },
  {
    "id": "cloud-off",
    "char": "M10.94 5.274A7 7 0 0 1 15.71 10h1.79a4.5 4.5 0 0 1 4.222 6.057 M18.796 18.81A4.5 4.5 0 0 1 17.5 19H9A7 7 0 0 1 5.79 5.78 m2 2 20 20",
    "category": "ui",
    "tags": "disconnect"
  },
  {
    "id": "cloud-rain-wind",
    "char": "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242 m9.2 22 3-7 m9 13-3 7 m17 13-3 7",
    "category": "ui",
    "tags": "weather rainfall"
  },
  {
    "id": "cloud-rain",
    "char": "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242 M16 14v6 M8 14v6 M12 16v6",
    "category": "ui",
    "tags": "weather rainfall"
  },
  {
    "id": "cloud-snow",
    "char": "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242 M8 15h.01 M8 19h.01 M12 17h.01 M12 21h.01 M16 15h.01 M16 19h.01",
    "category": "ui",
    "tags": "weather blizzard"
  },
  {
    "id": "cloud-sun-rain",
    "char": "M12 2v2 m4.93 4.93 1.41 1.41 M20 12h2 m19.07 4.93-1.41 1.41 M15.947 12.65a4 4 0 0 0-5.925-4.128 M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24 M11 20v2 M7 19v2",
    "category": "ui",
    "tags": "weather partly rainfall"
  },
  {
    "id": "cloud-sun",
    "char": "M12 2v2 m4.93 4.93 1.41 1.41 M20 12h2 m19.07 4.93-1.41 1.41 M15.947 12.65a4 4 0 0 0-5.925-4.128 M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z",
    "category": "ui",
    "tags": "weather partly"
  },
  {
    "id": "cloud-sync",
    "char": "m17 18-1.535 1.605a5 5 0 0 1-8-1.5 M17 22v-4h-4 M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607 M7 10v4h4 m7 14 1.535-1.605a5 5 0 0 1 8 1.5",
    "category": "ui",
    "tags": "synchronize synchronise refresh reconnect transfer backup storage upload download connection network data"
  },
  {
    "id": "cloud-upload",
    "char": "M12 13v8 M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242 m8 17 4-4 4 4",
    "category": "files",
    "tags": "file"
  },
  {
    "id": "cloud",
    "char": "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",
    "category": "ui",
    "tags": "weather"
  },
  {
    "id": "cloudy",
    "char": "M17.5 12a1 1 0 1 1 0 9H9.006a7 7 0 1 1 6.702-9z M21.832 9A3 3 0 0 0 19 7h-2.207a5.5 5.5 0 0 0-10.72.61",
    "category": "ui",
    "tags": "weather clouds"
  },
  {
    "id": "clover",
    "char": "M16.17 7.83 2 22 M4.02 12a2.827 2.827 0 1 1 3.81-4.17A2.827 2.827 0 1 1 12 4.02a2.827 2.827 0 1 1 4.17 3.81A2.827 2.827 0 1 1 19.98 12a2.827 2.827 0 1 1-3.81 4.17A2.827 2.827 0 1 1 12 19.98a2.827 2.827 0 1 1-4.17-3.81A1 1 0 1 1 4 12 m7.83 7.83 8.34 8.34",
    "category": "ui",
    "tags": "leaf luck plant"
  },
  {
    "id": "club",
    "char": "M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z M12 17.66L12 22",
    "category": "ui",
    "tags": "shape suit playing cards"
  },
  {
    "id": "code-xml",
    "char": "m18 16 4-4-4-4 m6 8-4 4 4 4 m14.5 4-5 16",
    "category": "ui",
    "tags": "source programming html xml"
  },
  {
    "id": "code",
    "char": "m16 18 6-6-6-6 m8 6-6 6 6 6",
    "category": "ui",
    "tags": "source programming html xml"
  },
  {
    "id": "codepen",
    "char": "",
    "category": "ui",
    "tags": "logo"
  },
  {
    "id": "codesandbox",
    "char": "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
    "category": "ui",
    "tags": "logo"
  },
  {
    "id": "coffee",
    "char": "M10 2v2 M14 2v2 M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1 M6 2v2",
    "category": "ui",
    "tags": "drink cup mug tea cafe hot beverage"
  },
  {
    "id": "cog",
    "char": "M11 10.27 7 3.34 m11 13.73-4 6.93 M12 22v-2 M12 2v2 M14 12h8 m17 20.66-1-1.73 m17 3.34-1 1.73 M2 12h2 m20.66 17-1.73-1 m20.66 7-1.73 1 m3.34 17 1.73-1 m3.34 7 1.73 1 M 12, 12 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 12, 12 m -8, 0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
    "category": "ui",
    "tags": "computing settings cog edit gear preferences controls configuration fixed build construction parts"
  },
  {
    "id": "coins",
    "char": "M13.744 17.736a6 6 0 1 1-7.48-7.48 M15 6h1v4 m6.134 14.768.866-.5 2 3.464 M 16, 8 m -6, 0 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0",
    "category": "ui",
    "tags": "money cash finance gamble"
  },
  {
    "id": "columns-2",
    "char": "M 3 3 h 18 v 18 h -18 Z M12 3v18",
    "category": "ui",
    "tags": "lines list queue preview panel parallel series split vertical horizontal half center middle even sidebar drawer gutter fold reflow typography pagination pages"
  },
  {
    "id": "columns-3-cog",
    "char": "M10.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5 m14.3 19.6 1-.4 M15 3v7.5 m15.2 16.9-.9-.3 m16.6 21.7.3-.9 m16.8 15.3-.4-1 m19.1 15.2.3-.9 m19.6 21.7-.4-1 m20.7 16.8 1-.4 m21.7 19.4-.9-.3 M9 3v18 M 18, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "columns settings customize table grid adjust configuration panel layout"
  },
  {
    "id": "columns-3",
    "char": "M 3 3 h 18 v 18 h -18 Z M9 3v18 M15 3v18",
    "category": "ui",
    "tags": "lines list queue preview parallel series split vertical horizontal thirds triple center middle alignment even sidebars drawers gutters fold reflow typography pagination pages"
  },
  {
    "id": "columns-4",
    "char": "M 3 3 h 18 v 18 h -18 Z M7.5 3v18 M12 3v18 M16.5 3v18",
    "category": "ui",
    "tags": "lines list queue preview parallel series split vertical horizontal thirds triple center middle alignment even sidebars drawers gutters fold reflow typography pagination pages prison jail bars sentence police cops cell crime criminal justice law enforcement grill"
  },
  {
    "id": "combine",
    "char": "M14 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1 M19 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1 m7 15 3 3 m7 21 3-3H5a2 2 0 0 1-2-2v-2 M 14 14 h 7 v 7 h -7 Z M 3 3 h 7 v 7 h -7 Z",
    "category": "ui",
    "tags": "cubes packages parts units collection cluster combine gather merge"
  },
  {
    "id": "command",
    "char": "M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3",
    "category": "ui",
    "tags": "keyboard key mac cmd button"
  },
  {
    "id": "compass",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",
    "category": "ui",
    "tags": "direction north east south west safari browser"
  },
  {
    "id": "component",
    "char": "M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z",
    "category": "ui",
    "tags": "design element group module part symbol"
  },
  {
    "id": "computer",
    "char": "M 5 2 h 14 v 8 h -14 Z M 2 14 h 20 v 8 h -20 Z M6 18h2 M12 18h6",
    "category": "ui",
    "tags": "pc chassis codespaces github"
  },
  {
    "id": "concierge-bell",
    "char": "M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z M20 16a8 8 0 1 0-16 0 M12 4v4 M10 4h4",
    "category": "ui",
    "tags": "reception bell porter"
  },
  {
    "id": "cone",
    "char": "m20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98",
    "category": "ui",
    "tags": "conical triangle triangular geometry filter funnel hopper spotlight searchlight"
  },
  {
    "id": "construction",
    "char": "M 2 6 h 20 v 8 h -20 Z M17 14v7 M7 14v7 M17 3v3 M7 3v3 M10 14 2.3 6.3 m14 6 7.7 7.7 m8 6 8 8",
    "category": "ui",
    "tags": "roadwork maintenance blockade barricade"
  },
  {
    "id": "contact-round",
    "char": "M16 2v2 M17.915 22a6 6 0 0 0-12 0 M8 2v2 M 12, 12 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0 M 3 4 h 18 v 18 h -18 Z",
    "category": "ui",
    "tags": "user person family friend acquaintance listing networking"
  },
  {
    "id": "contact",
    "char": "M16 2v2 M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2 M8 2v2 M 12, 11 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 3 4 h 18 v 18 h -18 Z",
    "category": "ui",
    "tags": "user person family friend acquaintance listing networking"
  },
  {
    "id": "container",
    "char": "M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z M10 21.9V14L2.1 9.1 m10 14 11.9-6.9 M14 19.8v-8.1 M18 17.5V9.4",
    "category": "ui",
    "tags": "storage shipping freight supply chain docker environment devops code coding"
  },
  {
    "id": "contrast",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M12 18a6 6 0 0 0 0-12v12z",
    "category": "ui",
    "tags": "display accessibility"
  },
  {
    "id": "cookie",
    "char": "M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5 M8.5 8.5v.01 M16 15.5v.01 M12 12v.01 M11 17v.01 M7 14v.01",
    "category": "ui",
    "tags": "biscuit privacy legal food"
  },
  {
    "id": "cooking-pot",
    "char": "M2 12h20 M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8 m4 8 16-4 m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8",
    "category": "ui",
    "tags": "pod cooking recipe food kitchen chef restaurant dinner lunch breakfast meal eat"
  },
  {
    "id": "copy-check",
    "char": "m12 15 2 2 4-4 M 8 8 h 14 v 14 h -14 Z M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
    "category": "ui",
    "tags": "clone duplicate done multiple"
  },
  {
    "id": "copy-minus",
    "char": "M 8 8 h 14 v 14 h -14 Z M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
    "category": "files",
    "tags": "clone duplicate remove delete collapse subtract multiple -"
  },
  {
    "id": "copy-plus",
    "char": "M 8 8 h 14 v 14 h -14 Z M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
    "category": "ui",
    "tags": "clone duplicate add multiple expand +"
  },
  {
    "id": "copy-slash",
    "char": "M 8 8 h 14 v 14 h -14 Z M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
    "category": "files",
    "tags": "clone duplicate cancel ban no stop forbidden prohibited error multiple divide division split or /"
  },
  {
    "id": "copy-x",
    "char": "M 8 8 h 14 v 14 h -14 Z M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
    "category": "ui",
    "tags": "cancel close delete remove clear multiple multiply multiplication times"
  },
  {
    "id": "copy",
    "char": "M 8 8 h 14 v 14 h -14 Z M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
    "category": "files",
    "tags": "clone duplicate multiple"
  },
  {
    "id": "copyleft",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M9.17 14.83a4 4 0 1 0 0-5.66",
    "category": "files",
    "tags": "licence"
  },
  {
    "id": "copyright",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M14.83 14.83a4 4 0 1 1 0-5.66",
    "category": "files",
    "tags": "licence license"
  },
  {
    "id": "corner-down-left",
    "char": "M20 4v7a4 4 0 0 1-4 4H4 m9 10-5 5 5 5",
    "category": "ui",
    "tags": "arrow return"
  },
  {
    "id": "corner-down-right",
    "char": "m15 10 5 5-5 5 M4 4v7a4 4 0 0 0 4 4h12",
    "category": "ui",
    "tags": "arrow indent tab"
  },
  {
    "id": "corner-left-down",
    "char": "m14 15-5 5-5-5 M20 4h-7a4 4 0 0 0-4 4v12",
    "category": "ui",
    "tags": "arrow"
  },
  {
    "id": "corner-left-up",
    "char": "M14 9 9 4 4 9 M20 20h-7a4 4 0 0 1-4-4V4",
    "category": "ui",
    "tags": "arrow"
  },
  {
    "id": "corner-right-down",
    "char": "m10 15 5 5 5-5 M4 4h7a4 4 0 0 1 4 4v12",
    "category": "ui",
    "tags": "arrow"
  },
  {
    "id": "corner-right-up",
    "char": "m10 9 5-5 5 5 M4 20h7a4 4 0 0 0 4-4V4",
    "category": "ui",
    "tags": "arrow"
  },
  {
    "id": "corner-up-left",
    "char": "M20 20v-7a4 4 0 0 0-4-4H4 M9 14 4 9l5-5",
    "category": "ui",
    "tags": "arrow"
  },
  {
    "id": "corner-up-right",
    "char": "m15 14 5-5-5-5 M4 20v-7a4 4 0 0 1 4-4h12",
    "category": "ui",
    "tags": "arrow"
  },
  {
    "id": "cpu",
    "char": "M12 20v2 M12 2v2 M17 20v2 M17 2v2 M2 12h2 M2 17h2 M2 7h2 M20 12h2 M20 17h2 M20 7h2 M7 20v2 M7 2v2 M 4 4 h 16 v 16 h -16 Z M 8 8 h 8 v 8 h -8 Z",
    "category": "ui",
    "tags": "processor cores technology computer chip circuit memory ram specs gigahertz ghz"
  },
  {
    "id": "creative-commons",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M10 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1 M17 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1",
    "category": "ui",
    "tags": "licence license"
  },
  {
    "id": "credit-card",
    "char": "M 2 5 h 20 v 14 h -20 Z",
    "category": "ui",
    "tags": "bank purchase payment cc"
  },
  {
    "id": "croissant",
    "char": "M10.2 18H4.774a1.5 1.5 0 0 1-1.352-.97 11 11 0 0 1 .132-6.487 M18 10.2V4.774a1.5 1.5 0 0 0-.97-1.352 11 11 0 0 0-6.486.132 M18 5a4 3 0 0 1 4 3 2 2 0 0 1-2 2 10 10 0 0 0-5.139 1.42 M5 18a3 4 0 0 0 3 4 2 2 0 0 0 2-2 10 10 0 0 1 1.42-5.14 M8.709 2.554a10 10 0 0 0-6.155 6.155 1.5 1.5 0 0 0 .676 1.626l9.807 5.42a2 2 0 0 0 2.718-2.718l-5.42-9.807a1.5 1.5 0 0 0-1.626-.676",
    "category": "ui",
    "tags": "bakery cooking food pastry"
  },
  {
    "id": "crop",
    "char": "M6 2v14a2 2 0 0 0 2 2h14 M18 22V8a2 2 0 0 0-2-2H2",
    "category": "ui",
    "tags": "photo image"
  },
  {
    "id": "cross",
    "char": "M4 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a1 1 0 0 1 1-1h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a1 1 0 0 1-1-1V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a1 1 0 0 1-1 1z",
    "category": "ui",
    "tags": "healthcare first aid"
  },
  {
    "id": "crosshair",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0",
    "category": "ui",
    "tags": "aim target"
  },
  {
    "id": "crown",
    "char": "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z M5 21h14",
    "category": "ui",
    "tags": "diadem tiara circlet corona king ruler winner favourite"
  },
  {
    "id": "cuboid",
    "char": "M10 22v-8 M2.336 8.89 10 14l11.715-7.029 M22 14a2 2 0 0 1-.971 1.715l-10 6a2 2 0 0 1-2.138-.05l-6-4A2 2 0 0 1 2 16v-6a2 2 0 0 1 .971-1.715l10-6a2 2 0 0 1 2.138.05l6 4A2 2 0 0 1 22 8z",
    "category": "ui",
    "tags": "brick block box 3d solid volume container storage shipping carton geometry rectangular hexahedron butter tofu soap cheese package parcel crate"
  },
  {
    "id": "cup-soda",
    "char": "m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8 M5 8h14 M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0 m12 8 1-6h2",
    "category": "ui",
    "tags": "beverage cup drink soda straw water"
  },
  {
    "id": "currency",
    "char": "M 12, 12 m -8, 0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
    "category": "ui",
    "tags": "finance money"
  },
  {
    "id": "cylinder",
    "char": "M3 5v14a9 3 0 0 0 18 0V5",
    "category": "ui",
    "tags": "shape elliptical geometry container storage tin pot"
  },
  {
    "id": "dam",
    "char": "M11 11.31c1.17.56 1.54 1.69 3.5 1.69 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 M11.75 18c.35.5 1.45 1 2.75 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 M2 10h4 M2 14h4 M2 18h4 M2 6h4 M7 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1L10 4a1 1 0 0 0-1-1z",
    "category": "ui",
    "tags": "electricity energy water"
  },
  {
    "id": "database-backup",
    "char": "M3 12a9 3 0 0 0 5 2.69 M21 9.3V5 M3 5v14a9 3 0 0 0 6.47 2.88 M12 12v4h4 M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16",
    "category": "ui",
    "tags": "storage memory bytes servers backup timemachine rotate arrow left"
  },
  {
    "id": "database-search",
    "char": "M21 11.693V5 m22 22-1.875-1.875 M3 12a9 3 0 0 0 8.697 2.998 M3 5v14a9 3 0 0 0 9.28 2.999 M 18, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "storage memory container tin pot bytes servers"
  },
  {
    "id": "database-zap",
    "char": "M3 5V19A9 3 0 0 0 15 21.84 M21 5V8 M21 12L18 17H22L19 22 M3 12A9 3 0 0 0 14.59 14.87",
    "category": "ui",
    "tags": "cache busting storage memory bytes servers power crash"
  },
  {
    "id": "database",
    "char": "M3 5V19A9 3 0 0 0 21 19V5 M3 12A9 3 0 0 0 21 12",
    "category": "ui",
    "tags": "storage memory container tin pot bytes servers"
  },
  {
    "id": "decimals-arrow-left",
    "char": "m13 21-3-3 3-3 M20 18H10 M3 11h.01 M 6 3 h 5 v 8 h -5 Z",
    "category": "arrows",
    "tags": "numerical decimal decrease less fewer precision rounding digits fraction float number"
  },
  {
    "id": "decimals-arrow-right",
    "char": "M10 18h10 m17 21 3-3-3-3 M3 11h.01 M 15 3 h 5 v 8 h -5 Z M 6 3 h 5 v 8 h -5 Z",
    "category": "arrows",
    "tags": "numerical decimal increase more precision rounding digits fraction float number"
  },
  {
    "id": "delete",
    "char": "M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z m12 9 6 6 m18 9-6 6",
    "category": "ui",
    "tags": "backspace remove"
  },
  {
    "id": "dessert",
    "char": "M10.162 3.167A10 10 0 0 0 2 13a2 2 0 0 0 4 0v-1a2 2 0 0 1 4 0v4a2 2 0 0 0 4 0v-4a2 2 0 0 1 4 0v1a2 2 0 0 0 4-.006 10 10 0 0 0-8.161-9.826 M20.804 14.869a9 9 0 0 1-17.608 0 M 12, 4 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "pudding christmas xmas custard iced bun icing fondant cake ice cream gelato sundae scoop dollop sugar food sweet"
  },
  {
    "id": "diameter",
    "char": "M 19, 19 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 5, 5 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M6.48 3.66a10 10 0 0 1 13.86 13.86 m6.41 6.41 11.18 11.18 M3.66 6.48a10 10 0 0 0 13.86 13.86",
    "category": "ui",
    "tags": "shape circle geometry trigonometry width height size calculate measure"
  },
  {
    "id": "diamond-minus",
    "char": "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z M8 12h8",
    "category": "ui",
    "tags": "keyframe subtract remove decrease reduce calculator button keyboard line divider separator horizontal rule hr html markup markdown --- toolbar operator code coding minimum downgrade"
  },
  {
    "id": "diamond-percent",
    "char": "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0Z M9.2 9.2h.01 m14.5 9.5-5 5 M14.7 14.8h.01",
    "category": "ui",
    "tags": "verified unverified sale discount offer marketing sticker price tag"
  },
  {
    "id": "diamond-plus",
    "char": "M12 8v8 M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z M8 12h8",
    "category": "ui",
    "tags": "keyframe add new increase increment positive calculate toolbar crosshair aim target scope sight reticule maximum upgrade extra +"
  },
  {
    "id": "diamond",
    "char": "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z",
    "category": "ui",
    "tags": "square rectangle oblique rhombus shape suit playing cards"
  },
  {
    "id": "dice-1",
    "char": "M 3 3 h 18 v 18 h -18 Z M12 12h.01",
    "category": "ui",
    "tags": "dice random tabletop 1 board game"
  },
  {
    "id": "dice-2",
    "char": "M 3 3 h 18 v 18 h -18 Z M15 9h.01 M9 15h.01",
    "category": "ui",
    "tags": "dice random tabletop 2 board game"
  },
  {
    "id": "dice-3",
    "char": "M 3 3 h 18 v 18 h -18 Z M16 8h.01 M12 12h.01 M8 16h.01",
    "category": "ui",
    "tags": "dice random tabletop 3 board game"
  },
  {
    "id": "dice-4",
    "char": "M 3 3 h 18 v 18 h -18 Z M16 8h.01 M8 8h.01 M8 16h.01 M16 16h.01",
    "category": "ui",
    "tags": "dice random tabletop 4 board game"
  },
  {
    "id": "dice-5",
    "char": "M 3 3 h 18 v 18 h -18 Z M16 8h.01 M8 8h.01 M8 16h.01 M16 16h.01 M12 12h.01",
    "category": "ui",
    "tags": "dice random tabletop 5 board game"
  },
  {
    "id": "dice-6",
    "char": "M 3 3 h 18 v 18 h -18 Z M16 8h.01 M16 12h.01 M16 16h.01 M8 8h.01 M8 12h.01 M8 16h.01",
    "category": "ui",
    "tags": "dice random tabletop 6 board game"
  },
  {
    "id": "dices",
    "char": "M 2 10 h 12 v 12 h -12 Z m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6 M6 18h.01 M10 14h.01 M15 6h.01 M18 9h.01",
    "category": "ui",
    "tags": "dice random tabletop board game"
  },
  {
    "id": "diff",
    "char": "M12 3v14 M5 10h14 M5 21h14",
    "category": "ui",
    "tags": "patch difference compare plus minus plus-minus math"
  },
  {
    "id": "disc-2",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M 12, 12 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0 M12 12h.01",
    "category": "ui",
    "tags": "album music vinyl record cd dvd format dj spin rotate rpm"
  },
  {
    "id": "disc-3",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M6 12c0-1.7.7-3.2 1.8-4.2 M 12, 12 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M18 12c0 1.7-.7 3.2-1.8 4.2",
    "category": "ui",
    "tags": "album music vinyl record cd dvd format dj spin rotate rpm"
  },
  {
    "id": "disc-album",
    "char": "M 3 3 h 18 v 18 h -18 Z M 12, 12 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0 M12 12h.01",
    "category": "ui",
    "tags": "album music songs format cd dvd vinyl sleeve cover platinum compilation ep recording playback spin rotate rpm dj"
  },
  {
    "id": "disc",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M 12, 12 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "album music songs format cd dvd vinyl sleeve cover platinum compilation ep recording playback spin rotate rpm dj"
  },
  {
    "id": "divide",
    "char": "M 12, 6 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 12, 18 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0",
    "category": "ui",
    "tags": "calculate math division operator code ÷ /"
  },
  {
    "id": "dna-off",
    "char": "M15 2c-1.35 1.5-2.092 3-2.5 4.5L14 8 m17 6-2.891-2.891 M2 15c3.333-3 6.667-3 10-3 m2 2 20 20 m20 9 .891.891 M22 9c-1.5 1.35-3 2.092-4.5 2.5l-1-1 M3.109 14.109 4 15 m6.5 12.5 1 1 m7 18 2.891 2.891 M9 22c1.35-1.5 2.092-3 2.5-4.5L10 16",
    "category": "ui",
    "tags": "gene gmo free helix heredity chromosome nucleic acid"
  },
  {
    "id": "dna",
    "char": "m10 16 1.5 1.5 m14 8-1.5-1.5 M15 2c-1.798 1.998-2.518 3.995-2.807 5.993 m16.5 10.5 1 1 m17 6-2.891-2.891 M2 15c6.667-6 13.333 0 20-6 m20 9 .891.891 M3.109 14.109 4 15 m6.5 12.5 1 1 m7 18 2.891 2.891 M9 22c1.798-1.998 2.518-3.995 2.807-5.993",
    "category": "ui",
    "tags": "gene gmo helix heredity chromosome nucleic acid"
  },
  {
    "id": "dock",
    "char": "M2 8h20 M 2 4 h 20 v 16 h -20 Z M6 16h12",
    "category": "ui",
    "tags": "desktop applications launch home menu bar bottom line macos osx"
  },
  {
    "id": "dog",
    "char": "M11.25 16.25h1.5L12 17z M16 14v.5 M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309 M8 14v.5 M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5",
    "category": "ui",
    "tags": "animal pet puppy hound canine"
  },
  {
    "id": "dollar-sign",
    "char": "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
    "category": "ui",
    "tags": "currency money payment"
  },
  {
    "id": "donut",
    "char": "M20.5 10a2.5 2.5 0 0 1-2.4-3H18a2.95 2.95 0 0 1-2.6-4.4 10 10 0 1 0 6.3 7.1c-.3.2-.8.3-1.2.3 M 12, 12 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "doughnut sprinkles topping fast food junk food snack treat sweet sugar dessert hollow ring"
  },
  {
    "id": "door-closed-locked",
    "char": "M10 12h.01 M18 9V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14 M2 20h8 M20 17v-2a2 2 0 1 0-4 0v2 M 14 17 h 8 v 5 h -8 Z",
    "category": "ui",
    "tags": "entrance entry exit ingress egress gate gateway emergency exit lock"
  },
  {
    "id": "door-closed",
    "char": "M10 12h.01 M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14 M2 20h20",
    "category": "ui",
    "tags": "entrance entry exit ingress egress gate gateway emergency exit"
  },
  {
    "id": "door-open",
    "char": "M11 20H2 M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z M11 4H8a2 2 0 0 0-2 2v14 M14 12h.01 M22 20h-3",
    "category": "ui",
    "tags": "entrance entry exit ingress egress gate gateway emergency exit"
  },
  {
    "id": "dot",
    "char": "M 12.1, 12.1 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0",
    "category": "ui",
    "tags": "interpunct interpoint middot step punctuation period full stop end finish final characters font typography type center ."
  },
  {
    "id": "download",
    "char": "M12 15V3 M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 m7 10 5 5 5-5",
    "category": "files",
    "tags": "import export save"
  },
  {
    "id": "drafting-compass",
    "char": "m12.99 6.74 1.93 3.44 M19.136 12a10 10 0 0 1-14.271 0 m21 21-2.16-3.84 m3 21 8.02-14.26 M 12, 5 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "geometry trigonometry radius diameter circumference calculate measure arc curve draw sketch"
  },
  {
    "id": "drama",
    "char": "M10 11h.01 M14 6h.01 M18 6h.01 M6.5 13.1h.01 M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3 M17.4 9.9c-.8.8-2 .8-2.8 0 M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7 M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4",
    "category": "ui",
    "tags": "drama masks theater theatre entertainment show"
  },
  {
    "id": "dribbble",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94 M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32 M8.56 2.75c4.37 6 6 9.42 8 17.72",
    "category": "ui",
    "tags": "design social"
  },
  {
    "id": "drill",
    "char": "M10 18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3 1 1 0 0 1 1-1z M13 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1l-.81 3.242a1 1 0 0 1-.97.758H8 M14 4h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3 M18 6h4 m5 10-2 8 m7 18 2-8",
    "category": "ui",
    "tags": "power bit head hole diy toolbox build construction"
  },
  {
    "id": "drone",
    "char": "M10 10 7 7 m10 14-3 3 m14 10 3-3 m14 14 3 3 M14.205 4.139a4 4 0 1 1 5.439 5.863 M19.637 14a4 4 0 1 1-5.432 5.868 M4.367 10a4 4 0 1 1 5.438-5.862 M9.795 19.862a4 4 0 1 1-5.429-5.873 M 10 8 h 4 v 8 h -4 Z",
    "category": "ui",
    "tags": "quadcopter uav aerial flight flying technology airborne robotics"
  },
  {
    "id": "droplet-off",
    "char": "M18.715 13.186C18.29 11.858 17.384 10.607 16 9.5c-2-1.6-3.5-4-4-6.5a10.7 10.7 0 0 1-.884 2.586 m2 2 20 20 M8.795 8.797A11 11 0 0 1 8 9.5C6 11.1 5 13 5 15a7 7 0 0 0 13.222 3.208",
    "category": "ui",
    "tags": "water weather liquid fluid wet moisture damp bead globule"
  },
  {
    "id": "droplet",
    "char": "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z",
    "category": "ui",
    "tags": "water weather liquid fluid wet moisture damp bead globule"
  },
  {
    "id": "droplets",
    "char": "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
    "category": "ui",
    "tags": "water weather liquid fluid wet moisture damp bead globule"
  },
  {
    "id": "drum",
    "char": "m2 2 8 8 m22 2-8 8 M7 13.4v7.9 M12 14v8 M17 13.4v7.9 M2 9v8a10 5 0 0 0 20 0V9",
    "category": "ui",
    "tags": "drummer kit sticks instrument beat bang bass backing track band play performance concert march music audio sound noise loud"
  },
  {
    "id": "drumstick",
    "char": "M15.4 15.63a7.875 6 135 1 1 6.23-6.23 4.5 3.43 135 0 0-6.23 6.23 m8.29 12.71-2.6 2.6a2.5 2.5 0 1 0-1.65 4.65A2.5 2.5 0 1 0 8.7 18.3l2.59-2.59",
    "category": "ui",
    "tags": "food chicken meat"
  },
  {
    "id": "dumbbell",
    "char": "M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z m2.5 21.5 1.4-1.4 m20.1 3.9 1.4-1.4 M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z m9.6 14.4 4.8-4.8",
    "category": "ui",
    "tags": "barbell weight workout gym"
  },
  {
    "id": "ear-off",
    "char": "M6 18.5a3.5 3.5 0 1 0 7 0c0-1.57.92-2.52 2.04-3.46 M6 8.5c0-.75.13-1.47.36-2.14 M8.8 3.15A6.5 6.5 0 0 1 19 8.5c0 1.63-.44 2.81-1.09 3.76 M12.5 6A2.5 2.5 0 0 1 15 8.5M10 13a2 2 0 0 0 1.82-1.18",
    "category": "ui",
    "tags": "hearing hard of hearing hearing loss deafness noise silence audio accessibility"
  },
  {
    "id": "ear",
    "char": "M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0 M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4",
    "category": "ui",
    "tags": "hearing noise audio accessibility"
  },
  {
    "id": "earth-lock",
    "char": "M7 3.34V5a3 3 0 0 0 3 3 M11 21.95V18a2 2 0 0 0-2-2 2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05 M21.54 15H17a2 2 0 0 0-2 2v4.54 M12 2a10 10 0 1 0 9.54 13 M20 6V4a2 2 0 1 0-4 0v2 M 14 6 h 8 v 5 h -8 Z",
    "category": "ui",
    "tags": "vpn private privacy network world browser security encryption protection connection"
  },
  {
    "id": "earth",
    "char": "M21.54 15H17a2 2 0 0 0-2 2v4.54 M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17 M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05 M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0",
    "category": "ui",
    "tags": "world browser language translate globe"
  },
  {
    "id": "eclipse",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M12 2a7 7 0 1 0 10 10",
    "category": "ui",
    "tags": "lunar solar crescent moon sun earth day night planet space mode dark light toggle switch color css styles display accessibility contrast brightness blend shade"
  },
  {
    "id": "egg-fried",
    "char": "M 11.5, 12.5 m -3.5, 0 a 3.5,3.5 0 1,0 7,0 a 3.5,3.5 0 1,0 -7,0 M3 8c0-3.5 2.5-6 6.5-6 5 0 4.83 3 7.5 5s5 2 5 6c0 4.5-2.5 6.5-7 6.5-2.5 0-2.5 2.5-6 2.5s-7-2-7-5.5c0-3 1.5-3 1.5-5C3.5 10 3 9 3 8Z",
    "category": "ui",
    "tags": "food breakfast"
  },
  {
    "id": "egg-off",
    "char": "m2 2 20 20 M20 14.347V14c0-6-4-12-8-12-1.078 0-2.157.436-3.157 1.19 M6.206 6.21C4.871 8.4 4 11.2 4 14a8 8 0 0 0 14.568 4.568",
    "category": "ui",
    "tags": "egg free vegan hatched bad egg"
  },
  {
    "id": "egg",
    "char": "M12 2C8 2 4 8 4 14a8 8 0 0 0 16 0c0-6-4-12-8-12",
    "category": "ui",
    "tags": "bird chicken nest hatch shell incubate soft boiled hard breakfast brunch morning easter"
  },
  {
    "id": "ellipse",
    "char": "",
    "category": "ui",
    "tags": "shape geometry rounded smooth outline form boundary curve shapes ellipse oval"
  },
  {
    "id": "ellipsis-vertical",
    "char": "M 12, 12 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 12, 5 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 12, 19 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0",
    "category": "ui",
    "tags": "menu options spread more further extra overflow dots … ..."
  },
  {
    "id": "ellipsis",
    "char": "M 12, 12 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 19, 12 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 5, 12 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0",
    "category": "ui",
    "tags": "et cetera etc loader loading progress pending throbber menu options operator code coding spread rest more further extra overflow dots … ..."
  },
  {
    "id": "equal-approximately",
    "char": "M5 15a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0 M5 9a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0",
    "category": "ui",
    "tags": "about calculate math operater"
  },
  {
    "id": "equal-not",
    "char": "",
    "category": "ui",
    "tags": "calculate off math operator code ≠"
  },
  {
    "id": "equal",
    "char": "",
    "category": "ui",
    "tags": "calculate math operator assignment code ="
  },
  {
    "id": "eraser",
    "char": "M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21 m5.082 11.09 8.828 8.828",
    "category": "ui",
    "tags": "pencil drawing undo delete clear trash remove"
  },
  {
    "id": "ethernet-port",
    "char": "m15 20 3-3h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2l3 3z M6 8v1 M10 8v1 M14 8v1 M18 8v1",
    "category": "ui",
    "tags": "internet network connection cable lan port router switch hub modem web online networking communication socket plug slot controller connector interface console signal data input output"
  },
  {
    "id": "euro",
    "char": "M4 10h12 M4 14h9 M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2",
    "category": "ui",
    "tags": "currency money payment"
  },
  {
    "id": "ev-charger",
    "char": "M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5 M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16 M2 21h13 M3 7h11 m9 11-2 3h3l-2 3",
    "category": "ui",
    "tags": "electric charger station vehicle fast plug ev power electricity energy accumulator charge"
  },
  {
    "id": "expand",
    "char": "m15 15 6 6 m15 9 6-6 M21 16v5h-5 M21 8V3h-5 M3 16v5h5 m3 21 6-6 M3 8V3h5 M9 9 3 3",
    "category": "ui",
    "tags": "scale fullscreen maximize minimize contract"
  },
  {
    "id": "external-link",
    "char": "M15 3h6v6 M10 14 21 3 M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
    "category": "ui",
    "tags": "outbound open share"
  },
  {
    "id": "eye-closed",
    "char": "m15 18-.722-3.25 M2 8a10.645 10.645 0 0 0 20 0 m20 15-1.726-2.05 m4 15 1.726-2.05 m9 18 .722-3.25",
    "category": "ui",
    "tags": "view watch see hide conceal mask hidden visibility vision"
  },
  {
    "id": "eye-off",
    "char": "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49 M14.084 14.158a3 3 0 0 1-4.242-4.242 M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143 m2 2 20 20",
    "category": "ui",
    "tags": "view watch see hide conceal mask hidden visibility vision"
  },
  {
    "id": "eye",
    "char": "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0 M 12, 12 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "view watch see show expose reveal display visible visibility vision preview read"
  },
  {
    "id": "facebook",
    "char": "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
    "category": "files",
    "tags": "logo social"
  },
  {
    "id": "factory",
    "char": "M12 16h.01 M16 16h.01 M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z M8 16h.01",
    "category": "ui",
    "tags": "building business energy industry manufacture sector"
  },
  {
    "id": "fan",
    "char": "M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z M12 12v.01",
    "category": "ui",
    "tags": "air cooler ventilation ventilator blower"
  },
  {
    "id": "fast-forward",
    "char": "M12 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 12 18z M2 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 2 18z",
    "category": "ui",
    "tags": "music"
  },
  {
    "id": "feather",
    "char": "M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z M16 8 2 22 M17.5 15H9",
    "category": "ui",
    "tags": "logo"
  },
  {
    "id": "fence",
    "char": "M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z M6 8h4 M6 18h4 m12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z M14 8h4 M14 18h4 m20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z",
    "category": "ui",
    "tags": "picket panels woodwork diy materials suburban garden property territory"
  },
  {
    "id": "ferris-wheel",
    "char": "M 12, 12 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M12 2v4 m6.8 15-3.5 2 m20.7 7-3.5 2 M6.8 9 3.3 7 m20.7 17-3.5-2 m9 22 3-8 3 8 M8 22h8 M18 18.7a9 9 0 1 0-12 0",
    "category": "ui",
    "tags": "big wheel daisy wheel observation attraction entertainment amusement park theme park funfair"
  },
  {
    "id": "figma",
    "char": "M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z",
    "category": "ui",
    "tags": "logo design tool"
  },
  {
    "id": "file-archive",
    "char": "M13.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v11.5 M14 2v5a1 1 0 0 0 1 1h5 M8 12v-1 M8 18v-2 M8 7V6 M 8, 20 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "communication",
    "tags": "zip package archive"
  },
  {
    "id": "file-axis-3d",
    "char": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M14 2v5a1 1 0 0 0 1 1h5 m8 18 4-4 M8 10v8h8",
    "category": "ui",
    "tags": "model 3d axis coordinates"
  },
  {
    "id": "file-badge",
    "char": "M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.3 M14 2v5a1 1 0 0 0 1 1h5 m7.69 16.479 1.29 4.88a.5.5 0 0 1-.698.591l-1.843-.849a1 1 0 0 0-.879.001l-1.846.85a.5.5 0 0 1-.692-.593l1.29-4.88 M 6, 14 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "files",
    "tags": "award achievement badge rosette prize winner"
  },
  {
    "id": "file-box",
    "char": "M14.5 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.8 M14 2v5a1 1 0 0 0 1 1h5 M11.7 14.2 7 17l-4.7-2.8 M3 13.1a2 2 0 0 0-.999 1.76v3.24a2 2 0 0 0 .969 1.78L6 21.7a2 2 0 0 0 2.03.01L11 19.9a2 2 0 0 0 1-1.76V14.9a2 2 0 0 0-.97-1.78L8 11.3a2 2 0 0 0-2.03-.01z M7 17v5",
    "category": "ui",
    "tags": "box package model"
  },
  {
    "id": "file-braces-corner",
    "char": "M14 22h4a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v6 M14 2v5a1 1 0 0 0 1 1h5 M5 14a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1 1 1 0 0 1 1 1v2a1 1 0 0 0 1 1 M9 22a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-2a1 1 0 0 0-1-1",
    "category": "files",
    "tags": "code json curly braces curly brackets"
  },
  {
    "id": "file-braces",
    "char": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M14 2v5a1 1 0 0 0 1 1h5 M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1 M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1",
    "category": "files",
    "tags": "code json curly braces curly brackets"
  },
  {
    "id": "file-chart-column-increasing",
    "char": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M14 2v5a1 1 0 0 0 1 1h5 M8 18v-2 M12 18v-4 M16 18v-6",
    "category": "files",
    "tags": "statistics analytics diagram graph presentation trending up"
  },
  {
    "id": "file-chart-column",
    "char": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M14 2v5a1 1 0 0 0 1 1h5 M8 18v-1 M12 18v-6 M16 18v-3",
    "category": "files",
    "tags": "statistics analytics diagram graph presentation"
  },
  {
    "id": "file-chart-line",
    "char": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M14 2v5a1 1 0 0 0 1 1h5 m16 13-3.5 3.5-2-2L8 17",
    "category": "files",
    "tags": "statistics analytics diagram graph presentation"
  },
  {
    "id": "file-chart-pie",
    "char": "M15.941 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.704l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.512 M14 2v5a1 1 0 0 0 1 1h5 M4.017 11.512a6 6 0 1 0 8.466 8.475 M9 16a1 1 0 0 1-1-1v-4c0-.552.45-1.008.995-.917a6 6 0 0 1 4.922 4.922c.091.544-.365.995-.917.995z",
    "category": "files",
    "tags": "statistics analytics diagram graph presentation"
  },
  {
    "id": "file-check-corner",
    "char": "M10.5 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v6 M14 2v5a1 1 0 0 0 1 1h5 m14 20 2 2 4-4",
    "category": "ui",
    "tags": "done document todo tick complete task"
  },
  {
    "id": "file-check",
    "char": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M14 2v5a1 1 0 0 0 1 1h5 m9 15 2 2 4-4",
    "category": "ui",
    "tags": "done document todo tick complete task"
  },
  {
    "id": "file-clock",
    "char": "M16 22h2a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v2.85 M14 2v5a1 1 0 0 0 1 1h5 M8 14v2.2l1.6 1 M 8, 16 m -6, 0 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0",
    "category": "files",
    "tags": "history log clock"
  },
  {
    "id": "file-code-corner",
    "char": "M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35 M14 2v5a1 1 0 0 0 1 1h5 m5 16-3 3 3 3 m9 22 3-3-3-3",
    "category": "files",
    "tags": "script document html xml property list plist"
  },
  {
    "id": "file-code",
    "char": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M14 2v5a1 1 0 0 0 1 1h5 M10 12.5 8 15l2 2.5 m14 12.5 2 2.5-2 2.5",
    "category": "files",
    "tags": "script document gist html xml property list plist"
  },
  {
    "id": "file-cog",
    "char": "M15 8a1 1 0 0 1-1-1V2a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8z M20 8v12a2 2 0 0 1-2 2h-4.182 m3.305 19.53.923-.382 M4 10.592V4a2 2 0 0 1 2-2h8 m4.228 16.852-.924-.383 m5.852 15.228-.383-.923 m5.852 20.772-.383.924 m8.148 15.228.383-.923 m8.53 21.696-.382-.924 m9.773 16.852.922-.383 m9.773 19.148.922.383 M 7, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "files",
    "tags": "executable settings cog edit gear"
  },
  {
    "id": "file-diff",
    "char": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M9 10h6 M12 13V7 M9 17h6",
    "category": "files",
    "tags": "diff patch"
  },
  {
    "id": "file-digit",
    "char": "M4 12V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2 M14 2v5a1 1 0 0 0 1 1h5 M10 16h2v6 M10 22h4 M 2 16 h 4 v 6 h -4 Z",
    "category": "files",
    "tags": "number document"
  },
  {
    "id": "file-down",
    "char": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M14 2v5a1 1 0 0 0 1 1h5 M12 18v-6 m9 15 3 3 3-3",
    "category": "files",
    "tags": "download import export"
  },
  {
    "id": "file-exclamation-point",
    "char": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M12 9v4 M12 17h.01",
    "category": "ui",
    "tags": "hidden warning alert danger protected exclamation mark"
  },
  {
    "id": "file-headphone",
    "char": "M4 6.835V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-.343 M14 2v5a1 1 0 0 0 1 1h5 M2 19a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 0 1-4 0v-1a2 2 0 0 1 4 0",
    "category": "communication",
    "tags": "music audio sound headphones"
  },
  {
    "id": "file-heart",
    "char": "M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v7 M14 2v5a1 1 0 0 0 1 1h5 M3.62 18.8A2.25 2.25 0 1 1 7 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a1 1 0 0 1-1.507 0z",
    "category": "files",
    "tags": "heart favourite bookmark quick link"
  },
  {
    "id": "file-image",
    "char": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M14 2v5a1 1 0 0 0 1 1h5 M 10, 12 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22",
    "category": "media",
    "tags": "image graphics photo picture"
  },
  {
    "id": "file-input",
    "char": "M4 11V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1 M14 2v5a1 1 0 0 0 1 1h5 M2 15h10 m9 18 3-3-3-3",
    "category": "files",
    "tags": "document"
  },
  {
    "id": "file-key",
    "char": "M14 2v5a1 1 0 0 0 1 1h5 M4 12v6 M4 14h2 M9.65 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v4 M 4, 20 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "files",
    "tags": "key private public security"
  },
  {
    "id": "file-lock",
    "char": "M4 9.8V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3 M14 2v5a1 1 0 0 0 1 1h5 M9 17v-2a2 2 0 0 0-4 0v2 M 3 17 h 8 v 5 h -8 Z",
    "category": "files",
    "tags": "lock password security"
  },
  {
    "id": "file-minus-corner",
    "char": "M20 14V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12 M14 2v5a1 1 0 0 0 1 1h5 M14 18h6",
    "category": "files",
    "tags": "document"
  },
  {
    "id": "file-minus",
    "char": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M14 2v5a1 1 0 0 0 1 1h5 M9 15h6",
    "category": "files",
    "tags": "delete remove erase document"
  },
  {
    "id": "file-music",
    "char": "M11.65 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v10.35 M14 2v5a1 1 0 0 0 1 1h5 M8 20v-7l3 1.474 M 6, 20 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "media",
    "tags": "audio sound noise track digital recording playback piano keyboard keys notes chord midi octave"
  },
  {
    "id": "file-output",
    "char": "M4.226 20.925A2 2 0 0 0 6 22h12a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.127 M14 2v5a1 1 0 0 0 1 1h5 m5 11-3 3 m5 17-3-3h10",
    "category": "files",
    "tags": "document"
  },
  {
    "id": "file-pen-line",
    "char": "M14.364 13.634a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506l4.013-4.009a1 1 0 0 0-3.004-3.004z M14.487 7.858A1 1 0 0 1 14 7V2 M20 19.645V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l2.516 2.516 M8 18h1",
    "category": "files",
    "tags": "edit"
  },
  {
    "id": "file-pen",
    "char": "M12.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v9.34 M14 2v5a1 1 0 0 0 1 1h5 M10.378 12.622a1 1 0 0 1 3 3.003L8.36 20.637a2 2 0 0 1-.854.506l-2.867.837a.5.5 0 0 1-.62-.62l.836-2.869a2 2 0 0 1 .506-.853z",
    "category": "files",
    "tags": "signature"
  },
  {
    "id": "file-play",
    "char": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M14 2v5a1 1 0 0 0 1 1h5 M15.033 13.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56v-4.704a.645.645 0 0 1 .967-.56z",
    "category": "media",
    "tags": "movie video film"
  },
  {
    "id": "file-plus-corner",
    "char": "M11.35 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5.35 M14 2v5a1 1 0 0 0 1 1h5 M14 19h6 M17 16v6",
    "category": "ui",
    "tags": "add create new document"
  },
  {
    "id": "file-plus",
    "char": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M14 2v5a1 1 0 0 0 1 1h5 M9 15h6 M12 18v-6",
    "category": "ui",
    "tags": "add create new document"
  },
  {
    "id": "file-question-mark",
    "char": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M12 17h.01 M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3",
    "category": "files",
    "tags": "readme help question"
  },
  {
    "id": "file-scan",
    "char": "M20 10V8a2.4 2.4 0 0 0-.706-1.704l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4.35 M14 2v5a1 1 0 0 0 1 1h5 M16 14a2 2 0 0 0-2 2 M16 22a2 2 0 0 1-2-2 M20 14a2 2 0 0 1 2 2 M20 22a2 2 0 0 0 2-2",
    "category": "files",
    "tags": "scan code qr-code"
  },
  {
    "id": "file-search-corner",
    "char": "M11.1 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.589 3.588A2.4 2.4 0 0 1 20 8v3.25 M14 2v5a1 1 0 0 0 1 1h5 m21 22-2.88-2.88 M 16, 17 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "lost document find browser lens"
  },
  {
    "id": "file-search",
    "char": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M14 2v5a1 1 0 0 0 1 1h5 M 11.5, 14.5 m -2.5, 0 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0 M13.3 16.3 15 18",
    "category": "ui",
    "tags": "lost document find browser lens"
  },
  {
    "id": "file-signal",
    "char": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M14 2v5a1 1 0 0 0 1 1h5 M8 15h.01 M11.5 13.5a2.5 2.5 0 0 1 0 3 M15 12a5 5 0 0 1 0 6",
    "category": "files",
    "tags": "audio music volume"
  },
  {
    "id": "file-sliders",
    "char": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M14 2v5a1 1 0 0 0 1 1h5 M8 12h8 M10 11v2 M8 17h8 M14 16v2",
    "category": "files",
    "tags": "cogged gear mechanical machinery configuration controls preferences settings system admin edit executable"
  },
  {
    "id": "file-spreadsheet",
    "char": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M14 2v5a1 1 0 0 0 1 1h5 M8 13h2 M14 13h2 M8 17h2 M14 17h2",
    "category": "files",
    "tags": "spreadsheet sheet table"
  },
  {
    "id": "file-stack",
    "char": "M11 21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1 M16 16a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1 M21 6a2 2 0 0 0-.586-1.414l-2-2A2 2 0 0 0 17 2h-3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1z",
    "category": "files",
    "tags": "versions multiple copy documents revisions version control history"
  },
  {
    "id": "file-symlink",
    "char": "M4 11V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7 M14 2v5a1 1 0 0 0 1 1h5 m10 18 3-3-3-3",
    "category": "ui",
    "tags": "symlink symbolic link"
  },
  {
    "id": "file-terminal",
    "char": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M14 2v5a1 1 0 0 0 1 1h5 m8 16 2-2-2-2 M12 18h4",
    "category": "files",
    "tags": "terminal bash script executable"
  },
  {
    "id": "file-text",
    "char": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M14 2v5a1 1 0 0 0 1 1h5 M10 9H8 M16 13H8 M16 17H8",
    "category": "ui",
    "tags": "data txt pdf document"
  },
  {
    "id": "file-type-corner",
    "char": "M12 22h6a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v6 M14 2v5a1 1 0 0 0 1 1h5 M3 16v-1.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5V16 M6 22h2 M7 14v8",
    "category": "files",
    "tags": "font text typography type"
  },
  {
    "id": "file-type",
    "char": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M14 2v5a1 1 0 0 0 1 1h5 M11 18h2 M12 12v6 M9 13v-.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v.5",
    "category": "files",
    "tags": "font text typography type"
  },
  {
    "id": "file-up",
    "char": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M14 2v5a1 1 0 0 0 1 1h5 M12 12v6 m15 15-3-3-3 3",
    "category": "files",
    "tags": "upload import export"
  },
  {
    "id": "file-user",
    "char": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M14 2v5a1 1 0 0 0 1 1h5 M16 22a4 4 0 0 0-8 0 M 12, 15 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "person personal information people listing networking document contact cover letter resume cv curriculum vitae application form"
  },
  {
    "id": "file-video-camera",
    "char": "M4 12V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2 M14 2v5a1 1 0 0 0 1 1h5 m10 17.843 3.033-1.755a.64.64 0 0 1 .967.56v4.704a.65.65 0 0 1-.967.56L10 20.157 M 3 16 h 7 v 6 h -7 Z",
    "category": "media",
    "tags": "movie video film"
  },
  {
    "id": "file-volume",
    "char": "M4 11.55V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-1.95 M14 2v5a1 1 0 0 0 1 1h5 M12 15a5 5 0 0 1 0 6 M8 14.502a.5.5 0 0 0-.826-.381l-1.893 1.631a1 1 0 0 1-.651.243H3.5a.5.5 0 0 0-.5.501v3.006a.5.5 0 0 0 .5.501h1.129a1 1 0 0 1 .652.243l1.893 1.633a.5.5 0 0 0 .826-.38z",
    "category": "media",
    "tags": "audio music volume"
  },
  {
    "id": "file-x-corner",
    "char": "M11 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5 M14 2v5a1 1 0 0 0 1 1h5 m15 17 5 5 m20 17-5 5",
    "category": "ui",
    "tags": "lost delete remove document"
  },
  {
    "id": "file-x",
    "char": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M14 2v5a1 1 0 0 0 1 1h5 m14.5 12.5-5 5 m9.5 12.5 5 5",
    "category": "ui",
    "tags": "lost delete remove document"
  },
  {
    "id": "file",
    "char": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z M14 2v5a1 1 0 0 0 1 1h5",
    "category": "files",
    "tags": "document"
  },
  {
    "id": "files",
    "char": "M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8 M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1",
    "category": "files",
    "tags": "multiple copy documents"
  },
  {
    "id": "film",
    "char": "M 3 3 h 18 v 18 h -18 Z M7 3v18 M3 7.5h4 M3 12h18 M3 16.5h4 M17 3v18 M17 7.5h4 M17 16.5h4",
    "category": "ui",
    "tags": "movie video reel camera cinema entertainment"
  },
  {
    "id": "fingerprint-pattern",
    "char": "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4 M14 13.12c0 2.38 0 6.38-1 8.88 M17.29 21.02c.12-.6.43-2.3.5-3.02 M2 12a10 10 0 0 1 18-6 M2 16h.01 M21.8 16c.2-2 .131-5.354 0-6 M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2 M8.65 22c.21-.66.45-1.32.57-2 M9 6.8a6 6 0 0 1 9 5.2v2",
    "category": "ui",
    "tags": "2fa authentication biometric identity security"
  },
  {
    "id": "fire-extinguisher",
    "char": "M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5 M9 18h8 M18 3h-3 M11 3a6 6 0 0 0-6 6v11 M5 13h4 M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z",
    "category": "ui",
    "tags": "flames smoke foam water spray hose firefighter fireman department brigade station emergency suppress compressed tank cylinder safety equipment amenities"
  },
  {
    "id": "fish-off",
    "char": "M18 12.47v.03m0-.5v.47m-.475 5.056A6.744 6.744 0 0 1 15 18c-3.56 0-7.56-2.53-8.5-6 .348-1.28 1.114-2.433 2.121-3.38m3.444-2.088A8.802 8.802 0 0 1 15 6c3.56 0 6.06 2.54 7 6-.309 1.14-.786 2.177-1.413 3.058 M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33m7.48-4.372A9.77 9.77 0 0 1 16 6.07m0 11.86a9.77 9.77 0 0 1-1.728-3.618 m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98M8.53 3h5.27a2 2 0 0 1 1.98 1.67l.23 1.4M2 2l20 20",
    "category": "ui",
    "tags": "food dish restaurant course meal seafood animal pet sea marine allergy intolerance diet"
  },
  {
    "id": "fish-symbol",
    "char": "M2 16s9-15 20-4C11 23 2 8 2 8",
    "category": "ui",
    "tags": "dish restaurant course meal seafood pet sea marine"
  },
  {
    "id": "fish",
    "char": "M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z M18 12v.5 M16 17.93a9.77 9.77 0 0 1 0-11.86 M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33 M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4 m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98",
    "category": "ui",
    "tags": "dish restaurant course meal seafood pet sea marine"
  },
  {
    "id": "fishing-hook",
    "char": "m17.586 11.414-5.93 5.93a1 1 0 0 1-8-8l3.137-3.137a.707.707 0 0 1 1.207.5V10 M20.414 8.586 22 7 M 19, 10 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "sea boating angler bait reel tackle marine outdoors fish fishing hook sports travel"
  },
  {
    "id": "fishing-rod",
    "char": "M4 11h1 M8 15a2 2 0 0 1-4 0V3a1 1 0 0 1 1-1h.5C14 2 20 9 20 18v4 M 18, 18 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "fishing rod hobby equipment reel"
  },
  {
    "id": "flag-off",
    "char": "M16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528 m2 2 20 20 M4 22V4 M7.656 2H8c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10.347",
    "category": "ui",
    "tags": "unflag unmark report marker notification warning milestone goal notice signal attention banner"
  },
  {
    "id": "flag-triangle-left",
    "char": "M18 22V2.8a.8.8 0 0 0-1.17-.71L5.45 7.78a.8.8 0 0 0 0 1.44L18 15.5",
    "category": "ui",
    "tags": "report timeline marker pin"
  },
  {
    "id": "flag-triangle-right",
    "char": "M6 22V2.8a.8.8 0 0 1 1.17-.71l11.38 5.69a.8.8 0 0 1 0 1.44L6 15.5",
    "category": "ui",
    "tags": "report timeline marker pin"
  },
  {
    "id": "flag",
    "char": "M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528",
    "category": "ui",
    "tags": "report marker notification warning milestone goal notice signal attention banner"
  },
  {
    "id": "flame-kindling",
    "char": "M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 17 10a5 5 0 1 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C8 4.5 11 2 12 2Z m5 22 14-4 m5 18 14 4",
    "category": "ui",
    "tags": "campfire camping wilderness outdoors lit warmth wood twigs sticks"
  },
  {
    "id": "flame",
    "char": "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
    "category": "ui",
    "tags": "heat burn light glow ignite passion ember fire lit burning spark embers smoke firefighter fireman department brigade station emergency"
  },
  {
    "id": "flashlight-off",
    "char": "M11.652 6H18 M12 13v1 M16 16v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-8a4 4 0 0 0-.8-2.4l-.6-.8A3 3 0 0 1 6 7V6 m2 2 20 20 M7.649 2H17a1 1 0 0 1 1 1v4a3 3 0 0 1-.6 1.8l-.6.8a4 4 0 0 0-.55 1.007",
    "category": "ui",
    "tags": "torch light beam emergency safety tool bright"
  },
  {
    "id": "flashlight",
    "char": "M12 13v1 M17 2a1 1 0 0 1 1 1v4a3 3 0 0 1-.6 1.8l-.6.8A4 4 0 0 0 16 12v8a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-8a4 4 0 0 0-.8-2.4l-.6-.8A3 3 0 0 1 6 7V3a1 1 0 0 1 1-1z M6 6h12",
    "category": "ui",
    "tags": "torch light beam emergency safety tool bright"
  },
  {
    "id": "flask-conical-off",
    "char": "M10 2v2.343 M14 2v6.343 m2 2 20 20 M20 20a2 2 0 0 1-2 2H6a2 2 0 0 1-1.755-2.96l5.227-9.563 M6.453 15H15 M8.5 2h7",
    "category": "ui",
    "tags": "beaker erlenmeyer non toxic lab chemistry experiment test"
  },
  {
    "id": "flask-conical",
    "char": "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2 M6.453 15h11.094 M8.5 2h7",
    "category": "ui",
    "tags": "beaker erlenmeyer lab chemistry experiment test"
  },
  {
    "id": "flask-round",
    "char": "M10 2v6.292a7 7 0 1 0 4 0V2 M5 15h14 M8.5 2h7",
    "category": "ui",
    "tags": "beaker lab chemistry experiment test"
  },
  {
    "id": "flip-horizontal-2",
    "char": "m3 7 5 5-5 5V7 m21 7-5 5 5 5V7 M12 20v2 M12 14v2 M12 8v2 M12 2v2",
    "category": "ui",
    "tags": "reflect mirror alignment dashed"
  },
  {
    "id": "flip-vertical-2",
    "char": "m17 3-5 5-5-5h10 m17 21-5-5-5 5h10 M4 12H2 M10 12H8 M16 12h-2 M22 12h-2",
    "category": "ui",
    "tags": "reflect mirror alignment dashed"
  },
  {
    "id": "flower-2",
    "char": "M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1 M 12, 8 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M12 10v12 M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z",
    "category": "ui",
    "tags": "sustainability nature plant"
  },
  {
    "id": "flower",
    "char": "M 12, 12 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5 M12 7.5V9 M7.5 12H9 M16.5 12H15 M12 16.5V15 m8 8 1.88 1.88 M14.12 9.88 16 8 m8 16 1.88-1.88 M14.12 14.12 16 16",
    "category": "ui",
    "tags": "sustainability nature plant spring"
  },
  {
    "id": "focus",
    "char": "M 12, 12 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M3 7V5a2 2 0 0 1 2-2h2 M17 3h2a2 2 0 0 1 2 2v2 M21 17v2a2 2 0 0 1-2 2h-2 M7 21H5a2 2 0 0 1-2-2v-2",
    "category": "ui",
    "tags": "camera lens photo dashed"
  },
  {
    "id": "fold-horizontal",
    "char": "M2 12h6 M22 12h-6 M12 2v2 M12 8v2 M12 14v2 M12 20v2 m19 9-3 3 3 3 m5 15 3-3-3-3",
    "category": "ui",
    "tags": "arrow collapse fold vertical dashed"
  },
  {
    "id": "fold-vertical",
    "char": "M12 22v-6 M12 8V2 M4 12H2 M10 12H8 M16 12h-2 M22 12h-2 m15 19-3-3-3 3 m15 5-3 3-3-3",
    "category": "ui",
    "tags": "arrow collapse fold vertical dashed"
  },
  {
    "id": "folder-archive",
    "char": "M 15, 19 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M20.9 19.8A2 2 0 0 0 22 18V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h5.1 M15 11v-1 M15 17v-2",
    "category": "communication",
    "tags": "archive zip package"
  },
  {
    "id": "folder-check",
    "char": "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z m9 13 2 2 4-4",
    "category": "ui",
    "tags": "done directory todo tick complete task"
  },
  {
    "id": "folder-clock",
    "char": "M16 14v2.2l1.6 1 M7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2 M 16, 16 m -6, 0 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0",
    "category": "files",
    "tags": "history directory clock"
  },
  {
    "id": "folder-closed",
    "char": "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z M2 10h20",
    "category": "files",
    "tags": "directory closed"
  },
  {
    "id": "folder-code",
    "char": "M10 10.5 8 13l2 2.5 m14 10.5 2 2.5-2 2.5 M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z",
    "category": "files",
    "tags": "directory coding develop software"
  },
  {
    "id": "folder-cog",
    "char": "M10.3 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.98a2 2 0 0 1 1.69.9l.66 1.2A2 2 0 0 0 12 6h8a2 2 0 0 1 2 2v3.3 m14.305 19.53.923-.382 m15.228 16.852-.923-.383 m16.852 15.228-.383-.923 m16.852 20.772-.383.924 m19.148 15.228.383-.923 m19.53 21.696-.382-.924 m20.772 16.852.924-.383 m20.772 19.148.924.383 M 18, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "files",
    "tags": "directory settings control preferences cog edit gear"
  },
  {
    "id": "folder-dot",
    "char": "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z M 12, 13 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0",
    "category": "files",
    "tags": "directory root project pinned active current cogged gear mechanical machinery configuration controls preferences settings system admin edit"
  },
  {
    "id": "folder-down",
    "char": "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z M12 10v6 m15 13-3 3-3-3",
    "category": "files",
    "tags": "directory download import export"
  },
  {
    "id": "folder-git-2",
    "char": "M18 19a5 5 0 0 1-5-5v8 M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5 M 13, 12 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 20, 19 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "files",
    "tags": "directory root project git repo"
  },
  {
    "id": "folder-git",
    "char": "M 12, 13 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z M14 13h3 M7 13h3",
    "category": "files",
    "tags": "directory root project git repo"
  },
  {
    "id": "folder-heart",
    "char": "M10.638 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v3.417 M14.62 18.8A2.25 2.25 0 1 1 18 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z",
    "category": "files",
    "tags": "directory heart favourite bookmark quick link"
  },
  {
    "id": "folder-input",
    "char": "M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1 M2 13h10 m9 16 3-3-3-3",
    "category": "files",
    "tags": "directory import export"
  },
  {
    "id": "folder-kanban",
    "char": "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z M8 10v4 M12 10v2 M16 10v6",
    "category": "files",
    "tags": "projects manage overview board tickets issues roadmap plan intentions productivity work agile code coding directory project root"
  },
  {
    "id": "folder-key",
    "char": "M13 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1.36 M19 12v6 M19 14h2 M 19, 20 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "files",
    "tags": "directory key private security protected"
  },
  {
    "id": "folder-lock",
    "char": "M 14 17 h 8 v 5 h -8 Z M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2.5 M20 17v-2a2 2 0 1 0-4 0v2",
    "category": "files",
    "tags": "directory lock private security protected"
  },
  {
    "id": "folder-minus",
    "char": "M9 13h6 M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
    "category": "files",
    "tags": "directory remove delete"
  },
  {
    "id": "folder-open-dot",
    "char": "m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2 M 14, 15 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0",
    "category": "files",
    "tags": "directory root project active current pinned"
  },
  {
    "id": "folder-open",
    "char": "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
    "category": "files",
    "tags": "directory"
  },
  {
    "id": "folder-output",
    "char": "M2 7.5V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-1.5 M2 13h10 m5 10-3 3 3 3",
    "category": "files",
    "tags": "directory import export"
  },
  {
    "id": "folder-pen",
    "char": "M2 11.5V5a2 2 0 0 1 2-2h3.9c.7 0 1.3.3 1.7.9l.8 1.2c.4.6 1 .9 1.7.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9.5 M11.378 13.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
    "category": "files",
    "tags": "directory rename"
  },
  {
    "id": "folder-plus",
    "char": "M12 10v6 M9 13h6 M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
    "category": "ui",
    "tags": "directory add create new"
  },
  {
    "id": "folder-root",
    "char": "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z M 12, 13 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M12 15v5",
    "category": "files",
    "tags": "directory root project git repo"
  },
  {
    "id": "folder-search-2",
    "char": "M 11.5, 12.5 m -2.5, 0 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0 M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z M13.3 14.3 15 16",
    "category": "ui",
    "tags": "directory search find lost browser lens"
  },
  {
    "id": "folder-search",
    "char": "M10.7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4.1 m21 21-1.9-1.9 M 17, 17 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "directory search find lost browser lens"
  },
  {
    "id": "folder-symlink",
    "char": "M2 9.35V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7 m8 16 3-3-3-3",
    "category": "ui",
    "tags": "directory symlink symbolic link"
  },
  {
    "id": "folder-sync",
    "char": "M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5 M12 10v4h4 m12 14 1.535-1.605a5 5 0 0 1 8 1.5 M22 22v-4h-4 m22 18-1.535 1.605a5 5 0 0 1-8-1.5",
    "category": "files",
    "tags": "directory synchronize synchronise refresh reconnect transfer backup"
  },
  {
    "id": "folder-tree",
    "char": "M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z M3 5a2 2 0 0 0 2 2h3 M3 3v13a2 2 0 0 0 2 2h3",
    "category": "files",
    "tags": "directory tree browser"
  },
  {
    "id": "folder-up",
    "char": "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z M12 10v6 m9 13 3-3 3 3",
    "category": "files",
    "tags": "directory upload import export"
  },
  {
    "id": "folder-x",
    "char": "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z m9.5 10.5 5 5 m14.5 10.5-5 5",
    "category": "ui",
    "tags": "directory remove delete"
  },
  {
    "id": "folder",
    "char": "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
    "category": "files",
    "tags": "directory"
  },
  {
    "id": "folders",
    "char": "M20 5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2.5a1.5 1.5 0 0 1 1.2.6l.6.8a1.5 1.5 0 0 0 1.2.6z M3 8.268a2 2 0 0 0-1 1.738V19a2 2 0 0 0 2 2h11a2 2 0 0 0 1.732-1",
    "category": "files",
    "tags": "multiple copy directories"
  },
  {
    "id": "footprints",
    "char": "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z M16 17h4 M4 13h4",
    "category": "ui",
    "tags": "steps walking foot feet trail shoe"
  },
  {
    "id": "forklift",
    "char": "M12 12H5a2 2 0 0 0-2 2v5 M15 19h7 M16 19V2 M6 12V7a2 2 0 0 1 2-2h2.172a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 16 10.828 M7 19h4 M 13, 19 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 5, 19 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "machinery industrial warehouse lifting storage equipment heavy-duty moving vehicle transport logistics"
  },
  {
    "id": "form",
    "char": "M4 14h6 M4 2h10 M 4 18 h 16 v 4 h -16 Z M 4 6 h 16 v 4 h -16 Z",
    "category": "ui",
    "tags": "document page file layout paper stub formality structure template inputs design components"
  },
  {
    "id": "forward",
    "char": "m15 17 5-5-5-5 M4 18v-2a4 4 0 0 1 4-4h12",
    "category": "ui",
    "tags": "send share email"
  },
  {
    "id": "frame",
    "char": "",
    "category": "ui",
    "tags": "logo design tool"
  },
  {
    "id": "framer",
    "char": "M5 16V9h14V2H5l14 14h-7m-7 0 7 7v-7m-7 0h7",
    "category": "ui",
    "tags": "logo design tool"
  },
  {
    "id": "frown",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M16 16s-1.5-2-4-2-4 2-4 2",
    "category": "ui",
    "tags": "emoji face bad sad emotion"
  },
  {
    "id": "fuel",
    "char": "M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5 M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16 M2 21h13 M3 9h11",
    "category": "ui",
    "tags": "filling-station gas petrol tank"
  },
  {
    "id": "fullscreen",
    "char": "M3 7V5a2 2 0 0 1 2-2h2 M17 3h2a2 2 0 0 1 2 2v2 M21 17v2a2 2 0 0 1-2 2h-2 M7 21H5a2 2 0 0 1-2-2v-2 M 7 8 h 10 v 8 h -10 Z",
    "category": "ui",
    "tags": "expand zoom preview focus camera lens image"
  },
  {
    "id": "funnel-plus",
    "char": "M13.354 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l1.218-1.348 M16 6h6 M19 3v6",
    "category": "ui",
    "tags": "filter hopper add create new"
  },
  {
    "id": "funnel-x",
    "char": "M12.531 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l.427-.473 m16.5 3.5 5 5 m21.5 3.5-5 5",
    "category": "ui",
    "tags": "filter hopper remove delete"
  },
  {
    "id": "funnel",
    "char": "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
    "category": "ui",
    "tags": "filter hopper"
  },
  {
    "id": "gallery-horizontal-end",
    "char": "M2 7v10 M6 5v14 M 10 3 h 12 v 18 h -12 Z",
    "category": "ui",
    "tags": "carousel pictures images scroll swipe album portfolio history versions backup time machine"
  },
  {
    "id": "gallery-horizontal",
    "char": "M2 3v18 M 6 3 h 12 v 18 h -12 Z M22 3v18",
    "category": "ui",
    "tags": "carousel pictures images scroll swipe album portfolio"
  },
  {
    "id": "gallery-thumbnails",
    "char": "M 3 3 h 18 v 14 h -18 Z M4 21h1 M9 21h1 M14 21h1 M19 21h1",
    "category": "ui",
    "tags": "carousel pictures images album portfolio preview"
  },
  {
    "id": "gallery-vertical-end",
    "char": "M7 2h10 M5 6h14 M 3 10 h 18 v 12 h -18 Z",
    "category": "ui",
    "tags": "carousel pictures images scroll swipe album portfolio history versions backup time machine"
  },
  {
    "id": "gallery-vertical",
    "char": "M3 2h18 M 3 6 h 18 v 12 h -18 Z M3 22h18",
    "category": "ui",
    "tags": "carousel pictures images scroll swipe album portfolio"
  },
  {
    "id": "gamepad-2",
    "char": "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",
    "category": "ui",
    "tags": "console"
  },
  {
    "id": "gamepad-directional",
    "char": "M11.146 15.854a1.207 1.207 0 0 1 1.708 0l1.56 1.56A2 2 0 0 1 15 18.828V21a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2.172a2 2 0 0 1 .586-1.414z M18.828 15a2 2 0 0 1-1.414-.586l-1.56-1.56a1.207 1.207 0 0 1 0-1.708l1.56-1.56A2 2 0 0 1 18.828 9H21a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z M6.586 14.414A2 2 0 0 1 5.172 15H3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2.172a2 2 0 0 1 1.414.586l1.56 1.56a1.207 1.207 0 0 1 0 1.708z M9 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2.172a2 2 0 0 1-.586 1.414l-1.56 1.56a1.207 1.207 0 0 1-1.708 0l-1.56-1.56A2 2 0 0 1 9 5.172z",
    "category": "ui",
    "tags": "direction arrow controller navigation button move pointer arrowhead console game gaming"
  },
  {
    "id": "gamepad",
    "char": "M 2 6 h 20 v 12 h -20 Z",
    "category": "ui",
    "tags": "console"
  },
  {
    "id": "gauge",
    "char": "m12 14 4-4 M3.34 19a10 10 0 1 1 17.32 0",
    "category": "ui",
    "tags": "dashboard dial meter speed pressure measure level"
  },
  {
    "id": "gavel",
    "char": "m14 13-8.381 8.38a1 1 0 0 1-3.001-3l8.384-8.381 m16 16 6-6 m21.5 10.5-8-8 m8 8 6-6 m8.5 7.5 8 8",
    "category": "ui",
    "tags": "justice law court judgment legal hands penalty decision authority hammer mallet"
  },
  {
    "id": "gem",
    "char": "M10.5 3 8 9l4 13 4-13-2.5-6 M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z M2 9h20",
    "category": "ui",
    "tags": "diamond crystal ruby jewellery price special present gift ring wedding proposal marriage rubygems"
  },
  {
    "id": "georgian-lari",
    "char": "M11.5 21a7.5 7.5 0 1 1 7.35-9 M13 12V3 M4 21h16 M9 12V3",
    "category": "ui",
    "tags": "currency money payment"
  },
  {
    "id": "ghost",
    "char": "M9 10h.01 M15 10h.01 M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z",
    "category": "ui",
    "tags": "pac-man spooky"
  },
  {
    "id": "gift",
    "char": "M12 7v14 M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8 M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5 M 3 7 h 18 v 4 h -18 Z",
    "category": "ui",
    "tags": "present box birthday party"
  },
  {
    "id": "git-branch-minus",
    "char": "M15 6a9 9 0 0 0-9 9V3 M21 18h-6 M 18, 6 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 6, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "code version control vcs repository delete remove -"
  },
  {
    "id": "git-branch-plus",
    "char": "M6 3v12 M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M15 6a9 9 0 0 0-9 9 M18 15v6 M21 18h-6",
    "category": "ui",
    "tags": "code version control vcs repository add create +"
  },
  {
    "id": "git-branch",
    "char": "M15 6a9 9 0 0 0-9 9V3 M 18, 6 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 6, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "code version control vcs repository"
  },
  {
    "id": "git-commit-horizontal",
    "char": "M 12, 12 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "code version control waypoint stop station"
  },
  {
    "id": "git-commit-vertical",
    "char": "M12 3v6 M 12, 12 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M12 15v6",
    "category": "ui",
    "tags": "code version control waypoint stop station"
  },
  {
    "id": "git-compare-arrows",
    "char": "M 5, 6 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M12 6h5a2 2 0 0 1 2 2v7 m15 9-3-3 3-3 M 19, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M12 18H7a2 2 0 0 1-2-2V9 m9 15 3 3-3 3",
    "category": "arrows",
    "tags": "code version control diff"
  },
  {
    "id": "git-compare",
    "char": "M 18, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 6, 6 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M13 6h3a2 2 0 0 1 2 2v7 M11 18H8a2 2 0 0 1-2-2V9",
    "category": "ui",
    "tags": "code version control diff"
  },
  {
    "id": "git-fork",
    "char": "M 12, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 6, 6 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 18, 6 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9 M12 12v3",
    "category": "ui",
    "tags": "code version control"
  },
  {
    "id": "git-graph",
    "char": "M 5, 6 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M5 9v6 M 5, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M12 3v18 M 19, 6 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M16 15.7A9 9 0 0 0 19 9",
    "category": "ui",
    "tags": "code version control commit graph commits gitlens"
  },
  {
    "id": "git-merge-conflict",
    "char": "M12 6h4a2 2 0 0 1 2 2v7 M6 12v9 M9 3 3 9 M9 9 3 3 M 18, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "code version control commits diff error conflict"
  },
  {
    "id": "git-merge",
    "char": "M 18, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 6, 6 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M6 21V9a9 9 0 0 0 9 9",
    "category": "ui",
    "tags": "code version control"
  },
  {
    "id": "git-pull-request-arrow",
    "char": "M 5, 6 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M5 9v12 M 19, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 m15 9-3-3 3-3 M12 6h5a2 2 0 0 1 2 2v7",
    "category": "arrows",
    "tags": "code version control open"
  },
  {
    "id": "git-pull-request-closed",
    "char": "M 6, 6 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M6 9v12 m21 3-6 6 m21 9-6-6 M18 11.5V15 M 18, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "code version control rejected closed cancelled x"
  },
  {
    "id": "git-pull-request-create-arrow",
    "char": "M 5, 6 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M5 9v12 m15 9-3-3 3-3 M12 6h5a2 2 0 0 1 2 2v3 M19 15v6 M22 18h-6",
    "category": "arrows",
    "tags": "code version control open plus add +"
  },
  {
    "id": "git-pull-request-create",
    "char": "M 6, 6 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M6 9v12 M13 6h3a2 2 0 0 1 2 2v3 M18 15v6 M21 18h-6",
    "category": "ui",
    "tags": "code version control open plus add +"
  },
  {
    "id": "git-pull-request-draft",
    "char": "M 18, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 6, 6 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M18 6V5 M18 11v-1",
    "category": "ui",
    "tags": "code version control open draft dashed"
  },
  {
    "id": "git-pull-request",
    "char": "M 18, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 6, 6 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M13 6h3a2 2 0 0 1 2 2v7",
    "category": "ui",
    "tags": "code version control open"
  },
  {
    "id": "github",
    "char": "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4 M9 18c-4.51 2-5-2-7-2",
    "category": "ui",
    "tags": "logo version control"
  },
  {
    "id": "gitlab",
    "char": "m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z",
    "category": "ui",
    "tags": "logo version control"
  },
  {
    "id": "glass-water",
    "char": "M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 20.21A2 2 0 0 1 15.2 22H8.8a2 2 0 0 1-2-1.79z M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0",
    "category": "ui",
    "tags": "beverage drink glass water"
  },
  {
    "id": "glasses",
    "char": "M 6, 15 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0 M 18, 15 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0 M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2 M2.5 13 5 7c.7-1.3 1.4-2 3-2 M21.5 13 19 7c-.7-1.3-1.5-2-3-2",
    "category": "ui",
    "tags": "glasses spectacles"
  },
  {
    "id": "globe-lock",
    "char": "M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13 M2 12h8.5 M20 6V4a2 2 0 1 0-4 0v2 M 14 6 h 8 v 5 h -8 Z",
    "category": "ui",
    "tags": "vpn private privacy network world browser security encryption protection connection"
  },
  {
    "id": "globe-off",
    "char": "M10.114 4.462A14.5 14.5 0 0 1 12 2a10 10 0 0 1 9.313 13.643 M15.557 15.556A14.5 14.5 0 0 1 12 22 10 10 0 0 1 4.929 4.929 M15.892 10.234A14.5 14.5 0 0 0 12 2a10 10 0 0 0-3.643.687 M17.656 12H22 M19.071 19.071A10 10 0 0 1 12 22 14.5 14.5 0 0 1 8.44 8.45 M2 12h10 m2 2 20 20",
    "category": "ui",
    "tags": "globe earth planet disable mute off hide avoid world browser language translate internet offline disconnected network connection no connection network failure signal off"
  },
  {
    "id": "globe-x",
    "char": "m16 3 5 5 M2 12h20A10 10 0 1 1 12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 4-10 m21 3-5 5",
    "category": "ui",
    "tags": "globe internet offline disconnected network connection world no connection network failure signal off"
  },
  {
    "id": "globe",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20 M2 12h20",
    "category": "ui",
    "tags": "world browser language translate"
  },
  {
    "id": "goal",
    "char": "M12 13V2l8 4-8 4 M20.561 10.222a9 9 0 1 1-12.55-5.29 M8.002 9.997a5 5 0 1 0 8.9 2.02",
    "category": "ui",
    "tags": "flag bullseye"
  },
  {
    "id": "gpu",
    "char": "M2 21V3 M2 5h18a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2.26 M7 17v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3 M 16, 11 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 8, 11 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "processor cores technology computer chip circuit specs graphics processing unit video card display adapter gddr rendering digital image processing crypto mining"
  },
  {
    "id": "graduation-cap",
    "char": "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z M22 10v6 M6 12.5V16a6 3 0 0 0 12 0v-3.5",
    "category": "ui",
    "tags": "school university learn study mortarboard education ceremony academic hat diploma bachlor's master's doctorate"
  },
  {
    "id": "grape",
    "char": "M22 5V2l-5.89 5.89 M 16.6, 15.89 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 8.11, 7.4 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 12.35, 11.65 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 13.91, 5.85 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 18.15, 10.09 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 6.56, 13.2 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 10.8, 17.44 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 5, 19 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "fruit wine food"
  },
  {
    "id": "grid-2x2-check",
    "char": "M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3 m16 19 2 2 4-4",
    "category": "ui",
    "tags": "table rows columns blocks plot land geometry measure data size width height distance surface area square meter acre"
  },
  {
    "id": "grid-2x2-plus",
    "char": "M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3 M16 19h6 M19 22v-6",
    "category": "ui",
    "tags": "table rows columns blocks plot land geometry measure data size width height distance surface area square meter acre"
  },
  {
    "id": "grid-2x2-x",
    "char": "M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3 m16 16 5 5 m16 21 5-5",
    "category": "ui",
    "tags": "table rows columns data blocks plot land geometry measure size width height distance surface area square meter acre"
  },
  {
    "id": "grid-2x2",
    "char": "M12 3v18 M3 12h18 M 3 3 h 18 v 18 h -18 Z",
    "category": "ui",
    "tags": "table rows columns blocks plot land geometry measure size width height distance surface area square meter acre window skylight"
  },
  {
    "id": "grid-3x2",
    "char": "M15 3v18 M3 12h18 M9 3v18 M 3 3 h 18 v 18 h -18 Z",
    "category": "ui",
    "tags": "table rows columns blocks plot land geometry measure size width height distance surface area square meter acre window"
  },
  {
    "id": "grid-3x3",
    "char": "M 3 3 h 18 v 18 h -18 Z M3 9h18 M3 15h18 M9 3v18 M15 3v18",
    "category": "ui",
    "tags": "table rows columns"
  },
  {
    "id": "grip-horizontal",
    "char": "M 12, 9 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 19, 9 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 5, 9 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 12, 15 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 19, 15 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 5, 15 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0",
    "category": "ui",
    "tags": "grab dots handle move drag"
  },
  {
    "id": "grip-vertical",
    "char": "M 9, 12 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 9, 5 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 9, 19 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 15, 12 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 15, 5 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 15, 19 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0",
    "category": "ui",
    "tags": "grab dots handle move drag"
  },
  {
    "id": "grip",
    "char": "M 12, 5 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 19, 5 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 5, 5 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 12, 12 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 19, 12 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 5, 12 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 12, 19 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 19, 19 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 5, 19 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0",
    "category": "ui",
    "tags": "grab dots handle move drag"
  },
  {
    "id": "group",
    "char": "M3 7V5c0-1.1.9-2 2-2h2 M17 3h2c1.1 0 2 .9 2 2v2 M21 17v2c0 1.1-.9 2-2 2h-2 M7 21H5c-1.1 0-2-.9-2-2v-2 M 7 7 h 7 v 5 h -7 Z M 10 12 h 7 v 5 h -7 Z",
    "category": "ui",
    "tags": "cubes packages parts units collection cluster gather dashed"
  },
  {
    "id": "guitar",
    "char": "m11.9 12.1 4.514-4.514 M20.1 2.3a1 1 0 0 0-1.4 0l-1.114 1.114A2 2 0 0 0 17 4.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 17.828 7h1.344a2 2 0 0 0 1.414-.586L21.7 5.3a1 1 0 0 0 0-1.4z m6 16 2 2 M8.23 9.85A3 3 0 0 1 11 8a5 5 0 0 1 5 5 3 3 0 0 1-1.85 2.77l-.92.38A2 2 0 0 0 12 18a4 4 0 0 1-4 4 6 6 0 0 1-6-6 4 4 0 0 1 4-4 2 2 0 0 0 1.85-1.23z",
    "category": "ui",
    "tags": "acoustic instrument strings riff rock band country concert performance play lead loud music audio sound noise"
  },
  {
    "id": "ham",
    "char": "M13.144 21.144A7.274 10.445 45 1 0 2.856 10.856 M13.144 21.144A7.274 4.365 45 0 0 2.856 10.856a7.274 4.365 45 0 0 10.288 10.288 M16.565 10.435 18.6 8.4a2.501 2.501 0 1 0 1.65-4.65 2.5 2.5 0 1 0-4.66 1.66l-2.024 2.025 m8.5 16.5-1-1",
    "category": "ui",
    "tags": "food pork pig meat bone hock knuckle gammon cured"
  },
  {
    "id": "hamburger",
    "char": "M12 16H4a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4h-4.25 M5 12a2 2 0 0 1-2-2 9 7 0 0 1 18 0 2 2 0 0 1-2 2 M5 16a2 2 0 0 0-2 2 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 2 2 0 0 0-2-2q0 0 0 0 m6.67 12 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2",
    "category": "ui",
    "tags": "burger cheeseburger meat beef patty bun fast food junk food takeaway takeout snack dish restaurant lunch meal savory savoury cookery cooking grilled barbecue barbeque bbq lettuce tomato relish pickles onions ketchup mustard mayonnaise"
  },
  {
    "id": "hammer",
    "char": "m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9 m18 15 4-4 m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5",
    "category": "ui",
    "tags": "mallet nails diy toolbox build construction"
  },
  {
    "id": "hand-coins",
    "char": "M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17 m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9 m2 16 6 6 M 16, 9 m -2.9, 0 a 2.9,2.9 0 1,0 5.8,0 a 2.9,2.9 0 1,0 -5.8,0 M 6, 5 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "savings banking money finance offers mortgage payment received wage payroll allowance pocket money handout pennies"
  },
  {
    "id": "hand-fist",
    "char": "M12.035 17.012a3 3 0 0 0-3-3l-.311-.002a.72.72 0 0 1-.505-1.229l1.195-1.195A2 2 0 0 1 10.828 11H12a2 2 0 0 0 0-4H9.243a3 3 0 0 0-2.122.879l-2.707 2.707A4.83 4.83 0 0 0 3 14a8 8 0 0 0 8 8h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v2a2 2 0 1 0 4 0 M13.888 9.662A2 2 0 0 0 17 8V5A2 2 0 1 0 13 5 M9 5A2 2 0 1 0 5 5V10 M9 7V4A2 2 0 1 1 13 4V7.268",
    "category": "ui",
    "tags": "clench strength power unity solidarity rebellion victory triumph support fight combat brawl"
  },
  {
    "id": "hand-grab",
    "char": "M18 11.5V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4 M14 10V8a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2 M10 9.9V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5 M6 14a2 2 0 0 0-2-2a2 2 0 0 0-2 2 M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0",
    "category": "ui",
    "tags": "hand"
  },
  {
    "id": "hand-heart",
    "char": "M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16 m14.45 13.39 5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 0 0-4.797-1.837.276.276 0 0 1-.406 0A2.75 2.75 0 0 0 11 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95 m2 15 6 6 m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 0 0-2.75-2.91",
    "category": "ui",
    "tags": "love like emotion"
  },
  {
    "id": "hand-helping",
    "char": "M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14 m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9 m2 13 6 6",
    "category": "ui",
    "tags": "agreement help proposal charity begging terms"
  },
  {
    "id": "hand-metal",
    "char": "M18 12.5V10a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4 M14 11V9a2 2 0 1 0-4 0v2 M10 10.5V5a2 2 0 1 0-4 0v9 m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5",
    "category": "ui",
    "tags": "rock"
  },
  {
    "id": "hand-platter",
    "char": "M12 3V2 m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5 M2 14h12a2 2 0 0 1 0 4h-2 M4 10h16 M5 10a7 7 0 0 1 14 0 M5 14v6a1 1 0 0 1-1 1H2",
    "category": "ui",
    "tags": "waiter waitress restaurant table service served dinner dining meal course luxury"
  },
  {
    "id": "hand",
    "char": "M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2 M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2 M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8 M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",
    "category": "ui",
    "tags": "wave move mouse grab"
  },
  {
    "id": "handbag",
    "char": "M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z M8 11V6a4 4 0 0 1 8 0v5",
    "category": "ui",
    "tags": "bag baggage carry clutch fashion luggage purse tote travel"
  },
  {
    "id": "handshake",
    "char": "m11 17 2 2a1 1 0 1 0 3-3 m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4 m21 3 1 11h-2 M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3 M3 4h8",
    "category": "ui",
    "tags": "agreement partnership deal business assistance cooperation friendship union terms"
  },
  {
    "id": "hard-drive-download",
    "char": "M12 2v8 m16 6-4 4-4-4 M 2 14 h 20 v 8 h -20 Z M6 18h.01 M10 18h.01",
    "category": "files",
    "tags": "computer server memory data ssd disk hard disk save"
  },
  {
    "id": "hard-drive-upload",
    "char": "m16 6-4-4-4 4 M12 2v8 M 2 14 h 20 v 8 h -20 Z M6 18h.01 M10 18h.01",
    "category": "files",
    "tags": "computer server memory data ssd disk hard disk save"
  },
  {
    "id": "hard-drive",
    "char": "M10 16h.01 M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z M21.946 12.013H2.054 M6 16h.01",
    "category": "files",
    "tags": "computer server memory data ssd disk hard disk storage hardware backup media"
  },
  {
    "id": "hard-hat",
    "char": "M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5 M14 6a6 6 0 0 1 6 6v3 M4 15v-3a6 6 0 0 1 6-6 M 2 15 h 20 v 4 h -20 Z",
    "category": "ui",
    "tags": "helmet construction safety savety"
  },
  {
    "id": "hash",
    "char": "",
    "category": "ui",
    "tags": "hashtag number pound"
  },
  {
    "id": "hat-glasses",
    "char": "M14 18a2 2 0 0 0-4 0 m19 11-2.11-6.657a2 2 0 0 0-2.752-1.148l-1.276.61A2 2 0 0 1 12 4H8.5a2 2 0 0 0-1.925 1.456L5 11 M2 11h20 M 17, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 7, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "incognito disguise costume masked anonymous anonymity privacy private browsing stealth hidden undercover cloak invisible ghost spy agent detective identity cap fedora spectacles shades sunglasses eyewear"
  },
  {
    "id": "haze",
    "char": "m5.2 6.2 1.4 1.4 M2 13h2 M20 13h2 m17.4 7.6 1.4-1.4 M22 17H2 M22 21H2 M16 13a4 4 0 0 0-8 0 M12 5V2.5",
    "category": "ui",
    "tags": "mist fog"
  },
  {
    "id": "hd",
    "char": "M10 12H6 M10 15V9 M14 14.5a.5.5 0 0 0 .5.5h1a2.5 2.5 0 0 0 2.5-2.5v-1A2.5 2.5 0 0 0 15.5 9h-1a.5.5 0 0 0-.5.5z M6 15V9 M 2 5 h 20 v 14 h -20 Z",
    "category": "ui",
    "tags": "tv resolution video high definition 720p 1080p"
  },
  {
    "id": "hdmi-port",
    "char": "M22 9a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1l2 2h12l2-2h1a1 1 0 0 0 1-1Z M7.5 12h9",
    "category": "ui",
    "tags": "socket plug slot controller connector interface console signal audio video visual av data input output"
  },
  {
    "id": "heading-1",
    "char": "M4 12h8 M4 18V6 M12 18V6 m17 12 3-2v8",
    "category": "ui",
    "tags": "h1 html markup markdown"
  },
  {
    "id": "heading-2",
    "char": "M4 12h8 M4 18V6 M12 18V6 M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1",
    "category": "ui",
    "tags": "h2 html markup markdown"
  },
  {
    "id": "heading-3",
    "char": "M4 12h8 M4 18V6 M12 18V6 M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2 M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2",
    "category": "ui",
    "tags": "h3 html markup markdown"
  },
  {
    "id": "heading-4",
    "char": "M12 18V6 M17 10v3a1 1 0 0 0 1 1h3 M21 10v8 M4 12h8 M4 18V6",
    "category": "ui",
    "tags": "h4 html markup markdown"
  },
  {
    "id": "heading-5",
    "char": "M4 12h8 M4 18V6 M12 18V6 M17 13v-3h4 M17 17.7c.4.2.8.3 1.3.3 1.5 0 2.7-1.1 2.7-2.5S19.8 13 18.3 13H17",
    "category": "ui",
    "tags": "h5 html markup markdown"
  },
  {
    "id": "heading-6",
    "char": "M4 12h8 M4 18V6 M12 18V6 M 19, 16 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M20 10c-2 2-3 3.5-3 6",
    "category": "ui",
    "tags": "h6 html markup markdown"
  },
  {
    "id": "heading",
    "char": "M6 12h12 M6 20V4 M18 20V4",
    "category": "ui",
    "tags": "h1 html markup markdown"
  },
  {
    "id": "headphone-off",
    "char": "M21 14h-1.343 M9.128 3.47A9 9 0 0 1 21 12v3.343 m2 2 20 20 M20.414 20.414A2 2 0 0 1 19 21h-1a2 2 0 0 1-2-2v-3 M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 2.636-6.364",
    "category": "communication",
    "tags": "music audio sound mute off"
  },
  {
    "id": "headphones",
    "char": "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
    "category": "communication",
    "tags": "music audio sound"
  },
  {
    "id": "headset",
    "char": "M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z M21 16v2a4 4 0 0 1-4 4h-5",
    "category": "ui",
    "tags": "music audio sound gaming headphones headset call center phone telephone voip video"
  },
  {
    "id": "heart-crack",
    "char": "M12.409 5.824c-.702.792-1.15 1.496-1.415 2.166l2.153 2.156a.5.5 0 0 1 0 .707l-2.293 2.293a.5.5 0 0 0 0 .707L12 15 M13.508 20.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.677.6.6 0 0 0 .818.001A5.5 5.5 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5z",
    "category": "ui",
    "tags": "heartbreak sadness emotion"
  },
  {
    "id": "heart-handshake",
    "char": "M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762",
    "category": "ui",
    "tags": "agreement charity help deal terms emotion together handshake"
  },
  {
    "id": "heart-minus",
    "char": "m14.876 18.99-1.368 1.323a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.244 1.572 M15 15h6",
    "category": "ui",
    "tags": "unlike unfavorite remove damage ui & ux"
  },
  {
    "id": "heart-off",
    "char": "M10.5 4.893a5.5 5.5 0 0 1 1.091.931.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 1.872-1.002 3.356-2.187 4.655 m16.967 16.967-3.459 3.346a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 2.747-4.761 m2 2 20 20",
    "category": "ui",
    "tags": "unlike dislike hate emotion"
  },
  {
    "id": "heart-plus",
    "char": "m14.479 19.374-.971.939a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.219 1.49 M15 15h6 M18 12v6",
    "category": "ui",
    "tags": "plus like favorite add health support"
  },
  {
    "id": "heart-pulse",
    "char": "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5 M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27",
    "category": "ui",
    "tags": "heartbeat pulse health medical blood pressure cardiac systole diastole"
  },
  {
    "id": "heart",
    "char": "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
    "category": "ui",
    "tags": "like love emotion suit playing cards"
  },
  {
    "id": "heater",
    "char": "M11 8c2-3-2-3 0-6 M15.5 8c2-3-2-3 0-6 M6 10h.01 M6 14h.01 M10 16v-4 M14 16v-4 M18 16v-4 M20 6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3 M5 20v2 M19 20v2",
    "category": "ui",
    "tags": "heating warmth comfort fire stove electric electronics amenities"
  },
  {
    "id": "helicopter",
    "char": "M11 17v4 M14 3v8a2 2 0 0 0 2 2h5.865 M17 17v4 M18 17a4 4 0 0 0 4-4 8 6 0 0 0-8-6 6 5 0 0 0-6 5v3a2 2 0 0 0 2 2z M2 10v5 M6 3h16 M7 21h14 M8 13H2",
    "category": "ui",
    "tags": "transport flying rotor aviation helipad gear flyer technology helicopter aircraft vehicle"
  },
  {
    "id": "hexagon",
    "char": "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
    "category": "ui",
    "tags": "shape node.js logo"
  },
  {
    "id": "highlighter",
    "char": "m9 11-6 6v3h9l3-3 m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4",
    "category": "ui",
    "tags": "mark text"
  },
  {
    "id": "history",
    "char": "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8 M3 3v5h5 M12 7v5l4 2",
    "category": "ui",
    "tags": "time redo undo rewind timeline version time machine backup rotate ccw"
  },
  {
    "id": "hop-off",
    "char": "M10.82 16.12c1.69.6 3.91.79 5.18.85.28.01.53-.09.7-.27 M11.14 20.57c.52.24 2.44 1.12 4.08 1.37.46.06.86-.25.9-.71.12-1.52-.3-3.43-.5-4.28 M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .7-.26 M17.99 5.52a20.83 20.83 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-1.17.1-2.5.02-3.9-.25 M20.57 11.14c.24.52 1.12 2.44 1.37 4.08.04.3-.08.59-.31.75 M4.93 4.93a10 10 0 0 0-.67 13.4c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.85.85 0 0 0 .48-.24 M5.52 17.99c1.05.95 2.91 2.42 4.5 3.15a.8.8 0 0 0 1.13-.68c.2-2.34-.33-5.3-1.57-8.28 M8.35 2.68a10 10 0 0 1 9.98 1.58c.43.35.4.96-.12 1.17-1.5.6-4.3.98-6.07 1.05 m2 2 20 20",
    "category": "ui",
    "tags": "beer brewery drink hop free allergy intolerance diet"
  },
  {
    "id": "hop",
    "char": "M10.82 16.12c1.69.6 3.91.79 5.18.85.55.03 1-.42.97-.97-.06-1.27-.26-3.5-.85-5.18 M11.5 6.5c1.64 0 5-.38 6.71-1.07.52-.2.55-.82.12-1.17A10 10 0 0 0 4.26 18.33c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.88.88 0 0 0 .73-.74c.3-2.14-.15-3.5-.61-4.88 M15.62 16.95c.2.85.62 2.76.5 4.28a.77.77 0 0 1-.9.7 16.64 16.64 0 0 1-4.08-1.36 M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .96-.96 17.68 17.68 0 0 0-.9-4.87 M16.94 15.62c.86.2 2.77.62 4.29.5a.77.77 0 0 0 .7-.9 16.64 16.64 0 0 0-1.36-4.08 M17.99 5.52a20.82 20.82 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-2.33.2-5.3-.32-8.27-1.57 M4.93 4.93 3 3a.7.7 0 0 1 0-1 M9.58 12.18c1.24 2.98 1.77 5.95 1.57 8.28a.8.8 0 0 1-1.13.68 20.82 20.82 0 0 1-4.5-3.15",
    "category": "ui",
    "tags": "beer brewery drink"
  },
  {
    "id": "hospital",
    "char": "M12 7v4 M14 21v-3a2 2 0 0 0-4 0v3 M14 9h-4 M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2 M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16",
    "category": "ui",
    "tags": "infirmary sanatorium healthcare doctor hospice clinic emergency room ward building medical vet"
  },
  {
    "id": "hotel",
    "char": "M10 22v-6.57 M12 11h.01 M12 7h.01 M14 15.43V22 M15 16a5 5 0 0 0-6 0 M16 11h.01 M16 7h.01 M8 11h.01 M8 7h.01 M 4 2 h 16 v 20 h -16 Z",
    "category": "ui",
    "tags": "building hostel motel inn"
  },
  {
    "id": "hourglass",
    "char": "M5 22h14 M5 2h14 M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22 M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2",
    "category": "ui",
    "tags": "timer time sandglass"
  },
  {
    "id": "house-heart",
    "char": "M8.62 13.8A2.25 2.25 0 1 1 12 10.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    "category": "ui",
    "tags": "home sweet home abode building residence healthy living lifestyle"
  },
  {
    "id": "house-plug",
    "char": "M10 12V8.964 M14 12V8.964 M15 12a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2a1 1 0 0 1 1-1z M8.5 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-2",
    "category": "ui",
    "tags": "home living building residence architecture autarky energy"
  },
  {
    "id": "house-plus",
    "char": "M12.35 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v2.35 M14.8 12.4A1 1 0 0 0 14 12h-4a1 1 0 0 0-1 1v8 M15 18h6 M18 15v6",
    "category": "ui",
    "tags": "home living medical new addition building residence architecture"
  },
  {
    "id": "house-wifi",
    "char": "M9.5 13.866a4 4 0 0 1 5 .01 M12 17h.01 M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M7 10.754a8 8 0 0 1 10 0",
    "category": "ui",
    "tags": "home living building wifi connectivity"
  },
  {
    "id": "house",
    "char": "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8 M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    "category": "ui",
    "tags": "home living building residence architecture"
  },
  {
    "id": "ice-cream-bowl",
    "char": "M12 17c5 0 8-2.69 8-6H4c0 3.31 3 6 8 6m-4 4h8m-4-3v3M5.14 11a3.5 3.5 0 1 1 6.71 0 M12.14 11a3.5 3.5 0 1 1 6.71 0 M15.5 6.5a3.5 3.5 0 1 0-7 0",
    "category": "ui",
    "tags": "gelato food dessert dish restaurant course meal"
  },
  {
    "id": "ice-cream-cone",
    "char": "m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11 M17 7A5 5 0 0 0 7 7 M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4",
    "category": "ui",
    "tags": "gelato food"
  },
  {
    "id": "id-card-lanyard",
    "char": "M13.5 8h-3 m15 2-1 2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3 M16.899 22A5 5 0 0 0 7.1 22 m9 2 3 6 M 12, 15 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "id-card id-card-lanyard identity employee gate-pass badge"
  },
  {
    "id": "id-card",
    "char": "M16 10h2 M16 14h2 M6.17 15a3 3 0 0 1 5.66 0 M 9, 11 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 2 5 h 20 v 14 h -20 Z",
    "category": "ui",
    "tags": "card badge identity authentication secure"
  },
  {
    "id": "image-down",
    "char": "M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21 m14 19 3 3v-5.5 m17 22 3-3 M 9, 9 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "media",
    "tags": "picture photo download save export"
  },
  {
    "id": "image-minus",
    "char": "M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7 M 9, 9 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
    "category": "media",
    "tags": "remove delete"
  },
  {
    "id": "image-off",
    "char": "M10.41 10.41a2 2 0 1 1-2.83-2.83 M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59 M21 15V5a2 2 0 0 0-2-2H9",
    "category": "media",
    "tags": "picture photo"
  },
  {
    "id": "image-play",
    "char": "M15 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z M21 12.17V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6 m6 21 5-5 M 9, 9 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "media",
    "tags": "picture gif photo"
  },
  {
    "id": "image-plus",
    "char": "M16 5h6 M19 2v6 M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5 m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21 M 9, 9 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "add create picture"
  },
  {
    "id": "image-up",
    "char": "M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21 m14 19.5 3-3 3 3 M17 22v-5.5 M 9, 9 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "media",
    "tags": "picture photo upload import"
  },
  {
    "id": "image-upscale",
    "char": "M16 3h5v5 M17 21h2a2 2 0 0 0 2-2 M21 12v3 m21 3-5 5 M3 7V5a2 2 0 0 1 2-2 m5 21 4.144-4.144a1.21 1.21 0 0 1 1.712 0L13 19 M9 3h3 M 3 11 h 10 v 10 h -10 Z",
    "category": "media",
    "tags": "resize picture sharpen increase"
  },
  {
    "id": "image",
    "char": "M 3 3 h 18 v 18 h -18 Z M 9, 9 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
    "category": "media",
    "tags": "picture photo"
  },
  {
    "id": "images",
    "char": "m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16 M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2 M 13, 7 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 8 2 h 14 v 14 h -14 Z",
    "category": "media",
    "tags": "picture photo multiple copy gallery album collection slideshow showcase"
  },
  {
    "id": "import",
    "char": "M12 3v12 m8 11 4 4 4-4 M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4",
    "category": "ui",
    "tags": "save"
  },
  {
    "id": "inbox",
    "char": "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
    "category": "ui",
    "tags": "email"
  },
  {
    "id": "indian-rupee",
    "char": "M6 3h12 M6 8h12 m6 13 8.5 8 M6 13h3 M9 13c6.667 0 6.667-10 0-10",
    "category": "ui",
    "tags": "currency money payment"
  },
  {
    "id": "infinity",
    "char": "M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8",
    "category": "ui",
    "tags": "unlimited forever loop math"
  },
  {
    "id": "info",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M12 16v-4 M12 8h.01",
    "category": "ui",
    "tags": "about advice clue details help hint indicator information knowledge notice status support tooltip"
  },
  {
    "id": "inspection-panel",
    "char": "M 3 3 h 18 v 18 h -18 Z M7 7h.01 M17 7h.01 M7 17h.01 M17 17h.01",
    "category": "ui",
    "tags": "access cover tile metal materials screws"
  },
  {
    "id": "instagram",
    "char": "M 2 2 h 20 v 20 h -20 Z M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",
    "category": "ui",
    "tags": "logo camera social"
  },
  {
    "id": "italic",
    "char": "",
    "category": "ui",
    "tags": "oblique text format"
  },
  {
    "id": "iteration-ccw",
    "char": "m16 14 4 4-4 4 M20 10a8 8 0 1 0-8 8h8",
    "category": "ui",
    "tags": "arrow right"
  },
  {
    "id": "iteration-cw",
    "char": "M4 10a8 8 0 1 1 8 8H4 m8 22-4-4 4-4",
    "category": "ui",
    "tags": "arrow left"
  },
  {
    "id": "japanese-yen",
    "char": "M12 9.5V21m0-11.5L6 3m6 6.5L18 3 M6 15h12 M6 11h12",
    "category": "ui",
    "tags": "currency money payment"
  },
  {
    "id": "joystick",
    "char": "M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z M6 15v-2 M12 15V9 M 12, 6 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "game console control stick"
  },
  {
    "id": "kanban",
    "char": "M5 3v14 M12 3v8 M19 3v18",
    "category": "ui",
    "tags": "projects manage overview board tickets issues roadmap plan intentions productivity work agile code coding"
  },
  {
    "id": "kayak",
    "char": "M18 17a1 1 0 0 0-1 1v1a2 2 0 1 0 2-2z M20.97 3.61a.45.45 0 0 0-.58-.58C10.2 6.6 6.6 10.2 3.03 20.39a.45.45 0 0 0 .58.58C13.8 17.4 17.4 13.8 20.97 3.61 m6.707 6.707 10.586 10.586 M7 5a2 2 0 1 0-2 2h1a1 1 0 0 0 1-1z",
    "category": "ui",
    "tags": "kayak boat paddle water sport recreation adventure outdoors equipment lake ocean"
  },
  {
    "id": "key-round",
    "char": "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z M 16.5, 7.5 m -.5, 0 a .5,.5 0 1,0 1,0 a .5,.5 0 1,0 -1,0",
    "category": "ui",
    "tags": "password login authentication secure unlock"
  },
  {
    "id": "key-square",
    "char": "M12.4 2.7a2.5 2.5 0 0 1 3.4 0l5.5 5.5a2.5 2.5 0 0 1 0 3.4l-3.7 3.7a2.5 2.5 0 0 1-3.4 0L8.7 9.8a2.5 2.5 0 0 1 0-3.4z m14 7 3 3 m9.4 10.6-6.814 6.814A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814",
    "category": "ui",
    "tags": "password login authentication secure unlock car key"
  },
  {
    "id": "key",
    "char": "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4 m21 2-9.6 9.6 M 7.5, 15.5 m -5.5, 0 a 5.5,5.5 0 1,0 11,0 a 5.5,5.5 0 1,0 -11,0",
    "category": "ui",
    "tags": "password login authentication secure unlock keychain key ring fob"
  },
  {
    "id": "keyboard-music",
    "char": "M 2 4 h 20 v 16 h -20 Z M6 8h4 M14 8h.01 M18 8h.01 M2 12h20 M6 12v4 M10 12v4 M14 12v4 M18 12v4",
    "category": "media",
    "tags": "music audio sound noise notes keys chord octave midi controller instrument electric signal digital studio production producer pianist piano play performance concert"
  },
  {
    "id": "keyboard-off",
    "char": "M 20 4 A2 2 0 0 1 22 6 M 22 6 L 22 16.41 M 7 16 L 16 16 M 9.69 4 L 20 4 M14 8h.01 M18 8h.01 m2 2 20 20 M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2 M6 8h.01 M8 12h.01",
    "category": "ui",
    "tags": "unkeys layout spell settings mouse"
  },
  {
    "id": "keyboard",
    "char": "M10 8h.01 M12 12h.01 M14 8h.01 M16 12h.01 M18 8h.01 M6 8h.01 M7 16h10 M8 12h.01 M 2 4 h 20 v 16 h -20 Z",
    "category": "ui",
    "tags": "layout spell settings mouse"
  },
  {
    "id": "lamp-ceiling",
    "char": "M12 2v5 M14.829 15.998a3 3 0 1 1-5.658 0 M20.92 14.606A1 1 0 0 1 20 16H4a1 1 0 0 1-.92-1.394l3-7A1 1 0 0 1 7 7h10a1 1 0 0 1 .92.606z",
    "category": "ui",
    "tags": "lighting household home furniture"
  },
  {
    "id": "lamp-desk",
    "char": "M10.293 2.293a1 1 0 0 1 1.414 0l2.5 2.5 5.994 1.227a1 1 0 0 1 .506 1.687l-7 7a1 1 0 0 1-1.687-.506l-1.227-5.994-2.5-2.5a1 1 0 0 1 0-1.414z m14.207 4.793-3.414 3.414 M3 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z m9.086 6.5-4.793 4.793a1 1 0 0 0-.18 1.17L7 18",
    "category": "ui",
    "tags": "lighting household office desk home furniture"
  },
  {
    "id": "lamp-floor",
    "char": "M12 10v12 M17.929 7.629A1 1 0 0 1 17 9H7a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 9 2h6a1 1 0 0 1 .928.629z M9 22h6",
    "category": "ui",
    "tags": "lighting household floor home furniture"
  },
  {
    "id": "lamp-wall-down",
    "char": "M19.929 18.629A1 1 0 0 1 19 20H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 13h6a1 1 0 0 1 .928.629z M6 3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z M8 6h4a2 2 0 0 1 2 2v5",
    "category": "ui",
    "tags": "lighting household wall home furniture"
  },
  {
    "id": "lamp-wall-up",
    "char": "M19.929 9.629A1 1 0 0 1 19 11H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 4h6a1 1 0 0 1 .928.629z M6 15a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z M8 18h4a2 2 0 0 0 2-2v-5",
    "category": "ui",
    "tags": "lighting household wall home furniture"
  },
  {
    "id": "lamp",
    "char": "M12 12v6 M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z",
    "category": "ui",
    "tags": "lighting household home furniture"
  },
  {
    "id": "land-plot",
    "char": "m12 8 6-3-6-3v10 m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12 m6.49 12.85 11.02 6.3 M17.51 12.85 6.5 19.15",
    "category": "ui",
    "tags": "area surface square metres allotment parcel property plane acres measure distance isometric flag golf course hole"
  },
  {
    "id": "landmark",
    "char": "M10 18v-7 M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z M14 18v-7 M18 18v-7 M3 22h18 M6 18v-7",
    "category": "ui",
    "tags": "bank building capitol finance money museum art gallery hall institute pediment portico columns pillars classical architecture government institution"
  },
  {
    "id": "languages",
    "char": "m5 8 6 6 m4 14 6-6 2-3 M2 5h12 M7 2h1 m22 22-5-10-5 10 M14 18h6",
    "category": "communication",
    "tags": "translate"
  },
  {
    "id": "laptop-minimal-check",
    "char": "M2 20h20 m9 10 2 2 4-4 M 3 4 h 18 v 12 h -18 Z",
    "category": "ui",
    "tags": "computer screen remote success done todo tick complete task"
  },
  {
    "id": "laptop-minimal",
    "char": "M 3 4 h 18 v 12 h -18 Z",
    "category": "ui",
    "tags": "computer screen remote"
  },
  {
    "id": "laptop",
    "char": "M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z M20.054 15.987H3.946",
    "category": "ui",
    "tags": "computer screen remote"
  },
  {
    "id": "lasso-select",
    "char": "M7 22a5 5 0 0 1-2-4 M7 16.93c.96.43 1.96.74 2.99.91 M3.34 14A6.8 6.8 0 0 1 2 10c0-4.42 4.48-8 10-8s10 3.58 10 8a7.19 7.19 0 0 1-.33 2 M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M14.33 22h-.09a.35.35 0 0 1-.24-.32v-10a.34.34 0 0 1 .33-.34c.08 0 .15.03.21.08l7.34 6a.33.33 0 0 1-.21.59h-4.49l-2.57 3.85a.35.35 0 0 1-.28.14z",
    "category": "ui",
    "tags": "select cursor"
  },
  {
    "id": "lasso",
    "char": "M3.704 14.467a10 8 0 1 1 3.115 2.375 M7 22a5 5 0 0 1-2-3.994 M 5, 16 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "select cursor"
  },
  {
    "id": "laugh",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z",
    "category": "ui",
    "tags": "emoji face happy good emotion"
  },
  {
    "id": "layers-2",
    "char": "M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z m20 14.285 1.5.845a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74l1.5-.845",
    "category": "ui",
    "tags": "stack pile pages sheets paperwork copies copy duplicate double shortcuts"
  },
  {
    "id": "layers-plus",
    "char": "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 .83.18 2 2 0 0 0 .83-.18l8.58-3.9a1 1 0 0 0 0-1.831z M16 17h6 M19 14v6 M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 .825.178 M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l2.116-.962",
    "category": "ui",
    "tags": "stack layers add new increase create positive copy upgrade"
  },
  {
    "id": "layers",
    "char": "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12 M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
    "category": "ui",
    "tags": "stack pile pages sheets paperwork copies copy"
  },
  {
    "id": "layout-dashboard",
    "char": "M 3 3 h 7 v 9 h -7 Z M 14 3 h 7 v 5 h -7 Z M 14 12 h 7 v 9 h -7 Z M 3 16 h 7 v 5 h -7 Z",
    "category": "ui",
    "tags": "masonry brick"
  },
  {
    "id": "layout-grid",
    "char": "M 3 3 h 7 v 7 h -7 Z M 14 3 h 7 v 7 h -7 Z M 14 14 h 7 v 7 h -7 Z M 3 14 h 7 v 7 h -7 Z",
    "category": "ui",
    "tags": "app home start"
  },
  {
    "id": "layout-list",
    "char": "M 3 3 h 7 v 7 h -7 Z M 3 14 h 7 v 7 h -7 Z M14 4h7 M14 9h7 M14 15h7 M14 20h7",
    "category": "ui",
    "tags": "todo tasks items pending image photo"
  },
  {
    "id": "layout-panel-left",
    "char": "M 3 3 h 7 v 18 h -7 Z M 14 3 h 7 v 7 h -7 Z M 14 14 h 7 v 7 h -7 Z",
    "category": "ui",
    "tags": "app home start grid"
  },
  {
    "id": "layout-panel-top",
    "char": "M 3 3 h 18 v 7 h -18 Z M 3 14 h 7 v 7 h -7 Z M 14 14 h 7 v 7 h -7 Z",
    "category": "ui",
    "tags": "window webpage block section grid template structure"
  },
  {
    "id": "layout-template",
    "char": "M 3 3 h 18 v 7 h -18 Z M 3 14 h 9 v 7 h -9 Z M 16 14 h 5 v 7 h -5 Z",
    "category": "ui",
    "tags": "window webpage block section"
  },
  {
    "id": "leaf",
    "char": "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12",
    "category": "ui",
    "tags": "sustainability nature energy plant autumn"
  },
  {
    "id": "leafy-green",
    "char": "M2 22c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8 1.5 4 4 0 0 0 6.187-2.353 3.5 3.5 0 0 0 3.69-5.116A3.5 3.5 0 0 0 20.95 8 3.5 3.5 0 1 0 16 3.05a3.5 3.5 0 0 0-5.831 1.373 3.5 3.5 0 0 0-5.116 3.69 4 4 0 0 0-2.348 6.155C3.499 15.42 4.409 16.712 4.2 18.1 3.926 19.743 3.014 20.732 2 22 M2 22 17 7",
    "category": "ui",
    "tags": "salad lettuce vegetable chard cabbage bok choy"
  },
  {
    "id": "lectern",
    "char": "M16 12h3a2 2 0 0 0 1.902-1.38l1.056-3.333A1 1 0 0 0 21 6H3a1 1 0 0 0-.958 1.287l1.056 3.334A2 2 0 0 0 5 12h3 M18 6V3a1 1 0 0 0-1-1h-3 M 8 10 h 8 v 12 h -8 Z",
    "category": "ui",
    "tags": "pulpit podium stand"
  },
  {
    "id": "lens-concave",
    "char": "M7 2a1 1 0 0 0-.8 1.6 14 14 0 0 1 0 16.8A1 1 0 0 0 7 22h10a1 1 0 0 0 .8-1.6 14 14 0 0 1 0-16.8A1 1 0 0 0 17 2z",
    "category": "ui",
    "tags": "concave lens optics light magnification curved focus refraction science physics eyeglass telescope microscope"
  },
  {
    "id": "lens-convex",
    "char": "M13.433 2a1 1 0 0 1 .824.448 18 18 0 0 1 0 19.104 1 1 0 0 1-.824.448h-2.866a1 1 0 0 1-.824-.448 18 18 0 0 1 0-19.104A1 1 0 0 1 10.567 2z",
    "category": "ui",
    "tags": "convex lens optics magnification focus light refraction physics eyeglass telescope microscope curved science"
  },
  {
    "id": "library-big",
    "char": "M 3 3 h 8 v 18 h -8 Z M7 3v18 M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z",
    "category": "ui",
    "tags": "books reading written authors stories fiction novels information knowledge education high school university college academy learning study research collection vinyl records albums music package"
  },
  {
    "id": "library",
    "char": "m16 6 4 14 M12 6v14 M8 8v12 M4 4v16",
    "category": "ui",
    "tags": "books reading written authors stories fiction novels information knowledge education high school university college academy learning study research collection vinyl records albums music package"
  },
  {
    "id": "life-buoy",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 m4.93 4.93 4.24 4.24 m14.83 9.17 4.24-4.24 m14.83 14.83 4.24 4.24 m9.17 14.83-4.24 4.24 M 12, 12 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
    "category": "ui",
    "tags": "preserver life belt lifesaver help rescue ship ring raft inflatable wheel donut"
  },
  {
    "id": "ligature",
    "char": "M14 12h2v8 M14 20h4 M6 12h4 M6 20h4 M8 20V8a4 4 0 0 1 7.464-2",
    "category": "ui",
    "tags": "text font typography alternates alternatives"
  },
  {
    "id": "lightbulb-off",
    "char": "M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5 m2 2 20 20 M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5 M9 18h6 M10 22h4",
    "category": "ui",
    "tags": "lights"
  },
  {
    "id": "lightbulb",
    "char": "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5 M9 18h6 M10 22h4",
    "category": "ui",
    "tags": "idea bright lights"
  },
  {
    "id": "line-dot-right-horizontal",
    "char": "M 3 12 L 15 12 M 18, 12 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "code version control waypoint stop station last end"
  },
  {
    "id": "line-squiggle",
    "char": "M7 3.5c5-2 7 2.5 3 4C1.5 10 2 15 5 16c5 2 9-10 14-7s.5 13.5-4 12c-5-2.5.5-11 6-2",
    "category": "ui",
    "tags": "line snakes annotate curve doodle stroke pen tool gesture draw wave art road"
  },
  {
    "id": "link-2-off",
    "char": "M9 17H7A5 5 0 0 1 7 7 M15 7h2a5 5 0 0 1 4 8",
    "category": "ui",
    "tags": "unchain chain"
  },
  {
    "id": "link-2",
    "char": "M9 17H7A5 5 0 0 1 7 7h2 M15 7h2a5 5 0 1 1 0 10h-2",
    "category": "ui",
    "tags": "chain url"
  },
  {
    "id": "link",
    "char": "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71 M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
    "category": "ui",
    "tags": "chain url"
  },
  {
    "id": "linkedin",
    "char": "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M 2 9 h 4 v 12 h -4 Z M 4, 4 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "logo social media social"
  },
  {
    "id": "list-check",
    "char": "M16 5H3 M16 12H3 M11 19H3 m15 18 2 2 4-4",
    "category": "ui",
    "tags": "done check tick complete list to-do bom"
  },
  {
    "id": "list-checks",
    "char": "M13 5h8 M13 12h8 M13 19h8 m3 17 2 2 4-4 m3 7 2 2 4-4",
    "category": "ui",
    "tags": "todo done check tick complete tasks items pending"
  },
  {
    "id": "list-chevrons-down-up",
    "char": "M3 5h8 M3 12h8 M3 19h8 m15 5 3 3 3-3 m15 19 3-3 3 3",
    "category": "arrows",
    "tags": "options items collapse expand details disclosure show hide toggle accordion more less fold unfold vertical"
  },
  {
    "id": "list-chevrons-up-down",
    "char": "M3 5h8 M3 12h8 M3 19h8 m15 8 3-3 3 3 m15 16 3 3 3-3",
    "category": "arrows",
    "tags": "options items collapse expand details disclosure show hide toggle accordion more less fold unfold vertical"
  },
  {
    "id": "list-collapse",
    "char": "M10 5h11 M10 12h11 M10 19h11 m3 10 3-3-3-3 m3 20 3-3-3-3",
    "category": "ui",
    "tags": "items collapse expand details disclosure show hide toggle accordion more less fold unfold"
  },
  {
    "id": "list-end",
    "char": "M16 5H3 M16 12H3 M9 19H3 m16 16-3 3 3 3 M21 5v12a2 2 0 0 1-2 2h-6",
    "category": "ui",
    "tags": "queue bottom end playlist"
  },
  {
    "id": "list-filter-plus",
    "char": "M12 5H2 M6 12h12 M9 19h6 M16 5h6 M19 8V2",
    "category": "ui",
    "tags": "filter plus options add"
  },
  {
    "id": "list-filter",
    "char": "M2 5h20 M6 12h12 M9 19h6",
    "category": "ui",
    "tags": "options"
  },
  {
    "id": "list-indent-decrease",
    "char": "M21 5H11 M21 12H11 M21 19H11 m7 8-4 4 4 4",
    "category": "ui",
    "tags": "text tab"
  },
  {
    "id": "list-indent-increase",
    "char": "M21 5H11 M21 12H11 M21 19H11 m3 8 4 4-4 4",
    "category": "ui",
    "tags": "text tab"
  },
  {
    "id": "list-minus",
    "char": "M16 5H3 M11 12H3 M16 19H3 M21 12h-6",
    "category": "ui",
    "tags": "playlist remove song subtract delete unqueue"
  },
  {
    "id": "list-music",
    "char": "M16 5H3 M11 12H3 M11 19H3 M21 16V5 M 18, 16 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "media",
    "tags": "playlist queue music audio playback"
  },
  {
    "id": "list-ordered",
    "char": "M11 5h10 M11 12h10 M11 19h10 M4 4h1v5 M4 9h2 M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02",
    "category": "ui",
    "tags": "number order queue"
  },
  {
    "id": "list-plus",
    "char": "M16 5H3 M11 12H3 M16 19H3 M18 9v6 M21 12h-6",
    "category": "ui",
    "tags": "playlist add song track new"
  },
  {
    "id": "list-restart",
    "char": "M21 5H3 M7 12H3 M7 19H3 M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14 M11 10v4h4",
    "category": "ui",
    "tags": "reset refresh reload playlist replay"
  },
  {
    "id": "list-start",
    "char": "M3 5h6 M3 12h13 M3 19h13 m16 8-3-3 3-3 M21 19V7a2 2 0 0 0-2-2h-6",
    "category": "ui",
    "tags": "queue top start next playlist"
  },
  {
    "id": "list-todo",
    "char": "M13 5h8 M13 12h8 M13 19h8 m3 17 2 2 4-4 M 3 4 h 6 v 6 h -6 Z",
    "category": "ui",
    "tags": "todo done check tick complete tasks items pending"
  },
  {
    "id": "list-tree",
    "char": "M8 5h13 M13 12h8 M13 19h8 M3 10a2 2 0 0 0 2 2h3 M3 5v12a2 2 0 0 0 2 2h3",
    "category": "ui",
    "tags": "tree browser"
  },
  {
    "id": "list-video",
    "char": "M21 5H3 M10 12H3 M10 19H3 M15 12.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z",
    "category": "media",
    "tags": "playlist video playback"
  },
  {
    "id": "list-x",
    "char": "M16 5H3 M11 12H3 M16 19H3 m15.5 9.5 5 5 m20.5 9.5-5 5",
    "category": "ui",
    "tags": "playlist subtract remove delete unqueue"
  },
  {
    "id": "list",
    "char": "M3 5h.01 M3 12h.01 M3 19h.01 M8 5h13 M8 12h13 M8 19h13",
    "category": "ui",
    "tags": "options"
  },
  {
    "id": "loader-circle",
    "char": "M21 12a9 9 0 1 1-6.219-8.56",
    "category": "ui",
    "tags": "loading wait busy progress spinner spinning throbber circle"
  },
  {
    "id": "loader-pinwheel",
    "char": "M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0 M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6 M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6 M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0",
    "category": "ui",
    "tags": "loading wait busy progress throbber spinner spinning beach ball frozen freeze"
  },
  {
    "id": "loader",
    "char": "M12 2v4 m16.2 7.8 2.9-2.9 M18 12h4 m16.2 16.2 2.9 2.9 M12 18v4 m4.9 19.1 2.9-2.9 M2 12h4 m4.9 4.9 2.9 2.9",
    "category": "ui",
    "tags": "loading wait busy progress spinner spinning throbber"
  },
  {
    "id": "locate-fixed",
    "char": "M 12, 12 m -7, 0 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0 M 12, 12 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "map gps location cross"
  },
  {
    "id": "locate-off",
    "char": "M12 19v3 M12 2v3 M18.89 13.24a7 7 0 0 0-8.13-8.13 M19 12h3 M2 12h3 m2 2 20 20 M7.05 7.05a7 7 0 0 0 9.9 9.9",
    "category": "ui",
    "tags": "map gps location cross"
  },
  {
    "id": "locate",
    "char": "M 12, 12 m -7, 0 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0",
    "category": "ui",
    "tags": "map gps location cross"
  },
  {
    "id": "lock-keyhole-open",
    "char": "M 12, 16 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 3 10 h 18 v 12 h -18 Z M7 10V7a5 5 0 0 1 9.33-2.5",
    "category": "ui",
    "tags": "security"
  },
  {
    "id": "lock-keyhole",
    "char": "M 12, 16 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 3 10 h 18 v 12 h -18 Z M7 10V7a5 5 0 0 1 10 0v3",
    "category": "ui",
    "tags": "security password secure admin"
  },
  {
    "id": "lock-open",
    "char": "M 3 11 h 18 v 11 h -18 Z M7 11V7a5 5 0 0 1 9.9-1",
    "category": "ui",
    "tags": "security"
  },
  {
    "id": "lock",
    "char": "M 3 11 h 18 v 11 h -18 Z M7 11V7a5 5 0 0 1 10 0v4",
    "category": "ui",
    "tags": "security password secure admin"
  },
  {
    "id": "log-in",
    "char": "m10 17 5-5-5-5 M15 12H3 M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",
    "category": "ui",
    "tags": "sign in arrow enter auth"
  },
  {
    "id": "log-out",
    "char": "m16 17 5-5-5-5 M21 12H9 M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
    "category": "ui",
    "tags": "sign out arrow exit auth"
  },
  {
    "id": "logs",
    "char": "M3 5h1 M3 12h1 M3 19h1 M8 5h1 M8 12h1 M8 19h1 M13 5h8 M13 12h8 M13 19h8",
    "category": "ui",
    "tags": "options list menu order queue tasks logs"
  },
  {
    "id": "lollipop",
    "char": "M 11, 11 m -8, 0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0 m21 21-4.3-4.3 M11 11a2 2 0 0 0 4 0 4 4 0 0 0-8 0 6 6 0 0 0 12 0",
    "category": "ui",
    "tags": "lolly candy sugar food sweet dessert spiral"
  },
  {
    "id": "luggage",
    "char": "M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14 M10 20h4 M 16, 20 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 8, 20 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "baggage luggage travel suitcase"
  },
  {
    "id": "magnet",
    "char": "m12 15 4 4 M2.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.029-6.029a1 1 0 1 1 3 3l-6.029 6.029a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.365-6.367A1 1 0 0 0 8.716 4.282z m5 8 4 4",
    "category": "ui",
    "tags": "horseshoe lock science snap"
  },
  {
    "id": "mail-check",
    "char": "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8 m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7 m16 19 2 2 4-4",
    "category": "ui",
    "tags": "email message letter subscribe delivered success read done todo tick complete task"
  },
  {
    "id": "mail-minus",
    "char": "M22 15V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8 m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7 M16 19h6",
    "category": "communication",
    "tags": "email message letter remove delete"
  },
  {
    "id": "mail-open",
    "char": "M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10",
    "category": "communication",
    "tags": "email message letter read"
  },
  {
    "id": "mail-plus",
    "char": "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8 m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7 M19 16v6 M16 19h6",
    "category": "ui",
    "tags": "email message letter add create new compose"
  },
  {
    "id": "mail-question-mark",
    "char": "M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5 m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7 M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2 M20 22v.01",
    "category": "communication",
    "tags": "email message letter delivery undelivered"
  },
  {
    "id": "mail-search",
    "char": "M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h7.5 m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7 M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M 18, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 m22 22-1.5-1.5",
    "category": "ui",
    "tags": "email message letter search lens"
  },
  {
    "id": "mail-warning",
    "char": "M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5 m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7 M20 14v4 M20 22v.01",
    "category": "communication",
    "tags": "email message letter delivery error exclamation mark"
  },
  {
    "id": "mail-x",
    "char": "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9 m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7 m17 17 4 4 m21 17-4 4",
    "category": "ui",
    "tags": "email message letter remove delete"
  },
  {
    "id": "mail",
    "char": "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7 M 2 4 h 20 v 16 h -20 Z",
    "category": "communication",
    "tags": "email message letter unread"
  },
  {
    "id": "mailbox",
    "char": "M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2",
    "category": "ui",
    "tags": "emails messages letters mailing list newsletter"
  },
  {
    "id": "mails",
    "char": "M17 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 1-1.732 m22 5.5-6.419 4.179a2 2 0 0 1-2.162 0L7 5.5 M 7 3 h 15 v 12 h -15 Z",
    "category": "communication",
    "tags": "emails messages letters multiple mailing list newsletter copy"
  },
  {
    "id": "map-minus",
    "char": "m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V14 M15 5.764V14 M21 18h-6 M9 3.236v15",
    "category": "ui",
    "tags": "location navigation travel drop delete remove erase"
  },
  {
    "id": "map-pin-check-inside",
    "char": "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0 m9 10 2 2 4-4",
    "category": "ui",
    "tags": "location waypoint marker drop done tick complete task added"
  },
  {
    "id": "map-pin-check",
    "char": "M19.43 12.935c.357-.967.57-1.955.57-2.935a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32.197 32.197 0 0 0 .813-.728 M 12, 10 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 m16 18 2 2 4-4",
    "category": "ui",
    "tags": "location waypoint marker drop done tick complete task added"
  },
  {
    "id": "map-pin-house",
    "char": "M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2 M18 22v-3 M 10, 10 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "location waypoint marker drop home living building residence architecture address poi real estate property navigation destination geolocation place landmark"
  },
  {
    "id": "map-pin-minus-inside",
    "char": "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0 M9 10h6",
    "category": "ui",
    "tags": "location waypoint marker drop delete remove erase"
  },
  {
    "id": "map-pin-minus",
    "char": "M18.977 14C19.6 12.701 20 11.343 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738 M 12, 10 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M16 18h6",
    "category": "ui",
    "tags": "location waypoint marker drop delete remove erase"
  },
  {
    "id": "map-pin-off",
    "char": "M12.75 7.09a3 3 0 0 1 2.16 2.16 M17.072 17.072c-1.634 2.17-3.527 3.912-4.471 4.727a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 1.432-4.568 m2 2 20 20 M8.475 2.818A8 8 0 0 1 20 10c0 1.183-.31 2.377-.81 3.533 M9.13 9.13a3 3 0 0 0 3.74 3.74",
    "category": "ui",
    "tags": "location waypoint marker remove"
  },
  {
    "id": "map-pin-pen",
    "char": "M17.97 9.304A8 8 0 0 0 2 10c0 4.69 4.887 9.562 7.022 11.468 M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z M 10, 10 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "location waypoint marker drop edit"
  },
  {
    "id": "map-pin-plus-inside",
    "char": "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0 M12 7v6 M9 10h6",
    "category": "ui",
    "tags": "location waypoint marker drop add create new"
  },
  {
    "id": "map-pin-plus",
    "char": "M19.914 11.105A7.298 7.298 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738 M 12, 10 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M16 18h6 M19 15v6",
    "category": "ui",
    "tags": "location waypoint marker drop add create new"
  },
  {
    "id": "map-pin-x-inside",
    "char": "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0 m14.5 7.5-5 5 m9.5 7.5 5 5",
    "category": "ui",
    "tags": "location waypoint marker drop delete remove erase"
  },
  {
    "id": "map-pin-x",
    "char": "M19.752 11.901A7.78 7.78 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 19 19 0 0 0 .09-.077 M 12, 10 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 m21.5 15.5-5 5 m21.5 20.5-5-5",
    "category": "ui",
    "tags": "location waypoint marker drop delete remove erase"
  },
  {
    "id": "map-pin",
    "char": "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0 M 12, 10 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "location waypoint marker drop"
  },
  {
    "id": "map-pinned",
    "char": "M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0 M 12, 8 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712",
    "category": "ui",
    "tags": "location waypoint marker drop"
  },
  {
    "id": "map-plus",
    "char": "m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V12 M15 5.764V12 M18 15v6 M21 18h-6 M9 3.236v15",
    "category": "ui",
    "tags": "location navigation travel new add create"
  },
  {
    "id": "map",
    "char": "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z M15 5.764v15 M9 3.236v15",
    "category": "ui",
    "tags": "location navigation travel"
  },
  {
    "id": "mars-stroke",
    "char": "m14 6 4 4 M17 3h4v4 m21 3-7.75 7.75 M 9, 15 m -6, 0 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0",
    "category": "ui",
    "tags": "gender androgyne transgender"
  },
  {
    "id": "mars",
    "char": "M16 3h5v5 m21 3-6.75 6.75 M 10, 14 m -6, 0 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0",
    "category": "ui",
    "tags": "gender sex male masculine man boy"
  },
  {
    "id": "martini",
    "char": "M8 22h8 M12 11v11 m19 3-7 8-7-8Z",
    "category": "ui",
    "tags": "cocktail alcohol beverage bar drink glass"
  },
  {
    "id": "maximize-2",
    "char": "M15 3h6v6 m21 3-7 7 m3 21 7-7 M9 21H3v-6",
    "category": "ui",
    "tags": "fullscreen arrows expand"
  },
  {
    "id": "maximize",
    "char": "M8 3H5a2 2 0 0 0-2 2v3 M21 8V5a2 2 0 0 0-2-2h-3 M3 16v3a2 2 0 0 0 2 2h3 M16 21h3a2 2 0 0 0 2-2v-3",
    "category": "ui",
    "tags": "fullscreen expand dashed"
  },
  {
    "id": "medal",
    "char": "M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15 M11 12 5.12 2.2 m13 12 5.88-9.8 M8 7h8 M 12, 17 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0 M12 18v-2h-.5",
    "category": "ui",
    "tags": "prize sports winner trophy award achievement"
  },
  {
    "id": "megaphone-off",
    "char": "M11.636 6A13 13 0 0 0 19.4 3.2 1 1 0 0 1 21 4v11.344 M14.378 14.357A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1 m2 2 20 20 M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14 M8 8v6",
    "category": "communication",
    "tags": "advertisement announcement attention alert loudspeaker megaphone notification disable silent"
  },
  {
    "id": "megaphone",
    "char": "M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14 M8 6v8",
    "category": "communication",
    "tags": "advertisement announcement attention alert loudspeaker megaphone notification"
  },
  {
    "id": "meh",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0",
    "category": "ui",
    "tags": "emoji face neutral emotion"
  },
  {
    "id": "memory-stick",
    "char": "M12 12v-2 M12 18v-2 M16 12v-2 M16 18v-2 M2 11h1.5 M20 18v-2 M20.5 11H22 M4 18v-2 M8 12v-2 M8 18v-2 M 2 6 h 20 v 10 h -20 Z",
    "category": "ui",
    "tags": "ram random access technology computer chip circuit specs capacity gigabytes gb"
  },
  {
    "id": "menu",
    "char": "M4 5h16 M4 12h16 M4 19h16",
    "category": "ui",
    "tags": "bars navigation hamburger options"
  },
  {
    "id": "merge",
    "char": "m8 6 4-4 4 4 M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22 m20 22-5-5",
    "category": "ui",
    "tags": "combine join unite"
  },
  {
    "id": "message-circle-check",
    "char": "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719 m9 12 2 2 4-4",
    "category": "ui",
    "tags": "comment chat conversation dialog feedback speech bubble moderate check done todo complete"
  },
  {
    "id": "message-circle-code",
    "char": "m10 9-3 3 3 3 m14 15 3-3-3-3 M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
    "category": "communication",
    "tags": "comment chat conversation dialog feedback speech bubble code review coding"
  },
  {
    "id": "message-circle-dashed",
    "char": "M10.1 2.182a10 10 0 0 1 3.8 0 M13.9 21.818a10 10 0 0 1-3.8 0 M17.609 3.72a10 10 0 0 1 2.69 2.7 M2.182 13.9a10 10 0 0 1 0-3.8 M20.28 17.61a10 10 0 0 1-2.7 2.69 M21.818 10.1a10 10 0 0 1 0 3.8 M3.721 6.391a10 10 0 0 1 2.7-2.69 m6.163 21.117-2.906.85a1 1 0 0 1-1.236-1.169l.965-2.98",
    "category": "communication",
    "tags": "comment chat conversation dialog feedback speech bubble draft"
  },
  {
    "id": "message-circle-heart",
    "char": "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719 M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 0 1 5.004 2.224 3 3 0 0 1-.832 2.083l-3.447 3.62a1 1 0 0 1-1.45-.001z",
    "category": "communication",
    "tags": "comment chat conversation dialog feedback positive like love interest valentine dating date speech bubble"
  },
  {
    "id": "message-circle-more",
    "char": "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719 M8 12h.01 M12 12h.01 M16 12h.01",
    "category": "communication",
    "tags": "comment chat conversation dialog feedback speech bubble typing writing responding ellipsis etc et cetera ... …"
  },
  {
    "id": "message-circle-off",
    "char": "m2 2 20 20 M4.93 4.929a10 10 0 0 0-1.938 11.412 2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 0 0 11.302-1.989 M8.35 2.69A10 10 0 0 1 21.3 15.65",
    "category": "communication",
    "tags": "comment chat conversation dialog feedback speech bubble clear close delete remove cancel silence mute moderate"
  },
  {
    "id": "message-circle-plus",
    "char": "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719 M8 12h8 M12 8v8",
    "category": "ui",
    "tags": "comment chat conversation dialog feedback speech bubble add"
  },
  {
    "id": "message-circle-question-mark",
    "char": "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719 M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3 M12 17h.01",
    "category": "communication",
    "tags": "comment chat conversation dialog feedback speech bubble help"
  },
  {
    "id": "message-circle-reply",
    "char": "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719 m10 15-3-3 3-3 M7 12h8a2 2 0 0 1 2 2v1",
    "category": "communication",
    "tags": "comment chat conversation dialog feedback speech bubble reply response"
  },
  {
    "id": "message-circle-warning",
    "char": "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719 M12 8v4 M12 16h.01",
    "category": "communication",
    "tags": "comment chat conversation dialog feedback speech bubble report abuse offense alert danger caution protected exclamation mark"
  },
  {
    "id": "message-circle-x",
    "char": "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719 m15 9-6 6 m9 9 6 6",
    "category": "ui",
    "tags": "comment chat conversation dialog feedback speech bubble clear close delete remove cancel silence mute moderate"
  },
  {
    "id": "message-circle",
    "char": "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
    "category": "communication",
    "tags": "comment chat conversation dialog feedback speech bubble"
  },
  {
    "id": "message-square-check",
    "char": "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.7.7 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z m9 11 2 2 4-4",
    "category": "ui",
    "tags": "comment chat conversation dialog feedback speech bubble moderate check done todo complete"
  },
  {
    "id": "message-square-code",
    "char": "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z m10 8-3 3 3 3 m14 14 3-3-3-3",
    "category": "communication",
    "tags": "comment chat conversation dialog feedback speech bubble code review coding"
  },
  {
    "id": "message-square-dashed",
    "char": "M14 3h2 M16 19h-2 M2 12v-2 M2 16v5.286a.71.71 0 0 0 1.212.502l1.149-1.149 M20 19a2 2 0 0 0 2-2v-1 M22 10v2 M22 6V5a2 2 0 0 0-2-2 M4 3a2 2 0 0 0-2 2v1 M8 19h2 M8 3h2",
    "category": "communication",
    "tags": "comment chat conversation dialog feedback speech bubble draft"
  },
  {
    "id": "message-square-diff",
    "char": "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z M10 15h4 M10 9h4 M12 7v4",
    "category": "communication",
    "tags": "comment chat conversation dialog feedback speech bubble add patch difference plus minus plus-minus math code review coding version control git"
  },
  {
    "id": "message-square-dot",
    "char": "M12.7 3H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H20a2 2 0 0 0 2-2v-4.7 M 19, 6 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "communication",
    "tags": "unread unresolved comment chat conversation dialog feedback speech bubble"
  },
  {
    "id": "message-square-heart",
    "char": "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z M7.5 9.5c0 .687.265 1.383.697 1.844l3.009 3.264a1.14 1.14 0 0 0 .407.314 1 1 0 0 0 .783-.004 1.14 1.14 0 0 0 .398-.31l3.008-3.264A2.77 2.77 0 0 0 16.5 9.5 2.5 2.5 0 0 0 12 8a2.5 2.5 0 0 0-4.5 1.5",
    "category": "communication",
    "tags": "comment chat conversation dialog feedback positive like love interest valentine dating date speech bubble"
  },
  {
    "id": "message-square-lock",
    "char": "M22 8.5V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H10 M20 15v-2a2 2 0 0 0-4 0v2 M 14 15 h 8 v 5 h -8 Z",
    "category": "communication",
    "tags": "comment chat conversation dialog feedback speech bubble secure encrypted"
  },
  {
    "id": "message-square-more",
    "char": "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z M12 11h.01 M16 11h.01 M8 11h.01",
    "category": "communication",
    "tags": "comment chat conversation dialog feedback speech bubble typing writing responding ellipsis etc et cetera ... …"
  },
  {
    "id": "message-square-off",
    "char": "M19 19H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.7.7 0 0 1 2 21.286V5a2 2 0 0 1 1.184-1.826 m2 2 20 20 M8.656 3H20a2 2 0 0 1 2 2v11.344",
    "category": "communication",
    "tags": "comment chat conversation dialog feedback speech bubble clear close delete remove cancel silence mute moderate"
  },
  {
    "id": "message-square-plus",
    "char": "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z M12 8v6 M9 11h6",
    "category": "ui",
    "tags": "comment chat conversation dialog feedback speech bubble add"
  },
  {
    "id": "message-square-quote",
    "char": "M14 14a2 2 0 0 0 2-2V8h-2 M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z M8 14a2 2 0 0 0 2-2V8H8",
    "category": "communication",
    "tags": "comment chat conversation dialog feedback speech bubble blockquote quotation indent reply response"
  },
  {
    "id": "message-square-reply",
    "char": "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z m10 8-3 3 3 3 M17 14v-1a2 2 0 0 0-2-2H7",
    "category": "communication",
    "tags": "comment chat conversation dialog feedback speech bubble reply response"
  },
  {
    "id": "message-square-share",
    "char": "M12 3H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H20a2 2 0 0 0 2-2v-4 M16 3h6v6 m16 9 6-6",
    "category": "ui",
    "tags": "comment chat conversation dialog feedback speech bubble network forward"
  },
  {
    "id": "message-square-text",
    "char": "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z M7 11h10 M7 15h6 M7 7h8",
    "category": "ui",
    "tags": "comment chat conversation dialog feedback speech bubble"
  },
  {
    "id": "message-square-warning",
    "char": "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z M12 15h.01 M12 7v4",
    "category": "communication",
    "tags": "comment chat conversation dialog feedback speech bubble report abuse offense alert danger caution protected exclamation mark"
  },
  {
    "id": "message-square-x",
    "char": "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z m14.5 8.5-5 5 m9.5 8.5 5 5",
    "category": "ui",
    "tags": "comment chat conversation dialog feedback speech bubble clear close delete remove cancel silence mute moderate"
  },
  {
    "id": "message-square",
    "char": "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
    "category": "communication",
    "tags": "comment chat conversation dialog feedback speech bubble"
  },
  {
    "id": "messages-square",
    "char": "M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1",
    "category": "communication",
    "tags": "comment chat conversation dialog feedback speech bubbles copy multiple discussion interview debate"
  },
  {
    "id": "metronome",
    "char": "M12 11.4V9.1 m12 17 6.59-6.59 m15.05 5.7-.218-.691a3 3 0 0 0-5.663 0L4.418 19.695A1 1 0 0 0 5.37 21h13.253a1 1 0 0 0 .951-1.31L18.45 16.2 M 20, 9 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "metronome tempo rhythm beat bpm music audio sound practice timing timer time pulse sync cadence control playback studio tool"
  },
  {
    "id": "mic-off",
    "char": "M12 19v3 M15 9.34V5a3 3 0 0 0-5.68-1.33 M16.95 16.95A7 7 0 0 1 5 12v-2 M18.89 13.23A7 7 0 0 0 19 12v-2 m2 2 20 20 M9 9v3a3 3 0 0 0 5.12 2.12",
    "category": "media",
    "tags": "record sound mute microphone"
  },
  {
    "id": "mic-vocal",
    "char": "m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12 M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5 M 16, 7 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
    "category": "media",
    "tags": "lyrics voice listen sound music radio podcast karaoke singing microphone"
  },
  {
    "id": "mic",
    "char": "M12 19v3 M19 10v2a7 7 0 0 1-14 0v-2 M 9 2 h 6 v 13 h -6 Z",
    "category": "media",
    "tags": "record sound listen radio podcast microphone"
  },
  {
    "id": "microchip",
    "char": "M10 12h4 M10 17h4 M10 7h4 M18 12h2 M18 18h2 M18 6h2 M4 12h2 M4 18h2 M4 6h2 M 6 2 h 12 v 20 h -12 Z",
    "category": "media",
    "tags": "processor cores technology computer chip integrated circuit memory ram specs gpu gigahertz ghz"
  },
  {
    "id": "microscope",
    "char": "M6 18h8 M3 22h18 M14 22a7 7 0 1 0 0-14h-1 M9 14h2 M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3",
    "category": "media",
    "tags": "medical education science imaging research"
  },
  {
    "id": "microwave",
    "char": "M 2 4 h 20 v 15 h -20 Z M 6 8 h 8 v 7 h -8 Z M18 8v7 M6 19v2 M18 19v2",
    "category": "media",
    "tags": "oven cooker toaster oven bake"
  },
  {
    "id": "milestone",
    "char": "M12 13v8 M12 3v3 M4 6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h13a2 2 0 0 0 1.152-.365l3.424-2.317a1 1 0 0 0 0-1.635l-3.424-2.318A2 2 0 0 0 17 6z",
    "category": "ui",
    "tags": "signpost direction right east forward version control waypoint"
  },
  {
    "id": "milk-off",
    "char": "M8 2h8 M9 2v1.343M15 2v2.789a4 4 0 0 0 .672 2.219l.656.984a4 4 0 0 1 .672 2.22v1.131M7.8 7.8l-.128.192A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3 M7 15a6.47 6.47 0 0 1 5 0 6.472 6.472 0 0 0 3.435.435",
    "category": "ui",
    "tags": "lactose free bottle beverage drink water allergy intolerance diet"
  },
  {
    "id": "milk",
    "char": "M8 2h8 M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2 M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0",
    "category": "ui",
    "tags": "lactose bottle beverage drink water diet"
  },
  {
    "id": "minimize-2",
    "char": "m14 10 7-7 M20 10h-6V4 m3 21 7-7 M4 14h6v6",
    "category": "arrows",
    "tags": "exit fullscreen arrows close shrink"
  },
  {
    "id": "minimize",
    "char": "M8 3v3a2 2 0 0 1-2 2H3 M21 8h-3a2 2 0 0 1-2-2V3 M3 16h3a2 2 0 0 1 2 2v3 M16 21v-3a2 2 0 0 1 2-2h3",
    "category": "arrows",
    "tags": "exit fullscreen close shrink"
  },
  {
    "id": "minus",
    "char": "M5 12h14",
    "category": "ui",
    "tags": "subtract remove decrease decrement reduce negative calculate line divider separator horizontal rule hr html markup markdown --- toolbar operator code coding minimum downgrade"
  },
  {
    "id": "mirror-rectangular",
    "char": "M11 6 8 9 m16 7-8 8 M 4 2 h 16 v 20 h -16 Z",
    "category": "ui",
    "tags": "reflection optics glass surface image physics science bathroom decor cosmetic shiny periscope vanity"
  },
  {
    "id": "mirror-round",
    "char": "M10 6.6 8.6 8 M12 18v4 M15 7.5 9.5 13 M7 22h10 M 12, 10 m -8, 0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
    "category": "ui",
    "tags": "reflection optics glass surface image physics science bathroom vanity makeup decor cosmetic shiny periscope"
  },
  {
    "id": "monitor-check",
    "char": "m9 10 2 2 4-4 M 2 3 h 20 v 14 h -20 Z M12 17v4 M8 21h8",
    "category": "ui",
    "tags": "tv screen display desktop running active virtual machine vm"
  },
  {
    "id": "monitor-cloud",
    "char": "M11 13a3 3 0 1 1 2.83-4H14a2 2 0 0 1 0 4z M12 17v4 M8 21h8 M 2 3 h 20 v 14 h -20 Z",
    "category": "ui",
    "tags": "virtual machine virtual desktop vm vdi computing remote work monitoring infrastructure software as a service saas workstation environment tv screen display"
  },
  {
    "id": "monitor-cog",
    "char": "M12 17v4 m14.305 7.53.923-.382 m15.228 4.852-.923-.383 m16.852 3.228-.383-.924 m16.852 8.772-.383.923 m19.148 3.228.383-.924 m19.53 9.696-.382-.924 m20.772 4.852.924-.383 m20.772 7.148.924.383 M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7 M8 21h8 M 18, 6 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "tv screen display virtual machine vm executable settings cog edit gear configuration preferences system control panel network computing"
  },
  {
    "id": "monitor-dot",
    "char": "M12 17v4 M22 12.307V15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8.693 M8 21h8 M 19, 6 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "tv screen display desktop running active virtual machine vm"
  },
  {
    "id": "monitor-down",
    "char": "M12 13V7 m15 10-3 3-3-3 M 2 3 h 20 v 14 h -20 Z M12 17v4 M8 21h8",
    "category": "ui",
    "tags": "tv screen display desktop download"
  },
  {
    "id": "monitor-off",
    "char": "M12 17v4 M17 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 1.184-1.826 m2 2 20 20 M8 21h8 M8.656 3H20a2 2 0 0 1 2 2v10a2 2 0 0 1-.293 1.042",
    "category": "ui",
    "tags": "share"
  },
  {
    "id": "monitor-pause",
    "char": "M10 13V7 M14 13V7 M 2 3 h 20 v 14 h -20 Z M12 17v4 M8 21h8",
    "category": "media",
    "tags": "tv screen display desktop video movie film suspend hibernate boot virtual machine vm"
  },
  {
    "id": "monitor-play",
    "char": "M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z M12 17v4 M8 21h8 M 2 3 h 20 v 14 h -20 Z",
    "category": "media",
    "tags": "tv screen display desktop video movie film running start boot virtual machine vm"
  },
  {
    "id": "monitor-smartphone",
    "char": "M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8 M10 19v-3.96 3.15 M7 19h5 M 16 12 h 6 v 10 h -6 Z",
    "category": "communication",
    "tags": "smartphone phone cellphone device mobile desktop monitor responsive screens"
  },
  {
    "id": "monitor-speaker",
    "char": "M5.5 20H8 M17 9h.01 M 12 4 h 10 v 16 h -10 Z M8 6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4 M 17, 15 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0",
    "category": "media",
    "tags": "devices connect cast"
  },
  {
    "id": "monitor-stop",
    "char": "M12 17v4 M8 21h8 M 2 3 h 20 v 14 h -20 Z M 9 7 h 6 v 6 h -6 Z",
    "category": "media",
    "tags": "tv screen display desktop video movie film stop shutdown virtual machine vm"
  },
  {
    "id": "monitor-up",
    "char": "m9 10 3-3 3 3 M12 13V7 M 2 3 h 20 v 14 h -20 Z M12 17v4 M8 21h8",
    "category": "ui",
    "tags": "tv screen display upload connect remote screen share"
  },
  {
    "id": "monitor-x",
    "char": "m14.5 12.5-5-5 m9.5 12.5 5-5 M 2 3 h 20 v 14 h -20 Z M12 17v4 M8 21h8",
    "category": "ui",
    "tags": "tv screen display desktop virtual machine vm close stop suspend remove delete"
  },
  {
    "id": "monitor",
    "char": "M 2 3 h 20 v 14 h -20 Z",
    "category": "ui",
    "tags": "tv screen display virtual machine vm"
  },
  {
    "id": "moon-star",
    "char": "M18 5h4 M20 3v4 M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
    "category": "ui",
    "tags": "dark night star"
  },
  {
    "id": "moon",
    "char": "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
    "category": "ui",
    "tags": "dark night"
  },
  {
    "id": "motorbike",
    "char": "m18 14-1-3 m3 9 6 2a2 2 0 0 1 2-2h2a2 2 0 0 1 1.99 1.81 M8 17h3a1 1 0 0 0 1-1 6 6 0 0 1 6-6 1 1 0 0 0 1-1v-.75A5 5 0 0 0 17 5 M 19, 17 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 5, 17 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "moto motorcycle transport vehicle drive ride trip race racing journey delivery"
  },
  {
    "id": "mountain-snow",
    "char": "m8 3 4 8 5-5 5 15H2L8 3z M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19",
    "category": "ui",
    "tags": "alpine climb snow"
  },
  {
    "id": "mountain",
    "char": "m8 3 4 8 5-5 5 15H2L8 3z",
    "category": "ui",
    "tags": "climb hike rock"
  },
  {
    "id": "mouse-left",
    "char": "M12 7.318V10 M5 10v5a7 7 0 0 0 14 0V9c0-3.527-2.608-6.515-6-7 M 7, 4 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "device scroll click"
  },
  {
    "id": "mouse-off",
    "char": "M12 6v.343 M18.218 18.218A7 7 0 0 1 5 15V9a7 7 0 0 1 .782-3.218 M19 13.343V9A7 7 0 0 0 8.56 2.902 M22 22 2 2",
    "category": "ui",
    "tags": "device scroll click disabled"
  },
  {
    "id": "mouse-pointer-2-off",
    "char": "m15.55 8.45 5.138 2.087a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063L8.45 15.551 M22 2 2 22 m6.816 11.528-2.779-6.84a.495.495 0 0 1 .651-.651l6.84 2.779",
    "category": "ui",
    "tags": "pointer mouse cursor off disable arrow navigation selection select click no-click interaction"
  },
  {
    "id": "mouse-pointer-2",
    "char": "M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z",
    "category": "ui",
    "tags": "click select"
  },
  {
    "id": "mouse-pointer-ban",
    "char": "M2.034 2.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.944L8.204 7.545a1 1 0 0 0-.66.66l-1.066 3.443a.5.5 0 0 1-.944.033z M 16, 16 m -6, 0 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0 m11.8 11.8 8.4 8.4",
    "category": "ui",
    "tags": "wait busy loading blocked frozen freeze"
  },
  {
    "id": "mouse-pointer-click",
    "char": "M14 4.1 12 6 m5.1 8-2.9-.8 m6 12-1.9 2 M7.2 2.2 8 5.1 M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z",
    "category": "ui",
    "tags": "click select"
  },
  {
    "id": "mouse-pointer",
    "char": "M12.586 12.586 19 19 M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z",
    "category": "ui",
    "tags": "click select"
  },
  {
    "id": "mouse-right",
    "char": "M12 7.318V10 M19 10v5a7 7 0 0 1-14 0V9c0-3.527 2.608-6.515 6-7 M 17, 4 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "device scroll click"
  },
  {
    "id": "mouse",
    "char": "M 5 2 h 14 v 20 h -14 Z M12 6v4",
    "category": "ui",
    "tags": "device scroll click"
  },
  {
    "id": "move-3d",
    "char": "M5 3v16h16 m5 19 6-6 m2 6 3-3 3 3 m18 16 3 3-3 3",
    "category": "arrows",
    "tags": "arrows axis gizmo coordinates transform translate"
  },
  {
    "id": "move-diagonal-2",
    "char": "M19 13v6h-6 M5 11V5h6 m5 5 14 14",
    "category": "arrows",
    "tags": "double arrow"
  },
  {
    "id": "move-diagonal",
    "char": "M11 19H5v-6 M13 5h6v6 M19 5 5 19",
    "category": "arrows",
    "tags": "double arrow"
  },
  {
    "id": "move-down-left",
    "char": "M11 19H5V13 M19 5L5 19",
    "category": "arrows",
    "tags": "arrow direction"
  },
  {
    "id": "move-down-right",
    "char": "M19 13V19H13 M5 5L19 19",
    "category": "arrows",
    "tags": "arrow direction"
  },
  {
    "id": "move-down",
    "char": "M8 18L12 22L16 18 M12 2V22",
    "category": "arrows",
    "tags": "arrow direction downwards south"
  },
  {
    "id": "move-horizontal",
    "char": "m18 8 4 4-4 4 M2 12h20 m6 8-4 4 4 4",
    "category": "arrows",
    "tags": "double arrow"
  },
  {
    "id": "move-left",
    "char": "M6 8L2 12L6 16 M2 12H22",
    "category": "arrows",
    "tags": "arrow direction back west"
  },
  {
    "id": "move-right",
    "char": "M18 8L22 12L18 16 M2 12H22",
    "category": "arrows",
    "tags": "arrow direction trend flat east"
  },
  {
    "id": "move-up-left",
    "char": "M5 11V5H11 M5 5L19 19",
    "category": "arrows",
    "tags": "arrow direction"
  },
  {
    "id": "move-up-right",
    "char": "M13 5H19V11 M19 5L5 19",
    "category": "arrows",
    "tags": "arrow direction"
  },
  {
    "id": "move-up",
    "char": "M8 6L12 2L16 6 M12 2V22",
    "category": "arrows",
    "tags": "arrow direction upwards north"
  },
  {
    "id": "move-vertical",
    "char": "M12 2v20 m8 18 4 4 4-4 m8 6 4-4 4 4",
    "category": "arrows",
    "tags": "double arrow"
  },
  {
    "id": "move",
    "char": "M12 2v20 m15 19-3 3-3-3 m19 9 3 3-3 3 M2 12h20 m5 9-3 3 3 3 m9 5 3-3 3 3",
    "category": "arrows",
    "tags": "arrows"
  },
  {
    "id": "music-2",
    "char": "M 8, 18 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0 M12 18V2l7 4",
    "category": "media",
    "tags": "quaver eighth note note"
  },
  {
    "id": "music-3",
    "char": "M 12, 18 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0 M16 18V2",
    "category": "media",
    "tags": "crotchet minim quarter note half note note"
  },
  {
    "id": "music-4",
    "char": "M9 18V5l12-2v13 m9 9 12-2 M 6, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 18, 16 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "media",
    "tags": "semiquaver sixteenth note note"
  },
  {
    "id": "music",
    "char": "M9 18V5l12-2v13 M 6, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 18, 16 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "media",
    "tags": "note quaver eighth note"
  },
  {
    "id": "navigation-2-off",
    "char": "M9.31 9.31 5 21l7-4 7 4-1.17-3.17 M14.53 8.88 12 2l-1.17 3.17",
    "category": "ui",
    "tags": "location travel"
  },
  {
    "id": "navigation-2",
    "char": "",
    "category": "ui",
    "tags": "location travel"
  },
  {
    "id": "navigation-off",
    "char": "M8.43 8.43 3 11l8 2 2 8 2.57-5.43 M17.39 11.73 22 2l-9.73 4.61",
    "category": "ui",
    "tags": "location travel"
  },
  {
    "id": "navigation",
    "char": "",
    "category": "ui",
    "tags": "location travel"
  },
  {
    "id": "network",
    "char": "M 16 16 h 6 v 6 h -6 Z M 2 16 h 6 v 6 h -6 Z M 9 2 h 6 v 6 h -6 Z M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3 M12 12V8",
    "category": "ui",
    "tags": "tree"
  },
  {
    "id": "newspaper",
    "char": "M15 18h-5 M18 14h-8 M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2 M 10 6 h 8 v 4 h -8 Z",
    "category": "ui",
    "tags": "news feed home magazine article headline"
  },
  {
    "id": "nfc",
    "char": "M6 8.32a7.43 7.43 0 0 1 0 7.36 M9.46 6.21a11.76 11.76 0 0 1 0 11.58 M12.91 4.1a15.91 15.91 0 0 1 .01 15.8 M16.37 2a20.16 20.16 0 0 1 0 20",
    "category": "ui",
    "tags": "contactless payment near-field communication"
  },
  {
    "id": "non-binary",
    "char": "M12 2v10 m8.5 4 7 4 m8.5 8 7-4 M 12, 17 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
    "category": "ui",
    "tags": "gender nonbinary enby"
  },
  {
    "id": "notebook-pen",
    "char": "M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4 M2 6h4 M2 10h4 M2 14h4 M2 18h4 M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
    "category": "files",
    "tags": "pencil notepad notes noted stationery sketchbook organizer organiser planner diary journal writing write written reading high school university college academy student study research homework eraser rubber"
  },
  {
    "id": "notebook-tabs",
    "char": "M2 6h4 M2 10h4 M2 14h4 M2 18h4 M 4 2 h 16 v 20 h -16 Z M15 2v20 M15 7h5 M15 12h5 M15 17h5",
    "category": "files",
    "tags": "notepad notes people family friends acquaintances contacts details addresses phone numbers directory listing networking alphabetical a-z organizer organiser planner diary stationery"
  },
  {
    "id": "notebook-text",
    "char": "M2 6h4 M2 10h4 M2 14h4 M2 18h4 M 4 2 h 16 v 20 h -16 Z M9.5 8h5 M9.5 12H16 M9.5 16H14",
    "category": "ui",
    "tags": "notepad notes pages paper stationery sketchbook organizer organiser planner diary journal writing write written reading high school university college academy student study research homework lines opened"
  },
  {
    "id": "notebook",
    "char": "M2 6h4 M2 10h4 M2 14h4 M2 18h4 M 4 2 h 16 v 20 h -16 Z M16 2v20",
    "category": "files",
    "tags": "notepad notes stationery sketchbook moleskine closure strap band elastic organizer organiser planner diary journal writing written writer reading high school university college academy student study homework research"
  },
  {
    "id": "notepad-text-dashed",
    "char": "M8 2v4 M12 2v4 M16 2v4 M16 4h2a2 2 0 0 1 2 2v2 M20 12v2 M20 18v2a2 2 0 0 1-2 2h-1 M13 22h-2 M7 22H6a2 2 0 0 1-2-2v-2 M4 14v-2 M4 8V6a2 2 0 0 1 2-2h2 M8 10h6 M8 14h8 M8 18h5",
    "category": "ui",
    "tags": "notebook notes pages paper stationery diary journal writing write written draft template lines"
  },
  {
    "id": "notepad-text",
    "char": "M8 2v4 M12 2v4 M16 2v4 M 4 4 h 16 v 18 h -16 Z M8 10h6 M8 14h8 M8 18h5",
    "category": "ui",
    "tags": "notebook notes pages paper stationery sketchbook organizer organiser planner diary journal writing write written reading high school university college academy student study homework research lines opened"
  },
  {
    "id": "nut-off",
    "char": "M12 4V2 M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592a7.01 7.01 0 0 0 4.125-2.939 M19 10v3.343 M12 12c-1.349-.573-1.905-1.005-2.5-2-.546.902-1.048 1.353-2.5 2-1.018-.644-1.46-1.08-2-2-1.028.71-1.69.918-3 1 1.081-1.048 1.757-2.03 2-3 .194-.776.84-1.551 1.79-2.21m11.654 5.997c.887-.457 1.28-.891 1.556-1.787 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4-.74 0-1.461.068-2.15.192",
    "category": "ui",
    "tags": "hazelnut acorn food allergy intolerance diet"
  },
  {
    "id": "nut",
    "char": "M12 4V2 M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592A7.003 7.003 0 0 0 19 14v-4 M12 4C8 4 4.5 6 4 8c-.243.97-.919 1.952-2 3 1.31-.082 1.972-.29 3-1 .54.92.982 1.356 2 2 1.452-.647 1.954-1.098 2.5-2 .595.995 1.151 1.427 2.5 2 1.31-.621 1.862-1.058 2.5-2 .629.977 1.162 1.423 2.5 2 1.209-.548 1.68-.967 2-2 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4Z",
    "category": "ui",
    "tags": "hazelnut acorn food diet"
  },
  {
    "id": "octagon-alert",
    "char": "M12 16h.01 M12 8v4 M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",
    "category": "ui",
    "tags": "warning alert danger exclamation mark"
  },
  {
    "id": "octagon-minus",
    "char": "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z M8 12h8",
    "category": "ui",
    "tags": "stop forbidden subtract remove decrease reduce - traffic halt restricted"
  },
  {
    "id": "octagon-pause",
    "char": "M10 15V9 M14 15V9 M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
    "category": "media",
    "tags": "music audio stop"
  },
  {
    "id": "octagon-x",
    "char": "m15 9-6 6 M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z m9 9 6 6",
    "category": "ui",
    "tags": "delete stop alert warning times clear math"
  },
  {
    "id": "octagon",
    "char": "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
    "category": "ui",
    "tags": "stop shape"
  },
  {
    "id": "omega",
    "char": "M3 20h4.5a.5.5 0 0 0 .5-.5v-.282a.52.52 0 0 0-.247-.437 8 8 0 1 1 8.494-.001.52.52 0 0 0-.247.438v.282a.5.5 0 0 0 .5.5H21",
    "category": "ui",
    "tags": "greek symbol mathematics education physics engineering ohms electrical resistance angular frequency dynamical systems astronomy constellations philosophy"
  },
  {
    "id": "option",
    "char": "M3 3h6l6 18h6 M14 3h7",
    "category": "ui",
    "tags": "keyboard key mac alt button"
  },
  {
    "id": "orbit",
    "char": "M20.341 6.484A10 10 0 0 1 10.266 21.85 M3.659 17.516A10 10 0 0 1 13.74 2.152 M 12, 12 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 19, 5 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 5, 19 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "planet space physics satellites moons"
  },
  {
    "id": "origami",
    "char": "M12 12V4a1 1 0 0 1 1-1h6.297a1 1 0 0 1 .651 1.759l-4.696 4.025 m12 21-7.414-7.414A2 2 0 0 1 4 12.172V6.415a1.002 1.002 0 0 1 1.707-.707L20 20.009 m12.214 3.381 8.414 14.966a1 1 0 0 1-.167 1.199l-1.168 1.163a1 1 0 0 1-.706.291H6.351a1 1 0 0 1-.625-.219L3.25 18.8a1 1 0 0 1 .631-1.781l4.165.027",
    "category": "ui",
    "tags": "paper bird"
  },
  {
    "id": "package-2",
    "char": "M12 3v6 M16.76 3a2 2 0 0 1 1.8 1.1l2.23 4.479a2 2 0 0 1 .21.891V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.472a2 2 0 0 1 .211-.894L5.45 4.1A2 2 0 0 1 7.24 3z M3.054 9.013h17.893",
    "category": "ui",
    "tags": "box container storage sealed packed unopened undelivered archive zip"
  },
  {
    "id": "package-check",
    "char": "M12 22V12 m16 17 2 2 4-4 M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753 M3.29 7 12 12l8.71-5 m7.5 4.27 8.997 5.148",
    "category": "ui",
    "tags": "confirm verified done todo tick complete task delivered"
  },
  {
    "id": "package-minus",
    "char": "M12 22V12 M16 17h6 M21 13V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.675-.955 M3.29 7 12 12l8.71-5 m7.5 4.27 8.997 5.148",
    "category": "ui",
    "tags": "delete remove"
  },
  {
    "id": "package-open",
    "char": "M12 22v-9 M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13 M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z",
    "category": "ui",
    "tags": "box container storage unpack unarchive unzip opened delivered"
  },
  {
    "id": "package-plus",
    "char": "M12 22V12 M16 17h6 M19 14v6 M21 10.535V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.675-.955 M3.29 7 12 12l8.71-5 m7.5 4.27 8.997 5.148",
    "category": "ui",
    "tags": "new add create"
  },
  {
    "id": "package-search",
    "char": "M12 22V12 M20.27 18.27 22 20 M21 10.498V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l.98-.559 M3.29 7 12 12l8.71-5 m7.5 4.27 8.997 5.148 M 18.5, 16.5 m -2.5, 0 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0",
    "category": "ui",
    "tags": "find product process lens"
  },
  {
    "id": "package-x",
    "char": "M12 22V12 m16.5 14.5 5 5 m16.5 19.5 5-5 M21 10.5V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l.13-.074 M3.29 7 12 12l8.71-5 m7.5 4.27 8.997 5.148",
    "category": "ui",
    "tags": "delete remove"
  },
  {
    "id": "package",
    "char": "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z M12 22V12 m7.5 4.27 9 5.15",
    "category": "ui",
    "tags": "box container storage sealed delivery undelivered unopened packed archive zip module"
  },
  {
    "id": "paint-bucket",
    "char": "M11 7 6 2 M18.992 12H2.041 M21.145 18.38A3.34 3.34 0 0 1 20 16.5a3.3 3.3 0 0 1-1.145 1.88c-.575.46-.855 1.02-.855 1.595A2 2 0 0 0 20 22a2 2 0 0 0 2-2.025c0-.58-.285-1.13-.855-1.595 m8.5 4.5 2.148-2.148a1.205 1.205 0 0 1 1.704 0l7.296 7.296a1.205 1.205 0 0 1 0 1.704l-7.592 7.592a3.615 3.615 0 0 1-5.112 0l-3.888-3.888a3.615 3.615 0 0 1 0-5.112L5.67 7.33",
    "category": "ui",
    "tags": "fill paint bucket color colour"
  },
  {
    "id": "paint-roller",
    "char": "M 2 2 h 16 v 6 h -16 Z M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2 M 8 16 h 4 v 6 h -4 Z",
    "category": "ui",
    "tags": "brush color colour decoration diy"
  },
  {
    "id": "paintbrush-vertical",
    "char": "M10 2v2 M14 2v4 M17 2a1 1 0 0 1 1 1v9H6V3a1 1 0 0 1 1-1z M6 12a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v2.9a2 2 0 1 0 4 0V17a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1",
    "category": "ui",
    "tags": "brush paintbrush design color colour decoration diy"
  },
  {
    "id": "paintbrush",
    "char": "m14.622 17.897-10.68-2.913 M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15",
    "category": "ui",
    "tags": "brush paintbrush design color colour decoration diy"
  },
  {
    "id": "palette",
    "char": "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z M 13.5, 6.5 m -.5, 0 a .5,.5 0 1,0 1,0 a .5,.5 0 1,0 -1,0 M 17.5, 10.5 m -.5, 0 a .5,.5 0 1,0 1,0 a .5,.5 0 1,0 -1,0 M 6.5, 12.5 m -.5, 0 a .5,.5 0 1,0 1,0 a .5,.5 0 1,0 -1,0 M 8.5, 7.5 m -.5, 0 a .5,.5 0 1,0 1,0 a .5,.5 0 1,0 -1,0",
    "category": "ui",
    "tags": "colors colours theme scheme paint watercolor watercolour artist"
  },
  {
    "id": "panda",
    "char": "M11.25 17.25h1.5L12 18z m15 12 2 2 M18 6.5a.5.5 0 0 0-.5-.5 M20.69 9.67a4.5 4.5 0 1 0-7.04-5.5 8.35 8.35 0 0 0-3.3 0 4.5 4.5 0 1 0-7.04 5.5C2.49 11.2 2 12.88 2 14.5 2 19.47 6.48 22 12 22s10-2.53 10-7.5c0-1.62-.48-3.3-1.3-4.83 M6 6.5a.495.495 0 0 1 .5-.5 m9 12-2 2",
    "category": "ui",
    "tags": "animal wildlife bear zoo bamboo"
  },
  {
    "id": "panel-bottom-close",
    "char": "M 3 3 h 18 v 18 h -18 Z M3 15h18 m15 8-3 3-3-3",
    "category": "ui",
    "tags": "drawer dock hide chevron down"
  },
  {
    "id": "panel-bottom-dashed",
    "char": "M 3 3 h 18 v 18 h -18 Z M14 15h1 M19 15h2 M3 15h2 M9 15h1",
    "category": "ui",
    "tags": "drawer dock show reveal padding margin guide layout bleed"
  },
  {
    "id": "panel-bottom-open",
    "char": "M 3 3 h 18 v 18 h -18 Z M3 15h18 m9 10 3-3 3 3",
    "category": "ui",
    "tags": "drawer dock show reveal chevron up"
  },
  {
    "id": "panel-bottom",
    "char": "M 3 3 h 18 v 18 h -18 Z M3 15h18",
    "category": "ui",
    "tags": "drawer dock"
  },
  {
    "id": "panel-left-close",
    "char": "M 3 3 h 18 v 18 h -18 Z M9 3v18 m16 15-3-3 3-3",
    "category": "ui",
    "tags": "primary drawer hide chevron <"
  },
  {
    "id": "panel-left-dashed",
    "char": "M 3 3 h 18 v 18 h -18 Z M9 14v1 M9 19v2 M9 3v2 M9 9v1",
    "category": "ui",
    "tags": "sidebar primary drawer show reveal padding margin guide layout bleed"
  },
  {
    "id": "panel-left-open",
    "char": "M 3 3 h 18 v 18 h -18 Z M9 3v18 m14 9 3 3-3 3",
    "category": "ui",
    "tags": "primary drawer show reveal chevron right >"
  },
  {
    "id": "panel-left-right-dashed",
    "char": "M15 10V9 M15 15v-1 M15 21v-2 M15 5V3 M9 10V9 M9 15v-1 M9 21v-2 M9 5V3 M 3 3 h 18 v 18 h -18 Z",
    "category": "ui",
    "tags": "sidebar primary drawer show reveal padding margin guide layout vertical bleed"
  },
  {
    "id": "panel-left",
    "char": "M 3 3 h 18 v 18 h -18 Z M9 3v18",
    "category": "ui",
    "tags": "primary drawer"
  },
  {
    "id": "panel-right-close",
    "char": "M 3 3 h 18 v 18 h -18 Z M15 3v18 m8 9 3 3-3 3",
    "category": "ui",
    "tags": "sidebar secondary drawer hide chevron >"
  },
  {
    "id": "panel-right-dashed",
    "char": "M 3 3 h 18 v 18 h -18 Z M15 14v1 M15 19v2 M15 3v2 M15 9v1",
    "category": "ui",
    "tags": "sidebar secondary drawer show reveal padding margin guide layout bleed"
  },
  {
    "id": "panel-right-open",
    "char": "M 3 3 h 18 v 18 h -18 Z M15 3v18 m10 15-3-3 3-3",
    "category": "ui",
    "tags": "sidebar secondary drawer show reveal chevron left <"
  },
  {
    "id": "panel-right",
    "char": "M 3 3 h 18 v 18 h -18 Z M15 3v18",
    "category": "ui",
    "tags": "sidebar secondary drawer"
  },
  {
    "id": "panel-top-bottom-dashed",
    "char": "M14 15h1 M14 9h1 M19 15h2 M19 9h2 M3 15h2 M3 9h2 M9 15h1 M9 9h1 M 3 3 h 18 v 18 h -18 Z",
    "category": "ui",
    "tags": "sidebar primary drawer show reveal padding margin guide layout horizontal bleed"
  },
  {
    "id": "panel-top-close",
    "char": "M 3 3 h 18 v 18 h -18 Z M3 9h18 m9 16 3-3 3 3",
    "category": "ui",
    "tags": "menu bar drawer hide chevron up"
  },
  {
    "id": "panel-top-dashed",
    "char": "M 3 3 h 18 v 18 h -18 Z M14 9h1 M19 9h2 M3 9h2 M9 9h1",
    "category": "ui",
    "tags": "menu bar drawer show reveal padding margin guide layout bleed"
  },
  {
    "id": "panel-top-open",
    "char": "M 3 3 h 18 v 18 h -18 Z M3 9h18 m15 14-3 3-3-3",
    "category": "ui",
    "tags": "menu bar drawer show reveal chevron down"
  },
  {
    "id": "panel-top",
    "char": "M 3 3 h 18 v 18 h -18 Z M3 9h18",
    "category": "ui",
    "tags": "drawer browser webpage"
  },
  {
    "id": "panels-left-bottom",
    "char": "M 3 3 h 18 v 18 h -18 Z M9 3v18 M9 15h12",
    "category": "ui",
    "tags": "drawers sidebar primary"
  },
  {
    "id": "panels-right-bottom",
    "char": "M 3 3 h 18 v 18 h -18 Z M3 15h12 M15 3v18",
    "category": "ui",
    "tags": "drawers sidebar secondary"
  },
  {
    "id": "panels-top-left",
    "char": "M 3 3 h 18 v 18 h -18 Z M3 9h18 M9 21V9",
    "category": "ui",
    "tags": "menu bar sidebar primary drawers window webpage projects overview"
  },
  {
    "id": "paperclip",
    "char": "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
    "category": "ui",
    "tags": "attachment file"
  },
  {
    "id": "parentheses",
    "char": "M8 21s-4-3-4-9 4-9 4-9 M16 3s4 3 4 9-4 9-4 9",
    "category": "ui",
    "tags": "code token parenthesis parens brackets parameters arguments args input call math formula function ( )"
  },
  {
    "id": "parking-meter",
    "char": "M11 15h2 M12 12v3 M12 19v3 M15.282 19a1 1 0 0 0 .948-.68l2.37-6.988a7 7 0 1 0-13.2 0l2.37 6.988a1 1 0 0 0 .948.68z M9 9a3 3 0 1 1 6 0",
    "category": "ui",
    "tags": "driving car park pay sidewalk pavement"
  },
  {
    "id": "party-popper",
    "char": "M5.8 11.3 2 22l10.7-3.79 M4 3h.01 M22 8h.01 M15 2h.01 M22 20h.01 m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10 m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17 m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7 M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z",
    "category": "ui",
    "tags": "emoji congratulations celebration party tada 🎉 🎊 excitement exciting excites confetti"
  },
  {
    "id": "pause",
    "char": "M 14 3 h 5 v 18 h -5 Z M 5 3 h 5 v 18 h -5 Z",
    "category": "media",
    "tags": "music stop"
  },
  {
    "id": "paw-print",
    "char": "M 11, 4 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 18, 8 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 20, 16 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z",
    "category": "ui",
    "tags": "pets vets veterinarian domesticated cat dog bear"
  },
  {
    "id": "pc-case",
    "char": "M 5 2 h 14 v 20 h -14 Z M15 14h.01 M9 6h6 M9 10h6",
    "category": "ui",
    "tags": "computer chassis"
  },
  {
    "id": "pen-line",
    "char": "M13 21h8 M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
    "category": "ui",
    "tags": "pencil change create draw writer writing biro ink marker felt tip stationery artist"
  },
  {
    "id": "pen-off",
    "char": "m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982 m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353 m2 2 20 20",
    "category": "ui",
    "tags": "disabled inactive non-editable locked read-only unmodifiable frozen restricted pencil change create draw writer writing biro ink marker felt tip stationery artist"
  },
  {
    "id": "pen-tool",
    "char": "M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18 m2.3 2.3 7.286 7.286 M 11, 11 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "vector drawing path"
  },
  {
    "id": "pen",
    "char": "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
    "category": "ui",
    "tags": "pencil change create draw writer writing biro ink marker felt tip stationery artist"
  },
  {
    "id": "pencil-line",
    "char": "M13 21h8 m15 5 4 4 M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
    "category": "ui",
    "tags": "pencil change create draw sketch draft writer writing biro ink marker felt tip stationery artist"
  },
  {
    "id": "pencil-off",
    "char": "m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982 m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353 m15 5 4 4 m2 2 20 20",
    "category": "ui",
    "tags": "disabled inactive non-editable locked read-only unmodifiable frozen restricted rubber edit create draw sketch draft writer writing stationery artist"
  },
  {
    "id": "pencil-ruler",
    "char": "M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13 m8 6 2-2 m18 16 2-2 m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17 M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z m15 5 4 4",
    "category": "ui",
    "tags": "edit create draw sketch draft writer writing stationery artist measurements centimeters cm millimeters mm metre foot feet inches units size length width height dimensions depth breadth extent"
  },
  {
    "id": "pencil",
    "char": "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z m15 5 4 4",
    "category": "ui",
    "tags": "rubber edit create draw sketch draft writer writing stationery artist"
  },
  {
    "id": "pentagon",
    "char": "M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z",
    "category": "ui",
    "tags": "shape"
  },
  {
    "id": "percent",
    "char": "M 6.5, 6.5 m -2.5, 0 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0 M 17.5, 17.5 m -2.5, 0 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0",
    "category": "ui",
    "tags": "percentage modulo modulus remainder % sale discount offer marketing"
  },
  {
    "id": "person-standing",
    "char": "M 12, 5 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 m9 20 3-6 3 6 m6 8 6 2 6-2 M12 10v4",
    "category": "ui",
    "tags": "people human accessibility stick figure"
  },
  {
    "id": "philippine-peso",
    "char": "M20 11H4 M20 7H4 M7 21V4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 12H7",
    "category": "ui",
    "tags": "currency peso money php"
  },
  {
    "id": "phone-call",
    "char": "M13 2a9 9 0 0 1 9 9 M13 6a5 5 0 0 1 5 5 M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
    "category": "communication",
    "tags": "ring"
  },
  {
    "id": "phone-forwarded",
    "char": "M14 6h8 m18 2 4 4-4 4 M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
    "category": "communication",
    "tags": "call"
  },
  {
    "id": "phone-incoming",
    "char": "M16 2v6h6 m22 2-6 6 M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
    "category": "communication",
    "tags": "call"
  },
  {
    "id": "phone-missed",
    "char": "m16 2 6 6 m22 2-6 6 M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
    "category": "communication",
    "tags": "call"
  },
  {
    "id": "phone-off",
    "char": "M10.1 13.9a14 14 0 0 0 3.732 2.668 1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2 18 18 0 0 1-12.728-5.272 M22 2 2 22 M4.76 13.582A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 .244.473",
    "category": "communication",
    "tags": "call mute"
  },
  {
    "id": "phone-outgoing",
    "char": "m16 8 6-6 M22 8V2h-6 M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
    "category": "communication",
    "tags": "call"
  },
  {
    "id": "phone",
    "char": "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
    "category": "communication",
    "tags": "call"
  },
  {
    "id": "pi",
    "char": "M4 7c0-1.7 1.3-3 3-3h13 M18 20c-1.7 0-3-1.3-3-3V4",
    "category": "ui",
    "tags": "constant code coding programming symbol trigonometry geometry formula"
  },
  {
    "id": "piano",
    "char": "M18.5 8c-1.4 0-2.6-.8-3.2-2A6.87 6.87 0 0 0 2 9v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8.5C22 9.6 20.4 8 18.5 8 M2 14h20 M6 14v4 M10 14v4 M14 14v4 M18 14v4",
    "category": "ui",
    "tags": "music audio sound noise notes chord keys octave acoustic instrument play pianist performance concert"
  },
  {
    "id": "pickaxe",
    "char": "m14 13-8.381 8.38a1 1 0 0 1-3.001-3L11 9.999 M15.973 4.027A13 13 0 0 0 5.902 2.373c-1.398.342-1.092 2.158.277 2.601a19.9 19.9 0 0 1 5.822 3.024 M16.001 11.999a19.9 19.9 0 0 1 3.024 5.824c.444 1.369 2.26 1.676 2.603.278A13 13 0 0 0 20 8.069 M18.352 3.352a1.205 1.205 0 0 0-1.704 0l-5.296 5.296a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l5.296-5.296a1.205 1.205 0 0 0 0-1.704z",
    "category": "ui",
    "tags": "mining mine land worker extraction labor construction progress advancement crafting building creation"
  },
  {
    "id": "picture-in-picture-2",
    "char": "M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4 M 12 13 h 10 v 7 h -10 Z",
    "category": "ui",
    "tags": "display play video pop out always on top window inset multitask"
  },
  {
    "id": "picture-in-picture",
    "char": "M2 10h6V4 m2 4 6 6 M21 10V7a2 2 0 0 0-2-2h-7 M3 14v2a2 2 0 0 0 2 2h3 M 12 14 h 10 v 7 h -10 Z",
    "category": "ui",
    "tags": "display play video pop out always on top window inset multitask"
  },
  {
    "id": "piggy-bank",
    "char": "M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z M16 10h.01 M2 8v1a2 2 0 0 0 2 2h1",
    "category": "ui",
    "tags": "money savings"
  },
  {
    "id": "pilcrow-left",
    "char": "M14 3v11 M14 9h-3a3 3 0 0 1 0-6h9 M18 3v11 M22 18H2l4-4 m6 22-4-4",
    "category": "ui",
    "tags": "direction paragraph mark paraph blind typography type text prose symbol"
  },
  {
    "id": "pilcrow-right",
    "char": "M10 3v11 M10 9H7a1 1 0 0 1 0-6h8 M14 3v11 m18 14 4 4H2 m22 18-4 4",
    "category": "ui",
    "tags": "direction paragraph mark paraph blind typography type text prose symbol"
  },
  {
    "id": "pilcrow",
    "char": "M13 4v16 M17 4v16 M19 4H9.5a4.5 4.5 0 0 0 0 9H13",
    "category": "ui",
    "tags": "paragraph mark paraph blind typography type text prose symbol"
  },
  {
    "id": "pill-bottle",
    "char": "M18 11h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4 M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7 M 4 2 h 16 v 5 h -16 Z",
    "category": "ui",
    "tags": "medicine medication prescription drug supplement vitamin capsule jar container healthcare pharmaceutical tablet"
  },
  {
    "id": "pill",
    "char": "m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z m8.5 8.5 7 7",
    "category": "ui",
    "tags": "medicine medication drug prescription tablet pharmacy"
  },
  {
    "id": "pin-off",
    "char": "M12 17v5 M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89 m2 2 20 20 M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11",
    "category": "ui",
    "tags": "unpin map unlock unfix unsave remove"
  },
  {
    "id": "pin",
    "char": "M12 17v5 M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",
    "category": "ui",
    "tags": "save map lock fix"
  },
  {
    "id": "pipette",
    "char": "m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12 m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z m2 22 .414-.414",
    "category": "ui",
    "tags": "eye dropper color picker lab chemistry"
  },
  {
    "id": "pizza",
    "char": "m12 14-1 1 m13.75 18.25-1.25 1.42 M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12 M18.8 9.3a1 1 0 0 0 2.1 7.7 M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z",
    "category": "ui",
    "tags": "pie quiche food"
  },
  {
    "id": "plane-landing",
    "char": "M2 22h20 M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z",
    "category": "ui",
    "tags": "arrival plane trip airplane landing"
  },
  {
    "id": "plane-takeoff",
    "char": "M2 22h20 M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z",
    "category": "ui",
    "tags": "departure plane trip airplane takeoff"
  },
  {
    "id": "plane",
    "char": "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
    "category": "ui",
    "tags": "plane trip airplane"
  },
  {
    "id": "play",
    "char": "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
    "category": "media",
    "tags": "music audio video start run"
  },
  {
    "id": "plug-2",
    "char": "M9 2v6 M15 2v6 M12 17v5 M5 8h14 M6 11V8h12v3a6 6 0 1 1-12 0Z",
    "category": "ui",
    "tags": "electricity energy socket outlet"
  },
  {
    "id": "plug-zap",
    "char": "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z m2 22 3-3 M7.5 13.5 10 11 M10.5 16.5 13 14 m18 3-4 4h6l-4 4",
    "category": "ui",
    "tags": "electricity energy electronics charge charging battery connect"
  },
  {
    "id": "plug",
    "char": "M12 22v-5 M15 8V2 M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z M9 8V2",
    "category": "ui",
    "tags": "electricity energy electronics socket outlet power voltage current charger"
  },
  {
    "id": "plus",
    "char": "M5 12h14 M12 5v14",
    "category": "ui",
    "tags": "add new increase increment positive calculate toolbar crosshair aim target scope sight reticule maximum upgrade extra +"
  },
  {
    "id": "pocket-knife",
    "char": "M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2 M18 6h.01 M6 18h.01 M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z M18 11.66V22a4 4 0 0 0 4-4V6",
    "category": "ui",
    "tags": "swiss army knife penknife multi-tool multitask blade cutter gadget corkscrew"
  },
  {
    "id": "pocket",
    "char": "M20 3a2 2 0 0 1 2 2v6a1 1 0 0 1-20 0V5a2 2 0 0 1 2-2z m8 10 4 4 4-4",
    "category": "ui",
    "tags": "logo save"
  },
  {
    "id": "podcast",
    "char": "M13 17a1 1 0 1 0-2 0l.5 4.5a0.5 0.5 0 0 0 1 0z M16.85 18.58a9 9 0 1 0-9.7 0 M8 14a5 5 0 1 1 8 0 M 12, 11 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0",
    "category": "ui",
    "tags": "audio music mic talk voice subscribe subscription stream"
  },
  {
    "id": "pointer-off",
    "char": "M10 4.5V4a2 2 0 0 0-2.41-1.957 M13.9 8.4a2 2 0 0 0-1.26-1.295 M21.7 16.2A8 8 0 0 0 22 14v-3a2 2 0 1 0-4 0v-1a2 2 0 0 0-3.63-1.158 m7 15-1.8-1.8a2 2 0 0 0-2.79 2.86L6 19.7a7.74 7.74 0 0 0 6 2.3h2a8 8 0 0 0 5.657-2.343 M6 6v8 m2 2 20 20",
    "category": "ui",
    "tags": "mouse"
  },
  {
    "id": "pointer",
    "char": "M22 14a8 8 0 0 1-8 8 M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2 M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1 M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10 M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",
    "category": "ui",
    "tags": "mouse"
  },
  {
    "id": "popcorn",
    "char": "M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4 M10 22 9 8 m14 22 1-14 M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z",
    "category": "ui",
    "tags": "cinema movies films salted sweet sugar candy snack"
  },
  {
    "id": "popsicle",
    "char": "M18.6 14.4c.8-.8.8-2 0-2.8l-8.1-8.1a4.95 4.95 0 1 0-7.1 7.1l8.1 8.1c.9.7 2.1.7 2.9-.1Z m22 22-5.5-5.5",
    "category": "ui",
    "tags": "ice lolly ice cream sweet food"
  },
  {
    "id": "pound-sterling",
    "char": "M18 7c0-5.333-8-5.333-8 0 M10 7v14 M6 21h12 M6 13h10",
    "category": "ui",
    "tags": "currency money payment"
  },
  {
    "id": "power-off",
    "char": "M18.36 6.64A9 9 0 0 1 20.77 15 M6.16 6.16a9 9 0 1 0 12.68 12.68 M12 2v4 m2 2 20 20",
    "category": "ui",
    "tags": "on off device switch"
  },
  {
    "id": "power",
    "char": "M12 2v10 M18.4 6.6a9 9 0 1 1-12.77.04",
    "category": "ui",
    "tags": "on off device switch toggle binary boolean reboot restart button keyboard troubleshoot"
  },
  {
    "id": "presentation",
    "char": "M2 3h20 M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3 m7 21 5-5 5 5",
    "category": "ui",
    "tags": "screen whiteboard marker pens markers blackboard chalk easel school learning lesson office meeting project planning"
  },
  {
    "id": "printer-check",
    "char": "M13.5 22H7a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v.5 m16 19 2 2 4-4 M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2 M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",
    "category": "ui",
    "tags": "fax office device success printed"
  },
  {
    "id": "printer-x",
    "char": "M12.531 22H7a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h6.377 m16.5 16.5 5 5 m16.5 21.5 5-5 M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.5 M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",
    "category": "ui",
    "tags": "fax office device cross cancel remove error"
  },
  {
    "id": "printer",
    "char": "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2 M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6 M 6 14 h 12 v 8 h -12 Z",
    "category": "ui",
    "tags": "fax office device"
  },
  {
    "id": "projector",
    "char": "M5 7 3 5 M9 6V3 m13 7 2-2 M 9, 13 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17 M16 16h2",
    "category": "ui",
    "tags": "cinema film movie home video presentation slideshow office meeting project planning"
  },
  {
    "id": "proportions",
    "char": "M 2 4 h 20 v 16 h -20 Z M12 9v11 M2 9h13a2 2 0 0 1 2 2v9",
    "category": "ui",
    "tags": "screens sizes rotate rotation adjust aspect ratio 16:9 widescreen 4:3 resolution responsive mobile desktop dimensions monitor orientation portrait landscape"
  },
  {
    "id": "puzzle",
    "char": "M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z",
    "category": "ui",
    "tags": "component module part piece"
  },
  {
    "id": "pyramid",
    "char": "M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0Z M12 2v20",
    "category": "ui",
    "tags": "prism triangle triangular hierarchy structure geometry ancient egyptian landmark tourism"
  },
  {
    "id": "qr-code",
    "char": "M 3 3 h 5 v 5 h -5 Z M 16 3 h 5 v 5 h -5 Z M 3 16 h 5 v 5 h -5 Z M21 16h-3a2 2 0 0 0-2 2v3 M21 21v.01 M12 7v3a2 2 0 0 1-2 2H7 M3 12h.01 M12 3h.01 M12 16v.01 M16 12h1 M21 12v.01 M12 21v-1",
    "category": "ui",
    "tags": "barcode scan link url information digital"
  },
  {
    "id": "quote",
    "char": "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
    "category": "ui",
    "tags": "quotation"
  },
  {
    "id": "rabbit",
    "char": "M13 16a3 3 0 0 1 2.24 5 M18 12h.01 M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3 M20 8.54V4a2 2 0 1 0-4 0v3 M7.612 12.524a3 3 0 1 0-1.6 4.3",
    "category": "ui",
    "tags": "animal rodent pet pest bunny hare fast speed hop"
  },
  {
    "id": "radar",
    "char": "M19.07 4.93A10 10 0 0 0 6.99 3.34 M4 6h.01 M2.29 9.62A10 10 0 1 0 21.31 8.35 M16.24 7.76A6 6 0 1 0 8.23 16.67 M12 18h.01 M17.99 11.66A6 6 0 0 1 15.77 16.67 M 12, 12 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 m13.41 10.59 5.66-5.66",
    "category": "ui",
    "tags": "scan sonar detect find locate"
  },
  {
    "id": "radiation",
    "char": "M12 12h.01 M14 15.4641a4 4 0 0 1-4 0L7.52786 19.74597 A 1 1 0 0 0 7.99303 21.16211 10 10 0 0 0 16.00697 21.16211 1 1 0 0 0 16.47214 19.74597z M16 12a4 4 0 0 0-2-3.464l2.472-4.282a1 1 0 0 1 1.46-.305 10 10 0 0 1 4.006 6.94A1 1 0 0 1 21 12z M8 12a4 4 0 0 1 2-3.464L7.528 4.254a1 1 0 0 0-1.46-.305 10 10 0 0 0-4.006 6.94A1 1 0 0 0 3 12z",
    "category": "ui",
    "tags": "radioactive nuclear fallout waste atomic physics particle element molecule"
  },
  {
    "id": "radical",
    "char": "M3 12h3.28a1 1 0 0 1 .948.684l2.298 7.934a.5.5 0 0 0 .96-.044L13.82 4.771A1 1 0 0 1 14.792 4H21",
    "category": "ui",
    "tags": "calculate formula math operator root square symbol"
  },
  {
    "id": "radio-receiver",
    "char": "M5 16v2 M19 16v2 M 2 8 h 20 v 8 h -20 Z M18 12h.01",
    "category": "ui",
    "tags": "device music connect"
  },
  {
    "id": "radio-tower",
    "char": "M4.9 16.1C1 12.2 1 5.8 4.9 1.9 M7.8 4.7a6.14 6.14 0 0 0-.8 7.5 M 12, 9 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M16.2 4.8c2 2 2.26 5.11.8 7.47 M19.1 1.9a9.96 9.96 0 0 1 0 14.1 M9.5 18h5 m8 22 4-11 4 11",
    "category": "ui",
    "tags": "signal broadcast connectivity live frequency"
  },
  {
    "id": "radio",
    "char": "M16.247 7.761a6 6 0 0 1 0 8.478 M19.075 4.933a10 10 0 0 1 0 14.134 M4.925 19.067a10 10 0 0 1 0-14.134 M7.753 16.239a6 6 0 0 1 0-8.478 M 12, 12 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "signal broadcast connectivity live frequency"
  },
  {
    "id": "radius",
    "char": "M20.34 17.52a10 10 0 1 0-2.82 2.82 M 19, 19 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 m13.41 13.41 4.18 4.18 M 12, 12 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "shape circle geometry trigonometry radii calculate measure size"
  },
  {
    "id": "rail-symbol",
    "char": "M5 15h14 M5 9h14 m14 20-5-5 6-6-5-5",
    "category": "ui",
    "tags": "railway train track line"
  },
  {
    "id": "rainbow",
    "char": "M22 17a10 10 0 0 0-20 0 M6 17a6 6 0 0 1 12 0 M10 17a2 2 0 0 1 4 0",
    "category": "ui",
    "tags": "colors colours spectrum light prism arc clear sunshine"
  },
  {
    "id": "rat",
    "char": "M13 22H4a2 2 0 0 1 0-4h12 M13.236 18a3 3 0 0 0-2.2-5 M16 9h.01 M16.82 3.94a3 3 0 1 1 3.237 4.868l1.815 2.587a1.5 1.5 0 0 1-1.5 2.1l-2.872-.453a3 3 0 0 0-3.5 3 M17 4.988a3 3 0 1 0-5.2 2.052A7 7 0 0 0 4 14.015 4 4 0 0 0 8 18",
    "category": "ui",
    "tags": "mouse mice gerbil rodent pet pest plague disease"
  },
  {
    "id": "ratio",
    "char": "M 6 2 h 12 v 20 h -12 Z M 2 6 h 20 v 12 h -20 Z",
    "category": "ui",
    "tags": "screens sizes rotate rotation adjust aspect ratio proportions 16:9 widescreen 4:3 resolution responsive mobile desktop dimensions monitor orientation portrait landscape"
  },
  {
    "id": "receipt-cent",
    "char": "M12 7v10 M14.828 14.829a4 4 0 0 1-5.656 0 4 4 0 0 1 0-5.657 4 4 0 0 1 5.656 0 M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z",
    "category": "ui",
    "tags": "bill voucher slip check counterfoil currency cents dollar usd $ ¢"
  },
  {
    "id": "receipt-euro",
    "char": "M15.828 14.829a4 4 0 0 1-5.656 0 4 4 0 0 1 0-5.657 4 4 0 0 1 5.656 0 M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z M8 12h5",
    "category": "ui",
    "tags": "bill voucher slip check counterfoil currency €"
  },
  {
    "id": "receipt-indian-rupee",
    "char": "M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z M8 11h8 M8 7h8 M9 7a4 4 0 0 1 0 8H8l3 2",
    "category": "ui",
    "tags": "bill voucher slip check counterfoil currency inr ₹"
  },
  {
    "id": "receipt-japanese-yen",
    "char": "m12 10 3-3 M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z M9 11h6 M9 15h6 m9 7 3 3v7",
    "category": "ui",
    "tags": "bill voucher slip check counterfoil currency jpy ¥"
  },
  {
    "id": "receipt-pound-sterling",
    "char": "M10 17V9.5a1 1 0 0 1 5 0 M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z M8 13h5 M8 17h7",
    "category": "ui",
    "tags": "bill voucher slip check counterfoil british currency gbp £"
  },
  {
    "id": "receipt-russian-ruble",
    "char": "M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z M8 11h5a2 2 0 0 0 0-4h-3v10 M8 15h5",
    "category": "ui",
    "tags": "bill voucher slip check counterfoil currency rub ₽"
  },
  {
    "id": "receipt-swiss-franc",
    "char": "M10 11h4 M10 17V7h5 M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z M8 15h5",
    "category": "ui",
    "tags": "bill voucher slip check counterfoil currency chf ₣"
  },
  {
    "id": "receipt-text",
    "char": "M13 16H8 M14 8H8 M16 12H8 M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z",
    "category": "ui",
    "tags": "bill voucher slip check counterfoil details small print terms conditions contract"
  },
  {
    "id": "receipt-turkish-lira",
    "char": "M10 7v10a5 5 0 0 0 5-5 m14 8-6 3 M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z",
    "category": "ui",
    "tags": "bill voucher slip check counterfoil currency try ₺"
  },
  {
    "id": "receipt",
    "char": "M12 17V7 M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8 M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z",
    "category": "ui",
    "tags": "bill voucher slip check counterfoil currency dollar usd $"
  },
  {
    "id": "rectangle-circle",
    "char": "M14 4v16H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z M 14, 12 m -8, 0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
    "category": "ui",
    "tags": "compose keyboard key button"
  },
  {
    "id": "rectangle-ellipsis",
    "char": "M 2 6 h 20 v 12 h -20 Z M12 12h.01 M17 12h.01 M7 12h.01",
    "category": "ui",
    "tags": "login password authenticate 2fa field fill ellipsis et cetera etc loader loading progress pending throbber menu options operator code spread rest more further extra overflow dots … ..."
  },
  {
    "id": "rectangle-goggles",
    "char": "M20 6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-1.6-.8l-1.6-2.13a1 1 0 0 0-1.6 0L9.6 17.2A2 2 0 0 1 8 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
    "category": "ui",
    "tags": "vr virtual augmented reality headset goggles"
  },
  {
    "id": "rectangle-horizontal",
    "char": "M 2 6 h 20 v 12 h -20 Z",
    "category": "ui",
    "tags": "rectangle aspect ratio 16:9 horizontal shape"
  },
  {
    "id": "rectangle-vertical",
    "char": "M 6 2 h 12 v 20 h -12 Z",
    "category": "ui",
    "tags": "rectangle aspect ratio 9:16 vertical shape"
  },
  {
    "id": "recycle",
    "char": "M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5 M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12 m14 16-3 3 3 3 M8.293 13.596 7.196 9.5 3.1 10.598 m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843 m13.378 9.633 4.096 1.098 1.097-4.096",
    "category": "ui",
    "tags": "sustainability salvage arrows"
  },
  {
    "id": "redo-2",
    "char": "m15 14 5-5-5-5 M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13",
    "category": "ui",
    "tags": "undo rerun history"
  },
  {
    "id": "redo-dot",
    "char": "M 12, 17 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M21 7v6h-6 M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7",
    "category": "ui",
    "tags": "redo history step over forward"
  },
  {
    "id": "redo",
    "char": "M21 7v6h-6 M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7",
    "category": "ui",
    "tags": "undo rerun history"
  },
  {
    "id": "refresh-ccw-dot",
    "char": "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8 M3 3v5h5 M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16 M16 16h5v5 M 12, 12 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0",
    "category": "arrows",
    "tags": "arrows rotate reload synchronise synchronize circular cycle issue code coding version control"
  },
  {
    "id": "refresh-ccw",
    "char": "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8 M3 3v5h5 M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16 M16 16h5v5",
    "category": "arrows",
    "tags": "arrows rotate reload rerun synchronise synchronize circular cycle"
  },
  {
    "id": "refresh-cw-off",
    "char": "M21 8L18.74 5.74A9.75 9.75 0 0 0 12 3C11 3 10.03 3.16 9.13 3.47 M8 16H3v5 M3 12C3 9.51 4 7.26 5.64 5.64 m3 16 2.26 2.26A9.75 9.75 0 0 0 12 21c2.49 0 4.74-1 6.36-2.64 M21 12c0 1-.16 1.97-.47 2.87 M21 3v5h-5 M22 22 2 2",
    "category": "arrows",
    "tags": "rotate reload rerun synchronise synchronize arrows circular cycle cancel no stop error disconnect ignore"
  },
  {
    "id": "refresh-cw",
    "char": "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8 M21 3v5h-5 M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16 M8 16H3v5",
    "category": "arrows",
    "tags": "rotate reload rerun synchronise synchronize arrows circular cycle"
  },
  {
    "id": "refrigerator",
    "char": "M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z M5 10h14 M15 7v6",
    "category": "ui",
    "tags": "frigerator fridge freezer cooler icebox chiller cold storage"
  },
  {
    "id": "regex",
    "char": "M17 3v10 m12.67 5.5 8.66 5 m12.67 10.5 8.66-5 M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z",
    "category": "ui",
    "tags": "search text code"
  },
  {
    "id": "remove-formatting",
    "char": "M4 7V4h16v3 M5 20h6 M13 4 8 20 m15 15 5 5 m20 15-5 5",
    "category": "arrows",
    "tags": "text font typography format x remove delete times clear"
  },
  {
    "id": "repeat-1",
    "char": "m17 2 4 4-4 4 M3 11v-1a4 4 0 0 1 4-4h14 m7 22-4-4 4-4 M21 13v1a4 4 0 0 1-4 4H3 M11 10h1v4",
    "category": "arrows",
    "tags": "replay"
  },
  {
    "id": "repeat-2",
    "char": "m2 9 3-3 3 3 M13 18H7a2 2 0 0 1-2-2V6 m22 15-3 3-3-3 M11 6h6a2 2 0 0 1 2 2v10",
    "category": "arrows",
    "tags": "arrows retweet repost share repeat loop"
  },
  {
    "id": "repeat",
    "char": "m17 2 4 4-4 4 M3 11v-1a4 4 0 0 1 4-4h14 m7 22-4-4 4-4 M21 13v1a4 4 0 0 1-4 4H3",
    "category": "arrows",
    "tags": "loop arrows"
  },
  {
    "id": "replace-all",
    "char": "M14 14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1 M14 4a1 1 0 0 1 1-1 M15 10a1 1 0 0 1-1-1 M19 14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1 M21 4a1 1 0 0 0-1-1 M21 9a1 1 0 0 1-1 1 m3 7 3 3 3-3 M6 10V5a2 2 0 0 1 2-2h2 M 3 14 h 7 v 7 h -7 Z",
    "category": "ui",
    "tags": "search substitute swap change"
  },
  {
    "id": "replace",
    "char": "M14 4a1 1 0 0 1 1-1 M15 10a1 1 0 0 1-1-1 M21 4a1 1 0 0 0-1-1 M21 9a1 1 0 0 1-1 1 m3 7 3 3 3-3 M6 10V5a2 2 0 0 1 2-2h2 M 3 14 h 7 v 7 h -7 Z",
    "category": "ui",
    "tags": "search substitute swap change"
  },
  {
    "id": "reply-all",
    "char": "m12 17-5-5 5-5 M22 18v-2a4 4 0 0 0-4-4H7 m7 17-5-5 5-5",
    "category": "ui",
    "tags": "email"
  },
  {
    "id": "reply",
    "char": "M20 18v-2a4 4 0 0 0-4-4H4 m9 17-5-5 5-5",
    "category": "ui",
    "tags": "email"
  },
  {
    "id": "rewind",
    "char": "M12 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 12 18z M22 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 22 18z",
    "category": "ui",
    "tags": "music"
  },
  {
    "id": "ribbon",
    "char": "M12 11.22C11 9.997 10 9 10 8a2 2 0 0 1 4 0c0 1-.998 2.002-2.01 3.22 m12 18 2.57-3.5 M6.243 9.016a7 7 0 0 1 11.507-.009 M9.35 14.53 12 11.22 M9.35 14.53C7.728 12.246 6 10.221 6 7a6 5 0 0 1 12 0c-.005 3.22-1.778 5.235-3.43 7.5l3.557 4.527a1 1 0 0 1-.203 1.43l-1.894 1.36a1 1 0 0 1-1.384-.215L12 18l-2.679 3.593a1 1 0 0 1-1.39.213l-1.865-1.353a1 1 0 0 1-.203-1.422z",
    "category": "ui",
    "tags": "awareness strip band tape strap cordon"
  },
  {
    "id": "rocket",
    "char": "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5 M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09 M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05",
    "category": "ui",
    "tags": "release boost launch space version"
  },
  {
    "id": "rocking-chair",
    "char": "m15 13 3.708 7.416 M3 19a15 15 0 0 0 18 0 m3 2 3.21 9.633A2 2 0 0 0 8.109 13H18 m9 13-3.708 7.416",
    "category": "ui",
    "tags": "chair furniture seat comfort relax"
  },
  {
    "id": "roller-coaster",
    "char": "M6 19V5 M10 19V6.8 M14 19v-7.8 M18 5v4 M18 19v-6 M22 19V9 M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65",
    "category": "ui",
    "tags": "attraction entertainment amusement park theme park funfair"
  },
  {
    "id": "rose",
    "char": "M17 10h-1a4 4 0 1 1 4-4v.534 M17 6h1a4 4 0 0 1 1.42 7.74l-2.29.87a6 6 0 0 1-5.339-10.68l2.069-1.31 M4.5 17c2.8-.5 4.4 0 5.5.8s1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 M9.77 12C4 15 2 22 2 22 M 17, 8 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "roses thorns petals plant stem leaves spring bloom blossom gardening botanical flora florist bouquet bunch gift date romance romantic valentines day special occasion"
  },
  {
    "id": "rotate-3d",
    "char": "M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2 m15.194 13.707 3.814 1.86-1.86 3.814 M19 15.57c-1.804.885-4.274 1.43-7 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4",
    "category": "ui",
    "tags": "gizmo transform orientation orbit axis"
  },
  {
    "id": "rotate-ccw-key",
    "char": "M12 7v6 M12 9h2 M3 12a9 9 0 1 0 9-9 9.74 9.74 0 0 0-6.74 2.74L3 8 M3 3v5h5 M 12, 15 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "password key refresh change"
  },
  {
    "id": "rotate-ccw-square",
    "char": "M20 9V7a2 2 0 0 0-2-2h-6 m15 2-3 3 3 3 M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2",
    "category": "ui",
    "tags": "left counter-clockwise rotate image 90 45 degrees °"
  },
  {
    "id": "rotate-ccw",
    "char": "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8 M3 3v5h5",
    "category": "ui",
    "tags": "arrow left counter-clockwise restart reload rerun refresh backup undo replay redo retry rewind reverse"
  },
  {
    "id": "rotate-cw-square",
    "char": "M12 5H6a2 2 0 0 0-2 2v3 m9 8 3-3-3-3 M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2",
    "category": "ui",
    "tags": "right clockwise rotate image 90 45 degrees °"
  },
  {
    "id": "rotate-cw",
    "char": "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8 M21 3v5h-5",
    "category": "ui",
    "tags": "arrow right clockwise refresh reload rerun redo"
  },
  {
    "id": "route-off",
    "char": "M 6, 19 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M9 19h8.5c.4 0 .9-.1 1.3-.2 M5.2 5.2A3.5 3.53 0 0 0 6.5 12H12 m2 2 20 20 M21 15.3a3.5 3.5 0 0 0-3.3-3.3 M15 5h-4.3 M 18, 5 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "path journey planner points stops stations reset clear cancelled closed blocked"
  },
  {
    "id": "route",
    "char": "M 6, 19 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15 M 18, 5 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "path journey planner points stops stations"
  },
  {
    "id": "router",
    "char": "M 2 14 h 20 v 8 h -20 Z M6.01 18H6 M10.01 18H10 M15 10v4 M17.84 7.17a4 4 0 0 0-5.66 0 M20.66 4.34a8 8 0 0 0-11.31 0",
    "category": "ui",
    "tags": "computer server cloud"
  },
  {
    "id": "rows-2",
    "char": "M 3 3 h 18 v 18 h -18 Z M3 12h18",
    "category": "ui",
    "tags": "lines list queue preview panel paragraphs parallel series split vertical horizontal half center middle even drawer"
  },
  {
    "id": "rows-3",
    "char": "M 3 3 h 18 v 18 h -18 Z M21 9H3 M21 15H3",
    "category": "ui",
    "tags": "lines list queue preview paragraphs parallel series split vertical horizontal half center middle even drawers"
  },
  {
    "id": "rows-4",
    "char": "M 3 3 h 18 v 18 h -18 Z M21 7.5H3 M21 12H3 M21 16.5H3",
    "category": "ui",
    "tags": "lines list queue preview paragraphs parallel series split vertical horizontal half center middle even drawers grill"
  },
  {
    "id": "rss",
    "char": "M4 11a9 9 0 0 1 9 9 M4 4a16 16 0 0 1 16 16 M 5, 19 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0",
    "category": "ui",
    "tags": "feed subscribe news updates notifications content blog articles broadcast syndication reader channels posts publishing digest alert following inbox newsletter weblog podcast"
  },
  {
    "id": "ruler-dimension-line",
    "char": "M10 15v-3 M14 15v-3 M18 15v-3 M2 8V4 M22 6H2 M22 8V4 M6 15v-3 M 2 12 h 20 v 8 h -20 Z",
    "category": "ui",
    "tags": "measurements centimeters cm millimeters mm metre foot feet inches units size length width height dimensions depth breadth extent stationery"
  },
  {
    "id": "ruler",
    "char": "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z m14.5 12.5 2-2 m11.5 9.5 2-2 m8.5 6.5 2-2 m17.5 15.5 2-2",
    "category": "ui",
    "tags": "measurements centimeters cm millimeters mm metre foot feet inches units size length width height dimensions depth breadth extent stationery"
  },
  {
    "id": "russian-ruble",
    "char": "M6 11h8a4 4 0 0 0 0-8H9v18 M6 15h8",
    "category": "ui",
    "tags": "currency money payment"
  },
  {
    "id": "sailboat",
    "char": "M10 2v15 M7 22a4 4 0 0 1-4-4 1 1 0 0 1 1-1h16a1 1 0 0 1 1 1 4 4 0 0 1-4 4z M9.159 2.46a1 1 0 0 1 1.521-.193l9.977 8.98A1 1 0 0 1 20 13H4a1 1 0 0 1-.824-1.567z",
    "category": "ui",
    "tags": "ship boat harbor harbour dock"
  },
  {
    "id": "salad",
    "char": "M7 21h10 M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1 m13 12 4-4 M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2",
    "category": "ui",
    "tags": "food vegetarian dish restaurant course meal side vegetables health"
  },
  {
    "id": "sandwich",
    "char": "m2.37 11.223 8.372-6.777a2 2 0 0 1 2.516 0l8.371 6.777 M21 15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5.25 M3 15a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h9 m6.67 15 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2 M 2 11 h 20 v 4 h -20 Z",
    "category": "ui",
    "tags": "food snack dish restaurant lunch meal"
  },
  {
    "id": "satellite-dish",
    "char": "M4 10a7.31 7.31 0 0 0 10 10Z m9 15 3-3 M17 13a6 6 0 0 0-6-6 M21 13A10 10 0 0 0 11 3",
    "category": "ui",
    "tags": "antenna receiver dish aerial saucer"
  },
  {
    "id": "satellite",
    "char": "m13.5 6.5-3.148-3.148a1.205 1.205 0 0 0-1.704 0L6.352 5.648a1.205 1.205 0 0 0 0 1.704L9.5 10.5 M16.5 7.5 19 5 m17.5 10.5 3.148 3.148a1.205 1.205 0 0 1 0 1.704l-2.296 2.296a1.205 1.205 0 0 1-1.704 0L13.5 14.5 M9 21a6 6 0 0 0-6-6 M9.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l4.296-4.296a1.205 1.205 0 0 0 0-1.704l-2.296-2.296a1.205 1.205 0 0 0-1.704 0z",
    "category": "ui",
    "tags": "space station orbit transmitter"
  },
  {
    "id": "saudi-riyal",
    "char": "m20 19.5-5.5 1.2 M14.5 4v11.22a1 1 0 0 0 1.242.97L20 15.2 m2.978 19.351 5.549-1.363A2 2 0 0 0 10 16V2 M20 10 4 13.5",
    "category": "ui",
    "tags": "currency money payment"
  },
  {
    "id": "save-all",
    "char": "M10 2v3a1 1 0 0 0 1 1h5 M18 18v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6 M18 22H4a2 2 0 0 1-2-2V6 M8 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 22 6.828V16a2 2 0 0 1-2.01 2z",
    "category": "files",
    "tags": "floppy disks copy"
  },
  {
    "id": "save-off",
    "char": "M13 13H8a1 1 0 0 0-1 1v7 M14 8h1 M17 21v-4 m2 2 20 20 M20.41 20.41A2 2 0 0 1 19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 .59-1.41 M29.5 11.5s5 5 4 5 M9 3h6.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V15",
    "category": "files",
    "tags": "floppy disk unsalvageable"
  },
  {
    "id": "save",
    "char": "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7 M7 3v4a1 1 0 0 0 1 1h7",
    "category": "files",
    "tags": "floppy disk"
  },
  {
    "id": "scale-3d",
    "char": "M5 7v11a1 1 0 0 0 1 1h11 M5.293 18.707 11 13 M 19, 19 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 5, 5 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "gizmo transform size axis"
  },
  {
    "id": "scale",
    "char": "M12 3v18 m19 8 3 8a5 5 0 0 1-6 0zV7 M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1 m5 8 3 8a5 5 0 0 1-6 0zV7 M7 21h10",
    "category": "ui",
    "tags": "balance legal license right rule law justice weight measure compare judge fair ethics decision"
  },
  {
    "id": "scaling",
    "char": "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M14 15H9v-5 M16 3h5v5 M21 3 9 15",
    "category": "ui",
    "tags": "scale resize design"
  },
  {
    "id": "scan-barcode",
    "char": "M3 7V5a2 2 0 0 1 2-2h2 M17 3h2a2 2 0 0 1 2 2v2 M21 17v2a2 2 0 0 1-2 2h-2 M7 21H5a2 2 0 0 1-2-2v-2 M8 7v10 M12 7v10 M17 7v10",
    "category": "ui",
    "tags": "checkout till cart transaction purchase buy product packaging retail consumer"
  },
  {
    "id": "scan-eye",
    "char": "M3 7V5a2 2 0 0 1 2-2h2 M17 3h2a2 2 0 0 1 2 2v2 M21 17v2a2 2 0 0 1-2 2h-2 M7 21H5a2 2 0 0 1-2-2v-2 M 12, 12 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0",
    "category": "ui",
    "tags": "preview zoom expand fullscreen gallery image camera watch surveillance retina focus lens biometric identification authentication access login"
  },
  {
    "id": "scan-face",
    "char": "M3 7V5a2 2 0 0 1 2-2h2 M17 3h2a2 2 0 0 1 2 2v2 M21 17v2a2 2 0 0 1-2 2h-2 M7 21H5a2 2 0 0 1-2-2v-2 M8 14s1.5 2 4 2 4-2 4-2 M9 9h.01 M15 9h.01",
    "category": "ui",
    "tags": "face biometric identification authentication 2fa access login dashed"
  },
  {
    "id": "scan-heart",
    "char": "M17 3h2a2 2 0 0 1 2 2v2 M21 17v2a2 2 0 0 1-2 2h-2 M3 7V5a2 2 0 0 1 2-2h2 M7 21H5a2 2 0 0 1-2-2v-2 M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 0 1 4.172 4.306l-3.447 3.62a1 1 0 0 1-1.449 0z",
    "category": "ui",
    "tags": "health heart rate pulse monitoring healthiness screening dashed"
  },
  {
    "id": "scan-line",
    "char": "M3 7V5a2 2 0 0 1 2-2h2 M17 3h2a2 2 0 0 1 2 2v2 M21 17v2a2 2 0 0 1-2 2h-2 M7 21H5a2 2 0 0 1-2-2v-2 M7 12h10",
    "category": "ui",
    "tags": "checkout till cart transaction purchase buy product packaging retail consumer qr-code dashed"
  },
  {
    "id": "scan-qr-code",
    "char": "M17 12v4a1 1 0 0 1-1 1h-4 M17 3h2a2 2 0 0 1 2 2v2 M17 8V7 M21 17v2a2 2 0 0 1-2 2h-2 M3 7V5a2 2 0 0 1 2-2h2 M7 17h.01 M7 21H5a2 2 0 0 1-2-2v-2 M 7 7 h 5 v 5 h -5 Z",
    "category": "ui",
    "tags": "barcode scan qrcode url information digital scanner"
  },
  {
    "id": "scan-search",
    "char": "M3 7V5a2 2 0 0 1 2-2h2 M17 3h2a2 2 0 0 1 2 2v2 M21 17v2a2 2 0 0 1-2 2h-2 M7 21H5a2 2 0 0 1-2-2v-2 M 12, 12 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 m16 16-1.9-1.9",
    "category": "ui",
    "tags": "preview zoom expand fullscreen gallery image focus lens"
  },
  {
    "id": "scan-text",
    "char": "M3 7V5a2 2 0 0 1 2-2h2 M17 3h2a2 2 0 0 1 2 2v2 M21 17v2a2 2 0 0 1-2 2h-2 M7 21H5a2 2 0 0 1-2-2v-2 M7 8h8 M7 12h10 M7 16h6",
    "category": "ui",
    "tags": "recognition read translate copy lines"
  },
  {
    "id": "scan",
    "char": "M3 7V5a2 2 0 0 1 2-2h2 M17 3h2a2 2 0 0 1 2 2v2 M21 17v2a2 2 0 0 1-2 2h-2 M7 21H5a2 2 0 0 1-2-2v-2",
    "category": "ui",
    "tags": "qr-code barcode checkout augmented reality ar target surveillance camera lens focus frame select box boundary bounds area square dashed"
  },
  {
    "id": "school",
    "char": "M14 21v-3a2 2 0 0 0-4 0v3 M18 5v16 m4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6 m6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11 M6 5v16 M 12, 9 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "building education childhood university learning campus scholar student lecture degree course academia study knowledge classroom research diploma graduation professor tutorial homework assignment exam"
  },
  {
    "id": "scissors-line-dashed",
    "char": "M5.42 9.42 8 12 M 4, 8 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 m14 6-8.58 8.58 M 4, 16 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M10.8 14.8 14 18 M16 12h-2 M22 12h-2",
    "category": "ui",
    "tags": "cut here along snip chop stationery crafts instructions diagram"
  },
  {
    "id": "scissors",
    "char": "M 6, 6 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M8.12 8.12 12 12 M20 4 8.12 15.88 M 6, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M14.8 14.8 20 20",
    "category": "ui",
    "tags": "cut snip chop stationery crafts"
  },
  {
    "id": "scooter",
    "char": "M21 4h-3.5l2 11.05 M6.95 17h5.142c.523 0 .95-.406 1.063-.916a6.5 6.5 0 0 1 5.345-5.009 M 19.5, 17.5 m -2.5, 0 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0 M 4.5, 17.5 m -2.5, 0 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0",
    "category": "ui",
    "tags": "vehicle drive trip journey transport electric ride urban commute speed"
  },
  {
    "id": "screen-share-off",
    "char": "M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3 M8 21h8 M12 17v4 m22 3-5 5 m17 3 5 5",
    "category": "ui",
    "tags": "desktop disconnect monitor"
  },
  {
    "id": "screen-share",
    "char": "M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3 M8 21h8 M12 17v4 m17 8 5-5 M17 3h5v5",
    "category": "ui",
    "tags": "host desktop monitor"
  },
  {
    "id": "scroll-text",
    "char": "M15 12h-5 M15 8h-5 M19 17V5a2 2 0 0 0-2-2H4 M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3",
    "category": "ui",
    "tags": "paper log scripture document notes parchment list long script story code coding"
  },
  {
    "id": "scroll",
    "char": "M19 17V5a2 2 0 0 0-2-2H4 M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3",
    "category": "ui",
    "tags": "paper log scripture document notes parchment list long script story code coding"
  },
  {
    "id": "search-alert",
    "char": "M 11, 11 m -8, 0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0 m21 21-4.3-4.3 M11 7v4 M11 15h.01",
    "category": "ui",
    "tags": "find scan magnifier magnifying glass stop warning alert error anomaly lens"
  },
  {
    "id": "search-check",
    "char": "m8 11 2 2 4-4 M 11, 11 m -8, 0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0 m21 21-4.3-4.3",
    "category": "ui",
    "tags": "find scan magnifier magnifying glass found correct complete tick lens"
  },
  {
    "id": "search-code",
    "char": "m13 13.5 2-2.5-2-2.5 m21 21-4.3-4.3 M9 8.5 7 11l2 2.5 M 11, 11 m -8, 0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
    "category": "ui",
    "tags": "find scan magnifier magnifying glass grep chevrons <> lens"
  },
  {
    "id": "search-slash",
    "char": "m13.5 8.5-5 5 M 11, 11 m -8, 0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0 m21 21-4.3-4.3",
    "category": "ui",
    "tags": "find scan magnifier magnifying glass stop clear cancel abort / lens"
  },
  {
    "id": "search-x",
    "char": "m13.5 8.5-5 5 m8.5 8.5 5 5 M 11, 11 m -8, 0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0 m21 21-4.3-4.3",
    "category": "ui",
    "tags": "find scan magnifier magnifying glass stop clear cancel abort lens"
  },
  {
    "id": "search",
    "char": "m21 21-4.34-4.34 M 11, 11 m -8, 0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
    "category": "ui",
    "tags": "find scan magnifier magnifying glass lens"
  },
  {
    "id": "section",
    "char": "M16 5a4 3 0 0 0-8 0c0 4 8 3 8 7a4 3 0 0 1-8 0 M8 19a4 3 0 0 0 8 0c0-4-8-3-8-7a4 3 0 0 1 8 0",
    "category": "ui",
    "tags": "mark typography punctuation legal type text prose symbol"
  },
  {
    "id": "send-horizontal",
    "char": "M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z M6 12h16",
    "category": "communication",
    "tags": "email message mail paper airplane paper aeroplane submit"
  },
  {
    "id": "send-to-back",
    "char": "M 14 14 h 8 v 8 h -8 Z M 2 2 h 8 v 8 h -8 Z M7 14v1a2 2 0 0 0 2 2h1 M14 7h1a2 2 0 0 1 2 2v1",
    "category": "communication",
    "tags": "bring send move under back backwards overlap layer order"
  },
  {
    "id": "send",
    "char": "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z m21.854 2.147-10.94 10.939",
    "category": "communication",
    "tags": "email message mail paper airplane paper aeroplane submit"
  },
  {
    "id": "separator-horizontal",
    "char": "m16 16-4 4-4-4 M3 12h18 m8 8 4-4 4 4",
    "category": "ui",
    "tags": "move split"
  },
  {
    "id": "separator-vertical",
    "char": "M12 3v18 m16 16 4-4-4-4 m8 8-4 4 4 4",
    "category": "ui",
    "tags": "move split"
  },
  {
    "id": "server-cog",
    "char": "m10.852 14.772-.383.923 M13.148 14.772a3 3 0 1 0-2.296-5.544l-.383-.923 m13.148 9.228.383-.923 m13.53 15.696-.382-.924a3 3 0 1 1-2.296-5.544 m14.772 10.852.923-.383 m14.772 13.148.923.383 M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5 M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5 M6 18h.01 M6 6h.01 m9.228 10.852-.923-.383 m9.228 13.148-.923.383",
    "category": "ui",
    "tags": "cloud storage computing cog gear"
  },
  {
    "id": "server-crash",
    "char": "M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2 M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2 M6 6h.01 M6 18h.01 m13 6-4 6h6l-4 6",
    "category": "ui",
    "tags": "cloud storage problem error"
  },
  {
    "id": "server-off",
    "char": "M7 2h13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5 M10 10 2.5 2.5C2 2 2 2.5 2 5v3a2 2 0 0 0 2 2h6z M22 17v-1a2 2 0 0 0-2-2h-1 M4 14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16.5l1-.5.5.5-8-8H4z M6 18h.01 m2 2 20 20",
    "category": "ui",
    "tags": "cloud storage"
  },
  {
    "id": "server",
    "char": "M 2 2 h 20 v 8 h -20 Z M 2 14 h 20 v 8 h -20 Z",
    "category": "ui",
    "tags": "cloud storage"
  },
  {
    "id": "settings-2",
    "char": "M14 17H5 M19 7h-9 M 17, 17 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 7, 7 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "cog edit gear preferences slider"
  },
  {
    "id": "settings",
    "char": "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915 M 12, 12 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "cog edit gear preferences"
  },
  {
    "id": "shapes",
    "char": "M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z M 3 14 h 7 v 7 h -7 Z M 17.5, 17.5 m -3.5, 0 a 3.5,3.5 0 1,0 7,0 a 3.5,3.5 0 1,0 -7,0",
    "category": "ui",
    "tags": "triangle equilateral square circle classification different collection toy blocks learning"
  },
  {
    "id": "share-2",
    "char": "M 18, 5 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 6, 12 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 18, 19 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "network connections"
  },
  {
    "id": "share",
    "char": "M12 2v13 m16 6-4-4-4 4 M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",
    "category": "ui",
    "tags": "network connections"
  },
  {
    "id": "sheet",
    "char": "M 3 3 h 18 v 18 h -18 Z",
    "category": "ui",
    "tags": "spreadsheets table excel"
  },
  {
    "id": "shell",
    "char": "M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 1 1-20 0 11.93 11.93 0 0 1 2.42-7.22 2 2 0 1 1 3.16 2.44",
    "category": "ui",
    "tags": "beach sand holiday sealife fossil ammonite biology ocean terminal command line session bash zsh roll wrap chewing gum bubble gum sweet sugar hosepipe carpet string spiral spinner hypnotise hypnosis"
  },
  {
    "id": "shelving-unit",
    "char": "M12 12V9a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3 M16 20v-3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3 M20 22V2 M4 12h16 M4 20h16 M4 2v20 M4 4h16",
    "category": "ui",
    "tags": "ledge rack storage inventory furniture sill shelves shelf organize display store arrange unit cabinet fixture retail warehouse"
  },
  {
    "id": "shield-alert",
    "char": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z M12 8v4 M12 16h.01",
    "category": "ui",
    "tags": "unshielded cybersecurity insecure unsecured safety unsafe protection unprotected guardian unguarded unarmored unarmoured defenseless defenceless undefended defender blocked stopped intercepted interception saved thwarted threat prevention unprevented antivirus vigilance vigilant detection detected scanned found exploit vulnerability vulnerable weakness infection infected comprimised data leak audited admin verification unverified uncertified warning emergency attention urgent alarm crest bravery strength tough attacked damaged injured hit expired disabled inactive error exclamation mark !"
  },
  {
    "id": "shield-ban",
    "char": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z m4.243 5.21 14.39 12.472",
    "category": "ui",
    "tags": "unshielded cybersecurity insecure unsecured safety unsafe protection unprotected guardian unguarded unarmored unarmoured defenseless defenceless undefended defender blocked stopped intercepted interception saved thwarted threat prevention unprevented antivirus vigilance vigilant detection detected scanned found exploit vulnerability vulnerable weakness infection infected comprimised data leak audited admin verification unverified uncertified cancel error crest bravery attacked damaged injured hit expired eliminated disabled inactive /"
  },
  {
    "id": "shield-check",
    "char": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z m9 12 2 2 4-4",
    "category": "ui",
    "tags": "cybersecurity secured safety protection protected guardian guarded armored armoured defense defence defended blocked threat prevention prevented antivirus vigilance vigilant active activated enabled detection scanned found strength strong tough invincible invincibility invulnerable undamaged audited admin verification verified certification certified tested passed qualified cleared cleaned disinfected uninfected task completed todo done ticked checked crest bravery"
  },
  {
    "id": "shield-ellipsis",
    "char": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z M8 12h.01 M12 12h.01 M16 12h.01",
    "category": "ui",
    "tags": "cybersecurity securing protecting guarding armoring armouring defending blocking preventing antivirus detecting scanning finding auditing admin verifying crest upgrading loader loading throbber progress dots more etc ... …"
  },
  {
    "id": "shield-half",
    "char": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z M12 22V2",
    "category": "ui",
    "tags": "cybersecurity secure safety protection guardian armored armoured defense defence defender block threat prevention antivirus vigilance vigilant detection scan strength strong tough invincible invincibility invulnerable undamaged audit admin verification crest logo sigil flag team faction fraternity university college academy school education uniform bravery knight foot soldier infantry trooper pawn battle war military ranking army cadet scout"
  },
  {
    "id": "shield-minus",
    "char": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z M9 12h6",
    "category": "ui",
    "tags": "unshield cybersecurity unsecure unguard unblock antivirus clean clear disinfect patch fix stop cancel remove relax admin crest bravery weakened damaged hit unarm disable deactivate decommission downgraded minimum -"
  },
  {
    "id": "shield-off",
    "char": "m2 2 20 20 M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71 M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264",
    "category": "ui",
    "tags": "unshielded cybersecurity insecure unsecured safety unsafe protection unprotected guardian unguarded unarmored unarmoured defenseless defenceless undefended defender interception threat prevention unprevented antivirus detection undetected exploit vulnerability vulnerable weakness infected infection comprimised data leak unaudited admin verification unverified inactive cancelled error crest bravery damaged injured hit expired eliminated"
  },
  {
    "id": "shield-plus",
    "char": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z M9 12h6 M12 9v6",
    "category": "ui",
    "tags": "cybersecurity secure safety protection guardian armored armoured defense defence defender block threat prevention antivirus vigilance vigilant detection scan strength strong tough invincible invincibility invulnerable undamaged extra added professional enterprise full maximum upgraded ultra activate enable audit admin verification crest medic +"
  },
  {
    "id": "shield-question-mark",
    "char": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3 M12 17h.01",
    "category": "ui",
    "tags": "unshielded cybersecurity insecure unsecured safety unsafe protection unprotected guardian unguarded unarmored unarmoured defenseless defenceless undefended defender threat prevention unprevented antivirus vigilance vigilant detection undetected scan find exploit vulnerability vulnerable weakness infection comprimised data leak audit admin verification unverified uncertified uncertain unknown inactive crest question mark ?"
  },
  {
    "id": "shield-user",
    "char": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z M6.376 18.91a6 6 0 0 1 11.249.003 M 12, 11 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
    "category": "ui",
    "tags": "shield user admin protection protected safety guard"
  },
  {
    "id": "shield-x",
    "char": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z m14.5 9.5-5 5 m9.5 9.5 5 5",
    "category": "ui",
    "tags": "unshielded cybersecurity insecure unsecured safety unsafe protection unprotected guardian unguarded unarmored unarmoured defenseless defenceless undefended defender blocked stopped intercepted interception saved thwarted threat prevention prevented antivirus vigilance vigilant detection detected scanned found exploit vulnerability vulnerable weakness infection infected comprimised data leak audited admin verification unverified inactive cancel error wrong false crest bravery attacked damaged injured hit dead deceased expired eliminated exterminated"
  },
  {
    "id": "shield",
    "char": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
    "category": "ui",
    "tags": "cybersecurity secure safety protection guardian armored armoured defense defence defender block threat prevention antivirus vigilance vigilant detection scan find strength strong tough invincible invincibility invulnerable undamaged audit admin verification crest bravery knight foot soldier infantry trooper pawn battle war military army cadet scout"
  },
  {
    "id": "ship-wheel",
    "char": "M 12, 12 m -8, 0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0 M12 2v7.5 m19 5-5.23 5.23 M22 12h-7.5 m19 19-5.23-5.23 M12 14.5V22 M10.23 13.77 5 19 M9.5 12H2 M10.23 10.23 5 5 M 12, 12 m -2.5, 0 a 2.5,2.5 0 1,0 5,0 a 2.5,2.5 0 1,0 -5,0",
    "category": "ui",
    "tags": "steering rudder boat knots nautical mile maritime sailing yacht cruise ocean liner tanker vessel navy trip"
  },
  {
    "id": "ship",
    "char": "M12 10.189V14 M12 2v3 M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6 M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76 M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
    "category": "ui",
    "tags": "boat knots nautical mile maritime sailing yacht cruise ocean liner tanker vessel navy trip releases"
  },
  {
    "id": "shirt",
    "char": "M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z",
    "category": "ui",
    "tags": "t-shirt shopping store clothing clothes"
  },
  {
    "id": "shopping-bag",
    "char": "M16 10a4 4 0 0 1-8 0 M3.103 6.034h17.794 M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",
    "category": "ui",
    "tags": "ecommerce cart purchase store"
  },
  {
    "id": "shopping-basket",
    "char": "m15 11-1 9 m19 11-4-7 M2 11h20 m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4 M4.5 15.5h15 m5 11 4-7 m9 11 1 9",
    "category": "ui",
    "tags": "cart e-commerce store purchase products items ingredients"
  },
  {
    "id": "shopping-cart",
    "char": "M 8, 21 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 19, 21 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
    "category": "ui",
    "tags": "trolley cart basket e-commerce store purchase products items ingredients"
  },
  {
    "id": "shovel",
    "char": "M21.56 4.56a1.5 1.5 0 0 1 0 2.122l-.47.47a3 3 0 0 1-4.212-.03 3 3 0 0 1 0-4.243l.44-.44a1.5 1.5 0 0 1 2.121 0z M3 22a1 1 0 0 1-1-1v-3.586a1 1 0 0 1 .293-.707l3.355-3.355a1.205 1.205 0 0 1 1.704 0l3.296 3.296a1.205 1.205 0 0 1 0 1.704l-3.355 3.355a1 1 0 0 1-.707.293z m9 15 7.879-7.878",
    "category": "ui",
    "tags": "dig spade treasure"
  },
  {
    "id": "shower-head",
    "char": "m4 4 2.5 2.5 M13.5 6.5a4.95 4.95 0 0 0-7 7 M15 5 5 15 M14 17v.01 M10 16v.01 M13 13v.01 M16 10v.01 M11 20v.01 M17 14v.01 M20 11v.01",
    "category": "ui",
    "tags": "shower bath bathroom amenities services"
  },
  {
    "id": "shredder",
    "char": "M4 13V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5 M14 2v5a1 1 0 0 0 1 1h5 M10 22v-5 M14 19v-2 M18 20v-3 M2 13h20 M6 20v-3",
    "category": "ui",
    "tags": "file paper tear cut delete destroy remove erase document destruction secure security confidential data trash dispose disposal information waste permanent"
  },
  {
    "id": "shrimp",
    "char": "M11 12h.01 M13 22c.5-.5 1.12-1 2.5-1-1.38 0-2-.5-2.5-1 M14 2a3.28 3.28 0 0 1-3.227 1.798l-6.17-.561A2.387 2.387 0 1 0 4.387 8H15.5a1 1 0 0 1 0 13 1 1 0 0 0 0-5H12a7 7 0 0 1-7-7V8 M14 8a8.5 8.5 0 0 1 0 8 M16 16c2 0 4.5-4 4-6",
    "category": "ui",
    "tags": "seafood shellfish crustacean prawn scallop whelk arthropod littleneck quahog cherrystone"
  },
  {
    "id": "shrink",
    "char": "m15 15 6 6m-6-6v4.8m0-4.8h4.8 M9 19.8V15m0 0H4.2M9 15l-6 6 M15 4.2V9m0 0h4.8M15 9l6-6 M9 4.2V9m0 0H4.2M9 9 3 3",
    "category": "ui",
    "tags": "scale fullscreen"
  },
  {
    "id": "shrub",
    "char": "M12 22v-5.172a2 2 0 0 0-.586-1.414L9.5 13.5 M14.5 14.5 12 17 M17 8.8A6 6 0 0 1 13.8 20H10A6.5 6.5 0 0 1 7 8a5 5 0 0 1 10 0z",
    "category": "ui",
    "tags": "forest undergrowth park nature"
  },
  {
    "id": "shuffle",
    "char": "m18 14 4 4-4 4 m18 2 4 4-4 4 M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22 M2 6h1.972a4 4 0 0 1 3.6 2.2 M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45",
    "category": "ui",
    "tags": "music random reorder"
  },
  {
    "id": "sigma",
    "char": "M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2",
    "category": "ui",
    "tags": "sum calculate formula math enumeration enumerate"
  },
  {
    "id": "signal-high",
    "char": "M2 20h.01 M7 20v-4 M12 20v-8 M17 20V8",
    "category": "ui",
    "tags": "connection wireless gsm phone 2g 3g 4g 5g"
  },
  {
    "id": "signal-low",
    "char": "M2 20h.01 M7 20v-4",
    "category": "ui",
    "tags": "connection wireless gsm phone 2g 3g 4g 5g"
  },
  {
    "id": "signal-medium",
    "char": "M2 20h.01 M7 20v-4 M12 20v-8",
    "category": "ui",
    "tags": "connection wireless gsm phone 2g 3g 4g 5g"
  },
  {
    "id": "signal-zero",
    "char": "M2 20h.01",
    "category": "ui",
    "tags": "connection wireless gsm phone 2g 3g 4g 5g lost"
  },
  {
    "id": "signal",
    "char": "M2 20h.01 M7 20v-4 M12 20v-8 M17 20V8 M22 4v16",
    "category": "ui",
    "tags": "connection wireless gsm phone 2g 3g 4g 5g"
  },
  {
    "id": "signature",
    "char": "m21 17-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284 M3 21h18",
    "category": "ui",
    "tags": "text format input contract autograph handwriting sign cursive ink scribble authorize personal agreement legal document identity authentic approval verification unique"
  },
  {
    "id": "signpost-big",
    "char": "M10 9H4L2 7l2-2h6 M14 5h6l2 2-2 2h-6 M10 22V4a2 2 0 1 1 4 0v18 M8 22h8",
    "category": "ui",
    "tags": "bidirectional left right east west"
  },
  {
    "id": "signpost",
    "char": "M12 13v8 M12 3v3 M18 6a2 2 0 0 1 1.387.56l2.307 2.22a1 1 0 0 1 0 1.44l-2.307 2.22A2 2 0 0 1 18 13H6a2 2 0 0 1-1.387-.56l-2.306-2.22a1 1 0 0 1 0-1.44l2.306-2.22A2 2 0 0 1 6 6z",
    "category": "ui",
    "tags": "bidirectional left right east west"
  },
  {
    "id": "siren",
    "char": "M7 18v-6a5 5 0 1 1 10 0v6 M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z M21 12h1 M18.5 4.5 18 5 M2 12h1 M12 2v1 m4.929 4.929.707.707 M12 12v6",
    "category": "ui",
    "tags": "police ambulance emergency security alert alarm light"
  },
  {
    "id": "skip-back",
    "char": "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z M3 20V4",
    "category": "media",
    "tags": "arrow previous music"
  },
  {
    "id": "skip-forward",
    "char": "M21 4v16 M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",
    "category": "media",
    "tags": "arrow skip next music"
  },
  {
    "id": "skull",
    "char": "m12.5 17-.5-1-.5 1h1z M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z M 15, 12 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 9, 12 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0",
    "category": "ui",
    "tags": "death danger bone"
  },
  {
    "id": "slack",
    "char": "M 13 2 h 3 v 8 h -3 Z M19 8.5V10h1.5A1.5 1.5 0 1 0 19 8.5 M 8 14 h 3 v 8 h -3 Z M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5 M 14 13 h 8 v 3 h -8 Z M15.5 19H14v1.5a1.5 1.5 0 1 0 1.5-1.5 M 2 8 h 8 v 3 h -8 Z M8.5 5H10V3.5A1.5 1.5 0 1 0 8.5 5",
    "category": "ui",
    "tags": "logo"
  },
  {
    "id": "slash",
    "char": "M22 2 2 22",
    "category": "ui",
    "tags": "divide division or /"
  },
  {
    "id": "slice",
    "char": "M11 16.586V19a1 1 0 0 1-1 1H2L18.37 3.63a1 1 0 1 1 3 3l-9.663 9.663a1 1 0 0 1-1.414 0L8 14",
    "category": "ui",
    "tags": "cutter scalpel knife"
  },
  {
    "id": "sliders-horizontal",
    "char": "M10 5H3 M12 19H3 M14 3v4 M16 17v4 M21 12h-9 M21 19h-5 M21 5h-7 M8 10v4 M8 12H3",
    "category": "ui",
    "tags": "settings filters controls"
  },
  {
    "id": "sliders-vertical",
    "char": "M10 8h4 M12 21v-9 M12 8V3 M17 16h4 M19 12V3 M19 21v-5 M3 14h4 M5 10V3 M5 21v-7",
    "category": "ui",
    "tags": "settings controls"
  },
  {
    "id": "smartphone-charging",
    "char": "M 5 2 h 14 v 20 h -14 Z M12.667 8 10 12h4l-2.667 4",
    "category": "communication",
    "tags": "phone cellphone device power screen"
  },
  {
    "id": "smartphone-nfc",
    "char": "M 2 6 h 7 v 12 h -7 Z M13 8.32a7.43 7.43 0 0 1 0 7.36 M16.46 6.21a11.76 11.76 0 0 1 0 11.58 M19.91 4.1a15.91 15.91 0 0 1 .01 15.8",
    "category": "communication",
    "tags": "contactless payment near-field communication screen"
  },
  {
    "id": "smartphone",
    "char": "M 5 2 h 14 v 20 h -14 Z M12 18h.01",
    "category": "communication",
    "tags": "phone cellphone device screen"
  },
  {
    "id": "smile-plus",
    "char": "M22 11v1a10 10 0 1 1-9-10 M8 14s1.5 2 4 2 4-2 4-2 M16 5h6 M19 2v6",
    "category": "ui",
    "tags": "emoji face happy good emotion react reaction add"
  },
  {
    "id": "smile",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M8 14s1.5 2 4 2 4-2 4-2",
    "category": "ui",
    "tags": "emoji face happy good emotion"
  },
  {
    "id": "snail",
    "char": "M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0 M 10, 13 m -8, 0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0 M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6 M18 3 19.1 5.2 M22 3 20.9 5.2",
    "category": "ui",
    "tags": "animal insect slow speed delicacy spiral"
  },
  {
    "id": "snowflake",
    "char": "m10 20-1.25-2.5L6 18 M10 4 8.75 6.5 6 6 m14 20 1.25-2.5L18 18 m14 4 1.25 2.5L18 6 m17 21-3-6h-4 m17 3-3 6 1.5 3 M2 12h6.5L10 9 m20 10-1.5 2 1.5 2 M22 12h-6.5L14 15 m4 10 1.5 2L4 14 m7 21 3-6-1.5-3 m7 3 3 6h4",
    "category": "ui",
    "tags": "cold weather freeze snow winter"
  },
  {
    "id": "soap-dispenser-droplet",
    "char": "M10.5 2v4 M14 2H7a2 2 0 0 0-2 2 M19.29 14.76A6.67 6.67 0 0 1 17 11a6.6 6.6 0 0 1-2.29 3.76c-1.15.92-1.71 2.04-1.71 3.19 0 2.22 1.8 4.05 4 4.05s4-1.83 4-4.05c0-1.16-.57-2.26-1.71-3.19 M9.607 21H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7V7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3",
    "category": "ui",
    "tags": "wash bath water liquid fluid wet moisture damp bead globule"
  },
  {
    "id": "sofa",
    "char": "M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3 M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z M4 18v2 M20 18v2 M12 4v9",
    "category": "ui",
    "tags": "armchair furniture leisure lounge loveseat couch"
  },
  {
    "id": "solar-panel",
    "char": "M11 2h2 m14.28 14-4.56 8 m21 22-1.558-4H4.558 M3 10v2 M6.245 15.04A2 2 0 0 1 8 14h12a1 1 0 0 1 .864 1.505l-3.11 5.457A2 2 0 0 1 16 22H4a1 1 0 0 1-.863-1.506z M7 2a4 4 0 0 1-4 4 m8.66 7.66 1.41 1.41",
    "category": "ui",
    "tags": "solar panel solar panel sun energy electricity light"
  },
  {
    "id": "soup",
    "char": "M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z M7 21h10 M19.5 12 22 6 M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62 M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62 M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62",
    "category": "ui",
    "tags": "food dish restaurant course meal bowl starter"
  },
  {
    "id": "space",
    "char": "M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1",
    "category": "ui",
    "tags": "text selection letters characters font typography"
  },
  {
    "id": "spade",
    "char": "M12 18v4 M2 14.499a5.5 5.5 0 0 0 9.591 3.675.6.6 0 0 1 .818.001A5.5 5.5 0 0 0 22 14.5c0-2.29-1.5-4-3-5.5l-5.492-5.312a2 2 0 0 0-3-.02L5 8.999c-1.5 1.5-3 3.2-3 5.5",
    "category": "ui",
    "tags": "shape suit playing cards"
  },
  {
    "id": "sparkle",
    "char": "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
    "category": "ui",
    "tags": "star effect filter night magic shiny glitter twinkle celebration"
  },
  {
    "id": "sparkles",
    "char": "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z M20 2v4 M22 4h-4 M 4, 20 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "stars effect filter night magic"
  },
  {
    "id": "speaker",
    "char": "M 4 2 h 16 v 20 h -16 Z M12 6h.01 M 12, 14 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0 M12 14h.01",
    "category": "media",
    "tags": "sound audio music tweeter subwoofer bass production producer dj"
  },
  {
    "id": "speech",
    "char": "M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20 M19.8 17.8a7.5 7.5 0 0 0 .003-10.603 M17 15a3.5 3.5 0 0 0-.025-4.975",
    "category": "ui",
    "tags": "disability disabled dda human accessibility people sound"
  },
  {
    "id": "spell-check-2",
    "char": "m6 16 6-12 6 12 M8 12h8 M4 21c1.1 0 1.1-1 2.3-1s1.1 1 2.3 1c1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1",
    "category": "ui",
    "tags": "spelling error mistake oversight typo correction code linter a"
  },
  {
    "id": "spell-check",
    "char": "m6 16 6-12 6 12 M8 12h8 m16 20 2 2 4-4",
    "category": "ui",
    "tags": "spelling error mistake oversight typo correction code linter a"
  },
  {
    "id": "spline-pointer",
    "char": "M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z M5 17A12 12 0 0 1 17 5 M 19, 5 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 5, 19 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "path tool curve node click pointer target vector"
  },
  {
    "id": "spline",
    "char": "M 19, 5 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 5, 19 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M5 17A12 12 0 0 1 17 5",
    "category": "ui",
    "tags": "path pen tool shape curve draw"
  },
  {
    "id": "split",
    "char": "M16 3h5v5 M8 3H3v5 M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3 m15 9 6-6",
    "category": "ui",
    "tags": "break disband divide separate branch disunite"
  },
  {
    "id": "spool",
    "char": "M17 13.44 4.442 17.082A2 2 0 0 0 4.982 21H19a2 2 0 0 0 .558-3.921l-1.115-.32A2 2 0 0 1 17 14.837V7.66 m7 10.56 12.558-3.642A2 2 0 0 0 19.018 3H5a2 2 0 0 0-.558 3.921l1.115.32A2 2 0 0 1 7 9.163v7.178",
    "category": "ui",
    "tags": "bobbin spindle yarn thread string sewing needlework"
  },
  {
    "id": "spotlight",
    "char": "M15.295 19.562 16 22 m17 16 3.758 2.098 m19 12.5 3.026-.598 M7.61 6.3a3 3 0 0 0-3.92 1.3l-1.38 2.79a3 3 0 0 0 1.3 3.91l6.89 3.597a1 1 0 0 0 1.342-.447l3.106-6.211a1 1 0 0 0-.447-1.341z M8 9V2",
    "category": "ui",
    "tags": "winner soapbox stage entertainment drama podium actor actress singer light beam play theatre show focus concert performance lens leaderboard followspot best highlight"
  },
  {
    "id": "spray-can",
    "char": "M3 3h.01 M7 5h.01 M11 7h.01 M3 7h.01 M7 9h.01 M3 11h.01 M 15 5 h 4 v 4 h -4 Z m19 9 2 2v10c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V11l2-2 m13 14 8-2 m13 19 8-2",
    "category": "ui",
    "tags": "paint color graffiti decoration aerosol deodorant shaving foam air freshener"
  },
  {
    "id": "sprout",
    "char": "M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3 M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4 M5 21h14",
    "category": "ui",
    "tags": "eco green growth leaf nature plant seed spring sustainability"
  },
  {
    "id": "square-activity",
    "char": "M 3 3 h 18 v 18 h -18 Z M17 12h-2l-2 5-2-10-2 5H7",
    "category": "ui",
    "tags": "pulse action motion movement exercise fitness healthcare heart rate monitor vital signs vitals emergency room er intensive care hospital defibrillator earthquake siesmic magnitude richter scale aftershock tremor shockwave audio waveform synthesizer synthesiser music"
  },
  {
    "id": "square-arrow-down-left",
    "char": "M 3 3 h 18 v 18 h -18 Z m16 8-8 8 M16 16H8V8",
    "category": "arrows",
    "tags": "direction south-west diagonal sign turn keyboard button"
  },
  {
    "id": "square-arrow-down-right",
    "char": "M 3 3 h 18 v 18 h -18 Z m8 8 8 8 M16 8v8H8",
    "category": "arrows",
    "tags": "direction south-east diagonal sign turn keyboard button"
  },
  {
    "id": "square-arrow-down",
    "char": "M 3 3 h 18 v 18 h -18 Z M12 8v8 m8 12 4 4 4-4",
    "category": "arrows",
    "tags": "backwards reverse direction south sign keyboard button"
  },
  {
    "id": "square-arrow-left",
    "char": "M 3 3 h 18 v 18 h -18 Z m12 8-4 4 4 4 M16 12H8",
    "category": "arrows",
    "tags": "previous back direction west sign keyboard button <-"
  },
  {
    "id": "square-arrow-out-down-left",
    "char": "M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6 m3 21 9-9 M9 21H3v-6",
    "category": "arrows",
    "tags": "outwards direction south-west diagonal"
  },
  {
    "id": "square-arrow-out-down-right",
    "char": "M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6 m21 21-9-9 M21 15v6h-6",
    "category": "arrows",
    "tags": "outwards direction south-east diagonal"
  },
  {
    "id": "square-arrow-out-up-left",
    "char": "M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6 m3 3 9 9 M3 9V3h6",
    "category": "arrows",
    "tags": "outwards direction north-west diagonal"
  },
  {
    "id": "square-arrow-out-up-right",
    "char": "M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6 m21 3-9 9 M15 3h6v6",
    "category": "arrows",
    "tags": "outwards direction north-east diagonal share open external link"
  },
  {
    "id": "square-arrow-right-enter",
    "char": "m10 16 4-4-4-4 M3 12h11 M3 8V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3",
    "category": "arrows",
    "tags": "left in inside input insert source import place ->"
  },
  {
    "id": "square-arrow-right-exit",
    "char": "M10 12h11 m17 16 4-4-4-4 M21 6.344V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1.344",
    "category": "ui",
    "tags": "out outside output export ->"
  },
  {
    "id": "square-arrow-right",
    "char": "M 3 3 h 18 v 18 h -18 Z M8 12h8 m12 16 4-4-4-4",
    "category": "arrows",
    "tags": "next forward direction west sign keyboard button ->"
  },
  {
    "id": "square-arrow-up-left",
    "char": "M 3 3 h 18 v 18 h -18 Z M8 16V8h8 M16 16 8 8",
    "category": "arrows",
    "tags": "direction north-west diagonal sign keyboard button"
  },
  {
    "id": "square-arrow-up-right",
    "char": "M 3 3 h 18 v 18 h -18 Z M8 8h8v8 m8 16 8-8",
    "category": "arrows",
    "tags": "direction north-east diagonal sign keyboard button share"
  },
  {
    "id": "square-arrow-up",
    "char": "M 3 3 h 18 v 18 h -18 Z m16 12-4-4-4 4 M12 16V8",
    "category": "arrows",
    "tags": "forward direction north sign keyboard button"
  },
  {
    "id": "square-asterisk",
    "char": "M 3 3 h 18 v 18 h -18 Z M12 8v8 m8.5 14 7-4 m8.5 10 7 4",
    "category": "ui",
    "tags": "password secret access key multiply multiplication glob pattern wildcard *"
  },
  {
    "id": "square-bottom-dashed-scissors",
    "char": "M 3 5 A2 2 0 0 1 5 3 M 19 3 A2 2 0 0 1 21 5 M 5 21 A2 2 0 0 1 3 19 M 21 19 A2 2 0 0 1 19 21 M 8.5, 8.5 m -1.5, 0 a 1.5,1.5 0 1,0 3,0 a 1.5,1.5 0 1,0 -3,0 M 8.5, 15.5 m -1.5, 0 a 1.5,1.5 0 1,0 3,0 a 1.5,1.5 0 1,0 -3,0",
    "category": "ui",
    "tags": "cut snippet chop stationery crafts"
  },
  {
    "id": "square-centerline-dashed-horizontal",
    "char": "M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3 M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3 M12 20v2 M12 14v2 M12 8v2 M12 2v2",
    "category": "ui",
    "tags": "reflect mirror alignment dashed"
  },
  {
    "id": "square-centerline-dashed-vertical",
    "char": "M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3 M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3 M4 12H2 M10 12H8 M16 12h-2 M22 12h-2",
    "category": "ui",
    "tags": "reflect mirror alignment dashed"
  },
  {
    "id": "square-chart-gantt",
    "char": "M 3 3 h 18 v 18 h -18 Z M9 8h7 M8 12h6 M11 16h5",
    "category": "ui",
    "tags": "projects manage overview roadmap plan intentions timeline deadline date event range period productivity work agile code coding toolbar button"
  },
  {
    "id": "square-check-big",
    "char": "M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344 m9 11 3 3L22 4",
    "category": "ui",
    "tags": "done todo tick complete task"
  },
  {
    "id": "square-check",
    "char": "M 3 3 h 18 v 18 h -18 Z m9 12 2 2 4-4",
    "category": "ui",
    "tags": "done todo tick complete task"
  },
  {
    "id": "square-chevron-down",
    "char": "M 3 3 h 18 v 18 h -18 Z m16 10-4 4-4-4",
    "category": "arrows",
    "tags": "back menu panel"
  },
  {
    "id": "square-chevron-left",
    "char": "M 3 3 h 18 v 18 h -18 Z m14 16-4-4 4-4",
    "category": "arrows",
    "tags": "back previous less than fewer menu panel button keyboard <"
  },
  {
    "id": "square-chevron-right",
    "char": "M 3 3 h 18 v 18 h -18 Z m10 8 4 4-4 4",
    "category": "arrows",
    "tags": "forward next more than greater menu panel code coding command line terminal prompt shell console >"
  },
  {
    "id": "square-chevron-up",
    "char": "M 3 3 h 18 v 18 h -18 Z m8 14 4-4 4 4",
    "category": "arrows",
    "tags": "caret keyboard button mac control ctrl superscript exponential power ahead menu panel ^"
  },
  {
    "id": "square-code",
    "char": "m10 9-3 3 3 3 m14 15 3-3-3-3 M 3 3 h 18 v 18 h -18 Z",
    "category": "ui",
    "tags": "gist source programming html xml coding"
  },
  {
    "id": "square-dashed-bottom-code",
    "char": "M10 9.5 8 12l2 2.5 M14 21h1 m14 9.5 2 2.5-2 2.5 M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2 M9 21h1",
    "category": "ui",
    "tags": "rectangle aspect ratio 1:1 shape snippet code coding"
  },
  {
    "id": "square-dashed-bottom",
    "char": "M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2 M9 21h1 M14 21h1",
    "category": "ui",
    "tags": "rectangle aspect ratio 1:1 shape snippet code coding"
  },
  {
    "id": "square-dashed-kanban",
    "char": "M8 7v7 M12 7v4 M16 7v9 M5 3a2 2 0 0 0-2 2 M9 3h1 M14 3h1 M19 3a2 2 0 0 1 2 2 M21 9v1 M21 14v1 M21 19a2 2 0 0 1-2 2 M14 21h1 M9 21h1 M5 21a2 2 0 0 1-2-2 M3 14v1 M3 9v1",
    "category": "ui",
    "tags": "projects manage overview board tickets issues roadmap plan intentions productivity work agile draft template boilerplate code coding"
  },
  {
    "id": "square-dashed-mouse-pointer",
    "char": "M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z M5 3a2 2 0 0 0-2 2 M19 3a2 2 0 0 1 2 2 M5 21a2 2 0 0 1-2-2 M9 3h1 M9 21h2 M14 3h1 M3 9v1 M21 9v2 M3 14v1",
    "category": "ui",
    "tags": "inspector element mouse click pointer box browser selector target dom node"
  },
  {
    "id": "square-dashed-top-solid",
    "char": "M14 21h1 M21 14v1 M21 19a2 2 0 0 1-2 2 M21 9v1 M3 14v1 M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 M3 9v1 M5 21a2 2 0 0 1-2-2 M9 21h1",
    "category": "ui",
    "tags": "square border width layout style design rectangular marquee dashed box rectangle aspect ratio 1:1"
  },
  {
    "id": "square-dashed",
    "char": "M5 3a2 2 0 0 0-2 2 M19 3a2 2 0 0 1 2 2 M21 19a2 2 0 0 1-2 2 M5 21a2 2 0 0 1-2-2 M9 3h1 M9 21h1 M14 3h1 M14 21h1 M3 9v1 M21 9v1 M3 14v1 M21 14v1",
    "category": "ui",
    "tags": "selection square rectangular marquee tool dashed box"
  },
  {
    "id": "square-divide",
    "char": "M 3 3 h 18 v 18 h -18 Z",
    "category": "ui",
    "tags": "calculate math ÷ /"
  },
  {
    "id": "square-dot",
    "char": "M 3 3 h 18 v 18 h -18 Z M 12, 12 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0",
    "category": "ui",
    "tags": "git diff modified ."
  },
  {
    "id": "square-equal",
    "char": "M 3 3 h 18 v 18 h -18 Z M7 10h10 M7 14h10",
    "category": "ui",
    "tags": "calculate ="
  },
  {
    "id": "square-function",
    "char": "M 3 3 h 18 v 18 h -18 Z M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3 M9 11.2h5.7",
    "category": "ui",
    "tags": "programming code automation math"
  },
  {
    "id": "square-kanban",
    "char": "M 3 3 h 18 v 18 h -18 Z M8 7v7 M12 7v4 M16 7v9",
    "category": "ui",
    "tags": "projects manage overview board tickets issues roadmap plan intentions productivity work agile code coding toolbar button"
  },
  {
    "id": "square-library",
    "char": "M 3 3 h 18 v 18 h -18 Z M7 7v10 M11 7v10 m15 7 2 10",
    "category": "ui",
    "tags": "books reading written authors stories fiction novels information knowledge education high school university college academy learning study research collection vinyl records albums music package"
  },
  {
    "id": "square-m",
    "char": "M8 16V8.5a.5.5 0 0 1 .9-.3l2.7 3.599a.5.5 0 0 0 .8 0l2.7-3.6a.5.5 0 0 1 .9.3V16 M 3 3 h 18 v 18 h -18 Z",
    "category": "ui",
    "tags": "metro subway underground track line"
  },
  {
    "id": "square-menu",
    "char": "M 3 3 h 18 v 18 h -18 Z M7 8h10 M7 12h10 M7 16h10",
    "category": "ui",
    "tags": "bars navigation hamburger options menu bar panel"
  },
  {
    "id": "square-minus",
    "char": "M 3 3 h 18 v 18 h -18 Z M8 12h8",
    "category": "ui",
    "tags": "subtract remove decrease reduce calculator button keyboard line divider separator horizontal rule hr html markup markdown --- toolbar operator code coding minimum downgrade"
  },
  {
    "id": "square-mouse-pointer",
    "char": "M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6",
    "category": "ui",
    "tags": "inspector element mouse click pointer box browser selector target dom node"
  },
  {
    "id": "square-parking-off",
    "char": "M3.6 3.6A2 2 0 0 1 5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-.59 1.41 M3 8.7V19a2 2 0 0 0 2 2h10.3 m2 2 20 20 M13 13a3 3 0 1 0 0-6H9v2 M9 17v-2.3",
    "category": "ui",
    "tags": "parking lot car park no parking"
  },
  {
    "id": "square-parking",
    "char": "M 3 3 h 18 v 18 h -18 Z M9 17V7h4a3 3 0 0 1 0 6H9",
    "category": "ui",
    "tags": "parking lot car park"
  },
  {
    "id": "square-pause",
    "char": "M 3 3 h 18 v 18 h -18 Z",
    "category": "media",
    "tags": "music audio stop"
  },
  {
    "id": "square-pen",
    "char": "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
    "category": "ui",
    "tags": "pencil edit change create draw sketch draft writer writing biro ink marker felt tip stationery artist"
  },
  {
    "id": "square-percent",
    "char": "M 3 3 h 18 v 18 h -18 Z m15 9-6 6 M9 9h.01 M15 15h.01",
    "category": "ui",
    "tags": "verified unverified sale discount offer marketing sticker price tag"
  },
  {
    "id": "square-pi",
    "char": "M 3 3 h 18 v 18 h -18 Z M7 7h10 M10 7v10 M16 17a2 2 0 0 1-2-2V7",
    "category": "ui",
    "tags": "constant code coding programming symbol trigonometry geometry formula"
  },
  {
    "id": "square-pilcrow",
    "char": "M 3 3 h 18 v 18 h -18 Z M12 12H9.5a2.5 2.5 0 0 1 0-5H17 M12 7v10 M16 7v10",
    "category": "ui",
    "tags": "paragraph mark paraph blind typography type text prose symbol"
  },
  {
    "id": "square-play",
    "char": "M 3 3 h 18 v 18 h -18 Z M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z",
    "category": "media",
    "tags": "music audio video start run"
  },
  {
    "id": "square-plus",
    "char": "M 3 3 h 18 v 18 h -18 Z M8 12h8 M12 8v8",
    "category": "ui",
    "tags": "add new increase increment positive calculate calculator button keyboard toolbar maximum upgrade extra operator join concatenate code coding +"
  },
  {
    "id": "square-power",
    "char": "M12 7v4 M7.998 9.003a5 5 0 1 0 8-.005 M 3 3 h 18 v 18 h -18 Z",
    "category": "ui",
    "tags": "on off device switch toggle binary boolean reboot restart button keyboard troubleshoot"
  },
  {
    "id": "square-radical",
    "char": "M7 12h2l2 5 2-10h4 M 3 3 h 18 v 18 h -18 Z",
    "category": "ui",
    "tags": "calculate formula math operator root square symbol"
  },
  {
    "id": "square-round-corner",
    "char": "M21 11a8 8 0 0 0-8-8 M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
    "category": "ui",
    "tags": "border radius style design corner layout round rounded"
  },
  {
    "id": "square-scissors",
    "char": "M 3 3 h 18 v 18 h -18 Z M 8.5, 8.5 m -1.5, 0 a 1.5,1.5 0 1,0 3,0 a 1.5,1.5 0 1,0 -3,0 M 8.5, 15.5 m -1.5, 0 a 1.5,1.5 0 1,0 3,0 a 1.5,1.5 0 1,0 -3,0",
    "category": "ui",
    "tags": "cut snippet chop stationery crafts toolbar button"
  },
  {
    "id": "square-sigma",
    "char": "M 3 3 h 18 v 18 h -18 Z M16 8.9V7H8l4 5-4 5h8v-1.9",
    "category": "ui",
    "tags": "sum calculate formula math enumeration enumerate"
  },
  {
    "id": "square-slash",
    "char": "M 3 3 h 18 v 18 h -18 Z",
    "category": "ui",
    "tags": "git diff ignored divide division shortcut or /"
  },
  {
    "id": "square-split-horizontal",
    "char": "M8 19H5c-1 0-2-1-2-2V7c0-1 1-2 2-2h3 M16 5h3c1 0 2 1 2 2v10c0 1-1 2-2 2h-3",
    "category": "ui",
    "tags": "split divide"
  },
  {
    "id": "square-split-vertical",
    "char": "M5 8V5c0-1 1-2 2-2h10c1 0 2 1 2 2v3 M19 16v3c0 1-1 2-2 2H7c-1 0-2-1-2-2v-3",
    "category": "ui",
    "tags": "split divide"
  },
  {
    "id": "square-square",
    "char": "M 3 3 h 18 v 18 h -18 Z M 8 8 h 8 v 8 h -8 Z",
    "category": "ui",
    "tags": "float center rectangle"
  },
  {
    "id": "square-stack",
    "char": "M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2 M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2 M 14 14 h 8 v 8 h -8 Z",
    "category": "ui",
    "tags": "versions clone copy duplicate multiple revisions version control backup history"
  },
  {
    "id": "square-star",
    "char": "M11.035 7.69a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z M 3 3 h 18 v 18 h -18 Z",
    "category": "ui",
    "tags": "badge medal honour decoration order pin laurel trophy medallion insignia bronze silver gold"
  },
  {
    "id": "square-stop",
    "char": "M 3 3 h 18 v 18 h -18 Z M 9 9 h 6 v 6 h -6 Z",
    "category": "media",
    "tags": "media music"
  },
  {
    "id": "square-terminal",
    "char": "m7 11 2-2-2-2 M11 13h4 M 3 3 h 18 v 18 h -18 Z",
    "category": "ui",
    "tags": "code command line prompt shell"
  },
  {
    "id": "square-user-round",
    "char": "M18 21a6 6 0 0 0-12 0 M 12, 11 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0 M 3 3 h 18 v 18 h -18 Z",
    "category": "ui",
    "tags": "person account contact"
  },
  {
    "id": "square-user",
    "char": "M 3 3 h 18 v 18 h -18 Z M 12, 10 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2",
    "category": "ui",
    "tags": "person account contact"
  },
  {
    "id": "square-x",
    "char": "M 3 3 h 18 v 18 h -18 Z m15 9-6 6 m9 9 6 6",
    "category": "ui",
    "tags": "cancel close delete remove times clear math multiply multiplication"
  },
  {
    "id": "square",
    "char": "M 3 3 h 18 v 18 h -18 Z",
    "category": "ui",
    "tags": "stop playback music audio video rectangle aspect ratio 1:1 shape"
  },
  {
    "id": "squares-exclude",
    "char": "M16 12v2a2 2 0 0 1-2 2H9a1 1 0 0 0-1 1v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h0 M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1h-5a2 2 0 0 0-2 2v2",
    "category": "ui",
    "tags": "square pathfinder path exclude invert xor shape vector"
  },
  {
    "id": "squares-intersect",
    "char": "M10 22a2 2 0 0 1-2-2 M14 2a2 2 0 0 1 2 2 M16 22h-2 M2 10V8 M2 4a2 2 0 0 1 2-2 M20 8a2 2 0 0 1 2 2 M22 14v2 M22 20a2 2 0 0 1-2 2 M4 16a2 2 0 0 1-2-2 M8 10a2 2 0 0 1 2-2h5a1 1 0 0 1 1 1v5a2 2 0 0 1-2 2H9a1 1 0 0 1-1-1z M8 2h2",
    "category": "ui",
    "tags": "square pathfinder path intersect shape include vector"
  },
  {
    "id": "squares-subtract",
    "char": "M10 22a2 2 0 0 1-2-2 M16 22h-2 M16 4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-5a2 2 0 0 1 2-2h5a1 1 0 0 0 1-1z M20 8a2 2 0 0 1 2 2 M22 14v2 M22 20a2 2 0 0 1-2 2",
    "category": "ui",
    "tags": "square pathfinder path minus subtract subtraction shape front vector"
  },
  {
    "id": "squares-unite",
    "char": "M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 0 1 1h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-3a1 1 0 0 0-1-1z",
    "category": "ui",
    "tags": "square pathfinder path unite union shape merge vector"
  },
  {
    "id": "squircle-dashed",
    "char": "M13.77 3.043a34 34 0 0 0-3.54 0 M13.771 20.956a33 33 0 0 1-3.541.001 M20.18 17.74c-.51 1.15-1.29 1.93-2.439 2.44 M20.18 6.259c-.51-1.148-1.291-1.929-2.44-2.438 M20.957 10.23a33 33 0 0 1 0 3.54 M3.043 10.23a34 34 0 0 0 .001 3.541 M6.26 20.179c-1.15-.508-1.93-1.29-2.44-2.438 M6.26 3.82c-1.149.51-1.93 1.291-2.44 2.44",
    "category": "ui",
    "tags": "shape pending progress issue draft code coding version control"
  },
  {
    "id": "squircle",
    "char": "M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9",
    "category": "ui",
    "tags": "shape"
  },
  {
    "id": "squirrel",
    "char": "M15.236 22a3 3 0 0 0-2.2-5 M16 20a3 3 0 0 1 3-3h1a2 2 0 0 0 2-2v-2a4 4 0 0 0-4-4V4 M18 13h.01 M18 6a4 4 0 0 0-4 4 7 7 0 0 0-7 7c0-5 4-5 4-10.5a4.5 4.5 0 1 0-9 0 2.5 2.5 0 0 0 5 0C7 10 3 11 3 17c0 2.8 2.2 5 5 5h10",
    "category": "ui",
    "tags": "animal rodent pet pest nuts retrieve updates storage stash"
  },
  {
    "id": "stamp",
    "char": "M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-6 0c0 2 1 2 1 3.5V13 M20 15.5a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1z M5 22h14",
    "category": "ui",
    "tags": "mark print clone loyalty library"
  },
  {
    "id": "star-half",
    "char": "M12 18.338a2.1 2.1 0 0 0-.987.244L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679A.53.53 0 0 1 12 2",
    "category": "ui",
    "tags": "bookmark favorite like review rating"
  },
  {
    "id": "star-off",
    "char": "m10.344 4.688 1.181-2.393a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.237 3.152 m17.945 17.945.43 2.505a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a8 8 0 0 0 .4-.099 m2 2 20 20",
    "category": "ui",
    "tags": "dislike unlike remove unrate"
  },
  {
    "id": "star",
    "char": "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
    "category": "ui",
    "tags": "bookmark favorite like review rating"
  },
  {
    "id": "step-back",
    "char": "M13.971 4.285A2 2 0 0 1 17 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z M21 20V4",
    "category": "ui",
    "tags": "arrow previous music left reverse"
  },
  {
    "id": "step-forward",
    "char": "M10.029 4.285A2 2 0 0 0 7 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z M3 4v16",
    "category": "ui",
    "tags": "arrow next music right continue"
  },
  {
    "id": "stethoscope",
    "char": "M11 2v2 M5 2v2 M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1 M8 15a6 6 0 0 0 12 0v-3 M 20, 10 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "phonendoscope medical heart lungs sound"
  },
  {
    "id": "sticker",
    "char": "M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z M15 3v5a1 1 0 0 0 1 1h5 M8 13h.01 M16 13h.01 M10 16s.8 1 2 1c1.3 0 2-1 2-1",
    "category": "ui",
    "tags": "reaction emotion smile happy feedback"
  },
  {
    "id": "sticky-note",
    "char": "M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z M15 3v5a1 1 0 0 0 1 1h5",
    "category": "ui",
    "tags": "post-it comment annotation reaction memo reminder todo task idea brainstorm document page paper sheet stationary office"
  },
  {
    "id": "stone",
    "char": "M11.264 2.205A4 4 0 0 0 6.42 4.211l-4 8a4 4 0 0 0 1.359 5.117l6 4a4 4 0 0 0 4.438 0l6-4a4 4 0 0 0 1.576-4.592l-2-6a4 4 0 0 0-2.53-2.53z M11.99 22 14 12l7.822 3.184 M14 12 8.47 2.302",
    "category": "ui",
    "tags": "mineral geology nature solid pebble crystal ore hard coal stone rock boulder"
  },
  {
    "id": "store",
    "char": "M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5 M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244 M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05",
    "category": "ui",
    "tags": "shop supermarket stand boutique building"
  },
  {
    "id": "stretch-horizontal",
    "char": "M 2 4 h 20 v 6 h -20 Z M 2 14 h 20 v 6 h -20 Z",
    "category": "ui",
    "tags": "items flex justify distribute"
  },
  {
    "id": "stretch-vertical",
    "char": "M 4 2 h 6 v 20 h -6 Z M 14 2 h 6 v 20 h -6 Z",
    "category": "ui",
    "tags": "items flex justify distribute"
  },
  {
    "id": "strikethrough",
    "char": "M16 4H9a3 3 0 0 0-2.83 4 M14 12a4 4 0 0 1 0 8H6",
    "category": "ui",
    "tags": "cross out delete remove format"
  },
  {
    "id": "subscript",
    "char": "m4 5 8 8 m12 5-8 8 M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07",
    "category": "ui",
    "tags": "text"
  },
  {
    "id": "sun-dim",
    "char": "M 12, 12 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0 M12 4h.01 M20 12h.01 M12 20h.01 M4 12h.01 M17.657 6.343h.01 M17.657 17.657h.01 M6.343 17.657h.01 M6.343 6.343h.01",
    "category": "ui",
    "tags": "brightness dim low brightness low"
  },
  {
    "id": "sun-medium",
    "char": "M 12, 12 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0 M12 3v1 M12 20v1 M3 12h1 M20 12h1 m18.364 5.636-.707.707 m6.343 17.657-.707.707 m5.636 5.636.707.707 m17.657 17.657.707.707",
    "category": "ui",
    "tags": "brightness medium"
  },
  {
    "id": "sun-moon",
    "char": "M12 2v2 M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715 M16 12a4 4 0 0 0-4-4 m19 5-1.256 1.256 M20 12h2",
    "category": "ui",
    "tags": "dark light moon sun brightness theme auto theme system theme appearance"
  },
  {
    "id": "sun-snow",
    "char": "M10 21v-1 M10 4V3 M10 9a3 3 0 0 0 0 6 m14 20 1.25-2.5L18 18 m14 4 1.25 2.5L18 6 m17 21-3-6 1.5-3H22 m17 3-3 6 1.5 3 M2 12h1 m20 10-1.5 2 1.5 2 m3.64 18.36.7-.7 m4.34 6.34-.7-.7",
    "category": "ui",
    "tags": "weather air conditioning temperature hot cold seasons"
  },
  {
    "id": "sun",
    "char": "M 12, 12 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0 M12 2v2 M12 20v2 m4.93 4.93 1.41 1.41 m17.66 17.66 1.41 1.41 M2 12h2 M20 12h2 m6.34 17.66-1.41 1.41 m19.07 4.93-1.41 1.41",
    "category": "ui",
    "tags": "brightness weather light summer"
  },
  {
    "id": "sunrise",
    "char": "M12 2v8 m4.93 10.93 1.41 1.41 M2 18h2 M20 18h2 m19.07 10.93-1.41 1.41 M22 22H2 m8 6 4-4 4 4 M16 18a4 4 0 0 0-8 0",
    "category": "ui",
    "tags": "weather time morning day"
  },
  {
    "id": "sunset",
    "char": "M12 10V2 m4.93 10.93 1.41 1.41 M2 18h2 M20 18h2 m19.07 10.93-1.41 1.41 M22 22H2 m16 6-4 4-4-4 M16 18a4 4 0 0 0-8 0",
    "category": "ui",
    "tags": "weather time evening night"
  },
  {
    "id": "superscript",
    "char": "m4 19 8-8 m12 19-8-8 M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06",
    "category": "ui",
    "tags": "text exponent"
  },
  {
    "id": "swatch-book",
    "char": "M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7 M 7 17h.01 m11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8",
    "category": "files",
    "tags": "colors colours swatches pantone shades tint hue saturation brightness theme scheme palette samples textile carpet"
  },
  {
    "id": "swiss-franc",
    "char": "M10 21V3h8 M6 16h9 M10 9.5h7",
    "category": "ui",
    "tags": "currency money payment"
  },
  {
    "id": "switch-camera",
    "char": "M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5 M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5 M 12, 12 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 m18 22-3-3 3-3 m6 2 3 3-3 3",
    "category": "media",
    "tags": "photo selfie front back"
  },
  {
    "id": "sword",
    "char": "m11 19-6-6 m5 21-2-2 m8 16-4 4 M9.5 17.5 21 6V3h-3L6.5 14.5",
    "category": "ui",
    "tags": "battle challenge game war weapon"
  },
  {
    "id": "swords",
    "char": "",
    "category": "ui",
    "tags": "battle challenge game war weapon"
  },
  {
    "id": "syringe",
    "char": "m18 2 4 4 m17 7 3-3 M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5 m9 11 4 4 m5 19-3 3 m14 4 6 6",
    "category": "ui",
    "tags": "medicine medical needle pump plunger nozzle blood"
  },
  {
    "id": "table-2",
    "char": "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
    "category": "ui",
    "tags": "spreadsheet grid"
  },
  {
    "id": "table-cells-merge",
    "char": "M12 21v-6 M12 9V3 M3 15h18 M3 9h18 M 3 3 h 18 v 18 h -18 Z",
    "category": "ui",
    "tags": "spreadsheet grid row"
  },
  {
    "id": "table-cells-split",
    "char": "M12 15V9 M3 15h18 M3 9h18 M 3 3 h 18 v 18 h -18 Z",
    "category": "ui",
    "tags": "spreadsheet grid row"
  },
  {
    "id": "table-columns-split",
    "char": "M14 14v2 M14 20v2 M14 2v2 M14 8v2 M2 15h8 M2 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2 M2 9h8 M22 15h-4 M22 3h-2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2 M22 9h-4 M5 3v18",
    "category": "ui",
    "tags": "spreadsheet grid cut break divide separate segment"
  },
  {
    "id": "table-of-contents",
    "char": "M16 5H3 M16 12H3 M16 19H3 M21 5h.01 M21 12h.01 M21 19h.01",
    "category": "ui",
    "tags": "toc outline navigation document structure index overview sections chapters content documentation manual knowledge base faq"
  },
  {
    "id": "table-properties",
    "char": "M15 3v18 M 3 3 h 18 v 18 h -18 Z M21 9H3 M21 15H3",
    "category": "ui",
    "tags": "property list plist spreadsheet grid dictionary object hash"
  },
  {
    "id": "table-rows-split",
    "char": "M14 10h2 M15 22v-8 M15 2v4 M2 10h2 M20 10h2 M3 19h18 M3 22v-6a2 2 135 0 1 2-2h14a2 2 45 0 1 2 2v6 M3 2v2a2 2 45 0 0 2 2h14a2 2 135 0 0 2-2V2 M8 10h2 M9 22v-8 M9 2v4",
    "category": "ui",
    "tags": "spreadsheet grid cut break divide separate segment"
  },
  {
    "id": "table",
    "char": "M12 3v18 M 3 3 h 18 v 18 h -18 Z M3 9h18 M3 15h18",
    "category": "ui",
    "tags": "spreadsheet grid"
  },
  {
    "id": "tablet-smartphone",
    "char": "M 3 8 h 10 v 14 h -10 Z M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4 M8 18h.01",
    "category": "communication",
    "tags": "responsive screens browser testing mobile"
  },
  {
    "id": "tablet",
    "char": "M 4 2 h 16 v 20 h -16 Z",
    "category": "ui",
    "tags": "device"
  },
  {
    "id": "tablets",
    "char": "M 7, 7 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0 M 17, 17 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0 M12 17h10 m3.46 10.54 7.08-7.08",
    "category": "ui",
    "tags": "medicine medication drug prescription pills pharmacy"
  },
  {
    "id": "tag",
    "char": "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z M 7.5, 7.5 m -.5, 0 a .5,.5 0 1,0 1,0 a .5,.5 0 1,0 -1,0",
    "category": "ui",
    "tags": "label badge ticket mark"
  },
  {
    "id": "tags",
    "char": "M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193 M 10.5, 6.5 m -.5, 0 a .5,.5 0 1,0 1,0 a .5,.5 0 1,0 -1,0",
    "category": "ui",
    "tags": "labels badges tickets marks copy multiple"
  },
  {
    "id": "tally-1",
    "char": "M4 4v16",
    "category": "ui",
    "tags": "count score enumerate days one 1 first bar prison cell sentence"
  },
  {
    "id": "tally-2",
    "char": "M4 4v16 M9 4v16",
    "category": "ui",
    "tags": "count score enumerate days two 2 second double bars prison cell sentence"
  },
  {
    "id": "tally-3",
    "char": "M4 4v16 M9 4v16 M14 4v16",
    "category": "ui",
    "tags": "count score enumerate days three 3 third triple bars prison cell sentence"
  },
  {
    "id": "tally-4",
    "char": "M4 4v16 M9 4v16 M14 4v16 M19 4v16",
    "category": "ui",
    "tags": "count score enumerate days 4 fourth quadruple bars prison cell sentence"
  },
  {
    "id": "tally-5",
    "char": "M4 4v16 M9 4v16 M14 4v16 M19 4v16 M22 6 2 18",
    "category": "ui",
    "tags": "count score enumerate days five 5 fifth bars prison cell sentence slash /"
  },
  {
    "id": "tangent",
    "char": "M 17, 4 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M15.59 5.41 5.41 15.59 M 4, 17 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M12 22s-4-9-1.5-11.5S22 12 22 12",
    "category": "ui",
    "tags": "tangential shape circle geometry trigonometry bezier curve"
  },
  {
    "id": "target",
    "char": "M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M 12, 12 m -6, 0 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0 M 12, 12 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "logo bullseye deadline projects overview work productivity"
  },
  {
    "id": "telescope",
    "char": "m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44 m13.56 11.747 4.332-.924 m16 21-3.105-6.21 M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z m6.158 8.633 1.114 4.456 m8 21 3.105-6.21 M 12, 13 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "astronomy space discovery exploration explore vision perspective focus stargazing observe view"
  },
  {
    "id": "tent-tree",
    "char": "M 4, 4 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 m14 5 3-3 3 3 m14 10 3-3 3 3 M17 14V2 M17 14H7l-5 8h20Z M8 14v8 m9 14 5 8",
    "category": "ui",
    "tags": "camping campsite holiday retreat nomadic wilderness outdoors"
  },
  {
    "id": "tent",
    "char": "M3.5 21 14 3 M20.5 21 10 3 M15.5 21 12 15l-3.5 6 M2 21h20",
    "category": "ui",
    "tags": "tipi teepee wigwam lodge camping campsite holiday retreat nomadic native american indian wilderness outdoors"
  },
  {
    "id": "terminal",
    "char": "M12 19h8 m4 17 6-6-6-6",
    "category": "ui",
    "tags": "code command line prompt shell"
  },
  {
    "id": "test-tube-diagonal",
    "char": "M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4L17 3 m16 2 6 6 M12 16H4",
    "category": "ui",
    "tags": "tube vial phial flask ampoule ampule lab chemistry experiment test"
  },
  {
    "id": "test-tube",
    "char": "M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2 M8.5 2h7 M14.5 16h-5",
    "category": "ui",
    "tags": "tube vial phial flask ampoule ampule lab chemistry experiment test"
  },
  {
    "id": "test-tubes",
    "char": "M9 2v17.5A2.5 2.5 0 0 1 6.5 22A2.5 2.5 0 0 1 4 19.5V2 M20 2v17.5a2.5 2.5 0 0 1-2.5 2.5a2.5 2.5 0 0 1-2.5-2.5V2 M3 2h7 M14 2h7 M9 16H4 M20 16h-5",
    "category": "ui",
    "tags": "tubes vials phials flasks ampoules ampules lab chemistry experiment test"
  },
  {
    "id": "text-align-center",
    "char": "M21 5H3 M17 12H7 M19 19H5",
    "category": "ui",
    "tags": "text alignment center"
  },
  {
    "id": "text-align-end",
    "char": "M21 5H3 M21 12H9 M21 19H7",
    "category": "ui",
    "tags": "text alignment right"
  },
  {
    "id": "text-align-justify",
    "char": "M3 5h18 M3 12h18 M3 19h18",
    "category": "ui",
    "tags": "text alignment justified menu list"
  },
  {
    "id": "text-align-start",
    "char": "M21 5H3 M15 12H3 M17 19H3",
    "category": "ui",
    "tags": "text alignment left list"
  },
  {
    "id": "text-cursor-input",
    "char": "M12 20h-1a2 2 0 0 1-2-2 2 2 0 0 1-2 2H6 M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7 M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1 M6 4h1a2 2 0 0 1 2 2 2 2 0 0 1 2-2h1 M9 6v12",
    "category": "ui",
    "tags": "select"
  },
  {
    "id": "text-cursor",
    "char": "M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1 M7 22h1a4 4 0 0 0 4-4v-1 M7 2h1a4 4 0 0 1 4 4v1",
    "category": "ui",
    "tags": "select"
  },
  {
    "id": "text-initial",
    "char": "M15 5h6 M15 12h6 M3 19h18 m3 12 3.553-7.724a.5.5 0 0 1 .894 0L11 12 M3.92 10h6.16",
    "category": "ui",
    "tags": "drop cap text format typography letter font size"
  },
  {
    "id": "text-quote",
    "char": "M17 5H3 M21 12H8 M21 19H8 M3 12v7",
    "category": "ui",
    "tags": "blockquote quotation indent reply response"
  },
  {
    "id": "text-search",
    "char": "M21 5H3 M10 12H3 M10 19H3 M 17, 15 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 m21 19-1.9-1.9",
    "category": "ui",
    "tags": "find data copy txt pdf document scan magnifier magnifying glass lens"
  },
  {
    "id": "text-select",
    "char": "M14 21h1 M14 3h1 M19 3a2 2 0 0 1 2 2 M21 14v1 M21 19a2 2 0 0 1-2 2 M21 9v1 M3 14v1 M3 9v1 M5 21a2 2 0 0 1-2-2 M5 3a2 2 0 0 0-2 2 M7 12h10 M7 16h6 M7 8h8 M9 21h1 M9 3h1",
    "category": "ui",
    "tags": "find search selection dashed"
  },
  {
    "id": "text-wrap",
    "char": "m16 16-3 3 3 3 M3 12h14.5a1 1 0 0 1 0 7H13 M3 19h6 M3 5h18",
    "category": "ui",
    "tags": "words lines break paragraph"
  },
  {
    "id": "theater",
    "char": "M2 10s3-3 3-8 M22 10s-3-3-3-8 M10 2c0 4.4-3.6 8-8 8 M14 2c0 4.4 3.6 8 8 8 M2 10s2 2 2 5 M22 10s-2 2-2 5 M8 15h8 M2 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1 M14 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1",
    "category": "ui",
    "tags": "theater theatre entertainment podium stage musical"
  },
  {
    "id": "thermometer-snowflake",
    "char": "m10 20-1.25-2.5L6 18 M10 4 8.75 6.5 6 6 M10.585 15H10 M2 12h6.5L10 9 M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z m4 10 1.5 2L4 14 m7 21 3-6-1.5-3 m7 3 3 6h2",
    "category": "ui",
    "tags": "temperature celsius fahrenheit weather cold freeze freezing"
  },
  {
    "id": "thermometer-sun",
    "char": "M12 2v2 M12 8a4 4 0 0 0-1.645 7.647 M2 12h2 M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z m4.93 4.93 1.41 1.41 m6.34 17.66-1.41 1.41",
    "category": "ui",
    "tags": "temperature celsius fahrenheit weather warm hot"
  },
  {
    "id": "thermometer",
    "char": "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z",
    "category": "ui",
    "tags": "temperature celsius fahrenheit weather"
  },
  {
    "id": "thumbs-down",
    "char": "M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z M17 14V2",
    "category": "ui",
    "tags": "dislike bad emotion"
  },
  {
    "id": "thumbs-up",
    "char": "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z M7 10v12",
    "category": "ui",
    "tags": "like good emotion"
  },
  {
    "id": "ticket-check",
    "char": "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z m9 12 2 2 4-4",
    "category": "ui",
    "tags": "entry pass voucher event concert show booked purchased receipt redeemed validated verified certified checked used"
  },
  {
    "id": "ticket-minus",
    "char": "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z M9 12h6",
    "category": "ui",
    "tags": "entry pass voucher event concert show remove cancel unbook subtract decrease -"
  },
  {
    "id": "ticket-percent",
    "char": "M2 9a3 3 0 1 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z M9 9h.01 m15 9-6 6 M15 15h.01",
    "category": "ui",
    "tags": "discount reduced offer voucher entry pass event concert show book purchase %"
  },
  {
    "id": "ticket-plus",
    "char": "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z M9 12h6 M12 9v6",
    "category": "ui",
    "tags": "entry pass voucher event concert show book purchase add +"
  },
  {
    "id": "ticket-slash",
    "char": "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z m9.5 14.5 5-5",
    "category": "ui",
    "tags": "entry pass voucher event concert show redeemed used marked checked verified spoiled invalidated void denied refused banned barred forbidden prohibited cancelled cancellation refunded delete remove clear error"
  },
  {
    "id": "ticket-x",
    "char": "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z m9.5 14.5 5-5 m9.5 9.5 5 5",
    "category": "ui",
    "tags": "entry pass voucher event concert show cancelled cancellation refunded used void invalidated spoiled denied refused banned barred forbidden prohibited delete remove clear error x"
  },
  {
    "id": "ticket",
    "char": "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z M13 5v2 M13 17v2 M13 11v2",
    "category": "ui",
    "tags": "entry pass voucher event concert show perforated dashed"
  },
  {
    "id": "tickets-plane",
    "char": "M10.5 17h1.227a2 2 0 0 0 1.345-.52L18 12 m12 13.5 3.794.506 m3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8 M6 10V8 M6 14v1 M6 19v2 M 2 8 h 20 v 13 h -20 Z",
    "category": "ui",
    "tags": "plane trip airplane flight travel fly takeoff vacation passenger pass check-in airport"
  },
  {
    "id": "tickets",
    "char": "m3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8 M6 10V8 M6 14v1 M6 19v2 M 2 8 h 20 v 13 h -20 Z",
    "category": "ui",
    "tags": "trip travel pass entry voucher event concert show perforated dashed"
  },
  {
    "id": "timer-off",
    "char": "M10 2h4 M4.6 11a8 8 0 0 0 1.7 8.7 8 8 0 0 0 8.7 1.7 M7.4 7.4a8 8 0 0 1 10.3 1 8 8 0 0 1 .9 10.2 m2 2 20 20 M12 12v-2",
    "category": "ui",
    "tags": "time timer stopwatch"
  },
  {
    "id": "timer-reset",
    "char": "M10 2h4 M12 14v-4 M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6 M9 17H4v5",
    "category": "ui",
    "tags": "time timer stopwatch"
  },
  {
    "id": "timer",
    "char": "M 12, 14 m -8, 0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
    "category": "ui",
    "tags": "time timer stopwatch"
  },
  {
    "id": "toggle-left",
    "char": "M 9, 12 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 2 5 h 20 v 14 h -20 Z",
    "category": "ui",
    "tags": "on off switch boolean"
  },
  {
    "id": "toggle-right",
    "char": "M 15, 12 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 2 5 h 20 v 14 h -20 Z",
    "category": "ui",
    "tags": "on off switch boolean"
  },
  {
    "id": "toilet",
    "char": "M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18 M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8",
    "category": "ui",
    "tags": "toilet potty bathroom washroom"
  },
  {
    "id": "tool-case",
    "char": "M10 15h4 m14.817 10.995-.971-1.45 1.034-1.232a2 2 0 0 0-2.025-3.238l-1.82.364L9.91 3.885a2 2 0 0 0-3.625.748L6.141 6.55l-1.725.426a2 2 0 0 0-.19 3.756l.657.27 m18.822 10.995 2.26-5.38a1 1 0 0 0-.557-1.318L16.954 2.9a1 1 0 0 0-1.281.533l-.924 2.122 M4 12.006A1 1 0 0 1 4.994 11H19a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z",
    "category": "ui",
    "tags": "tools maintenance repair"
  },
  {
    "id": "toolbox",
    "char": "M16 12v4 M16 6a2 2 0 0 1 1.414.586l4 4A2 2 0 0 1 22 12v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 .586-1.414l4-4A2 2 0 0 1 8 6z M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2 M2 14h20 M8 12v4",
    "category": "ui",
    "tags": "toolkit tools trunk chest box storage utility utilities container kit set repair fix service maintenance mechanic workshop construction hardware equipment gear handyman engineering craft diy"
  },
  {
    "id": "tornado",
    "char": "M21 4H3 M18 8H6 M19 12H9 M16 16h-6 M11 20H9",
    "category": "ui",
    "tags": "weather wind storm hurricane"
  },
  {
    "id": "torus",
    "char": "",
    "category": "ui",
    "tags": "donut doughnut ring hollow 3d fast food junk food snack treat sweet sugar dessert"
  },
  {
    "id": "touchpad-off",
    "char": "M12 20v-6 M19.656 14H22 M2 14h12 m2 2 20 20 M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2 M9.656 4H20a2 2 0 0 1 2 2v10.344",
    "category": "ui",
    "tags": "trackpad cursor"
  },
  {
    "id": "touchpad",
    "char": "M 2 4 h 20 v 16 h -20 Z M2 14h20 M12 20v-6",
    "category": "ui",
    "tags": "trackpad cursor"
  },
  {
    "id": "towel-rack",
    "char": "M22 7h-2 M6.5 3h11A2.5 2.5 0 0 1 20 5.5V20a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V5.5a1 1 0 0 0-5 0V17a1 1 0 0 0 1 1h4 M9 7H2",
    "category": "ui",
    "tags": "flannel bathroom toiletries sanitation clean fresh dry laundry laundrette hospitality housekeeping room service spa break health club amenities hanging"
  },
  {
    "id": "tower-control",
    "char": "M18.2 12.27 20 6H4l1.8 6.27a1 1 0 0 0 .95.73h10.5a1 1 0 0 0 .96-.73Z M8 13v9 M16 22v-9 m9 6 1 7 m15 6-1 7 M12 6V2 M13 2h-2",
    "category": "ui",
    "tags": "airport travel tower transportation lighthouse"
  },
  {
    "id": "toy-brick",
    "char": "M 3 8 h 18 v 12 h -18 Z M10 8V5c0-.6-.4-1-1-1H6a1 1 0 0 0-1 1v3 M19 8V5c0-.6-.4-1-1-1h-3a1 1 0 0 0-1 1v3",
    "category": "ui",
    "tags": "lego block addon plugin integration"
  },
  {
    "id": "tractor",
    "char": "m10 11 11 .9a1 1 0 0 1 .8 1.1l-.665 4.158a1 1 0 0 1-.988.842H20 M16 18h-5 M18 5a1 1 0 0 0-1 1v5.573 M3 4h8.129a1 1 0 0 1 .99.863L13 11.246 M4 11V4 M7 15h.01 M8 10.1V4 M 18, 18 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 7, 15 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
    "category": "ui",
    "tags": "farming farmer ranch harvest equipment vehicle"
  },
  {
    "id": "traffic-cone",
    "char": "M16.05 10.966a5 2.5 0 0 1-8.1 0 m16.923 14.049 4.48 2.04a1 1 0 0 1 .001 1.831l-8.574 3.9a2 2 0 0 1-1.66 0l-8.574-3.91a1 1 0 0 1 0-1.83l4.484-2.04 M16.949 14.14a5 2.5 0 1 1-9.9 0L10.063 3.5a2 2 0 0 1 3.874 0z M9.194 6.57a5 2.5 0 0 0 5.61 0",
    "category": "ui",
    "tags": "roadworks tarmac safety block"
  },
  {
    "id": "train-front-tunnel",
    "char": "M2 22V12a10 10 0 1 1 20 0v10 M15 6.8v1.4a3 2.8 0 1 1-6 0V6.8 M10 15h.01 M14 15h.01 M10 19a4 4 0 0 1-4-4v-3a6 6 0 1 1 12 0v3a4 4 0 0 1-4 4Z m9 19-2 3 m15 19 2 3",
    "category": "ui",
    "tags": "railway metro subway underground speed bullet fast track line"
  },
  {
    "id": "train-front",
    "char": "M8 3.1V7a4 4 0 0 0 8 0V3.1 m9 15-1-1 m15 15 1-1 M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z m8 19-2 3 m16 19 2 3",
    "category": "ui",
    "tags": "railway metro subway underground high-speed bullet fast track line"
  },
  {
    "id": "train-track",
    "char": "M2 17 17 2 m2 14 8 8 m5 11 8 8 m8 8 8 8 m11 5 8 8 m14 2 8 8 M7 22 22 7",
    "category": "ui",
    "tags": "railway line"
  },
  {
    "id": "tram-front",
    "char": "M 4 3 h 16 v 16 h -16 Z M4 11h16 M12 3v8 m8 19-2 3 m18 22-2-3 M8 15h.01 M16 15h.01",
    "category": "ui",
    "tags": "railway metro subway underground track line tourism"
  },
  {
    "id": "transgender",
    "char": "M12 16v6 M14 20h-4 M18 2h4v4 m2 2 7.17 7.17 M2 5.355V2h3.357 m22 2-7.17 7.17 M8 5 5 8 M 12, 12 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
    "category": "ui",
    "tags": "gender inclusive"
  },
  {
    "id": "trash-2",
    "char": "M10 11v6 M14 11v6 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6 M3 6h18 M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
    "category": "ui",
    "tags": "garbage delete remove bin"
  },
  {
    "id": "trash",
    "char": "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6 M3 6h18 M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
    "category": "ui",
    "tags": "empty deletion cleanup junk clear garbage delete remove bin waste recycle discard binoculars rubbish"
  },
  {
    "id": "tree-deciduous",
    "char": "M8 19a4 4 0 0 1-2.24-7.32A3.5 3.5 0 0 1 9 6.03V6a3 3 0 1 1 6 0v.04a3.5 3.5 0 0 1 3.24 5.65A4 4 0 0 1 16 19Z M12 19v3",
    "category": "ui",
    "tags": "tree forest park nature"
  },
  {
    "id": "tree-palm",
    "char": "M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4 M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3 M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35 M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14",
    "category": "ui",
    "tags": "vacation leisure island"
  },
  {
    "id": "tree-pine",
    "char": "m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z M12 22v-3",
    "category": "ui",
    "tags": "tree pine forest park nature"
  },
  {
    "id": "trees",
    "char": "M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z M7 16v6 M13 19v3 M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5",
    "category": "ui",
    "tags": "tree forest park nature"
  },
  {
    "id": "trello",
    "char": "M 3 3 h 18 v 18 h -18 Z M 7 7 h 3 v 9 h -3 Z M 14 7 h 3 v 5 h -3 Z",
    "category": "ui",
    "tags": "logo brand"
  },
  {
    "id": "trending-down",
    "char": "M16 17h6v-6 m22 17-8.5-8.5-5 5L2 7",
    "category": "ui",
    "tags": "statistics"
  },
  {
    "id": "trending-up-down",
    "char": "M14.828 14.828 21 21 M21 16v5h-5 m21 3-9 9-4-4-6 6 M21 8V3h-5",
    "category": "ui",
    "tags": "arrows estimated indeterminate data fluctuation uncertain forecast variable prediction dynamic volatile"
  },
  {
    "id": "trending-up",
    "char": "M16 7h6v6 m22 7-8.5 8.5-5-5L2 17",
    "category": "ui",
    "tags": "statistics"
  },
  {
    "id": "triangle-alert",
    "char": "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3 M12 9v4 M12 17h.01",
    "category": "ui",
    "tags": "warning alert danger exclamation mark linter"
  },
  {
    "id": "triangle-dashed",
    "char": "M10.17 4.193a2 2 0 0 1 3.666.013 M14 21h2 m15.874 7.743 1 1.732 m18.849 12.952 1 1.732 M21.824 18.18a2 2 0 0 1-1.835 2.824 M4.024 21a2 2 0 0 1-1.839-2.839 m5.136 12.952-1 1.732 M8 21h2 m8.102 7.743-1 1.732",
    "category": "ui",
    "tags": "equilateral delta shape pyramid hierarchy dashed"
  },
  {
    "id": "triangle-right",
    "char": "M22 18a2 2 0 0 1-2 2H3c-1.1 0-1.3-.6-.4-1.3L20.4 4.3c.9-.7 1.6-.4 1.6.7Z",
    "category": "ui",
    "tags": "volume controls controller tv remote geometry delta ramp slope incline increase"
  },
  {
    "id": "triangle",
    "char": "M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",
    "category": "ui",
    "tags": "equilateral delta shape pyramid hierarchy"
  },
  {
    "id": "trophy",
    "char": "M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978 M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978 M18 9h1.5a1 1 0 0 0 0-5H18 M4 22h16 M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z M6 9H4.5a1 1 0 0 1 0-5H6",
    "category": "ui",
    "tags": "prize sports winner achievement award champion celebration victory"
  },
  {
    "id": "truck-electric",
    "char": "M14 19V7a2 2 0 0 0-2-2H9 M15 19H9 M19 19h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62L18.3 9.38a1 1 0 0 0-.78-.38H14 M2 13v5a1 1 0 0 0 1 1h2 M4 3 2.15 5.15a.495.495 0 0 0 .35.86h2.15a.47.47 0 0 1 .35.86L3 9.02 M 17, 19 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 7, 19 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "delivery van shipping haulage lorry electric"
  },
  {
    "id": "truck",
    "char": "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2 M15 18H9 M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14 M 17, 18 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 7, 18 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "delivery van shipping haulage lorry"
  },
  {
    "id": "turkish-lira",
    "char": "M15 4 5 9 m15 8.5-10 5 M18 12a9 9 0 0 1-9 9V3",
    "category": "ui",
    "tags": "currency money payment"
  },
  {
    "id": "turntable",
    "char": "M10 12.01h.01 M18 8v4a8 8 0 0 1-1.07 4 M 10, 12 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0 M 2 4 h 20 v 16 h -20 Z",
    "category": "ui",
    "tags": "record player gramophone stereo phonograph vinyl lp disc platter cut music analog retro dj deck disc jockey scratch spinning"
  },
  {
    "id": "turtle",
    "char": "m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z M4.82 7.9 8 10 M15.18 7.9 12 10 M16.93 10H20a2 2 0 0 1 0 4H2",
    "category": "ui",
    "tags": "animal pet tortoise slow speed"
  },
  {
    "id": "tv-minimal-play",
    "char": "M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z M7 21h10 M 2 3 h 20 v 14 h -20 Z",
    "category": "media",
    "tags": "flatscreen television stream display widescreen high-definition hd 1080p 4k 8k smart digital video movie live ott running start film home cinema entertainment showtime channels catchup"
  },
  {
    "id": "tv-minimal",
    "char": "M7 21h10 M 2 3 h 20 v 14 h -20 Z",
    "category": "ui",
    "tags": "flatscreen television stream display widescreen high-definition hd 1080p 4k 8k smart digital video home cinema entertainment showtime channels catchup"
  },
  {
    "id": "tv",
    "char": "m17 2-5 5-5-5 M 2 7 h 20 v 15 h -20 Z",
    "category": "ui",
    "tags": "television stream display widescreen high-definition hd 1080p 4k 8k smart digital video entertainment showtime channels terrestrial satellite cable broadcast live frequency tune scan aerial receiver transmission signal connection connectivity"
  },
  {
    "id": "twitch",
    "char": "M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7",
    "category": "ui",
    "tags": "logo social"
  },
  {
    "id": "twitter",
    "char": "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
    "category": "ui",
    "tags": "logo social"
  },
  {
    "id": "type-outline",
    "char": "M14 16.5a.5.5 0 0 0 .5.5h.5a2 2 0 0 1 0 4H9a2 2 0 0 1 0-4h.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V8a2 2 0 0 1-4 0V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-4 0v-.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5Z",
    "category": "ui",
    "tags": "text font typography silhouette profile contour stroke line"
  },
  {
    "id": "type",
    "char": "M12 4v16 M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2 M9 20h6",
    "category": "ui",
    "tags": "text font typography"
  },
  {
    "id": "umbrella-off",
    "char": "M12 13v7a2 2 0 0 0 4 0 M12 2v2 M18.656 13h2.336a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-12.07-7.51 m2 2 20 20 M5.961 5.957a10.28 10.28 0 0 0-3.922 5.769A1 1 0 0 0 3 13h10",
    "category": "ui",
    "tags": "rain weather uncovered uninsured antivirus unprotected risky"
  },
  {
    "id": "umbrella",
    "char": "M12 13v7a2 2 0 0 0 4 0 M12 2v2 M20.992 13a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-19.923 0A1 1 0 0 0 3 13z",
    "category": "ui",
    "tags": "rain weather"
  },
  {
    "id": "underline",
    "char": "M6 4v6a6 6 0 0 0 12 0V4",
    "category": "ui",
    "tags": "text format"
  },
  {
    "id": "undo-2",
    "char": "M9 14 4 9l5-5 M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",
    "category": "ui",
    "tags": "redo rerun history back return reverse revert direction u-turn"
  },
  {
    "id": "undo-dot",
    "char": "M21 17a9 9 0 0 0-15-6.7L3 13 M3 7v6h6 M 12, 17 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0",
    "category": "ui",
    "tags": "redo history step back"
  },
  {
    "id": "undo",
    "char": "M3 7v6h6 M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13",
    "category": "ui",
    "tags": "redo rerun history"
  },
  {
    "id": "unfold-horizontal",
    "char": "M16 12h6 M8 12H2 M12 2v2 M12 8v2 M12 14v2 M12 20v2 m19 15 3-3-3-3 m5 9-3 3 3 3",
    "category": "ui",
    "tags": "arrow collapse fold vertical dashed"
  },
  {
    "id": "unfold-vertical",
    "char": "M12 22v-6 M12 8V2 M4 12H2 M10 12H8 M16 12h-2 M22 12h-2 m15 19-3 3-3-3 m15 5-3-3-3 3",
    "category": "ui",
    "tags": "arrow expand vertical dashed"
  },
  {
    "id": "ungroup",
    "char": "M 5 4 h 8 v 6 h -8 Z M 11 14 h 8 v 6 h -8 Z",
    "category": "ui",
    "tags": "cubes packages parts units collection cluster separate"
  },
  {
    "id": "university",
    "char": "M14 21v-3a2 2 0 0 0-4 0v3 M18 12h.01 M18 16h.01 M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z M6 12h.01 M6 16h.01 M 12, 10 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "building education childhood school college academy institute"
  },
  {
    "id": "unlink-2",
    "char": "M15 7h2a5 5 0 0 1 0 10h-2m-6 0H7A5 5 0 0 1 7 7h2",
    "category": "ui",
    "tags": "url unchain"
  },
  {
    "id": "unlink",
    "char": "m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71 m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71",
    "category": "ui",
    "tags": "url unchain"
  },
  {
    "id": "unplug",
    "char": "m19 5 3-3 m2 22 3-3 M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z M7.5 13.5 10 11 M10.5 16.5 13 14 m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z",
    "category": "ui",
    "tags": "electricity energy electronics socket outlet disconnect"
  },
  {
    "id": "upload",
    "char": "M12 3v12 m17 8-5-5-5 5 M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
    "category": "files",
    "tags": "file"
  },
  {
    "id": "usb",
    "char": "M 10, 7 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 4, 20 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M4.7 19.3 19 5 m21 3-3 1 2 2Z M9.26 7.68 5 12l2 5 m10 14 5 2 3.5-3.5 m18 12 1-1 1 1-1 1Z",
    "category": "ui",
    "tags": "universal serial bus controller connector interface"
  },
  {
    "id": "user-check",
    "char": "m16 11 2 2 4-4 M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M 9, 7 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
    "category": "ui",
    "tags": "followed subscribed done todo tick complete task"
  },
  {
    "id": "user-cog",
    "char": "M10 15H6a4 4 0 0 0-4 4v2 m14.305 16.53.923-.382 m15.228 13.852-.923-.383 m16.852 12.228-.383-.923 m16.852 17.772-.383.924 m19.148 12.228.383-.923 m19.53 18.696-.382-.924 m20.772 13.852.924-.383 m20.772 16.148.924.383 M 18, 15 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M 9, 7 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
    "category": "ui",
    "tags": "settings edit cog gear"
  },
  {
    "id": "user-key",
    "char": "M20 11v6 M20 13h2 M3 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 2.072.578 M 10, 7 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0 M 20, 19 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "passkey password login authentication authorization roles permissions private public security person account contact"
  },
  {
    "id": "user-lock",
    "char": "M19 16v-2a2 2 0 0 0-4 0v2 M9.5 15H7a4 4 0 0 0-4 4v2 M 10, 7 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0 M 13 16 h 8 v 5 h -8 Z",
    "category": "ui",
    "tags": "person lock locked account secure"
  },
  {
    "id": "user-minus",
    "char": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M 9, 7 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
    "category": "ui",
    "tags": "delete remove unfollow unsubscribe"
  },
  {
    "id": "user-pen",
    "char": "M11.5 15H7a4 4 0 0 0-4 4v2 M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z M 10, 7 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
    "category": "ui",
    "tags": "person account contact profile edit change"
  },
  {
    "id": "user-plus",
    "char": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M 9, 7 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
    "category": "ui",
    "tags": "new add create follow subscribe"
  },
  {
    "id": "user-round-check",
    "char": "M2 21a8 8 0 0 1 13.292-6 M 10, 8 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0 m16 19 2 2 4-4",
    "category": "ui",
    "tags": "followed subscribed done todo tick complete task"
  },
  {
    "id": "user-round-cog",
    "char": "m14.305 19.53.923-.382 m15.228 16.852-.923-.383 m16.852 15.228-.383-.923 m16.852 20.772-.383.924 m19.148 15.228.383-.923 m19.53 21.696-.382-.924 M2 21a8 8 0 0 1 10.434-7.62 m20.772 16.852.924-.383 m20.772 19.148.924.383 M 10, 8 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0 M 18, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "settings edit cog gear"
  },
  {
    "id": "user-round-key",
    "char": "M19 11v6 M19 13h2 M2 21a8 8 0 0 1 12.868-6.349 M 10, 8 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0 M 19, 19 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "passkey password login authentication authorization roles permissions private public security person account contact"
  },
  {
    "id": "user-round-minus",
    "char": "M2 21a8 8 0 0 1 13.292-6 M 10, 8 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0 M22 19h-6",
    "category": "ui",
    "tags": "delete remove unfollow unsubscribe"
  },
  {
    "id": "user-round-pen",
    "char": "M2 21a8 8 0 0 1 10.821-7.487 M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z M 10, 8 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
    "category": "ui",
    "tags": "person account contact profile edit change"
  },
  {
    "id": "user-round-plus",
    "char": "M2 21a8 8 0 0 1 13.292-6 M 10, 8 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0 M19 16v6 M22 19h-6",
    "category": "ui",
    "tags": "new add create follow subscribe"
  },
  {
    "id": "user-round-search",
    "char": "M 10, 8 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0 M2 21a8 8 0 0 1 10.434-7.62 M 18, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 m22 22-1.9-1.9",
    "category": "ui",
    "tags": "person account contact find scan magnifier magnifying glass lens"
  },
  {
    "id": "user-round-x",
    "char": "M2 21a8 8 0 0 1 11.873-7 M 10, 8 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0 m17 17 5 5 m22 17-5 5",
    "category": "ui",
    "tags": "delete remove unfollow unsubscribe unavailable"
  },
  {
    "id": "user-round",
    "char": "M 12, 8 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0 M20 21a8 8 0 0 0-16 0",
    "category": "ui",
    "tags": "person account contact"
  },
  {
    "id": "user-search",
    "char": "M 10, 7 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0 M10.3 15H7a4 4 0 0 0-4 4v2 M 17, 17 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 m21 21-1.9-1.9",
    "category": "ui",
    "tags": "person account contact find scan magnifier magnifying glass lens"
  },
  {
    "id": "user-star",
    "char": "M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z M8 15H7a4 4 0 0 0-4 4v2 M 10, 7 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
    "category": "ui",
    "tags": "person account favorite contact like review rating admin"
  },
  {
    "id": "user-x",
    "char": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M 9, 7 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
    "category": "ui",
    "tags": "delete remove unfollow unsubscribe unavailable"
  },
  {
    "id": "user",
    "char": "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2 M 12, 7 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
    "category": "ui",
    "tags": "person account contact"
  },
  {
    "id": "users-round",
    "char": "M18 21a8 8 0 0 0-16 0 M 10, 8 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0 M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3",
    "category": "ui",
    "tags": "group people"
  },
  {
    "id": "users",
    "char": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M16 3.128a4 4 0 0 1 0 7.744 M22 21v-2a4 4 0 0 0-3-3.87 M 9, 7 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
    "category": "ui",
    "tags": "group people"
  },
  {
    "id": "utensils-crossed",
    "char": "m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8 M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7 m2.1 21.8 6.4-6.3 m19 5-7 7",
    "category": "ui",
    "tags": "fork knife cutlery flatware tableware silverware food restaurant meal breakfast dinner supper"
  },
  {
    "id": "utensils",
    "char": "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2 M7 2v20 M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",
    "category": "ui",
    "tags": "fork knife cutlery flatware tableware silverware food restaurant meal breakfast dinner supper"
  },
  {
    "id": "utility-pole",
    "char": "M12 2v20 M2 5h20 M3 3v2 M7 3v2 M17 3v2 M21 3v2 m19 5-7 7-7-7",
    "category": "ui",
    "tags": "electricity energy transmission line telegraph pole power lines phone"
  },
  {
    "id": "van",
    "char": "M13 6v5a1 1 0 0 0 1 1h6.102a1 1 0 0 1 .712.298l.898.91a1 1 0 0 1 .288.702V17a1 1 0 0 1-1 1h-3 M5 18H3a1 1 0 0 1-1-1V8a2 2 0 0 1 2-2h12c1.1 0 2.1.8 2.4 1.8l1.176 4.2 M9 18h5 M 16, 18 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 7, 18 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "minivan cart wagon truck lorry trailer camper vehicle drive trip journey van transport carriage delivery travel"
  },
  {
    "id": "variable",
    "char": "M8 21s-4-3-4-9 4-9 4-9 M16 3s4 3 4 9-4 9-4 9",
    "category": "ui",
    "tags": "code coding programming symbol calculate algebra x parentheses parenthesis brackets parameter ( )"
  },
  {
    "id": "vault",
    "char": "M 3 3 h 18 v 18 h -18 Z M 7.5, 7.5 m -.5, 0 a .5,.5 0 1,0 1,0 a .5,.5 0 1,0 -1,0 m7.9 7.9 2.7 2.7 M 16.5, 7.5 m -.5, 0 a .5,.5 0 1,0 1,0 a .5,.5 0 1,0 -1,0 m13.4 10.6 2.7-2.7 M 7.5, 16.5 m -.5, 0 a .5,.5 0 1,0 1,0 a .5,.5 0 1,0 -1,0 m7.9 16.1 2.7-2.7 M 16.5, 16.5 m -.5, 0 a .5,.5 0 1,0 1,0 a .5,.5 0 1,0 -1,0 m13.4 13.4 2.7 2.7 M 12, 12 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "safe lockbox deposit locker coffer strongbox safety secure storage valuables bank"
  },
  {
    "id": "vector-square",
    "char": "M19.5 7a24 24 0 0 1 0 10 M4.5 7a24 24 0 0 0 0 10 M7 19.5a24 24 0 0 0 10 0 M7 4.5a24 24 0 0 1 10 0 M 17 17 h 5 v 5 h -5 Z M 17 2 h 5 v 5 h -5 Z M 2 17 h 5 v 5 h -5 Z M 2 2 h 5 v 5 h -5 Z",
    "category": "ui",
    "tags": "shape geometry art width height size calculate measure select graphics box"
  },
  {
    "id": "vegan",
    "char": "M16 8q6 0 6-6-6 0-6 6 M17.41 3.59a10 10 0 1 0 3 3 M2 2a26.6 26.6 0 0 1 10 20c.9-6.82 1.5-9.5 4-14",
    "category": "ui",
    "tags": "vegetarian fruitarian herbivorous animal rights diet"
  },
  {
    "id": "venetian-mask",
    "char": "M18 11c-1.5 0-2.5.5-3 2 M4 6a2 2 0 0 0-2 2v4a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3a8 8 0 0 0-5 2 8 8 0 0 0-5-2z M6 11c1.5 0 2.5.5 3 2",
    "category": "ui",
    "tags": "mask masquerade impersonate secret incognito"
  },
  {
    "id": "venus-and-mars",
    "char": "M10 20h4 M12 16v6 M17 2h4v4 m21 2-5.46 5.46 M 12, 11 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
    "category": "ui",
    "tags": "gender sex intersex androgynous hermaphrodite"
  },
  {
    "id": "venus",
    "char": "M12 15v7 M9 19h6 M 12, 9 m -6, 0 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0",
    "category": "ui",
    "tags": "gender sex female feminine woman girl"
  },
  {
    "id": "vibrate-off",
    "char": "m2 8 2 2-2 2 2 2-2 2 m22 8-2 2 2 2-2 2 2 2 M8 8v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2 M16 10.34V6c0-.55-.45-1-1-1h-4.34",
    "category": "ui",
    "tags": "smartphone notification rumble haptic feedback notifications screen"
  },
  {
    "id": "vibrate",
    "char": "m2 8 2 2-2 2 2 2-2 2 m22 8-2 2 2 2-2 2 2 2 M 8 5 h 8 v 14 h -8 Z",
    "category": "ui",
    "tags": "smartphone notification rumble haptic feedback screen"
  },
  {
    "id": "video-off",
    "char": "M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196 M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2 m2 2 20 20",
    "category": "media",
    "tags": "camera movie film"
  },
  {
    "id": "video",
    "char": "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5 M 2 6 h 14 v 12 h -14 Z",
    "category": "media",
    "tags": "camera movie film recording motion picture camcorder reel"
  },
  {
    "id": "videotape",
    "char": "M 2 4 h 20 v 16 h -20 Z M2 8h20 M 8, 14 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M8 12h8 M 16, 14 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "media",
    "tags": "vhs movie film recording motion picture showreel cassette"
  },
  {
    "id": "view",
    "char": "M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2 M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2 M 12, 12 m -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0",
    "category": "ui",
    "tags": "eye look"
  },
  {
    "id": "voicemail",
    "char": "M 6, 12 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0 M 18, 12 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0",
    "category": "communication",
    "tags": "phone cassette tape reel recording audio"
  },
  {
    "id": "volleyball",
    "char": "M11.1 7.1a16.55 16.55 0 0 1 10.9 4 M12 12a12.6 12.6 0 0 1-8.7 5 M16.8 13.6a16.55 16.55 0 0 1-9 7.5 M20.7 17a12.8 12.8 0 0 0-8.7-5 13.3 13.3 0 0 1 0-10 M6.3 3.8a16.55 16.55 0 0 0 1.9 11.5 M 12, 12 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0",
    "category": "ui",
    "tags": "beach sand net holiday vacation summer soccer football futbol kick pitch goal score bounce leather wool yarn knitting sewing thread embroidery textile"
  },
  {
    "id": "volume-1",
    "char": "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z M16 9a5 5 0 0 1 0 6",
    "category": "media",
    "tags": "music sound speaker"
  },
  {
    "id": "volume-2",
    "char": "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z M16 9a5 5 0 0 1 0 6 M19.364 18.364a9 9 0 0 0 0-12.728",
    "category": "media",
    "tags": "music sound speaker"
  },
  {
    "id": "volume-off",
    "char": "M16 9a5 5 0 0 1 .95 2.293 M19.364 5.636a9 9 0 0 1 1.889 9.96 m2 2 20 20 m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11 M9.828 4.172A.686.686 0 0 1 11 4.657v.686",
    "category": "media",
    "tags": "music sound mute speaker"
  },
  {
    "id": "volume-x",
    "char": "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
    "category": "ui",
    "tags": "music sound mute speaker"
  },
  {
    "id": "volume",
    "char": "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
    "category": "media",
    "tags": "music sound mute speaker"
  },
  {
    "id": "vote",
    "char": "m9 12 2 2 4-4 M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z M22 19H2",
    "category": "ui",
    "tags": "vote poll ballot political social check tick"
  },
  {
    "id": "wallet-cards",
    "char": "M 3 3 h 18 v 18 h -18 Z M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21",
    "category": "ui",
    "tags": "money finance pocket credit purchase payment shopping retail consumer cc"
  },
  {
    "id": "wallet-minimal",
    "char": "M17 14h.01 M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14",
    "category": "ui",
    "tags": "finance pocket"
  },
  {
    "id": "wallet",
    "char": "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1 M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",
    "category": "ui",
    "tags": "money finance pocket"
  },
  {
    "id": "wallpaper",
    "char": "M12 17v4 M8 21h8 m9 17 6.1-6.1a2 2 0 0 1 2.81.01L22 15 M 8, 9 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 2 3 h 20 v 14 h -20 Z",
    "category": "ui",
    "tags": "background texture image art design visual decor pattern screen cover lock screen"
  },
  {
    "id": "wand-sparkles",
    "char": "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72 m14 7 3 3 M5 6v4 M19 14v4 M10 2v2 M7 8H3 M21 16h-4 M11 3H9",
    "category": "ui",
    "tags": "magic wizard magician"
  },
  {
    "id": "wand",
    "char": "M15 4V2 M15 16v-2 M8 9h2 M20 9h2 M17.8 11.8 19 13 M15 9h.01 M17.8 6.2 19 5 m3 21 9-9 M12.2 6.2 11 5",
    "category": "ui",
    "tags": "magic selection"
  },
  {
    "id": "warehouse",
    "char": "M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11 M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z M6 13h12 M6 17h12",
    "category": "ui",
    "tags": "storage storehouse depot depository repository stockroom logistics building"
  },
  {
    "id": "washing-machine",
    "char": "M3 6h3 M17 6h.01 M 3 2 h 18 v 20 h -18 Z M 12, 13 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0 M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5",
    "category": "ui",
    "tags": "tumble dryer amenities electronics cycle clothes rinse spin drum"
  },
  {
    "id": "watch",
    "char": "M12 10v2.2l1.6 1 m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05 m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05 M 12, 12 m -6, 0 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0",
    "category": "ui",
    "tags": "clock time"
  },
  {
    "id": "waves-arrow-down",
    "char": "M12 10L12 2 M16 6L12 10L8 6 M2 15C2.6 15.5 3.2 16 4.5 16C7 16 7 14 9.5 14C12.1 14 11.9 16 14.5 16C17 16 17 14 19.5 14C20.8 14 21.4 14.5 22 15 M2 21C2.6 21.5 3.2 22 4.5 22C7 22 7 20 9.5 20C12.1 20 11.9 22 14.5 22C17 22 17 20 19.5 20C20.8 20 21.4 20.5 22 21",
    "category": "arrows",
    "tags": "water sea level sound hertz wavelength vibrate low tide ocean rising down falling"
  },
  {
    "id": "waves-arrow-up",
    "char": "M12 2v8 M2 15c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 m8 6 4-4 4 4",
    "category": "arrows",
    "tags": "water sea level sound hertz wavelength vibrate high tide ocean rising"
  },
  {
    "id": "waves-ladder",
    "char": "M19 5a2 2 0 0 0-2 2v11 M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 M7 13h10 M7 9h10 M9 5a2 2 0 0 0-2 2v11",
    "category": "ui",
    "tags": "swimming water pool lifeguard ocean 🌊 🏊‍♂️ 🏊‍♀️ 🏊 🥽"
  },
  {
    "id": "waves",
    "char": "M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
    "category": "ui",
    "tags": "water sea sound hertz wavelength vibrate"
  },
  {
    "id": "waypoints",
    "char": "m10.586 5.414-5.172 5.172 m18.586 13.414-5.172 5.172 M6 12h12 M 12, 20 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 12, 4 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 20, 12 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0 M 4, 12 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0",
    "category": "ui",
    "tags": "indirection vpn virtual private network proxy connections bounce reroute path journey planner stops stations shared spread viral"
  },
  {
    "id": "webcam",
    "char": "M 12, 10 m -8, 0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0 M 12, 10 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M7 22h10 M12 22v-4",
    "category": "ui",
    "tags": "camera security"
  },
  {
    "id": "webhook-off",
    "char": "M17 17h-5c-1.09-.02-1.94.92-2.5 1.9A3 3 0 1 1 2.57 15 M9 3.4a4 4 0 0 1 6.52.66 m6 17 3.1-5.8a2.5 2.5 0 0 0 .057-2.05 M20.3 20.3a4 4 0 0 1-2.3.7 M18.6 13a4 4 0 0 1 3.357 3.414 m12 6 .6 1 m2 2 20 20",
    "category": "ui",
    "tags": "push api interface callback"
  },
  {
    "id": "webhook",
    "char": "M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2 m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06 m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8",
    "category": "ui",
    "tags": "push api interface callback"
  },
  {
    "id": "weight-tilde",
    "char": "M6.5 8a2 2 0 0 0-1.906 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8z M7.999 15a2.5 2.5 0 0 1 4 0 2.5 2.5 0 0 0 4 0 M 12, 5 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "measure scale estimate load balance size measurement quantity mass"
  },
  {
    "id": "weight",
    "char": "M 12, 5 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z",
    "category": "ui",
    "tags": "mass heavy lead metal measure geometry scales balance"
  },
  {
    "id": "wheat-off",
    "char": "m2 22 10-10 m16 8-1.17 1.17 M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z m8 8-.53.53a3.5 3.5 0 0 0 0 4.94L9 15l1.53-1.53c.55-.55.88-1.25.98-1.97 M10.91 5.26c.15-.26.34-.51.56-.73L13 3l1.53 1.53a3.5 3.5 0 0 1 .28 4.62 M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z m16 16-.53.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.49 3.49 0 0 1 1.97-.98 M18.74 13.09c.26-.15.51-.34.73-.56L21 11l-1.53-1.53a3.5 3.5 0 0 0-4.62-.28",
    "category": "ui",
    "tags": "corn cereal grain gluten free allergy intolerance diet"
  },
  {
    "id": "wheat",
    "char": "M2 22 16 8 M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
    "category": "ui",
    "tags": "corn cereal grain gluten"
  },
  {
    "id": "whole-word",
    "char": "M 7, 12 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M10 9v6 M 17, 12 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0 M14 7v8 M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1",
    "category": "ui",
    "tags": "text selection letters characters font typography"
  },
  {
    "id": "wifi-cog",
    "char": "m14.305 19.53.923-.382 m15.228 16.852-.923-.383 m16.852 15.228-.383-.923 m16.852 20.772-.383.924 m19.148 15.228.383-.923 m19.53 21.696-.382-.924 M2 7.82a15 15 0 0 1 20 0 m20.772 16.852.924-.383 m20.772 19.148.924.383 M5 11.858a10 10 0 0 1 11.5-1.785 M8.5 15.429a5 5 0 0 1 2.413-1.31 M 18, 18 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "connection signal wireless directory settings control preferences cog edit gear"
  },
  {
    "id": "wifi-high",
    "char": "M12 20h.01 M5 12.859a10 10 0 0 1 14 0 M8.5 16.429a5 5 0 0 1 7 0",
    "category": "ui",
    "tags": "connection signal wireless"
  },
  {
    "id": "wifi-low",
    "char": "M12 20h.01 M8.5 16.429a5 5 0 0 1 7 0",
    "category": "ui",
    "tags": "connection signal wireless"
  },
  {
    "id": "wifi-off",
    "char": "M12 20h.01 M8.5 16.429a5 5 0 0 1 7 0 M5 12.859a10 10 0 0 1 5.17-2.69 M19 12.859a10 10 0 0 0-2.007-1.523 M2 8.82a15 15 0 0 1 4.177-2.643 M22 8.82a15 15 0 0 0-11.288-3.764 m2 2 20 20",
    "category": "ui",
    "tags": "disabled"
  },
  {
    "id": "wifi-pen",
    "char": "M2 8.82a15 15 0 0 1 20 0 M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z M5 12.859a10 10 0 0 1 10.5-2.222 M8.5 16.429a5 5 0 0 1 3-1.406",
    "category": "ui",
    "tags": "edit wifi pen change network"
  },
  {
    "id": "wifi-sync",
    "char": "M11.965 10.105v4L13.5 12.5a5 5 0 0 1 8 1.5 M11.965 14.105h4 M17.965 18.105h4L20.43 19.71a5 5 0 0 1-8-1.5 M2 8.82a15 15 0 0 1 20 0 M21.965 22.105v-4 M5 12.86a10 10 0 0 1 3-2.032 M8.5 16.429h.01",
    "category": "ui",
    "tags": "connection signal wireless synchronize reconnect reset restart"
  },
  {
    "id": "wifi-zero",
    "char": "M12 20h.01",
    "category": "ui",
    "tags": "connection signal wireless"
  },
  {
    "id": "wifi",
    "char": "M12 20h.01 M2 8.82a15 15 0 0 1 20 0 M5 12.859a10 10 0 0 1 14 0 M8.5 16.429a5 5 0 0 1 7 0",
    "category": "ui",
    "tags": "connection signal wireless"
  },
  {
    "id": "wind-arrow-down",
    "char": "M10 2v8 M12.8 21.6A2 2 0 1 0 14 18H2 M17.5 10a2.5 2.5 0 1 1 2 4H2 m6 6 4 4 4-4",
    "category": "arrows",
    "tags": "weather air pressure blow"
  },
  {
    "id": "wind",
    "char": "M12.8 19.6A2 2 0 1 0 14 16H2 M17.5 8a2.5 2.5 0 1 1 2 4H2 M9.8 4.4A2 2 0 1 1 11 8H2",
    "category": "ui",
    "tags": "weather air blow"
  },
  {
    "id": "wine-off",
    "char": "M8 22h8 M7 10h3m7 0h-1.343 M12 15v7 M7.307 7.307A12.33 12.33 0 0 0 7 10a5 5 0 0 0 7.391 4.391M8.638 2.981C8.75 2.668 8.872 2.34 9 2h6c1.5 4 2 6 2 8 0 .407-.05.809-.145 1.198",
    "category": "ui",
    "tags": "alcohol beverage drink glass alcohol free abstinence abstaining teetotalism allergy intolerance"
  },
  {
    "id": "wine",
    "char": "M8 22h8 M7 10h10 M12 15v7 M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z",
    "category": "ui",
    "tags": "alcohol beverage bar drink glass sommelier vineyard winery"
  },
  {
    "id": "workflow",
    "char": "M 3 3 h 8 v 8 h -8 Z M7 11v4a2 2 0 0 0 2 2h4 M 13 13 h 8 v 8 h -8 Z",
    "category": "ui",
    "tags": "action continuous integration ci automation devops network node connection"
  },
  {
    "id": "worm",
    "char": "m19 12-1.5 3 M19.63 18.81 22 20 M6.47 8.23a1.68 1.68 0 0 1 2.44 1.93l-.64 2.08a6.76 6.76 0 0 0 10.16 7.67l.42-.27a1 1 0 1 0-2.73-4.21l-.42.27a1.76 1.76 0 0 1-2.63-1.99l.64-2.08A6.66 6.66 0 0 0 3.94 3.9l-.7.4a1 1 0 1 0 2.55 4.34z",
    "category": "ui",
    "tags": "invertebrate grub larva snake crawl wiggle slither pest control computer virus malware"
  },
  {
    "id": "wrench",
    "char": "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",
    "category": "ui",
    "tags": "account settings spanner diy toolbox build construction"
  },
  {
    "id": "x-line-top",
    "char": "M18 4H6 M18 8 6 20 m6 8 12 12",
    "category": "ui",
    "tags": "line top arrow navigation up pointer direction vector symbol cancel close delete remove times clear math multiply multiplication mean median average x̄"
  },
  {
    "id": "x",
    "char": "M18 6 6 18 m6 6 12 12",
    "category": "ui",
    "tags": "cancel close cross delete ex remove times clear math multiply multiplication"
  },
  {
    "id": "youtube",
    "char": "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17 m10 15 5-3-5-3z",
    "category": "ui",
    "tags": "logo social video play"
  },
  {
    "id": "zap-off",
    "char": "M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317 M15.656 10H20a1 1 0 0 1 .78 1.63l-1.72 1.773 M16.273 16.273 10.88 21.83a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4a1 1 0 0 1-.78-1.63l4.507-4.643 m2 2 20 20",
    "category": "ui",
    "tags": "flash camera lightning electricity energy"
  },
  {
    "id": "zap",
    "char": "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
    "category": "ui",
    "tags": "flash camera lightning electricity energy"
  },
  {
    "id": "zodiac-aquarius",
    "char": "m2 10 2.456-3.684a.7.7 0 0 1 1.106-.013l2.39 3.413a.7.7 0 0 0 1.096-.001l2.402-3.432a.7.7 0 0 1 1.098 0l2.402 3.432a.7.7 0 0 0 1.098 0l2.389-3.413a.7.7 0 0 1 1.106.013L22 10 m2 18.002 2.456-3.684a.7.7 0 0 1 1.106-.013l2.39 3.413a.7.7 0 0 0 1.097 0l2.402-3.432a.7.7 0 0 1 1.098 0l2.402 3.432a.7.7 0 0 0 1.098 0l2.389-3.413a.7.7 0 0 1 1.106.013L22 18.002",
    "category": "ui",
    "tags": "water bearer waves innovation air future astrology star sign horoscope constellation celestial"
  },
  {
    "id": "zodiac-aries",
    "char": "M12 7.5a4.5 4.5 0 1 1 5 4.5 M7 12a4.5 4.5 0 1 1 5-4.5V21",
    "category": "ui",
    "tags": "ram horns fire energy initiative astrology star sign horoscope constellation celestial"
  },
  {
    "id": "zodiac-cancer",
    "char": "M21 14.5A9 6.5 0 0 1 5.5 19 M3 9.5A9 6.5 0 0 1 18.5 5 M 17.5, 14.5 m -3.5, 0 a 3.5,3.5 0 1,0 7,0 a 3.5,3.5 0 1,0 -7,0 M 6.5, 9.5 m -3.5, 0 a 3.5,3.5 0 1,0 7,0 a 3.5,3.5 0 1,0 -7,0",
    "category": "ui",
    "tags": "crab shell protection water intuition astrology star sign horoscope constellation celestial"
  },
  {
    "id": "zodiac-capricorn",
    "char": "M11 21a3 3 0 0 0 3-3V6.5a1 1 0 0 0-7 0 M7 19V6a3 3 0 0 0-3-3h0 M 17, 17 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "goat mountain ambition earth discipline astrology star sign horoscope constellation celestial"
  },
  {
    "id": "zodiac-gemini",
    "char": "M16 4.525v14.948 M20 3A17 17 0 0 1 4 3 M4 21a17 17 0 0 1 16 0 M8 4.525v14.948",
    "category": "ui",
    "tags": "twins duality communication air adaptability astrology star sign horoscope constellation celestial"
  },
  {
    "id": "zodiac-leo",
    "char": "M10 16c0-4-3-4.5-3-8a5 5 0 0 1 10 0c0 3.466-3 6.196-3 10a3 3 0 0 0 6 0 M 7, 16 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0",
    "category": "ui",
    "tags": "lion crown leadership fire confidence astrology star sign horoscope constellation celestial"
  },
  {
    "id": "zodiac-libra",
    "char": "M3 16h6.857c.162-.012.19-.323.038-.38a6 6 0 1 1 4.212 0c-.153.057-.125.368.038.38H21 M3 20h18",
    "category": "ui",
    "tags": "scales balance justice air harmony astrology star sign horoscope constellation celestial"
  },
  {
    "id": "zodiac-ophiuchus",
    "char": "M3 10A6.06 6.06 0 0 1 12 10 A6.06 6.06 0 0 0 21 10 M6 3v12a6 6 0 0 0 12 0V3",
    "category": "ui",
    "tags": "serpent snake holder healing knowledge astronomy astrology star sign horoscope constellation celestial"
  },
  {
    "id": "zodiac-pisces",
    "char": "M19 21a15 15 0 0 1 0-18 M20 12H4 M5 3a15 15 0 0 1 0 18",
    "category": "ui",
    "tags": "fish duality water dreams empathy astrology star sign horoscope constellation celestial"
  },
  {
    "id": "zodiac-sagittarius",
    "char": "M15 3h6v6 M21 3 3 21 m9 9 6 6",
    "category": "ui",
    "tags": "archer arrow exploration fire philosophy astrology star sign horoscope constellation celestial"
  },
  {
    "id": "zodiac-scorpio",
    "char": "M10 19V5.5a1 1 0 0 1 5 0V17a2 2 0 0 0 2 2h5l-3-3 m22 19-3 3 M5 19V5.5a1 1 0 0 1 5 0 M5 5.5A2.5 2.5 0 0 0 2.5 3",
    "category": "ui",
    "tags": "scorpion stinger intensity water transformation astrology star sign horoscope constellation celestial"
  },
  {
    "id": "zodiac-taurus",
    "char": "M 12, 15 m -6, 0 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0 M18 3A6 6 0 0 1 6 3",
    "category": "ui",
    "tags": "bull strength stability earth endurance astrology star sign horoscope constellation celestial"
  },
  {
    "id": "zodiac-virgo",
    "char": "M11 5.5a1 1 0 0 1 5 0V16a5 5 0 0 0 5 5 M16 11.5a1 1 0 0 1 5 0V16a5 5 0 0 1-5 5 M6 19V6a3 3 0 0 0-3-3h0 M6 5.5a1 1 0 0 1 5 0V19",
    "category": "ui",
    "tags": "virgin maiden harvest precision earth analysis astrology star sign horoscope constellation celestial"
  },
  {
    "id": "zoom-in",
    "char": "M 11, 11 m -8, 0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
    "category": "ui",
    "tags": "magnifying glass plus"
  },
  {
    "id": "zoom-out",
    "char": "M 11, 11 m -8, 0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
    "category": "ui",
    "tags": "magnifying glass plus"
  }
];