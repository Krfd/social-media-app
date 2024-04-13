import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
    getStorage,
    uploadBytesResumable,
    ref,
    getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {
    updateUserFailure,
    updateUserStart,
    updateUserSuccess,
} from "../redux/user/userSlice";
import { set } from "mongoose";

export default function Profile() {
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const [image, setImage] = useState(undefined);
    const [imagePercent, setImagePercent] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdate] = useState(false);

    const { currentUser, loading, error } = useSelector((state) => state.user);

    useEffect(() => {
        if (image) {
            handleFileUpload(image);
        }
    }, [image]);

    const handleFileUpload = async (image) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImagePercent(Math.round(progress));
            },
            // Goods
            (error) => {
                setImageError(true);
            },
            // Goods
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((getDownloadURL) =>
                    setFormData({ ...formData, profilePicture: getDownloadURL })
                );
            }
        );
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(updateUserStart());
            const res = await fetch(`api/user/update/${currentUser._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data));
                return;
            }
            dispatch(updateUserSuccess(data));
            setUpdate(true);
        } catch (err) {
            dispatch(updateUserFailure(err));
        }
    };
    return (
        <div className="mx-auto p-3 max-w-lg">
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <img
                    src={formData.profilePicture || currentUser.profilePicture}
                    alt="profile"
                    className="h-24 w-24 cursor-pointer rounded-full object-cover self-center mt-2"
                    onClick={() => fileRef.current.click()}
                />
                <p className="self-center text-sm">
                    {imageError ? (
                        <span className="text-red-700">
                            Error uploading image
                        </span>
                    ) : imagePercent > 0 && imagePercent < 100 ? (
                        <span className="text-slate-700">
                            {`Uploading ${imagePercent} %`}
                        </span>
                    ) : imagePercent === 100 ? (
                        <span className="text-green-700">
                            Image uploaded successfully
                        </span>
                    ) : (
                        ""
                    )}
                </p>
                <input
                    type="text"
                    id="username"
                    defaultValue={currentUser.username}
                    placeholder="Username"
                    className="bg-slate-100 p-3 rounded-lg"
                    onChange={handleChange}
                />
                <input
                    type="email"
                    id="email"
                    defaultValue={currentUser.email}
                    placeholder="Email"
                    className="bg-slate-100 p-3 rounded-lg "
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name=""
                    id="password"
                    placeholder="Password"
                    className="bg-slate-100 p-3 rounded-lg "
                    onChange={handleChange}
                />
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                    {loading ? "Loading..." : "Update"}
                </button>
            </form>
            <div className="flex justify-between mt-5">
                <span className="text-red-700 cursor-pointer">
                    Delete Account
                </span>
                <span className="text-red-700 cursor-pointer">Sign out</span>
            </div>
            <p className="text-red-700 mt-5 text-center">
                {error && "Something went wrong!"}
            </p>
            <p className="text-green-700 mt-5 text-center">
                {updateSuccess && "User updated successfully!"}
            </p>
        </div>
    );
}
