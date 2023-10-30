import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/genericWidget.module.css";
import { useRouter } from "next/router";
import SocialProofTile from "@/components/SocialProofTile";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { nanoid } from "@reduxjs/toolkit";
import TileSkeletonLoader from "@/components/TileSkeletonLoader";
import { isProduction } from "@/utils/constant";
import {
    checkIfSessionIdExists,
    checkIfUniqueVisitorIdExists,
    initAnalytics,
} from "@/utils/widgetHelper";
import { Mixpanel } from "@/analytics/mixpanel";

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

const GenericWidget = () => {
    const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);

    const [hashObject, setHashObject] = useState({
        domain: "",
        btnColor: "#ffffff",
        brandName: "Native pet",
        heading: "Get paid to Post!",
        subHeading: (
            <>
                <b>Earn cash</b> by sharing a fun Reel or TikTok about
            </>
        ),
    });
    const [state, setState] = useState({
        data: {},
        isLoading: true,
    });

    const { data, isLoading } = state;
    const { btnColor, heading, subHeading } = hashObject;

    function loadData() {
        const hashValue = window.location.hash.substring(1);
        if (!hashValue) return;
        const decodedHash = decodeURIComponent(hashValue);
        const parsedObject = JSON.parse(decodedHash);

        // make all the brandname in the heading bold
        let replacedBrandNameWithBold = replaceBrandNameWithBold(
            parsedObject.subHeading,
            parsedObject.brandName
        );

        parsedObject.subHeading = replacedBrandNameWithBold;
        setHashObject(parsedObject);

        document.documentElement.style.setProperty(
            "--background-chat",
            `${parsedObject.btnColor}`
        );

        const domain = parsedObject.domain;
        if (domain) getData(domain);
    }

    const handleClick = () => {
        try {
            if (typeof window !== "undefined") {
                window.parent.postMessage("openpopup", "*");

                Mixpanel.track("button_clicked", {
                    label: "generic_widget_button_clicked",
                });
                const payload = {
                    event: "click",
                    label: "clicked_on_generic_widget",
                    domain: hashObject.domain,
                    env: true,
                    properties: {
                        sessionId: checkIfSessionIdExists(),
                        path: window.location.pathname,
                        uniqueVisitorId: checkIfUniqueVisitorIdExists(),
                    },
                };
                sendDataToAnalytics(payload);
            }
        } catch (error) {
            console.log(error, "error");
        }
    };

    useEffect(() => {
        loadData();

        window.addEventListener(
            "hashchange",
            (event) => {
                let hashchange = event.target.location.hash.substring(1);

                let parsedObject = JSON.parse(decodeURIComponent(hashchange));

                // make all the brandname in the heading bold
                let replacedBrandNameWithBold = replaceBrandNameWithBold(
                    parsedObject.subHeading,
                    parsedObject.brandName
                );

                parsedObject.subHeading = replacedBrandNameWithBold;

                // capitalize the first letter of the brand name
                let capitalizedLetter = capitalizeFirstLetter(parsedObject.brandName);
                parsedObject.brandName = capitalizedLetter;

                setHashObject(parsedObject);

                setHashObject(parsedObject);
                document.documentElement.style.setProperty(
                    "--background-chat",
                    `
            ${JSON.parse(decodeURIComponent(hashchange)).btnColor}
            `
                );
            },
            false
        );

        return () => {
            window.removeEventListener(
                "hashchange",
                () => {
                    console.log("hashchange event removed");
                },
                false
            );
        };
    }, []);

    useEffect(() => {
        // check if window is available
        try {
            if (typeof window !== "undefined") {
                initAnalytics();
                const hashValue = window.location.hash.substring(1);
                if (!hashValue) return;
                const decodedHash = decodeURIComponent(hashValue);
                const parsedObject = JSON.parse(decodedHash);
                // Listen for messages from the parent window
                const messageHandler = (event) => {
                    if (event.data.event_type !== "load_time") return;
                    console.log(event.data.event_type, "event.data.event_type");
                    const load_time = event.data.value;
                    console.log(`Received message from parent: ${load_time}`);
                    const payload = {
                        event: "load_time",
                        label: "generic_widget_rendered",
                        domain: parsedObject.domain,
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

    // this also used to update the status of the widget
    const sendDataToAnalytics = async (payload) => {
        const url = isProduction
            ? `https://brandanalytics.youshd.com/track`
            : `https://brandanalytics.youshd.com/track-staging`;
        await axios.post(url, payload);
    };

    async function getData(domain) {
        if (Object.keys(state.data).length > 0) return;
        setState((prevState) => ({ ...prevState, isLoading: true }));

        try {
            const url =
                `${process.env.NEXT_PUBLIC_MERCHANT_API_URL}/widget/pub/thankyou/generic-widget/` +
                domain;

            const response = await axios.get(url);

            let duplicatedPosts = [
                ...response.data.data.posts,
                ...response.data.data.posts,
            ];

            duplicatedPosts = duplicatedPosts.map((item) => {
                return {
                    ...item,
                    id: nanoid(),
                };
            });

            console.log(
                duplicatedPosts.map((item) => item.id),
                "duplicatedPosts"
            );

            setState((prevState) => ({
                ...prevState,
                isLoading: false,
                data: {
                    ...response.data.data,
                    posts: duplicatedPosts,
                },
            }));

            window.top.postMessage(
                {
                    message: "genericWidget",
                    value: response.data.data.is_incentive_enabled,
                    width: "100%",
                    height: "370px",
                },
                "*"
            );
        } catch (error) {
            console.log(error, "getGenericWidgetData API error");
            // setState(prevState => ({ ...prevState, isLoading: false }))
            window.top.postMessage({ message: "genericWidget", value: false }, "*");
        }
    }

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "20px",
        slidesToShow: 3,
        speed: 700,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        beforeChange: function (currentSlide, nextSlide) {
            // console.log("before change", currentSlide, nextSlide);
            setActiveCarouselIndex(nextSlide);
        },
        afterChange: function (currentSlide) {
            // console.log("after change", currentSlide);
        },
    };

    console.log("------------------------------------------------", data);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className={styles.youshdGenericWidget}>
            <div className={styles.gwHeaderContainer}>
                <div
                    data-uid="youshd-overlay-icon"
                    className={`${styles.speech} ${styles.bottom} ${styles.rotateLeft}`}
                    style={{
                        background: btnColor,
                    }}
                >
                    <img
                        style={{ width: "12px", height: "auto" }}
                        src="https://res.cloudinary.com/dqsbiaqqj/image/upload/v1687428889/common/Hand_w_o_shadow_4x_i4zio4.png"
                    ></img>
                </div>
                <div
                    data-uid="youshd-overlay-icon"
                    className={`${styles.speech} ${styles.speechSmall} ${styles.bottom} ${styles.rotateRight}`}
                    style={{
                        background: btnColor,
                    }}
                >
                    <img
                        style={{ width: "8px", height: "auto" }}
                        src="https://res.cloudinary.com/dqsbiaqqj/image/upload/v1687426918/common/2_ckoixy.png"
                    ></img>
                </div>
                <h1 className={styles.gwHeading}>{heading}</h1>
                <p
                    className={styles.gwSubheading}
                    dangerouslySetInnerHTML={{ __html: subHeading }}
                ></p>
                &nbsp;
            </div>

            <div className={styles.gwSliderContainer}>
                {!isLoading && data?.posts?.length && (
                    <Slider {...settings} className="gw-slider">
                        {data.posts.map((post, index) => (
                            <SocialProofTile
                                key={post.id}
                                post={post}
                                activeTileStyle={
                                    index === activeCarouselIndex
                                        ? {
                                            overflow: "visible",
                                            transform: "scale(0.98)",
                                            transition: "all 1s ease-in-out",
                                        }
                                        : {}
                                }
                                videoAutoPlay={index === activeCarouselIndex ? true : false}
                                activeVideoStyle={
                                    index === activeCarouselIndex
                                        ? {
                                            transform:
                                                "rotate(0deg) scale(1.1) translateY(-30px) translateX(-15px)",
                                            transition: "all 1s ease-in-out",
                                        }
                                        : {}
                                }
                            />
                        ))}
                    </Slider>
                )}
                {isLoading && (
                    <div>
                        <TileSkeletonLoader />
                    </div>
                )}
            </div>

            <p className={styles.gwBottomSubheading}>
                Sign up now and get an <b> extra ${data.min_cpm_reward}</b> for your
                first post!
            </p>

            <button
                className={styles.gwSignupBtn}
                style={{ background: btnColor }}
                onClick={handleClick}
            >
                Start Earning Now
            </button>

            <div className="gw-powered-by-container">
                <p className={styles.gwPoweredByText}>
                    Powered by{" "}
                    <img
                        style={{
                            width: "60px",
                            height: "auto",
                        }}
                        src="https://res.cloudinary.com/dqsbiaqqj/image/upload/v1685008674/common/Youshd_Logo_xn7sd3.png"
                    />
                </p>
            </div>
        </div>
    );
};

export default GenericWidget;
