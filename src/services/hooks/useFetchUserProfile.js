import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../api/User';

export const useFetchUserProfile = (currentUser) => {

    const dispatch = useDispatch();
    const { id: currentUserId } = useSelector(state => state.authSlice.authData);
    const { userData, isUserDataLoading, errors } = useSelector(state => state.userSlice);
    const [userForm, setUserForm] = useState({
        id: '',
        firstName: '',
        lastName: '',
        fullName: '',
        email: '',
        birthDate: '',
        gender: '',
        address: '',
        city: '',
        country: '',
        state: '',
        postalCode: ''
    });

    useEffect(() => {
        if (currentUserId) {
            dispatch(fetchUserData({ currentUserId }));
        }
    }, [currentUserId, dispatch]);

    useEffect(() => {
        if(userData.id) {
            setUserForm(currentUser(userData))
        }
    }, [userData.id, dispatch]);

    return { userForm, setUserForm, isUserDataLoading, errors };
}