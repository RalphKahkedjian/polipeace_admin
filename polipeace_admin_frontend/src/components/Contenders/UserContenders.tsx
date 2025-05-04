import '../Contenders/UserContenders.css'

interface UserContenderProps {
  user1: string,
  user2: string,
  date: any
}


export default function UserContenders({user1, user2, date}: UserContenderProps) {
  return (
    <div className="user-contender-container">
      <div className='d-flex text-center align-items-center justify-content-between p-5' style={{
        gap:'40px'
      }}>
        <div className='d-block'>
          <h2 className='fw-normal'>
            {user1}
          </h2>
          <div className='user-contenders-profile'>
            profile pic
          </div>
        </div>
        <div>
          <span className='fw-bold' style={{
            letterSpacing:'1px',
          }}>
            {date}
          </span>
        </div>
        <div className='d-block'>
          <h2 className='fw-normal'>
            {user2}
          </h2>
          <div className='user-contenders-profile'>
            profile pic
          </div>
        </div>
      </div>
    </div>
  )
}
