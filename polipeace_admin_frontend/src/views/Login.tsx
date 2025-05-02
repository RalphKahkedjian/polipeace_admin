import { useRef, useState } from 'react';
import AuthBackgroundImage from '../assets/images/Login.png';
import Button from '../components/Button';
import '../views/AuthForm.css';
import axiosClient from '../axiosClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/contextProvider';


export default function Login() {

  const navigate = useNavigate()
  const {setUser, setToken, setEmail, setAge, setID} = useStateContext()

  const [isHovered, setIsHovered] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const registerUser = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();

    const payload = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    console.log(payload);
    axiosClient.post('/Admin/Login', payload)
    .then(({data})=> {
      console.log(data.admin.username)
      console.log(data.admin.email)
      console.log(data.admin.age)
      console.log(data.token)
      setUser(data.admin.username)
      setToken(data.token)
      setEmail(data.admin.email)
      setAge(data.admin.age)
      setID(data.admin.id)
      navigate('/');
    })
    .catch(err=> {
      const response = err.response;
      console.log(response)
    })
  };

  return (
    <div className='auth-container w-100 '>
    <div className='d-flex'>
      <div className='auth-form'>
        <div className='d-block'>
          <div>
            <h1 className='fw-light'>Polipeace</h1>
          </div>
          <div className='auth-input-field d-block'>
            <input type='email' placeholder='Enter your email' ref={emailRef} />
            <input type='password' placeholder='Enter your password' ref={passwordRef} />
            <div className='mt-5'>
              <Button
                width={170}
                height={45}
                text='Login'
                color={isHovered ? '#4B1F3E' : '#F3ECEF'}
                backgroundColor={isHovered ? 'white' : '#4B1F3E'}
                borderRadius='8px'
                border='2px solid #642C4B'
                paddingTop={6.5}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={registerUser}
              />
              <p className='mt-3' style={{fontSize:'.8em'}}>
                Don't have an account? <Link to='/register'> <span style={{color:'black', textDecoration:'underline'}}>Register</span></Link>
              </p>
            </div>
          </div>
        </div>
        <div style={{
          position: 'absolute',
          bottom: '0px',
          fontSize: '.8em',
          color: '#4B1F3E'
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
