
import React from "react";
import "../styles/invoice.css";
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBTypography,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

export default function Invoice({ order }) {

    const getPackageType = (qty) => {
        switch (qty) {
          case 1:
            return "Basic Package";
          case 2:
            return "Standard Package";
          case 3:
            return "Premium Package";
          default:
            return "Custom Package";
        }
      };
      const handlePrint = () => {
        window.print();
      };
  return (
    <MDBContainer className="py-5">
      <MDBCard className="p-4">
        <MDBCardBody>
          <MDBContainer className="mb-2 mt-3">
            <MDBRow className="d-flex align-items-baseline">
              <MDBCol xl="9">
                <p style={{ color: "#7e8d9f", fontSize: "20px" }}>
                  Invoice &gt; &gt; <strong>ID:#{order?._id?.slice(0, 8)}</strong>
                </p>
              </MDBCol>
              <MDBCol xl="3" className="float-end">
                <MDBBtn
                  color="light"
                  ripple="dark"
                  className="text-capitalize border-0  no-print"
                  onClick={handlePrint}
                >
                  <MDBIcon fas icon="print" color="primary" className="me-1" />
                  Print
                </MDBBtn>
                <MDBBtn
                  color="light"
                  ripple="dark"
                  className="text-capitalize border-0 ms-2"
                >
                  <MDBIcon
                    far
                    icon="file-pdf"
                    color="danger"
                    className="me-1"
                  />
                  Export
                </MDBBtn>
                <hr />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          {/* <MDBContainer>
            <MDBCol md="12" className="text-center">
              {/* <MDBIcon
                fab
                icon="mdb"
                size="4x"
                className="ms-0 "
                style={{ color: "#5d9fc5" }}
              /> */}
             
            {/* </MDBCol>
          </MDBContainer> */} 
          <MDBRow>
            <MDBCol xl="8">
              <MDBTypography listUnStyled className="invoice-print">
                <li className="text-muted">
                  To: <span style={{ color: "#5d9fc5" }}>{order?.user?.name}</span>
                </li>
                <li className="text-muted">Address:{order?.shippingAddress.address1}</li>
                <li className="text-muted">Country:{order?.shippingAddress.country}</li>
                <li className="text-muted">City:{order?.shippingAddress.city}</li>


                <li className="text-muted">
                  <MDBIcon fas icon="phone-alt" /> {order?.user?.phoneNumber}
                </li>
              </MDBTypography>
            </MDBCol>
            <MDBCol xl="4">
              <p className="text-muted">Invoice</p>
              <MDBTypography listUnStyled>
                <li className="text-muted">
                  <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                  <span className="fw-bold ms-1">ID:</span>#{order?._id?.slice(0, 8)}
                </li>
                <li className="text-muted">
                  <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                  <span className="fw-bold ms-1">Creation Date: </span>{order?.createdAt?.slice(0, 10)}
                </li>
                <li className="text-muted">
                  <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                  <span className="fw-bold ms-1">Status:</span>
                  <span className="badge bg-warning text-black fw-bold ms-1">
                    {order?.status}
                  </span>
                  <br />
                  <span className="badge bg-warning text-black fw-bold ms-1">
                  <span className="fw-bold ms-1"> Payment Status:</span>
                  <br />

                  {order?.paymentInfo?.status ? order?.paymentInfo?.status : "Not Paid"}
                  </span>
                </li>
              </MDBTypography>
            </MDBCol>
          </MDBRow>
          <MDBRow className="my-2 mx-1 justify-content-center">
            <MDBTable striped borderless>
              <MDBTableHead
                className="text-white"
                style={{ backgroundColor: "#84B0CA" }}
              >
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">image</th>
                  <th scope="col">Description</th>
                  <th scope="col">Qty</th>
                  <th scope="col"> Price</th>
                  <th scope="col">Amount</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {order?.cart.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <img
              src={`${item.images[0]?.url}`}
              alt=""
              className="w-[80x] h-[80px]"
            />
                    <td>{item.name}</td>
                    {/* <td>{item.qty}</td> */}
                    <td>{getPackageType(item.qty)}</td>
                    <td>{item.discountPrice} x {item.qty}</td>
                    <td>{item.discountPrice * item.qty}</td>
                    {/* <td>${item.qty * item.price}</td> */}
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </MDBRow>
          <MDBRow>
            <MDBCol xl="8">
              <p className="ms-3">
                Add additional notes and payment information
              </p>
            </MDBCol>
            <MDBCol xl="3">
              <MDBTypography listUnStyled>
                <li className="text-muted ms-3">
                  <span class="text-black me-4">SubTotal</span>₹{order?.totalPrice}
                </li>
                <li className="text-muted ms-3 mt-2">
                  <span class="text-black me-4">Tax(15%)</span>₹{(order?.totalPrice * 0.10).toFixed(2)}
                </li>
              </MDBTypography>
              <p className="text-black float-start">
                <span className="text-black me-3"> Total Amount</span>
                <span style={{ fontSize: "25px" }}>₹{(order?.totalPrice ).toFixed(2)}</span>
              </p>
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow>
            <MDBCol xl="10">
              <p>Thank you for your Booking </p>
            </MDBCol>
            {/* <MDBCol xl="2">
              <MDBBtn
                className="text-capitalize"
                style={{ backgroundColor: "#60bdf3" }}
              >
                Pay Now
              </MDBBtn>
            </MDBCol> */}
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}
