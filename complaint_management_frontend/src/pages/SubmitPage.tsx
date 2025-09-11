import { useState } from 'react';
import { createComplaint } from '../services/complaintService';

const SubmitPage = () => {
  // State for each form field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [complaint, setComplaint] = useState('');

  // State for handling submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the browser from reloading the page

    // Reset previous messages
    setSuccessMessage('');
    setErrorMessage('');
    
    // Simple validation
    if (!name || !email || !complaint) {
      setErrorMessage('All fields are required.');
      return;
    }

    setIsSubmitting(true);
    
    // --- DEBUGGING LOGS ---
    console.log("Step 1: Form submitted. Attempting to send data to backend...");
    console.log("Data:", { name, email, complaint });

    try {
      const complaintData = { name, email, complaint };
      
      console.log("Step 2: Calling 'createComplaint' service function.");
      await createComplaint(complaintData);
      console.log("Step 4: 'createComplaint' service function SUCCEEDED."); // This line should not be reached if it's stuck

      setSuccessMessage('Your complaint has been submitted successfully!');
      setName('');
      setEmail('');
      setComplaint('');

    } catch (error) {
      console.error("Step 4: 'createComplaint' service function FAILED."); // This line should be reached on error
      setErrorMessage('Failed to submit complaint. Please try again later.');
      console.error("Error object:", error); // Log the full error object
    } finally {
      console.log("Step 5: 'finally' block executed. Re-enabling submit button.");
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6 text-white">Submit a Complaint</h2>
      <p className="text-center text-gray-400 mb-8">
        We value your feedback. Please fill out the form below.
      </p>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
            placeholder="Ram"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
            placeholder="ram@gmail.com"
          />
        </div>

        <div>
          <label htmlFor="complaint" className="block text-sm font-medium text-gray-300 mb-2">
            Complaint
          </label>
          <textarea
            id="complaint"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            rows={5}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
            placeholder="Please describe your issue..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold text-white transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>

        {/* Display Success or Error Messages */}
        {successMessage && <p className="text-green-400 text-center">{successMessage}</p>}
        {errorMessage && <p className="text-red-400 text-center">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default SubmitPage;