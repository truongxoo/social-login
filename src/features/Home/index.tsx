/* eslint-disable */
import { Dropdown, message, Modal } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAppSelector } from "../../hooks/common";
import { setUserDetails } from "../../redux/slices/authSlice";
import authApi from "../../api/authApi";
import FlipCard from "./component/FlipCard";
import userApi from "../../api/userApi";
import { useDispatch } from "react-redux";
import {removeToken } from "../../services/localStorageService";
import { imageCollection } from "../../assets";

const HomePage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userDetails = useAppSelector((state) => state.user.details);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const avatarMenuItems = [
    {
      key: "1",
      label: <Link to="/">Profile</Link>,
    },
    {
      key: "2",
      label: <Link to="/">Settings</Link>,
    },
    {
      key: "3",
      label: (
        <Link onClick={() => setIsModalVisible(true)} to="#">
          Logout
        </Link>
      ),
    },
  ];

  useEffect(() => {
    // Fetch user details when the component mounts
    getUserDetail();
  }, []);

 
  /**
   * Fetches user details from the API and updates the Redux store.
   */
  const getUserDetail = async () => {
    const { ok, body, error } = await userApi.getUserDetail();
    if (ok && body) {
      // Dispatch the user details to the Redux store if successful
      dispatch(setUserDetails(body));
    } else if (error) {
      // Display an error message if fetching user details fails
      message.error("Try again");
    }
  };

  /**
   * Handles the logout process by hiding the modal, calling the logout API,
   * clearing user details from the Redux store, and navigating to the login page.
   */
  const handleConfirmLogout = async () => {
    setIsModalVisible(false); // Hide the modal
    const { ok } = await authApi.logout();
    if (ok) {
      // Clear user details from the Redux store and remove the authentication token
      dispatch(setUserDetails(null));
      removeToken();
      // Navigate to the login page
      navigate("/login", { replace: true });
    }
  };

  return (
    <Fragment>
      <div className="home-page">
        <nav className="navbar">
          <Link to="/" className="logo">
            <img src={imageCollection.logo} alt="" />
          </Link>
          <div className="user-info">
            <Dropdown menu={{ items: avatarMenuItems }} trigger={["click"]}>
              <div className="avatar-container">
                <FaUserCircle className="avatar" />
                <strong className="user-name">{userDetails?.firstName}</strong>
              </div>
            </Dropdown>
          </div>
        </nav>

        <div className="content">
          <div className="welcome-section">
            <h1>Welcome back, {userDetails?.firstName}</h1>
            <p>Here’s what’s happening today</p>
          </div>
          <FlipCard />
          <div className="wrapper-content">
            <div className="content">
              <div className="overlay">
                <h3 className="title">Today’s Top Technology Headlines</h3>
                <p className="description">
                  This is a brief description of the news item.
                </p>
              </div>
              <img src={imageCollection.new1}></img>
            </div>
            <div className="content">
              <div className="overlay">
                <h3 className="title">Tech Trends: What’s New in 2024</h3>
                <p className="description">
                  This is a brief description of the news item. It provides
                  additional details about the news.
                </p>
              </div>
              <img src={imageCollection.new2}></img>
            </div>
            <div className="content">
              <div className="overlay">
                <h3 className="title">
                  Cybersecurity Insights: Protecting Your Digital Life
                </h3>
                <p className="description">
                  This is a brief description of the news item.
                </p>
              </div>
              <img src={imageCollection.new3}></img>
            </div>
            <div className="content">
              <div className="overlay">
                <h3 className="title">
                  In-Depth: The Future of Artificial Intelligence
                </h3>
                <p className="description">
                  This is a brief description of the news item.
                </p>
              </div>
              <img src={imageCollection.new4}></img>
            </div>
          </div>
        </div>

        <footer className="footer">
          <p>&copy; 2024 MyApp. All rights reserved.</p>
        </footer>
      </div>

      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleConfirmLogout}
        cancelButtonProps={{
          style: {
            backgroundColor: "#ffffff",
            borderColor: "rgb(21, 145, 190)",
            color: "rgb(21, 145, 190)",
          },
        }}
        okButtonProps={{
          style: {
            backgroundColor: "rgb(21, 145, 190)",
            borderColor: "rgb(21, 145, 190)",
          },
        }}
      >
        <p>Do you want to logout?</p>
      </Modal>
    </Fragment>
  );
};

export default HomePage;
