import '../Contenders/UserContenders.css'

interface UserContenderProps {
  user1: string,
  user2: string,
  date: any
}

export default function UserContenders({user1, user2, date}: UserContenderProps) {
  return (
    <div className="user-contender-container">
      <div className='d-flex mt-3 justify-content-between mt-5 p-4'>
        <div className='d-block'>
          <div className='user-contender-profile'></div>
          <div className='m-2'>{user1}</div>
        </div>
        <div>
          <strong className='m-5'>
          {date}
        </strong>
        </div>
        <div className='d-block'>
          <div className='user-contender-profile'></div>
          <div className='m-2'>{user2}</div>
        </div>
      </div>
    </div>
  )
}
