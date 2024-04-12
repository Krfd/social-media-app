import { useSelector } from "react-redux";

export default function Profile() {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <div className="mx-auto p-3 max-w-lg">
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form action="" className="flex flex-col gap-4">
                <img
                    src={currentUser.profilePicture}
                    alt="profile"
                    className="h-24 w-24 cursor-pointer rounded-full object-cover self-center mt-2"
                />
                <input
                    type="text"
                    id="username"
                    defaultValue={currentUser.username}
                    placeholder="Username"
                    className="bg-slate-100 p-3 rounded-lg "
                />
                <input
                    type="email"
                    id="email"
                    defaultValue={currentUser.email}
                    placeholder="Email"
                    className="bg-slate-100 p-3 rounded-lg "
                />
                <input
                    type="password"
                    name=""
                    id="password"
                    placeholder="Password"
                    className="bg-slate-100 p-3 rounded-lg "
                />
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                    update
                </button>
            </form>
            <div className="flex justify-between mt-5">
                <span className="text-red-700 cursor-pointer">
                    Delete Account
                </span>
                <span className="text-red-700 cursor-pointer">Sign out</span>
            </div>
        </div>
    );
}
