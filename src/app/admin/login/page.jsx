'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import GoogleReCaptcha from '../../../components/GoogleReCaptcha';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdminAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!captchaToken) {
      setErrors({ captcha: 'Please verify the reCAPTCHA checkbox before proceeding.' });
      return;
    }

    setSubmitting(true);

    try {
      const res = await login(email, password);
      if (res && !res.success) {
        setErrors({ form: res.message || 'Invalid admin credentials' });
      } else {
        // toast.success('Admin login successful!'); // Handled in AdminAuthContext hook
      }
    } catch (err) {
      setErrors({ form: err.message || 'Admin login failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen lg:h-screen flex flex-col bg-[#07193b] text-slate-100 font-sans overflow-hidden">
      {/* Main Container Split: 50% Left Form / 50% Right Image */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side: Form Container (50% - Vertically Centered & Hidden Scrollbar) */}
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 sm:px-12 lg:px-16 py-8 h-full overflow-y-auto no-scrollbar relative z-10">
          <div className="w-full max-w-md my-auto">
            {/* Header Title & Copy */}
            <div className="mb-8 text-left space-y-2">
              <h1 className="text-3xl font-extrabold text-white font-righteous tracking-wide">
                Admin <span className="text-gradient-stakelab">Portal</span>
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed">
                Welcome back! Please enter your admin credentials.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username / Email Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.form) setErrors({});
                  }}
                  placeholder="admin@stakelab.io"
                  className="w-full h-12 bg-[#0c1424] border-0 outline-none focus:outline-none rounded-md px-4 text-white placeholder-slate-500 font-sans text-sm focus:ring-1 focus:ring-[#ff0044] transition-all shadow-inner"
                />
              </div>

              {/* Password Field with Toggle */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.form) setErrors({});
                    }}
                    placeholder="Enter admin password"
                    className="w-full h-12 bg-[#0c1424] border-0 outline-none focus:outline-none rounded-md px-4 pr-12 text-white placeholder-slate-500 font-sans text-sm focus:ring-1 focus:ring-[#ff0044] transition-all shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5 text-slate-400" /> : <Eye className="w-5 h-5 text-slate-400" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password Row */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center space-x-2 cursor-pointer group select-none">
                  <input
                    type="checkbox"
                    checked={keepMeLoggedIn}
                    onChange={(e) => setKeepMeLoggedIn(e.target.checked)}
                    className="w-4 h-4 rounded border-[#1c2844] bg-[#0c1424] text-[#ff0044] focus:ring-0 accent-[#ff0044] cursor-pointer"
                  />
                  <span className="text-xs text-slate-300 group-hover:text-white transition-colors">Keep me logged in</span>
                </label>

                <Link
                  href="/admin/forgot-password"
                  className="text-xs text-[#ff0044] hover:underline font-bold"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Official Google reCAPTCHA v2 Component */}
              <div className="pt-1">
                <GoogleReCaptcha
                  onVerify={(token) => {
                    setCaptchaToken(token);
                    if (errors.captcha) setErrors((prev) => ({ ...prev, captcha: '' }));
                  }}
                />
                {errors.captcha && (
                  <p className="text-red-400 text-xs mt-1.5 font-medium">{errors.captcha}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full btn-stakelab py-3 rounded-md text-white font-righteous text-sm tracking-wider uppercase font-bold transition-all shadow-lg shadow-red-500/20 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                {submitting ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <rect width="6" height="14" x="1" y="4" fill="currentColor">
                      <animate id="SVG9ovaHbIP" fill="freeze" attributeName="opacity" begin="0;SVGa89dAd4w.end-0.25s" dur="0.75s" values="1;.2" />
                    </rect>
                    <rect width="6" height="14" x="9" y="4" fill="currentColor" opacity=".4">
                      <animate fill="freeze" attributeName="opacity" begin="SVG9ovaHbIP.begin+0.15s" dur="0.75s" values="1;.2" />
                    </rect>
                    <rect width="6" height="14" x="17" y="4" fill="currentColor" opacity=".3">
                      <animate id="SVGa89dAd4w" fill="freeze" attributeName="opacity" begin="SVG9ovaHbIP.begin+0.3s" dur="0.75s" values="1;.2" />
                    </rect>
                  </svg>
                ) : (
                  'Login'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Auth Illustration Graphic (50% Equal Split - Local File Cropped) */}
        <div className="hidden lg:block w-1/2 h-full relative overflow-hidden bg-[#07193b]">
          <img
            src="/auth-bg.png"
            alt="StakeLab Admin Illustration"
            className="w-full h-full object-cover object-center scale-135 transform transition-transform duration-700"
          />
        </div>
      </div>
    </div>
  );
}
