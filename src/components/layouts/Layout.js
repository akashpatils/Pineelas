import React from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";


export default function Layout({ children, ...pageProps }) {

  return (

    <>
     
      {/* <Top
        filtericon={pageProps.filtericon}
        pageTitle={pageProps.pageTitle}
        pageName={pageProps.pageName}
        parentPageName={pageProps.parentPageName}
        backButtonShow={pageProps.backButtonShow}
        backButtonLink={pageProps.backButtonLink}
        InputTextShow={pageProps.InputTextShow == false ? false : true}
        buttonShow={pageProps.buttonShow}
        exportBtnShow={pageProps.exportBtnShow}
        importBtnShow={pageProps.importBtnShow}
        containerOverBtnShow={pageProps.containerOverBtnShow}
        nonContainerOverBtnShow={pageProps.nonContainerOverBtnShow}
        containersBtnShow={pageProps.containersBtnShow}
        nonContainersBtnShow={pageProps.nonContainersBtnShow}
        pageRouteNonContainer={pageProps.pageRouteNonContainer}
        pageRouteContainer={pageProps.pageRouteContainer}
      /> */}
      {/* <Left activeTab={pageProps.activeTab} setActiveTab={pageProps.setActiveTab} /> */}


      <div className={``}>
        <main>
            {children}
          </main>
        </div>

      </>
  );
}
