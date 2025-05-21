import { generateCourseOutline } from "@/configs/AiModel";
import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";

export async function POST(req) {
    try {
        const { courseId, topic, studyType, difficultyLevel, createdBy } = await req.json();
        const PROMPT = `Generate a comprehensive and detailed study material for ${topic} designed for ${studyType} at a ${difficultyLevel} difficulty level. The study material should be extensive, covering all essential aspects of the topic to ensure thorough learning. Include the following in JSON format: 1. Course Title (as course_title make sure to use a good name) 2. Diffculty Level (as difficulty)   3. **Course Summary**: A detailed overview of the course (50-100 words with key as CourseSummary), including its objectives, target audience, and key learning outcomes.  4. **List of Chapters**: A minimum of 8 chapters, each with:- **Chapter Title**: A clear and descriptive title.- **Chapter Summary**: A detailed summary of the chapter’s content (at least 100 words per chapter).- **Topic List (as topics)**: A list of at least 5 specific topics(with each topic as topic) covered in the chapter, each with a brief description (2-3 sentences per topic). 5. **Additional Resources**: Suggest at least 3 resources (e.g., books, websites, or videos) relevant to the course, with a brief description of each.`
        const aiResp = await generateCourseOutline(PROMPT);
        const aiResult = JSON.parse(aiResp.response.text());

        // Insert into database
        const dbResult = await db
            .insert(STUDY_MATERIAL_TABLE)
            .values({
                courseId: courseId,
                courseType: studyType,
                topic: topic,
                difficultyLevel: difficultyLevel,
                courseLayout: aiResult,
                createdBy: createdBy,
            })
            .returning({ resp: STUDY_MATERIAL_TABLE });

        console.log("DB Result:", dbResult);
        const result = await inngest.send({
            name:'notes.generate',
            data: {
                course: dbResult[0].resp,
            },
        });
        console.log(result);

        return NextResponse.json({ result: dbResult[0] });
    } catch (error) {
        console.error("Error in POST /api/generate-course-outline:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}