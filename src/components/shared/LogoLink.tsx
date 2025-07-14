import Link from "next/link";
import Image from "next/image";

const LogoLink = () => {
  return (
    <Link href="/" className="flex items-center gap-2 text-2xl">
      <Image src="/SD.png" alt="Logo" width={50} height={50} />
      <span className="font-black text-primary">Smart</span> Doctor
    </Link>
  );
};

export default LogoLink;
