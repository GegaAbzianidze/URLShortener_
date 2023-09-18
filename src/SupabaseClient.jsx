import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fgiysdvqjpwtpzuipjlw.supabase.co";
const supabaseAnonKey =
"  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnaXlzZHZxanB3dHB6dWlwamx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE0ODgzMTQsImV4cCI6MjAwNzA2NDMxNH0.phxCCs2lUTLix3Lz43Lkow-SeWK-ylBzrhh1YMa4MRA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
