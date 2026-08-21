'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import api from '../lib/api';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem('stakelab_admin');
    if (saved) {
      try {
        setAdmin(JSON.parse(saved));
      } catch (e) {}
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/admin/auth/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('stakelab_admin_token', res.data.token);
        localStorage.setItem('stakelab_admin', JSON.stringify(res.data.admin));
        setAdmin(res.data.admin);
        toast.success('Admin login successful!');
        router.push('/admin/dashboard');
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Admin login failed';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const requestPasswordReset = async (email) => {
    try {
      const res = await api.post('/auth/forgot-password', { email });
      if (res.data.success) {
        toast.success(res.data.message || 'OTP code sent to admin email!');
        return { success: true, message: res.data.message };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to send OTP code';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const verifyOtp = async (email, otp) => {
    try {
      const res = await api.post('/auth/verify-otp', { email, otp });
      if (res.data.success) {
        toast.success(res.data.message || 'OTP verified successfully!');
        return { success: true, message: res.data.message };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid or expired OTP code';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const resetPassword = async (email, password) => {
    try {
      const res = await api.post('/auth/reset-password', { email, password });
      if (res.data.success) {
        toast.success(res.data.message || 'Admin password reset successfully!');
        return { success: true, message: res.data.message };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to reset password';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    localStorage.removeItem('stakelab_admin_token');
    localStorage.removeItem('stakelab_admin');
    setAdmin(null);
    toast.info('Admin logged out');
    router.push('/admin/login');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        loading,
        login,
        requestPasswordReset,
        verifyOtp,
        resetPassword,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
