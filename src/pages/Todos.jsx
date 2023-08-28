import Check from '../assets/images/check.png';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '../Middleware/useToken';

function Todos() {
  const { token, setToken } = useToken();
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState([]);
  if (!token) {
    navigate('/login');
  }
  
  const base_url = "https://todolist-api.hexschool.io/"

  const getTodoList = async () => {
    try {
      const res = await axios.get(base_url + 'todos', {
        headers: {
          'Authorization': token}
        });
      setTodoList(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  const signOut = async () => {
    try {
      const res = await axios.post(base_url + 'users/sign_out');
      setToken('');
      if (res.status) {
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getTodoList();
  }, [])

  return (
    <div id="todoListPage" className="bg-half">
      <nav>
        <a href="/todos" className='web-title'><img className="logoImg" src={Check} alt="checkIcon" />ONLINE TODO LIST</a>
        <ul>
          <li className="todo_sm"><a href="/"><span>王小明的代辦</span></a></li>
          <li><a href="" onClick={signOut}>登出</a></li>
        </ul>
      </nav>
      <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
          <div className="inputBox">
              <input type="text" placeholder="請輸入待辦事項" />
              <a href="#">
                <i className="fa fa-plus"></i>
              </a>
          </div>
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
                        <a href="#">
                          <i className="fa fa-times"></i>
                        </a>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Todos;