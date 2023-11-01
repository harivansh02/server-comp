"use client";
import React from "react";
import { sendDataToAnalytics } from "@/app/utils/services";
import {
  checkIfSessionIdExists,
  checkIfUniqueVisitorIdExists,
} from "@/app/utils/widgetHelper";
// import { Mixpanel } from "@app/utils/mixpanel";

const WidgetCTA = ({ btnColor, domain }) => {
  console.log("...");
  const handleClick = () => {
    try {
      if (typeof window !== "undefined") {
        window.parent.postMessage("openpopup", "*");

        // Mixpanel.track("button_clicked", {
        //   label: "generic_widget_button_clicked",
        // });
        const payload = {
          event: "click",
          label: "clicked_on_generic_widget",
          domain: domain,
          env: true,
          properties: {
            sessionId: checkIfSessionIdExists(),
            path: window.location.pathname,
            uniqueVisitorId: checkIfUniqueVisitorIdExists(),
          },
        };
        console.log(payload, "payload");
        sendDataToAnalytics(payload);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <button
      className="youshd-widget__cta-btn"
      style={{ background: btnColor }}
      onClick={handleClick}
    >
      Start Earning Now
    </button>
  );
};

export default WidgetCTA;
// http://localhost:5000/widget/generic?domain=uni-paw.myshopify.com&btnColor=red&subHeading=Earn%20cash%20by%20sharing%20a%20fun%20Reel%20or%20TikTok%20about%20Durt%20Pak!&heading=Get%20paid%20to%20post
// https://widgets.youshd.com/#%7B%22btnColor%22%3A%22%23000000%22%2C%22heading%22%3A%22Get%20paid%20to%20post!%22%2C%22subHeading%22%3A%22Earn%20cash%20by%20sharing%20a%20fun%20Reel%20or%20TikTok%20about%20Durt%20Pak!%22%2C%22brandName%22%3A%22Durt%20Pak%22%2C%22domain%22%3A%22uni-paw.myshopify.com%22%7D
