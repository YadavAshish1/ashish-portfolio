import React, { useEffect, useState } from 'react';
import { Github,Code, Linkedin, Mail, ChevronDown, ExternalLink, Code2, Globe, Palette, Terminal, Layout, Sparkles, Star, Send, Menu, X } from 'lucide-react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, isSubmitting: true });

    try {
      const mailtoUrl = `mailto:ashishyadav935192@gmail.com?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      window.location.href = mailtoUrl;

      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        error: null
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: 'Failed to send message. Please try again.'
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a1f] text-white overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-rose-500 transform origin-left z-50"
        style={{ scaleX }}
      />

      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="fixed top-0 left-0 right-0 z-40 bg-[#0a0a1f]/80 backdrop-blur-lg border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
          
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-rose-400 text-transparent bg-clip-text cursor-pointer"
              onClick={() => scrollToSection('hero')}
            >
             A. Portfolio
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-indigo-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        <motion.div
          initial="closed"
          animate={isMenuOpen ? "open" : "closed"}
          variants={menuVariants}
          className="md:hidden fixed inset-y-0 right-0 w-64 bg-[#0a0a1f]/95 backdrop-blur-xl shadow-xl z-50 border-l border-white/10"
        >
          <div className="flex flex-col p-4 space-y-4 mt-16">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 10 }}
                onClick={() => scrollToSection(item.id)}
                className={`text-left p-2 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-white/10 text-indigo-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      <section id="hero" className="min-h-screen relative pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-rose-900/20 animate-gradient"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-[120px] -top-48 -left-24"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute w-[400px] h-[400px] bg-rose-500/30 rounded-full blur-[100px] top-96 -right-24"
          />
        </div>

        <div className="relative flex flex-col items-center justify-center min-h-screen px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center mb-6 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full blur-lg opacity-50" />
              <Code2 className="w-16 h-16 text-white relative" />
            </motion.div>
            
             <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-4 text-center">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400 text-transparent bg-clip-text animate-gradient">
                Ashish Yadav
              </span>
            </motion.h1>
            <motion.p variants={itemVariants}  className="text-2xl md:text-3xl font-semibold mb-4 text-center">
              <span className="bg-gradient-to-r from-rose-400 to-indigo-400 text-transparent bg-clip-text animate-gradient">
                Full Stack Developer
              </span>
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-400 mb-8 text-center max-w-2xl mx-auto"
            >
              Crafting beautiful, responsive, and user-friendly web experiences
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex gap-6 justify-center mb-12"
            >
              {[
                { icon: Github, href: "https://github.com/YadavAshish1" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/ashish-krishnam-yadav-437ba3190/" },
                { icon: Mail, href: "mailto:ashishyadav935192@gmail.com" }
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/5 rounded-lg hover:bg-white/10 hover:shadow-lg hover:shadow-indigo-500/20"
                >
                  <item.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            animate={{
              y: [0, 10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-8"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </div>
      </section>

      <section id="projects" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-400 to-rose-400 text-transparent bg-clip-text">
                Featured Projects
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A collection of my recent work showcasing web development and design expertise
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-500 backdrop-blur-sm"
              >
                <div className="aspect-video relative overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1f] via-[#0a0a1f]/50 to-transparent opacity-90" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <project.icon className="w-5 h-5 text-indigo-400" />
                    <span className="text-sm text-indigo-400">{project.category}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-white/5 rounded-full text-sm hover:bg-white/10 transition-colors"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    View Project <ExternalLink className="w-4 h-4 ml-2" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 relative bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-400 to-rose-400 text-transparent bg-clip-text">
              Expertise & Mentorship
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive web development solutions tailored to your needs
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-500 backdrop-blur-sm"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500/20 to-rose-500/20 flex items-center justify-center mb-4"
                >
                  <service.icon className="w-6 h-6 text-indigo-400" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-400 to-rose-400 text-transparent bg-clip-text">
                Technical Skills
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Technologies and tools I work with to bring ideas to life
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-500"
              >
                <h3 className="font-bold mb-4 text-lg flex items-center gap-2">
                  <Star className="w-5 h-5 text-indigo-400" />
                  {skill.category}
                </h3>
                <div className="space-y-4">
                  {skill.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <motion.div
                        className="w-full bg-white/10 rounded-full h-2"
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className="bg-gradient-to-r from-indigo-400 to-rose-400 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                        />
                      </motion.div>
                      <span className="text-sm text-gray-400 min-w-[100px]">{item.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-400 to-rose-400 text-transparent bg-clip-text">
              Let’s Connect!
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Are you hiring? I’d love to contribute to your team. Let’s create something amazing!
            </p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto bg-white/5 p-8 rounded-2xl backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <motion.div
                variants={itemVariants}
                className="relative"
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors text-white placeholder-gray-400"
                />
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="relative"
              >
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors text-white placeholder-gray-400"
                />
              </motion.div>
            </div>
            <motion.div
              variants={itemVariants}
              className="mb-6"
            >
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Subject"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors text-white placeholder-gray-400"
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="mb-6"
            >
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your Message"
                rows={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors text-white placeholder-gray-400 resize-none"
              />
            </motion.div>
            <motion.button
              type="submit"
              disabled={formStatus.isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-4 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-lg font-semibold text-white hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {formStatus.isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  Send Message
                  <Send className="w-5 h-5" />
                </>
              )}
            </motion.button>
            {formStatus.isSubmitted && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-green-400 text-center"
              >
                Thank you for your message! I'll get back to you soon.
              </motion.p>
            )}
            {formStatus.error && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-rose-400 text-center"
              >
                {formStatus.error}
              </motion.p>
            )}
          </motion.form>
        </motion.div>
      </section>

      <footer className="py-8 text-center text-gray-400 border-t border-white/10">
        <p>© 2025 A. Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );
}

const projects = [
  {
    title: "Task Management App",
    description: "Collaborative task management platform with real-time updates",
    image: "./public/teeam.png",
    category: "Full Stack",
    icon: Terminal,
    technologies: ["Next", "Express", "PostgreSQL", "Git lab", "CI/CD", "vercel"],
    link: "https://teeam.vercel.app/"
  },
  {
    title: "Portfolio Website",
    description: "Responsive portfolio website with modern animations and clean design",
    image: "./public/portfolio.png",
    category: "Web Design",
    icon: Layout,
    technologies: ["React", "Typescript","Vite" ,"Tailwind CSS", "Framer Motion"],
    link: "#"
  },
  {
    title: "CrimeCracker Website",
    description: "User-friendly platform for reporting suspected crimes",
    image: "./public/cs.png",
    category: "Web Design",
    icon: Palette,
    technologies: ["HTML", "CSS", "Javascript"],
    link: "https://yadavashish1.github.io/Crime-Solver/"
  },
  {
    title: "Npm Package",
    description: "A lightweight and easy-to-use npm package for tracking user activity and location on a website",
    image: "./public/npm.png",
    category: "Package",
    icon: Code,
    technologies: ["Javascript", "npm"],
    link: "https://github.com/YadavAshish1/analytics-package"
  }
];

const services = [
  {
    title: "Web Development",
    description: "Building responsive and performant web applications with modern technologies",
    icon: Code2
  },
  {
    title: "CI/CD & Deployment",
    description: "Implementing robust deployment pipelines and automated workflows for seamless delivery",
    icon: Layout
  },
  {
    title: "Frontend Development",
    description: "Crafting engaging user experiences with modern frameworks and tools",
    icon: Palette
  },
  {
    title: "Backend Development",
    description: "Building robust and scalable server-side solutions and APIs",
    icon: Terminal
  },
  {
    title: "Performance Optimization",
    description: "Optimizing web applications for speed and efficiency",
    icon: Sparkles
  },
  {
    title: "Developer Mentorship",
    description: "Guiding and nurturing junior developers and interns to reach their full potential",
    icon: Globe
  }
];

const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React", proficiency: 95 },
      { name: "Vite", proficiency: 90 },
      { name: "Tailwind CSS", proficiency: 95 },
      { name: "Next.js", proficiency: 88 }
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", proficiency: 90 },
      { name: "Express", proficiency: 85 },
      { name: "Python", proficiency: 80 },
      { name: "Django", proficiency: 90 }
    ]
  },
  {
    category: "Tools & DevOps",
    items: [
      { name: "Git", proficiency: 92 },
      { name: "Docker", proficiency: 85 },
      { name: "AWS", proficiency: 80 },
      { name: "CI/CD", proficiency: 85 }
    ]
  },
  {
    category: "Databases",
    items: [
      { name: "MongoDb", proficiency: 90 },
      { name: "MySql", proficiency: 90 },
      { name: "Redis", proficiency: 90 },
      { name: "PostgreSQL", proficiency: 85 }
    ]
  },
  {
    category: "Languages",
    items: [
      { name: "JavaScript", proficiency: 95 },
      { name: "TypeScript", proficiency: 80 },
      { name: "Python", proficiency: 80 },
      { name: "SQL", proficiency: 90 }
    ]
  },
  {
    category: "Other Skills",
    items: [
      { name: "REST APIs", proficiency: 95 },
      { name: "Kafka", proficiency: 85 },
      { name: "Testing", proficiency: 88 },
      { name: "Optimization", proficiency: 90 }
    ]
  }
];

export default App;