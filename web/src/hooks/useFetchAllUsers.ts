import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

type UserType = {
  id: string;
  name: string;
};

export const useFetchAllUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = () => {
      const db = getDatabase();
      const usersRef = ref(db, 'users/');

      onValue(usersRef, (snapshot) => {
        const usersData = snapshot.val();
        const usersArray: UserType[] = [];

        for (const userId in usersData) {
          usersArray.push({
            id: userId,
            name: usersData[userId].name,
          });
        }

        setUsers(usersArray);
        setLoading(false);
      }, (errorObject) => {
        console.error("Error fetching users:", errorObject);
        setError("Failed to fetch users");
        setLoading(false);
      });
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};
