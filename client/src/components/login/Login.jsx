import PropTypes from "prop-types";
import { useState } from "react";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  return (
    <main className="w-full h-screen bg-black/50 fixed flex justify-center items-center">
      <div className="flex flex-col text-center gap-5 bg-slate-200 p-5 rounded-md">
        <h1 className="text-emerald-800">Public ChatRoom</h1>
        <input
          className="px-2 py-1 rounded-md"
          type="text"
          name="username"
          id="username"
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="px-2 py-1 rounded-xl bg-emerald-500 text-white"
          onClick={() => setUser(username)}
          type="button"
          value="Enter Chat"
        />
      </div>
    </main>
  );
}

Login.propTypes = {
  setUser: PropTypes.func,
};

export default Login;
