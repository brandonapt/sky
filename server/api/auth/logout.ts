export default defineEventHandler(async (event) => {
    const session = await useSession(event, {
        password: process.env.PASSWORD
    });

    await session.clear();

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/",
        },
    });
})