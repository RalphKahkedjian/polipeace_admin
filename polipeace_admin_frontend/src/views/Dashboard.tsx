import { useEffect, useState } from "react";
import Card from "../components/Card";
import axiosClient from "../axiosClient";

export default function Dashboard() {

  const [userCount, setUserCount] = useState(0)

  useEffect(()=> {
    axiosClient.get('/User/Users')
      .then(({ data }) => {
        setUserCount(data.users.length);
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
      });
  },[])

  return (
    <div>
      <div className="d-flex mt-5 pt-3" style={{gap:'30px'}}>
      <Card
      title="Total Users"
      description={userCount}
      />
      <Card
      title="Upcoming Events"
      description={3}
      />
      <Card
      title="Active Users"
      description={13}
      />
      
      </div>
    </div>
  )
}
