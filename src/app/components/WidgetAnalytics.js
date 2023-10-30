"use client";
import React, { useEffect } from "react";
import {
  checkIfSessionIdExists,
  checkIfUniqueVisitorIdExists,
  initAnalytics,
} from "@/utils/widgetHelper";
import { sendDataToAnalytics } from "@/app/utils/services";

const WidgetAnalytics = ({ isWidgetEnabled, domain }) => {
  useEffect(() => {
    window.top.postMessage(
      {
        message: "genericWidget",
        value: isWidgetEnabled,
        width: "100%",
        height: "370px",
      },
      "*"
    );
  }, []);

  // send the visitorId and sessionId to the parent window
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.parent.postMessage(
        {
          message: "analytics-ids",
          value: {
            sessionId: checkIfSessionIdExists(),
            uniqueVisitorId: checkIfUniqueVisitorIdExists(),
          },
        },
        "*"
      );
    }
  }, []);

  useEffect(() => {
    // check if window is available
    try {
      if (typeof window !== "undefined") {
        initAnalytics();
        const messageHandler = (event) => {
          if (event.data.event_type !== "load_time") return;
          console.log(event.data.event_type, "event.data.event_type");
          const load_time = event.data.value;
          console.log(`Received message from parent: ${load_time}`);
          const payload = {
            event: "load_time",
            label: "generic_widget_rendered",
            domain: domain,
            properties: {
              load_time,
              sessionId: checkIfSessionIdExists(),
              path: window.location.pathname,
              uniqueVisitorId: checkIfUniqueVisitorIdExists(),
            },
          };
          sendDataToAnalytics(payload);
        };

        window.addEventListener("message", messageHandler);

        return () => {
          // Clean up the event listener when the component unmounts
          window.removeEventListener("message", messageHandler);
        };
      }
    } catch (error) {
      console.log(error, "error");
    }
  }, []);
  return null;
};

export default WidgetAnalytics;
