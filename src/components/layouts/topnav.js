import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "primeicons/primeicons.css";
import { useDispatch } from "react-redux";
import { fetchget_agency_list_with_fiscal_year } from "../../redux/slices/global";

export default function Topnav() {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleLinkClick = () => {
    setShowPopup(false);
  };

  /* API Calls */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchget_agency_list_with_fiscal_year({
      filters: [],
      dynamicColumns: [],
    }))
  }, [])
  /*  */

  return (
    <header
      className="bg-[#4a403899] w-full"
      style={{
        position: isHome ? "absolute" : "relative",
        backgroundColor: isHome ? "#4a403899" : "#EEEEEE",
        borderBottom: isHome ? "none" : "4px solid #7c2f3e",
      }}
    >
      <div className="flex container h-[65px]">
        <div className="w-[50%] relative">
          <div
            className={`logo_wrap ${
              isHome ? "home_logo" : "other_logo"
            } absolute top-[14px] left-0`}
          ></div>
        </div>
        <div className="w-[50%] menu_wrap">
          <ul className="flex justify-end items-center relative">
            <li>
              <Link to="/" className="text-[16px] text-[#7c2f3e] font-bold">
                <span
                  className="px-4 py-2 !font-semibold"
                  style={{
                    color: isHome ? "" : "#7c2f3e",
                  }}
                >
                  Home
                </span>
              </Link>
            </li>

            <li
              className="relative"
              onMouseEnter={() => setShowPopup(true)}
              onMouseLeave={() => setShowPopup(false)}
            >
              <a className="px-4 py-2 hover-container cursor-pointer">
                <div
                  className="!font-semibold gap-1 flex items-center"
                  style={{
                    color: isHome ? "" : "#7c2f3e",
                  }}
                >
                  SPENDING TRANSPARENCY
                  <i
                    className="pi pi-chevron-down"
                    style={{
                      color: isHome ? "" : "#7c2f3e",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  ></i>
                </div>

                {showPopup && (
                  <div className="popup flex">
                    <div className="w-[40%] sideBor cursor-default">
                      <div className="text-[#8e304a] mb-2.5 font-medium text-[18px]">
                        SPENDING TRANSPARENCY
                      </div>
                      <p className="font-light mr-5 text-[18px] cursor-default">
                        This site provides information on spending transparency
                        details for Payroll Expenses, Vendors, Departments, and
                        Categories through the current and five previous years
                        for the Board of County Commissioners and Clerk of the
                        Circuit Court and Comptroller.
                      </p>
                    </div>
                    <div className="w-[60%] pl-4">
                      <div className="flex flex-wrap gap-5">
                        <div className="w-[48%]">
                          <Link
                            to="/department"
                            onClick={handleLinkClick}
                            className="mb-[-0.5rem]"
                          >
                            <div className="text-[#8e304a] font-medium text-[18px]">
                              DEPARTMENTS
                            </div>
                          </Link>
                          <p className="font-medium text-[14px] leading-5 cursor-default">
                            This section provides details on department
                            spending, obligations, and budget for the current
                            year to date and the previous five fiscal years
                            (October 1st through September 30th) for the Board
                            of County Commissioners and the Clerk of the Circuit
                            Court and Comptroller with the ability to view
                            additional purchase order details by main
                            department.
                          </p>
                        </div>
                        <div className="w-[48%]">
                          <Link
                            to="/vendors"
                            onClick={handleLinkClick}
                            className="mb-[-0.5rem]"
                          >
                            <div className="text-[#8e304a] font-medium text-[18px]">
                              VENDORS
                            </div>
                          </Link>
                          <p className="font-medium text-[14px] leading-5 cursor-default">
                            This section provides spending details by vendor for
                            the current year to date and the previous five
                            fiscal years (October 1st through September 30th)
                            for the Board of County Commissioners and the Clerk
                            of the Circuit Court and Comptroller. Expand this
                            section to view additional vendor details.
                          </p>
                        </div>
                        <div className="w-[48%] border-t border-[#ccc] pt-2">
                          <Link
                            to="/categories"
                            onClick={handleLinkClick}
                            className="mb-[-0.5rem]"
                          >
                            <div className="text-[#8e304a] font-medium text-[18px]">
                              CATEGORIES
                            </div>
                          </Link>
                          <p className="font-medium text-[14px] leading-5 cursor-default">
                            This section provides spending details by category
                            for the current year to date and the previous five
                            fiscal years (October 1st through September 30th)
                            for the Board of County Commissioners and the Clerk
                            of the Circuit Court and Comptroller with additional
                            views of spending.
                          </p>
                        </div>
                        <div className="w-[48%] border-t border-[#ccc] pt-2">
                          <Link
                            to="/payrollexpenses"
                            onClick={handleLinkClick}
                            className="mb-[-0.5rem]"
                          >
                            <div className="text-[#8e304a] font-medium text-[18px]">
                              PAYROLL EXPENSES
                            </div>
                          </Link>
                          <p className="font-medium text-[14px] leading-5 cursor-default">
                            This section provides details on employee salaries
                            and gross earnings (before deductions and taxes) by
                            Job Title through Calendar Year to date with five
                            previous calendar years for the Board of County
                            Commissioners and the Clerk of the Circuit Court and
                            Comptroller.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* <i className="fa fa-angle-down"></i> */}
              </a>
            </li>

            <li>
              <a className="px-4 py-2" href="">
                <img src="/images/sunshine-logo.png" alt="Sunshine Logo" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
