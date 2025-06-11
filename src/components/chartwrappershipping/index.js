import React, { useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import ExportOverlay from "../ExportFile/overlaypanel";

export default function ChartWrapper(props) {
  const {
    dialogWidth,
    dialogHeight,
    dialogHeaderStyle,
    dialogStyle,
     infoTooltipComponent: InfoTooltip,
  infoTooltipTitle = "Default Title",
  infoTooltipDescription = "Default description.",
    // ...other props
  } = props;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isFontBig, setIsFontBig] = useState(false);
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);
  const [showInfoTooltipCard, setShowInfoTooltipCard] = useState(false);
  const Bots = useRef();

  // const InfoTooltip = ({ title, description }) => (
  //   <div className="absolute top-full right-[-1rem] mt-1 flex flex-col items-center z-50">
  //     <div className="bg-[#424242] w-[350px] text-white text-sm rounded-lg px-5 py-3 shadow-lg max-w-[400px] text-center">
  //       <div className="font-semibold mb-1 text-start">{title}</div>
  //       <div className="text-xs  text-start mt-2">{description}</div>
  //     </div>
  //     <div className="w-2 h-2 bg-[#424242] rotate-45 -mt-[105px] ml-[18.5rem]"></div>
  //   </div>
  // );

  const openPopup = () => {
    setIsPopupOpen(true);
    setIsFontBig(true);
  };

  const handlePrint = () => {
    const content = Bots.current?.innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(
      "<html><head><title>Print Chart</title></head><body>"
    );
    printWindow.document.write(content);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div>
      <Dialog
        visible={isPopupOpen}
        onHide={() => {
          setIsPopupOpen(false);
          setIsFontBig(false);
        }}
        header={
          <div
            className="flex items-center justify-between w-full"
            style={dialogHeaderStyle}
          >
            <span>{props.header}</span>
            <div className="flex items-center gap-2 mt-1">
              {props.infoIcon && (
                <div className="relative group">
                  <button
                    onClick={() => setShowInfoTooltipCard((prev) => !prev)}
                  >
                    <img src="/images/infoIcon.png" width="20" alt="Info" />
                  </button>
                  {showInfoTooltipCard && (
                    <InfoTooltip
                      title={infoTooltipTitle}
                      description={infoTooltipDescription}
                    />
                  )}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-20">
                    <div className="bg-[#424242] text-white text-[14px] rounded px-2 py-1 shadow-lg">
                      Info
                    </div>
                    <div className="w-2 h-2 bg-[#424242] rotate-45 mt-[-33px]"></div>
                  </div>
                </div>
              )}
              {props.ExportIcon && (
                <div className="relative group">
                  {/* <button>
                    <img
                      src="/images/exportIcon.png"
                      width="20"
                      alt="Export Icon"
                    />
                  </button> */}
                  <ExportOverlay ui data={props.apidata} fileName={props.infoTooltipTitle} columns={props.exportColumns}/>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-20">
                    <div className="bg-[#424242] text-white text-[14px] rounded px-2 py-1 shadow-lg">
                      Export
                    </div>
                    <div className="w-2 h-2 bg-[#424242] rotate-45 mt-[-33px]"></div>
                  </div>
                </div>
              )}
              {props.PrintIcon && (
                <div className="relative group">
                  <button onClick={() => window.print()}>
                    <img
                      src="/images/printIcon.png"
                      width="20"
                      alt="Print Icon"
                    />
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-50">
                    <div className="bg-[#424242] text-white text-[14px] rounded px-2 py-1 shadow-lg">
                      Print
                    </div>
                    <div className="w-2 h-2 bg-[#424242] rotate-45 mt-[-33px]"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        }
        // style={{ width: "60vw", fontSize: "15px" }}
        style={{
          width: dialogWidth || "60vw",
          height: dialogHeight || "auto",
          fontSize: "15px",
          ...dialogStyle,
        }}
        dismissableMask={true}
        onShow={() => setIsMaximized(false)}
        onMaximize={() => setIsMaximized(true)}
        pt={{ root: { style: { borderRadius: "16px", overflow: "hidden" } } }}
        blockScroll
        draggable={false}
      >
        <div
          ref={Bots}
          className={
            isFontBig ? "text-[18px] font-bold mt-[4rem]" : "text-base"
          }
        >
          {props.data && React.isValidElement(props.data)
            ? React.cloneElement(props.data, { isMaximized })
            : props.data}
        </div>
      </Dialog>

      <div className="p-2 rounded-lg pl-0">
        <div className="flex items-center justify-between mt-[-1.9rem]">
          <div>
            <h3 className="text-[15px] text-[#7C2F3E] font-semibold">
              {props.title}
            </h3>
            <p className="text-sm text-gray-600">{props.subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            {props.infoIcon && (
              <div className="relative group">
                <button onClick={() => setShowInfoTooltip((prev) => !prev)}>
                  <img src="/images/infoIcon.png" width="20" alt="Info" />
                </button>
                {showInfoTooltip && (
                  <InfoTooltip
                      title={infoTooltipTitle}
                      description={infoTooltipDescription}
                    />
                )}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-20">
                  <div className="bg-[#424242] text-white text-[14px] rounded px-2 py-1 shadow-lg">
                    Info
                  </div>
                  <div className="w-2 h-2 bg-[#424242] rotate-45 mt-[-4px]"></div>
                </div>
              </div>
            )}
            {props.MaxiIcon && (
              <div className="relative group">
                <button onClick={openPopup}>
                  <img
                    src="/images/MaximizeIcon.png"
                    width="20"
                    alt="Maximize Icon"
                  />
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-20">
                  <div className="bg-[#424242] text-white text-[14px] rounded px-2 py-1 shadow-lg">
                    Maximize
                  </div>
                  <div className="w-2 h-2 bg-[#424242] rotate-45 mt-[-4px]"></div>
                </div>
              </div>
            )}
            {props.ExportIcon && (
              <div className="relative group">
                {/* <button>
                  <img
                    src="/images/exportIcon.png"
                    width="20"
                    alt="Export Icon"
                  />
                </button> */}
                <ExportOverlay ui data={props.apidata} fileName={props.infoTooltipTitle} columns={props.exportColumns}/>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-20">
                  <div className="bg-[#424242] text-white text-[14px] rounded px-2 py-1 shadow-lg">
                    Export
                  </div>
                  <div className="w-2 h-2 bg-[#424242] rotate-45 mt-[-4px]"></div>
                </div>
              </div>
            )}
            {props.PrintIcon && (
              <div className="relative group">
                <button onClick={() => window.print()}>
                  <img
                    src="/images/printIcon.png"
                    width="20"
                    alt="Print Icon"
                  />
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-20">
                  <div className="bg-[#424242] text-white text-[14px] rounded px-2 py-1 shadow-lg">
                    Print
                  </div>
                  <div className="w-2 h-2 bg-[#424242] rotate-45 mt-[-4px]"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>{props.data && React.cloneElement(props.data)}</div>
      </div>
    </div>
  );
}
