import '../Posts/PostCard.css'
import AnalyzeIcon from '../../assets/images/AnalyzeIcon.png'

interface PostCardProps {
  username: string|any,
  post_id: number,
  picture_url: string|any,
  description: string,
  created_at: string,
}

export default function PostCard({username, picture_url, description, created_at}: PostCardProps) {
  return (
    <div className="postcard" style={{display:'flex', flexDirection:'column'}}>
      <div className="post_header">
        <div className="d-flex justify-content-between">
          <div>
            <h3>{username}</h3>
            <p className='mt-2'>
              {created_at}
            </p>
          </div>
          <div className='analyzeIcon'>
            <img src={AnalyzeIcon} style={{
              width:'2em',
              height:'2em'
            }} />
          </div>
        </div>
      </div>
      <div style={{
        width:'100%',
        height:'.05em',
        backgroundColor:'grey',
        marginTop:'10px',
        marginBottom:'10px'
      }} />
      <div className="post_body">
        <h5 style={{
          marginTop:'15px'
        }}>
          {description}
        </h5>
        <img src={picture_url} style={{
        borderRadius:'20px',
        marginTop:'15px',
        width:'100%'
      }} />
      </div>
      <div style={{
        marginTop:'20px',
      }}>
        
      </div>
    </div>
  )
}
