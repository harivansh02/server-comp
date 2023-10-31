import { isProduction } from "./constant";

export const sendDataToAnalytics = async (
  payload,
) => {
  const url = isProduction
    ? `https://brandanalytics.youshd.com/track`
    : `https://brandanalytics.youshd.com/track-staging`;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  
};
