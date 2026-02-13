# NLVX Arena - AI Debate Platform

A modern, serverless AI debate platform built with vanilla HTML, CSS, and JavaScript. Features real-time AI-powered debates with multiple perspectives.

## 🎯 Features

- **Multi-Perspective Debates**: Watch AI debaters with different viewpoints discuss your topics
- **Real-Time Discussions**: Join the conversation and share your thoughts
- **Fully Customizable**: Choose debaters, duration, and debate language
- **Secure API**: API keys stored safely in Vercel environment variables
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Multi-Language Support**: English, Arabic, French, Spanish, German

## 📁 Project Structure

```
nlvx-arena/
├── arena.html          # Main landing page
├── debate.html         # Debate discussion page
├── api/
│   └── debate.js       # Serverless function for AI responses
├── package.json        # Project metadata
├── vercel.json         # Vercel configuration
└── README.md           # This file
```

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nlvx-arena.git
   cd nlvx-arena
   ```

2. **Install Vercel CLI** (optional, for local testing)
   ```bash
   npm install -g vercel
   ```

3. **Run locally**
   ```bash
   vercel dev
   ```
   The site will be available at `http://localhost:3000`

### Deployment to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Add Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add `GROQ_API_KEY` with your Groq API key
   - Redeploy the project

4. **Your site is live!**
   - Vercel will provide you with a URL
   - Share it with the world

## 🔐 Security

### API Key Management

The API key is **never exposed** to the frontend:

1. **Frontend** (`arena.html`, `debate.html`): Pure HTML/CSS/JavaScript - no sensitive data
2. **Backend** (`api/debate.js`): Serverless function running on Vercel servers
3. **Environment Variables**: API key stored securely in Vercel, not in code

### How It Works

```
User Browser          Vercel Serverless      Groq API
    |                      |                    |
    |--Request debate----->|                    |
    |                      |--API Key + Request->|
    |                      |<---AI Response-----|
    |<--Response-----------|                    |
```

## 🎨 Design Features

- **Modern UI**: Gradient backgrounds, smooth animations, and glassmorphism effects
- **Apple System Fonts**: Uses native system fonts for optimal performance
- **Custom Scrollbar**: Styled scrollbar with gradient colors
- **Responsive Grid**: Adapts to all screen sizes
- **Smooth Transitions**: All interactions have polished animations

## 🌐 Supported Languages

- English (en)
- العربية (ar)
- Français (fr)
- Español (es)
- Deutsch (de)

## 👥 Debater Types

1. **Optimist** 🌟 - Sees positive potential
2. **Critic** 🎯 - Questions assumptions
3. **Analyst** 📊 - Data-driven perspective
4. **Visionary** 🚀 - Future-focused thinking
5. **Investor** 💰 - ROI and market focused
6. **Scientist** 🔬 - Evidence-based arguments
7. **Philosopher** 🧠 - Ethical implications
8. **Strategist** ♟️ - Long-term planning

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js Serverless Functions (Vercel)
- **AI**: Groq API (Mixtral 8x7b model)
- **Hosting**: Vercel
- **Version Control**: Git + GitHub

## 📝 API Endpoint

### POST `/api/debate`

Generate an AI debate response.

**Request:**
```json
{
  "topic": "Should AI be regulated?",
  "debaterType": "Optimist",
  "debateLanguage": "en",
  "context": "Previous discussion context (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "AI response text here...",
  "debater": "Optimist"
}
```

## 🔧 Configuration

### Environment Variables (Vercel)

```
GROQ_API_KEY=your_groq_api_key_here
```

### Getting a Groq API Key

1. Visit [console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Create an API key
4. Add it to Vercel environment variables

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎓 Learning Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Groq API Docs](https://console.groq.com/docs)
- [MDN Web Docs](https://developer.mozilla.org)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋 Support

For issues and questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include screenshots/error messages if applicable

## 🚀 Future Enhancements

- [ ] User authentication
- [ ] Debate history and analytics
- [ ] Custom debater creation
- [ ] Export debates as PDF
- [ ] Real-time multiplayer debates
- [ ] Mobile app version
- [ ] Advanced debate filtering

---

**Made with ❤️ by NLVX Team**

Last updated: February 2026
