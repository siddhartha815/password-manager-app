import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { Eye, EyeOff } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const visref = useRef(null);
  const password = useRef("");
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.info("Successfully copied to clipboard!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleBtnClick = () => {
    if (
      form.site.length > 1 &&
      form.username.length > 1 &&
      form.password.length > 1
    ) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]),
      );
      setForm({ site: "", username: "", password: "" });
      toast("Password saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Password not saved :(");
    }
  };

  const handleImgClick = () => {
    if (visref.current.src === "https://siddhartha815.github.io/password-manager-app/view-off.svg") {
      visref.current.src = "view.svg";
      password.current.type = "password";
    } else {
      visref.current.src = "view-off.svg";
      password.current.type = "text";
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (id) => {
    setForm(passwordArray.filter((i) => i.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleDelete = (id) => {
    if (confirm("Do you really want to delete this password?")) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id)),
      );
      toast("Password Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="my-8 sm:my-12 text-center pb-16">
        <div className="font-bold text-3xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
          <span className="text-[#FF9933]">&lt;Sur</span>
          <span className="text-white">ak</span>
          <span className="text-green-700">sha/&gt;</span>
        </div>
        <p>Your own Password Manager</p>
        {/* input for site URL */}
        <input
          value={form.site}
          type="url"
          className="border border-green-400 my-4 rounded-full w-full sm:w-3/4 md:w-2/3 lg:w-1/2 px-3 py-1 mx-4 sm:mx-0"
          placeholder="Enter website URL"
          name="site"
          onChange={handleChange}
        />
        {/* username/password row */}
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto flex flex-col sm:flex-row gap-3 px-4 sm:px-0">
          <input
            value={form.username}
            type="text"
            className="border border-green-400 rounded-full w-full px-3 py-1"
            placeholder="Enter Username"
            name="username"
            onChange={handleChange}
          />
          <div className="relative flex items-center">
            <input
              value={form.password}
              type="password"
              className="border border-green-400 rounded-full px-3 pr-8 py-1 w-full"
              placeholder="Enter Password"
              name="password"
              onChange={handleChange}
              ref={password}
            />
            <img
              src="view.svg"
              alt="toggle visibility"
              className="absolute right-2 cursor-pointer"
              ref={visref}
              onClick={handleImgClick}
            />
          </div>
        </div>
        <button
          className="border border-green-700 my-6 bg-green-500 rounded-full px-3.5 py-1 cursor-pointer flex mx-auto items-center gap-1 text-sm font-medium"
          onClick={handleBtnClick}
        >
          <lord-icon
            src="https://cdn.lordicon.com/efxgwrkc.json"
            trigger="hover"
            style={{ innerWidth: 250, innerHeight: 250 }}
          ></lord-icon>
          <span>Add Password</span>
        </button>
        <div className="passwords w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto px-4 sm:px-0">
          <h2 className="text-left font-bold text-xl">Your Passwords</h2>
          {passwordArray.length === 0 && (
            <div className="text-left">No password to show</div>
          )}
          {passwordArray.length !== 0 && (
            <div className="overflow-x-auto rounded-lg">
              <table
                className="table-fixed w-full my-2.5 rounded-lg"
                style={{ minWidth: "400px" }}
              >
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="py-1 w-2/5 px-2">Website</th>
                    <th className="py-1 w-1/5 px-2">Username</th>
                    <th className="py-1 w-1/5 px-2">Password</th>
                    <th className="py-1 w-1/5 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">
                  {passwordArray.map((item, index) => (
                    <tr
                      className="border border-solid border-white"
                      key={index}
                    >
                      <td className="py-1 px-2 w-2/5">
                        <div className="flex gap-1 justify-center items-center">
                          <span className="truncate max-w-[80px] sm:max-w-[120px] text-sm">
                            {item.site}
                          </span>
                          <img
                            src="copy.svg"
                            alt=""
                            width={16}
                            className="cursor-pointer flex-shrink-0"
                            onClick={() => handleCopy(item.site)}
                          />
                        </div>
                      </td>
                      <td className="py-1 px-2 w-1/5">
                        <div className="flex gap-1 justify-center items-center">
                          <span className="truncate max-w-[60px] text-sm">
                            {item.username}
                          </span>
                          <img
                            src="copy.svg"
                            alt=""
                            width={16}
                            className="cursor-pointer flex-shrink-0"
                            onClick={() => handleCopy(item.username)}
                          />
                        </div>
                      </td>
                      <td className="py-1 px-2 w-1/5">
                        <div className="flex gap-1 justify-center items-center">
                          <span className="truncate max-w-[60px] text-sm">
                            {item.password}
                          </span>
                          <img
                            src="copy.svg"
                            alt=""
                            width={16}
                            className="cursor-pointer flex-shrink-0"
                            onClick={() => handleCopy(item.password)}
                          />
                        </div>
                      </td>
                      <td className="py-1 px-2 w-1/5">
                        <div className="flex gap-2 justify-center items-center">
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            state="hover-line"
                            style={{ width: 20, height: 20, cursor: "pointer" }}
                            onClick={() => handleEdit(item.id)}
                          ></lord-icon>
                          <lord-icon
                            src="https://cdn.lordicon.com/jzinekkv.json"
                            trigger="hover"
                            style={{ width: 20, height: 20, cursor: "pointer" }}
                            onClick={() => handleDelete(item.id)}
                          ></lord-icon>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
