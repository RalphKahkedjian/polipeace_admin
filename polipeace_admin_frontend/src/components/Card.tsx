import '../components/Card.css'
import 'bootstrap/dist/css/bootstrap.min.css';

interface CardProps {
  title: string,
  description: any
}

export default function Card({title, description}: CardProps) {
  return (
    <div className='card-container p-3'>
      <div className='d-block'>
        <h4 className='fw-normal'>
          {title}
        </h4>
        <h2 className='fw-bold'>
          {description}
        </h2>
      </div>
    </div>
  )
}
