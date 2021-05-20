import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (
      error === "아이디가 정확하지 않습니다.!!" ||
      error === "패스워드가 정확하지 않습니다!!"
    ) {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    userid: "",
    password: "",
  });

  const { userid, password } = user;

  const onChange = (e) =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    if (userid === "" || password === "") {
      setAlert("모든 항목을 입력해주세요!!", "danger");
    } else {
      login({
        userid,
        password,
      });
    }
  };

  return (
    <div className="form-container">
      <h1 className="text-primary">로그인</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="userid">아이디</label>
          <input
            type="text"
            name="userid"
            value={userid}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">패스워드</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>

        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
          required
        />
      </form>
    </div>
  );
};

export default Login;
