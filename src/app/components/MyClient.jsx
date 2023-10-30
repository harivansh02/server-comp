"use client"
import React, { useEffect } from 'react'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
const MyClient = ({ posts, isEnabled }) => {

    return (
        <div>
            <Slider {...settings}>
                {/* {posts.map((post, id) => (
                    <div key={id}>
                        <h1>{post.username}</h1>
                        <img src={post.thumbnailUrl} />
                    </div>
                ))} */}
            </Slider>
            <div>MyClient</div>
        </div>

    )
}

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


};

export default MyClient