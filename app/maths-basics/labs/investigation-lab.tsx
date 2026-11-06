'use client';
import {AdditionLab,EstimationLab,IntegerLab,OrderLab} from './arithmetic-labs';
import {FactorLab,HcfLab,FractionLab,DecimalLab,RatioLab,PercentageLab,PowerLab} from './number-labs';
import {AlgebraLab,IdentityLab,LinearPairLab,QuadraticLab} from './algebra-labs';
import {RationalLab,RealLab} from './signed-root-labs';
import {AngleLab,ShapeLab,SymmetryLab,AreaLab,SolidLab} from './geometry-labs';
import {CoordinateLab,DistanceLab,SimilarityLab} from './coordinate-labs';
import DataLab from './data-labs';
import type {ComponentType} from 'react';
import {CirclesLab} from './circle-labs';
import {SignedFractionLab} from './fraction-jumps';
import {PythagorasLab,AlgebraTilesLab,InterestLab,NetFoldLab,ConePourLab,BptLab,HeightLab,LinePairLab,MeanBalanceLab,ChanceLab} from './higher-sims';
import {BalanceExperiment,PercentExperiment,GardenExperiment} from './visual-experiments';
import {AddJumpLab,SubtractJumpLab,MultiplyJumpLab,DivideJumpLab,SkipCountLab,DivisibilityLab,WholeAddJumpLab,FrogsLcmLab} from './integer-jumps';
export const investigationTopics:Record<string,ComponentType<{index:number}>>={
 circles:CirclesLab,
 'addition-subtraction':({index})=>index===0?<><AdditionLab index={0}/><WholeAddJumpLab/></>:<AdditionLab index={index}/>,estimation:EstimationLab,integers:({index})=>index===0?<IntegerLab index={0}/>:index===1?<AddJumpLab/>:index===2?<SubtractJumpLab/>:index===3?<MultiplyJumpLab/>:<DivideJumpLab/>,'operation-order':OrderLab,'factors-multiples':({index})=>index===0?<FactorLab index={0}/>:index===1?<SkipCountLab/>:index===2?<DivisibilityLab/>:<FactorLab index={2}/>,'hcf-lcm':({index})=>index===2?<FrogsLcmLab/>:<HcfLab index={index}/>,fractions:FractionLab,decimals:DecimalLab,ratio:RatioLab,percentages:({index})=>index===0?<PercentExperiment/>:index===1?<><PercentageLab index={1}/><InterestLab/></>:<PercentageLab index={index}/>,'powers-roots':PowerLab,algebra:AlgebraLab,equations:BalanceExperiment,angles:AngleLab,shapes:({index})=>index===0?<><ShapeLab index={0}/><PythagorasLab/></>:<ShapeLab index={index}/>,symmetry:SymmetryLab,'area-perimeter':({index})=>index===0?<><AreaLab index={index}/><GardenExperiment/></>:<AreaLab index={index}/>,solids:({index})=>index===0?<><SolidLab index={0}/><NetFoldLab/></>:index===1?<><SolidLab index={1}/><ConePourLab/></>:<SolidLab index={index}/>,'data-chance':({index})=>index===0?<><DataLab index={0}/><MeanBalanceLab/></>:index===1?<><DataLab index={1}/><ChanceLab/></>:<DataLab index={index}/>,'rational-numbers':({index})=>index===1?<SignedFractionLab/>:<RationalLab index={index}/>,'real-numbers':RealLab,identities:({index})=>index===1?<><IdentityLab index={1}/><AlgebraTilesLab/></>:<IdentityLab index={index}/>,'coordinate-basics':CoordinateLab,'linear-pairs':({index})=>index===0?<><LinearPairLab index={0}/><LinePairLab/></>:<LinearPairLab index={index}/>,'quadratic-foundations':QuadraticLab,'coordinate-distance':DistanceLab,'similarity-trigonometry':({index})=>index===0?<><SimilarityLab index={0}/><BptLab/></>:index===2?<><SimilarityLab index={2}/><HeightLab/></>:<SimilarityLab index={index}/>,
};
/** Topics whose later concepts have no lab yet: those concepts show the topic picture instead. */
export const labConceptCount:Record<string,number>={};
export function hasInvestigation(slug:string,index:number){return !!investigationTopics[slug]&&index<(labConceptCount[slug]??Infinity);}
export default function InvestigationLab({slug,index}:{slug:string;index:number}){const Component=investigationTopics[slug];return Component?<Component key={`${slug}-${index}`} index={index}/>:null;}
