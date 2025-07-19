import React from 'react';

const Sidebar: React.FC = () => (
  <aside className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
    <div className="position-sticky pt-3">
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link active" href="#">
            <i className="bi bi-house-door me-2"></i>
            Dashboard
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="bi bi-book me-2"></i>
            Courses
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="bi bi-gear me-2"></i>
            CMS
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="bi bi-people me-2"></i>
            Users
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="bi bi-graph-up me-2"></i>
            Analytics
          </a>
        </li>
      </ul>
    </div>
  </aside>
);

export default Sidebar; 