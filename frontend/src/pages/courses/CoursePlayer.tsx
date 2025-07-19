import React from 'react';
import Layout from '../../components/common/Layout';

const CoursePlayer: React.FC = () => {
  const currentModule = {
    id: 3,
    title: 'State and Lifecycle',
    content: 'This module covers React state management and component lifecycle methods.',
    videoUrl: 'https://example.com/video.mp4',
    duration: '45 minutes',
    progress: 60,
  };

  return (
    <Layout>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-lg-8">
            <div className="card shadow mb-4">
              <div className="card-header">
                <h5 className="card-title mb-0">{currentModule.title}</h5>
              </div>
              <div className="card-body">
                <div className="ratio ratio-16x9 mb-3">
                  <video
                    className="embed-responsive-item"
                    controls
                    poster="https://via.placeholder.com/800x450"
                  >
                    <source src={currentModule.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="progress mb-3">
                  <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{ width: `${currentModule.progress}%` }}
                    aria-valuenow={currentModule.progress} 
                    aria-valuemin={0} 
                    aria-valuemax={100}
                  >
                    {currentModule.progress}%
                  </div>
                </div>
                <p className="text-muted">Duration: {currentModule.duration}</p>
                <p>{currentModule.content}</p>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow mb-4">
              <div className="card-header">
                <h6 className="card-title mb-0">Course Navigation</h6>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  <a href="#" className="list-group-item list-group-item-action active">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1">State and Lifecycle</h6>
                      <small>Current</small>
                    </div>
                    <p className="mb-1">Learn about React state management</p>
                    <small>45 minutes</small>
                  </a>
                  <a href="#" className="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1">Hooks</h6>
                      <small>Next</small>
                    </div>
                    <p className="mb-1">Modern React with hooks</p>
                    <small>60 minutes</small>
                  </a>
                  <a href="#" className="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1">Advanced Patterns</h6>
                      <small>Locked</small>
                    </div>
                    <p className="mb-1">Advanced React patterns</p>
                    <small>90 minutes</small>
                  </a>
                </div>
              </div>
            </div>

            <div className="card shadow">
              <div className="card-header">
                <h6 className="card-title mb-0">Quick Actions</h6>
              </div>
              <div className="card-body">
                <div className="d-grid gap-2">
                  <button className="btn btn-primary">Take Notes</button>
                  <button className="btn btn-success">Mark Complete</button>
                  <button className="btn btn-info">Download Resources</button>
                  <button className="btn btn-warning">Ask Question</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoursePlayer; 