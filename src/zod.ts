import { z } from "zod";
import { Visibility } from "./pages/write";

export const HistoryItem = z.object({
    title: z.string().min(3, 'Title must contain at least 3 character.').max(25, 'Title can contain 25 character at max.'),
    description: z.string().optional(),
    content: z.string().min(10, 'Content must contain at least 10 character.'),
    tags: z.array(z.string().optional()),
});
export type HistoryItemType = z.infer<typeof HistoryItem> & {
    id: string;
    visibility: Visibility;
    createdAt: Date;
    createdBy: string;
};

export type HistoryItemTypeEncoded = HistoryItemType & {
    content: Record<string, number>;
};

export const WriteRouteParameters = z.object({
    my: z.boolean().or(z.string()).default(false),
    page: z.string().default('1').transform(Number)
});