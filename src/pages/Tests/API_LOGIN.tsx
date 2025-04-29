import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const API_LOGIN = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Gọi API login
      const res = await fetch("https://localhost:7112/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const data = await res.json();
      // Lưu token vào localStorage hoặc state (tùy bạn chọn)
      localStorage.setItem("authToken", data.token);

      // Điều hướng đến trang sau khi đăng nhập thành công (nếu cần)
      window.location.href = "/dashboard";
      toast.success("Login successful");
    } catch (error: any) {
      setError("Login failed: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default API_LOGIN;
