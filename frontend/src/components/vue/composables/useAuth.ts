import { useCookies } from "@vueuse/integrations/useCookies";
import { navigate } from "astro:transitions/client";

export const useAuth = () => {
  const cookies = useCookies(["user", "token"]);
  const user = cookies.get("user");
  const token = cookies.get("token");

  const login = (userObject: any, tokenString: any) => {
    cookies.set("user", userObject, { path: "/" });
    cookies.set("token", tokenString, { path: "/" });

    // user.value = cookies.get("user");
    // token.value = cookies.get("token");
  };

  const logout = () => {
    cookies.remove("user", { path: "/" });
    cookies.remove("token", { path: "/" });

    navigate("/auth/login");
  };

  return {
    user,
    token,
    login,
    logout,
  };
};
