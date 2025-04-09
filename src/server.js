import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Initialize environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Routes
app.get('/', (req, res) => {
  const portfolioData = {
    name: 'Antónella Martínez',
    title: 'QA Engineer',
    skills: [
      { name: 'Selenium' },
      { name: 'Postman' },
      { name: 'JMeter' },
      { name: 'Cypress' },
      { name: 'TestNG' },
      { name: 'REST Assured' }
    ],
    courses: [
      {
        name: 'Advanced Selenium WebDriver',
        platform: 'Udemy',
        date: '2023'
      },
      {
        name: 'API Testing Masterclass',
        platform: 'TestAutomation University',
        date: '2023'
      },
      {
        name: 'Performance Testing with JMeter',
        platform: 'LinkedIn Learning',
        date: '2022'
      }
    ],
    projects: [
      {
        name: 'E-commerce Testing Suite',
        description: 'End-to-end test automation framework for a major e-commerce platform',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        link: '#'
      },
      {
        name: 'API Testing Framework',
        description: 'Custom framework for API testing using Postman and Newman',
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80',
        link: '#'
      },
      {
        name: 'Performance Testing Tool',
        description: 'Automated performance testing suite using JMeter and Jenkins',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
        link: '#'
      }
    ],
    contact: {
      email: 'your.email@example.com',
      phone: '+1234567890',
      linkedin: 'https://linkedin.com/in/yourusername',
      github: 'https://github.com/yourusername',
      behance: 'https://behance.net/yourusername'
    }
  };
  
  res.render('index', { data: portfolioData });
});

app.post('/api/like', async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: '🎉 New Portfolio Like!',
      text: 'Someone liked your portfolio! Time: ' + new Date().toLocaleString(),
      html: `
        <h2>New Portfolio Like!</h2>
        <p>Someone liked your portfolio website.</p>
        <p>Time: ${new Date().toLocaleString()}</p>
      `
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Failed to send notification' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});