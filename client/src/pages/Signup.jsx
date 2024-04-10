import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError(false);
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            {
                message: "User created successfully!";
            }
            setLoading(false);
            console.log(data);

            if (data.success === false) {
                setError(true);
                return;
            }
        } catch (err) {
            setLoading(false);
            setError(true);
        }
    };
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-center text-3xl font-semibold my-7">Signup</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    className="bg-slate-100 p-3 rounded-lg"
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="bg-slate-100 p-3 rounded-lg"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="bg-slate-100 p-3 rounded-lg"
                    onChange={handleChange}
                />
                <button
                    disabled={loading}
                    className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                >
                    {loading ? "Loading..." : "Sign up"}
                </button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Have an account?</p>
                <Link to="/sign-in">
                    <span className="text-blue-500">Sign in</span>
                </Link>
            </div>
            <p className="text-red-700 mt-5">
                {error && "Something went wrong!"}
            </p>
        </div>
    );
}
