import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  Button,
} from '@mui/material'
import {
  School,
  Book,
  Assessment,
  TrendingUp,
  Person,
  Schedule,
} from '@mui/icons-material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { RootState } from '../../store'
import { fetchCourses } from '../../store/courseSlice'

const Dashboard: React.FC = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const { courses, isLoading } = useSelector((state: RootState) => state.course)

  useEffect(() => {
    dispatch(fetchCourses())
  }, [dispatch])

  // Mock data for charts
  const progressData = [
    { name: 'Week 1', progress: 65 },
    { name: 'Week 2', progress: 78 },
    { name: 'Week 3', progress: 82 },
    { name: 'Week 4', progress: 90 },
    { name: 'Week 5', progress: 85 },
    { name: 'Week 6', progress: 92 },
  ]

  const categoryData = [
    { name: 'Programming', value: 35, color: '#8884d8' },
    { name: 'Design', value: 25, color: '#82ca9d' },
    { name: 'Business', value: 20, color: '#ffc658' },
    { name: 'Marketing', value: 20, color: '#ff7300' },
  ]

  const recentCourses = courses.slice(0, 5)
  const enrolledCourses = courses.filter(course => course.status === 'published').slice(0, 3)

  const stats = [
    {
      title: 'Enrolled Courses',
      value: enrolledCourses.length,
      icon: <School color="primary" />,
      color: '#1976d2',
    },
    {
      title: 'Completed Modules',
      value: 24,
      icon: <Book color="success" />,
      color: '#2e7d32',
    },
    {
      title: 'Assessments',
      value: 8,
      icon: <Assessment color="warning" />,
      color: '#ed6c02',
    },
    {
      title: 'Average Score',
      value: '85%',
      icon: <TrendingUp color="info" />,
      color: '#0288d1',
    },
  ]

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Welcome back, {user?.name}!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Here's what's happening with your learning journey
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: stat.color, mr: 2 }}>
                    {stat.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h4" component="div">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Progress Chart */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Learning Progress
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="progress"
                    stroke="#1976d2"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Category Distribution */}
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Course Categories
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Courses */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Courses
              </Typography>
              <List>
                {recentCourses.map((course) => (
                  <ListItem key={course.id} divider>
                    <ListItemAvatar>
                      <Avatar>
                        <School />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={course.title}
                      secondary={`${course.instructor} • ${course.duration}`}
                    />
                    <Chip
                      label={course.status}
                      color={course.status === 'published' ? 'success' : 'default'}
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Current Progress */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Progress
              </Typography>
              {enrolledCourses.map((course) => (
                <Box key={course.id} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">{course.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      75%
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={75} sx={{ mb: 1 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Schedule fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">
                      3 modules remaining
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard 