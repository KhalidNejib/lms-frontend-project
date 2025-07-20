import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  LinearProgress,
  Paper,
  Chip,
  Avatar,
  Grid,
} from '@mui/material'
import { PlayCircle, Description, Quiz, ArrowBack, ArrowForward, CheckCircle } from '@mui/icons-material'

const mockModules = [
  { id: '1', title: 'Introduction', type: 'video', completed: true },
  { id: '2', title: 'React Basics', type: 'text', completed: true },
  { id: '3', title: 'Hooks Deep Dive', type: 'video', completed: false },
  { id: '4', title: 'Final Quiz', type: 'quiz', completed: false },
]

const CoursePlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [currentModule, setCurrentModule] = React.useState(0)

  const handlePrev = () => {
    setCurrentModule((prev) => Math.max(prev - 1, 0))
  }
  const handleNext = () => {
    setCurrentModule((prev) => Math.min(prev + 1, mockModules.length - 1))
  }

  const module = mockModules[currentModule]
  const progress = ((currentModule + 1) / mockModules.length) * 100

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        {/* Module Navigation */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>Modules</Typography>
            <List>
              {mockModules.map((mod, idx) => (
                <React.Fragment key={mod.id}>
                  <ListItem
                    button
                    selected={idx === currentModule}
                    onClick={() => setCurrentModule(idx)}
                  >
                    <ListItemIcon>
                      {mod.type === 'video' ? <PlayCircle color={mod.completed ? 'success' : 'action'} /> :
                       mod.type === 'quiz' ? <Quiz color={mod.completed ? 'success' : 'action'} /> :
                       <Description color={mod.completed ? 'success' : 'action'} />}
                    </ListItemIcon>
                    <ListItemText primary={mod.title} />
                    {mod.completed && <CheckCircle color="success" fontSize="small" />}
                  </ListItem>
                  {idx !== mockModules.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
          <LinearProgress variant="determinate" value={progress} sx={{ mt: 2 }} />
          <Typography variant="caption" color="text.secondary">
            Progress: {Math.round(progress)}%
          </Typography>
        </Grid>

        {/* Content Area */}
        <Grid item xs={12} md={9}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {module.title}
              </Typography>
              <Chip label={module.type.toUpperCase()} color="primary" sx={{ mb: 2 }} />
              {/* Mock content display */}
              {module.type === 'video' ? (
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ width: '100%', height: 320, bgcolor: '#000', borderRadius: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PlayCircle sx={{ color: '#fff', fontSize: 80 }} />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Video player placeholder
                  </Typography>
                </Box>
              ) : module.type === 'text' ? (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body1">
                    This is a sample text content for the module. You can add formatted text, images, and more here.
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body1">
                    Quiz content goes here. (Mock quiz)
                  </Typography>
                </Box>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBack />}
                  onClick={handlePrev}
                  disabled={currentModule === 0}
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  endIcon={<ArrowForward />}
                  onClick={handleNext}
                  disabled={currentModule === mockModules.length - 1}
                >
                  Next
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CoursePlayer 