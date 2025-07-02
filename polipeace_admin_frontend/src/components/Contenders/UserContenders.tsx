import CircularProgress from '../Charts/User_Contender_Circular_Graph';
import '../Contenders/UserContenders.css';



interface UserContenderProps {
  user1: string;
  emailUser1: string;
  user2: string;
  emailUser2: string;
}

export default function UserContenders({
  user1,
  user2,
  emailUser1,
  emailUser2,
}: UserContenderProps) {
  return (
    <div className="user-contender-container container mt-4">
      <div className="row align-items-center">
        {/* User Info */}
        <div className="col-md-6">
          <div className="mb-4">
            <h5>{user1}</h5>
            <p>
              <span className="fw-semibold">Email:</span> {emailUser1}
            </p>
          </div>
          <br />
          <div className="mb-4">
            <h5>{user2}</h5>
            <p>
              <span className="fw-semibold">Email:</span> {emailUser2}
            </p>
          </div>
        </div>

        {/* Circular Graph */}
        <div className="col-md-6 text-center">
          <CircularProgress percentage={75} secondaryPercentage={25} user1Name={user1} user2Name={user2} />
        </div>
      </div>
    </div>
  );
}
