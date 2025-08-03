import { Header } from "@/components/header";
import { MainLayout } from "@/components/layout/main-layout";

export default function ControllerScreen() {
  return (
    <MainLayout>
      <Header
        title="Controller"
        description="Manage your greenhouse controller"
      />
    </MainLayout>
  );
}
