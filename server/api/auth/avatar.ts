export default defineEventHandler(async (event) => {
    const session = await useSession(event, {
        password: process.env.PASSWORD
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