# Full-Stack Complaint Management System

This is a simple project to show how a full-stack application is built, from the frontend code to the backend API, and how everything is deployed on AWS.

---

### **Live Demo Link**

You can check out the live, working website here:

[https://dk4uj5ngiylhs.cloudfront.net/](https://dk4uj5ngiylhs.cloudfront.net/)

---

### **Tech Stack I Used**

*   **Frontend:** React, TypeScript, Vite, Tailwind CSS
*   **Backend:** Node.js, Express.js
*   **Database:** PostgreSQL
*   **Cloud Setup (AWS):**
    *   **Backend:** AWS App Runner
    *   **Database:** Amazon RDS
    *   **Frontend:** Amazon S3 & CloudFront

---

### **How to Run This on Your Machine**

You will need Node.js and npm for this.

**For the Backend:**

1.  First, go to the `backend` folder: `cd backend`
2.  Install all the required packages: `npm install`
3.  Copy the example `.env` file: `cp .env.example .env`
4.  Then, you'll need to add your own local Postgres database details to the new `.env` file.
5.  To start the server: `npm run dev`
    *   The backend will start on `http://localhost:5001`.

**For the Frontend:**

1.  Go to the `frontend` folder: `cd frontend`
2.  Install the packages: `npm install`
3.  To start the app: `npm run dev`
    *   The website will open on `http://localhost:5173` (or some other port).

---

### **My Design Choices**

Here are a few decisions I made while building this:

*   **Why a Custom Backend?** The assignment paper mentioned Supabase. I decided to build a proper backend with Node.js and Express myself. Why? Because I wanted to show how to build and connect all three parts (frontend, backend, database) in a real cloud setup on AWS. It's more work, but I think it shows a better understanding of the full picture.

*   **No Admin Login:** The admin page is public for now. I didn't add a login system to keep things simple and focus on the main features for this assignment.

---

### **What I'd Do Next**

If I had more time, here are the improvements I would make:

1.  **Build a proper login** for the admin page so only authorized people can see it.
2.  **Set up Email Alerts:** Use an AWS service like **Amazon SNS (Simple Notification Service)** or **SES (Simple Email Service)**. I would trigger a Lambda function from the `POST /complaints` endpoint to automatically send an email alert to the support team whenever a new complaint is created.
3.  **Automate the deployment process** with GitHub Actions, so any new code I push goes live automatically.
4.  **Use a tool like Terraform** to manage the AWS setup. This makes it easier to create or change the cloud setup later on.
5. **Pagination** Pagination on the backend to make sure the admin page stays fast even with thousands of complaints.