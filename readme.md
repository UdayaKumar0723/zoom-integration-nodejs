#Zoom Meeting Scheduler API

## Overview

This Node.js REST API schedules Zoom meetings based on UTC time provided by the user. It creates a meeting, sends an email to specified participants with the meeting link, and returns the join URL.

## Features

- Schedule a Zoom meeting with a UTC time.
- Generate and return a Zoom meeting link.
- Send the meeting link via email to multiple participants.

## Prerequisites

1. **Zoom OAuth Credentials**:

   - Create a Server-To-Server OAuth app in the Zoom Marketplace to obtain:
     - `ACCOUNT_ID`
     - `CLIENT_ID`
     - `CLIENT_SECRET`

2. **Gmail Configuration**:
   - To send emails, you need:
     - `MAIL_ID` (Your Gmail address)
     - `MAIL_PASSWORD` (Gmail app password, not regular email password)

## Setup

### Configure Environment Variables

Create a `config.env` file in the root directory of your project with the following content:

```env
ACCOUNT_ID=your_zoom_account_id
CLIENT_ID=your_zoom_client_id
CLIENT_SECRET=your_zoom_client_secret
MAIL=your_email_address
MAIL_PASSWORD=your_email_app_password
PORT=your_server_port
```

## Endpoint

### `POST /api/zoom/meeting`

- **URL**: `http://localhost:4200/api/zoom/meeting`
- **Method**: `POST`
- **Description**: Schedule a Zoom meeting and send an email with the meeting link to multiple participants.

#### Request

**Headers**:

- Content-Type: `application/json`

**Body**:

````json
{
  "startTime": "2024-08-30T14:00:00Z",
      "participants":[
      "example1@gmail.com",
      "example2@gmail.com"
    ]
}

```Response
{
 "status": "success",
    "data": {
        "meetingLink":"https://zoom.us/j/1234567890",
    }
}

````
