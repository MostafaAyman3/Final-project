import LogoLink from "@/components/shared/LogoLink";
import { ModeToggle } from "@/components/shared/ModeToggle";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="w-screen relative h-screen flex flex-col gap-2 items-center justify-center">
      <ModeToggle className="absolute top-4 right-4" />
      <LogoLink />
      {children}
    </div>
  );
}
