
import React, { useState } from 'react';
import Loader from '../ui/Loader';
import ErrorMessage from '../ui/ErrorMessage';
import axios from 'axios'

type Props = {
  onSubmit: (email: string, password: string) => void;
};

const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      
      await axios.post('/api/login', { email, password });
      onSubmit(email, password);
    } catch (err: any) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}

      <div className="d-grid mt-3">
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
