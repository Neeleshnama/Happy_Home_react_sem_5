// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { DataGrid } from "@material-ui/data-grid";
// import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
// import { Button } from "@material-ui/core";
// import styles from "../../styles/styles";
// import { RxCross1 } from "react-icons/rx";
// import axios from "axios";
// import { server } from "../../server";
// import { toast } from "react-toastify";
// import { getAllSellers } from "../../redux/actions/sellers";
// import { Link } from "react-router-dom";

// const ApproveSellers = () => {
//   const dispatch = useDispatch();
//   const { sellers } = useSelector((state) => state.seller);
//   const [open, setOpen] = useState(false);
//   const [userId, setUserId] = useState("");

//   useEffect(() => {
//     dispatch(getAllSellers());
//   }, [dispatch]);

//   const handleAction = async (id, action) => {
//     try {
//       const res = await axios.put(`${server}/shop/${action}-seller/${id}`, { withCredentials: true });
//       toast.success(res.data.message);
//       dispatch(getAllSellers());
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   const columns = [
//     { field: "id", headerName: "Seller ID", minWidth: 150, flex: 0.7 },

//     {
//       field: "name",
//       headerName: "name",
//       minWidth: 130,
//       flex: 0.7,
//     },
//     {
//       field: "email",
//       headerName: "Email",
//       type: "text",
//       minWidth: 130,
//       flex: 0.7,
//     },
//     {
//       field: "address",
//       headerName: "Seller Address",
//       type: "text",
//       minWidth: 130,
//       flex: 0.7,
//     },

//     {
//       field: "joinedAt",
//       headerName: "joinedAt",
//       type: "text",
//       minWidth: 130,
//       flex: 0.8,
//     },
//     {
//         field: "  ",
//         flex: 1,
//         minWidth: 150,
//         headerName: "Preview Shop",
//         type: "number",
//         sortable: false,
//         renderCell: (params) => {
//           return (
//             <>
//             <Link to={`/shop/preview/${params.id}`}>
//             <Button>
//                 <AiOutlineEye size={20} />
//               </Button>
//             </Link>
//             </>
//           );
//         },
//       },
//     {
//       field: "approve",
//       flex: 1,
//       minWidth: 150,
//       headerName: "Approve",
//       type: "number",
//       sortable: false,
//       renderCell: (params) => {
//         return (
//           <>
//             <Button onClick={() => handleAction(params.id, 'approve')}>
//               Approve
//             </Button>
//           </>
//         );
//       },
//     },
//     {
//       field: "reject",
//       flex: 1,
//       minWidth: 150,
//       headerName: "Reject",
//       type: "number",
//       sortable: false,
//       renderCell: (params) => {
//         return (
//           <>
//             <Button onClick={() => handleAction(params.id, 'reject')}>
//               Reject
//             </Button>
//           </>
//         );
//       },
//     },
//   ];

//   const row = [];
//   sellers &&
//   sellers.forEach((item) => {
//       row.push({
//         id: item._id,
//         name: item?.name,
//         email: item?.email,
//         joinedAt: item.createdAt.slice(0, 10),
//         address: item.address,
//       });
//     });

//   return (
//     <div className="w-full flex justify-center pt-5 bg-blue-100">
//       <div className="w-[97%]">
//         <h3 className="text-[22px] font-Poppins pb-2">All Users</h3>
//         <div className="w-full min-h-[45vh]  rounded">
//           <DataGrid
//             rows={row}
//             columns={columns}
//             pageSize={10}
//             disableSelectionOnClick
//             autoHeight
//           />
//         </div>
//         {open && (
//           <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
//             <div className="w-[95%] 800px:w-[40%] min-h-[20vh]  rounded shadow p-5">
//               <div className="w-full flex justify-end cursor-pointer">
//                 <RxCross1 size={25} onClick={() => setOpen(false)} />
//               </div>
//               <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
//                 Are you sure you wanna delete this user?
//               </h3>
//               <div className="w-full flex items-center justify-center">
//                 <div
//                   className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
//                   onClick={() => setOpen(false)}
//                 >
//                   cancel
//                 </div>
//                 {/* <div
//                   className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
//                   onClick={() =>  setOpen(false) || handleDelete(userId)}
//                 >
//                   confirm
//                 </div> */}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ApproveSellers;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Button } from "@material-ui/core";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { getAllSellers } from "../../redux/actions/sellers";
import { Link } from "react-router-dom";

const ApproveSellers = () => {
  const dispatch = useDispatch();
  const { sellers } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [filterOption, setFilterOption] = useState("all");

  useEffect(() => {
    dispatch(getAllSellers());
  }, [dispatch]);

  const handleAction = async (id, action) => {
    try {
      const res = await axios.put(`${server}/shop/${action}-seller/${id}`, { withCredentials: true });
      toast.success(res.data.message);
      dispatch(getAllSellers());
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const columns = [
    { field: "id", headerName: "Seller ID", minWidth: 150, flex: 0.7 },

    {
      field: "name",
      headerName: "name",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "address",
      headerName: "Seller Address",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "joinedAt",
      headerName: "joinedAt",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "  ",
      flex: 1,
      minWidth: 150,
      headerName: "Preview Shop",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/shop/preview/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "approve",
      flex: 1,
      minWidth: 150,
      headerName: "Approve",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              style={{ backgroundColor: params.row.status === true ? 'green' : 'white' }}
              onClick={() => handleAction(params.id, 'approve')}>
              Approve
            </Button>
          </>
        );
      },
    },
    {
      field: "reject",
      flex: 1,
      minWidth: 150,
      headerName: "Reject",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              style={{ backgroundColor: params.row.status === false ? 'red' : 'white' }}
              onClick={() => handleAction(params.id, 'reject')}>
              Reject
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  sellers &&
    sellers.forEach((item) => {
      row.push({
        id: item._id,
        name: item?.name,
        email: item?.email,
        joinedAt: item.createdAt.slice(0, 10),
        address: item.address,
        status: item.verified // assuming 'status' is a property in your seller object
      });
    });


  const filteredSellers = row.filter((seller) => {
    if (filterOption === "approved") {
      return seller.status === true;
    } else if (filterOption === "rejected") {
      return seller.status === false;
    } else {
      return true;
    }
  });



  return (
    <div className="w-full flex justify-center pt-5 bg-blue-100">
      <div className="w-[97%]">

        {/* Add filter options */}
        <select
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
          className=" w-64 mb-3 px-2 py-1 border rounded-md"
          style={{ backgroundColor: "#f3f4f6", color: "#4b5563" }}
        >
          <option value="all">All Sellers</option>
          <option value="approved">Approved Sellers</option>
          <option value="rejected">Rejected Sellers</option>
        </select>

        <div className="w-full min-h-[45vh] rounded">
          <DataGrid
            rows={filteredSellers}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>

        {open && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh]  rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpen(false)} />
              </div>
              <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                Are you sure you wanna delete this user?
              </h3>
              <div className="w-full flex items-center justify-center">
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                  onClick={() => setOpen(false)}
                >
                  cancel
                </div>
                {/* <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                  onClick={() =>  setOpen(false) || handleDelete(userId)}
                >
                  confirm
                </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApproveSellers;
