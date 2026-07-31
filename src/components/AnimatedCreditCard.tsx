import React from "react";
export default function AnimatedCreditCard(){
 return <div style={{width:360,height:220,borderRadius:20,background:"linear-gradient(135deg,#111,#444)",color:"#fff",padding:24,transition:"transform .4s"}}>
 <small>PowerPay</small>
 <h2 style={{letterSpacing:3}}>4242 4242 4242 4242</h2>
 <div style={{display:"flex",justifyContent:"space-between"}}>
 <span>JOHN DOE</span><span>12/30</span>
 </div>
 </div>;
}