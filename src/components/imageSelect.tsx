import { promptSelectImages } from "@/utils/selectImage";
import { isPlatform } from "@ionic/react";
import React from "react";

const ImageSelect: React.FC<{
  onChange: (images: File[]) => void;
  style?: React.CSSProperties;
  count?: number;
}> = ({ children, onChange, style, count }) => {
  const isNative = isPlatform("hybrid");
  const c = count ?? 1;
  if (!isNative) {
    return (
      <label style={style}>
        {children}
        <input
          type="file"
          style={{ display: "none" }}
          onChange={(e) => {
            console.log("YAY");
            onChange(Array.from(e.target.files || []).slice(0, count));
          }}
          accept="image/*"
          multiple={c === 1 ? undefined : true}
        />
      </label>
    );
  } else {
    const onClick = () => {
      promptSelectImages(c)
        .then((blobs) => blobs.map((blob) => new File([blob], "image.jpg")))
        .then(onChange);
    };
    return (
      <div style={style}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { onClick });
          }
          return child;
        })}
      </div>
    );
  }
};
export default ImageSelect;
