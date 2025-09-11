// import { type Complaint } from '../types';

// const API_URL = 'http://localhost:5001/complaints';

// // This is the type for data used when creating a new complaint.
// type NewComplaintData = Omit<Complaint, 'id' | 'status' | 'created_at'>;

// /**
//  * Sends a new complaint to the backend using fetch.
//  * @param complaintData The data for the new complaint.
//  * @returns The newly created complaint object.
//  */
// export const createComplaint = async (complaintData: NewComplaintData): Promise<Complaint> => {
//   try {
//     const response = await fetch(API_URL, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(complaintData),
//     });

//     if (!response.ok) {
//       throw new Error(`Server responded with status: ${response.status}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error creating complaint:', error);
//     throw error;
//   }
// };

// /**
//  * Fetches all complaints from the backend using fetch.
//  * @returns An array of complaint objects.
//  */
// export const getAllComplaints = async (): Promise<Complaint[]> => {
//   try {
//     const response = await fetch(API_URL);
//     if (!response.ok) {
//       throw new Error(`Server responded with status: ${response.status}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching complaints:', error);
//     throw error;
//   }
// };

// /**
//  * Updates the status of a specific complaint using fetch.
//  * @param id The ID of the complaint to update.
//  * @param status The new status ('Pending' or 'Resolved').
//  * @returns The updated complaint object.
//  */
// export const updateComplaintStatus = async (id: number, status: Complaint['status']): Promise<Complaint> => {
//   try {
//     const response = await fetch(`${API_URL}/${id}`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ status }),
//     });

//     if (!response.ok) {
//       throw new Error(`Server responded with status: ${response.status}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error(`Error updating complaint ${id}:`, error);
//     throw error;
//   }
// };

// /**
//  * Deletes a complaint from the backend using fetch.
//  * @param id The ID of the complaint to delete.
//  */
// export const deleteComplaint = async (id: number): Promise<void> => {
//   try {
//     const response = await fetch(`${API_URL}/${id}`, {
//       method: 'DELETE',
//     });

//     // A 204 No Content response is a success, but it has no body to parse, so response.ok will be true.
//     if (!response.ok) {
//       throw new Error(`Server responded with status: ${response.status}`);
//     }
//     // For DELETE, we don't expect a body, so we don't return anything.
//   } catch (error) {
//     console.error(`Error deleting complaint ${id}:`, error);
//     throw error;
//   }
// };
import { type Complaint } from '../types';

// The base URL of our LIVE backend API on AWS App Runner
const BASE_URL = 'https://featqqdfiw.us-east-1.awsapprunner.com';

// Define the full path to the complaints endpoint
const COMPLAINTS_API_URL = `${BASE_URL}/complaints`;


// This is the type for data used when creating a new complaint.
type NewComplaintData = Omit<Complaint, 'id' | 'status' | 'created_at'>;

/**
 * Sends a new complaint to the backend using fetch.
 * @param complaintData The data for the new complaint.
 * @returns The newly created complaint object.
 */
export const createComplaint = async (complaintData: NewComplaintData): Promise<Complaint> => {
  try {
    const response = await fetch(COMPLAINTS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(complaintData),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating complaint:', error);
    throw error;
  }
};

/**
 * Fetches all complaints from the backend using fetch.
 * @returns An array of complaint objects.
 */
export const getAllComplaints = async (): Promise<Complaint[]> => {
  try {
    const response = await fetch(COMPLAINTS_API_URL);
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching complaints:', error);
    throw error;
  }
};

/**
 * Updates the status of a specific complaint using fetch.
 * @param id The ID of the complaint to update.
 * @param status The new status ('Pending' or 'Resolved').
 * @returns The updated complaint object.
 */
export const updateComplaintStatus = async (id: number, status: Complaint['status']): Promise<Complaint> => {
  try {
    // Correctly append the ID to the main complaints URL
    const response = await fetch(`${COMPLAINTS_API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating complaint ${id}:`, error);
    throw error;
  }
};

/**
 * Deletes a complaint from the backend using fetch.
 * @param id The ID of the complaint to delete.
 */
export const deleteComplaint = async (id: number): Promise<void> => {
  try {
    // Correctly append the ID to the main complaints URL
    const response = await fetch(`${COMPLAINTS_API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting complaint ${id}:`, error);
    throw error;
  }
};