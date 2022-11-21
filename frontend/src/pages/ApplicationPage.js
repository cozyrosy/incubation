import React, {useContext, useState, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import Axios from 'axios'
import Swal from 'sweetalert2'
import AuthContext from "../context/AuthContext"
import { useNavigate } from "react-router-dom"


const baseUrl = "http://127.0.0.1:8000/base/booking";

function ApplicationPage() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm()

  let { authTokens } = useContext(AuthContext);
  
  const navigate = useNavigate();


  useEffect(() => {
    if (authTokens !== null) {
      navigate("/application");
    } else {
      navigate("/home");
    }
  }, [authTokens]);


  
  const [booking, setBooking] = useState({
    full_name: "",
    address: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    company_name: "",
    image: "",
    solve: "",
    team_background: "",
    company_products: "",
    solution: "",
    incubation_needed: "",
    business_proposal: "",
    status: "",
  });

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setBooking({
      ...booking,
      image: e.target.files[0],
    });
  };


  const onSubmit = (data, e) => {
    e.preventDefault();

    const bookingformData = new FormData();
    bookingformData.append("full_name", booking.full_name);
    bookingformData.append("address", booking.address);
    bookingformData.append("email", booking.email);
    bookingformData.append("phone", booking.phone);
    bookingformData.append("city", booking.city);
    bookingformData.append("state", booking.state);
    bookingformData.append("company_name", booking.company_name);
    bookingformData.append("image", booking.image);
    bookingformData.append("solve", booking.solve);
    bookingformData.append("solution", booking.solution);
    bookingformData.append("team_background", booking.team_background);
    bookingformData.append("company_products", booking.company_products);
    bookingformData.append("incubation_needed", booking.incubation_needed);
    bookingformData.append("business_proposal", booking.business_proposal);

    try {
      Axios.post(baseUrl, bookingformData,{
        headers:{
          Authorization: `Bearer  ${authTokens.access}`,
          'Content-Type' :'multipart/form-data', 
        }
      }).then((response) => {
        setBooking({
          full_name: "",
          address: "",
          email: "",
          phone: "",
          city: "",
          state: "",
          company_name: "",
          image: "",
          solve: "",
          team_background: "",
          company_products: "",
          solution: "",
          incubation_needed: "",
          business_proposal: "",
          status: true,
        });
      });
    } catch (error) {
      console.log(error);
      setBooking({
        status: false,
      });
      Swal.fire("Error", "Something went wrong");
    }
  };


  return (

  

    <div className="container justify-center ml-32">
        {booking.status && (
      <p className="text-indigo-500 text-center">
        Registration completed succesfully
      </p>
    )}
        <h1 className="text-violet-900 text-4xl mt-4 justify-center text-center
         font-extrabold">Application form</h1>
   
    <div>
      <form onSubmit={handleSubmit(onSubmit)} >
                {/* NAME AND ADDRESS DIV */}
                <div className=" justify-around grid grid-cols-2">
                  <div className="mx-4 my-2 text-left  col-span-2 md:col-span-1 px-[45px] md:px-0 ">
                    <label
                      
                      className="block text-sm font-semibold text-gray-800 "
                    >
                      Fullname
                    </label>
                    <input
                      {...register("full_name", {
                        required: "Name is required",
                        pattern: {
                          value: /^[A-Za-z\s]{3,}$/,
                          message:
                            "Must be Characters & should not be less than 3",
                        },
                      })}
                      onChange={handleChange}
                      value={booking.full_name}
                      name='full_name'
                      className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.full_name && (
                      <small className="text-red-500">
                        {errors.full_name.message}
                      </small>
                    )}
                  </div> 

                  <div className="mx-4 text-left my-2 col-span-2 md:col-span-1 px-[45px] md:px-0">
                    <label
                     
                      className="block text-sm font-semibold text-gray-800 "
                    >
                      Address
                    </label>
                    <input
                      {...register("address", { required: "Address required" })}
                      name='address'
                      value={booking.address}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.address && (
                      <small className="text-red-500">
                        {errors.address.message}
                      </small>
                    )}
                  </div>
                </div>

                {/* EMAIL AND PHONE NUMBER DIV */}
                <div className=" justify-around grid grid-cols-2">
                  <div className="mx-4 text-left my-2 col-span-2 md:col-span-1 px-[45px] md:px-0">
                    <label
                      
                      className="block text-sm font-semibold text-gray-800 "
                    >
                      Email
                    </label>
                    <input
                      {...register("email", {
                        required: "Email required",
                        pattern: {
                          value: /^[a-zA-Z0-9-_]+@[a-zA-Z0-9]+\.[a-z]{2,3}$/,
                          message: "Invalid email",
                        },
                      })}
                      name='email'
                      value={booking.email}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.email && (
                      <small className="text-red-500">
                        {errors.email.message}
                      </small>
                    )}
                  </div>

                  <div className="mx-4 text-left my-2 col-span-2 md:col-span-1 px-[45px] md:px-0">
                    <label
                      
                      className="block text-sm font-semibold text-gray-800 "
                    >
                      Phone
                    </label>
                    <input
                      {...register("phone", {
                        required: "Number required",
                        pattern: {
                          value: /^\d{10}$/,
                          message: "Invalid number",
                        },
                      })}
                      type="number"
                      value={booking.phone}
                      name='phone'
                      onChange={handleChange}
                      className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.phone && (
                      <small className="text-red-500">
                        {errors.phone.message}
                      </small>
                    )}
                  </div>
                </div>

                {/* CITY AND STATE DIV */}
                <div className=" justify-around grid grid-cols-2">
                  <div className="mx-4 text-left my-2 col-span-2 md:col-span-1 px-[45px] md:px-0 ">
                    <label
                      
                      className="block text-sm font-semibold text-gray-800 "
                    >
                      City
                    </label>
                    <input
                      {...register("city", { required: "Field required" })}
                      type="text"
                      value={booking.city}
                      onChange={handleChange}
                      name='city'
                      className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.city && (
                      <small className="text-red-500">
                        {errors.city.message}
                      </small>
                    )}
                  </div>

                  <div className="mx-4 text-left my-2  col-span-2 md:col-span-1 px-[45px] md:px-0 ">
                    <label
                      className="block text-sm font-semibold text-gray-800 "
                    >
                      State
                    </label>
                    <input
                      {...register("state", { required: "Field required" })}
                      type="text"
                      value={booking.state}
                      name="state"
                      onChange={handleChange}
                      className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.state && (
                      <small className="text-red-500">
                        {errors.state.message}
                      </small>
                    )}
                   
                  </div>
                </div>

                {/* COMPANY NAME AND FILE UPLOAD */}
                <div className=" justify-around grid grid-cols-2">
                  <div className="mx-4 text-left my-2 col-span-2 md:col-span-1 px-[45px] md:px-0 ">
                    <label
                      className="block text-sm font-semibold text-gray-800 "
                    >
                      Company Name
                    </label>
                    <input
                       {...register("company_name", {
                        required: "Field required",
                      })}
                      type="text"
                      value={booking.company_name}
                      name="company_name"
                      onChange={handleChange}
                      className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.company_name && (
                      <small className="text-red-500">
                        {errors.company_name.message}
                      </small>
                    )}
                  </div>

                  <div className="mx-4 text-left my-2 col-span-2 md:col-span-1 px-[45px] md:px-0 ">
                    <label
                      className="block text-sm font-semibold text-gray-800 "
                    >
                      Choose File
                    </label>
                    <input
                       {...register("image", { required: "Image required" })}
                       type= 'file'
                       name="image"
                       onChange={handleImageChange}
                      className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.image && (
                      <small className="text-red-500">
                        {errors.image.message}
                      </small>
                    )}
                  </div>
                </div>

                {/* DIV FOR FOR TEXT AREAS */}
                <div>
                  <div className=" justify-around grid grid-cols-1">
                    <div className="mx-4 text-left my-2  md:col-span-1 px-[45px] md:px-0 ">
                      <label
                        
                        className="block text-sm font-semibold text-gray-800 "
                      >
                        Describe Your Team and Background
                      </label>
                      <textarea
                        {...register("team_background", {
                          required: "Field required",
                        })}
                        name="team_background"
                        value={booking.team_background}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      ></textarea>
                      {errors.team_background && (
                        <small className="text-red-500">
                          {errors.team_background.message}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className=" justify-around grid grid-cols-1">
                    <div className="mx-4 text-left my-2 md:col-span-1 px-[45px] md:px-0 ">
                      <label
                        for="email"
                        className="block text-sm font-semibold text-gray-800 "
                      >
                        Describe your Company and Products
                      </label>
                      <textarea
                        {...register("company_products", {
                          required: "Field required",
                        })}
                        name="company_products"
                        value={booking.company_products}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      ></textarea>
                      {errors.company_products && (
                        <small className="text-red-500">
                          {errors.company_products.message}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className=" justify-around grid grid-cols-1">
                    <div className="mx-4 text-left my-2  md:col-span-1 px-[45px] md:px-0 ">
                      <label
                        
                        className="block text-sm font-semibold text-gray-800 "
                      >
                        Describe the problems your tare trying to solve
                      </label>
                      <textarea
                        {...register("solve", { required: "Field required" })}
                        name="solve"
                        value={booking.solve}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      ></textarea>
                      {errors.solve && (
                        <small className="text-red-500">
                          {errors.solve.message}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className=" justify-around grid grid-cols-1">
                    <div className="mx-4 text-left my-2 md:col-span-1 px-[45px] md:px-0 ">
                      <label
                       
                        className="block text-sm font-semibold text-gray-800 "
                      >
                        What is unique about your solution?
                      </label>
                      <textarea
                        {...register("solution", {
                          required: "Field required",
                        })}
                        name="solution"
                        value={booking.solution}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      ></textarea>
                      {errors.solution && (
                        <small className="text-red-500">
                          {errors.solution.message}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className=" justify-around grid grid-cols-1">
                    <div className="mx-4 text-left my-2 md:col-span-1 px-[45px] md:px-0 ">
                      <label
                        className="block text-sm font-semibold text-gray-800 "
                      >
                        Type of Incubation needed
                      </label>
                      <input
                        {...register("incubation_needed", {
                          required: "Choose one option",
                        })}
                        type="radio"
                        value={"Physical Incubation"}
                        name="incubation_needed"
                        onChange={handleChange}
                        className="mx-2"
                      />
                      Physical Incubation
                      <br />
                      <input
                        {...register("incubation_needed", {
                          required: "Choose one option",
                        })}
                        type="radio"
                        value={"Virtual Incubation"}
                        name="incubation_needed"
                        onChange={handleChange}
                        className="mx-2"
                      />
                      Virtual Incubation
                      <p>
                        {" "}
                        {errors.incubation_needed && (
                          <small className="text-red-500">
                            {errors.incubation_needed.message}
                          </small>
                        )}{" "}
                      </p>
                    </div>
                  </div>

                  <div className=" justify-around grid grid-cols-1">
                    <div className="mx-4 text-left my-2  md:col-span-1 px-[45px] md:px-0 ">
                      <label
                        
                        className="block text-sm font-semibold text-gray-800 "
                      >
                        Upload a detailed business proposal
                      </label>
                      <textarea
                        {...register("business_proposal", {
                          required: "Field required",
                        })}
                        name="business_proposal"
                        value={booking.business_proposal}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      ></textarea>
                      {errors.business_proposal && (
                        <small className="text-red-500">
                          {errors.business_proposal.message}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="">
                    <div className="  ">
                      <button className="m-3  px-8 py-3 text-white transition-colors duration-200 transform bg-violet-900 rounded-md hover:bg-violet-800 focus:outline-none focus:bg-indigo-600">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
    </div>
    </div>
  );
}

export default ApplicationPage;
