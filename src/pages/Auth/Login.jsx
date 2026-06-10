import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { login, fetchMe } from '@/features/auth/authSlice';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Seo } from '@/components/common/Seo';

export default function Login() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await dispatch(login(data)).unwrap();
      if (res) {
        await dispatch(fetchMe());
        toast.success('Welcome back');
        navigate(params.get('next') || '/account', { replace: true });
      }
    } catch (err) {
      toast.error(typeof err === 'string' ? err : err?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="container-x py-16 md:py-24 max-w-md mx-auto">
      <Seo title="Sign In" />
      <h1 className="font-serif text-3xl md:text-4xl text-center">Welcome Back</h1>
      <p className="text-center text-brand-muted mt-2">Sign in to your account</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-5">
        <Input
          label="Email" type="email" autoComplete="email"
          {...register('email', { required: 'Required' })}
          error={errors.email?.message}
        />
        <Input
          label="Password" type="password" autoComplete="current-password"
          {...register('password', { required: 'Required' })}
          error={errors.password?.message}
        />
        <Button type="submit" disabled={loading} fullWidth>
          {loading ? 'Signing in…' : 'Sign In'}
        </Button>
      </form>

      <div className="text-center mt-6 text-sm">
        <Link to="/auth/forgot" className="text-brand-muted hover:text-brand-maroon">Forgot password?</Link>
      </div>
      <div className="text-center mt-2 text-sm">
        New here? <Link to="/auth/register" className="text-brand-maroon underline">Create an account</Link>
      </div>
    </div>
  );
}
