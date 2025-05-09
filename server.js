const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// إعداد body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// صفحة البداية
app.get('/', (req, res) => {
  res.send(`
    <h1>محاكاة بوت واتساب</h1>
    <form action="/message" method="post">
      <label for="message">أرسل رسالة للبوت:</label><br>
      <input type="text" id="message" name="message"><br><br>
      <input type="submit" value="إرسال">
    </form>
  `);
});

// معالجة الرسائل المرسلة
app.post('/message', (req, res) => {
  const userMessage = req.body.message.toLowerCase().trim();
  let botReply = '';

  // الردود على الرسائل
  if (userMessage.includes('مساعدة')) {
    botReply = "كيف يمكنني مساعدتك؟";
  } else if (userMessage.includes('مواعيد')) {
    botReply = "تذكير: موعدك غدًا الساعة 10 صباحًا.";
  } else if (userMessage.includes('شكرًا')) {
    botReply = "على الرحب والسعة!";
  } else {
    botReply = "شكرًا لتواصلك معنا! كيف يمكنني مساعدتك؟";
  }

  // عرض الرسالة المرسلة والرد عليها
  res.send(`
    <h1>رسالتك:</h1>
    <p>${userMessage}</p>
    <h2>رد البوت:</h2>
    <p>${botReply}</p>
    <br><a href="/">أرسل رسالة أخرى</a>
  `);
});

// تشغيل الخادم
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
