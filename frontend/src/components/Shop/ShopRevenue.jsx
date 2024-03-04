
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { DataGrid } from "@material-ui/data-grid";
import Loader from "../Layout/Loader";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { AiOutlineArrowRight } from "react-icons/ai";
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTooltip,VictoryLabel,VictoryPie,VictoryLine } from 'victory';

const ShopRevenue = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const { id } = useParams(); // Retrieve id from route params
    const [totalOrderCost, setTotalOrderCost] = useState(0);
  const [netSales, setNetSales] = useState(0);
  const [ordersByCategory, setOrdersByCategory] = useState({});
  const [ordersByCategoryno, setOrdersByCategoryno] = useState([]);
  const [salesData, setSalesData] = useState([]);
  useEffect(() => {
    dispatch(getAllOrdersOfShop(id)); // Pass id to action creator
  }, [dispatch, id]);

 
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
  // Process orders to populate row data
  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "₹" + item.totalPrice,
        status: item.status,
      });
    });




    // code for categories

  useEffect(() => {
    // Calculate total order cost
    console.log(orders)
    let totalCost = 0;
   
   orders && orders.forEach(order => {
      totalCost += order.totalPrice;
      console.log(order);
    });
    setTotalOrderCost(totalCost);

    // Calculate net sales
    let netSales = 0;
    orders && orders.forEach(order => {
      if (order.status === "Delivered") {
        netSales += order.totalPrice;
      }
    });
    setNetSales(netSales);

    // Calculate orders by category
    const ordersByCategory = {};
    orders && orders.forEach(order => {
      order.cart.forEach(item => {
        if (!ordersByCategory[item.category]) {
          ordersByCategory[item.category] = 0;
        }
        ordersByCategory[item.category] += order.totalPrice;

      });
    });
    setOrdersByCategory(ordersByCategory);
  

  }, [orders]);

// order by time
const ordersByTime = {};

// Assuming orders array contains objects with timestamps
orders && orders.forEach(order => {
  const date = new Date(order.createdAt); // Convert timestamp to Date object
  const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`; // Format to MM/YYYY
  if (!ordersByTime[monthYear]) {
    ordersByTime[monthYear] = 0;
  }
  ordersByTime[monthYear]++;
});

// count of orders by category
useEffect(() => {
  if (orders && orders.length > 0) {
    const categoryCounts = {};
    orders.forEach((order) => {
      order.cart.forEach((item) => {
        if (!categoryCounts[item.category]) {
          categoryCounts[item.category] = 1;
        } else {
          categoryCounts[item.category]++;
        }
      });
    });
    const data = Object.keys(categoryCounts).map((category) => ({
      x: category,
      y: categoryCounts[category],
    }));
    setOrdersByCategoryno(data);
  }
}, [orders]);

// sales graph over time
useEffect(() => {
  if (orders && orders.length > 0) {
    const salesByDate = {};
    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const dateString = date.toISOString().split("T")[0]; // Get YYYY-MM-DD format
      if (!salesByDate[dateString]) {
        salesByDate[dateString] = order.totalPrice;
      } else {
        salesByDate[dateString] += order.totalPrice;
      }
    });
    const data = Object.keys(salesByDate).map((dateString) => ({
      x: new Date(dateString),
      y: salesByDate[dateString],
    }));
    setSalesData(data);
  }
}, [orders]);      
  
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-blue-100">

<Card className="mb-4">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Order Cost
              </Typography>
              <Typography variant="h4">
                ₹ {totalOrderCost}
              </Typography>
            </CardContent>
          </Card>
            <Card className="mb-4">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Net Sales
              </Typography>
              <Typography variant="h4">
                ₹ {netSales}
              </Typography>
            </CardContent>
          </Card>
          {/* <Card className="mb-4">
               <CardContent>
                <Typography variant="h6" gutterBottom>
                   Cost by Category
                 </Typography>
                 <table>
                   <thead>
                     <tr>
                     <th>Category</th>
                       <th>Cost</th>
                     </tr>
                   </thead>
                <tbody>
                    {Object.keys(ordersByCategory).map(category => (
                      <tr key={category}>
                        <td>{category}</td>
                        <td>₹ {ordersByCategory[category]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>  */}
            <Card className="mb-4">
  <CardContent>
    <Typography variant="h6" gutterBottom>
      Cost by Category
    </Typography>
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr style={{ borderBottom: "1px solid #ccc" }}>
          <th style={{ padding: "8px", textAlign: "left" }}>Category</th>
          <th style={{ padding: "8px", textAlign: "left" }}>Cost</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(ordersByCategory).map((category) => (
          <tr key={category} style={{ borderBottom: "1px solid #ccc" }}>
            <td style={{ padding: "8px", textAlign: "left" }}>{category}</td>
            <td style={{ padding: "8px", textAlign: "left" }}>
              ₹ {ordersByCategory[category]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </CardContent>
</Card>

          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />






<div style={{ color: "blue" }}>
            <h2 className=" ml-[506px]" style={{ color: "black" }}>Seller orders timeline</h2>
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



          <h2>Number of Orders by Category</h2>
      <VictoryPie
        data={ordersByCategoryno}
        colorScale="qualitative"
        labelRadius={50}
        style={{ labels: { fontSize: 10 } }}
      />






<h2>Sales Over Time</h2>
      <VictoryChart
        scale={{ x: "time" }}
        width={600}
        height={300}
        domainPadding={{ y: 10 }}
      >
        <VictoryAxis
          tickFormat={(x) => new Date(x).toLocaleDateString()}
          tickCount={5}
        />
        <VictoryAxis dependentAxis />
        <VictoryLine
          data={salesData}
          x="x"
          y="y"
          style={{
            data: { stroke: "blue" },
            parent: { border: "1px solid #ccc" },
          }}
        />
      </VictoryChart>
        </div>



        

      )}
    </>
  );
};

export default ShopRevenue;
