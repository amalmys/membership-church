const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const moment = require('moment-timezone');
const dotenv = require('dotenv');
const cron = require('node-cron');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const memberRoutes = require('./routes/memberRoutes');
const sendBirthdayReminders = require('./utils/cronJob')

const app = express();
app.use(cors());
app.use(express.json());

const allowedOrigins = ['https://your-frontend.vercel.app','http://localhost:3000','https://annual-membership-church.netlify.app'];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // optional: allows cookies if needed
}));

app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  }).catch(err => console.error(err));

// cron.schedule('* * * * *', async () => {
//   const nowIST = moment().tz('Asia/Kolkata');
  
//   if (nowIST.hour() === 16 && nowIST.minute() === 44) {
//     console.log("🎉 Running birthday reminder for 4:44 PM IST");
//     await sendBirthdayReminders(0, 'Tomorrow 9 AM Reminder');
//   }
// });

cron.schedule('30 3 * * *', async () => {
  console.log("⏰ [CRON] 9:00 AM IST Reminder");
  await sendBirthdayReminders(0, 'for today');
});

// Send email at 9:00 PM IST (3:30 PM UTC)
cron.schedule('45 11 * * *', async () => {
  console.log("⏰ [CRON] 9:00 PM IST Reminder");
  await sendBirthdayReminders(1, 'for tomorrow');
});

