import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Cookies.remove("ENSESO");
    navigate("/login");
  }, []);
};

export default Logout;