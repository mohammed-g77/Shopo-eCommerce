import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useProfile,
  useUpdateProfile,
  useChangeEmail,
  useChangePassword,
} from "../../hooks/useProfile";
import styles from "./Profile.module.css";

// ─── SVG Icons ─────────────────────────────────────────────────────────────
const Icons = {
  User: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  Mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  Lock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
  Logout: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
};

// ─── Shared UI Components ──────────────────────────────────────────────────
const AlertBox = ({ type, message }) => {
  if (!message) return null;
  return (
    <div className={`${styles.alertBox} ${type === "success" ? styles.alertSuccess : styles.alertError}`}>
      {type === "success" 
        ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
        : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
      }
      {message}
    </div>
  );
};

// ─── Personal Info Form ────────────────────────────────────────────────────
const PersonalInfoForm = ({ profile }) => {
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();
  
  const [form, setForm] = useState({
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    phoneNumber: profile?.phoneNumber || "",
  });
  
  const [status, setStatus] = useState({ type: "", msg: "" });

  // Sync state if profile changes via refetch
  useEffect(() => {
    if (profile) {
      setForm({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phoneNumber: profile.phoneNumber || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim()) {
      setStatus({ type: "error", msg: "First name and last name are required." });
      return;
    }
    
    setStatus({ type: "", msg: "" });
    try {
      const res = await updateProfile(form);
      setStatus({ type: res.success ? "success" : "error", msg: res.message });
    } catch {
      setStatus({ type: "error", msg: "An error occurred while updating the profile." });
    }
  };

  return (
    <div>
      <h2 className={styles.sectionTitle}>Personal Information</h2>
      <p className={styles.sectionDesc}>Update your basic profile details below.</p>
      
      <AlertBox type={status.type} message={status.msg} />

      <form onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>First Name</label>
            <input name="firstName" value={form.firstName} onChange={handleChange} className={styles.input} disabled={isPending} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Last Name</label>
            <input name="lastName" value={form.lastName} onChange={handleChange} className={styles.input} disabled={isPending} />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Phone Number</label>
            <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className={styles.input} disabled={isPending} placeholder="+1234567890" />
          </div>
        </div>
        <div className={styles.btnWrap}>
          <button type="submit" disabled={isPending} className={styles.saveBtn}>
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

// ─── Change Email Form ─────────────────────────────────────────────────────
const ChangeEmailForm = ({ profile }) => {
  const { mutateAsync: changeEmail, isPending } = useChangeEmail();
  const [form, setForm] = useState({ newEmail: "", password: "" });
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.newEmail.trim() || !form.password.trim()) {
      setStatus({ type: "error", msg: "Both new email and current password are required." });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.newEmail)) {
      setStatus({ type: "error", msg: "Please enter a valid email address." });
      return;
    }

    setStatus({ type: "", msg: "" });
    try {
      const res = await changeEmail(form);
      setStatus({ type: res.success ? "success" : "error", msg: res.message });
      if (res.success) setForm({ newEmail: "", password: "" });
    } catch {
      setStatus({ type: "error", msg: "Failed to change email." });
    }
  };

  return (
    <div>
      <h2 className={styles.sectionTitle}>Change Email</h2>
      <p className={styles.sectionDesc}>Update the email address associated with your account.</p>

      <AlertBox type={status.type} message={status.msg} />

      <form onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Current Email</label>
            <input value={profile?.email || ""} disabled className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>New Email Address</label>
            <input type="email" name="newEmail" value={form.newEmail} onChange={handleChange} className={styles.input} disabled={isPending} />
          </div>
        </div>
        <div className={styles.formGroup} style={{ maxWidth: "50%" }}>
          <label className={styles.label}>Current Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} className={styles.input} disabled={isPending} />
        </div>
        <div className={styles.btnWrap}>
          <button type="submit" disabled={isPending} className={styles.saveBtn}>
            {isPending ? "Updating..." : "Update Email"}
          </button>
        </div>
      </form>
    </div>
  );
};

// ─── Change Password Form ──────────────────────────────────────────────────
const ChangePasswordForm = () => {
  const { mutateAsync: changePassword, isPending } = useChangePassword();
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setStatus({ type: "error", msg: "All fields are required." });
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setStatus({ type: "error", msg: "New passwords do not match." });
      return;
    }
    if (form.newPassword.length < 6) {
      setStatus({ type: "error", msg: "New password must be at least 6 characters." });
      return;
    }

    setStatus({ type: "", msg: "" });
    try {
      const res = await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword
      });
      setStatus({ type: res.success ? "success" : "error", msg: res.message });
      if (res.success) setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch {
      setStatus({ type: "error", msg: "Failed to change password." });
    }
  };

  return (
    <div>
      <h2 className={styles.sectionTitle}>Change Password</h2>
      <p className={styles.sectionDesc}>Ensure your account is using a long, random password to stay secure.</p>
      
      <AlertBox type={status.type} message={status.msg} />

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup} style={{ maxWidth: "50%" }}>
          <label className={styles.label}>Current Password</label>
          <input type="password" name="currentPassword" value={form.currentPassword} onChange={handleChange} className={styles.input} disabled={isPending} />
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>New Password</label>
            <input type="password" name="newPassword" value={form.newPassword} onChange={handleChange} className={styles.input} disabled={isPending} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Confirm New Password</label>
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} className={styles.input} disabled={isPending} />
          </div>
        </div>
        <div className={styles.btnWrap}>
          <button type="submit" disabled={isPending} className={styles.saveBtn}>
            {isPending ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

// ─── Main Profile Page ─────────────────────────────────────────────────────
export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");
  
  // Real API Fetch
  const { data: profile, isLoading, isError } = useProfile();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Auth Guard
  if (!localStorage.getItem("token")) {
    return (
      <div className="container-x" style={{ py: 60, textAlign: "center" }}>
        <h2>Please Log In</h2>
        <p>You must be logged in to view this page.</p>
      </div>
    );
  }

  const getInitials = () => {
    if (!profile) return "U";
    return `${profile.firstName?.[0] || ""}${profile.lastName?.[0] || ""}`.toUpperCase() || "U";
  };

  return (
    <div className={styles.profilePage}>
      <div className="container-x">
        <div className={styles.layout}>
          
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <div className={styles.avatar}>
                {isLoading ? "..." : getInitials()}
              </div>
              <h3 className={styles.userName}>
                {isLoading ? "Loading..." : profile?.firstName ? `${profile.firstName} ${profile.lastName}` : "User"}
              </h3>
              <p className={styles.userEmail}>{profile?.email || ""}</p>
            </div>

            <div className={styles.menuList}>
              <button 
                className={`${styles.menuItem} ${activeTab === "info" ? styles.active : ""}`}
                onClick={() => setActiveTab("info")}
              >
                <div className={styles.menuIcon}>{Icons.User}</div>
                Personal Info
              </button>
              <button 
                className={`${styles.menuItem} ${activeTab === "email" ? styles.active : ""}`}
                onClick={() => setActiveTab("email")}
              >
                <div className={styles.menuIcon}>{Icons.Mail}</div>
                Change Email
              </button>
              <button 
                className={`${styles.menuItem} ${activeTab === "password" ? styles.active : ""}`}
                onClick={() => setActiveTab("password")}
              >
                <div className={styles.menuIcon}>{Icons.Lock}</div>
                Change Password
              </button>

              <button className={styles.logoutBtn} onClick={handleLogout}>
                <div className={styles.menuIcon}>{Icons.Logout}</div>
                Log Out
              </button>
            </div>
          </aside>

          {/* Content Area */}
          <div className={styles.contentArea}>
            {isLoading ? (
              <div style={{ padding: "40px 0", textAlign: "center" }}>Loading your profile...</div>
            ) : isError ? (
              <AlertBox type="error" message="Failed to load profile. Your session may have expired." />
            ) : (
              <>
                {activeTab === "info" && <PersonalInfoForm profile={profile} />}
                {activeTab === "email" && <ChangeEmailForm profile={profile} />}
                {activeTab === "password" && <ChangePasswordForm />}
              </>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
