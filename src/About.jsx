import React from 'react';
import Header from './components/Header';

const About = () => {
  return (
    <div>
        <Header/>
        <section className="bg-gray-100 py-12">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 sm:text-4xl">
          About Us
        </h2>
        <p className="mt-4 max-w-2xl text-center text-gray-500 mx-auto">
          At CarCraze, we connect buyers and sellers of new and used cars in a seamless, transparent manner. Our mission is to simplify the car buying and selling experience, ensuring that our customers find exactly what they need.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800">Our Mission</h3>
            <p className="mt-2 text-gray-600">
              We aim to revolutionize the way people buy and sell cars by providing a user-friendly platform that guarantees trust and efficiency.
            </p>
          </div>
          <div className="rounded-lg bg-white shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800">Our Vision</h3>
            <p className="mt-2 text-gray-600">
              To become the leading online marketplace for car transactions, making car buying and selling a hassle-free experience for everyone.
            </p>
          </div>
          <div className="rounded-lg bg-white shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800">Our Values</h3>
            <p className="mt-2 text-gray-600">
              Integrity, transparency, and customer satisfaction are at the core of everything we do. We prioritize our customers' needs above all.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-center text-gray-900">
            Customer Testimonials
          </h3>
          <p className="mt-4 max-w-2xl text-center text-gray-500 mx-auto">
            Hear what our satisfied customers have to say about their experience with CarCraze.
          </p>
        </div>
        
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white shadow-md p-6">
            <p className="text-gray-600 italic">"I had a fantastic experience buying my car from CarCraze! Highly recommended!"</p>
            <h4 className="mt-4 font-semibold text-gray-800">- Alex R.</h4>
          </div>
          <div className="rounded-lg bg-white shadow-md p-6">
            <p className="text-gray-600 italic">"Selling my car was quick and easy. Great platform!"</p>
            <h4 className="mt-4 font-semibold text-gray-800">- Sarah T.</h4>
          </div>
          <div className="rounded-lg bg-white shadow-md p-6">
            <p className="text-gray-600 italic">"A user-friendly site with excellent customer service. I will definitely use it again!"</p>
            <h4 className="mt-4 font-semibold text-gray-800">- Mike L.</h4>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default About;
