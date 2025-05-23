import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Upload, History, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

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

const HomePage: React.FC = () => {
  return (
    <motion.div className="animate-fade-in" initial="initial" animate="animate" variants={pageVariants}>

      {/* Hero Section */}
      <motion.section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white"
        initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.5 }} variants={sectionVariants}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <motion.h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" whileHover={{ scale: 1.02 }}>
                Advanced Brain Tumor Detection with AI
              </motion.h1>
              <motion.p className="text-xl mb-8 text-white/90" whileHover={{ scale: 1.02 }}>
                Accurately detect and classify brain tumors from MRI scans using our state-of-the-art 
                deep learning algorithm with 93% accuracy. Our model specializes in identifying glioma, 
                meningioma, pituitary tumors, and normal cases.
              </motion.p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/scan">
                  <Button
                    variant="secondary"
                    size="lg"
                    icon={<Upload className="w-5 h-5" />}
                    className="w-full sm:w-auto"
                  >
                    Upload MRI Scan
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 w-full sm:w-auto"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary-600 rounded-full filter blur-3xl opacity-50 animate-pulse-slow"></div>
                <Brain className="relative z-10 w-48 h-48 md:w-64 md:h-64 text-white" />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section className="py-16 bg-white"
        initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.5 }} variants={sectionVariants}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How NeuroScan AI Works</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              Our advanced deep learning model has been trained on thousands of MRI scans to deliver 
              accurate and reliable brain tumor classifications. Using transfer learning with EfficientNet, 
              we achieve high precision in tumor detection while maintaining fast processing times.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm"
              whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Scan</h3>
              <p className="text-gray-600">
                Upload your MRI scan in common formats including JPEG, PNG, and DICOM. Our system 
                processes and prepares the image for analysis.
              </p>
            </motion.div>
            
            <motion.div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm"
              whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-600">
                Our deep learning model analyzes the scan to detect abnormalities and classify 
                potential tumors with high accuracy. The model uses advanced image processing techniques 
                and can identify subtle patterns that might be missed by traditional methods.
              </p>
            </motion.div>
            
            <motion.div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm"
              whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">View Results</h3>
              <p className="text-gray-600">
                Receive detailed classification results with probability scores and visualization 
                to aid in clinical decision-making. Our system provides confidence scores for each 
                classification and highlights regions of interest in the scan.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section className="py-16 bg-gray-50 border-t border-b border-gray-200"
        initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.5 }} variants={sectionVariants}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <motion.div className="text-4xl font-bold text-primary-600 mb-2" whileHover={{ scale: 1.05 }}>
                93%
              </motion.div>
              <p className="text-gray-700">Accuracy Rate</p>
            </div>
            <div className="text-center">
              <motion.div className="text-4xl font-bold text-primary-600 mb-2" whileHover={{ scale: 1.05 }}>
                10,000+
              </motion.div>
              <p className="text-gray-700">MRI Scans Analyzed</p>
            </div>
            <div className="text-center">
              <motion.div className="text-4xl font-bold text-primary-600 mb-2" whileHover={{ scale: 1.05 }}>
                4
              </motion.div>
              <p className="text-gray-700">Tumor Classifications</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section className="py-16 bg-white"
        initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.5 }} variants={sectionVariants}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl shadow-xl overflow-hidden"
            whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}>
            <div className="px-6 py-12 md:p-12 text-center md:text-left">
              <div className="md:max-w-2xl md:mx-auto lg:mx-0 text-white">
                <h2 className="text-3xl font-bold mb-4">Ready to try NeuroScan AI?</h2>
                <p className="text-xl mb-8 text-white/90">
                  Start using our advanced brain tumor detection tool today and experience 
                  the power of AI in medical diagnostics. Our system provides rapid results 
                  with detailed analysis and visualization capabilities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link to="/scan">
                    <Button
                      variant="outline"
                      size="lg"
                      icon={<Upload className="w-5 h-5" />}
                      className="bg-white text-primary-700 border-transparent hover:bg-white/90 w-full sm:w-auto"
                    >
                      Upload MRI Scan
                    </Button>
                  </Link>
                  <Link to="/history">
                    <Button
                      variant="outline"
                      size="lg"
                      icon={<History className="w-5 h-5" />}
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20 w-full sm:w-auto"
                    >
                      View Scan History
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

    </motion.div>
  );
};

export default HomePage;