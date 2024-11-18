import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import httpRequest from "../axios";
import { clearUser } from "../lib/Redux/slices/userslice";
import { PROTECTED } from "../constants/apiEndPoints";
import toast from "react-hot-toast";

export const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const resp = await httpRequest.get(PROTECTED, {
          headers: {
            Authorization: `Bearer ${user?.user?.token}`,
          },
        });
        if (resp?.data?.message === "Access Granted") {
        }
      } catch (err) {
        if (err?.response?.status === 401) {
          handleUnauthorized();
        }
      }
    };
    checkToken();
  }, []);

  const handleUnauthorized = () => {
    toast.error("Section Expired Please Login Again !");
    dispatch(clearUser());
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const targetRoute = getTargetRoute(user?.user?.isOwner, location.pathname);

  if (targetRoute !== location.pathname) {
    return <Navigate to={targetRoute} replace />;
  }

  return children;
};

const getTargetRoute = (userRole, currentPath) => {
  if (userRole) {
    if (currentPath.startsWith("/earn")) {
      return "/learn";
    }
  } else {
    if (currentPath.startsWith("/learn")) {
      return "/earn";
    }
  }
  return currentPath;
};
