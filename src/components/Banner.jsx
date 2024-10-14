import React from "react";

const Banner = ({ title, user, onSignIn, onSignOut }) => (
  <header className="text-center pt-4 d-flex justify-content-between px-4">
    <h1>{title}</h1>
    <div>
      {user ? (
        <>
          <span>Welcome, {user.email}</span>
          <button className="btn btn-danger ms-2" onClick={onSignOut}>
            Sign Out
          </button>
        </>
      ) : (
        <button className="btn btn-primary" onClick={onSignIn}>
          Sign In / Sign Up
        </button>
      )}
    </div>
  </header>
);

export default Banner;