import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
// import { getServerSession } from "next-auth";

export const GET = async (request) =>{
    try {
        await connectToDB();
        // const session = await getServerSession();

        const prompts= await Prompt.find({}).populate('creator');
        // const prompts = await Prompt.find({});
        // const userEmail= session?.user.email;
        // console.log(prompts);
        // const prompts = prompt.filter(prompt=>prompt.creator.email===userEmail)

        return new Response(JSON.stringify(prompts),{status:200})

    } catch (error) {
        return new Response('Failed to fetch all prompts',{status:500})
    }
}
