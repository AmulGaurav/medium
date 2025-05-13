import { Quote } from "@/components/Quote";
import { Card } from "@/components/ui/card";
import type { ReactNode } from "react";

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <Card className="w-[350px]">{children}</Card>
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
