import axios from "axios";
import AuthLayout from "@/layouts/AuthLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signupInput, type SignupInput } from "@amulgaurav/medium-common";
import { apiClient } from "@/utils/axios";
import { toast } from "sonner";

function Signup() {
  const navigate = useNavigate();

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupInput),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignupInput) {
    const { name, email, password } = values;

    try {
      const { data } = await apiClient.post("/user/signup", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data?.token);

      toast.success("User created successfully!");
      form.reset();
      navigate("/");
    } catch (err: unknown) {
      console.error("variable: ", err);

      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message || err.message || "Something went wrong."
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  }

  return (
    <AuthLayout>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          Enter your details below to create a new account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                    <FormDescription>
                      Password must be at least 6 characters long.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full cursor-pointer">
                Signup
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex justify-center">
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </CardFooter>
    </AuthLayout>
  );
}

export default Signup;
