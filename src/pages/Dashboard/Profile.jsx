import { useState } from "react";
import Formrow from "../../Components/Formrow";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "../../Features/User/userSlice";

const Profile = () => {
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || "",
  };
  const [userData, setUserData] = useState(initialValues);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, lastName, location } = userData;

    if (!name || !email || !lastName || !location) {
      toast.error("Please Fill Out All Fields");
      return;
    }
    dispatch(updateUser({ name, email, lastName, location }));
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{userData.email}</h3>

        <div className="form-center">
          <Formrow
            type="text"
            name="name"
            value={userData.name}
            handleChange={handleChange}
          />
          <Formrow
            type="text"
            name="lastName"
            value={userData.lastName}
            handleChange={handleChange}
          />
          <Formrow
            type="email"
            name="email"
            value={userData.email}
            handleChange={handleChange}
          />
          <Formrow
            type="text"
            name="location"
            value={userData.location}
            handleChange={handleChange}
          />
          <button className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Please wait" : "Save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
