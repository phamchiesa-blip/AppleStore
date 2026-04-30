import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

// Dành cho Guest (Chưa đăng nhập): Không cho phép người đã đăng nhập vào trang login/signup
export const GuestRoute = () => {
  const { user } = useAuthStore();
  
  // Nếu đã đăng nhập thì đá về trang chủ
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
};

// Dành cho User (Đã đăng nhập - user hoặc admin đều được)
export const UserRoute = () => {
  const { user } = useAuthStore();
  
  // Nếu chưa đăng nhập thì đá về trang login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};

// Dành cho Admin (Bắt buộc phải là admin)
export const AdminRoute = () => {
  const { user } = useAuthStore();
  
  // Nếu chưa đăng nhập, hoặc đã đăng nhập nhưng không phải admin -> Đá về trang chủ (hoặc login)
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
};
