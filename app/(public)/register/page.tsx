import { RegisterBasicInfoSection } from "./_components/RegisterBasicInfoSection";
import { RegisterConsentSection } from "./_components/RegisterConsentSection";
import { RegisterDetailInfoSection } from "./_components/RegisterDetailInfoSection";
import { RegisterIntroCard } from "./_components/RegisterIntroCard";
import { RegisterPageHeader } from "./_components/RegisterPageHeader";
import { RegisterWorkInfoSection } from "./_components/RegisterWorkInfoSection";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <RegisterPageHeader />
        <RegisterIntroCard />
        <RegisterBasicInfoSection />
        <RegisterWorkInfoSection />
        <RegisterDetailInfoSection />
        <RegisterConsentSection />
      </div>
    </main>
  );
}