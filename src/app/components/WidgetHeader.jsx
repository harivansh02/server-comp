"use client";
import React, { useEffect } from "react";
import { HEADING, SUBHEADING, BTN_COLOR } from "@/app/utils/constant";

const WidgetHeader = ({
  heading = HEADING,
  subHeading = SUBHEADING,
  btnColor = BTN_COLOR,
  brandName = "Youshd",
  domainFromHeader,
}) => {
  console.log(domainFromHeader, "domainFromHeader in WidgetHeader component");
  function replaceBrandNameWithBold(text, brandName) {
    // Create a regular expression with the brand name as a variable

    // exact match with brand name and no other word
    const regex = new RegExp(`\\b${brandName}\\b`, "gi"); // 'gi' for global and case-insensitive match

    // Replace all instances of the brand name with an empty string
    const newText = text.replaceAll(regex, `<b>${brandName}</b>`);

    // if no brand name is found then return the original text + brand name
    if (newText === text) return text + " " + `<b>${brandName}</b>`;

    return newText;
  }

  subHeading = replaceBrandNameWithBold(subHeading, brandName);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--background-chat",
      `${btnColor}`
    );
  }, [btnColor]);

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
      {/* <b>
        {brandName}
      </b> */}
    </div>
  );
};

export default WidgetHeader;
