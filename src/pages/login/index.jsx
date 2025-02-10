import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { BaseUrl, URIS } from '../../services/apis/apis';
import { message } from 'antd';

 function Login() {
  // State variables for form values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [cookies, setCookie] = useCookies();


  useEffect(()=>{
    if(cookies?.access_token){
        window.location.href = '/';
    }
  },[cookies?.access_token])

  // Function to handle form submission
  const _login = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch(BaseUrl+URIS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username:email,
          password:password,
        }),
      });

      if (!response.ok) {
        message.warning("Credentials are incorrect")
        setData(null)
      }

      else{
        const result = await response.json();
        setData(result); 
        setEmail(''); //
        setPassword(''); 
        setError(null); 

        const expires = new Date(Date.now() + 1 * 3600 * 1000);
        setCookie("access_token",result?.access_token,{ expires, path: '/' })
        window.location.href = '/';

      }

    } catch (error) {
      setError(error.message); 
    }
  };

  return (
    <section className="flex justify-center align-middle pt-24 py-20 bg-cover bg-center" style={{backgroundImage:"url(./assets/images/RegisterPageBg.png)"}}>
      <div className="flex relative flex-col items-center max-w-full w-[1130px] max-md:px-5 max-md:pt-24 bg-[#fff] rounded-[6px] ">
        <div className="relative max-w-full max-md:mb-2.5">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full justify-center pt-20 pb-28 px-20">
              <img loading="lazy" src="./assets/images/siteLogo.png" alt="Login illustration" className="object-contain mt-14 aspect-[4.08] w-[383px] max-md:mt-10" />
              <img src="./assets/images/login_gif.gif" alt="" />
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full justify-center pt-20 pb-28 px-20 bg-[#EFF2FB] border-[14px] border-white rounded-[20px]">
              <form className="flex relative flex-col w-full text-sm text-black max-md:mt-10" onSubmit={_login}>
                <h2 className="self-start text-3xl font-semibold">Login</h2>
                <label htmlFor="email" className="self-start mt-10">Email Address</label>
                <div className="flex gap-3 px-4 py-3 mt-3.5 bg-white rounded border border-solid border-slate-200 shadow-[0px_1px_34px_rgba(42,73,167,0.08)] text-slate-400">
                  <img loading="lazy" src="./assets/images/email_input_icon.png" alt="" className="object-contain shrink-0 w-[18px] aspect-square" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                    id="email"
                    placeholder="Enter email address"
                    className="flex-auto my-auto w-[301px] bg-transparent border-none focus:outline-none"
                  />
                </div>
                <label htmlFor="password" className="self-start mt-3">Password</label>
                <div className="flex gap-5 justify-between px-4 py-3 mt-3 w-full bg-white rounded shadow-[0px_1px_34px_rgba(42,73,167,0.08)] text-slate-400">
                  <div className="flex gap-6 self-start">
                    <img loading="lazy" src="./assets/images/password_input_icon.png" alt="" className="object-contain shrink-0 aspect-[0.95] w-[18px]" />
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      type="password"
                      id="password"
                      placeholder="Enter password"
                      className="basis-auto bg-transparent border-none focus:outline-none"
                    />
                  </div>
                  <button type="button" aria-label="Toggle password visibility" className="bg-transparent border-none cursor-pointer">
                    <img loading="lazy" src="./assets/images/bxs_show.png" alt="" className="object-contain shrink-0 aspect-square w-[22px]" />
                  </button>
                </div>
                <a href="#" className="self-end mt-3 text-xs font-medium text-blue-800">Forgot Password?</a>
                <button type="submit" className="px-16 py-4 mt-6 text-base font-semibold text-white whitespace-nowrap bg-blue-500 rounded shadow-[0px_1px_34px_rgba(42,73,167,0.08)] max-md:px-5">
                  Login
                </button>
                {error && <p className="self-center mt-4 text-xs font-medium text-red-500">{error}</p>}
                {data && <p className="self-center mt-4 text-xs font-medium text-green-500">Login successful!</p>}
                <p className="self-center mt-4 text-xs font-medium text-slate-400">
                  Don't have an account? <Link to="/registration" className="text-blue-600 underline">Create your account</Link>
                </p>
                <div className="flex gap-1.5 items-center mt-5 text-xs font-medium whitespace-nowrap text-slate-400 max-md:mr-0.5">
                  <span className='w-[175px] bg-[#ADBEE1] h-[1px] inline-block'></span>
                  <span className="self-stretch">OR</span>
                  <span className='w-[175px] bg-[#ADBEE1] h-[1px] inline-block'></span>
                </div>
                <div className="flex gap-4 mt-6 text-xs font-medium text-center">
                  <button type="button" className="flex flex-1 gap-2.5 px-3.5 py-3 rounded border border-indigo-300 border-solid bg-slate-100 shadow-[0px_1px_34px_rgba(42,73,167,0.08)] min-w-[182px] align-middle">
                    <img loading="lazy" src="./assets/images/devicon_google.png" alt="Google logo" className="object-contain shrink-0 aspect-square w-[22px]" />
                    <span className="my-auto basis-auto">Continue with Google</span>
                  </button>
                  <button type="button" className="flex flex-1 gap-2 px-6 py-3 rounded border border-indigo-300 border-solid bg-slate-100 shadow-[0px_1px_34px_rgba(42,73,167,0.08)] max-md:px-5 min-w-[182px] align-middle">
                    <img loading="lazy" src="./assets/images/single_sign_on 1.png" alt="SSO logo" className="object-contain shrink-0 aspect-square w-[22px]" />
                    <span className="my-auto basis-auto">Continue with SSO</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
