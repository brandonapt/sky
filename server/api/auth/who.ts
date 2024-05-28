export default defineEventHandler(async (event) => {
    const session = await useSession(event, {
        password: process.env.PASSWORD
    });

    if (!session.data.user) {
        return new Response("h", {
            status: 401,
        });
    }

    return session.data.user;
})