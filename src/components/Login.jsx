import React, { useState } from 'react'
import toast from 'react-hot-toast'
import MetaData from "./layouts/Metadata"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { instance } = useMsal();

  // local states
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({ email: false, password: false });
  const [credintial, setCredintial] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  // const onChangeHandler = (value, name) => {
  //   if (value) {
  //     setCredintial({ ...credintial, [name]: value });
  //     setErrors({ ...errors, [name]: false });
  //   } else {
  //     setCredintial({ ...credintial, [name]: value });
  //     setErrors({ ...errors, [name]: true });
  //   }
  // };

  // const handleMicrosoftLogin = async () => {
  //   try {
  //     const ssoResponse = await instance.loginPopup({
  //       scopes: ["user.read"],
  //     });
  //     if (ssoResponse && ssoResponse?.account) {
  //       let email = ssoResponse.account?.username ?? "";
  //       let accessToken = ssoResponse.accessToken;

  //       loginHandler(email, accessToken);
  //     }
  //   } catch (error) {
  //     console.log("microsoft login error", error);
  //     if (error && error.errorCode === "user_cancelled") {
  //       // Handle user cancellation error here
  //       toast.error("User cancelled the action.");
  //     } else {
  //       toast.error(error.message);
  //     }
  //   }
  // };

  //verify loggedIn user
  // const loginHandler = async (email, accessToken) => {
  //   try {
  //     setLoader(true);
  //     let payload = {
  //       email: email,
  //       token: accessToken
  //     };

  //     let response = await loginApi(payload);

  //     if (response?.code == 200) {
  //       let data = response?.data ?? null;
  //       if (data) {
  //         sessionStorage.setItem("accessToken", data.auth_token);
  //         sessionStorage.setItem('emailId', email);
  //         sessionStorage.setItem("refreshToken", data.refresh_token);
  //         sessionStorage.setItem("isAuthorised", true)
  //         dispatch(setUserData(data?.user_details));
  //         router.push("/bankfinance/bankpaymentvoucher/addpaymentvoucher");
  //         toast.success(response.message);
  //       }
  //     } else if (response?.code == 422) {
  //       Object.entries(response.error).forEach(([key, value]) => {
  //         toast.error(value);
  //       });
  //       setLoader(false);
  //     }
  //     else if (response?.code == 500) {
  //       toast.error(response.error ? response.error : "Something went wrong");
  //       setLoader(false);
  //     }
  //     else {
  //       toast.error(response?.error);
  //       setLoader(false);
  //     }
  //   } catch (error) {
  //     console.log("login error", error.message);
  //     toast.error(error.message);
  //     setLoader(false);
  //   } finally {
  //     setLoader(false);
  //   }
  // };


  const handleManualLogin = () => {
    return navigate("/shippingcontainer");
  };
  //sample login handler
  const submitHandler = () => {
    let settings = {
      duration: 3000,
      position: 'top-center',
    }
    if (!email || !password) {
      toast.error('Enter email or password!', settings);
      return;
    }

    if (email == 'alsharif' && password == 'Alsharif@123') {
      sessionStorage.setItem('isAuth', true);
      toast.success('Redirecting to Shipping Container!', {
        duration: 3000,
        position: 'top-center',
      })
      navigate('/shippingcontainer')
      return;
    }
    toast.error('Enter Correct Credentials!', settings);
  }
  return (
    <>
      <MetaData title={'- Login Page'} />
      <div className={`login_bg`}>
        <div className="bannervideo relative">
          <div className="flex justify-end mr-[80px] md:mr-[70px] xl:mr-[80px] 3xl:mr-[4.167vw] relative py-[113px] lg:py-[30px] xl:py-[30px] 3xl:py-[2.083vw]">
            {/* <video
            loop
            muted
            className="h-[700px] xl:h-[700px] lg:h-[500px] 2xl:h-[700px] 3xl:h-[40.458vw]">
            <source src="/images/intro-video.mp4" type="video/mp4" />
            </video> */}
            <video preload="auto" loop muted playsInline
              autoPlay
              className="h-[700px] xl:h-[635px] lg:h-[500px] 2xl:h-[635px] 3xl:h-[39.458vw]">
              <source src="/images/intro-video.mp4" type="video/mp4" />

            </video>
            <div
              className={`z-50 absolute bottom-[50px] xl:bottom-[100px] 3xl:bottom-[5.208vw] right-[40px] xl:right-[40px] 3xl:right-[1.042vw] aleofont`}
            >
              <h3
                className={`text-[32px] xl:text-[32px] 3xl:text-[1.667vw] text-white font-semibold`}
              >
                Welcome to Stellar
              </h3>
              <h5
                className={`text-[48px] xl:text-[48px] 3xl:text-[2.5vw] text-[#E79522] font-bold flex justify-end leading-none`}
              >
                ERP 2.0
              </h5>
            </div>

            <div className="login-form absolute left-[50px] top-[160px] xl:left-[160px] xl:top-[100px] 2xl:left-[160px] 2xl:top-[80px] 3xl:left-[8.333vw] 3xl:top-[8vw]  z-[2] interfont" data-aos="fade-right" data-aos-duration="4000">
              <div className="bg-white w-[500px] xl:w-[460px] 2xl:w-[470px]  3xl:w-[28.646vw] rounded-[16px] xl:rounded-[16px] 3xl:rounded-[0.833vw]    p-[20px]  xl:p-[20px] lg:p-[24px] 2xl:p-[20px] 3xl:p-[1.25vw]">
                <div className="mb-[22px]  xl:mb-[16px] 3xl:mb-[1.25vw] ">
                  <img
                    src="/images/Logo.svg"
                    alt="logo"
                    width={300}
                    height={70}
                    className="w-[300px] h-[70px] xl:w-[380px] xl:h-[65px] 3xl:w-[19.792vw] 3xl:h-[3.906vw]"
                  />
                </div>
                <div className="mb-[22px]  xl:mb-[16px] 3xl:mb-[1.25vw] ">
                  <p className="text-[#2C363F] lg:text-[20px] text-[20px] xl:text-[20px] 3xl:text-[1.25vw] font-[700]">
                    Welcome
                  </p>
                  <p className="text-[#2C363F] lg:text-[18px] text-[18px] xl:text-[16px] 3xl:text-[0.938vw] font-normal">
                    Please log in to access the{" "}
                    <span className="font-[600]">Al Sharif</span> Portal
                  </p>
                </div>
                <div className="mb-[16px] xl:mb-[16px] 3xl:mb-[0.833vw]  space-y-[20px] xl:space-y-[14px] 3xl:space-y-[1.042vw]">
                  <div className="">
                    <div className="text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-normal text-[#344054] mb-[6px]">
                      Email <span className="text-[#FF0000]">*</span>
                    </div>
                    <InputText
                      placeholder="Enter Email"
                      tabIndex={1}
                      // value={credintial["email"]}
                      // onChange={(e) =>
                      //   onChangeHandler(e.target.value, "email")
                      // }
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full loginInput"
                    />
                    {errors.email ? (
                      <div className="text-[14px] mt-[3px] text-[#FF0000]">
                        Email is required
                      </div>
                    ) : null}
                  </div>
                  <div className="">
                    <div className="text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-normal text-[#344054] mb-[6px]">
                      Password <span className="text-[#FF0000]">*</span>
                    </div>
                    <div className="custompassword custicon  custiconlogin darkpass password ">
                      <Password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        // type="password"
                        // value={credintial["password"]}
                        // onChange={(e) => onChangeHandler(e.target.value, "password")}
                        placeholder="Enter Password"
                        toggleMask
                        feedback={false}
                        className="w-full"
                        tabIndex={1}
                      />
                      {errors.password ? (
                        <div className="text-[14px] mt-[3px] text-[#FF0000]">
                          Password is required
                        </div>
                      ) : null}
                    </div>
                    <div className="flex w-full items-center justify-between mt-[10px] lg:mt-[10px] xl:mt-[10px] 3xl:mt-[0.521vw]">
                      <div className="flex items-center gap-[6px] 3xl:gap-[0.417vw]">
                        <div className="custCheckBox">
                          <Checkbox
                            onChange={e => setChecked(e.checked)}
                            checked={checked}
                          ></Checkbox>
                        </div>
                        <label className="text-[#254226] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] cursor-pointer font-[500]">
                          Remember Me
                        </label>
                      </div>
                      <a
                        href=""
                        className="text-[#254226] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] cursor-pointer font-[500]"
                      >
                        Forgot Password?
                      </a>
                    </div>
                  </div>
                  {/* <button
                  // onClick={handleManualLogin}
                  className="text-[16px] xl:text-[16px] 3xl:text-[0.885vw] text-[#fff] font-normal flex justify-center bg-[#621E21] py-[8px] xl:py-[7px] 3xl:py-[0.521vw] rounded-[8px] xl:rounded-[8px] lg:rounded-[8px]  3xl:rounded-[0.417vw] w-full"
                  disabled={loader == true ? true : false}
                  alt={""}
                >
                  {loader ? "Please wait..." : "Login"}
                </button> */}
                  <div
                    onClick={submitHandler}
                    className="text-[16px] xl:text-[16px] cursor-pointer 3xl:text-[0.885vw] text-[#fff] font-normal flex justify-center bg-[#621E21] py-[8px] xl:py-[7px] 3xl:py-[0.521vw] rounded-[8px] xl:rounded-[8px] lg:rounded-[8px]  3xl:rounded-[0.417vw] w-full"
                  // disabled={loader == true ? true : false}
                  // onClick={()=> toast.success('Redirecting to Shipping Container!',{
                  //   autoClose: 3000,
                  //   closeButton: false,
                  //   closeOnClick: false,
                  //   pauseOnHover: false,
                  //   draggable: false,
                  //   isLoading: false,
                  // })}
                  // href={'/shipping/container'}
                  // alt={""}
                  >
                    {loader ? "Please wait..." : "Login"}
                  </div>
                </div>
                <div className="w-full lg:w-[450px] xl:w-[415px] 3xl:w-[29.25vw] flex justify-center items-center gap-2  xl:mb-[16px] 3xl:mb-[0.833vw] ">
                  <div className="h-[1px] w-[20%] bg-[#BECDE3]"></div>
                  <div className="text-[13px] xl:text-[13px] 3xl:text-[0.677vw] text-[#9CA1AB]">
                    Or Sign in with
                  </div>
                  <div className="h-[1px] w-[20%] bg-[#BECDE3]"></div>
                </div>
                <div className="grid grid-cols-2 gap-[8px] xl:gap-[8px] 3xl:gap-[0.417vw]">
                  <div className="flex w-full">
                    <span className="cursor-pointer flex items-center justify-center gap-2 text-[#4B586E] bg-[#FFFFFF] border-[1px] border-[#BECDE3]
                        text-[16px] xl:text-[15px] 3xl:text-[0.833vw] rounded-lg w-full text-center py-[12px] xl:py-[9px] 3xl:py-[0.625vw] font-light">
                      {/* <img
                      src='/images/google_icon.svg'
                      width="24"
                      height="24"
                      className=""
                      alt=""
                    /> */}
                      <img
                        src='/images/google_icon.svg'
                        alt="logo"
                        width={24}
                        height={24}
                        className="w-[24px] h-[24px] xl:w-[20px] xl:h-[20px] 3xl:w-[1.25vw] 3xl:h-[1.25vw]"
                      />
                      Sign in with Google</span>
                  </div>
                  <div className="flex w-full">
                    <span className="cursor-pointer flex items-center justify-center gap-2 text-[#4B586E] bg-[#FFFFFF] border-[1px] border-[#BECDE3]
                        text-[16px] xl:text-[15px] 3xl:text-[0.833vw] rounded-lg w-full text-center py-[12px] xl:py-[9px] 3xl:py-[0.625vw] font-light">
                      <img
                        src='/images/microsoft_icon.svg'
                        alt="logo"
                        width={24}
                        height={24}
                        className="w-[24px] h-[24px] xl:w-[20px] xl:h-[20px] 3xl:w-[1.25vw] 3xl:h-[1.25vw]"
                      />
                      Sign in with <span className="font-semibold">Microsoft</span> </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login