import React, { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
} from '@mui/material'
import { Add, Edit, Delete, UploadFile } from '@mui/icons-material'

const mockContents = [
  { id: '1', title: 'Intro Video', type: 'video', course: 'React Basics', module: 'Introduction', file: 'intro.mp4' },
  { id: '2', title: 'Lecture Notes', type: 'pdf', course: 'React Basics', module: 'Components', file: 'notes.pdf' },
  { id: '3', title: 'Quiz 1', type: 'quiz', course: 'React Basics', module: 'Hooks', file: '' },
]

const ContentManager: React.FC = () => {
  const [contents, setContents] = useState(mockContents)
  const [openDialog, setOpenDialog] = useState(false)
  const [editContent, setEditContent] = useState<any>(null)
  const [snackbar, setSnackbar] = useState<{open: boolean, message: string, severity: 'success'|'error'}>({open: false, message: '', severity: 'success'})

  const handleOpenDialog = (content?: any) => {
    setEditContent(content || null)
    setOpenDialog(true)
  }
  const handleCloseDialog = () => {
    setEditContent(null)
    setOpenDialog(false)
  }
  const handleSave = () => {
    setSnackbar({open: true, message: editContent?.id ? 'Content updated!' : 'Content added!', severity: 'success'})
    setOpenDialog(false)
    // For now, just close dialog. Integrate with backend later.
  }
  const handleDelete = (id: string) => {
    setContents(contents.filter(c => c.id !== id))
    setSnackbar({open: true, message: 'Content deleted!', severity: 'success'})
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Content Manager</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog()}>Add Content</Button>
      </Box>
      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Module</TableCell>
                  <TableCell>File</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contents.map((content) => (
                  <TableRow key={content.id}>
                    <TableCell>{content.title}</TableCell>
                    <TableCell>{content.type}</TableCell>
                    <TableCell>{content.course}</TableCell>
                    <TableCell>{content.module}</TableCell>
                    <TableCell>{content.file}</TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => handleOpenDialog(content)}><Edit /></IconButton>
                      <IconButton color="error" onClick={() => handleDelete(content.id)}><Delete /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editContent?.id ? 'Edit Content' : 'Add Content'}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Title" fullWidth defaultValue={editContent?.title || ''} />
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select defaultValue={editContent?.type || ''} label="Type">
                <MenuItem value="video">Video</MenuItem>
                <MenuItem value="pdf">PDF</MenuItem>
                <MenuItem value="quiz">Quiz</MenuItem>
                <MenuItem value="text">Text</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Course" fullWidth defaultValue={editContent?.course || ''} />
            <TextField label="Module" fullWidth defaultValue={editContent?.module || ''} />
            <Button variant="outlined" component="label" startIcon={<UploadFile />}>
              Upload File
              <input type="file" hidden />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
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

export default ContentManager 