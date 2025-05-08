import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Users, BookOpen, BarChart, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-20 sm:pb-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight animate-slide-down">
              Student Management System
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed animate-slide-down [animation-delay:150ms]">
              Streamline your educational institution with our comprehensive student management solution.
              Track, manage, and optimize student data with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-down [animation-delay:300ms]">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-8 animate-slide-up">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage your educational institution effectively
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Users className="w-6 h-6 text-blue-600" />,
              bgColor: "bg-blue-100",
              title: "Student Management",
              description: "Easily manage student records, attendance, and academic progress."
            },
            {
              icon: <GraduationCap className="w-6 h-6 text-green-600" />,
              bgColor: "bg-green-100",
              title: "Course Tracking",
              description: "Track courses, grades, and academic performance efficiently."
            },
            {
              icon: <BookOpen className="w-6 h-6 text-purple-600" />,
              bgColor: "bg-purple-100",
              title: "Academic Records",
              description: "Maintain comprehensive academic records and transcripts."
            },
            {
              icon: <BarChart className="w-6 h-6 text-orange-600" />,
              bgColor: "bg-orange-100",
              title: "Analytics",
              description: "Get insights with detailed analytics and reporting tools."
            }
          ].map((feature, index) => (
            <div 
              key={feature.title}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 animate-scale-in hover:scale-105"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 mt-auto animate-slide-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of educational institutions already using our platform
            </p>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105"
            >
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 