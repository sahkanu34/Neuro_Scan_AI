import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Activity, Database, Shield, Server, ChevronRight, BarChart2, Zap, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

const AboutPage: React.FC = () => {
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8 } }
  };

  const sectionVariants = {
    offscreen: { opacity: 0, y: 50 },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', bounce: 0.2, duration: 0.8 }
    }
  };

  return (
    <motion.div 
      className="animate-fade-in"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      {/* Hero Section */}
      <motion.section 
        className="bg-gradient-to-br from-primary-500 to-primary-700 text-white"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.5 }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              whileHover={{ scale: 1.02 }}
            >
              About NeuroScan AI
            </motion.h1>
            <motion.p 
              className="max-w-3xl mx-auto text-xl text-white/90"
              whileHover={{ scale: 1.02 }}
            >
              Our mission is to revolutionize brain tumor diagnosis through advanced artificial intelligence,
              achieving 93% accuracy in tumor detection and classification.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Technology Section */}
      <motion.section 
        className="py-16 bg-white"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.5 }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Technology</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              NeuroScan AI leverages state-of-the-art deep learning techniques, including transfer learning
              with EfficientNet, to deliver highly accurate brain tumor detection and classification.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">The Deep Learning Model</h3>
              <ul className="space-y-6">
                <motion.li 
                  className="flex"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-md bg-primary-100 flex items-center justify-center">
                      <Brain className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Advanced Architecture</h4>
                    <p className="mt-1 text-gray-600">
                      Our model uses EfficientNet-B4 with transfer learning, fine-tuned specifically for
                      brain MRI analysis, achieving superior performance in tumor detection.
                    </p>
                  </div>
                </motion.li>
                <motion.li 
                  className="flex"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-md bg-primary-100 flex items-center justify-center">
                      <Database className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Comprehensive Training</h4>
                    <p className="mt-1 text-gray-600">
                      Trained on over 10,000 diverse MRI scans with data augmentation techniques,
                      including rotation, zoom, and intensity variations for robust performance.
                    </p>
                  </div>
                </motion.li>
                <motion.li 
                  className="flex"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-md bg-primary-100 flex items-center justify-center">
                      <Activity className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">High Accuracy Performance</h4>
                    <p className="mt-1 text-gray-600">
                      Achieving 93% overall accuracy with specialized performance for each tumor type,
                      validated through extensive clinical testing and peer review.
                    </p>
                  </div>
                </motion.li>
              </ul>
            </div>
            
            <motion.div 
              className="bg-gray-50 p-6 rounded-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-200">
                <img
                  src="https://images.pexels.com/photos/4226122/pexels-photo-4226122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="AI model visualization"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-2">Tumor Classifications</h4>
                <div className="space-y-2">
                  <motion.div 
                    className="bg-white p-3 rounded border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">Glioma</span>
                      <span className="text-primary-600">Detection Rate: 92.8%</span>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="bg-white p-3 rounded border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">Meningioma</span>
                      <span className="text-primary-600">Detection Rate: 93.5%</span>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="bg-white p-3 rounded border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">Pituitary Tumor</span>
                      <span className="text-primary-600">Detection Rate: 92.3%</span>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="bg-white p-3 rounded border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">No Tumor</span>
                      <span className="text-primary-600">Accuracy: 93.4%</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* System Architecture Section */}
      <motion.section 
        className="py-16 bg-white border-t border-gray-200"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.5 }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">System Architecture</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              NeuroScan AI is built on a robust, scalable architecture designed for security,
              reliability, and performance.
            </p>
          </div>
          
          <motion.div 
            className="bg-white p-8 rounded-lg shadow-sm border border-gray-200"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="text-center p-6 rounded-lg bg-gray-50"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Server className="h-12 w-12 text-secondary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">FastAPI Backend</h3>
                <p className="text-gray-600">
                  Our high-performance Python backend leverages FastAPI for real-time inference
                  with low latency and high throughput.
                </p>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 rounded-lg bg-gray-50"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Brain className="h-12 w-12 text-secondary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Deep Learning Core</h3>
                <p className="text-gray-600">
                  Built with TensorFlow and optimized for production, our model delivers
                  consistent, accurate predictions at scale.
                </p>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 rounded-lg bg-gray-50"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Shield className="h-12 w-12 text-secondary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">HIPAA Compliant</h3>
                <p className="text-gray-600">
                  End-to-end encryption and secure data handling ensure patient privacy
                  and regulatory compliance.
                </p>
              </motion.div>
            </div>
            
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-xl font-semibold mb-4">Deployment Architecture</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div 
                  className="bg-gray-50 p-4 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <h4 className="font-medium mb-2">Frontend</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <ChevronRight className="h-4 w-4 text-primary-500 mr-2" />
                      React.js with TypeScript
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="h-4 w-4 text-primary-500 mr-2" />
                      Tailwind CSS for responsive design
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="h-4 w-4 text-primary-500 mr-2" />
                      Optimized for all device sizes
                    </li>
                  </ul>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-50 p-4 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <h4 className="font-medium mb-2">Backend</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <ChevronRight className="h-4 w-4 text-primary-500 mr-2" />
                      FastAPI for high-performance APIs
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="h-4 w-4 text-primary-500 mr-2" />
                      Docker containerization
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="h-4 w-4 text-primary-500 mr-2" />
                      Kubernetes orchestration for scaling
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Model Performance Section */}
      <motion.section 
        className="py-16 bg-gray-50 border-t border-gray-200"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.5 }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Model Performance</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              Our model's performance metrics demonstrate its reliability and effectiveness in clinical settings.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <BarChart2 className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-center mb-2">93% Overall Accuracy</h3>
              <p className="text-gray-600 text-center">
                Validated through extensive testing with diverse patient demographics
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Zap className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-center mb-2">Fast Processing</h3>
              <p className="text-gray-600 text-center">
                Results delivered in under 30 seconds per scan
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Clock className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-center mb-2">24/7 Availability</h3>
              <p className="text-gray-600 text-center">
                Continuous operation with 99.9% uptime guarantee
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-16 bg-white"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.5 }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Try NeuroScan AI?</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-8">
              Experience the power of AI-assisted brain tumor detection. Upload a scan and 
              get results in seconds with our 93% accurate model.
            </p>
            <Link to="/scan">
              <Button size="lg">
                Upload a Scan Now
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default AboutPage;