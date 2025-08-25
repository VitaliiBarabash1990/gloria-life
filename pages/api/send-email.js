import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({message: 'Method not allowed'});
  }

  const {name, email, message} = req.body;

  // Настройка транспортера Nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });

  try {
    // Отправка письма
    await transporter.sendMail({
      from: process.env.SMTP_FROM, // Отправитель
      to: process.env.SMTP_FROM, // Получатель
      subject: `Сообщение от ${name}`, // Тема письма
      text: `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`, // Текст письма
      html: `<p><strong>Имя:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Сообщение:</strong> ${message}</p>` // HTML-версия
    });

    res.status(200).json({message: 'Email sent successfully!'});
  } catch (error) {
    console.error('Ошибка отправки email:', error);
    res.status(500).json({message: 'Error sending email'});
  }
}
