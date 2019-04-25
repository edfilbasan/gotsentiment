(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{168:function(e,t,n){"use strict";n.r(t);var a=n(2),i=n.n(a),r=n(70),o=n.n(r),s=(n(77),n(17)),c=n(18),l=n(20),u=n(19),p=n(21),m=(n(78),n(71)),f=n.n(m),g=n(40),h=n.n(g),d={display:"flex",flexDirection:"row",alignItems:"center",width:"359px",height:"200px",borderRadius:"8px",backgroundColor:"white",boxShadow:"0px 4px 8px 0px rgba(0,0,0,0.15)",margin:"20px 20px"},y={height:"184px",width:"184px",borderRadius:"50%",overflow:"hidden",position:"relative",margin:"4px 8px 4px 4px"},x={objectFit:"cover",objectPosition:"40% 50%",width:"100%",height:"100%"},w={height:"30%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start"},b=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).sentiment=function(e){switch(e){case"HAPPY":return"sentimentHappy";case"NEUTRAL":return"sentimentNeutral";case"SAD":return"sentimentSad";default:return"sentimentNeutral"}},n.emoji=function(e){switch(e){case"HAPPY":return["\ud83d\ude03","\ud83d\udcaf","\ud83c\udf89"];case"NEUTRAL":return["\ud83d\ude10","\ud83d\ude0c","\ud83c\udd97"];case"SAD":return["\ud83d\ude2d","\ud83d\ude14","\ud83d\ude1f"];default:return["\ud83d\ude10","\ud83d\ude0c","\ud83c\udd97"]}},n.state={negative:0,net:0,neutral:0,positive:0,total:0,sentiment:"NEUTRAL"},n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.onDataChange(this.props.name.toLowerCase())}},{key:"onDataChange",value:function(e){var t=this;h.a.database().ref("/characters/"+e).on("value",function(e){var n=e.val();n.sentiment=t.getCharData(n),console.log("".concat(t.props.name,":"),n);var a=t.state.sentiment;t.setState(n,function(){t.state.sentiment!==a&&t.reward.rewardMe()})})}},{key:"getImageIdx",value:function(e){switch(e){case"HAPPY":return 0;case"NEUTRAL":return 1;case"SAD":default:return 2}}},{key:"getCharData",value:function(e){return null==e.net?"NEUTRAL":e.net>0?"HAPPY":e.net<=-5?"SAD":"NEUTRAL"}},{key:"render",value:function(){var e=this,t=this.props.images[this.getImageIdx(this.state.sentiment)];return i.a.createElement("div",{style:d,className:"grow",onClick:function(){return e.reward.rewardMe()}},i.a.createElement("div",{style:y},i.a.createElement("img",{alt:t,src:t,style:x})),i.a.createElement(f.a,{ref:function(t){e.reward=t},type:"emoji",config:{emoji:this.emoji(this.state.sentiment),lifetime:200,spread:40,elementCount:20,elementSize:32}}),i.a.createElement("div",{style:w},i.a.createElement("h3",null,this.props.name),i.a.createElement("h2",{className:this.sentiment(this.state.sentiment)},this.state.sentiment),i.a.createElement("h4",null,"TWEETS ",i.a.createElement("br",null),this.state.total)))}}]),t}(a.Component),j={display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",margin:"2% 3%"},v={Jon:["./jonHappy.gif","./jonNeutral.gif","./jonSad.gif"],Daenerys:["./danyHappy.gif","./danyNeutral.gif","./danySad.gif"],Cersei:["./cerseiHappy.gif","./cerseiNeutral.gif","./cerseiSad.gif"],Arya:["./aryaHappy.gif","./aryaNeutral.gif","./aryaSad.gif"],Sansa:["./sansaHappy.gif","./sansaNeutral.gif","./sansaSad.gif"],Bran:["./branHappy.gif","./branNeutral.gif","./branSad.gif"],Tyrion:["./tyrionHappy.gif","./tyrionNeutral.gif","./tyrionSad.gif"],Jaime:["./jaimeHappy.gif","./jaimeNeutral.gif","./jaimeSad.gif"]},E=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{style:j},Object.keys(v).map(function(e,t){return i.a.createElement(b,{key:t,name:e,images:Object.values(v)[t]})}))}}]),t}(a.Component),S={width:"100%",height:"80px",display:"flex",flexDirection:"row",justifyContent:"space-between",backgroundColor:"white",boxShadow:"0px 3px 6px 0px rgba(0,0,0,0.15)",position:"static",margin:"0px 0px"},A={display:"flex",flexDirection:"column",justifyContent:"center",margin:"auto 0px 0px 40px",height:"100%",clear:"both"},C={margin:"0px 0px"},N={fontFamily:"Trajan Pro",fontWeight:"400",fontSize:"16px",color:"#272320",margin:"4px 0px 0px 0px"},O=function(){return i.a.createElement("div",{style:S},i.a.createElement("div",{style:A},i.a.createElement("h3",{style:C}," Game of Thrones "),i.a.createElement("p",{style:N}," Twitter Feels Analysis ")))};n(166);h.a.initializeApp({apiKey:"AIzaSyCGXuGAww1Q36nCUt35ZHw4VAOtqPxApY0",authDomain:"gotsentiment.firebaseapp.com",databaseURL:"https://gotsentiment.firebaseio.com",projectId:"gotsentiment",storageBucket:"gotsentiment.appspot.com",messagingSenderId:"521626027009"});var k=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement(O,null),i.a.createElement(E,null))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},72:function(e,t,n){e.exports=n(168)},77:function(e,t,n){},78:function(e,t,n){}},[[72,1,2]]]);
//# sourceMappingURL=main.aba9c2d9.chunk.js.map