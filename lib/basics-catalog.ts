export const basicsRevisionTopics=["numbers","addition-subtraction","multiplication-division","factors-multiples","hcf-lcm","operation-order"] as const;
const courseDefinitions=[
 {id:'foundations',title:'Grades 5–7',subtitle:'Build a strong foundation',description:'Numbers, calculation, estimation, fractions, algebra, shapes and measurement.',tier:'base',topics:['numbers','addition-subtraction','multiplication-division','estimation','integers','operation-order','factors-multiples','hcf-lcm','fractions','decimals','ratio','percentages','powers-roots','algebra','equations','angles','shapes','symmetry','area-perimeter','solids','data-chance']},
 {id:'grade-8',title:'Grade 8',subtitle:'Strengthen the skills you need',description:'Signed fractions, powers, expressions, equations, percentages, geometry and mensuration.',tier:'base',topics:['rational-numbers','powers-roots','algebra','equations','ratio','percentages','shapes','area-perimeter','solids','data-chance']},
 {id:'grade-9',title:'Grade 9',subtitle:'Be ready for the next step',description:'Real numbers, identities, coordinates, angles, shape properties, measurement and data.',tier:'extension',topics:['real-numbers','identities','coordinate-basics','angles','shapes','area-perimeter','solids','data-chance']},
 {id:'grade-10',title:'Grade 10',subtitle:'Connect algebra and geometry',description:'Identities, two equations, quadratics, sequences, coordinate geometry and trigonometry.',tier:'extension',topics:['identities','linear-pairs','quadratic-foundations','coordinate-distance','similarity-trigonometry','solids','data-chance']},
] as const;
export const basicsCourses=courseDefinitions.map(course=>({...course,topics:[...basicsRevisionTopics,...course.topics.filter(t=>!(basicsRevisionTopics as readonly string[]).includes(t))]}));
export function getBasicsCourse(id:string){return basicsCourses.find(c=>c.id===id);}
export const basicsProducts=[
 {id:'maths-basics-5-8',amount:15000,title:'Maths Step by Step · Grades 5–8'},
 {id:'maths-basics-9-10',amount:20000,title:'Maths Step by Step · Grades 9–10 extension'},
 {id:'maths-basics-all',amount:35000,title:'Maths Step by Step · Grades 5–10'},
] as const;
export function getBasicsProduct(id:string){return basicsProducts.find(p=>p.id===id);}
export function basicsLevelPath(course:string,topic:string){return `/maths-basics/${course}/${topic}`;}
