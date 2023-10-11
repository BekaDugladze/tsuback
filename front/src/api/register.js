import { API_ENDPOINT } from ".";

export const addNewUser = async (newName, newLastName, newEmail, newPersonalN, newPassword ) => {
    const response = await fetch(`${API_ENDPOINT}/register`, {
        method: 'POST',
        body: JSON.stringify({
            name: newName,
            lastName: newLastName,
            email: newEmail,
            personalN: newPersonalN,
            password: newPassword
        }),
        headers: {
            "content-type": "application/json"
        }
    })
    const newUser = await response.json();
    return newUser
}

export const getUser = async () => {
    const response = await fetch(`${API_ENDPOINT}/register`);
    const users = await response.json();
  
    return users;
  };

  export const updateUser = async (personalN, newPassword) => {
    const response = await fetch(`${API_ENDPOINT}/register/${personalN}`, { 
        method: 'PUT',
        body: JSON.stringify({
            newPassword
        }),
        headers: { "Content-Type" : "application/json" }
    });
    return response.status
  }
  