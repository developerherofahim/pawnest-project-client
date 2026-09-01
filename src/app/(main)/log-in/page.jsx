import AuthLayout from '@/components/auth/AuthLayout';
import React from 'react';

export const metadata = {
  title: "Log In | Pawnest",
  description: "Log in to explore your loving pets.",
};

const LogInPage = () => {
    return (
        <div>
            <AuthLayout/>
        </div>
    );
};

export default LogInPage;