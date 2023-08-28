import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Check from '../assets/images/check.png';
import Work from '../assets/images/img.png';

const base_url = "https://todolist-api.hexschool.io/"

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(base_url  + 'users/sign_up', formData);
      if (res.data.status) {
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div id="loginPage" className="bg-yellow">
      <div className="conatiner loginPage vhContainer">
        <div className="side">
          <a href="/login" className='web-title'><img className="logoImg" src={Check} alt="checkIcon" />ONLINE TODO LIST</a>
          <img className="d-m-n" src={Work} alt="workImg" />
        </div>
        <div>
          <form className="formControls" action="index.html">
            <h2 className="formControls_txt">註冊帳號</h2>
            <label className="formControls_label" htmlFor="email">Email</label>
            <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" onChange={handleInputChange} required/>
            <label className="formControls_label" htmlFor="nickname">您的暱稱</label>
            <input className="formControls_input" type="text" name="nickname" id="nickname" placeholder="請輸入您的暱稱" onChange={handleInputChange}/>
            <label className="formControls_label" htmlFor="password">密碼</label>
            <input className="formControls_input" type="password" name="password" id="password" placeholder="請輸入密碼" onChange={handleInputChange} required/>
            <label className="formControls_label" htmlFor="confirmPassword">再次輸入密碼</label>
            <input className="formControls_input" type="password" name="confirmPassword" id="confirmPassword" placeholder="請再次輸入密碼" onChange={handleInputChange} required/>
            <input className="formControls_btnSubmit" type="button" onClick={handleSubmit} value="註冊帳號"/>
            <a className="formControls_btnLink" href="/login">登入</a>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;