import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Check from '../assets/images/check.png';
import Work from '../assets/images/img.png';
import PropTypes from 'prop-types';

const base_url = "https://todolist-api.hexschool.io/"

function Login({ setToken }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      const res = await axios.post(base_url  + 'users/sign_in', formData);
      const { token } = res.data;
      setToken(token);
      if (res.data.status) {
        navigate('/todos');
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
            <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
            <label className="formControls_label" htmlFor="email">Email</label>
            <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 Email" onChange={handleInputChange} required />
            <label className="formControls_label" htmlFor="password">密碼</label>
            <input className="formControls_input" type="password" name="password" id="password" placeholder="請輸入密碼" onChange={handleInputChange} required />
            <input className="formControls_btnSubmit" type="button" onClick={handleSubmit} value="登入" />
            <a className="formControls_btnLink" href="/register">註冊帳號</a>
          </form>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login;