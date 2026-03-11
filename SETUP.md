# Email Verification Setup Guide

## Steps to Enable Real Email Verification:

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Email (Gmail)
Create a `.env` file in the project root:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
```

**How to get Gmail App Password:**
1. Go to Google Account > Security
2. Enable 2-Step Verification
3. Go to App Passwords (search in settings)
4. Generate new app password for "Mail"
5. Copy that 16-character password

### 3. Update server.js
Open `server.js` and replace with your email:
```javascript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.vrajput7024@gmail.com,  // your-email@gmail.com
    pass: process.env.tbji xggz sonw pslb   // your-app-password
  }
});
```

### 4. Run Both Servers
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend  
npm run dev
```

### 5. Test Signup
- Open http://localhost:5173
- Click signup
- Enter details and verify email

## Features:
- ✅ India Timezone (IST) for signup timestamp
- ✅ JSON file auto-download on signup
- ✅ Real email verification (no 3rd party)

