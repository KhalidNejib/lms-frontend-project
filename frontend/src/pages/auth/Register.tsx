import React, { useState } from 'react';
import Loader from '../../components/ui/Loader';
import ErrorMessage from '../../components/ui/ErrorMessage';
import axios from 'axios';

const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
  
    const { name, email, password, confirmPassword } = formData;
  
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }
  
    try {
      axios.post('/api/register', formData)
      
      console.log('Register attempt:', formData);
    } catch (err: any) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row justify-content-center w-100">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h2 className="card-title">Create your account</h2>
                <p className="text-muted">Fill in the form below to create your account</p>
              </div>
              <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter your full name.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter a password.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Please confirm your password.
                  </div>
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="agreeTerms" required />
                  <label className="form-check-label" htmlFor="agreeTerms">
                    I agree to the <a href="#" className="text-decoration-none">Terms of Service</a>
                  </label>
                </div>
                {isLoading && <Loader />}
                   {error && <ErrorMessage message={error} />}

                <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
                </button>

              </form>
              <div className="text-center mt-3">
                <p className="mb-0">
                  Already have an account? <a href="#" className="text-decoration-none">Sign in</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 