"use client";
import { useForm, Controller } from "react-hook-form";
import "../../common/styles.css";
import { InputFields, SelectField } from "@/components/forms";
import {
  COUNTRY_LIST,
  INVESTMENT_GOALS,
  PREFERRED_INDUSTRIES,
  RISK_TOLERANCE_OPTIONS,
} from "@/lib/constants";
import SmallLinks from "@/components/ui/footer";

// TypeScript type for form data
interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  country: string;
  investmentGoal: string;
  riskTolerance: string;
  preferredIndustry: string;
}

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      country: "",
      investmentGoal: "",
      riskTolerance: "",
      preferredIndustry: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      console.log("Form submitted:", data);
      // TODO: Handle actual sign-up API call here
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const footerProps = {
    text: "Already a User?",
    linkText: "Sign in",
    href: "/sign-in",
  };

  return (
    <>
      <h1 className="form-title">Sign Up & Personalize</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Full Name */}
        <InputFields
          name="fullName"
          type="text"
          label="Full Name"
          placeholder="Enter your full name here"
          register={register}
          errors={errors.fullName}
          validations={{
            required: "Full Name is required",
            maxLength: { value: 50, message: "Full Name is too long" },
          }}
        />

        {/* Email */}
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

        {/* Password */}
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

        {/* Country */}
        <SelectField
          control={control}
          name="country"
          label="Country"
          placeholder="Select your country"
          errors={errors.country}
          validations={{ required: "Country is required" }}
          options={COUNTRY_LIST}
        />

        {/* Investment Goal */}
        <SelectField
          control={control}
          name="investmentGoal"
          label="Investment Goals"
          placeholder="Select your investment goal"
          errors={errors.investmentGoal}
          validations={{ required: "Investment goal is required" }}
          options={INVESTMENT_GOALS}
        />

        {/* Risk Tolerance */}
        <SelectField
          control={control}
          name="riskTolerance"
          label="Risk Tolerance"
          placeholder="Select your risk tolerance level"
          errors={errors.riskTolerance}
          validations={{ required: "Risk tolerance is required" }}
          options={RISK_TOLERANCE_OPTIONS}
        />

        {/* Preferred Industry */}
        <SelectField
          control={control}
          name="preferredIndustry"
          label="Preferred Industry"
          placeholder="Select your preferred industry"
          errors={errors.preferredIndustry}
          validations={{ required: "Preferred industry is required" }}
          options={PREFERRED_INDUSTRIES}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="yellow-btn w-full mt-5 p-10"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Creating Account..."
            : "Start your Investment Journey"}
        </button>

        {/* Footer Links */}
        <SmallLinks links={footerProps} />
      </form>
    </>
  );
};

export default SignUpPage;
