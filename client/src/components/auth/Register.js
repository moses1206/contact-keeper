import React, { useState, useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

const Register = () => {
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const [user, setUser] = useState({
    username: "",
    userid: "",
    password: "",
    password2: "",
  });

  const { username, userid, password, password2 } = user;

  const onChange = (e) =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();

    if (username === "" || userid === "" || password === "") {
      setAlert("모든 필드를 채워주세요!!", "danger");
    } else if (password !== password2) {
      setAlert("패스워드가 일치하지 않습니다.!!", "danger");
    } else {
      console.log("Register Submit");
    }
  };

  return (
    <div className="form-container">
      <h1 className="text-primary">가입하기</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">이름</label>
          <input type="text" name="username" onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="userid">아이디</label>
          <input type="text" name="userid" onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">패스워드</label>
          <input
            type="password"
            name="password"
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">패스워드 확인</label>
          <input
            type="password"
            name="password2"
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
