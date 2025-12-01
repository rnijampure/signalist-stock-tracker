import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { iconOption } from "@/lib/constants";

// =================== InputFields ===================
interface InputFieldsProps {
  name: string;
  label?: string;
  placeholder?: string;
  type: string;
  register: any;
  validations?: any;
  errors?: any;
  disabled?: boolean;
}

const InputFields = ({
  name,
  label,
  placeholder,
  register,
  validations,
  errors,
  type,
  disabled,
}: InputFieldsProps) => {
  return (
    <div className="form-field">
      {label && <label htmlFor={name}>{label}:</label>}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...register(name, validations)}
      />
      {errors && (
        <p className="error">{errors.message || `${label} is required`}</p>
      )}
    </div>
  );
};

// =================== SelectField ===================
interface SelectFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  control: any;
  validations?: any;
  errors?: any;
  options: iconOption[];
  disabled?: boolean;
}

const SelectField = ({
  name,
  label,
  placeholder,
  control,
  validations,
  errors,
  options,
  disabled,
}: SelectFieldProps) => {
  return (
    <div className="form-field">
      {label && <label htmlFor={name}>{label}:</label>}

      <Controller
        name={name}
        control={control}
        rules={validations}
        render={({ field }) => (
          <Select
            value={field.value || ""}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger className="w-full select-trigger border border-amber-50">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent className="bg-gray-800 border-gray-600 text-white">
              <SelectGroup>
                {options.map(({ value, label, image }) => (
                  <SelectItem
                    key={value}
                    value={value}
                    className="hover:bg-green-500 hover:text-black"
                  >
                    {image && (
                      <Image src={image} alt="icon" width={20} height={20} />
                    )}
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />

      {errors && (
        <p className="error">{errors.message || `${label} is required`}</p>
      )}
    </div>
  );
};

export { InputFields, SelectField };
