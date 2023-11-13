import React from "react";
import {
  useLoaderData,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { loginUser } from "../../api";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/host";

  try {
    const data = await loginUser({ email, password });
    console.log(data)
    localStorage.setItem("loggedin", true);
    const response = redirect(pathname);
    response.body = true;
    return response;
  } catch (error) {
    return error.message;
  }
}

function Login() {
  const dataMessage = useLoaderData();
  const error = useActionData();
  const navigation = useNavigation();

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      <h1>{error}</h1>
      {dataMessage && <h3 className="red">{dataMessage}</h3>}
      <Form method="post" className="login-form" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Logging in" : "Log in"}
        </button>
      </Form>
    </div>
  );
}

export default Login;
