'use client';
import { useState } from 'react';

export default function IntegralsCheckout({id,title,name,email,amount}:{id:string;title:string;name:string;email:string;amount:number}) {
  const [busy,setBusy]=useState(false),[message,setMessage]=useState('');
  async function recover() {
    setBusy(true);setMessage('Checking payment…');
    try {const r=await fetch('/api/razorpay/status',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({paperId:id})});const p=await r.json() as {approved?:boolean;error?:string};if(!r.ok)throw new Error(p.error);if(p.approved){window.location.reload();return;}setMessage('No completed payment confirmed yet. If you paid, check again shortly.');}catch(e){setMessage(e instanceof Error?e.message:'Could not check payment.');}finally{setBusy(false);}
  }
  async function pay() {
    setBusy(true);setMessage('Opening secure checkout…');
    try {
      if(!window.Razorpay) await new Promise<void>((resolve,reject)=>{const script=document.createElement('script');script.src='https://checkout.razorpay.com/v1/checkout.js';script.onload=()=>resolve();script.onerror=()=>{script.remove();reject(new Error('Checkout could not load. Please try again.'));};document.head.appendChild(script);});
      if(!window.Razorpay)throw new Error('Checkout is unavailable.');
      const r=await fetch('/api/razorpay/order',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({paperId:id,studentName:name})});
      const order=await r.json() as {error?:string;alreadyPaid?:boolean;keyId:string;orderId:string;amount:number;currency:string};
      if(!r.ok)throw new Error(order.error);if(order.alreadyPaid){window.location.reload();return;}
      if(order.amount!==amount||order.currency!=='INR')throw new Error('Unexpected payment amount. Please contact your teacher.');
      const checkout=new window.Razorpay({key:order.keyId,order_id:order.orderId,amount:order.amount,currency:order.currency,name:'Ramavana Mathematical Centre',description:id.startsWith('maths-basics-')?title:`${title} — online paper and worked solutions`,prefill:{name,email},hidden:{contact:true,email:true},theme:{color:'#5936a7'},modal:{ondismiss:()=>{setBusy(false);setMessage('Checkout closed. If you paid, use “Check completed payment”.');}},handler:async(response:Record<string,string>)=>{setMessage('Verifying payment…');try{const verify=await fetch('/api/razorpay/verify',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(response)});const p=await verify.json() as {approved?:boolean;error?:string};if(!verify.ok||!p.approved)throw new Error(p.error||'Verification pending.');window.location.reload();}catch(e){setMessage(`${e instanceof Error?e.message:'Verification pending.'} Use “Check completed payment” before paying again.`);setBusy(false);}}});
      checkout.on('payment.failed',()=>{setBusy(false);setMessage('Payment was not completed. You can retry or check an earlier payment.');});checkout.open();
    }catch(e){setMessage(e instanceof Error?e.message:'Payment could not start.');setBusy(false);}
  }
  return <div className="integrals-checkout"><button disabled={busy} onClick={pay}>{busy?'Please wait…':`${id.startsWith('maths-basics-')?'Unlock package':'Unlock test'} — ₹${amount/100}`}</button><button className="integrals-recover" disabled={busy} onClick={recover}>Check completed payment</button><p role="status">{message}</p></div>;
}
