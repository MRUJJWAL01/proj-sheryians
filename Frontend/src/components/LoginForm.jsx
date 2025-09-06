import { useForm } from "react-hook-form";
import { loginUser } from "../apis/AuthApis";
import { useNavigate } from "react-router";

const LoginForm = ({ setFlag }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Check if identifier is email or username
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    

    let payload = {
      password: data.password,
    };

    if (emailRegex.test(data.identifier)) {
        
      payload.email = data.identifier;
    } else {
      payload.username = data.identifier;
    }


    try {
      let loggedinUser = await loginUser(payload);
      if (loggedinUser) {
        navigate("/");
      }
    } catch (error) {
      console.log("error in login", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-8 rounded-xl shadow-2xl shadow-black w-full max-w-md"
    >
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">
        Login
      </h2>

      {/* Username or Email */}
      <div>
        <input
          type="text"
          placeholder="Username or Email"
          {...register("identifier", {
            required: "Username or Email is required",
            validate: (value) => {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Example rule
              if (emailRegex.test(value) || usernameRegex.test(value)) {
                return true;
              }
              return "Enter a valid email or username";
            },
          })}
          className={`w-full px-4 py-2 rounded border ${
            errors.identifier ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:border-blue-600`}
        />
        {errors.identifier && (
          <span className="text-sm text-red-500">
            {errors.identifier.message}
          </span>
        )}
      </div>

      {/* Password */}
      <div>
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className={`w-full px-4 py-2 rounded border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:border-blue-600`}
        />
        {errors.password && (
          <span className="text-sm text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 cursor-pointer active:bg-blue-800 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
      >
        Login
      </button>

      {/* Switch to Register */}
      <div className="text-center mt-4 text-sm text-gray-700">
        Don't have an account?{" "}
        <button
          type="button"
          className="text-blue-600 cursor-pointer hover:underline font-semibold"
          onClick={() => setFlag((prev) => !prev)}
        >
          Register here
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
