import { UserProfile } from '@/components/user-profile';
import GradientBackground from '@/components/gradient-background';

export default function Home() {
  return (
    <main className="flex flex-1 flex-col px-4 pt-10 md:px-32 lg:pt-20">
      <GradientBackground>
        <UserProfile />
      </GradientBackground>
    </main>
  );
}
