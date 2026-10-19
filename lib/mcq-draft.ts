export type McqDraft={answers:Record<number,number>;attemptId:string;submitted:boolean};
export const emptyMcqDraft=():McqDraft=>({answers:{},attemptId:'',submitted:false});
