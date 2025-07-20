import React, { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
  Grid,
  IconButton,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { Edit, Save, UploadFile } from '@mui/icons-material'

const mockUser = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  avatar: '',
  role: 'student',
}

const Profile: React.FC = () => {
  const [user, setUser] = useState(mockUser)
  const [editMode, setEditMode] = useState(false)
  const [snackbar, setSnackbar] = useState<{open: boolean, message: string, severity: 'success'|'error'}>({open: false, message: '', severity: 'success'})
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false)
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' })

  const handleEdit = () => setEditMode(true)
  const handleSave = () => {
    setEditMode(false)
    setSnackbar({open: true, message: 'Profile updated!', severity: 'success'})
    // Integrate with backend later
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // For demo, just set a placeholder
    setUser({ ...user, avatar: 'https://via.placeholder.com/100x100?text=Avatar' })
  }
  const handleOpenPasswordDialog = () => setOpenPasswordDialog(true)
  const handleClosePasswordDialog = () => setOpenPasswordDialog(false)
  const handlePasswordChange = () => {
    setOpenPasswordDialog(false)
    setSnackbar({open: true, message: 'Password changed!', severity: 'success'})
    // Integrate with backend later
  }

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>Profile</Typography>
      <Card>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar src={user.avatar} sx={{ width: 80, height: 80 }} />
              {editMode && (
                <Button variant="text" component="label" startIcon={<UploadFile />} size="small">
                  Change
                  <input type="file" hidden onChange={handleAvatarChange} />
                </Button>
              )}
            </Grid>
            <Grid item xs>
              <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  InputProps={{ readOnly: !editMode }}
                  fullWidth
                />
                <TextField
                  label="Email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  InputProps={{ readOnly: !editMode }}
                  fullWidth
                />
                <TextField
                  label="Role"
                  name="role"
                  value={user.role}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            {editMode ? (
              <Button variant="contained" startIcon={<Save />} onClick={handleSave}>Save</Button>
            ) : (
              <Button variant="outlined" startIcon={<Edit />} onClick={handleEdit}>Edit</Button>
            )}
            <Button variant="outlined" onClick={handleOpenPasswordDialog}>Change Password</Button>
          </Box>
        </CardContent>
      </Card>

      {/* Change Password Dialog */}
      <Dialog open={openPasswordDialog} onClose={handleClosePasswordDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Current Password"
              type="password"
              value={passwords.current}
              onChange={e => setPasswords({ ...passwords, current: e.target.value })}
              fullWidth
            />
            <TextField
              label="New Password"
              type="password"
              value={passwords.new}
              onChange={e => setPasswords({ ...passwords, new: e.target.value })}
              fullWidth
            />
            <TextField
              label="Confirm New Password"
              type="password"
              value={passwords.confirm}
              onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePasswordDialog}>Cancel</Button>
          <Button onClick={handlePasswordChange} variant="contained">Change</Button>
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

export default Profile 