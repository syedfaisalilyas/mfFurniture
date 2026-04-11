// Web version — handles blob: and data: URIs returned by expo-image-picker on web.
import { supabase } from './supabase';
import { decode } from 'base64-arraybuffer';

export const uploadProductImage = async (localUri) => {
  if (localUri.startsWith('http')) return localUri;

  const filename = `product_${Date.now()}.jpg`;

  let arrayBuffer;

  if (localUri.startsWith('data:')) {
    // data:image/jpeg;base64,<base64string>
    const base64 = localUri.split(',')[1];
    arrayBuffer = decode(base64);
  } else {
    // blob: URI from expo-image-picker on web
    const response = await fetch(localUri);
    arrayBuffer = await response.arrayBuffer();
  }

  const { error } = await supabase.storage
    .from('product-images')
    .upload(filename, arrayBuffer, {
      contentType: 'image/jpeg',
      upsert: true,
    });

  if (error) throw new Error(error.message);

  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(filename);

  return publicUrl;
};
