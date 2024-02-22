// import React, { useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import styles from "../../styles/styles";
// import { Link } from "react-router-dom";
// import { RxAvatar } from "react-icons/rx";
// import axios from "axios";
// import { server } from "../../server";
// import { toast } from "react-toastify";


// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [visible, setVisible] = useState(false);
//   const [avatar, setAvatar] = useState(null);

//   const handleFileInputChange = (e) => {
//     const reader = new FileReader();

//     reader.onload = () => {
//       if (reader.readyState === 2) {
//         setAvatar(reader.result);
//       }
//     };

//     reader.readAsDataURL(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     axios
//       .post(`${server}/user/create-user`, { name, email, password, avatar })
//       .then((res) => {
//         toast.success(res.data.message);
//         setName("");
//         setEmail("");
//         setPassword("");
//         setAvatar(null);
//       })
//       .catch((error) => {
//         toast.error(error.response.data.message);
//       });
//   };

//   return (
//     <div className="min-h-screen bg-blue-200 flex  justify-center py-12 sm:px-6 lg:px-8">
//       <div className="mt-44 sm:w-full sm:max-w-md">
//         {/* Add an image to the left of the registration form */}
//         <img
//           src="/signup.png"
//           alt="Registration Image"
//           className="ml-44 h-full w-full -mt-36"
//         />
//       </div>
//       <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-md">
//         {/* Registration form */}
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <h2 className="mt-4 mb-6 text-center text-3xl font-extrabold text-gray-900">
//             Register as a new user
//           </h2>
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Full Name
//               </label>
//               <div className="mt-1">
//                 <input
//                   type="text"
//                   name="text"
//                   autoComplete="name"
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email address
//               </label>
//               <div className="mt-1">
//                 <input
//                   type="email"
//                   name="email"
//                   autoComplete="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Password
//               </label>
//               <div className="mt-1 relative">
//                 <input
//                   type={visible ? "text" : "password"}
//                   name="password"
//                   autoComplete="current-password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//                 {visible ? (
//                   <AiOutlineEye
//                     className="absolute right-2 top-2 cursor-pointer"
//                     size={25}
//                     onClick={() => setVisible(false)}
//                   />
//                 ) : (
//                   <AiOutlineEyeInvisible
//                     className="absolute right-2 top-2 cursor-pointer"
//                     size={25}
//                     onClick={() => setVisible(true)}
//                   />
//                 )}
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="avatar"
//                 className="block text-sm font-medium text-gray-700"
//               ></label>
//               <div className="mt-2 flex items-center">
//                 <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
//                   {avatar ? (
//                     <img
//                       src={avatar}
//                       alt="avatar"
//                       className="h-full w-full object-cover rounded-full"
//                     />
//                   ) : (
//                     <RxAvatar className="h-8 w-8" />
//                   )}
//                 </span>
//                 <label
//                   htmlFor="file-input"
//                   className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
//                 >
//                   <span>Upload a file</span>
//                   <input
//                     type="file"
//                     name="avatar"
//                     id="file-input"
//                     accept=".jpg,.jpeg,.png"
//                     onChange={handleFileInputChange}
//                     className="sr-only"
//                   />
//                 </label>
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
//               >
//                 Submit
//               </button>
//             </div>
//             <div className={`${styles.noramlFlex} w-full`}>
//               <h4>Already have an account?</h4>
//               <Link to="/login" className="text-blue-600 pl-2">
//                 Sign In
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;




import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const validateEmail = (email) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    // Password should have at least 8 characters
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{5,16}$/;

    return passwordRegex.test(password);
    
  };

 

  const handleFileInputChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailValid || !passwordValid) {
      toast.error("Please enter valid email and password.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);
  console.log("image",formData.get('avatar'));
  axios
  .post(`${server}/user/create-user`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  .then((res) => {
    toast.success(res.data.message);
    setName("");
    setEmail("");
    setPassword("");
    setAvatar(null);
  })
  .catch((error) => {
    toast.error(error.response.data.message);
  });
  };

  console.log(avatar);

  return (
    <div className="min-h-screen bg-blue-200 flex justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-44 sm:w-full sm:max-w-md">
        {/* Add an image to the left of the registration form */}
        <img
          src="/signup.png"
          alt="Registration Image"
          className="ml-44 h-full w-full -mt-36"
        />
      </div>
      <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-md">
        {/* Registration form */}
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="mt-4 mb-6 text-center text-3xl font-extrabold text-gray-900">
            Register as a new user
          </h2>
          <form action='/create-user' method='post'className="space-y-6"enctype="multipart/form-data" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailValid(validateEmail(e.target.value));
                  }}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    emailValid ? "text-green-500" : "text-red-500"
                  }`}
                />
                {emailValid ? (
                  // <AiOutlineEye
                  //   className="absolute right-2 top-2 cursor-pointer text-green-500"
                  //   size={25}
                  // />
                  <FaCheckCircle
                  className="absolute right-2 top-2 cursor-pointer text-green-500"
                     size={25}/>
                ) : (
                  // <AiOutlineEyeInvisible
                  //   className="absolute right-2 top-2 cursor-pointer text-red-500"
                  //   size={25}
                  // />
                  <MdError
                  className="absolute right-2 top-2 cursor-pointer text-red-500"
                     size={25}/>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordValid(validatePassword(e.target.value));
                  }}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    passwordValid ? "text-green-500" :" text-red-500"
                  }`}
                />


{passwordValid ? (
                  // <AiOutlineEye
                  //   className="absolute right-2 top-2 cursor-pointer text-green-500"
                  //   size={25}
                  // />
                  <FaCheckCircle
                  className="absolute right-9 top-2 cursor-pointer text-green-500"
                     size={25}/>
                ) : (
                 
                  <MdError
                  className="absolute right-9 top-2 cursor-pointer text-red-500"
                     size={25}/>
                )}
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Already have an account?</h4>
              <Link to="/login" className="text-blue-600 pl-2">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
