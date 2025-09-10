import { type Complaint } from '../types';

const API_URL = 'http://localhost:5001/complaints';

type NewComplaintData = Omit<Complaint, 'id' | 'status' | 'created_at'>;

export const createComplaint = async (complaintData: NewComplaintData): Promise<Complaint> => {
  console.log("Attempting to send request using FETCH...");
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(complaintData),
    });

    // Check if the server responded with an error status
    if (!response.ok) {
      // If so, throw an error to be caught by the catch block
      throw new Error(`Server responded with status: ${response.status}`);
    }

    // If the response is OK, parse the JSON and return it
    const createdComplaint: Complaint = await response.json();
    return createdComplaint;
    
  } catch (error) {
    console.error('Error creating complaint with FETCH:', error);
    throw error;
  }
};