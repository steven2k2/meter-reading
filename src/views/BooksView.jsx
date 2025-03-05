// src/views/BookView.jsx

/**
 * BooksView Component
 *
 * This component displays a list of meter reading "books" (ranges of meters to be read).
 * When a book is selected, it returns the book ID and closes the view.
 */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, AppBar, Toolbar, IconButton, Container, Paper, Divider, List, ListItem, ListItemText } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'

function BooksView ({ onClose }) {
  const navigate = useNavigate()
  const [books, setBooks] = useState([])

  // Function to populate books with sample data
  useEffect(() => {
    const fetchBooks = async () => {
      // Simulating an API call with static data
      const sampleBooks = [
        { id: 1, name: 'Book 1', range: '1000 - 1099' },
        { id: 2, name: 'Book 2', range: '1100 - 1199' },
        { id: 3, name: 'Book 3', range: '1200 - 1299' }
      ]
      setBooks(sampleBooks)
    }
    fetchBooks()
  }, [])

  // Handle book selection
  const handleBookSelect = (bookId) => {
    if (onClose) {
      onClose(bookId) // Return the selected book ID
    }
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ✅ AppBar with Back Button */}
      <AppBar
        position='static' sx={{
          borderBottom: '2px solid black',
          boxShadow: 'none'
        }}
      >
        <Toolbar>
          <IconButton edge='start' color='inherit' onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant='h6'>Select Book</Typography>
        </Toolbar>
      </AppBar>

      {/* ✅ Main Content */}
      <Container maxWidth='sm' sx={{ mt: 4, flexGrow: 1 }}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant='h6' gutterBottom>
            Available Books
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {books.map((book) => (
              <ListItem button key={book.id} onClick={() => handleBookSelect(book.id)}>
                <ListItemText primary={book.name} secondary={`Range: ${book.range}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  )
}

export default BooksView
