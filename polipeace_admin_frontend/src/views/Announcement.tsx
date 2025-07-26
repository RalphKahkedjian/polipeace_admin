import { useNavigate } from "react-router-dom"

export default function Announcement() {

  const navigate = useNavigate()

  return (
    <div>
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
