import { Quote } from "@/components/Quote";
import { Card } from "@/components/ui/card";
import { apiClient } from "@/utils/axios";
import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function AuthLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get("/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        navigate("/");
        toast.success("Logged In successfully!");
      });
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <Card className="w-[330px] md:[350px]">{children}</Card>
          </div>
        </div>
      </div>

      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
}

export default AuthLayout;
