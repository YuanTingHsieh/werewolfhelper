(this["webpackJsonpwerewolfhelper-client"]=this["webpackJsonpwerewolfhelper-client"]||[]).push([[0],{31:function(e,a,t){e.exports=t(46)},44:function(e,a,t){},46:function(e,a,t){"use strict";t.r(a);var r=t(0),n=t.n(r),c=t(26),o=t.n(c),s=t(11),l=t(13),i=t(12),m=t(15),u=t(3),p=t(9),h=t(18),d=t(16),f=t(8),b=t(17),E=function(e){Object(l.a)(t,e);var a=Object(i.a)(t);function t(e){var r;return Object(s.a)(this,t),(r=a.call(this,e)).onChangeRoomID=function(e){r.setState({roomid:e.target.value})},r.render=function(){return n.a.createElement("div",{className:"text-center"},n.a.createElement(f.a,{size:"lg",className:"mb-3"},n.a.createElement(f.a.Prepend,null,n.a.createElement(f.a.Text,{id:"inputGroup-sizing-sm"},"\u623f\u9593ID")),n.a.createElement(b.a,{"aria-label":"Small","aria-describedby":"inputGroup-sizing-sm",value:r.state.roomid,onChange:r.onChangeRoomID}),n.a.createElement(m.b,{to:{pathname:"/room/".concat(r.state.roomid)}},n.a.createElement(p.a,{size:"lg",disabled:!r.state.roomid},"\u52a0\u5165\u623f\u9593"))))},r.state={roomid:""},r}return t}(n.a.Component),v=function(){return n.a.createElement(d.a,{className:"p-3"},n.a.createElement(h.a,null,n.a.createElement("h1",{className:"header"},"\u72fc\u4eba\u6bba\u9762\u6bba\u52a9\u624bv1"),n.a.createElement("div",{className:"text-center"},n.a.createElement(m.b,{to:"/createroom"},n.a.createElement(p.a,{size:"lg"},"\u5275\u5efa\u623f\u9593"))),n.a.createElement(E,null)))},y=t(30),g=t(19),C=t(20),j=function(e){Object(l.a)(t,e);var a=Object(i.a)(t);function t(){var e;Object(s.a)(this,t);for(var r=arguments.length,n=new Array(r),c=0;c<r;c++)n[c]=arguments[c];return(e=a.call.apply(a,[this].concat(n))).handleChange=function(a){var t=a.target.value;!isNaN(t)&&t>0&&e.props.setCharNumber(e.props.name,t)},e.onClickAdd=function(){e.props.setCharNumber(e.props.name,e.props.number+1)},e.onClickDeduct=function(){e.props.setCharNumber(e.props.name,e.props.number-1)},e}return Object(g.a)(t,[{key:"render",value:function(){return n.a.createElement(C.a,{md:{span:3,offset:4}},n.a.createElement(f.a,{className:"mb-3"},n.a.createElement(f.a.Prepend,null,this.props.number>0?n.a.createElement(p.a,{disabled:!0,variant:"secondary"},this.props.cname):n.a.createElement(p.a,{disabled:!0,variant:"outline-secondary"},this.props.cname),n.a.createElement(p.a,{onClick:this.onClickDeduct,disabled:0===this.props.number}," - ")),n.a.createElement(b.a,{"aria-label":"Small","aria-describedby":"inputGroup-sizing-sm",type:"number",value:this.props.number,onChange:this.handleChange}),n.a.createElement(f.a.Append,null,n.a.createElement(p.a,{onClick:this.onClickAdd}," + "))))}}]),t}(n.a.Component);function N(e){if(e.status>=200&&e.status<300)return e;var a=new Error("HTTP Error ".concat(e.statusText));throw a.status=e.statusText,a.response=e,console.log(a),a}function O(e){return e.json()}function k(e,a){for(var t in e)if(t in a){if(e[t]!==a[t])return!1}else if(0!==e[t])return!1;return!0}var S=function(e){Object(l.a)(t,e);var a=Object(i.a)(t);function t(e){var r;return Object(s.a)(this,t),(r=a.call(this,e)).setCharNumber=function(e,a){r.setState((function(t){var r=t.characters;return r[e]=parseInt(a),{characters:r,players:function(e){var a=0;for(var t in e)e.hasOwnProperty(t)&&(a+=parseFloat(e[t]));return a}(r)}}),(function(){return r.validateRoom()}))},r.validateRoom=function(){for(var e in r.state.boards)if(k(r.state.characters,r.state.boards[e])){r.setState({isValidRoom:!0}),console.log("Found equal room!");break}},r.onClickCreateRoom=function(){fetch("/api/room",{method:"POST",headers:{"Content-Type":"application/json"},mode:"cors",body:JSON.stringify({time:r.state.time,players:r.state.players,characters:r.state.characters})}).then((function(e){return e.json()})).then((function(e){console.log(e),r.setState({hasResult:!0,roomid:e.roomid})})).catch((function(e){console.err(e)}))},r.onClickSetBoard=function(e){var a=r.state.boards[e],t=r.state.characters;for(var n in t)t[n]=n in a?a[n]:0;r.setState({characters:t,isValidRoom:!0})},r.render=function(){var e=Object.keys(r.state.boards).map((function(e){return n.a.createElement(p.a,{key:e,className:"mr-1 mb-1",size:"md",variant:"outline-info",onClick:function(){r.onClickSetBoard(e)}},e)})),a=Object.entries(r.state.charactersMapping).map((function(e,a){var t=Object(y.a)(e,2),c=t[0],o=t[1];return n.a.createElement(j,{key:a,cname:o,name:c,number:r.state.characters[c],setCharNumber:r.setCharNumber})})),t="/room/"+r.state.roomid;return n.a.createElement(d.a,{className:"p-3"},n.a.createElement("div",{className:"text-center"},e,a,n.a.createElement(p.a,{size:"lg",disabled:!r.state.isValidRoom,onClick:r.onClickCreateRoom},"\u5275\u9020\u623f\u9593"),r.state.isValidRoom?null:n.a.createElement("div",null,"\u623f\u9593\u4e0d\u7b26\u5408\u5df2\u5b58\u5728\u7684\u677f\u5b50\u3002"),r.state.hasResult?n.a.createElement(m.b,{to:t},n.a.createElement(p.a,{size:"lg"},"\u9032\u5165\u623f\u9593 ",r.state.roomid," ")):null))},r.state={isValidRoom:!1,roomid:"",time:120,players:0,characters:{},charactersMapping:{},boards:{},hasResult:!1},r}return Object(g.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("/api/characters",{method:"GET",accept:"application: json",mode:"cors"}).then(N).then(O).then((function(a){var t={};Object.keys(a).forEach((function(e){t[e]=0})),e.setState({characters:t,charactersMapping:a})})).catch((function(e){console.log("Fetch character error "+e)})),fetch("/api/boards",{method:"GET",accept:"application: json",mode:"cors"}).then(N).then(O).then((function(a){e.setState({boards:a})})).catch((function(e){console.log("Fetch character error "+e)}))}}]),t}(n.a.Component),P=t(29);function R(e){return n.a.createElement(C.a,null,n.a.createElement(f.a,{className:"mb-3"},n.a.createElement(f.a.Prepend,null,n.a.createElement(f.a.Text,null,e.number+1)),n.a.createElement(b.a,{"aria-label":"Small","aria-describedby":"inputGroup-sizing-sm",value:e.name,onChange:function(a){var t=a.target.value;e.setPlayerName(e.number,t)}})))}var T=function(e){Object(l.a)(t,e);var a=Object(i.a)(t);function t(e){var r;return Object(s.a)(this,t),(r=a.call(this,e)).componentDidMount=function(){fetch("/api/room?roomid=".concat(r.props.match.params.roomid),{method:"GET",accept:"application: json",mode:"cors"}).then(N).then(O).then((function(e){console.log(e),r.setState({valid:!0,numPlayers:e.players,characters:e.characters})})).catch((function(e){console.log("Error "+e)})),fetch("/api/characters",{method:"GET",accept:"application: json",mode:"cors"}).then(N).then(O).then((function(e){r.setState({charactersMapping:e})})).catch((function(e){console.log("Fetch character error "+e)}))},r.setPlayerName=function(e,a){r.setState((function(t){var r=t.players;return r[e]=a,{players:r}}))},r.render=function(){if(!r.state.valid)return n.a.createElement("div",null,"\u623f\u9593 ",r.props.match.params.roomid," \u4e0d\u5b58\u5728\u3002 \u8acb\u5148\u5275\u5efa\u623f\u9593\u3002");var e="";Object.keys(r.state.characters).forEach((function(a){var t=r.state.characters[a];e+=t>0?r.state.charactersMapping[a]+t:""}));for(var a=[],t=0;t<12;t+=2)a.push(n.a.createElement(P.a,{key:t},n.a.createElement(R,{number:t,name:r.state.players[t],setPlayerName:r.setPlayerName}),n.a.createElement(R,{number:t+1,name:r.state.players[t+1],setPlayerName:r.setPlayerName})));return n.a.createElement(d.a,{className:"p-3"},n.a.createElement(h.a,null,n.a.createElement("h3",{className:"header"},"This is room ",r.props.match.params.roomid,". We have"," ",r.state.numPlayers," players. Board ",e,"."),a))},r.state={valid:!1,players:Array(12).fill("\u4f60\u7684\u540d\u5b57"),numPlayers:0,characters:{},charactersMapping:{}},r}return t}(n.a.Component),w=function(e){Object(l.a)(t,e);var a=Object(i.a)(t);function t(e){var r;return Object(s.a)(this,t),(r=a.call(this,e)).render=function(){return n.a.createElement(m.a,null,n.a.createElement(u.a,{exact:!0,path:"/",component:v}),n.a.createElement(u.a,{path:"/createroom",component:S}),n.a.createElement(u.a,{path:"/room/:roomid",component:T}))},r.state={rooms:[]},r}return t}(n.a.Component);t(44),t(45);o.a.render(n.a.createElement(w,null),document.getElementById("root"))}},[[31,1,2]]]);
//# sourceMappingURL=main.bc490dab.chunk.js.map