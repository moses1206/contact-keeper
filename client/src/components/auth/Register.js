import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;

  const { regitser, error, clearErrors } = authContext;

  useEffect(() => {
    if (error === "아이디가 존재합니다. 다른 아이디를 입력해주세요!!") {
      setAlert(error, "danger");
      clearErrors();
    }
  }, [error]);

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
      regitser({
        username,
        userid,
        password,
      });
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
