import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import UserHistoryDetails from "../components/Admin/User";

const UserRecordPage = () => {
  return (
    <div>
        <Header />
        <UserHistoryDetails />
        <Footer />
    </div>
  )
}

export default UserRecordPage