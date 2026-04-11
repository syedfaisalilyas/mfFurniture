import * as FileSystem from 'expo-file-system';
import { supabase } from './supabase';
import { decode } from 'base64-arraybuffer';

export const uploadProductImage = async (localUri) => {
  // If it's already a remote URL, return as-is
  if (localUri.startsWith('http')) return localUri;

  const filename = `product_${Date.now()}.jpg`;
  const base64 = await FileSystem.readAsStringAsync(localUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(filename, decode(base64), {
      contentType: 'image/jpeg',
      upsert: true,
    });

  if (error) throw new Error(error.message);

  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(filename);

  return publicUrl;
};
