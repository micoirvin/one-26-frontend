# One-26

## About

Hello, my name is Mico, and I created One-26.

My inspiration is a popular video recording and sharing service. On their free tier, they only allow 25 five-minute videos, which total to 125 minutes of recording time.

One-26 simply aims to allow users to record more than that by using their own Google Drive as the video storage.

We simply allow users to create recordings and upload them on their own Google Drive storage on-the-fly.

I am practicing my software development skills, too. That's why I created this. Hire me! → micoirvin@gmail.com

## Frontend

I used React for the frontend. I mostly used basic React hooks - useState, useRef, useEffect, and useContext.

I used custom hooks based on these basic hooks for easier development.

I used Tailwind for styling. The UI is basic, so using pure Tailwind is easy enough for development.

## Recording

I used Media Recorder Web API, which is generally supported on modern browsers.

## Authentication

I used Google OAuth for quick authentication setup.

The access token response from Google OAuth is sent to the backend.

## Authorization management

Upon login, the backend generates a JWT-signed cookie based on the access token, then sends it back to the frontend.

All requests from the frontend are authorized using the cookies.

## Backend

My backend is Node.js with Express.js.

The backend is the one directly calling Google APIs for Google Drive service.

The responses from the Google APIs are sent back to the frontend.

## Video upload management

While the video is recording on the frontend, 1-MB chunks are sent to the backend.

After the recording is stopped and the user chooses to upload, the 1-MB chunks are written into a full video file sent to the user's Google Drive.

## Deployment

I used Firebase for deploying the frontend.

I used Render for deploying the backend.
