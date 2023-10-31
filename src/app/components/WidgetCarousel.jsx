'use client'

import React, { useState } from 'react'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import SocialProofTile from '@/app/components/SocialProofTile'

const WidgetCarousel = ({ posts }) => {
    const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "20px",
        slidesToShow: 3,
        speed: 700,
        autoplay: true,
        // dots: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 1
                }
            }
            ,
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },

        ],
        beforeChange: function (_, nextSlide) {
            setActiveCarouselIndex(nextSlide)
        },

    };

    
    return (
        <div className="gwSliderContainer">
            <Slider {...settings}>
                {posts?.map((post, index) =>
                    <SocialProofTile
                        key={
                            post.id
                        }
                        post={post}

                        activeTileStyle={
                            index === activeCarouselIndex ? {
                                overflow: 'visible',
                                transform: "scale(0.98)",
                                transition: 'all 1s ease-in-out',
                            } : {

                            }
                        }
                        videoAutoPlay={index === activeCarouselIndex ? true : false}
                        activeVideoStyle={
                            index === activeCarouselIndex ? {

                                transform: 'rotate(0deg) scale(1.1) translateY(-30px) translateX(-15px)',
                                transition: 'all 1s ease-in-out',
                            } : {
                            }
                        }
                    />

                )}
            </Slider>
        </div>

    )
}



export default WidgetCarousel