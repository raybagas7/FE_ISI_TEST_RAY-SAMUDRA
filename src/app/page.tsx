'use client';

// import { signIn } from '@/lib/auth';
import { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // const handleSubmitLogin = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   setError('');
  //   setSuccess('');

  //   try {
  //     const response = await fetch('/api/register', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!response.ok) {
  //       const data = await response.json();
  //       setError(data.error || 'Something went wrong');
  //       return;
  //     }

  //     setSuccess('Account created successfully! 🎉');
  //     setFormData({ name: '', email: '', password: '' });
  //   } catch (err) {
  //     setError('Failed to register. Please try again.');
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: true,
      callbackUrl: '/dashboard',
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-4 shadow-md rounded-lg"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>

        <div className="flex flex-col gap-3">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <button
            type="submit"
            className="mt-2 bg-black text-white py-2 px-4 rounded-md"
          >
            Sign Up
          </button>
        </div>
      </form>

      {/* <form onSubmit={handleSubmitLogin}>
        <input type="email" name="email" required />
        <input type="password" name="password" required />
        <button type="submit">Sign In</button>
      </form> */}
    </main>
  );
}
