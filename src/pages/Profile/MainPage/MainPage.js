import { React, useState, useEffect } from "react";
import axios from "axios";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import AddLinkIcon from "@mui/icons-material/AddLink";
import Post from "../../Feed/Post/Post";
import LockResetIcon from "@mui/icons-material/LockReset";
import "./MainPage.css";
import EditProfile from "../EditProfile/EditProfile";



const MainPage = ({ user }) => {
  const navigate = useNavigate();
  const [loggedInUser] = useLoggedInUser();
  const [isLoading, setIsLoading] = useState("");
  const username = user?.email?.split("@")[0];
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/userPost?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, [posts,user?.email]);

  const handleUploadCoverImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=2b3f5f33b70c38c3d1670364c6fb1d6c",
        formData
      )
      .then((res) => {
        const url = res.data.data.display_url;
        const userCoverImage = {
          email: user?.email,
          coverImage:url
        }
        setIsLoading(false);
        if (url) {
          axios.patch(`http://localhost:5000/userUpdates/${user?.email}`,userCoverImage)
        }
      });
  };

  const handleUploadProfileImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=2b3f5f33b70c38c3d1670364c6fb1d6c",
        formData
      )
      .then((res) => {
        const url = res.data.data.display_url;
        const userProfileImage = {
          email: user?.email,
          profileImage:url
        }
        setIsLoading(false);
        if (url) {
          axios.patch(`http://localhost:5000/userUpdates/${user?.email}`,userProfileImage)
        }
      });
  };

  return (
    <div className="sidebar-content-wrapper">
      <ArrowBackIcon
        className="arrow-icon cursor-pointer my-3 text-left"
        onClick={() => {
          navigate("/");
        }}
      />
      <div>
        <div>
          {
            <div>
              <div className="coverImageContainer">
                <img
                  className="w-full h-60"
                  src={
                    loggedInUser[0]?.coverImage
                      ? loggedInUser[0]?.coverImage
                      : "https://www.icamau.org/wp-content/uploads/2022/10/istockphoto-1337144146-170667a.jpg"
                  }
                  alt=""
                />
                <div className="hoverCoverImage">
                  <label htmlFor="image" className="imageIcon">
                    {isLoading ? (
                      <LockResetIcon className="photoIcon photoIconDisabled" />
                    ) : (
                      <CenterFocusWeakIcon className="photoIcon" />
                    )}
                  </label>
                  <div className="imageIcon_tweetButton">
                    <input
                      className="imageInput"
                      type="file"
                      id="image"
                      onChange={handleUploadCoverImage}
                    />
                  </div>
                </div>
              </div>
              <div className="avatar-img">
                <div className="avatarContainer mainProfile relative">
                  <img
                    className="avatar absolute"
                    src={
                      loggedInUser[0]?.profileImage
                        ? loggedInUser[0]?.profileImage
                        : "https://www.icamau.org/wp-content/uploads/2022/10/istockphoto-1337144146-170667a.jpg"
                    }
                    alt=""
                  />
                  <div className="hoverAvatarImage absolute center w-full h-full">
                    <div className="imageIcon_tweetButton">
                      <label htmlFor="profileImage" className="imageIcon">
                        {isLoading ? (
                          <LockResetIcon className="photoIcon photoIconDisabled" />
                        ) : (
                          <CenterFocusWeakIcon className="photoIcon" />
                        )}
                      </label>
                      <div className="imageIcon_tweetButton">
                        <input
                          type="file"
                          id="profileImage"
                          onChange={handleUploadProfileImage}
                          className="imageInput"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="userInfo">
                  <div>
                    <h3 className="heading-3">
                      {loggedInUser[0]?.name
                        ? loggedInUser[0]?.name
                        : user && user?.displayName}
                    </h3>
                    <p className="usernameSection">@{username}</p>
                  </div>
                  <EditProfile user={user} loggedInUser={loggedInUser}/>
                </div>
                <div className="infoContainer">
                  <h3 className="text-[30px] font-bold my-4">{loggedInUser[0]?.bio ? loggedInUser[0]?.bio : ""}</h3>
                  <div className="locationAndLink flex justify-evenly">
                    {loggedInUser[0]?.location ? (
                      <p className="sunInfo">
                        <MyLocationIcon />
                        {loggedInUser[0]?.location}
                      </p>
                    ) : (
                      ""
                    )}
                    {loggedInUser[0]?.website ? (
                      <p className="sunInfo">
                        <AddLinkIcon />
                        {loggedInUser[0]?.website}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <h4 className="font-bold text-left my-4 ml-4">Tweets</h4>
                <hr />
              </div>
              {posts.map((p) => (
                <Post id={p._id} p={p} />
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default MainPage;
