import appList from "./appList";

export const initialSettings = Object.fromEntries(appList.map(({ name }) => [name, 0]));

