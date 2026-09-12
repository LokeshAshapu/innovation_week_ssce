const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lokeshashapu@gmail.com',
    pass: 'nksrtzmjlpvwjwsa',
  },
  tls: { rejectUnauthorized: false },
})

async function testMail() {
  try {
    console.log('Verifying SMTP connection...')
    await transporter.verify()
    console.log('SMTP Verification SUCCESS!')

    const info = await transporter.sendMail({
      from: '"Sri Sivani Innovation Week" <lokeshashapu@gmail.com>',
      to: 'lokeshashapu@gmail.com',
      subject: 'Test Registration Confirmation Email',
      html: '<h1>Test Email Working!</h1>',
    })
    console.log('Mail Sent Successfully! Message ID:', info.messageId)
  } catch (err) {
    console.error('SMTP TEST ERROR:', err)
  }
}

testMail()
