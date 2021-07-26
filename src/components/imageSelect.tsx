import { promptSelectImages } from "@/utils/selectImage";
import { isPlatform } from "@ionic/react";

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
            onChange(Array.from(e.target.files || []).slice(0, count));
          }}
          accept="image/*"
          multiple={c === 1 ? undefined : true}
        />
      </label>
    );
  } else {
    return (
      <div
        style={style}
        onClick={() => {
          promptSelectImages(c)
            .then((blobs) => blobs.map((blob) => new File([blob], "image.jpg")))
            .then(onChange);
        }}
      >
        {children}
      </div>
    );
  }
};
export default ImageSelect;
