# Kepler Credit Score Application

A comprehensive React Native mobile application for credit score monitoring and financial insights, built with Expo and featuring Egyptian market integration.

## 🌟 Features

- **Real-time Credit Score Monitoring** - Track your credit score with interactive gauges and visual indicators
- **Credit Score Factors Analysis** - Detailed breakdown of factors affecting your credit score
- **Weekly Reports** - Automated weekly credit reports with EGP pricing (95 EGP/week)
- **Personalized Insights** - AI-powered recommendations to improve your credit score
- **Secure Authentication** - Email-based authentication with robust validation
- **Notifications System** - Stay updated with credit score changes and alerts
- **Egyptian Market Focus** - Localized for Egyptian users with EGP currency support
- **Responsive Design** - Optimized for both mobile and tablet devices

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router
- **UI Components**: Custom components with Lucide React Native icons
- **Email Service**: Gmail SMTP integration for automated reports
- **State Management**: React Hooks
- **Styling**: React Native StyleSheet with responsive design

## 📱 Screenshots

### Main Dashboard
- Credit score gauge with color-coded indicators
- Quick actions for common tasks
- Recent notifications and alerts

### Insights & Recommendations
- Personalized credit improvement suggestions
- Impact analysis for each recommendation
- Educational resources and tips

### Settings & Reports
- Weekly report subscription management
- Account preferences and notifications
- Terms and conditions

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- React Native development environment

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mahmouddattiaa/kepler-credit-app.git
cd kepler-credit-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on your device:
- Download Expo Go app on your mobile device
- Scan the QR code from the terminal
- Or run on iOS/Android simulator

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# API Configuration
API_BASE_URL=your-api-endpoint
API_KEY=your-api-key

# App Configuration
APP_NAME=Kepler
APP_VERSION=1.0.0
```

## 📂 Project Structure

```
kepler-credit-app/
├── app/                          # Main application screens
│   ├── (tabs)/                   # Tab-based navigation
│   │   ├── index.tsx            # Dashboard/Home screen
│   │   ├── insights.tsx         # Credit insights and recommendations
│   │   ├── profile.tsx          # Settings and profile
│   │   └── report.tsx           # Credit reports
│   ├── signin.tsx               # Authentication screen
│   ├── signup.tsx               # User registration
│   ├── notifications.tsx        # Notifications screen
│   └── terms.tsx               # Terms and conditions
├── components/                   # Reusable UI components
│   ├── CreditScoreGauge.tsx     # Credit score visualization
│   ├── ScoreFactors.tsx         # Credit factors breakdown
│   ├── QuickActions.tsx         # Dashboard quick actions
│   ├── NotificationPopup.tsx    # Notification components
│   └── ChatPopup.tsx           # Chat interface
├── assets/                      # Static assets
│   └── images/                  # App images and logos
├── hooks/                       # Custom React hooks
└── email-server/               # Email service backend
```

## 🎨 Design Features

- **Modern UI/UX** - Clean, intuitive interface with Egyptian market considerations
- **Color-coded Credit Scores** - Visual indicators for different credit ranges
- **Responsive Layout** - Optimized for various screen sizes
- **Accessibility** - Screen reader support and high contrast modes
- **Dark/Light Theme** - Automatic theme detection (future enhancement)

## 📊 Credit Score Ranges

- **Excellent (750-850)**: Green indicators, premium features
- **Good (650-749)**: Blue indicators, standard features
- **Fair (550-649)**: Yellow indicators, improvement suggestions
- **Poor (300-549)**: Red indicators, recovery recommendations

## 💰 Pricing

- **Basic Features**: Free
- **Weekly Reports**: 95 EGP per week
- **Premium Insights**: Coming soon

## 🔒 Security & Privacy

- End-to-end encryption for sensitive data
- Secure authentication with email verification
- GDPR compliant data handling
- Regular security audits and updates

## 🌍 Localization

Currently optimized for:
- Egyptian market (EGP currency)
- English language interface
- Local banking integration (future enhancement)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful commit messages
- Add comments for complex logic
- Test on both iOS and Android
- Ensure responsive design compliance

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact & Support

- **Developer**: Mahmoud Dattia
- **Email**: your-email@example.com
- **GitHub**: [@mahmouddattiaa](https://github.com/mahmouddattiaa)

## 🙏 Acknowledgments

- Expo team for the excellent React Native framework
- Lucide for beautiful icons
- Egyptian financial sector for market insights
- Open source community for continuous inspiration

## 🚀 Roadmap

### Version 1.1 (Coming Soon)
- [ ] Arabic language support
- [ ] Dark theme implementation
- [ ] Bank account integration
- [ ] Advanced analytics dashboard

### Version 1.2 (Future)
- [ ] AI-powered credit coaching
- [ ] Social credit challenges
- [ ] Referral program
- [ ] iOS/Android native optimizations

---

**Made with ❤️ in Egypt for the Egyptian financial community**

*Kepler - Your Credit Score Journey Starts Here*
