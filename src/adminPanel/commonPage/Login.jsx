import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaPhone,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
// Redux aur Toastify ke imports
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { register, login, reset } from "../../features/auth/authSlice";

// Animation variants (No change here)
const formVariants = {
  initial: { opacity: 0, x: 100, scale: 0.95 },
  animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.4, ease: "easeInOut" } },
  exit: { opacity: 0, x: -100, scale: 0.95, transition: { duration: 0.3, ease: "easeInOut" } },
};

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [lastAction, setLastAction] = useState(null); // FIX: Track which action was performed (login or register)
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // 👉 YAHAN PAR CHANGE KAR SAKTE HAIN
  useEffect(() => {
    // Agar user logged in hai (localStorage se load hua ya naya login),
    // toh use uske dashboard par redirect kar do.
    if (user) {
      // Login success toast ko handle karne ke liye lastAction check
      if (lastAction === 'login') {
        toast.success(`Welcome back, ${user.name}!`);
      }
      if (user.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/employee");
      }
      return; // Redirect ke baad baki useEffect logic run na ho
    }

    if (isError) {
      toast.error(message);
    }
    
    // Register success hone par
    if (isSuccess && lastAction === 'register') {
      toast.success("User registered successfully! Please log in.");
      setIsLogin(true);
    }
    
    dispatch(reset());

  }, [user, isError, isSuccess, message, navigate, dispatch, lastAction]);

  const toggleAuthMode = () => setIsLogin(!isLogin);

  const handleLoginSubmit = (formData) => {
    setLastAction('login'); // Set the last action before dispatching
    dispatch(login(formData));
  };
  
  const handleSignupSubmit = (formData) => {
    setLastAction('register'); // Set the last action before dispatching
    dispatch(register(formData));
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-indigo-900 via-slate-900 to-fuchsia-900">
      <div className="w-full max-w-md h-[550px] relative">
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div key="login" variants={formVariants} initial="initial" animate="animate" exit="exit" className="absolute w-full">
              <div className="w-full p-6 sm:p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                <LoginForm toggleAuthMode={toggleAuthMode} onSubmit={handleLoginSubmit} isLoading={isLoading} />
              </div>
            </motion.div>
          ) : (
            <motion.div key="signup" variants={formVariants} initial="initial" animate="animate" exit="exit" className="absolute w-full">
              <div className="w-full p-6 sm:p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                <SignupForm toggleAuthMode={toggleAuthMode} onSubmit={handleSignupSubmit} isLoading={isLoading} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- LoginForm Component (FIXED) ---
// Isko SignupForm ki tarah banaya gaya hai taaki input fields kaam karein
function LoginForm({ toggleAuthMode, onSubmit, isLoading }) {
  const [showPassword, setShowPassword] = useState(false);
  // FIX: Use a single formData object for state management
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;

  // FIX: Create a single onChange handler
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    onSubmit(formData); // Pass the whole formData object
  };

  return (
    <div>
      <h2 className="text-3xl text-center font-bold text-white/90 mb-2">Welcome back</h2>
      <p className="text-white/60 mb-6 text-center">Login to continue</p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* FIX: Pass name, value, and onChange props correctly */}
        <FormField name="email" label="Email" icon={<FaEnvelope />} value={email} onChange={onChange} type="email" />
        <FormField
          name="password"
          label="Password"
          icon={<FaLock />}
          value={password}
          onChange={onChange}
          type={showPassword ? "text" : "password"}
          rightIcon={
            <button type="button" className="text-white/70 hover:text-white" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          }
        />
         <div className="text-right">
          <Link to="/forgot-password" className="text-sm text-white/80 hover:text-white hover:underline">
            Forgot Password?
          </Link>
        </div>
        <button type="submit" disabled={isLoading} className="w-full rounded-lg bg-white/90 text-slate-900 py-2.5 font-semibold hover:bg-white transition duration-200 cursor-pointer disabled:bg-white/50 disabled:cursor-not-allowed">
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="mt-4 text-center text-white/80">
        Don&apos;t have an account?{" "}
        <button onClick={toggleAuthMode} className="text-white hover:underline focus:outline-none cursor-pointer font-semibold" disabled={isLoading}>
          Signup now
        </button>
      </p>
    </div>
  );
}

// --- SignupForm Component (No changes needed here, it was already correct) ---
function SignupForm({ toggleAuthMode, onSubmit, isLoading }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", mobile: "" });
  const { name, email, password, mobile } = formData;
  const [error, setError] = useState("");

  const validateMobile = (value) => /^[6-9]\d{9}$/.test(value);

  const onChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'mobile') {
      const newValue = value.replace(/[^0-9]/g, "").slice(0, 10);
      setFormData((prevState) => ({ ...prevState, mobile: newValue }));
      
      if (newValue.length > 0 && newValue.length < 10) {
        setError("Mobile number must be 10 digits.");
      } else if (newValue.length === 10 && !validateMobile(newValue)) {
        setError("Please enter a valid mobile number.");
      } else {
        setError("");
      }
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !mobile) {
      toast.error("Please fill all fields");
      return;
    }
    if (!validateMobile(mobile)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    onSubmit(formData);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white/90 mb-2 text-center">Create account</h2>
      <p className="text-white/60 mb-4 text-sm text-center">Join us to get started</p>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <FormField name="name" label="Name" icon={<FaUser />} value={name} onChange={onChange} type="text" />
        <FormField name="email" label="Email" icon={<FaEnvelope />} value={email} onChange={onChange} type="email" />
        <FormField name="mobile" label="Mobile Number" icon={<FaPhone />} value={mobile} onChange={onChange} type="text" />
        {error && <p className="text-red-400 text-xs px-1">{error}</p>}
        <FormField
          name="password"
          label="Password"
          icon={<FaLock />}
          value={password}
          onChange={onChange}
          type={showPassword ? "text" : "password"}
          rightIcon={
            <button type="button" className="text-white/70 hover:text-white" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          }
        />
        <button type="submit" disabled={isLoading} className="w-full rounded-lg bg-white/90 text-slate-900 py-2.5 font-semibold hover:bg-white transition duration-200 cursor-pointer !mt-5 disabled:bg-white/50 disabled:cursor-not-allowed">
          {isLoading ? "Creating Account..." : "Signup"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-white/80">
        Already have an account?{" "}
        <button onClick={toggleAuthMode} className="text-white hover:underline focus:outline-none cursor-pointer font-semibold" disabled={isLoading}>
          Login now
        </button>
      </p>
    </div>
  );
}

// --- FormField Component (No change needed) ---
function FormField({ name, label, icon, value, onChange, type = "text", rightIcon }) {
  return (
    <div>
      <label className="block text-sm text-white/80 mb-1">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70">{icon}</span>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={`Enter your ${label.toLowerCase()}`}
          className="w-full rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/70 pl-10 pr-10 py-2 outline-none focus:border-white/40 focus:ring-2 focus:ring-white/30"
          required
        />
        {rightIcon && (<span className="absolute right-3 top-1/2 -translate-y-1/2">{rightIcon}</span>)}
      </div>
    </div>
  );
}

export default AuthPage;