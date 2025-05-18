import { json } from 'drizzle-orm/gel-core';
import { pgTable, serial, varchar, boolean  } from 'drizzle-orm/pg-core';


export const USER_TABLE= pgTable('users',
    {
        id: serial().primaryKey(),
        name: varchar().notNull(),
        email: varchar().notNull().unique(),
        isMember: boolean().default(false),
    }
)

export const STUDY_MATERIAL_TABLE= pgTable('studyMaterial',
    {
        id: serial().primaryKey(),
        courseId:varchar().notNull(),
        courseType: varchar().notNull(),
        topic: varchar().notNull(),
        difficultyLevel: varchar().notNull(),
        courseLayout: json(),
        createdBy: varchar().notNull(),
        status:varchar().default('Generating'),
    }
)