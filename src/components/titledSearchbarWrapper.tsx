import {
  IonSearchbar,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  isPlatform,
} from "@ionic/react";

export const TitledSearchBarWrapper: React.FC<{
  title: string;
  searchbarPlaceholder: string;
  rightItems: React.ReactNode;
  value: string;
  onValueChange: React.ComponentProps<typeof IonSearchbar>["onIonChange"];
  layer?: React.ReactNode;
  noTopTitle?: boolean;
}> = ({
  children,
  title,
  rightItems,
  value,
  onValueChange,
  searchbarPlaceholder,
  layer,
  noTopTitle,
}) => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            placeholder={searchbarPlaceholder}
            value={value}
            onIonChange={onValueChange}
          />
          {rightItems}
        </IonToolbar>
        {layer && <IonToolbar>{layer}</IonToolbar>}
      </IonHeader>
      <IonContent fullscreen>{children}</IonContent>
    </>
  );
};
