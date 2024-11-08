import React, { useState } from 'react';
import '../styles/UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "Tan Ah Kow",
    email: "Kow@example.com",
    joined: "January 1, 2022",
    bio: "A passionate investor.",
    profilePicture: "https://via.placeholder.com/150"
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSaveClick = () => {
    setUser({ ...formData });
    setEditMode(false);
  };

  const handleCancelClick = () => {
    setFormData({ ...user });
    setEditMode(false);
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <img src={user.profilePicture} alt="Profile" />
      <div>
        <strong>Name:</strong> 
        {editMode ? (
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        ) : (
          <span>{user.name}</span>
        )}
      </div>
      <div>
        <strong>Email:</strong>
        {editMode ? (
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        ) : (
          <span>{user.email}</span>
        )}
      </div>
      <div>
        <strong>Joined:</strong> <span>{user.joined}</span>
      </div>
      <div>
        <strong>Bio:</strong>
        {editMode ? (
          <textarea name="bio" value={formData.bio} onChange={handleInputChange}></textarea>
        ) : (
          <span>{user.bio}</span>
        )}
      </div>
      {editMode ? (
        <div>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleEditClick}>Edit Profile</button>
      )}
    </div>
  );
};

export default UserProfile;
