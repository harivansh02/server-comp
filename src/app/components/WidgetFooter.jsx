import React from "react";
import WidgetCTA from "@/app/components/WidgetCTA";
import { MIN_CPM, BTN_COLOR } from "@/app/utils/constant";

const WidgetFooter = ({ minCpm = MIN_CPM, btnColor = BTN_COLOR }) => {
  return (
    <div className="youshd-widget__footer">
      <p className="youshd-widget__para">
        Sign up now and get an <b> extra ${minCpm}</b> for your first post!
      </p>

      <WidgetCTA btnColor={btnColor} />

      <div className="youshd-widget__poweredby-wrapper">
        <p className="youshd-widget__poweredby-text">
          Powered by{" "}
          <img
            className="youshd-widget__poweredby-img"
            src="https://res.cloudinary.com/dqsbiaqqj/image/upload/v1685008674/common/Youshd_Logo_xn7sd3.png"
          />
        </p>
      </div>
    </div>
  );
};

export default WidgetFooter;
