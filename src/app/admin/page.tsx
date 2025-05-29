'use client';
import { useAppSelector } from '@/store/hooks';
import styles from './page.module.scss';
import TodoComponent from '../components/adminPanel/toDo/toDo';
import ProfileComponent from '../components/adminPanel/profile/profile';
import SettingsComponent from '../components/adminPanel/settings/settings';
import UsersComponent from '../components/adminPanel/users/users';

const AdminPanelContainer = () => {

    const {activeSection} = useAppSelector(state => state.adminView);

    const sections = {
        todo: <TodoComponent />,
        profile: <ProfileComponent />,
        settings: <SettingsComponent />,
        users: <UsersComponent />,
      };

      
      
      return (
        <div className={styles.adminPage}>
          {sections[activeSection]}
        </div>
      );
}
export default AdminPanelContainer;