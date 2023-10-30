import React from "react";
import Image from "next/image";
import instaIcon from "@/app/components/SVGs/instaIcon.svg";
import tiktokIcon from "@/app/components/SVGs/tiktokIcon.svg";

const SocialProofTile = ({ post, activeTileStyle }) => {
  const earningAmount = post.earningAmount;
  const platform = post.platform;
  const username = post.username;

  console.log(post, "post");

  return (
    <>
      <div
        className="tile"
        style={{
          border: "1px solid #E5E5E5",
          ...activeTileStyle,
        }}
      >
        <div className="avatarWrapper">
          <div>
            <Image
              src={platform === "instagram" ? instaIcon : tiktokIcon}
              alt="SVG Image"
              width={40}
              height={40}
            />
          </div>
          <div className="tileContent">
            <p className="tileContentTitle">{`@${username}`}</p>
            <p className="tileContentDesc">
              earned ${Math.round(earningAmount)}{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialProofTile;
