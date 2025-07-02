import { useEffect, useState } from "react";
import Card from "../components/Card";
import axiosClient from "../Services/axiosClient";
import { Link } from "react-router-dom";
import Party_Affiliation_Graph from "../components/Charts/Party_Affiliation_Graph";
import UserContenders from "../components/Contenders/UserContenders";
import CircularProgress from "../components/Charts/User_Contender_Circular_Graph";
import ChatBox from "../components/PolipeaceChatbot/Chatbot";


export default function Dashboard() {

  const [userCount, setUserCount] = useState(0)
  const [adminCount, setAdminCount] = useState(0)


  const date = new Date()
  const dateTime = date.toLocaleDateString()

  const getTypeCount = (
    type: string,
    setCount: React.Dispatch<React.SetStateAction<number>>
  ) => {
    axiosClient.get(`/${type}/${type}s`)
      .then(({ data }) => {
        const key = type.toLowerCase() + "s";
        if (data[key]) {
          setCount(data[key].length);
        }
      })
      .catch((err) => {
        console.log(`Failed to fetch ${type}s: `, err);
      });
  };
  

  useEffect(() => {
    getTypeCount("Admin", setAdminCount);
    getTypeCount("User", setUserCount);
  }, []);
  

  return (
    <div>
      <div className="d-block mt-5">
        <div className="d-flex pt-4" style={{gap:'20px'}}>  
          <Card
          title="Total Users"
          description={userCount}
          redirection={<Link to='/users'><span style={{textDecoration:'underline black', color:'#4B1F3E', fontWeight:'350'}}>➥ Add / Remove Users</span></Link>}
          />
          <Card
          title="Total Admins"
          description={adminCount}
          redirection={<Link to='/admins'><span style={{textDecoration:'underline black', color:'#4B1F3E', fontWeight:'350'}}>➥ Add / Remove Admins</span></Link>}
          />
          <Card
          title="Post Announcement"
          description={0}
          redirection={<Link to='/announcements'><span style={{textDecoration:'underline black', color:'#4B1F3E', fontWeight:'350'}}>➥ Add / Remove Announcements</span></Link>}
          />
        </div>
          <div className="w-75 h-75" style={{
            marginTop:'70px'
          }}>
            <h3 className="mb-3">
              Party Distributions
            </h3>
            <Party_Affiliation_Graph />
          </div>
          <div className="w-100" style={{
            marginTop:'70px'
          }}>
            <h3>
             Contenders of the Week
            </h3>
            <div className="d-flex">
            <UserContenders user1="Ralph Kahkedjian" emailUser1="ralph.kjian@hotmail.com" user2="Fredy Kahkedjian" emailUser2="freddy.kjian@gmail.com"/>
            </div>
          </div>
          <div style={{
            marginTop:'70px'
          }}>
            <h3>
              Polipeace Chatbot
            </h3>
            <ChatBox />
          </div>
          <div>
          </div>
      </div>
    </div>
  )
}
