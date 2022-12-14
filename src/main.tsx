import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import { MeetingCreate } from './pages/MeetingCreate'
import { MeetingEdit } from './pages/MeetingEdit'
import { MeetingResult } from './pages/MeetingResult'
import { MeetingView } from './pages/MeetingView'

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect('/meetings/new')
  },
  {
    path: 'meetings/new',
    element: <MeetingCreate />
  },
  {
    path: 'meetings/:meetingId',
    element: <MeetingView />
  },
  {
    path: 'meetings/:meetingId/edit',
    element: <MeetingEdit />
  },
  {
    path: 'meetings/:meetingId/result',
    element: <MeetingResult />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
