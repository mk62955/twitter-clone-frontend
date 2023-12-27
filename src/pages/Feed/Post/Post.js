import { Avatar } from "@mui/material";
import React from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";

const Post = ({ p }) => {
  const { name, username, photo, post, profilePhoto } = p;
  return (
    <>
    <hr />
      <div className="flex py-3">
        <div className="mr-5">
          <Avatar src={profilePhoto} />
        </div>
        <div>
          <div>
            <div>
              <h3 className="text-left font-bold">
                {name}{" "}
                <span>
                  <VerifiedIcon className="text-blue-500"/> @{username}
                </span>
              </h3>
            </div>
            <div>
              <p className="text-left">{post}</p>
            </div>
                <img src={photo} alt="" className="my-5 rounded-lg w-auto"/>
            <div className="flex justify-between">
              <ChatBubbleOutlineIcon fontSize="small" />
              <RepeatIcon fontSize="small" />
              <FavoriteBorderIcon fontSize="small" />
              <PublishIcon fontSize="small" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
