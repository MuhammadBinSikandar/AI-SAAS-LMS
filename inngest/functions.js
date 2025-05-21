import { inngest } from "./client";
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';
import { USER_TABLE } from '@/configs/schema';
import { generateNotes } from "@/configs/AiModel";
import { STUDY_MATERIAL_TABLE, ChapterNotes } from "@/configs/schema";

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");
        return { message: `Hello ${event.data.email}!` };
    },
);

export const createNewUser = inngest.createFunction(
    { id: "create-user" },
    { event: "user.create" },
    async ({ event, step }) => {
        const { user } = event.data;
        const result = await step.run("Check User and create new if doesn't exist", async () => {
            const result = await db.select()
                .from(USER_TABLE)
                .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));
            console.log(result);
            if (result?.length == 0) {
                const userResp = await db.insert(USER_TABLE)
                    .values({
                        name: user?.fullName,
                        email: user?.primaryEmailAddress?.emailAddress,
                    })
                    .returning({ id: USER_TABLE.id });
                return userResp;
            }
            return result;
        })
        return "Success";
    }
)

export const GenerateNotes = inngest.createFunction(
    { id: 'generate-course' },
    { event: 'notes.generate' },
    async ({ event, step }) => {
        const { course } = event.data;
        const notesResult = await step.run("Generate notes", async () => {
            const Chapters = course?.courseLayout?.chapters;
            let index = 0;
            Chapters.forEach(async (chapter) => {
                const PROMPT = "Generate exam material detail content for each chapter. Make sure to cover all the topic points in the content. Make sure to give content in HTML (Do not add HTMLKL, Head, Body, Title tag), The chapters. Provide detailed content for all the topics of the chapter " + JSON.stringify(chapter);
                const result = await generateNotes(PROMPT);
                const aiResponse = result.response.text();
                await db.insert(ChapterNotes)
                    .values({
                        courseId: course?.courseId,
                        chapterId: index,
                        notes: aiResponse
                    })
                index= index + 1;
            })
            return 'Completed';

        })
        const UpdateCourseStatusResult = await step.run("Update course status to ready", async () => {
            const result = await db.update(STUDY_MATERIAL_TABLE)
                .set({ status: 'Ready' })
                .where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId))
                
            return "Success";
        })
})

