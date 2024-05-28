import * as fs from "fs";


export default defineEventHandler(async (event) => {
    const formData = await readFormData(event);
    const params = getRouterParams(event);
    const path = params._
    const files = formData.get("files");
    
    if (!files) {
        return new Response(null, {
            status: 400,
        });
    }

    const dir = `./test/${path}`;
    fs.mkdirSync(dir, { recursive: true });

    if (files instanceof File) {
        const reader = files.stream().getReader();
        const writer = fs.createWriteStream(`${dir}/${files.name}`);

        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }

            writer.write(value);
        }

        writer.end();
    }

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/",
        },
    });
});