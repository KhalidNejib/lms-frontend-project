import React from 'react';
import Layout from '../../components/common/Layout';
import DataTable from '../../components/ui/DataTable';

const CourseList: React.FC = () => {
  const courses = [
    { id: 1, title: 'React Fundamentals', instructor: 'John Doe', category: 'Programming', students: 45 },
    { id: 2, title: 'Advanced JavaScript', instructor: 'Jane Smith', category: 'Programming', students: 32 },
    { id: 3, title: 'UI/UX Design', instructor: 'Bob Johnson', category: 'Design', students: 28 },
    { id: 4, title: 'Data Science Basics', instructor: 'Alice Brown', category: 'Data Science', students: 56 },
  ];

  const columns = [
    { key: 'title', label: 'Course Title' },
    { key: 'instructor', label: 'Instructor' },
    { key: 'category', label: 'Category' },
    { key: 'students', label: 'Students' },
  ];

  const handleRowClick = (course: any) => {
    console.log('Course clicked:', course);
    // Navigate to course detail page
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Courses</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Course
          </button>
        </div>
        <DataTable
          data={courses}
          columns={columns}
          onRowClick={handleRowClick}
        />
      </div>
    </Layout>
  );
};

export default CourseList; 