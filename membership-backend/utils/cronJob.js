const moment = require('moment-timezone');
const sendTelegramMessage = require('./sendTelegramMessage'); // your nodemailer logic
const Member = require('../models/Member');

// Function to get members whose birthday is today or tomorrow
const sendBirthdayReminders = async (dayOffset = 0, timeLabel = 'Today') => {
  const targetDate = moment().tz("Asia/Kolkata").add(dayOffset, 'days');
  const day = targetDate.date();
  const month = targetDate.month() + 1;

  const members = await Member.find({
    $expr: {
      $and: [
        { $eq: [{ $dayOfMonth: "$dob" }, day] },
        { $eq: [{ $month: "$dob" }, month] }
      ]
    }
  });

  if (!members.length) return;

  const message = `🎂 *Birthday Reminder (${timeLabel})*\n\n` +
    members.map(m => `${m.firstName} ${m.lastName} – ${moment(m.dob).format('DD MMM')} 🎉`).join('\n');

  await sendTelegramMessage(message);
};

module.exports = sendBirthdayReminders;
