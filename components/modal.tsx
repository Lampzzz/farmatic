import { Modal as RNModal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ visible, onClose, children }: Props) => {
  return (
    <RNModal
      visible={visible}
      onRequestClose={onClose}
      transparent
      animationType="fade"
      statusBarTranslucent
      navigationBarTranslucent
    >
      <SafeAreaView className="flex-1 justify-center px-6 bg-black/50">
        {children}
      </SafeAreaView>
    </RNModal>
  );
};

export default Modal;
