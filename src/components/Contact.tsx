'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { sendContactForm } from '@/store/contactSlice';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { locations, loading, success, error } = useSelector((state: RootState) => state.contact);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(sendContactForm(formData));
  };

  return (
    <>
      {/* Map Section */}
      <div className="h-[500px] w-full">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111551.9926412813!2d-90.27317134641879!3d38.606612219170856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sbd!4v1597926938024!5m2!1sen!2sbd"
          className="w-full h-full border-0"
          allowFullScreen
          aria-hidden="false"
          tabIndex={0}
        />
      </div>

      {/* Contact Section */}
      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <div className="mb-10">
                <span className="text-[#e53637] text-sm font-bold uppercase tracking-wider block mb-4">
                  Information
                </span>
                <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
                <p className="text-[#707070]">
                  As you might expect of a company that began as a high-end interiors contractor, we pay
                  strict attention.
                </p>
              </div>

              <ul className="space-y-6">
                {locations.map((location) => (
                  <li key={location.id}>
                    <h4 className="text-xl font-bold mb-2">{location.country}</h4>
                    <p className="leading-7">
                      {location.address} <br />
                      {location.phone}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      required
                      className="w-full h-[50px] border border-[#e1e1e1] px-5 text-[#b7b7b7]"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                      className="w-full h-[50px] border border-[#e1e1e1] px-5 text-[#b7b7b7]"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    required
                    className="w-full h-[150px] border border-[#e1e1e1] p-5 text-[#b7b7b7] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-black text-white font-bold uppercase tracking-[4px] py-4 px-8 hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>

                {success && (
                  <div className="text-green-500">Message sent successfully!</div>
                )}
                {error && (
                  <div className="text-red-500">{error}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;