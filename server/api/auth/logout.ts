export default defineEventHandler(async (event) => {
    const session = await useSession(event, {
        password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
    });

    await session.clear();

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/",
        },
    });
})