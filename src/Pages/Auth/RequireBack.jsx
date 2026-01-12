import Cookie from "cookie-universal";
import { Outlet } from "react-router-dom";
export default function RequireBack() {
  const cookie = Cookie();
  const token = cookie.get("CuberWeb");
  return token ? (window.location.pathname = "/home") : <Outlet />;
}
