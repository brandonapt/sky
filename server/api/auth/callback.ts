export default defineEventHandler(async (event) => {
  const query = await getQuery(event);
  const state = query.state;
  const code = query.code;

  async function getAccessToken(code: string) {
    const clientId = "1245031389460430971";
    const clientSecret = "xzBwQEL3BIoue2PreH-8_d8k1T_FnpHi";
    const redirectUri = "https://sky.br4x.com/api/auth/callback";
    const data = {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
    };
    const response = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(data),
    });
    const json = await response.json();
    return json.access_token;
  }

  const accessToken = await getAccessToken(code);
  const user = await fetch("https://discord.com/api/users/@me", {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());

  const session = await useSession(event, {
    // this is insecure but honestly who cares
    password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
  });

  await session.update({
    user,
  })

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
});
