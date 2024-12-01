// src/App.jsx

import HootList from './components/HootList/HootList';
import * as hootService from './services/hootService';
import { useState, createContext, useEffect } from 'react';
import HootDetails from './components/HootDetails/HootDetails';
import HootForm from './components/HootForm/HootForm.jsx';
const App = async () => {

const handleUpdateHoot = async (hootId, hootFormData) => {
    const updatedHoot = await hootService.update(hootId, hootFormData);
  
    setHoots(hoots.map((hoot) => (hootId === hoot._id ? updatedHoot : hoot)));
  
    navigate(`/hoots/${hootId}`);
  };

const [hoots, setHoots] = useState([]);
const navigate = useNavigate();
const handleAddHoot = async (hootFormData) => {
    const newHoot = await hootService.create(hootFormData);
    setHoots([newHoot, ...hoots]);
    navigate('/hoots');
  };

  const handleDeleteHoot = async (hootId) => {
    // Call upon the service function:
    const deletedHoot = await hootService.deleteHoot(hootId);
    // Filter state using deletedHoot._id:
    setHoots(hoots.filter((hoot) => hoot._id !== deletedHoot._id));
    // Redirect the user:
    navigate('/hoots');
  };

  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();
      setHoots(hootsData);
    };
    if (user) fetchAllHoots();
  }, [user]);  // Ensure `user` is part of the dependencies
  
return (
<Routes>
  {user ? (
    // Protected Routes:
    <>
      <Route path="/" element={<Dashboard user={user} />} />
      <Route path="/hoots" element={<HootList hoots={hoots} />} />
      <Route path="/hoots/new" element={<HootForm handleAddHoot={handleAddHoot} />} />
      <Route path="/hoots/:hootId" element={<HootDetails handleDeleteHoot={handleDeleteHoot} />} />
      <Route path="/hoots/:hootId/edit" element={<HootForm handleUpdateHoot={handleUpdateHoot} />} />
    </>
  ) : (
    // Public Route:
    <Route path="/" element={<Landing />} />
  )}
  <Route path="/signup" element={<SignupForm setUser={setUser} />} />
  <Route path="/signin" element={<SigninForm setUser={setUser} />} />
</Routes>
)}
