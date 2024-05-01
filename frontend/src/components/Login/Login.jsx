import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${server}/user/login-user`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      toast.success("Login Success!");
      navigate("/");
      window.location.reload(true);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-blue-100">
      <div className="w-1/2 p-8 ml-20 mt-48 font-extrabold text-6xl" >
        {/* Display the best offer for your service */}
        <div className=" text-blue-900" >
          <h1>The best offer for</h1>
       
          <h1>your service</h1>
          <br/>
         
        </div>
        <p className=" text-lg text-gray-400">
           At Happy Home, we provide top-quality home services, including<br/> cleaning, maintenance, repairs, renovations, landscaping,<br/> and gardening. Our skilled professionals are dedicated to ensuring<br/> your home is clean, comfortable, and well-maintained. With our reliable <br/>services and friendly team,you can trust us to take care of your home<br/> needs. Sign up now to experience the joy of a Happy Home!

          </p>
      </div>
      <div className=" w-5/12 p-4 -ml-26 mt-44">
        {/* Login form */}
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="mb-6">Login to your account</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
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
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
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
            <div className={`${styles.noramlFlex} justify-between`}>
              <div className={`${styles.noramlFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-white-700"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
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
              <h4>Not have any account?</h4>
              <Link to="/sign-up" className="text-blue-600 pl-2">
                Sign Up
              </Link>
              <Link to="/" className=" ml-52 text-blue-600 pl-2">
                 Back
              </Link>
            </div>
          
              
           
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;




// import React, { useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import styles from "../../styles/styles";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { server } from "../../server";
// import { toast } from "react-toastify";
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBCard,
//   MDBCardBody,
//   MDBCardImage,
//   MDBRow,
//   MDBCol,
//   MDBIcon,
//   MDBInput
// }
// from 'mdb-react-ui-kit';

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [visible, setVisible] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         `${server}/user/login-user`,
//         {
//           email,
//           password,
//         },
//         { withCredentials: true }
//       );

//       toast.success("Login Success!");
//       navigate("/");
//       window.location.reload(true);
//     } catch (err) {
//       //toast.error(err);
//       toast.error(err.response.data.message);
//     }
//   };

//   return (
//     <MDBContainer className="my-5">

//     <MDBCard>
//       <MDBRow className='g-0'>

//         <MDBCol md='6'>
//           <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100'/>
//         </MDBCol>

//         <MDBCol md='6'>
//         <form  onSubmit={handleSubmit}>
//           <MDBCardBody className='d-flex flex-column'>

//             <div className='d-flex flex-row mt-2'>
//               <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
//               <span className="h1 fw-bold mb-0">Happy Home</span>
//             </div>

//             <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

//               <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" 
              
//                                  name="email"
//                                  autoComplete="email"
//                                  required
//                                  value={email}
//                                  onChange={(e) => setEmail(e.target.value)}/>
//               <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"
             
//                                 name="password"
//                                  autoComplete="current-password"
//                                  required
//                                  value={password}
//                                  onChange={(e) => setPassword(e.target.value)}/>

//             <MDBBtn className="mb-4 px-5" color='dark' size='lg' style={{borderRadius:'20px'}} type="submit">Login</MDBBtn>
//             <a className="small text-muted" href="forgot-password">Forgot password?</a>
//             <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="#!" style={{color: '#393f81'}}>
              
//             <Link to="/sign-up" className="text-blue-600 pl-2">
//             Register here
//               </Link>
//               </a></p>

//             <div className='d-flex flex-row justify-content-start'>
//               <a href="#!" className="small text-muted me-1">Terms of use.</a>
//               <a href="#!" className="small text-muted">Privacy policy</a>
//             </div>

//           </MDBCardBody>
//           </form>
//         </MDBCol>

//       </MDBRow>
//     </MDBCard>

//   </MDBContainer>
//   );
// };

// export default Login;



// // new login page designing
