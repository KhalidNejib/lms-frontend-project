import React from 'react';
import Layout from '../../components/common/Layout';

const CourseDetail: React.FC = () => {
  const course = {
    id: 1,
    title: 'React Fundamentals',
    description: 'Learn the basics of React including components, state, and props.',
    instructor: 'John Doe',
    category: 'Programming',
    duration: '8 weeks',
    students: 45,
    modules: [
      { id: 1, title: 'Introduction to React', duration: '2 hours', completed: true },
      { id: 2, title: 'Components and Props', duration: '3 hours', completed: true },
      { id: 3, title: 'State and Lifecycle', duration: '4 hours', completed: false },
      { id: 4, title: 'Hooks', duration: '5 hours', completed: false },
      { id: 5, title: 'Advanced Patterns', duration: '6 hours', completed: false },
    ],
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.description}</p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <span>Instructor: {course.instructor}</span>
            <span>Category: {course.category}</span>
            <span>Duration: {course.duration}</span>
            <span>Students: {course.students}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Course Modules</h2>
              <div className="space-y-3">
                {course.modules.map((module) => (
                  <div
                    key={module.id}
                    className={`p-4 border rounded-lg ${
                      module.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{module.title}</h3>
                        <p className="text-sm text-gray-500">{module.duration}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {module.completed && (
                          <span className="text-green-600 text-sm">✓ Completed</span>
                        )}
                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                          {module.completed ? 'Review' : 'Start'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Course Progress</h3>
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>Overall Progress</span>
                  <span>40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Continue Learning
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                  Take Quiz
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">
                  Download Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetail; 