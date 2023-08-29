import Check from '../assets/images/check.png';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Empty from '../assets/images/Empty.png';

function Todos() {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState([]);
  const [nickname, setNickname] = useState('');
  const [newTodo, setNewTodo] = useState('');
  
  const base_url = "https://todolist-api.hexschool.io/"

  function getNicknameFromToken(token) {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const parsedPayload = JSON.parse(decodedPayload);
      return parsedPayload.nickname || 'Unknown';
    } catch (error) {
      console.error('Error decoding token:', error);
      return 'Unknown';
    }
  }

  const getTodoList = async () => {
    const localToken = localStorage.getItem('token');
    try {
      const res = await axios.get(`${base_url}todos`, {
        headers: {
          'Authorization': localToken}
        });
      setTodoList(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  const signOut = async () => {
    const localToken = localStorage.getItem('token');
    try {
      const res = await axios.post(`${base_url}users/sign_out`, {}, {
        headers: {
          'Authorization': localToken}
        });
      if (res.status) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  }

  const addTodo = async () => {
    const localToken = localStorage.getItem('token');
    try {
      const res = await axios.post(`${base_url}todos`, newTodo, {
        headers: {
          'Authorization': localToken}
        });
      if (res.status) {
        getTodoList();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const deleteTodo = async (id) => {
    const localToken = localStorage.getItem('token');
    try {
      const res = await axios.delete(`${base_url}todos/${id}`, {
        headers: {
          'Authorization': localToken}
        });
      if (res.status) {
        getTodoList();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleInputChange = (e) => {
    const { value } = e.target;
    setNewTodo({
      content: value,
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    const userNickname = getNicknameFromToken(token);
    setNickname(userNickname);
    getTodoList();
  }, [])

  return (
    <div id="todoListPage" className="bg-half">
      <nav>
        <a href="/" className='web-title'><img className="logoImg" src={Check} alt="checkIcon" />ONLINE TODO LIST</a>
        <ul>
          <li className="todo_sm"><a href="/"><span>{nickname}的代辦</span></a></li>
          <li><button onClick={signOut}>登出</button></li>
        </ul>
      </nav>
      <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
          <div className="inputBox">
              <input type="text" name="content" placeholder="請輸入待辦事項" onChange={handleInputChange}/>
              <button onClick={addTodo}>
                <i className="fa fa-plus"></i>
              </button>
          </div>   
          { todoList.length === 0 ? (
            <div className="container" style={{maxWidth: "300px", marginTop: "100px"}}>
              <div className="d-flex flex-column align-items-center">
                <h4>目前沒有待辦事項</h4>
                <p>請按右上角「+」新增待辦事項</p>
                <img className="img-fluid" src={Empty} alt="workImg" />
              </div>
            </div>
              ) : (
                <div className="todoList_list">
                  <ul className="todoList_tab">
                    <li><a href="#" className="active">全部</a></li>
                    <li><a href="#">待完成</a></li>
                    <li><a href="#">已完成</a></li>
                  </ul>
                  <div className="todoList_items">
                    <ul className="todoList_item">
                      {
                        todoList.map((todo) => {
                          return (
                            <li key={todo.id}>
                              <label className="todoList_label">
                                <input className="todoList_input" type="checkbox" value="true" />
                                <span>{todo.content}</span>
                              </label>
                              <button onClick={deleteTodo(todo.id)}>
                                <i className="fa fa-times"></i>
                              </button>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                </div>
              )
            }
        </div>
      </div>
    </div>
  )
}

export default Todos;