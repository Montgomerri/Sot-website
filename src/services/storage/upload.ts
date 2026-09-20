import { createClient } from "@/lib/supabase/client";

const supabase = createClient();


export async function uploadAttachment(file: File) {

  const fileExt = file.name.split(".").pop();

  const fileName = `${crypto.randomUUID()}.${fileExt}`;


  const { error } = await supabase.storage
    .from("question-attachments")
    .upload(fileName, file);


  if (error) {
    throw error;
  }


  const {
    data
  } = supabase.storage
    .from("question-attachments")
    .getPublicUrl(fileName);


  return data.publicUrl;

}