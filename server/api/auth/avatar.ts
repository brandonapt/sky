export default defineEventHandler(async (event) => {
    const session = await useSession(event, {
        password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
    });

    if (session.data.user?.avatar) {
        return new Response(null, {
            status: 302,
            headers: {
                Location: `https://cdn.discordapp.com/avatars/${session.data.user.id}/${session.data.user.avatar}.png`,
            },
        });
    } else {
        return { avatar: null }
    }
})