(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{158:function(e,t,a){"use strict";a.r(t);var n=a(2),i=a.n(n),r=a(69),o=a.n(r),s=(a(76),a(35)),l=a(36),c=a(38),p=a(37),u=a(39),f=(a(77),{display:"flex",flexDirection:"row",alignItems:"center",width:"359px",height:"200px",borderRadius:"8px",backgroundColor:"white",boxShadow:"0px 4px 8px 0px rgba(0,0,0,0.15)",margin:"20px 20px","&:hover":{backgroundColor:"red"}}),d={height:"184px",width:"184px",borderRadius:"50%",overflow:"hidden",position:"relative",margin:"4px 16px 4px 4px"},m={objectFit:"cover",objectPosition:"40% 50%",width:"100%",height:"100%"},g={height:"30%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start"},h=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(a=Object(c.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(i)))).sentiment=function(e){switch(e){case"HAPPY":return"sentimentHappy";case"NEUTRAL":return"sentimentNeutral";case"SAD":return"sentimentSad";default:return"sentimentNeutral"}},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{style:f},i.a.createElement("div",{style:d},i.a.createElement("img",{alt:this.props.image,src:this.props.image,style:m})),i.a.createElement("div",{style:g},i.a.createElement("h3",null,this.props.name),i.a.createElement("h2",{className:this.sentiment(this.props.sentiment)},this.props.sentiment),i.a.createElement("h4",null,"TWEETS: ",this.props.total)))}}]),t}(n.Component),y=0,x=-5,w={display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",margin:"2% 3%"},b={Jon:["./jonHappy.gif","./jonNeutral.gif","./jonSad.gif"],Daenerys:["./danyHappy.gif","./danyNeutral.gif","./danySad.gif"],Cersei:["./cerseiHappy.gif","./cerseiNeutral.gif","./cerseiSad.gif"],Arya:["./aryaHappy.gif","./aryaNeutral.gif","./aryaSad.gif"],Sansa:["./sansaHappy.gif","./sansaNeutral.gif","./sansaSad.gif"],Bran:["./branHappy.gif","./branNeutral.gif","./branSad.gif"],Tyrion:["./tyrionHappy.gif","./tyrionNeutral.gif","./tyrionSad.gif"],Jaime:["./jaimeHappy.gif","./jaimeNeutral.gif","./jaimeSad.gif"],Donald:["./donaldHappy.gif","./donaldNeutral.gif","./donaldSad.gif"]};function v(e){switch(e){case"HAPPY":return 0;case"NEUTRAL":return 1;case"SAD":default:return 2}}var j=function(e){return i.a.createElement("div",{style:w},Object.keys(b).map(function(t,a){var n,r=null==(n=e.data[t.toLowerCase()]).net?"NEUTRAL":n.net>y?"HAPPY":n.net<=x?"SAD":"NEUTRAL",o=e.data[t.toLowerCase()].total;return i.a.createElement(h,{key:a,name:t,sentiment:r,image:Object.values(b)[a][v(r)],total:o})}))},E={width:"100%",height:"80px",display:"flex",flexDirection:"row",justifyContent:"space-between",backgroundColor:"white",boxShadow:"0px 3px 6px 0px rgba(0,0,0,0.15)",position:"static",margin:"0px 0px"},S={display:"flex",flexDirection:"column",justifyContent:"center",margin:"auto 5%",height:"100%",clear:"both"},A={margin:"0px 0px"},D={fontFamily:"Trajan Pro",fontWeight:"400",fontSize:"16px",color:"#272320",margin:"4px 0px 0px 0px"},N=function(e){return i.a.createElement("div",{style:E},i.a.createElement("div",{style:S},i.a.createElement("h3",{style:A},"Game of Thrones"),i.a.createElement("p",{style:D},"Twitter Feels Analysis")))},k=a(70),C=a.n(k),H=a(52),O=a.n(H);O.a.initializeApp({apiKey:"AIzaSyCGXuGAww1Q36nCUt35ZHw4VAOtqPxApY0",authDomain:"gotsentiment.firebaseapp.com",databaseURL:"https://gotsentiment.firebaseio.com",projectId:"gotsentiment",storageBucket:"gotsentiment.appspot.com",messagingSenderId:"521626027009"});var T=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(a=Object(c.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(i)))).state={jon:{},cersei:{},daenerys:{},arya:{},sansa:{},bran:{},tyrion:{},jaime:{},donald:{},lastUpdate:""},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentWillMount",value:function(){this.getData()}},{key:"getData",value:function(){var e=this;O.a.database().ref("/characters").on("value",function(t){console.log(t.val());var a=t.val();a.lastUpdate=C()(new Date).format("MM/DD/YYYY h:mm:ss a"),e.setState(a,function(){console.log(e.state)})})}},{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement(N,null),i.a.createElement(j,{data:this.state}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(T,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},71:function(e,t,a){e.exports=a(158)},76:function(e,t,a){},77:function(e,t,a){}},[[71,1,2]]]);
//# sourceMappingURL=main.73a2e2f4.chunk.js.map