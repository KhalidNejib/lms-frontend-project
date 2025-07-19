// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Course Types
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  duration: string;
  students: number;
  rating: number;
  price: number;
  image: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  courseId: string;
  order: number;
  duration: number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Content {
  id: string;
  title: string;
  type: 'text' | 'video' | 'pdf' | 'quiz';
  content: string;
  courseId: string;
  moduleId: string;
  order: number;
  duration?: number;
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Enrollment Types
export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  completedAt?: string;
  progress: number;
  status: 'active' | 'completed' | 'dropped';
}

// Progress Types
export interface Progress {
  courseId: string;
  completedModules: number;
  totalModules: number;
  percentage: number;
  lastAccessedAt: string;
}

// Quiz Types
export interface Quiz {
  id: string;
  title: string;
  description: string;
  courseId: string;
  moduleId: string;
  questions: Question[];
  timeLimit?: number;
  passingScore: number;
  attempts: number;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer: string | string[];
  points: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  answers: QuizAnswer[];
  score: number;
  passed: boolean;
  completedAt: string;
}

export interface QuizAnswer {
  questionId: string;
  answer: string | string[];
  isCorrect: boolean;
}

// Assignment Types
export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  moduleId: string;
  dueDate: string;
  points: number;
  submissionType: 'file' | 'text' | 'url';
  createdAt: string;
  updatedAt: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  userId: string;
  content: string;
  fileUrl?: string;
  submittedAt: string;
  gradedAt?: string;
  score?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'late';
}

// Review Types
export interface Review {
  id: string;
  courseId: string;
  userId: string;
  userName: string;
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}

// Filter Types
export interface CourseFilters {
  category?: string;
  instructor?: string;
  status?: string;
  priceRange?: { min: number; max: number };
  rating?: number;
}

export interface ContentFilters {
  type?: string;
  courseId?: string;
  moduleId?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CourseForm {
  title: string;
  description: string;
  category: string;
  price: number;
  image?: File;
}

export interface ContentForm {
  title: string;
  type: 'text' | 'video' | 'pdf' | 'quiz';
  content: string;
  courseId: string;
  moduleId: string;
  order: number;
  duration?: number;
  file?: File;
}

// UI Types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export interface DataTableProps {
  data: any[];
  columns: {
    key: string;
    label: string;
    render?: (value: any, row: any) => React.ReactNode;
  }[];
  onRowClick?: (row: any) => void;
  striped?: boolean;
  hover?: boolean;
  bordered?: boolean;
} 