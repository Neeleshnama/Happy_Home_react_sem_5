import React, {useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import { Bar } from "react-chartjs-2";
import { AiOutlineArrowRight } from "react-icons/ai";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UserDetails = () => {
  const { id } = useParams();
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(id));
    console.log("orders",orders);
  }, [id]);
  const ordersPerMonth = orders ? orders.reduce((acc, order) => {
    const month = new Date(order.createdAt).getMonth();
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {}) : {};

  const chartData = {
    labels: Object.keys(ordersPerMonth).map(month => 
      new Date(0, month).toLocaleString('default', { month: 'long' })
    ),
    datasets: [
      {
        label: 'Number of Orders',
        data: Object.values(ordersPerMonth),
        backgroundColor: 'rgb(30,58,138,0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false, 
        },
      },
    },
    maintainAspectRatio: false,
  };

  
// Assuming you've fetched 'orders' already
const statusCounts = orders?orders.reduce(
  (acc, order) => {
    acc.total++;
    if (order.status === "Delivered") acc.delivered++;
    if (order.status === "confirmed") acc.confirmed++;
    return acc;
  },
  { total: 0, delivered: 0, confirmed: 0 }
):{};

// Calculate 'In Progress' as total - delivered - confirmed
statusCounts.inProgress = statusCounts.total - statusCounts.delivered - statusCounts.confirmed;


  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const rows = orders.map((item) => ({
    id: item._id,
    itemsQty: item.cart.length,
    total: "₹" + item.totalPrice,
    status: item.status,
  }));

  return (
    <>
      <h2 className="px-[700px] pt-9">User Details</h2>
      <button className="pr-8 text-end">
        <Link to='/admin/dashboard'>Go back</Link>
      </button>
      <div style={{ height: '400px', width: '100%', marginTop: '20px' }}>
        <Bar className="px-32" data={chartData} options={chartOptions} />
      </div>
      <h3 className="pt-8 px-8">Statistics</h3>
      <div className="flex flex-row-3 justify-around mt-8 ">
        
  <div className="card p-8 px-16">
    <h4>Delivered</h4>
    <p>{statusCounts.delivered}</p>
  </div>
  <div className="card p-8 px-16">
    <h4>Confirmed</h4>
    <p>{statusCounts.confirmed}</p>
  </div>
  <div className="card p-8 px-16">
    <h4>In Progress</h4> 
    <p>{statusCounts.inProgress}</p>
  </div>
</div>
   <h3 className="pt-8 px-8">Order Details</h3>
      <div className="pl-8 pt-8">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          autoHeight
          disableSelectionOnClick
        />
      </div>
    </>
  );
};

export default UserDetails;