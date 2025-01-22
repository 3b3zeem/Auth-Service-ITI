export const html = (userData, token) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome Email</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f7fafc; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
        <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: #ffffff; text-align: center; padding: 40px 20px;">
          <p style="margin: 0; font-size: 26px; color: #fff;">We're thrilled to have you on board.</p>
        </div>

        <div style="padding: 30px; color: #4a5568;">
          <h2 style="font-size: 24px; margin-top: 0; color: #2d3748;">Hello ${userData},</h2>
          <p style="font-size: 16px; line-height: 1.6; margin: 20px 0;">
            Thank you for joining <strong>MyApp</strong>. Our platform is designed to help you achieve your goals and make your life easier.
          </p>
          <p style="font-size: 16px; line-height: 1.6; margin: 20px 0;">
            If you have any questions or need assistance, feel free to <a href="mailto:support@myapp.com" style="color: #667eea; text-decoration: none;">mail me</a>.
          </p>
          <a href="http://localhost:5000/api/auth/verify?token=${token}" style="display: inline-block; background: linear-gradient(135deg, #667eea, #764ba2); color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold; margin-top: 20px;">Get Started</a>
        </div>

        <div style="text-align: center; padding: 20px; background-color:rgb(159, 159, 159); font-size: 14px;">
          <p style="margin: 0; color: #f7fafc;">You're receiving this email because you signed up for MyApp. If this wasn't you, please <a href="#" style="color:color:rgb(0, 60, 255);; text-decoration: none;">unsubscribe</a>.</p>
          <p style="margin: 0; color: #f7fafc;">&copy; 2025 My Sara7a App. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
    `;
};