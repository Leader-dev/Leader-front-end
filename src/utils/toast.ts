import { useIonToast } from "@ionic/react";

const presentToastDefault = {
  duration: 3000,
};

export const useToast = () => {
  const [present, dismiss] = useIonToast();
  return [
    (args: Partial<Parameters<typeof present>[0]>) => {
      const pargs = { ...presentToastDefault, ...args };
      present(pargs);
    },
    dismiss,
  ];
};
