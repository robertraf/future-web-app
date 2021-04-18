// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * NOTE: this file is only needed if you're doing SSR (getServerSideProps)!
 */
import { supabase } from "@/lib/initSupabase";

export default (req: NextApiRequest, res: NextApiResponse) => {
  supabase.auth.api.setAuthCookie(req, res);
};
