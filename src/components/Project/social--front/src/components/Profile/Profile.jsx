  import { useEffect, useState } from "react";
  import { axiosInstance } from "../request";
  import "./Profile.css";

  function Profile() {
    const [user, setUser] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");

    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const username = localStorage.getItem("username");
          const res = await axiosInstance.get("/auth/user", { params: { username } });
          setUser(Array.isArray(res.data) ? res.data[0] : res.data);
        } catch {
          setUploadError("Profilni olishda xatolik bo‘ldi!");
        }
      };
      fetchProfile();
    }, []);

const handleImageUpload = async (file) => {
  if (!file) return;
  setUploading(true);
  setUploadError("");

  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosInstance.post("/image/user", formData);
    console.log(res.data); 
    const imageUrl = res.data.user_image;
    if (!imageUrl) throw new Error("Rasm URL topilmadi!");

    setUser(prev => ({ ...prev, user_img: imageUrl }));
    alert("Rasm muvaffaqiyatli yuklandi!");
  } catch (err) {
    console.error(err);
    setUploadError("Rasm yuklashda xatolik bo‘ldi!");
  } finally {
    setUploading(false);
  }
};
    if (!user) return <p>Yuklanmoqda...</p>;

    return (
      <div className="profile-wrapper">
        <div className="profile-image-div">
          <label>
            <input
              type="file"
              hidden
              accept="image/*"      
              onChange={(e) => handleImageUpload(e.target.files?.[0])}
            />
            <img
              src={user.user_img ? `${user.user_img}?t=${Date.now()}` : " https://cdn-icons-png.flaticon.com/512/149/149071.png  "}
              alt="profile"
              className="profile-pic"
              style={{ opacity: uploading ? 0.7 : 1 }}
            />
          </label>
          {uploading && <p className="upload-red">Yuklanmoqda...</p>}
          {uploadError && <p className="upload-red">{uploadError}</p>}
        </div>

        <div className="profile-info-div">
          <h2>@{user.username}</h2>
          <h3>{user.first_name} {user.last_name}</h3>
          <h3>{user.email}</h3>
          <div className="profile-stats">
            <span>Followers: {user.followers}</span>
            <span>Following: {user.followings ?? user.following}</span>
          </div>
        </div>
      </div>
    );
  }

  export default Profile;   