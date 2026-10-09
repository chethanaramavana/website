import { relationsFunctions } from './relations-functions';
import { questions } from '@/app/cbse/grade-10/ch-1/free-mcq/questions';
import { polynomials, linearPairs, quadratics, progressions } from './algebra';
import { triangles, coordinates, circles } from './geometry';
import { trigonometry, applications } from './trigonometry';
import { circleAreas, solids } from './mensuration';
import { statistics, probability } from './data-chance';
import { freeQuizChapters, quizId, quizPath } from './catalog';

const banks = [questions, polynomials(), linearPairs(), quadratics(), progressions(), triangles(), coordinates(), trigonometry(), applications(), circles(), circleAreas(), solids(), statistics(), probability()];
export const freeQuizzes = banks.map((questions, i) => ({ grade: 10, chapter: i + 1, title: freeQuizChapters[i], id: quizId(i + 1), path: quizPath(i + 1), questions })).concat([{grade:11,chapter:2,title:"Relations and Functions",id:quizId(2,11),path:quizPath(2,11),questions:relationsFunctions}]);
