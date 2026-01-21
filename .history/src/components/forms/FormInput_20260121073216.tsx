import { useFormContext } from "react-hook-form";

interface IInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

const FormInput = ({
  name,
  label,
  type = "text",
  placeholder,
}: IInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-bold text-brand-blue uppercase tracking-wider">
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className={`p-4 rounded-xl border ${errors[name] ? "border-red-500" : "border-gray-100"} bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-yellow outline-none transition-all`}
      />
      {errors[name] && (
        <span className="text-xs text-red-500">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default FormInput;
