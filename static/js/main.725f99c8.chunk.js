(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{175:function(e,t,a){"use strict";a.r(t);var n,r=a(1),i=a.n(r),o=a(73),l=a.n(o),s=(a(82),a(13)),c=a(14),p=a(16),u=a(15),g=a(17),f=(a(83),a(74)),d=a(75),m=a.n(d),h=a(28),y=a.n(h),x=a(76),b={display:"flex",flexDirection:"row",alignItems:"center",width:"359px",height:"200px",borderRadius:"8px",backgroundColor:"#FBFBFB",boxShadow:"0px 4px 8px 0px rgba(0,0,0,0.15)",margin:"20px 20px"},E={height:"184px",width:"184px",borderRadius:"50%",overflow:"hidden",position:"relative",margin:"4px 8px 4px 4px"},j={objectFit:"cover",objectPosition:"40% 50%",width:"100%",height:"100%"},v={width:"175px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start"},w=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(p.a)(this,Object(u.a)(t).call(this,e))).pressF=function(e){70===e.keyCode&&!1===a.props.alive&&a.reward.rewardMe()},a.sentiment=function(e){switch(e){case"POSITIVE":return"sentimentHappy";case"NEUTRAL":return"sentimentNeutral";case"NEGATIVE":return"sentimentSad";default:return"sentimentNeutral"}},a.emoji=function(e){switch(e){case"POSITIVE":return["\ud83d\ude03","\ud83d\udcaf","\ud83c\udf89"];case"NEUTRAL":return["\ud83d\ude10","\ud83d\ude0c","\ud83c\udd97"];case"NEGATIVE":return["\ud83d\ude2d","\ud83d\ude14","\ud83d\ude1f"];default:return["\ud83d\ude10","\ud83d\ude0c","\ud83c\udd97"]}},a.state={negative:0,net:0,neutral:0,positive:0,total:0,netArr:[],sentiment:"NEUTRAL",loaded:!1},a}return Object(g.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.onDataChange(this.props.name.toLowerCase()),document.addEventListener("keydown",this.pressF)}},{key:"componentDidUpdate",value:function(){if(!this.state.loaded)return this.setState({loaded:!0})}},{key:"onDataChange",value:function(e){var t=this,a=e;"grey worm"===e&&(a="greyworm"),"the hound"===e&&(a="thehound"),y.a.database().ref("/characters/"+a+"/data/").on("value",function(e){var a=e.val();null==a&&(a=t.state),a.sentiment=t.getCharData(a);var n=t.state.sentiment;t.setState(a,function(){t.state.sentiment!==n&&t.state.loaded&&t.reward.rewardMe()})}),y.a.database().ref("/characters/"+a+"/netArr/").on("value",function(e){var a=e.val();if(null==a&&(a=t.state.netArr),a.length>0){var n=a.length-t.state.netArr.length;n>1?t.setState(Object(f.a)({},t.state,{netArr:a}),function(){}):1!==n&&0!==n||(t.state.netArr.push(a[a.length-1]),t.state.netArr.length>a.length&&t.state.netArr.shift())}})}},{key:"getImageIdx",value:function(e){switch(e){case"POSITIVE":return 0;case"NEUTRAL":return 1;case"NEGATIVE":return 2;default:return 1}}},{key:"getCharData",value:function(e){return null==e||null==e.net?"NEUTRAL":null!=e?e.net>0?"POSITIVE":e.net<=-2?"NEGATIVE":"NEUTRAL":void 0}},{key:"render",value:function(){var e=this,t=this.props.images[this.getImageIdx(this.state.sentiment)];return i.a.createElement("div",{style:b,className:"grow",onClick:function(){return e.reward.rewardMe()}},i.a.createElement("div",{style:E},i.a.createElement("img",{alt:t,src:t,style:j})),i.a.createElement("div",{style:v},i.a.createElement("h3",null,this.props.name),i.a.createElement("h2",{className:this.sentiment(this.state.sentiment)},this.state.sentiment),i.a.createElement(m.a,{ref:function(t){e.reward=t},type:"emoji",config:{emoji:this.props.alive?this.emoji(this.state.sentiment):["\ud83d\ude4f","\ud83d\ude47","\u26b0\ufe0f\ufe0f","\u270a"],lifetime:100,spread:45,elementCount:8,elementSize:40,springAnimation:!0}}),i.a.createElement("h5",null,"TWEETS"),i.a.createElement("h4",null," ",this.state.total),i.a.createElement("div",{style:{paddingTop:"8px",paddingRight:"20px"}},i.a.createElement(x.a,{smooth:!0,data:this.state.netArr,gradient:["#732727","#407398","#3A7737"],radius:30,strokeWidth:6,strokeLinecap:"round"}),i.a.createElement("h6",{style:{marginTop:"12px"}},"CURRENTLY OFFLINE"))))}}]),t}(r.Component),S={display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",margin:"12px 1%",marginBottom:"40px"},N={Thrones:["./thronesHappy.gif","./thronesNeutral.gif","./thronesSad.gif"],Jon:["./jonHappy.gif","./jonNeutral.gif","./jonSad.gif"],Daenerys:["./danyHappy.gif","./danyNeutral.gif","./danySad.gif"],Arya:["./aryaHappy.gif","./aryaNeutral.gif","./aryaSad.gif"],Sansa:["./sansaHappy.gif","./sansaNeutral.gif","./sansaSad.gif"],Bran:["./branHappy.gif","./branNeutral.gif","./branSad.gif"],Tyrion:["./tyrionHappy.gif","./tyrionNeutral.gif","./tyrionSad.gif"],Brienne:["./brienneHappy.gif","./brienneNeutral.gif","./brienneSad.gif"],Gendry:["./gendryHappy.gif","./gendryNeutral.gif","./gendrySad.gif"],"Grey Worm":["./grey.gif","./grey.gif","./grey.gif"],Tormund:["./tormundHappy.gif","./tormundNeutral.gif","./tormundSad.gif"],Davos:["./davosHappy.gif","./davosNeutral.gif","./davosSad.gif"],Podrick:["./podrickHappy.gif","./podrickNeutral.gif","./podrickSad.gif"],Bronn:["./bronnHappy.gif","./bronnNeutral.gif","./bronnSad.gif"]},O=function(e){function t(){return Object(s.a)(this,t),Object(p.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{style:S},Object.keys(N).map(function(e,t){return i.a.createElement(w,{key:t,name:e,images:Object.values(N)[t],alive:!0})}))}}]),t}(r.Component),k=a(21),T={display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",margin:"12px 1%",marginBottom:"40px"},A=(n={Theon:["./theonHappy.gif","./theonNeutral.gif","./theonSad.gif"],Cersei:["./cerseiHappy.gif","./cerseiNeutral.gif","./cerseiSad.gif"],Jaime:["./jaimeHappy.gif","./jaimeNeutral.gif","./jaimeSad.gif"],"The Hound":["./houndHappy.gif","./houndNeutral.gif","./houndSad.gif"],Euron:["./euronHappy.gif","./euronNeutral.gif","./euronSad.gif"],Jorah:["./jorahHappy.gif","./jorahNeutral.gif","./jorahSad.gif"],Melisandre:["./melisandreHappy.gif","./melisandreNeutral.gif","./melisandreSad.gif"]},Object(k.a)(n,"Cersei",["./cerseiHappy.gif","./cerseiNeutral.gif","./cerseiSad.gif"]),Object(k.a)(n,"Jaime",["./jaimeHappy.gif","./jaimeNeutral.gif","./jaimeSad.gif"]),Object(k.a)(n,"Euron",["./euronHappy.gif","./euronNeutral.gif","./euronSad.gif"]),Object(k.a)(n,"The Hound",["./houndHappy.gif","./houndNeutral.gif","./houndSad.gif"]),n),C=function(e){function t(){return Object(s.a)(this,t),Object(p.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{style:T},Object.keys(A).map(function(e,t){return i.a.createElement(w,{key:t,name:e,images:Object.values(A)[t],alive:!1})}))}}]),t}(r.Component),H={width:"100%",height:"92px",display:"flex",flexDirection:"row",justifyContent:"center",backgroundColor:"#FBFBFB",boxShadow:"0px 3px 6px 0px rgba(0,0,0,0.15)",position:"static",margin:"0px 0px"},I={display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",margin:"auto 0px",marginLeft:"8px",marginRight:"16px",height:"100%",clear:"both",cursor:"pointer"},B={fontFamily:"Trajan Pro",textAlign:"left",fontWeight:"400",fontSize:"1.2rem",color:"#272320",margin:"4px 0px 0px 0px"},F=function(){return i.a.createElement("div",{style:H},i.a.createElement("img",{alt:"ravenlogo",src:"./ravenlogo.png",style:{width:"64px",height:"64px",margin:"auto 0px",marginLeft:"16px",cursor:"pointer"},onClick:function(){return window.location.reload()}}),i.a.createElement("div",{style:I,onClick:function(){return window.location.reload()}},i.a.createElement("h1",{style:B},"How Twitter Feels About GOT Characters Right Now")))},R={width:"100%",height:"56px",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#FBFBFB",boxShadow:"0px 0px 6px 0px rgba(0,0,0,0.15)",position:"relative",bottom:"0",margin:"0px 0px"},D={fontFamily:"Trajan Pro",textAlign:"center",fontWeight:"400",fontSize:"16px",color:"#272320",margin:"0px"},L=function(){return i.a.createElement("div",{style:R},i.a.createElement("p",{style:D},"Created by ",i.a.createElement("a",{href:"https://edfilbasan.github.io/work"},"Lord Edfil")," ","& ",i.a.createElement("a",{href:"https://github.com/Gnuck"},"King Nick ")))},P=(a(173),a(55));P.a.initialize("UA-140459085-1"),P.a.pageview("/homepage"),y.a.initializeApp({apiKey:"AIzaSyCcGVBB9sK-MNlq8WHP8_niFeoR8sJJMtM",authDomain:"gotsentiment4.firebaseapp.com",databaseURL:"https://gotsentiment4.firebaseio.com",projectId:"gotsentiment4",storageBucket:"gotsentiment4.appspot.com",messagingSenderId:"857422030380",appId:"1:857422030380:web:fab679e52c7e9d44"});var U=function(e){function t(){return Object(s.a)(this,t),Object(p.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement(F,null),i.a.createElement(O,null),i.a.createElement("h1",{style:{textAlign:"center",marginBottom:"0px"}},"\ud83d\udc80 PRESS"," ",i.a.createElement("span",{style:{fontWeight:"1000",color:"#407398"}},"F")," ","TO PAY RESPECTS \ud83d\udc80"),i.a.createElement(C,null),i.a.createElement(L,null))}}]),t}(r.Component);l.a.render(i.a.createElement(U,null),document.getElementById("root"))},77:function(e,t,a){e.exports=a(175)},82:function(e,t,a){},83:function(e,t,a){}},[[77,1,2]]]);
//# sourceMappingURL=main.725f99c8.chunk.js.map