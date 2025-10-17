import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2,
  FileText,
  CheckCircle,
  Users,
  Home,
  Briefcase,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import "./LandingPage.css";

const LandingPage = () => {
  const departments = [
    { icon: Building2, name: "Department of Interior", color: "#1e40af" },
    { icon: Briefcase, name: "Department of Commerce", color: "#059669" },
    { icon: Home, name: "Department of Housing", color: "#f59e0b" },
    { icon: ShieldCheck, name: "Department of Justice", color: "#dc2626" },
  ];

  const steps = [
    {
      number: "01",
      title: "Apply",
      description: "Submit your service request with required documents online",
      icon: FileText,
    },
    {
      number: "02",
      title: "Process",
      description:
        "Our officers review and process your application efficiently",
      icon: Users,
    },
    {
      number: "03",
      title: "Receive",
      description: "Get your approved documents and services delivered",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Building2 size={32} />
              <span>E-Government Portal</span>
            </div>
            <nav className="nav-menu">
              <Link to="/citizen/login" className="nav-link">
                Citizen Login
              </Link>
              <Link to="/officer/login" className="nav-link">
                Officer Login
              </Link>
              <Link to="/admin/login" className="nav-link">
                Admin Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="hero-title">
              Your Digital Gateway to
              <span className="gradient-text"> Government Services</span>
            </h1>
            <p className="hero-description">
              Access essential government services anytime, anywhere. Fast,
              secure, and transparent digital services for all citizens.
            </p>
            <div className="hero-buttons">
              <Link to="/citizen/register" className="btn btn-primary btn-lg">
                Get Started
                <ArrowRight size={20} />
              </Link>
              <Link to="/citizen/login" className="btn btn-outline btn-lg">
                Login
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">How It Works</h2>
            <p className="section-description">
              Simple and streamlined process to access government services
            </p>
          </motion.div>
          <div className="steps-grid">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="step-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="step-number">{step.number}</div>
                <div className="step-icon">
                  <step.icon size={32} />
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="departments-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Government Departments</h2>
            <p className="section-description">
              Access services from various government departments
            </p>
          </motion.div>

          <div className="departments-grid">
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                className="department-card"
                style={{ "--dept-color": dept.color }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <dept.icon size={40} />
                <h3>{dept.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Access Our Services?</h2>
            <p>Join thousands of citizens using our digital platform</p>
            <Link to="/citizen/login" className="btn btn-primary btn-lg">
              Login to Access Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <Building2 size={24} />
              <span>E-Government Portal</span>
            </div>
            <p className="footer-text">
              © 2025 E-Government Services. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
