'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import styles from './page.module.scss';
import TodoComponent from '../components/adminPanel/toDo/toDo';
import ProfileComponent from '../components/adminPanel/profile/profile';
import SettingsComponent from '../components/adminPanel/settings/settings';
import UsersComponent from '../components/adminPanel/users/users';
import { useEffect } from 'react';
import { checkAuth } from '@/services/auth';
import {setUser} from '@/store/user/userSlice';

const AdminPanelContainer = () => {

    const {activeSection} = useAppSelector(state => state.adminView);
    const dispatch = useAppDispatch();
     



    const sections = {
        todo: <TodoComponent />,
        profile: <ProfileComponent />,
        settings: <SettingsComponent />,
        users: <UsersComponent />,
      };

      useEffect(()=>{
        const func = async () => {
          const user = await checkAuth();
          dispatch(setUser(user))
        }
        func()
      },[])

      
      
      return (
        <div className={styles.adminPage}>
          {sections[activeSection]}
        </div>
      );
}
export default AdminPanelContainer;