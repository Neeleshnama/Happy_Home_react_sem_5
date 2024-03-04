


// new

import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Country, State, City } from "country-state-city";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
const ShopCreate = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [avatar, setAvatar] = useState();
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [phoneNumberValid, setPhoneNumberValid] = useState(false);
  const [zipCodeValid, setZipCodeValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [address,setAddress]=useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Add your validation logic here for phone number
    // For example, check if the phone number has 10 digits
    const phoneRegex = /^\d{10}$/;
   // phoneRegex.test(phoneNumber)
    //return phoneNumber.length === 10 && !isNaN(phoneNumber);
    return phoneRegex.test(phoneNumber);
  };

  const validateZipCode = (zipCode) => {
    // Add your validation logic here for zip code
    const zipRegex = /^\d{6}$/;

    return zipRegex.test(zipCode);
  };

  const validatePassword = (password) => {
    // Password should have at least 5 characters
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{5,16}$/;

    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailValid || !phoneNumberValid || !zipCodeValid || !passwordValid) {
      toast.error("Please enter valid details.");
      return;
    }

    axios
      .post(`${server}/shop/create-shop`, {
        name,
        email,
        password,
        avatar,
        zipCode,
        address,
        country,
        state,
        city,
        phoneNumber,
        verified: false,
      })
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar();
        setZipCode("");
        setAddress("");
        setCountry("");
        setState("");
        setCity("");
        setPhoneNumber("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleFileInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-blue-200 flex justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="text-center text-3xl font-extrabold text-blue-900">
            Register as a seller
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Shop Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone-number"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="phone-number"
                  required
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setPhoneNumberValid(validatePhoneNumber(e.target.value));
                  }}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    phoneNumberValid ? "text-green-500" : "text-red-500"
                  }`}
                />
                {phoneNumberValid ? (
                  <FaCheckCircle
                  className="absolute right-2 top-2 cursor-pointer text-green-500"
                     size={25}/>
                ) : (
                  <MdError
                  className="absolute right-2 top-2 cursor-pointer text-red-500"
                     size={25}/>
                )}
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
                  <FaCheckCircle
                  className="absolute right-2 top-2 cursor-pointer text-green-500"
                     size={25}/>
                ) : (
                  <MdError
                  className="absolute right-2 top-2 cursor-pointer text-red-500"
                     size={25}/>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div> 
            </div>

             
             
          <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your Country
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
            </div>
              

              <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                State
              </label>
              <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your State
              </option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your City
              </option> 
              {/* {City &&
                City.getCitiesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))} */}
              {City &&
                City.getCitiesOfState(country, state).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>))}
            </select>
            </div>

            


            <div>
              <label
                htmlFor="zipcode"
                className="block text-sm font-medium text-gray-700"
              >
                Zip Code
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="zipcode"
                  required
                  value={zipCode}
                  onChange={(e) => {
                    setZipCode(e.target.value);
                    setZipCodeValid(validateZipCode(e.target.value));
                  }}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    zipCodeValid ? "text-green-500" : "text-red-500"
                  }`}
                />
                {zipCodeValid ? (
                  <FaCheckCircle
                  className="absolute right-2 top-2 cursor-pointer text-green-500"
                     size={25}/>
                ) : (
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
                    passwordValid ? "text-green-500" : "text-red-500"
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
                  // <AiOutlineEyeInvisible
                  //   className="absolute right-2 top-2 cursor-pointer text-red-500"
                  //   size={25}
                  // />
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
                      src={avatar}
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
              <Link to="/shop-login" className="text-blue-600 pl-2">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md w-full">
        <img
          src="/register.png"
          alt="Registration Image"
          className="w-[60rem] my-40"
        />
      </div>
    </div>
  );
};

export default ShopCreate;

