import { isProduction } from "./constant";

export const sendDataToAnalytics = async () => {
  const url = isProduction
    ? `https://brandanalytics.youshd.com/track`
    : `https://brandanalytics.youshd.com/track-staging`;
  await fetch.post(url, payload);
};
