import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";
export const ProtectRoute = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    const noNav = ["/", "/register"];
    const showLayout = noNav.includes(router.pathname) ? false : true;
    const token = Cookies.get("token");
    if (noNav.includes(router.pathname)) {
      console.log("testeaaaaaaaaaaaaaaaaaaaaa");
    } else if (!token && router.pathname !== "/") {
      console.log("wtf", router.pathname);
      router.push("/");
    }
    return () => {};
  }, []);

  return children;
};
