import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://czuesfgkiopoejfxbjsl.supabase.co";

const supabaseKey = "sb_publishable_hNslsXU7WDmWJz9xqJUg-w_-l9qDcWo";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);