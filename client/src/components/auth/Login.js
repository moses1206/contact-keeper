import React, { useState } from "react";

const Login = () => {
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
    console.log("Login Submit");
  };

  return (
    <div className="form-container">
      <h1 className="text-primary">로그인</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="userid">아이디</label>
          <input type="text" name="userid" onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">패스워드</label>
          <input type="password" name="password" onChange={onChange} />
        </div>

        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
