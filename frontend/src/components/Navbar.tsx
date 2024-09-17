import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loggedInState, tokenState, userState } from "../store/atoms/auth";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../assets/favicon.png";
import { FaSun, FaMoon } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import { MdLeaderboard } from "react-icons/md";
import { MdLogin } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa6";
import { FaLaptopCode } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";

interface NavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const setTokenState = useSetRecoilState(tokenState);
  const isLoggedIn = useRecoilValue(loggedInState);
  const location = useLocation();
  const user = useRecoilValue(userState);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setTokenState("");
    closeMenu();
    toast.success("Logged out successfully");
  };

  const getNavLinkClass = (path: string) => {
    return location.pathname === path
      ? "block rounded-md px-3 py-2 text-base font-medium text-gray-50  dark:text-gray-50  bg-[#2575fc] "
      : "block rounded-md px-3 py-2 text-base font-medium text-gray-50 dark:text-gray-50 hover:bg-[#2575fc]   ";
  };

  return (
    <div>
  <nav className="bg-gradient-to-r from-[#6a11cb] via-[#ab67df] to-[#2575fc] fixed w-full z-50">
    <div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        <Link to="/app" className="flex flex-shrink-0 items-center">
          <img
            src={logo}
            className="h-8 w-auto mr-3"
            alt="Styleshare Logo"
          />
          <span className="self-center sm:text-2xl font-bold text-white font-mono notranslate">
            Style Share
          </span>
        </Link>
        <div className="flex items-center justify-between w-full">
  <div className="hidden lg:block md:ml-2">
    <div className="flex justify-between w-full">
      <div className="flex items-center gap-2">
        <Link
          to="/app"
          className={`${getNavLinkClass("/app")} flex items-center`}
          aria-current="page"
          onClick={closeMenu}
        >
          <FaHome size={20} className="mx-1" /> Home
        </Link>
        <Link
          to="/app/posts"
          className={`${getNavLinkClass("/app/posts")} flex items-center`}
          onClick={closeMenu}
        >
          <FaRegNewspaper size={20} className="mx-1" /> Posts
        </Link>
        <Link
          to="/app/leaderboard"
          className={`${getNavLinkClass("/app/leaderboard")} flex items-center`}
          onClick={closeMenu}
        >
          <MdLeaderboard size={20} className="mx-1" /> Leaderboard
        </Link>
      </div>
      <div className="flex items-center gap-2 ml-2">
  {isLoggedIn && (
    <>
      <Link
        to="/app/new-post"
        className={`${getNavLinkClass("/app/new-post")} flex items-center`}
        onClick={closeMenu}
      >
        <MdPostAdd size={20} className="mx-1" /> NewPost
      </Link>
      <Link
        to="/app/code"
        className={`${getNavLinkClass("/app/code")} flex items-center`}
        onClick={closeMenu}
      >
        <FaLaptopCode className="mx-1" size={20} />CodeEditor
      </Link>
    </>
  )}
</div>

    </div>
  </div>
</div>

        <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
          <button
            onClick={toggleTheme}
            className="inline-flex mx-1 border-2 border-white items-center justify-center w-10 h-10 text-gray-100 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            {theme === "light" ? (
              <FaMoon className="w-4 h-4" />
            ) : (
              <FaSun className="w-4 h-4" />
            )}
          </button>
          {!isLoggedIn ? (
            <Link
              to="/app/signin"
              className="hidden lg:flex ml-2 rounded-md px-3 py-2 text-base font-medium bg-sky-500 hover:bg-sky-600 text-white items-center"
              onClick={closeMenu}
            >
              <MdLogin className="mx-1" size={20} /> Login/SignIn
            </Link>
          ) : (
            <div className="relative ml-3">
              <button
                type="button"
                className="relative w-10 h-10 flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded={isProfileDropdownOpen ? "true" : "false"}
                aria-haspopup="true"
                onClick={toggleProfileDropdown}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-10 w-10 rounded-full"
                  src={
                    user?.avatar ||
                    `https://ui-avatars.com/api/?name=${user?.username}&background=0ea5e9&color=fff&rounded=true&bold=true`
                  }
                  alt={user?.username}
                />
              </button>
              {isProfileDropdownOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 p-2 pb-2 space-y-1 w-48 origin-top-right rounded-md border-2 border-[#000435] bg-sky-500 dark:border-sky-500 dark:bg-[#000435] py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <Link
                    to="/app/profile"
                    className={`${getNavLinkClass("/app/profile")} flex items-center`}
                    onClick={closeMenu}
                  >
                    <CgProfile size={20} className="mx-1" />Profile
                  </Link>
                  <Link
                    to="/app/fav"
                    className={`${getNavLinkClass("/app/fav")} flex items-center`}
                    onClick={closeMenu}
                  >
                    <MdFavoriteBorder size={20} className="mx-1" />Favorite
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left rounded-md px-3 py-2 font-semibold text-red-500 hover:bg-red-700 hover:text-white"
                    role="menuitem"
                    id="user-menu-item-2"
                  >
                    <MdOutlineLogout size={20} className="mx-1" />Logout
                  </button>
                </div>
              )}
            </div>
          )}
          <button
            onClick={toggleMenu}
            type="button"
            className="ml-3 border-2 border-white inline-flex items-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white lg:hidden"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="block h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div
      className={`${isMenuOpen ? "block" : "hidden"} lg:hidden`}
      id="mobile-menu"
    >
      <div className="space-y-1 px-2 pt-2 pb-3">
        <Link
          to="/app"
          className={`${getNavLinkClass("/app")} flex items-center`}
          aria-current="page"
          onClick={closeMenu}
        >
          <FaHome size={20} className="mx-1" />Home
        </Link>
        <Link
          to="/app/posts"
          className={`${getNavLinkClass("/app/posts")} flex items-center`}
          onClick={closeMenu}
        >
          <FaRegNewspaper size={20} className="mx-1" />Posts
        </Link>
        <Link
          to="/app/leaderboard"
          className={`${getNavLinkClass("/app/leaderboard")} flex items-center`}
          onClick={closeMenu}
        >
          <MdLeaderboard size={20} className="mx-1" /> Leaderboard
        </Link>
        {isLoggedIn && (
          <>
            <Link
              to="/app/new-post"
              className={`${getNavLinkClass("/app/new-post")} flex items-center`}
              onClick={closeMenu}
            >
              <MdPostAdd size={20} className="mx-1" />New Post
            </Link>
            <Link
              to="/app/code"
              className={`${getNavLinkClass("/app/code")} flex items-center`}
              onClick={closeMenu}
            >
              <FaLaptopCode className="mx-1" size={20} />Code Editor
            </Link>
          </>
        )}
        {!isLoggedIn && (
          <div className="grid grid-cols-2 text-center pt-1">
            <Link
              to="/app/signin"
              className="flex  items-center justify-center px-2 mr-1 rounded-md py-2 text-base font-medium bg-sky-500 hover:bg-sky-600 text-white"
              onClick={closeMenu}
            >
              <MdLogin size={20} className="mx-1" />SignIn
            </Link>
            <Link
              to="/app/signup"
              className="flex items-center  justify-center px-2 ml-1 rounded-md py-2 text-base font-medium bg-sky-500 hover:bg-sky-600 text-white"
              onClick={closeMenu}
            >
              <FaUserPlus size={20} className="mx-1" /> SignUp
            </Link>
          </div>
        )}
      </div>
    </div>
  </nav>
</div>

  );
};

export default Navbar;
