import '../Posts/PostCard.css'
import AnalyzeIcon from '../../assets/images/AnalyzeIcon.png'

export default function PostCard() {
  return (
    <div className="postcard" style={{display:'flex', flexDirection:'column'}}>
      <div className="post_header">
        <div className="d-flex justify-content-between">
          <div>
            userid
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
        picture
      </div>
    </div>
  )
}
