import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Registration() {
  // State variables for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industryType, setIndustryType] = useState('');
  const [strength, setStrength] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const _signIn = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password || !reenterPassword || !companyName || !industryType || !strength) {
      setError('All fields are required');
      return;
    }

    if (password !== reenterPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8060/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          company_name: companyName,
          company_department: industryType,
          company_size: strength,
          company_industries: industryType,
          password,
          tenant_id: 1,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail?.[0]?.msg || 'Registration failed');
        return;
      }

      const result = await response.json();
      setSuccess('Registration successful');
      setError('');
      // Optionally, reset the form fields here
      setName('');
      setEmail('');
      setPassword('');
      setReenterPassword('');
      setCompanyName('');
      setIndustryType('');
      setStrength('');
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <section className="flex justify-center align-middle pt-24 py-20 bg-cover bg-center" style={{ backgroundImage: "url(./assets/images/RegisterPageBg.png)" }}>
      <div className="flex relative flex-col items-center px-20 pt-9 pb-10 max-w-full min-h-[821px] w-[1100px] max-md:px-5 max-md:pt-24 bg-[#EFF2FB] border-[14px] border-white rounded-2xl">
        <div className='w-[300px] mx-auto mb-6'>
          <img src="./assets/images/siteLogo.png" alt="" className='w-full block' />
        </div>
        <div className="flex relative flex-col max-w-full w-[786px]">
          <h1 className="self-center text-3xl font-semibold text-black">Registration</h1>
          <form className="flex flex-col w-full" onSubmit={_signIn}>
            {/* Form Fields */}
            <label htmlFor="name" className="self-start mt-6 text-sm text-black">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{lineHeight:"1.5em"}}
              className="px-[40px] py-[17px] mt-3.5 text-xs bg-white rounded border border-solid border-slate-200 shadow-[0px_1px_34px_rgba(42,73,167,0.08)] text-slate-400 max-md:px-3 max-md:mr-0.5 max-md:max-w-full"
            />

            <div className="flex flex-wrap gap-7 mt-4 whitespace-nowrap max-md:mr-0.5 max-md:max-w-full">
              {/* Email Field */}
              <div className="flex flex-col flex-1 grow shrink-0 basis-0 w-fit">
                <label htmlFor="email" className="self-start text-sm text-black">Email</label>
                <div className="flex gap-2.5 px-3.5 py-3 mt-3.5 text-xs bg-white rounded shadow-[0px_1px_34px_rgba(42,73,167,0.08)] text-slate-400">
                  <img loading="lazy" src="./assets/images/email_input_icon.png" alt="" className="object-contain shrink-0 aspect-square w-[19px]" />
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-auto my-auto w-[324px] bg-transparent border-none"
                  />
                </div>
              </div>
              {/* Strength Field */}
              <div className="flex flex-col flex-1 grow shrink-0 basis-0 w-fit">
                <label htmlFor="strength" className="self-start text-sm text-black">Strength</label>
                <select
                  id="strength"
                  value={strength}
                  onChange={(e) => setStrength(e.target.value)}
                  className="px-4 py-3 mt-3.5 text-xs bg-white rounded shadow-[0px_1px_34px_rgba(42,73,167,0.08)] text-slate-400 max-md:pr-5"
                >
                  <option value="">Select Strength</option>
                  <option value="new">New</option>
                  <option value="small">Small (1-50 employees)</option>
                  <option value="medium">Medium (51-200 employees)</option>
                  <option value="large">Large (201-500 employees)</option>
                  <option value="enterprise">Enterprise (500+ employees)</option>
                  {/* Add options here */}
                </select>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-7 mt-4">
              {/* Password Field */}
              <div className="flex flex-col flex-1 grow shrink-0 basis-0 w-fit">
                <label htmlFor="password" className="self-start text-sm text-black">Password</label>
                <div className="flex gap-5 justify-between p-3.5 mt-3 w-full text-xs bg-white rounded shadow-[0px_1px_34px_rgba(42,73,167,0.08)] text-slate-400">
                  <div className="flex gap-2.5">
                    <img loading="lazy" src="./assets/images/password_input_icon.png" alt="" className="object-contain shrink-0 aspect-[0.95] w-[18px]" />
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="my-auto bg-transparent border-none"
                    />
                  </div>
                  <img loading="lazy" src="./assets/images/bxs_show.png" alt="Toggle password visibility" className="object-contain shrink-0 aspect-square w-[19px]" />
                </div>
              </div>
              {/* Reenter Password Field */}
              <div className="flex flex-col flex-1 grow shrink-0 basis-0 w-fit">
                <label htmlFor="reenterPassword" className="self-start text-sm text-black">Reenter Password</label>
                <div className="flex gap-5 justify-between p-3.5 mt-3 w-full text-xs bg-white rounded shadow-[0px_1px_34px_rgba(42,73,167,0.08)] text-slate-400">
                  <div className="flex gap-2.5">
                    <img loading="lazy" src="./assets/images/password_input_icon.png" alt="" className="object-contain shrink-0 aspect-[0.95] w-[18px]" />
                    <input
                      type="password"
                      id="reenterPassword"
                      placeholder="Reenter password"
                      value={reenterPassword}
                      onChange={(e) => setReenterPassword(e.target.value)}
                      className="my-auto bg-transparent border-none"
                    />
                  </div>
                  <img loading="lazy" src="./assets/images/bxs_show.png" alt="Toggle password visibility" className="object-contain shrink-0 aspect-square w-[19px]" />
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-7 mt-4 max-md:max-w-full">
              {/* Industry Type Field */}
              <div className="flex flex-col flex-1 grow shrink-0 basis-0 w-fit">
                <label htmlFor="industryType" className="self-start text-sm text-black">Industry Type</label>
                <select
                  id="industryType"
                  value={industryType}
                  onChange={(e) => setIndustryType(e.target.value)}
                  className="px-4 py-3.5 mt-3 text-xs bg-white rounded shadow-[0px_1px_34px_rgba(42,73,167,0.08)] text-slate-400 max-md:pr-5"
                >
                  <option value="">Industry Type</option>
                  <option value="it">IT</option>
                  {/* Add options here */}
                </select>
              </div>
              {/* Company Name Field */}
              <div className="flex flex-col flex-1 grow shrink-0 basis-0 w-fit">
                <label htmlFor="companyName" className="self-start text-sm text-black">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="px-3.5 py-3.5 mt-3 text-xs bg-white rounded shadow-[0px_1px_34px_rgba(42,73,167,0.08)] text-slate-400 max-md:pr-5"
                />
              </div>
            </div>
            
         
            
            {/* Submit Button */}
            <button type="submit" className="self-center px-10 py-3.5 mt-11 max-w-full text-base font-semibold text-white whitespace-nowrap bg-blue-500 rounded shadow-[0px_1px_34px_rgba(42,73,167,0.08)] w-[280px] max-md:px-5 max-md:mt-10">
              Register
            </button>

            {/* Error and Success Messages */}
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && <p className="text-green-500 mt-4">{success}</p>}
          </form>
          
          <p className="self-center mt-4 text-xs font-medium text-center text-slate-400">
            Already have an account? <Link to="/login" className="text-blue-600 underline">Login</Link>
          </p>
          
          <div className="flex gap-1.5 items-center self-center mt-4 max-w-full text-xs font-medium whitespace-nowrap text-slate-400 w-[378px]">
            <span className='w-[175px] bg-[#ADBEE1] h-[1px] inline-block'></span>
            <span className="self-stretch">OR</span>
            <span className='w-[175px] bg-[#ADBEE1] h-[1px] inline-block'></span>
          </div>
          
          <div className="flex gap-4 self-center mt-5 max-w-full text-xs font-medium text-center text-black">
            <button className="flex flex-1 gap-2.5 px-3.5 py-3 rounded border border-indigo-300 border-solid bg-slate-100 shadow-[0px_1px_34px_rgba(42,73,167,0.08)] min-w-[182px]">
              <img loading="lazy" src="./assets/images/devicon_google.png" alt="Google logo" className="object-contain shrink-0 aspect-square w-[22px]" />
              <span className="my-auto basis-auto">Continue with Google</span>
            </button>
            <button className="flex flex-1 gap-2 px-6 py-3 rounded border border-indigo-300 border-solid bg-slate-100 shadow-[0px_1px_34px_rgba(42,73,167,0.08)] max-md:px-5 min-w-[180px]">
              <img loading="lazy" src="./assets/images/single_sign_on 1.png" alt="SSO logo" className="object-contain shrink-0 aspect-square w-[22px]" />
              <span className="my-auto basis-auto">Continue with SSO</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
