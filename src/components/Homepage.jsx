import React, { useState, useEffect } from "react";
import Layout from "./layouts/Layout";
import "./../App.css";
import LoaderContainer from "../components/LoaderContainer/index";
import "./../css/loading.css";

const Homepage = () => {
  const [loading, setLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [payrollShowVideo, setPayrollShowVideo] = useState(false);
  const [vendorShowVideo, setVendorShowVideo] = useState(false);
  const [departmentShowVideo, setDepartmentShowVideo] = useState(false);
  const [categoriesShowVideo, setCategoriesShowVideo] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Layout pageTitle="Pinellas Home">
        <div className="pine_banner w-full h-[90vh]">
          <div className="container pt-[30vh]">
            <div className="bann_cont w-[43%] bg-[#4a403899] p-[25px] rounded-[10px] ">
              <div className="text-[#fff] text-[13px] mb-[10px] ">
                FROM THE PINELLAS COUNTY CLERK OF THE CIRCUIT COURT AND
                COMPTROLLER
              </div>
              <div className="text-[#fff] text-[20px] font-bold mb-4 ">
                Ken Burke, CPA
              </div>
              <div className="text-[#fff] text-[16px] leading-[20px] font-[300] ">
                Hello, I am Ken Burke, and I serve you as the Clerk of the
                Circuit Court and Comptroller of Pinellas County. One of my many
                duties is to ensure that your tax dollar is as transparent to
                you, as possible. We can achieve this through the Spending in
                the Sunshine website.
              </div>
              <div>
                <button
                  onClick={() => setShowVideo(true)}
                  className="bg-[#7c2f3e] text-white px-4 py-2 rounded-[30px] mt-4 text-[15px] flex w-auto items-center"
                >
                  <img
                    src="/images/play.png"
                    alt="Play"
                    className="w-6 h-6 mr-1"
                  />
                  WATCH FINANCIAL TRANSPARENCY INTRODUCTION
                </button>

                {showVideo && (
                  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-black/50 p-2 w-[70%] relative">
                      <button
                        onClick={() => setShowVideo(false)}
                        className="absolute top-[-50px] right-[-50px] text-[#fff] text-[30px] cursor-pointer"
                      >
                        &times;
                      </button>
                      <div className="aspect-w-18 aspect-h-9">
                        <iframe
                          width="1055"
                          height="600"
                          src="https://www.youtube.com/embed/Dfcu5hy8IYw?si=gN7te6rScPzy-w2S"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <LoaderContainer loading={loading}></LoaderContainer>

        <div className="w-full">
          <div className="container">
            <div className="mb-4 bg-[#fff] rounded-[10px] px-[15px] py-[10px] flex items-center">
              <div className="min-w-[80px]">
                <img src="/images/IC.png" />
              </div>
              <div className="">
                <div className="text-[20px] font-bold mb-2 text-[#7c2f3e] ">
                  Spending Transparency
                </div>
                <p className="text-[14px] leading-tight text-[#000000d9]">
                  This site provides information on spending transparency
                  details for Payroll Expenses, Vendors, Departments, and
                  Categories through the current and five previous years for the
                  Board of County Commissioners and Clerk of the Circuit Court
                  and Comptroller.{" "}
                </p>
              </div>
            </div>
            <div className="mb-4">
              <div className="grid grid-cols-12 gap-[30px]">
                <div className="col-span-12 md:col-span-6 lg:col-span-3">
                  <div className="bg-[#fff] rounded-[5px] p-[15px] shadow">
                    <div className="flex justify-center mb-3">
                      <span>
                        <img src="/images/Payroll_new.png" />
                      </span>
                    </div>

                    <div className="text-center mb-[10px]">
                      <a
                        href=""
                        className="text-[18px] text-[#7c2f3e] font-bold"
                      >
                        PAYROLL EXPENSES
                      </a>
                    </div>
                    <div className="text-[14px] mb-4 text-[#000000d9] min-h-[180px] leading-tight">
                      This section provides details on employee salaries and
                      gross earnings (before deductions and taxes) by Job Title
                      through Calendar Year to date with five previous calendar
                      years for the Board of County Commissioners and the Clerk
                      of the Circuit Court and Comptroller.
                    </div>
                    <div className="flex justify-center mb-[40px]">
                      <button
                        onClick={() => setPayrollShowVideo(true)}
                        className="bg-[#7c2f3e] rounded-[30px] flex text-[#fff] text-[13px] px-4 py-1 items-center"
                      >
                        <img
                          src="/images/play.png"
                          alt="Play"
                          className="w-6 h-6 mr-1"
                        />
                        INTRODUCTION
                      </button>

                      {payrollShowVideo && (
                        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                          <div className="bg-black/50 p-2 w-[70%] relative">
                            <button
                              onClick={() => setPayrollShowVideo(false)}
                              className="absolute top-[-50px] right-[-50px] text-[#fff] text-[30px] cursor-pointer"
                            >
                              &times;
                            </button>
                            <div className="aspect-w-18 aspect-h-9">
                              <iframe
                                width="1055"
                                height="600"
                                src="https://www.youtube.com/embed/hEE-9Hyp9c4?si=J_0QYCvTO5HIQ26i"
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                              ></iframe>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* <div className="flex justify-center mb-[40px]">
                      <button className="bg-[#7c2f3e] rounded-[30px] flex text-[#fff] text-[13px] px-4 py-1 items-center">
                        <span>
                          <img src="/images/play.png" />
                        </span>
                        INTRODUCTION
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-3">
                  <div className="bg-[#fff] rounded-[5px] p-[15px] shadow">
                    <div className="flex justify-center mb-3">
                      <span>
                        <img src="/images/vendor_new.png" />
                      </span>
                    </div>
                    <div className="text-center mb-[10px]">
                      <a
                        href=""
                        className="text-[18px] text-[#7c2f3e] font-bold"
                      >
                        VENDORS
                      </a>
                    </div>
                    <div className="text-[14px] mb-4 text-[#000000d9] min-h-[180px] leading-tight">
                      This section provides spending details by vendor for the
                      current year to date and the previous five fiscal years
                      (October 1st through September 30th) for the Board of
                      County Commissioners and the Clerk of the Circuit Court
                      and Comptroller. Expand this section to view additional
                      vendor details.
                    </div>
                    <div className="flex justify-center mb-[40px]">
                      <button
                        onClick={() => setVendorShowVideo(true)}
                        className="bg-[#7c2f3e] rounded-[30px] flex text-[#fff] text-[13px] px-4 py-1 items-center"
                      >
                        <img
                          src="/images/play.png"
                          alt="Play"
                          className="w-6 h-6 mr-1"
                        />
                        INTRODUCTION
                      </button>

                      {vendorShowVideo && (
                        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                          <div className="bg-black/50 p-2 w-[70%] relative">
                            <button
                              onClick={() => setVendorShowVideo(false)}
                              className="absolute top-[-50px] right-[-50px] text-[#fff] text-[30px] cursor-pointer"
                            >
                              &times;
                            </button>
                            <div className="aspect-w-18 aspect-h-9">
                              <iframe
                                width="1055"
                                height="600"
                                src="https://www.youtube.com/embed/DVWaSwAu11I?si=wmPJouul6kbZo9KD"
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                              ></iframe>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-3">
                  <div className="bg-[#fff] rounded-[5px] p-[15px] shadow">
                    <div className="flex justify-center mb-3">
                      <span>
                        <img src="/images/department_new.png" />
                      </span>
                    </div>
                    <div className="text-center mb-[10px]">
                      <a
                        href=""
                        className="text-[18px] text-[#7c2f3e] font-bold"
                      >
                        DEPARTMENTS
                      </a>
                    </div>
                    <div className="text-[14px] mb-4 text-[#000000d9] min-h-[180px] leading-tight">
                      This section provides details on department spending,
                      obligations, and budget for the current year to date and
                      the previous five fiscal years (October 1st through
                      September 30th) for the Board of County Commissioners and
                      the Clerk of the Circuit Court and Comptroller with the
                      ability to view additional purchase order details by main
                      department.
                    </div>
                    <div className="flex justify-center mb-[40px]">
                      <button
                        onClick={() => setDepartmentShowVideo(true)}
                        className="bg-[#7c2f3e] rounded-[30px] flex text-[#fff] text-[13px] px-4 py-1 items-center"
                      >
                        <img
                          src="/images/play.png"
                          alt="Play"
                          className="w-6 h-6 mr-1"
                        />
                        INTRODUCTION
                      </button>

                      {departmentShowVideo && (
                        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                          <div className="bg-black/50 p-2 w-[70%] relative">
                            <button
                              onClick={() => setDepartmentShowVideo(false)}
                              className="absolute top-[-50px] right-[-50px] text-[#fff] text-[30px] cursor-pointer"
                            >
                              &times;
                            </button>
                            <div className="aspect-w-18 aspect-h-9">
                              <iframe
                                width="1055"
                                height="600"
                                src="https://www.youtube.com/embed/hg_wDC_WxkI?si=TmvPQMatsuBOigSG"
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                              ></iframe>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-3">
                  <div className="bg-[#fff] rounded-[5px] p-[15px] shadow">
                    <div className="flex justify-center mb-3">
                      <span>
                        <img src="/images/category_new.png" />
                      </span>
                    </div>
                    <div className="text-center mb-[10px]">
                      <a
                        href=""
                        className="text-[18px] text-[#7c2f3e] font-bold"
                      >
                        CATEGORIES
                      </a>
                    </div>
                    <div className="text-[14px] mb-4 text-[#000000d9] min-h-[180px] leading-tight">
                      This section provides spending details by category for the
                      current year to date and the previous five fiscal years
                      (October 1st through September 30th) for the Board of
                      County Commissioners and the Clerk of the Circuit Court
                      and Comptroller with additional views of spending.
                    </div>
                    <div className="flex justify-center mb-[40px]">
                      <button
                        onClick={() => setCategoriesShowVideo(true)}
                        className="bg-[#7c2f3e] rounded-[30px] flex text-[#fff] text-[13px] px-4 py-1 items-center"
                      >
                        <img
                          src="/images/play.png"
                          alt="Play"
                          className="w-6 h-6 mr-1"
                        />
                        INTRODUCTION
                      </button>

                      {categoriesShowVideo && (
                        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                          <div className="bg-black/50 p-2 w-[70%] relative">
                            <button
                              onClick={() => setCategoriesShowVideo(false)}
                              className="absolute top-[-50px] right-[-50px] text-[#fff] text-[30px] cursor-pointer"
                            >
                              &times;
                            </button>
                            <div className="aspect-w-18 aspect-h-9">
                              <iframe
                                width="1055"
                                height="600"
                                src="https://www.youtube.com/embed/Hjpu9XkYjVk?si=Io_h117NmCIQbfIm"
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                              ></iframe>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 md:col-span-12 lg:col-span-12">
                  <div className="bg-[#f5f5f5] rounded-[10px] p-[25px] shadow">
                    <div className="mb-[10px]">
                      <a
                        href=""
                        className="text-[20px] text-[#000000d9] font-bold"
                      >
                        CONTACT US
                      </a>
                    </div>
                    <div className="grid-cols-3 grid gap-[10%] p-5">
                      <div className="flex gap-5 ">
                        {" "}
                        <span>
                          <img src="/images/phone.png" className="w-[66px]" />
                        </span>
                        <div className="">
                          <div className="text-[16px] mb-2 text-[#000000d9] font-bold leading-6">
                            CALL THE CLERK'S OFFICE
                          </div>
                          <div className="text-[18px] mb-2 text-[#7c2f3e] font-bold leading-6">
                            (727) 464-7000
                          </div>
                          <div className="text-[14px] mb-2 text-[#000000d9] font-normal">
                            Available Monday - Friday
                          </div>
                          <div className="text-[14px] mb-2 text-[#000000d9] font-normal">
                            8:30am to 4:30pm EST
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-5">
                        {" "}
                        <span>
                          <img src="/images/email.png" className="w-[66px]" />
                        </span>
                        <div className="">
                          <div className="text-[16px] mb-2.5 text-[#000000d9] font-bold leading-6">
                            EMAIL
                          </div>
                          <a
                            href="mailto:clerkinfo@mypinellasclerk.gov"
                            className="text-[18px] mb-2 text-[#7c2f3e] font-bold leading-6"
                          >
                            clerkinfo@mypinellasclerk.gov
                          </a>
                        </div>
                      </div>
                      <div className="">
                        <a
                          href="https://maps.app.goo.gl/YawfG8A2p7zw5tz3A"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="/images/map1.png"
                            className="w-[280px] h-[168px] cursor-pointer border-2 border-[#ffd763]"
                            alt="Map Thumbnail"
                          />
                        </a>
                        <div className="text-[13px] mb-1 text-[#000000d9] font-light">
                          315 Court Street, Clearwater, Florida 33756
                        </div>
                        <a
                          href="https://maps.app.goo.gl/YawfG8A2p7zw5tz3A"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[14px] mb-1.5 text-[#000000d9] font-semibold"
                        >
                          Get driving directions
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[#7c2f3e] font-normal text-[11px] leading-5">
              Disclaimer: If you are a person with a disability who needs an
              accommodation to access records on this site, Please contact the
              Pinellas County office of Human Rights by calling (727) 464-4880
              or by email to accommodations@pinellascounty.org. More information
              can be found on the Clerk’s ADA & Website Policies webpage.
              Copyright 2020 Pinellas County Clerk of the Circuit Court and
              Comptroller.
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Homepage;
