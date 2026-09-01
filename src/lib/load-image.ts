export type SlotImage = {
  element: HTMLImageElement;
  url: string;
  name: string;
  fromDefault: boolean;
  objectUrl?: string;
};

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Could not load image: ${src}`));
    img.src = src;
  });
}

export async function slotFromFile(file: File): Promise<SlotImage> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please choose an image file.");
  }
  const objectUrl = URL.createObjectURL(file);
  const element = await loadImage(objectUrl);
  return {
    element,
    url: objectUrl,
    name: file.name || "image",
    fromDefault: false,
    objectUrl,
  };
}

export async function slotFromBlob(
  blob: Blob,
  name = "pasted-image",
): Promise<SlotImage> {
  const file = new File([blob], name, { type: blob.type || "image/png" });
  return slotFromFile(file);
}

export function revokeSlot(slot: SlotImage | null) {
  if (slot?.objectUrl) URL.revokeObjectURL(slot.objectUrl);
}

export async function loadDefaultSlot(
  url: string,
  name: string,
): Promise<SlotImage> {
  const element = await loadImage(url);
  return { element, url, name, fromDefault: true };
}

export function imagesFromClipboard(e: ClipboardEvent): File[] {
  const files: File[] = [];
  const items = e.clipboardData?.items;
  if (!items) return files;
  for (const item of items) {
    if (item.type.startsWith("image/")) {
      const file = item.getAsFile();
      if (file) files.push(file);
    }
  }
  return files;
}

export function imagesFromDataTransfer(dt: DataTransfer | null): File[] {
  if (!dt) return [];
  const out: File[] = [];
  if (dt.files?.length) {
    for (const f of dt.files) {
      if (f.type.startsWith("image/") || /\.(png|jpe?g|webp|gif|bmp|avif|svg)$/i.test(f.name)) {
        out.push(f);
      }
    }
  }
  return out;
}
