(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{172:function(e,t,a){"use strict";a.r(t);var n=a(1),i=a.n(n),r=a(71),o=a.n(r),s=(a(79),a(18)),l=a(19),c=a(21),p=a(20),u=a(22),g=(a(80),a(72)),d=a.n(g),f=a(41),m=a.n(f),h=a(73),y={display:"flex",flexDirection:"row",alignItems:"center",width:"359px",height:"200px",borderRadius:"8px",backgroundColor:"#FBFBFB",boxShadow:"0px 4px 8px 0px rgba(0,0,0,0.15)",margin:"20px 20px"},x={height:"184px",width:"184px",borderRadius:"50%",overflow:"hidden",position:"relative",margin:"4px 8px 4px 4px"},w={objectFit:"cover",objectPosition:"40% 50%",width:"100%",height:"100%"},b={width:"175px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start"},E=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(p.a)(t).call(this,e))).sentiment=function(e){switch(e){case"POSITIVE":return"sentimentHappy";case"NEUTRAL":return"sentimentNeutral";case"NEGATIVE":return"sentimentSad";default:return"sentimentNeutral"}},a.emoji=function(e){switch(e){case"POSITIVE":return["\ud83d\ude03","\ud83d\udcaf","\ud83c\udf89"];case"NEUTRAL":return["\ud83d\ude10","\ud83d\ude0c","\ud83c\udd97"];case"NEGATIVE":return["\ud83d\ude2d","\ud83d\ude14","\ud83d\ude1f"];default:return["\ud83d\ude10","\ud83d\ude0c","\ud83c\udd97"]}},a.state={negative:0,net:0,neutral:0,positive:0,total:0,data:[],sentiment:"NEUTRAL"},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.onDataChange(this.props.name.toLowerCase())}},{key:"onDataChange",value:function(e){var t=this,a=e;"grey worm"===e&&(a="greyworm"),"the hound"===e&&(a="thehound"),m.a.database().ref("/characters/"+a).on("value",function(e){var a=e.val();null==a&&(a=t.state),a.sentiment=t.getCharData(a),console.log("".concat(t.props.name,":"),a);var n=t.state.sentiment,i=t.state.data;t.setState(a,function(){t.state.sentiment!==n&&t.reward.rewardMe(),null!=a&&null!=a.net&&(i.push(a.net),i.length>100&&i.shift())})})}},{key:"getImageIdx",value:function(e){switch(e){case"POSITIVE":return 0;case"NEUTRAL":return 1;case"NEGATIVE":return 2;default:return 1}}},{key:"getCharData",value:function(e){return null==e||null==e.net?"NEUTRAL":null!=e?e.net>=0?"POSITIVE":e.net<=-2?"NEGATIVE":"NEUTRAL":void 0}},{key:"render",value:function(){var e=this,t=this.props.images[this.getImageIdx(this.state.sentiment)];return console.log("".concat(this.props.name,":"),this.state.data),i.a.createElement("div",{style:y,className:"grow",onClick:function(){return e.reward.rewardMe()}},i.a.createElement("div",{style:x},i.a.createElement("img",{alt:t,src:t,style:w})),i.a.createElement("div",{style:b},i.a.createElement("h3",null,this.props.name),i.a.createElement("h2",{className:this.sentiment(this.state.sentiment)},this.state.sentiment),i.a.createElement(d.a,{ref:function(t){e.reward=t},type:"emoji",config:{emoji:this.emoji(this.state.sentiment),lifetime:100,spread:45,elementCount:8,elementSize:40,springAnimation:!0}}),i.a.createElement("h5",null,"TWEETS"),i.a.createElement("h4",null,this.state.total),i.a.createElement("div",{style:{paddingTop:"8px",paddingRight:"20px"}},i.a.createElement(h.a,{smooth:!0,data:this.state.data,gradient:["#732727","#407398","#3A7737"],radius:30,strokeWidth:6,strokeLinecap:"round"}),i.a.createElement("h6",null,"Past ",this.state.data.length," Tweets"))))}}]),t}(n.Component),v={display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",margin:"12px 1%",marginBottom:"40px"},j={Thrones:["./thronesHappy.gif","./thronesNeutral.gif","./thronesSad.gif"],Jon:["./jonHappy.gif","./jonNeutral.gif","./jonSad.gif"],Daenerys:["./danyHappy.gif","./danyNeutral.gif","./danySad.gif"],Cersei:["./cerseiHappy.gif","./cerseiNeutral.gif","./cerseiSad.gif"],Arya:["./aryaHappy.gif","./aryaNeutral.gif","./aryaSad.gif"],Sansa:["./sansaHappy.gif","./sansaNeutral.gif","./sansaSad.gif"],Bran:["./branHappy.gif","./branNeutral.gif","./branSad.gif"],Tyrion:["./tyrionHappy.gif","./tyrionNeutral.gif","./tyrionSad.gif"],Jaime:["./jaimeHappy.gif","./jaimeNeutral.gif","./jaimeSad.gif"],Tormund:["./tormundHappy.gif","./tormundNeutral.gif","./tormundSad.gif"],Theon:["./theonHappy.gif","./theonNeutral.gif","./theonSad.gif"],Brienne:["./brienneHappy.gif","./brienneNeutral.gif","./brienneSad.gif"],Gendry:["./gendryHappy.gif","./gendryNeutral.gif","./gendrySad.gif"],"Grey Worm":["./grey.gif","./grey.gif","./grey.gif"],"The Hound":["./houndHappy.gif","./houndNeutral.gif","./houndSad.gif"],Jorah:["./jorahHappy.gif","./jorahNeutral.gif","./jorahSad.gif"],Davos:["./davosHappy.gif","./davosNeutral.gif","./davosSad.gif"],Podrick:["./podrickHappy.gif","./podrickNeutral.gif","./podrickSad.gif"],Bronn:["./bronnHappy.gif","./bronnNeutral.gif","./bronnSad.gif"],Melisandre:["./melisandreHappy.gif","./melisandreNeutral.gif","./melisandreSad.gif"]},N=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{style:v},Object.keys(j).map(function(e,t){return i.a.createElement(E,{key:t,name:e,images:Object.values(j)[t]})}))}}]),t}(n.Component),S={width:"100%",height:"92px",display:"flex",flexDirection:"row",justifyContent:"center",backgroundColor:"#FBFBFB",boxShadow:"0px 3px 6px 0px rgba(0,0,0,0.15)",position:"static",margin:"0px 0px"},k={display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",margin:"auto 0px",marginLeft:"8px",marginRight:"16px",height:"100%",clear:"both",cursor:"pointer"},T={fontFamily:"Trajan Pro",textAlign:"left",fontWeight:"400",fontSize:"1.2rem",color:"#272320",margin:"4px 0px 0px 0px"},C=function(){return i.a.createElement("div",{style:S},i.a.createElement("img",{alt:"ravenlogo",src:"./ravenlogo.png",style:{width:"64px",height:"64px",margin:"auto 0px",marginLeft:"16px",cursor:"pointer"},onClick:function(){return window.location.reload()}})," ",i.a.createElement("div",{style:k,onClick:function(){return window.location.reload()}},i.a.createElement("h1",{style:T},"How Twitter Feels About GOT Characters Right Now"," ")," ")," ")},H={width:"100%",height:"56px",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#FBFBFB",boxShadow:"0px 0px 6px 0px rgba(0,0,0,0.15)",position:"relative",bottom:"0px",margin:"0px 0px"},I={fontFamily:"Trajan Pro",textAlign:"center",fontWeight:"400",fontSize:"16px",color:"#272320",margin:"0px"},O=function(e){return i.a.createElement("div",{style:H},i.a.createElement("p",{style:I},"Made by ",i.a.createElement("a",{href:"https://edfilbasan.github.io/work"},"Lord Edfil")," &"," ",i.a.createElement("a",{href:"https://github.com/Gnuck"},"King Nick ")," of"," ",i.a.createElement("a",{href:"https://viuw.io/"},"House Viuw")))};a(170);m.a.initializeApp({apiKey:"AIzaSyCGXuGAww1Q36nCUt35ZHw4VAOtqPxApY0",authDomain:"gotsentiment.firebaseapp.com",databaseURL:"https://gotsentiment.firebaseio.com",projectId:"gotsentiment",storageBucket:"gotsentiment.appspot.com",messagingSenderId:"521626027009"});var A=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement(C,null),i.a.createElement(N,null),i.a.createElement(O,null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},74:function(e,t,a){e.exports=a(172)},79:function(e,t,a){},80:function(e,t,a){}},[[74,1,2]]]);
//# sourceMappingURL=main.5b90241c.chunk.js.map