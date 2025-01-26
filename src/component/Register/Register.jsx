import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const { signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [formErrors, setFormErrors] = useState({});

    const handleGoogleSignIn = async () => {
        try {
            const auth = getAuth();
            const result = await signInWithGoogle();
            const user = auth.currentUser;

            if (user) {
                const userData = {
                    firstName: user.displayName.split(" ")[0] || "Google User",
                    lastName: user.displayName.split(" ")[1] || "",
                    email: user.email,
                    photoURL: user.photoURL,
                    registrationDate: new Date().toISOString(),
                };

                const serverResponse = await fetch("http://localhost:5000/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userData),
                });

                if (!serverResponse.ok) {
                    throw new Error("Failed to save Google user data to the server.");
                }

                toast.success("Logged in with Google successfully!", {
                    position: "top-center",
                    autoClose: 5000,
                    theme: "light",
                    transition: Bounce,
                });

                navigate("/");
            }
        } catch (error) {
            console.error("Google login failed:", error.message);
            toast.error("Google login failed. Please try again.", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    const validatePassword = (password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const isLongEnough = password.length >= 6;

        if (!hasUppercase) {
            setPasswordError("Password must contain at least one uppercase letter.");
            return false;
        }
        if (!hasLowercase) {
            setPasswordError("Password must contain at least one lowercase letter.");
            return false;
        }
        if (!isLongEnough) {
            setPasswordError("Password must be at least 6 characters long.");
            return false;
        }

        setPasswordError("");
        return true;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const fname = e.target.fname.value.trim();
        const lname = e.target.lname.value.trim();
        const email = e.target.email.value.trim();
        const password = e.target.password.value;
        const imageURL = e.target.imageURL.value.trim();

        const errors = {};
        if (!fname) errors.fname = "First name is required.";
        if (!lname) errors.lname = "Last name is required.";
        if (!email) errors.email = "Email is required.";
        if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Invalid email address.";

        setFormErrors(errors);

        if (Object.keys(errors).length > 0 || !validatePassword(password)) {
            toast.error("Please fix the errors in the form.", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
            return;
        }

        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: `${fname} ${lname}`,
                photoURL: imageURL,
            });

            const serverResponse = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    displayName: `${fname} ${lname}`,
                    photoURL: imageURL,
                    email: user.email,
                    fname,
                    lname,
                }),
            });

            if (!serverResponse.ok) {
                throw new Error("Failed to save user data to the server.");
            }

            toast.success("User registered successfully!", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });

            navigate("/");
        } catch (error) {
            console.error("Error creating user:", error.message);
            toast.error("Error creating user. Please try again.", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div>
            <form onSubmit={handleRegister} className="w-full max-w-lg mx-auto my-7">
                <h1 className="text-5xl font-bold mb-5 ml-2">Register here!</h1>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="fname"
                            placeholder="Your first name"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                            required
                        />
                        {formErrors.fname && <p className="text-red-500 text-xs italic mt-2">{formErrors.fname}</p>}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lname"
                            placeholder="Your last name"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                            required
                        />
                        {formErrors.lname && <p className="text-red-500 text-xs italic mt-2">{formErrors.lname}</p>}
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        required
                    />
                    {formErrors.email && <p className="text-red-500 text-xs italic mt-2">{formErrors.email}</p>}
                </div>
                <div className="mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Image URL
                    </label>
                    <input
                        type="text"
                        name="imageURL"
                        placeholder="Enter your image URL"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                    />
                </div>
                <div className="mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-3 text-gray-700"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {passwordError && <p className="text-red-500 text-xs italic mt-2">{passwordError}</p>}
                </div>
                <button type="submit" className="btn btn-success">
                    Register Now
                </button>
                <div className="mt-3">
                    <hr />
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="btn mt-5 btn-ghost btn-outline"
                    >
                        Register with Google
                    </button>
                    <p>
                        Already have an account?{" "}
                        <Link to="/login" className="underline hover:text-primary">
                            Login here
                        </Link>
                    </p>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Register;
