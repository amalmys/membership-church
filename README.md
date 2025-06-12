🛐 MGOCSM & OCYM Annual Membership App
A full-stack web application built with React.js, Node.js, Express, and MongoDB that enables an admin to manage members efficiently. Features include form submission, search, sort, pagination, edit/delete actions, Excel export, authentication, and birthday reminders via email or Telegram.

📸 Features
📝 Modal-based member registration form

📋 Tabular member list with:

Sorting

Pagination

Search (across all fields)

Edit/Delete functionality

📤 Export member data to Excel

🔒 JWT-based Login & Logout

🕵️ Auth-protected routes

📅 Google Calendar/Email/Telegram birthday reminders (daily @ 9AM & previous day @ 9PM IST)

📩 Toast messages on actions

✅ Environment separation: Dev & Prod .env support

🌐 Deployed Frontend (Netlify) + Backend (Render)

📁 Tech Stack
Frontend

React.js

React Bootstrap

Axios

XLSX

React Router

Backend

Node.js

Express

MongoDB with Mongoose

JWT for auth

Nodemailer / Telegram Bot API

node-cron for scheduled jobs

dotenv + env-cmd for environment config

⚙️ Setup Instructions
1. Clone the repo
bash
Copy
Edit
git clone https://github.com/your-username/membership-app.git
cd membership-app
2. Install backend dependencies
bash
Copy
Edit
cd membership-backend
npm install
Create .env file with:

ini
Copy
Edit
PORT=5000
MONGO_URI=<your_mongo_db_uri>
JWT_SECRET=<your_jwt_secret>
EMAIL_USER=<your_email@domain.com>
EMAIL_PASS=<your_email_password_or_smtp_key>
ADMIN_EMAIL=<admin_recipient_email>
TELEGRAM_BOT_TOKEN=<your_bot_token>
TELEGRAM_CHAT_ID=<admin_chat_id>
Start backend:

bash
Copy
Edit
npm run dev
3. Install frontend dependencies
bash
Copy
Edit
cd ../membership-frontend
npm install
Create .env file in frontend:

ini
Copy
Edit
REACT_APP_API_URL=http://localhost:5000
Start frontend:

bash
Copy
Edit
npm start
🧪 Test Credentials (for local/dev)
makefile
Copy
Edit
Email: admin@example.com
Password: your_test_password
To add a test user manually:

bash
Copy
Edit
// In Mongo shell or a script:
password = bcrypt.hashSync('your_password', 10)
db.users.insert({ email: 'admin@example.com', password })
🚀 Deployment
Frontend: Netlify

Set build command: npm run build

Publish directory: build

Add environment variable REACT_APP_API_URL to point to your deployed backend URL.

Backend: Render

Add all .env variables in Render's environment tab.

Start command: npm start or npm run start:prd

🕒 Cron Jobs
Birthday email reminders are sent:

9:00 AM IST (3:30 AM UTC)

9:00 PM IST (3:30 PM UTC)

Via:

✅ Email (Nodemailer with Brevo or Zoho)

✅ Telegram (Bot API)

📌 TODO / Future Enhancements
Add role-based access (admin vs user)

CSV import for bulk members

UI improvement and mobile responsiveness

Cloud storage for member images

🙏 Credits
Built with ❤️ by Amal Jose.
Inspired by the mission of MGOCSM & OCYM.
