import { useEffect, useState, useRef } from "react";
import Card from "../components/Card";
import axiosClient from "../Services/axiosClient";
import { Link } from "react-router-dom";
import Party_Affiliation_Graph from "../components/Charts/Party_Affiliation_Graph";
import UserContenders from "../components/Contenders/UserContenders";
import ChatBox from "../components/PolipeaceChatbot/Chatbot";
import { useStateContext } from "../contexts/contextProvider";
import '../styles/Dashboard.css'

export default function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [announcementCount, setAnnouncementCount] = useState(0);
  const [meetingCount, setMeetingCount] = useState(0);
  const { id } = useStateContext();

  const getTypeCount = (
    type: string,
    setCount: React.Dispatch<React.SetStateAction<number>>
  ) => {
    axiosClient
      .get(`/${type}/${type}s`)
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
      axiosClient.get('/Announcement/Show')
  .then(({data})=> {
    if (data.announcement) {
      setAnnouncementCount(data.announcement.length)
      console.log(data.announcement.length)
    }
  })
  .catch((err)=> {
    console.log("no announcements", err.response);
  })

    axiosClient.get('/Meeting/Show')
  .then(({data})=> {
    if (data.meetings) {
      setMeetingCount(data.meetings.length)
      console.log(data.meetings.length)
    }
  })
  .catch((err)=> {
    console.log("no meetings", err.response)
  })
  }, []);

  // Drag logic
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div>
      <div className="d-block mt-5">
        <div
          className="horizontal-scroll"
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <Card
            title="Total Users"
            description={userCount}
            redirection={
              <Link to="/users">
                <span className="card-link">➥ Add / Remove Users</span>
              </Link>
            }
          />
          <Card
            title="Total Admins"
            description={adminCount}
            redirection={
              <Link to="/admins">
                <span className="card-link">➥ Add / Remove Admins</span>
              </Link>
            }
          />
          <Card
            title="Announcements"
            description={announcementCount}
            redirection={
              <Link to="/announcements">
                <span className="card-link">➥ Add / Remove Announcements</span>
              </Link>
            }
          />
          <Card
            title="Meetings"
            description={meetingCount}
            redirection={
              <Link to="/meetings">
                <span className="card-link">➥ Add / Remove Meeting</span>
              </Link>
            }
          />
          <Card
            title="Votes"
            description={0}
            redirection={
              <Link to="/votes">
                <span className="card-link">➥ Create / Delete Votings</span>
              </Link>
            }
          />
            <Card
            title="Posts"
            description={0}
            redirection={
              <Link to="/posts">
                <span className="card-link">➥ View / Delete Posts</span>
              </Link>
            }
          />
        </div>

        <div className="w-75 h-75" style={{ marginTop: "70px" }}>
          <h3 className="mb-3">Party Distributions</h3>
          <Party_Affiliation_Graph />
        </div>

        <div className="w-100" style={{ marginTop: "70px" }}>
          <h3>Contenders of the Week</h3>
          <div className="d-flex">
            <UserContenders
              user1="Ralph Kahkedjian"
              emailUser1="ralph.kjian@hotmail.com"
              user2="Fredy Kahkedjian"
              emailUser2="freddy.kjian@gmail.com"
            />
          </div>
        </div>

        <div style={{ marginTop: "70px" }}>
          <h3>Polipeace Chatbot</h3>
          <ChatBox userId={id} />
        </div>
      </div>
    </div>
  );
}
