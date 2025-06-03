import { apiClient } from "@/utils/axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import ProgressBar from "./ProgressBar";
import useUserStore from "@/store/userStore";
import { toast } from "sonner";

function ProtectedRoute() {
  const location = useLocation();
  const setName = useUserStore((state) => state.setUsername);
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);

  useEffect(() => {
    apiClient("/user/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(({ data }: { data: { name: string } }) => {
        setIsAuthenticated(!!data.name);
        setName(data.name);
      })
      .catch((err) => {
        setIsAuthenticated(false);
        localStorage.clear();
        toast.error(err.response?.data?.message || err.message);
      });
  }, []);

  if (isAuthenticated === null) {
    return <ProgressBar />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
