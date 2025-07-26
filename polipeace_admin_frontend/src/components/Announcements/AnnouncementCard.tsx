import { Announcement } from "../../models/Announcement"
import logo from '../../assets/images/Polipeace_logo.png'


export default function AnnouncementCard({subject, description}: Announcement) {
  return (
    <div style={{
      width:'98%',
      padding:'50px',
      borderRadius: '20px',
      color:'#4B1F3E',
      backgroundColor:'whitesmoke',
      boxShadow: '0 5px 5px 5px #4B1F3E',
    }}>
      <div style={{
        justifyContent:'space-between',
        display:'flex'
      }}>
        
        <div style={{
          borderRadius:'50px'
        }}>
          <img src= {logo} style={{
            width:'100px',
            height:'100px',
          }} />
        </div>

        
        <div style={{
          display:'flex',
          flexDirection: 'column'
        }}>
          <h2>
            {subject}
          </h2>
          <p>
            {description}
          </p>
        </div>

        <div> 
          <i className="bi bi-trash" style={{
            fontSize:'1.5em'
          }}></i>
        </div>
      </div>
    </div>
  )
}
