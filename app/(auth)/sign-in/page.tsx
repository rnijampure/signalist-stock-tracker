"use client";
import { useForm } from "react-hook-form";
import { InputFields } from "@/components/forms";
import SmallLinks, { FooterLinkProps } from "@/components/ui/footer";

interface SignInFormData {
  email: string;
  password: string;
}

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      console.log("Sign in data:", data);
      // TODO: handle sign-in API call here
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const footerProps: FooterLinkProps = {
    text: "Don't have an account?",
    linkText: "Sign up",
    href: "/sign-up",
  };

  return (
    <>
      <h1 className="form-title">Sign In</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Email Field */}
        <InputFields
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email here"
          register={register}
          errors={errors.email}
          validations={{
            required: "Email is required",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter a valid email address",
            },
          }}
        />

        {/* Password Field */}
        <InputFields
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password here"
          register={register}
          errors={errors.password}
          validations={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="yellow-btn w-full mt-5 p-10"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>

        {/* Footer link to Sign Up */}
        <SmallLinks links={footerProps} />
      </form>
    </>
  );
};

export default SignInPage;
