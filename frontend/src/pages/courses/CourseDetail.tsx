import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Rating,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material'
import { School, Person, PlayArrow, AccessTime } from '@mui/icons-material'
import { RootState } from '../../store'
import { fetchCourse } from '../../store/courseSlice'
import courseService from '../../services/course.service'

interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  duration: number;
  isCompleted: boolean;
}

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  review: string;
  createdAt: string;
}

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentCourse, isLoading, error } = useSelector((state: RootState) => state.course)

  const [modules, setModules] = useState<Module[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loadingModules, setLoadingModules] = useState(false)
  const [loadingReviews, setLoadingReviews] = useState(false)
  const [modulesError, setModulesError] = useState<string | null>(null)
  const [reviewsError, setReviewsError] = useState<string | null>(null)

  useEffect(() => {
    if (id) dispatch(fetchCourse(id))
  }, [dispatch, id])

  useEffect(() => {
    const fetchModules = async () => {
      if (!id) return
      setLoadingModules(true)
      setModulesError(null)
      try {
        const res = await fetch(`/api/courses/${id}/modules`)
        if (!res.ok) throw new Error('Failed to fetch modules')
        const data = await res.json()
        setModules(data)
      } catch (err) {
        setModulesError(err instanceof Error ? err.message : 'Failed to fetch modules')
      } finally {
        setLoadingModules(false)
      }
    }
    fetchModules()
  }, [id])

  useEffect(() => {
    const fetchReviews = async () => {
      if (!id) return
      setLoadingReviews(true)
      setReviewsError(null)
      try {
        const data = await courseService.getCourseReviews(id)
        setReviews(data)
      } catch (err) {
        setReviewsError(err instanceof Error ? err.message : 'Failed to fetch reviews')
      } finally {
        setLoadingReviews(false)
      }
    }
    fetchReviews()
  }, [id])

  if (isLoading || !currentCourse) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        {/* Course Image & Info */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="220"
              image={currentCourse.image || 'https://via.placeholder.com/400x220?text=Course+Image'}
              alt={currentCourse.title}
            />
            <CardContent>
              <Typography variant="h5" gutterBottom>{currentCourse.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{currentCourse.description}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Person fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">{currentCourse.instructor}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AccessTime fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">{currentCourse.duration}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={currentCourse.rating} readOnly size="small" />
                <Typography variant="caption" sx={{ ml: 1 }}>({currentCourse.rating})</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Chip label={currentCourse.category} size="small" sx={{ mr: 1 }} />
                <Chip label={currentCourse.status} size="small" color={currentCourse.status === 'published' ? 'success' : 'default'} />
              </Box>
              <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                {currentCourse.price === 0 ? 'Free' : `$${currentCourse.price}`}
              </Typography>
              <Button
                fullWidth
                variant="contained"
                startIcon={<PlayArrow />}
                onClick={() => navigate(`/courses/${currentCourse.id}/play`)}
                sx={{ mb: 1 }}
              >
                {currentCourse.price === 0 ? 'Start Learning' : 'Enroll & Start'}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Course Modules & Reviews */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>Course Modules</Typography>
            {loadingModules ? (
              <CircularProgress size={24} />
            ) : modulesError ? (
              <Alert severity="error">{modulesError}</Alert>
            ) : (
              <List>
                {modules.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">No modules found.</Typography>
                ) : (
                  modules.map((mod) => (
                    <React.Fragment key={mod.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar><School /></Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={mod.title}
                          secondary={mod.description}
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))
                )}
              </List>
            )}
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Student Reviews</Typography>
            {loadingReviews ? (
              <CircularProgress size={24} />
            ) : reviewsError ? (
              <Alert severity="error">{reviewsError}</Alert>
            ) : (
              <List>
                {reviews.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">No reviews yet.</Typography>
                ) : (
                  reviews.map((rev) => (
                    <React.Fragment key={rev.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar>{rev.userName.charAt(0)}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={<Rating value={rev.rating} readOnly size="small" />}
                          secondary={
                            <>
                              <Typography component="span" variant="body2" color="text.primary">
                                {rev.userName}
                              </Typography>
                              {` — ${rev.review}`}
                            </>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))
                )}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CourseDetail 