import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://dravcxuwlerbgomqptxq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyYXZjeHV3bGVyYmdvbXFwdHhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2Mjk3MDIsImV4cCI6MjAyNDIwNTcwMn0.UeTRCJAAODHk-nYt07H-vL_RQP1M0FkQSqwK8ZGJ-6s";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
