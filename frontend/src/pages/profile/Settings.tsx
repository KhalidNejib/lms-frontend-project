import React, { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState({ email: true, sms: false })
  const [darkMode, setDarkMode] = useState(false)
  const [snackbar, setSnackbar] = useState<{open: boolean, message: string, severity: 'success'|'error'}>({open: false, message: '', severity: 'success'})
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const handleToggle = (key: 'email' | 'sms') => {
    setNotifications({ ...notifications, [key]: !notifications[key] })
  }
  const handleThemeToggle = () => {
    setDarkMode((prev) => !prev)
    setSnackbar({open: true, message: `Theme set to ${!darkMode ? 'Dark' : 'Light'} mode!`, severity: 'success'})
    // Integrate with global theme provider in real app
  }
  const handleSave = () => {
    setSnackbar({open: true, message: 'Settings saved!', severity: 'success'})
    // Integrate with backend later
  }
  const handleOpenDeleteDialog = () => setOpenDeleteDialog(true)
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false)
  const handleDeleteAccount = () => {
    setOpenDeleteDialog(false)
    setSnackbar({open: true, message: 'Account deleted!', severity: 'success'})
    // Integrate with backend later
  }

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>Settings</Typography>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Notification Preferences</Typography>
          <FormControlLabel
            control={<Switch checked={notifications.email} onChange={() => handleToggle('email')} />}
            label="Email Notifications"
          />
          <FormControlLabel
            control={<Switch checked={notifications.sms} onChange={() => handleToggle('sms')} />}
            label="SMS Notifications"
          />

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Appearance</Typography>
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={handleThemeToggle} />}
            label="Dark Mode"
          />

          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button variant="contained" onClick={handleSave}>Save Settings</Button>
            <Button variant="outlined" color="error" onClick={handleOpenDeleteDialog}>Delete Account</Button>
          </Box>
        </CardContent>
      </Card>

      {/* Delete Account Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography color="error" sx={{ mb: 2 }}>
            Are you sure you want to delete your account? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteAccount} variant="contained" color="error">Delete</Button>
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

export default Settings 