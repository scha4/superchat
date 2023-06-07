import React from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";

function LoginForm() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Login
      </Typography>

      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Email" />
          <Input type="password" size="lg" label="Password" />
        </div>

        <Button className="mt-6" fullWidth type="onSubmit">
          LOGIN IN
        </Button>
        {err && <span className="text-red-400">Something Went Wrong</span>}
        <Typography color="gray" className="mt-4 text-center font-normal">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400">
            Sign Up
          </Link>
        </Typography>
      </form>
    </Card>
  );
  s;
}

export default LoginForm;
