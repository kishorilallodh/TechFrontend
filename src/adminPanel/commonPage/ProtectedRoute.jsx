import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  // Check 1: User login hai ya nahi
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check 2: User ka role allowed hai ya nahi
 
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Agar role allowed nahi hai, toh use uske default dashboard par bhej do
    toast.error("You are not authorized to access this page.");
    
    // User ke role ke hisaab se uske sahi dashboard par bhejo
    const redirectPath = user.role === 'admin' ? '/admin' : '/employee';
    return <Navigate to={redirectPath} replace />;
  }

  // Agar sab theek hai (ya toh role check nahi karna tha ya role match ho gaya), toh page dikhao
  return <Outlet />;
};

export default ProtectedRoute;