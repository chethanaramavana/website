/** Version of the quiz question sets. Version 2 = 30-question quizzes. Drafts from an older version are discarded. */
export const MCQ_SET_VERSION=2;
export type McqDraft={answers:Record<number,number>;attemptId:string;submitted:boolean;v?:number};
export const emptyMcqDraft=():McqDraft=>({answers:{},attemptId:'',submitted:false,v:MCQ_SET_VERSION});
