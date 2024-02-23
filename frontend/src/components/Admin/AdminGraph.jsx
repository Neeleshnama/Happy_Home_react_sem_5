import { AreaChart, Card, List, ListItem } from '@tremor/react';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions/user";
import { getAllSellers } from "../../redux/actions/sellers";
import { AiFillPropertySafety } from 'react-icons/ai';

const AdminGraph = (props) => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.user);
    const {sellers}=useSelector((state)=>state.seller);
    const [dataus,setDataus]=useState([]);

    useEffect(() => {
        if (props.type === 'User') {
            dispatch(getAllUsers());
            setDataus(users);
        } else if (props.type === 'Seller') {
            dispatch(getAllSellers());
            setDataus(sellers);
        }
    }, [ dataus]);


    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    // Function to count users in each month
    const countUsersByMonth = () => {
        const monthCounts = {};
        if(dataus) {
            dataus.forEach(user => {
                const monthYear = new Date(user.createdAt).toLocaleString('en-US', { month: 'short', year: 'numeric' });
                if (!monthCounts[monthYear]) {
                    monthCounts[monthYear] = 1;
                } else {
                    monthCounts[monthYear]++;
                }
            });
        }
        return monthCounts;
    };

    const userCounts = countUsersByMonth();

    // Transform user counts data for graph
    const data = Object.keys(userCounts).map(month => ({
        date: month,
        Users: userCounts[month]
    }));

    const valueFormatter = (number) =>
        `${Intl.NumberFormat('us').format(number).toString()}`;

    return (
        <>
            <Card className="sm:mx-auto sm:max-w-lg">
                <h3 className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    {props.type} Registration Metrics
                </h3>
                <AreaChart
                    data={data}
                    index="date"
                    categories={['Users']}
                    colors={['darkblue']}
                    valueFormatter={valueFormatter}
                    showLegend={false}
                    showYAxis={false}
                    showGradient={false}
                    startEndOnly={true}
                    className="mt-6 h-32"
                />
                <List className="mt-2">
                    {Object.keys(userCounts).map(month => (
                        <ListItem key={month}>
                            <div className="flex items-center space-x-2">
                                <span className="bg-blue-500 h-0.5 w-3" aria-hidden={true} />
                                <span>{month}</span>
                            </div>
                            <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                {valueFormatter(userCounts[month])}
                            </span>
                        </ListItem>
                    ))}
                </List>
            </Card>
        </>
    )
}

export default AdminGraph;
