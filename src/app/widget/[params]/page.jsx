import MyClient from "@/app/components/MyClient";
import React from "react";
import WidgetHeader from "@/app/components/WidgetHeader";
import WidgetFooter from "@/app/components/WidgetFooter";
import WidgetAnalytics from "@/app/components/WidgetAnalytics";
import WidgetCarousel from "@/app/components/WidgetCarousel";
import { headers } from "next/headers";

const getdata = async (domain) => {
  const res = await fetch(
    "https://staging-api.youshd.com/widget/pub/thankyou/generic-widget/" +
      domain
  );

  const data = await res.json();

  return data;
};
const WidgetPage = async ({ _, searchParams }) => {
  const headersList = headers();
  const domainFromHeader = headersList.get("domain");
  console.log(domainFromHeader, "domainFromHeader");

  // get all the params from the url
  const domain = searchParams.domain;
  const heading = searchParams.heading;
  const subHeading = searchParams.subHeading;
  const btnColor = searchParams.btnColor;
  // console.log(domain, "domain", heading, "heading", subHeading, "subHeading", btnColor, "btnColor")
  const brandName = searchParams.brandName;
  // const themeColor = searchParams.themeColor

  const data = await getdata(domain);
  // console.log(data, "data")

  const isEnabled = data.data.is_incentive_enabled;
  const posts = data.data.posts;
  const minCpm = data.data.min_cpm_reward;

  return (
    <div className="youshd-widget">
      <WidgetHeader
        heading={heading}
        subHeading={subHeading}
        btnColor={btnColor}
        brandName={brandName}
        domainFromHeader={domainFromHeader}
      />
      <WidgetCarousel posts={posts} />
      <WidgetFooter btnColor={btnColor} minCpm={minCpm} domain={domain} />
      <WidgetAnalytics isWidgetEnabled={isEnabled} domain={domain} />
    </div>
  );
};

export default WidgetPage;
