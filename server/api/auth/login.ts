import * as crypto from "crypto";

export default defineEventHandler(async (event) => {
  const state = crypto.randomBytes(16).toString("hex");
  const url = `https://discord.com/oauth2/authorize?client_id=1245031389460430971&response_type=code&redirect_uri=${process.env.BASE_URL}%2Fapi%2Fauth%2Fcallback&scope=identify&state=${state}`;
  return new Response(null, {
    status: 302,
    headers: {
      Location: url,
    },
  });
});
