import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <div className="" style={{
        position:'absolute',
        left:'50%',
        top:'50%',
        transform:'translate(-50%,-50%)',
        textAlign:'center',
        color:'#642C4B',
      }}>
        <h1 className="display-3 fw-normal">404 - Not Found </h1>
        <p>
          The page you are looking for is not a valid one. 
          <br/>
          Please check for a valid one.
          <Link to="/dashboard">
            Go back
          </Link>
        </p>
      </div>
    </div>
  )
}
