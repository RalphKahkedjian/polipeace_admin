import { useRef, useState } from 'react';
import AuthBackgroundImage from '../assets/images/Login.png';
import Button from '../components/Button';
import '../views/AuthForm.css';
import axiosClient from '../axiosClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/contextProvider';


export default function Registration() {

  const navigate = useNavigate()
  const {setUser,setToken} = useStateContext()

  const [isHovered, setIsHovered] = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);

  const registerUser = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();

    const payload = {
      username: usernameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      age: Number(ageRef.current?.value)
    };
    console.log(payload);

    axiosClient.post('/Admin/Register', payload)
    .then(({data})=> {
      console.log(data.admin.username)
      console.log(data.admin.email)
      console.log(data.admin.age)
      console.log(data.token)
      
      setUser(data.admin.username)
      setToken(data.token)
      navigate('/')
    })
    .catch(err=> {
      const response = err.response;
      console.log(response)
    })
  };

  return (
    <div className='auth-container w-100'>
    <div className='d-flex'>
      <div className='auth-form'>
        <div className='d-block'>
          <div>
            <h1 className='fw-light'>Polipeace</h1>
          </div>
          <div className='auth-input-field d-block'>
            <input type='text' placeholder='Enter your name' ref={usernameRef} />
            <input type='email' placeholder='Enter your email' ref={emailRef} />
            <input type='password' placeholder='Enter your password' ref={passwordRef} />
            <input type='number' placeholder='Enter your age' ref={ageRef} />
            <div className='mt-5'>
              <Button
                width={170}
                height={45}
                text='Register'
                color={isHovered ? '#642C4B' : '#F3ECEF'}
                backgroundColor={isHovered ? 'white' : '#642C4B'}
                borderRadius='8px'
                border='2px solid #642C4B'
                paddingTop={6.5}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={registerUser}
              />
              <p className='mt-2' style={{fontSize:'.8em'}}>
                Already have an account? <Link to='/login'> <span style={{color:'black', textDecoration:'underline'}}>Login</span></Link>
              </p>
            </div>
          </div>
        </div>
        <div style={{
          position: 'absolute',
          bottom: '0px',
          fontSize: '.8em',
          color: '#642C4B'
        }}>
          <p>&copy; Ralph Kahkedjian 2025</p>
        </div>
      </div>
      <div className='auth-bg'>
        <img src={AuthBackgroundImage} alt='background-image-authpage' />
      </div>
    </div>
  </div>  
  );
}
