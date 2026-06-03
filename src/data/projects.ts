import type { Project } from '@/types'

export const projects: Project[] = []
export const featuredProjects: Project[] = [
  {
    slug: 'sales-prediction-system',
    title: 'Sales Prediction System',
    description:
      'A machine learning-based sales forecasting system that predicts future sales using historical advertising and sales data.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Matplotlib'],
    features: [
      'Data analysis',
      'Data visualization',
      'Predictive modeling',
      'Sales forecasting dashboard',
    ],
  },
  {
    slug: 'teamtalk-pro',
    title: 'TeamTalk Pro+',
    description:
      'A real-time communication platform built for seamless messaging and collaboration.',
    technologies: ['React', 'Node.js', 'Express.js', 'MySQL', 'Socket.IO'],
    features: [
      'Real-time messaging',
      'JWT authentication',
      'File sharing',
      'Admin dashboard',
      'User management',
    ],
  },
  {
    slug: 'echoboard',
    title: 'EchoBoard',
    description:
      'A modern collaborative platform for communication, idea sharing, and team productivity.',
    technologies: ['React', 'Node.js', 'Express.js', 'MySQL'],
    features: [
      'Team collaboration',
      'Interactive dashboard',
      'Authentication system',
      'Responsive design',
      'Real-time updates',
    ],
  },
  {
    slug: 'multimodal-emotion-recognition',
    title: 'Multimodal Emotion Recognition',
    description:
      'An AI-based system that detects and analyzes human emotions using multiple data sources such as facial expressions and speech.',
    technologies: ['Python', 'Machine Learning', 'Deep Learning', 'Computer Vision'],
    features: [
      'Emotion detection',
      'Facial expression analysis',
      'Speech analysis',
      'Research-oriented architecture',
    ],
  },
]
