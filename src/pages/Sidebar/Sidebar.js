import React, { useState } from "react";
import SidebarOptions from "./SidebarOptions";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreIcon from "@mui/icons-material/More";
import DoneIcon from "@mui/icons-material/Done";
import CustomLink from "./CustomLink";
import useLoggedInUser from "../hooks/useLoggedInUser";
import './Sidebar.css'
import {
  Avatar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { MoreHorizOutlined } from "@mui/icons-material";

const Sidebar = ({ handleLogout, user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const [loggedInUser] = useLoggedInUser();
  // console.log(loggedInUser)
  const userProfilePic = loggedInUser[0]?.profileImage?loggedInUser[0]?.profileImage:"https://static.thenounproject.com/png/4851855-200.png"

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const result = user[0]?.email?.split('@')[0];

  return (
    <div className="w-1/4 pr-5 h-screen overflow-scroll overflow-x-hidden overflow-y-hidden">
      <div className="sidebar-content-wrapper">
      <div className="text-left mt-5 pl-5">
      <TwitterIcon className="text-blue-500"  />
      </div>
      <CustomLink to="/home/feed">
        <SidebarOptions active Icon={HomeIcon} text="Home" />
      </CustomLink>
      <CustomLink to="/home/explore">
        <SidebarOptions active Icon={SearchIcon} text="Explore" />
      </CustomLink>
      <CustomLink to="/home/notifications">
        <SidebarOptions active Icon={NotificationsIcon} text="Notifications" />
      </CustomLink>
      <CustomLink to="/home/messages">
        <SidebarOptions active Icon={MailOutlineIcon} text="Messages" />
      </CustomLink>
      <CustomLink to="/home/bookmarks">
        <SidebarOptions active Icon={BookmarkBorderIcon} text="Bookmarks" />
      </CustomLink>
      <CustomLink to="/home/lists">
        <SidebarOptions active Icon={ListAltIcon} text="Lists" />
      </CustomLink>
      <CustomLink to="/home/profile">
        <SidebarOptions active Icon={PermIdentityIcon} text="Profile" />
      </CustomLink>
      <CustomLink to="/home/more">
        <SidebarOptions active Icon={MoreIcon} text="More" />
      </CustomLink>

      <button className="flex text-white font-bold px-6 py-4 ml-5  bg-blue-500  rounded-full">
        Tweet
      </button>

      <div className="flex  mt-10 px-6 py-3 items-center">
        <Avatar src={userProfilePic} className="mr-5" />
        <div>
          <h4>
            {
              loggedInUser[0]?.name?loggedInUser[0]?.name:user && user?.displayName
            }
          </h4>
          <h5>@{result}</h5>
        </div>
        <IconButton
          size="small"
          sx={{ ml: 2 }}
          aria-controls={openMenu ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreHorizOutlined />
        </IconButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClick={handleClose}
          onClose={handleClose}
        >
          <MenuItem>
          <div className="flex ml-2 items-center">
            <Avatar src={userProfilePic} className="mr-4" />
            <div className="mr-4">
              <h4>
              {
                loggedInUser[0]?.name?loggedInUser[0]?.name:user && user?.displayName
              }
              </h4>
              <h5>@{result}</h5>
            </div>
            <ListItemIcon>
              <DoneIcon />
            </ListItemIcon>
          </div>
          </MenuItem>
          <hr />
          <MenuItem onClick={handleClose}>Add an existing account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout @{result}</MenuItem>
        </Menu>
      </div>
    </div>
    </div>
  );
};

export default Sidebar;
