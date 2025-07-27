import { useNavigate } from "react-router-dom"
import axiosClient from "../Services/axiosClient"
import { useEffect, useState } from "react"
import AnnouncementCard from "../components/Announcements/AnnouncementCard"

export default function Announcement() {

  const navigate = useNavigate()

  const [announcements, setAnnouncements] = useState<any[]>([])

  const getAnnouncements = async()=> {
      return await axiosClient.get('/Announcement/Show').then((res)=> {
      setAnnouncements(res.data.announcement);
    })
    .catch((err)=> {
      console.log(err.response);
    })
  }

  useEffect(()=> {
    getAnnouncements()
  }, [])

  return (
    <div>
      <div style={{
        margin: '80px 0 0 0'
      }}>

        {announcements.length > 0  ? 
        <div>
          {announcements.map((item, index)=> (
            <div key={index} style={{margin:'40px 0 0 0'}}>
              <AnnouncementCard subject={item.subject} description={item.description} id={item.id} />
            </div>
          ))}
        </div>
        :
        <div>
          No announcements posted
        </div>
}
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          display: "flex",
          gap: "10px",
          right: "20px",
        }}
      >
        <button
          style={{
            width: "55px",
            height: "55px",
            backgroundColor: "#4B1F3E",
            color: "white",
            borderRadius: "50%",
            boxShadow: "5px 6px 7px #4B1F3E",
            paddingTop: "7px",
            fontSize: "1.7em",
            textAlign: "center",
          }}
          onClick={() => navigate("/announcements/new")}
        >
          +
        </button>
      </div>
    </div>
  )
}
