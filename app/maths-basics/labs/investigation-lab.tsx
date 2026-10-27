'use client';
import {AdditionLab,EstimationLab,IntegerLab,OrderLab} from './arithmetic-labs';
import {FactorLab,HcfLab,FractionLab,DecimalLab,RatioLab,PercentageLab,PowerLab} from './number-labs';
import {AlgebraLab,IdentityLab,LinearPairLab,QuadraticLab} from './algebra-labs';
import {RationalLab,RealLab} from './signed-root-labs';
import {AngleLab,ShapeLab,SymmetryLab,AreaLab,SolidLab} from './geometry-labs';
import {CoordinateLab,DistanceLab,SimilarityLab} from './coordinate-labs';
import DataLab from './data-labs';
import type {ComponentType} from 'react';
import {BalanceExperiment,PercentExperiment,GardenExperiment} from './visual-experiments';
export const investigationTopics:Record<string,ComponentType<{index:number}>>={
 'addition-subtraction':AdditionLab,estimation:EstimationLab,integers:IntegerLab,'operation-order':OrderLab,'factors-multiples':FactorLab,'hcf-lcm':HcfLab,fractions:FractionLab,decimals:DecimalLab,ratio:RatioLab,percentages:({index})=>index===0?<PercentExperiment/>:<PercentageLab index={index}/>,'powers-roots':PowerLab,algebra:AlgebraLab,equations:BalanceExperiment,angles:AngleLab,shapes:ShapeLab,symmetry:SymmetryLab,'area-perimeter':({index})=>index===0?<><AreaLab index={index}/><GardenExperiment/></>:<AreaLab index={index}/>,solids:SolidLab,'data-chance':DataLab,'rational-numbers':RationalLab,'real-numbers':RealLab,identities:IdentityLab,'coordinate-basics':CoordinateLab,'linear-pairs':LinearPairLab,'quadratic-foundations':QuadraticLab,'coordinate-distance':DistanceLab,'similarity-trigonometry':SimilarityLab,
};
export default function InvestigationLab({slug,index}:{slug:string;index:number}){const Component=investigationTopics[slug];return Component?<Component key={`${slug}-${index}`} index={index}/>:null;}
