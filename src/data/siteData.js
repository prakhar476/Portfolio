/**
 * siteData.js
 * ------------------------------------------------------------
 * Single source of truth for editable portfolio content.
 * Update your name, skills, projects, and education here —
 * no need to touch component files for routine content changes.
 * ------------------------------------------------------------
 */

export const profile = {
  name: 'Prakhar Singh',
  firstName: 'Prakhar',
  lastName: 'Singh',
  initials: 'PS',
  roles: ['Software Engineer', 'Full-Stack Developer', 'Cloud Engineer', 'AI Enthusiast', 'MCA Student'],
  tagline: 'MCA student with a passion for building full-stack web applications, cloud-native infrastructure, and intelligent systems. Currently exploring the intersection of software engineering and AI.',
  email: 'prakharsingh.developer@gmail.com',
  github: 'https://github.com/prakhar476',
  githubLabel: 'github.com/prakhar476',
  linkedin: 'https://linkedin.com/in/prakhar476',
  linkedinLabel: 'linkedin.com/in/prakhar476',
  location: 'India 🇮🇳',
  status: 'MCA Student · Open To Work',
}

export const sphereLabels = [
  'React', 'Python', 'AWS', 'Django', 'JS', 'CSS3', 'HTML5', 'AI/ML',
  'Terraform', 'Cloud', 'Node', 'REST', 'Git', 'Linux',
]

export const aboutInfo = [
  { label: 'Degree', value: 'MCA (Master of Computer Applications)' },
  { label: 'Status', value: 'Fresher · Open to Work' },
  { label: 'Focus', value: 'Full-Stack + Cloud + AI' },
  { label: 'Location', value: 'India 🇮🇳' },
]

export const skillCategories = [
  {
    title: 'Frontend Development',
    skills: [
      { name: 'HTML5 & CSS3', value: 90 },
      { name: 'JavaScript (ES6+)', value: 82 },
      { name: 'React.js', value: 75 },
    ],
    pills: ['HTML', 'CSS', 'JavaScript', 'React'],
    pillVariant: 'cyan',
  },
  {
    title: 'Backend & Databases',
    skills: [
      { name: 'Python', value: 80 },
      { name: 'Django', value: 70 },
      { name: 'REST APIs', value: 72 },
    ],
    pills: ['Python', 'Django', 'REST APIs'],
    pillVariant: 'cyan',
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      { name: 'AWS (EC2, S3, Lambda)', value: 68 },
      { name: 'Terraform (IaC)', value: 60 },
      { name: 'Cloud Engineering', value: 65 },
    ],
    pills: ['AWS', 'Terraform', 'Cloud'],
    pillVariant: 'violet',
  },
  {
    title: 'Artificial Intelligence',
    skills: [
      { name: 'Machine Learning', value: 65 },
      { name: 'Deep Learning Basics', value: 55 },
      { name: 'Python for AI' , value: 55 },
    ],
    pills: ['AI / ML',],
    pillVariant: 'violet',
  },
]

export const projects = [
  {
    no: '01',
    title: 'AI Task Manager',
    description: 'A Django + React application that uses NLP to auto-categorize and prioritize tasks. Integrates with a Python AI backend for smart suggestions.',
    tags: [
      { label: 'React', variant: 'cyan' },
      { label: 'Django', variant: 'cyan' },
      { label: 'Python AI', variant: 'violet' },
      { label: 'REST API', variant: 'cyan' },
    ],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    no: '02',
    title: 'Railway Reservation System',
    description: 'A railway Reservation System built with Python and Django. Focused on real time ticketing and Advance Booking Methods .',
    tags: [
      { label: 'Python', variant: 'violet' },
      { label: 'Django', variant: 'violet' },
      { label: 'SQLLite3', variant: 'cyan' },
      { label: 'JavaScript', variant: 'cyan' },
    ],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    no: '03',
    title: 'Real Time Humidity App',
    description: 'Python + Django web app that scrapes and analyzes Humidity in an Controlled Enviroment.',
    tags: [
      { label: 'HTML/CSS', variant: 'cyan' },
      { label: 'IOT', variant: 'cyan' },
      { label: 'SQL', variant: 'cyan' },
      { label: 'JavaScript', variant: 'violet' },
    ],
    githubUrl: '#',
    liveUrl: '#',
  },
]

export const educationTimeline = [
  {
    date: '2025 — 2027',
    title: 'Master of Computer Applications (MCA)',
    subtitle: 'BBD University · Lucknow · India',
    description: 'Pursuing specialization in software engineering, cloud computing, and artificial intelligence. Building projects that bridge academic theory and industry practice.',
    dotColor: 'cyan',
  },
  {
    date: '2022 — 2025',
    title: 'Bachelor of Computer Applications (BCA)',
    subtitle: 'Lucknow University · Lucknow · India',
    description: 'Core computer science foundations — data structures, OOP, databases, and web development. First exposure to Python, HTML/CSS, and JavaScript.',
    dotColor: 'violet',
  },
  {
    date: '2019 — 2020',
    title: 'Higher Secondary Education',
    subtitle: 'Kendriya Vidyalaya · Class XII · Science Stream',
    description: 'Mathematics and science background that built the analytical thinking foundation for computer science.',
    dotColor: 'muted',
  },
]

export const certifications = [
  // { icon: '☁️', title: 'AWS Cloud Practitioner', status: 'In Progress — AWS Training' },
  { icon: '🧠', title: 'Artificial Intelligence', status: 'Completed — Online Course' },
  { icon: '☁️', title: 'Data Science', status: 'Completed — Online Course' },
  // { icon: '🏗️', title: 'Terraform & IaC', status: 'In Progress — HashiCorp Learn' },
]

export const interests = ['Full-Stack Dev', 'Cloud Engineering', 'AI / ML', 'DevOps', 'Open Source', 'System Design']

export const navLinks = [
  { id: 'about', label: 'About', n: '01' },
  { id: 'skills', label: 'Skills', n: '02' },
  { id: 'projects', label: 'Projects', n: '03' },
  { id: 'education', label: 'Education', n: '04' },
  { id: 'contact', label: 'Contact', n: '05' },
]
