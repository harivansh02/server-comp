import React from "react";
import { HEADING, SUBHEADING, BTN_COLOR } from "@/app/utils/constant";

const WidgetHeader = ({
  heading = HEADING,
  subHeading = SUBHEADING,
  btnColor = BTN_COLOR,
}) => {
  return (
    <div className="youshd-widget-header">
      <div
        data-uid="youshd-overlay-icon"
        style={{
          background: btnColor,
        }}
        className="speech bottom rotateLeft"
      >
        <img
          style={{ width: "12px", height: "auto" }}
          src="https://res.cloudinary.com/dqsbiaqqj/image/upload/v1687428889/common/Hand_w_o_shadow_4x_i4zio4.png"
        ></img>
      </div>
      <div
        data-uid="youshd-overlay-icon"
        style={{
          background: btnColor,
        }}
        className="speech speechSmall rotateRight bottom"
      >
        <img
          style={{ width: "8px", height: "auto" }}
          src="https://res.cloudinary.com/dqsbiaqqj/image/upload/v1687426918/common/2_ckoixy.png"
        ></img>
      </div>
      <h1 className="youshd-widget__heading">{heading}</h1>
      <p
        className="youshd-widget__para"
        dangerouslySetInnerHTML={{ __html: subHeading }}
      ></p>
      &nbsp;
    </div>
  );
};

export default WidgetHeader;
