import { useState } from 'react';
import AuthBackgroundImage from '../assets/images/Login.png';
import Button from '../components/Button';
import '../views/Registration.css';

export default function Registration() {

  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className='registration-container'>
      <div className='d-flex'>
        <div className='registration-form'>
          <div className='d-block'>
            <div>
              <h1 className='fw-light'>
                Polipeace
              </h1>
            </div>
            <div className='registration-input-field d-block'>
              <input type='text' placeholder='Enter your name' />
              <input type='email' placeholder='Enter your email' />
              <input type='password' placeholder='Enter your password' />
              <input type='number' placeholder='Enter your age' />
            </div>
          </div>
          <div className='mt-5'>
          <Button
            width={180}
            height = {48}
            text='Register'
            color= {isHovered ? '#642C4B' : '#F3ECEF'} 
            backgroundColor= {isHovered ? '#F3ECEF' : '#642C4B'}
            borderRadius='8px'
            border='2px solid #642C4B'
            paddingTop={8}
            onMouseEnter={()=> setIsHovered(true)}
            onMouseLeave={()=> setIsHovered(false)}
          />
          </div>
        </div>
        <div className='registration-bg'>
          <img src={AuthBackgroundImage} alt='background-image-authpage' />
        </div>
      </div>
    </div>
  );
}
