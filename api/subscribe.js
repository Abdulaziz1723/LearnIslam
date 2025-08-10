// api/subscribe.js
const webpush = require('web-push');

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT || 'mailto:you@example.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// WARNING: ephemeral array — serverless may lose state between cold starts
let subscriptions = [];

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const sub = req.body;
    subscriptions.push(sub);
    return res.status(201).json({ message: 'sub saved' });
  }

  if (req.method === 'GET') {
    const payload = JSON.stringify({ title: 'Announcement', body: 'This is for everyone!' });
    await Promise.all(
      subscriptions.map(s => webpush.sendNotification(s, payload).catch(err => {
        console.error('send err', err);
      }))
    );
    return res.status(200).json({ message: 'sent' });
  }

  res.status(405).end();
};
