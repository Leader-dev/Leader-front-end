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
}> = ({
  children,
  title,
  rightItems,
  value,
  onValueChange,
  searchbarPlaceholder,
}) => {
  if (isPlatform("ios")) {
    return (
      <>
        <IonHeader translucent>
          <IonToolbar>
            <IonTitle>{title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{title}</IonTitle>
            </IonToolbar>
            <IonToolbar>
              <IonSearchbar
                placeholder={searchbarPlaceholder}
                value={value}
                onIonChange={onValueChange}
              />
              {rightItems}
            </IonToolbar>
          </IonHeader>
          {children}
        </IonContent>
      </>
    );
  } else {
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonTitle>社团展示</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar
              placeholder={searchbarPlaceholder}
              value={value}
              onIonChange={onValueChange}
            />
            {rightItems}
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>{children}</IonContent>
      </>
    );
  }
};
