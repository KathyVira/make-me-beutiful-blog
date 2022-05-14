import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter  className="font-small pt-4 mt-4 " >

      <div className="footer-copyright text-center py-3 w-bgr">
        <MDBContainer fluid className="w-bgr">
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.makemebeautiful.co.il"> <spam className="w-bgr">Makemebeautiful.co.il </spam></a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;