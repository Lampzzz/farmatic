import Image from "next/image";

type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <div className="bg-[#F6F8FC] w-full">
      <Image
        src="/images/pokeball-icon.png"
        width={300}
        height={300}
        alt="Pokeball Icon"
        className="fixed -top-5 -left-20"
      />
      <Image
        src="/images/pokeball-icon.png"
        width={300}
        height={300}
        alt="Pokeball Icon"
        className="fixed -top-40 right-40"
      />
      <Image
        src="/images/pokeball-icon.png"
        width={300}
        height={300}
        alt="Pokeball Icon"
        className="fixed bottom-28 -right-28"
      />
      <Image
        src="/images/pokeball-icon.png"
        width={300}
        height={300}
        alt="Pokeball Icon"
        className="fixed bottom-1 left-60"
      />
      {children}
    </div>
  );
}
