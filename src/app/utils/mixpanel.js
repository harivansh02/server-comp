import { isProduction } from "./constant";
import mixpanel from "mixpanel-browser";

let actions = {
  track: (eventName, props) => {
    if (isProduction) mixpanel.track(eventName, props);
    else console.log("Mixpanel track: " + eventName, props);
  },
};

export let Mixpanel = actions;
