import React, { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Paper,
  Avatar,
} from '@mui/material'
import { Add, Delete, UploadFile, Image, PictureAsPdf, Movie } from '@mui/icons-material'

const mockMedia = [
  { id: '1', name: 'intro.mp4', type: 'video', url: '', uploadedAt: '2024-06-01' },
  { id: '2', name: 'lecture.pdf', type: 'pdf', url: '', uploadedAt: '2024-06-02' },
  { id: '3', name: 'cover.png', type: 'image', url: '', uploadedAt: '2024-06-03' },
]

const getIcon = (type: string) => {
  switch (type) {
    case 'video': return <Movie color="primary" />
    case 'pdf': return <PictureAsPdf color="error" />
    case 'image': return <Image color="success" />
    default: return <UploadFile />
  }
}

const MediaLibrary: React.FC = () => {
  const [media, setMedia] = useState(mockMedia)
  const [openDialog, setOpenDialog] = useState(false)
  const [snackbar, setSnackbar] = useState<{open: boolean, message: string, severity: 'success'|'error'}>({open: false, message: '', severity: 'success'})

  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => setOpenDialog(false)
  const handleUpload = () => {
    setSnackbar({open: true, message: 'Media uploaded!', severity: 'success'})
    setOpenDialog(false)
    // Integrate with backend later
  }
  const handleDelete = (id: string) => {
    setMedia(media.filter(m => m.id !== id))
    setSnackbar({open: true, message: 'Media deleted!', severity: 'success'})
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Media Library</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleOpenDialog}>Upload Media</Button>
      </Box>
      <Grid container spacing={3}>
        {media.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ width: 56, height: 56, mb: 2 }}>
                  {getIcon(item.type)}
                </Avatar>
                <Typography variant="subtitle1" noWrap>{item.name}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
                  Uploaded: {item.uploadedAt}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <IconButton color="error" onClick={() => handleDelete(item.id)}><Delete /></IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Upload Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Upload Media</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button variant="outlined" component="label" startIcon={<UploadFile />}>
              Select File
              <input type="file" hidden />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpload} variant="contained">Upload</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default MediaLibrary 