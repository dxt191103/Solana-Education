import dynamic from 'next/dynamic';
const NavigationPlush = dynamic(
  () => import('../../components/NavigationPlush')
);
const ProfileStudent = dynamic(
  () => import('../../containers/ProfileStudent')
);
import SEO from '../../components/SEO';
import FooterCard from '../../components/FooterCard';
import ProfileStudentAbout from '../../containers/ProfileStudentAbout';

export default function EducationStudent() {
  return (
    <div>
      <SEO />
      <NavigationPlush />
      <ProfileStudent />
      <ProfileStudentAbout />
      <FooterCard />
    </div>
  );
}