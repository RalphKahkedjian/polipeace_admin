import Sidebar from "../components/Sidebar";

export default function NotFound() {
  return (
    <div>
      <Sidebar />
      <div className="" style={{
        position:'absolute',
        left:'50%',
        top:'50%',
        transform:'translate(-50%,-50%)',
        textAlign:'center',
        color:'#642C4B',
        marginLeft:'80px'
      }}>
        <h1 className="display-3 fw-normal">404 - Not Found </h1>
        <p>
          The page you are looking for is not a valid one. 
          <br/>
          Please check for a valid one
        </p>
      </div>
    </div>
  )
}
