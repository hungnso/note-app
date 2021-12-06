import React from "react";
import { useSelector } from "react-redux";
import { auth } from "../../common/firebase";

import { toast } from "react-toastify";
import { FaUserLock } from "react-icons/fa";

import Profile from "../Profile";
import UserNav from "../../common/nav/UserNav";
import FormGroup from "../../common/form/FormGroup";
function Setting() {
  let { user } = useSelector((state) => ({ ...state }));
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(password);

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Password updated");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const passwordUpdateForm = () => (
    <form className="form" onSubmit={handleSubmit}>
      <FormGroup
        id="password"
        label="Your Password"
        type="password"
        value={password}
        placeholder="Enter new password..."
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
      <button className="btn btn-primary" disabled={!password || password.length < 6 || loading}>
        Submit
      </button>
    </form>
  );

  return (
    <div className="container profile">
      <div className="profile-left">
        <Profile data={user} />
        <UserNav />
      </div>
      <div className="profile-right">
        <div className="password-container">
          {loading ? (
            <h2 className="text-loader">Loading...</h2>
          ) : (
            <h2 className="form-title">
              <FaUserLock size={28} />
              <span>Password Update</span>
            </h2>
          )}
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
}

export default Setting;
