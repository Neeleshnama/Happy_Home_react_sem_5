import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import Loader from "../Layout/Loader";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { AiOutlineArrowRight } from "react-icons/ai";
import { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory';

const AllOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch, seller._id]);

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
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];
  const ordersByTime = {};

  // Assuming orders array contains objects with timestamps
  orders.forEach(order => {
    const date = new Date(order.createdAt); // Convert timestamp to Date object
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`; // Format to MM/YYYY
    if (!ordersByTime[monthYear]) {
      ordersByTime[monthYear] = 0;
    }
    ordersByTime[monthYear]++;
  });


  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "₹" + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-blue-100">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
          <div style={{ color: "blue" }}>
            <h2 className=" ml-[506px]" style={{ color: "black" }}>Your orders timeline</h2>
            <VictoryChart
              domainPadding={{ x: 50 }}
              height={300}
              width={600}
              colorScale="blue"
              animate={{ duration: 500 }}
            >
              <VictoryLabel
                text="Time"
                color="blue"
                x={300}
                y={290}
                textAnchor="middle"
                style={{ fontSize: 15 }}
              />
              <VictoryLabel
                text="No. of Orders"
                x={10}
                y={150}
                textAnchor="middle"
                verticalAnchor="middle"
                angle={-90}
                style={{ fontSize: 15 }}
              />
              <VictoryBar
                data={Object.keys(ordersByTime).map(monthYear => ({
                  x: monthYear,
                  y: ordersByTime[monthYear],
                  label: `Time: ${monthYear}\nNo. of Orders: ${ordersByTime[monthYear]}`,
                }))}
                style={{
                  data: { fill: "darkblue" }, // Set bar color to dark blue
                  labels: { fontSize: 6 },
                }}
                labelComponent={<VictoryTooltip />}
              />
              <VictoryAxis
                tickValues={Object.keys(ordersByTime)} // Set tick values to monthYear strings
                style={{
                  tickLabels: { fontSize: 8, angle: -45 },
                }}
              />
              <VictoryAxis dependentAxis tickFormat={(x) => x} />
            </VictoryChart>
          </div>
        </div>
      )}
    </>
  );
};

export default AllOrders;
