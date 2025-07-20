import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Rating,
  Avatar,
  CardActions,
  InputAdornment,
  Pagination,
  Skeleton,
  Alert,
} from '@mui/material'
import {
  Search,
  School,
  Person,
  Schedule,
  Star,
  PlayArrow,
  FilterList,
} from '@mui/icons-material'
import { RootState } from '../../store'
import { fetchCourses, setFilters } from '../../store/courseSlice'

const CourseList: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { courses, isLoading, error } = useSelector((state: RootState) => state.course)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [priceFilter, setPriceFilter] = useState('')
  const [page, setPage] = useState(1)
  const coursesPerPage = 12

  useEffect(() => {
    dispatch(fetchCourses())
  }, [dispatch])

  const categories = ['All', 'Programming', 'Design', 'Business', 'Marketing', 'Technology']
  const priceRanges = ['All', 'Free', '$0-$50', '$50-$100', '$100+']

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === '' || categoryFilter === 'All' || course.category === categoryFilter
    const matchesPrice = priceFilter === '' || priceFilter === 'All' || 
                        (priceFilter === 'Free' && course.price === 0) ||
                        (priceFilter === '$0-$50' && course.price > 0 && course.price <= 50) ||
                        (priceFilter === '$50-$100' && course.price > 50 && course.price <= 100) ||
                        (priceFilter === '$100+' && course.price > 100)
    
    return matchesSearch && matchesCategory && matchesPrice
  })

  const paginatedCourses = filteredCourses.slice(
    (page - 1) * coursesPerPage,
    page * coursesPerPage
  )

  const handleCourseClick = (courseId: string) => {
    navigate(`/courses/${courseId}`)
  }

  const handleEnroll = (courseId: string) => {
    // Handle enrollment logic
    console.log('Enrolling in course:', courseId)
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Explore Courses
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Discover the best courses from top instructors
      </Typography>

      {/* Search and Filters */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  label="Category"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Price Range</InputLabel>
                <Select
                  value={priceFilter}
                  label="Price Range"
                  onChange={(e) => setPriceFilter(e.target.value)}
                >
                  {priceRanges.map((range) => (
                    <MenuItem key={range} value={range}>
                      {range}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterList />}
                onClick={() => {
                  setSearchTerm('')
                  setCategoryFilter('')
                  setPriceFilter('')
                }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Results Count */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          {filteredCourses.length} courses found
        </Typography>
      </Box>

      {/* Course Grid */}
      <Grid container spacing={3}>
        {isLoading
          ? Array.from(new Array(8)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card>
                  <Skeleton variant="rectangular" height={140} />
                  <CardContent>
                    <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
                    <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
                    <Skeleton variant="text" height={16} />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : paginatedCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s ease-in-out',
                    },
                  }}
                  onClick={() => handleCourseClick(course.id)}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={course.image || 'https://via.placeholder.com/300x140?text=Course+Image'}
                    alt={course.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h2" gutterBottom noWrap>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }} noWrap>
                      {course.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Person fontSize="small" color="action" sx={{ mr: 0.5 }} />
                      <Typography variant="caption" color="text.secondary">
                        {course.instructor}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Schedule fontSize="small" color="action" sx={{ mr: 0.5 }} />
                      <Typography variant="caption" color="text.secondary">
                        {course.duration}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Rating value={course.rating} readOnly size="small" />
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                        ({course.rating})
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" color="primary">
                        {course.price === 0 ? 'Free' : `$${course.price}`}
                      </Typography>
                      <Chip
                        label={course.status}
                        size="small"
                        color={course.status === 'published' ? 'success' : 'default'}
                      />
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<PlayArrow />}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEnroll(course.id)
                      }}
                    >
                      {course.price === 0 ? 'Start Learning' : 'Enroll Now'}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
      </Grid>

      {/* Pagination */}
      {filteredCourses.length > coursesPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={Math.ceil(filteredCourses.length / coursesPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  )
}

export default CourseList 