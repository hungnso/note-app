import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";

import { Row, Col, Layout, Menu, Dropdown, Badge, Button, Avatar, Typography, Input, Form, Space } from "antd";

import { FaSearch, FaStore, FaShoppingCart, FaChevronDown, FaRegUserCircle } from "react-icons/fa";
import { FiLogOut, FiHeart } from "react-icons/fi";
import { RiHistoryFill, RiAdminLine } from "react-icons/ri";

function Header() {
  let dispatch = useDispatch();
  let history = useHistory();
  let { user } = useSelector((state) => ({ ...state }));

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.replace("/login");
  };

  const renderHeaderNav = () => {
    return (
      <Menu mode="horizontal" style={{ lineHeight: "46px", backgroundColor: "transparent", borderBottom: "none" }}>
        <Menu.Item key="store">
          <Link to="/store">
            <FaStore size={30} />
          </Link>
        </Menu.Item>
        <Menu.Item key="cart">
          <Badge count={0} showZero>
            <Link to="/cart">
              <FaShoppingCart size={28} />
            </Link>
          </Badge>
        </Menu.Item>
      </Menu>
    );
  };

  const renderLoginWrapper = () => {
    return (
      <>
        <Button type="link" shape="round" size="large">
          <Link to="/login">Login</Link>
        </Button>
        <Button type="primary" shape="round" size="large">
          <Link to="/register">Register</Link>
        </Button>
      </>
    );
  };

  const renderDropdownMenu = () => {
    const iconSize = 22;
    const dropdownItemStyle = { borderRadius: 8 };
    const dropdownTextStyle = { padding: 10, display: "flex", alignItems: "center", justifyContent: "space-between", fontWeight: "bold" };
    const menu = (
      <Menu style={{ borderRadius: 8, padding: 8 }}>
        {user.role !== "admin" ? (
          <>
            <Menu.Item style={dropdownItemStyle} key="profile">
              <Link to="/user/history" style={dropdownTextStyle}>
                Profile <FaRegUserCircle size={iconSize} />
              </Link>
            </Menu.Item>
            <Menu.Item style={dropdownItemStyle} key="wishlist">
              <Link to="/user/wishlist" style={dropdownTextStyle}>
                Wishlist <FiHeart size={iconSize} />
              </Link>
            </Menu.Item>
            <Menu.Item style={dropdownItemStyle} key="history">
              <Link to="/user/history" style={dropdownTextStyle}>
                History <RiHistoryFill size={iconSize} />
              </Link>
            </Menu.Item>
          </>
        ) : (
          <Menu.Item style={dropdownItemStyle} key="dashboard">
            <Link to="/admin/dashboard" style={dropdownTextStyle}>
              Dashboard <RiAdminLine size={iconSize} />
            </Link>
          </Menu.Item>
        )}
        <Menu.Item style={dropdownItemStyle} onClick={logout} key="logout">
          <span style={dropdownTextStyle}>
            <span style={{ fontWeight: "normal" }}>Logout</span> <FiLogOut size={iconSize} />
          </span>
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu} placement="bottomRight" arrow>
        <Space size="small" align="center">
          <Button size="large" shape="circle" style={{ height: 50, width: 50, padding: 2 }}>
            <Avatar size="large" src={user.picture} alt="avatar" />
          </Button>
          <Typography.Text type="secondary" style={{ width: 80, fontWeight: "bold" }} ellipsis>
            {user.name}
          </Typography.Text>
          <FaChevronDown className="dropdown-caret" />
        </Space>
      </Dropdown>
    );
  };

  const renderHeaderLeft = () => {
    return (
      <Row align="middle" style={{ height: 70 }}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/ecommerce-62fba.appspot.com/o/index.svg?alt=media&token=4582b9e5-16e0-4de1-a742-e1f0da3d3d62"
          alt="logo"
          style={{ height: "inherit" }}
        />
        <Link to="/" style={{ fontSize: 28, fontWeight: "bold" }}>
          SetUpStore
        </Link>
      </Row>
    );
  };

  const renderHeaderCenter = () => {
    return (
      <Row align="middle" justify="center">
        <Form name="header-search" style={{ width: "100%" }}>
          <Input
            style={{ borderRadius: 100, padding: "5px 8px 5px 20px", backgroundColor: "transparent" }}
            placeholder="Type your product ..."
            suffix={
              <Button type="primary" shape="round" size="large">
                <FaSearch size={18} />
              </Button>
            }
          />
        </Form>
      </Row>
    );
  };

  return (
      <Layout.Header style={{ height: "auto", backgroundColor: "#fff" }}>
        <Row justify="space-between" align="middle">
          <Col span={7}>{renderHeaderLeft()}</Col>
          <Col span={10}>{renderHeaderCenter()}</Col>
          <Col span={4}>
            <Row align="middle" justify="end">
              {!user ? renderLoginWrapper() : renderDropdownMenu()}
            </Row>
          </Col>
          <Col span={3}>
            <Row align="bottom" justify="end">
              {renderHeaderNav()}
            </Row>
          </Col>
        </Row>
      </Layout.Header>
  );
}
export default Header;
