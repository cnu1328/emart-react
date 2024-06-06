import { useAuth } from "../context/Auth";
import { Link } from "react-router-dom";
import { DEFAULT_IMG } from "../App";
import  { MouseEvent, useState } from "react";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
    carrotIcon,
    librabryIcon,
    profileIcon,
    writeSmallIcon,
} from "../assets/icons";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function AvatarMenu() {
  const { isAuthenticated, user, logout } = useAuth();
  return isAuthenticated ? (
    <AuthMenu
      avatar={user?.avatar || DEFAULT_IMG}
      email={user!.email}
      userId={user!._id}
      logout={logout}
    />
  ) : (
    <></>
  );
}

function AuthMenu({
  avatar,
  email,
  userId,
  logout,
}: {
  avatar: string;
  email: string;
  userId: string;
  logout(): void;
}) {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (
    event: MouseEvent<HTMLImageElement | HTMLSpanElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className="avatar"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "3px",
      }}
    >
      <img
        onClick={handleClick}
        style={{
          width: "32px",
          borderRadius: "50%",
          border: "1px solid #b671f3",
          cursor: "pointer",
        }}
        src={avatar ?? DEFAULT_IMG}
        alt=""
      />
      <span
        onClick={handleClick}
        style={{ color: "rgba(117, 117, 117, 1)", cursor: "pointer" }}
      >
        {carrotIcon}
      </span>

      <Menu
        PaperProps={{
          style: {
            width: 240,
            padding: "10px 0",
            borderRadius: "15px",
            marginTop: "10px",
          },
        }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link
          to={`/user/${userId}/wishlist`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MenuItem
            sx={[{ "&:hover": { backgroundColor: "transparent" } }]}
            onClick={handleClose}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "0px 18px",
            }}
          >
            <span
              style={{ color: "#7037a1", margin: "auto 10px" }}
            >
              {profileIcon}
            </span>
            <p
              style={{ marginLeft: "5px", paddingTop: "20px", color: "#7037a1", fontSize: "14px", fontWeight: "bold" }}
            >
              Profile
            </p>
          </MenuItem>
        </Link>
        <Link
          to={`/sell`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MenuItem
            sx={[{ "&:hover": { backgroundColor: "transparent" } }]}
            onClick={handleClose}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "0px 18px",
            }}
          >
            <span
              style={{ color: "#7037a1", margin: "0 10px", marginBottom: "-5px" }}
            >
              {writeSmallIcon}
            </span>
            <p
              style={{ marginLeft: "5px", paddingTop: "20px", color: "#7037a1", fontSize: "14px", fontWeight: "bold" }}
            >
              Add Product
            </p>
          </MenuItem>
        </Link>
        <Link
          to={`/cartItems`}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <MenuItem
            sx={[{ "&:hover": { backgroundColor: "transparent" } }]}
            onClick={handleClose}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "0px 18px",
            }}
          >
            <span
              style={{ color: "#7037a1", margin: "0 10px", marginBottom: "-5px" }}
            >
              {librabryIcon}
            </span>
            <p
              style={{ marginLeft: "5px", paddingTop: "20px", color: "#7037a1", fontSize: "14px", fontWeight: "bold" }}
            >
              Your Cart
            </p>
          </MenuItem>
        </Link>

        <Link
          to={`user/${userId}/wishlist`}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <MenuItem
            sx={[{ "&:hover": { backgroundColor: "transparent" } }]}
            onClick={handleClose}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "0px 18px",
            }}
          >
            <span
              style={{ color: "#7037a1", margin: "0 10px", marginBottom: "-5px" }}
            >
              <FavoriteBorderIcon />
            </span>
            <p
              style={{ marginLeft: "5px", paddingTop: "20px", color: "#7037a1", fontSize: "14px", fontWeight: "bold" }}
            >
              Wishlist
            </p>
          </MenuItem>
        </Link>

        <Divider sx={{ margin: "10px 0" }} />
        <MenuItem
          sx={[{ "&:hover": { backgroundColor: "transparent" } }]}
          onClick={() => {
            handleClose();
            logout();
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "0px 25px",
          }}
        >
          <p
            style={{
              color: "#7037a1",
              fontSize: "14px",
              marginBottom: "4px",
              marginTop: "2px",
              
            }}
          >
            Sign out
          </p>
          <span
            style={{ color: "#7037a1", fontSize: "13.75px", marginBottom: "-3px", fontWeight: "bold" }}
          >
            {email}
          </span>
        </MenuItem>
      </Menu>
    </div>
  );
}