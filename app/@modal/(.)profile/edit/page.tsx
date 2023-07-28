import { editProfile } from '@/app/profile/edit/edit-profile.action';
import { getUserEdit } from '@/src/query/user.query';
import { EditProfileModal } from './EditProfileModal';

export default async function page() {
  const user = await getUserEdit();

  return <EditProfileModal user={user} editProfile={editProfile} />;
}
