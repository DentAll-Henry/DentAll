import dynamic from "next/dynamic";

const DynamicFAQChatBot = dynamic(
  () => import("@/components/ChatBot/FAQChatBot"),
  {
    ssr: false, // Evita el renderizado del lado del servidor
  }
);

const HomePage = () => {
  return (
    <div>
      {/* Otros componentes */}
      <DynamicFAQChatBot />
    </div>
  );
};

export default HomePage;
