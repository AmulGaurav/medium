import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinInput, type SigninInput } from "@amulgaurav/medium-common";
import AuthLayout from "@/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { apiClient } from "@/utils/axios";
import { toast } from "sonner";

function Login() {
  const navigate = useNavigate();

  const form = useForm<SigninInput>({
    resolver: zodResolver(signinInput),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SigninInput) {
    const { email, password } = values;

    try {
      const { data } = await apiClient.post("/user/signin", {
        email,
        password,
      });
      console.log("data: ", data);
      localStorage.setItem("token", data?.token);

      toast.success("Logged in successfully!");
      form.reset();
      navigate("/");
    } catch (err: unknown) {
      console.error("variable: ", err);

      if (axios.isAxiosError(err)) {
        toast.error(
          err?.response?.data?.message || err.message || "Something went wrong."
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  }

  return (
    <AuthLayout>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Jm@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full cursor-pointer">
                Login
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex justify-center">
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </AuthLayout>
  );
}
export default Login;
