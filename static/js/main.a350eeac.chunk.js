(window["webpackJsonpgame-v2"]=window["webpackJsonpgame-v2"]||[]).push([[0],{23:function(e,t,a){e.exports=a(24)},24:function(e,t,a){"use strict";a.r(t);var n=a(20),r=a(8),s=a(9),c=a(12),i=a(10),o=a(13),u=a(0),l=a.n(u),m=a(16),v=a.n(m),h=a(7),d=a(17),p=a(18),b=a.n(p),f=a(21),N=a(22),E=a(14);a(34),a(35);function k(e){var t=e.isWinnerSquare?"square square-winner":"square";return t=t+" "+e.cssClass,l.a.createElement("button",{className:t,onClick:e.onClick},e.value)}var q=function(e){function t(){return Object(r.a)(this,t),Object(c.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(s.a)(t,[{key:"renderSquare",value:function(e,t,a){var n=this,r="";return 1===e||7===e?r="row1":3===e||5===e?r="row2":4===e&&(r="row3"),l.a.createElement(k,{cssClass:r,key:"Square"+e,value:this.props.squares[e],isWinnerSquare:t,onClick:function(){n.props.onClick(e,a)}})}},{key:"generateSquares",value:function(){for(var e=[],t=0,a=0;a<3;a++){for(var n=[],r=0;r<3;r++){var s=a+","+r,c=!(!this.props.winnerSquares||!this.props.winnerSquares.toString().includes(t));n.push(this.renderSquare(t,c,s)),t+=1}e.push(l.a.createElement("div",{key:"row"+a,className:"board-row"},n))}return e}},{key:"render",value:function(){return this.generateSquares()}}]),t}(l.a.Component),w=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(i.a)(t).call(this,e))).state={history:[{squares:Array(9).fill(null),movementIn:""}],stepNumber:0,xIsNext:!0,orderAscMoves:!0},a}return Object(o.a)(t,e),Object(s.a)(t,[{key:"handleClick",value:function(e,t){var a=this.state.history.slice(0,this.state.stepNumber+1);console.log("History"+a);var n=a[a.length-1].squares.slice();y(n)||n[e]||(n[e]=this.state.xIsNext?"X":"O",this.setState({history:a.concat([{squares:n,movementIn:t}]),stepNumber:a.length,xIsNext:!this.state.xIsNext,orderAscMoves:this.state.orderAscMoves}))}},{key:"jumpTo",value:function(e){this.setState({stepNumber:e,xIsNext:e%2===0})}},{key:"render",value:function(){var e,t,a,n=this,r=this.state.history,s=r[this.state.stepNumber],c=y(s.squares),i=r.map(function(e,t){var a=t?"Go to move #"+t:"Go to start";a=a+" "+(t?"("+n.state.history[t].movementIn+")":"");var r=t===n.state.stepNumber?"button-selected":null;return r+=" btn btn-warning",l.a.createElement("div",{key:t},l.a.createElement("button",{className:r,onClick:function(){n.jumpTo(t)}},a))});c||9!==this.state.stepNumber?c?(e="Winner: "+c.winner,t=c.pathWinner,a=l.a.createElement(b.a,{width:1e3,height:1e3})):(e="Next player: "+(this.state.xIsNext?"X":"O"),t=null):e="\xa1Game over! Result: Tie";var o="Sort descending",u=h.a;return this.state.orderAscMoves||(o="Sort ascending",u=h.b,i.reverse()),l.a.createElement("div",null,a,l.a.createElement(f.a,{className:"title",fluid:!0},l.a.createElement(N.a,null,l.a.createElement(E.a,{sm:12},"Tic Tac Toe"))),l.a.createElement(f.a,null,l.a.createElement(N.a,{className:"content"},l.a.createElement(E.a,{sm:6,className:"colGame"},l.a.createElement("div",{className:"game"},l.a.createElement("div",{className:"game-board"},l.a.createElement(q,{squares:s.squares,winnerSquares:t,onClick:function(e,t){n.handleClick(e,t)}}))),l.a.createElement("div",{className:"status"},e)),l.a.createElement(E.a,{sm:6},l.a.createElement("div",{className:"game-info"},i,l.a.createElement("button",{className:"btn btn-success",onClick:function(){n.setState({orderAscMoves:!n.state.orderAscMoves})}},l.a.createElement(d.a,{icon:u})," "+o))))))}}]),t}(l.a.Component);function y(e){for(var t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],a=0;a<t.length;a++){var r=Object(n.a)(t[a],3),s=r[0],c=r[1],i=r[2];if(e[s]&&e[s]===e[c]&&e[s]===e[i])return{winner:e[s],pathWinner:t[a]}}return null}v.a.render(l.a.createElement(w,null),document.getElementById("root"))},35:function(e,t,a){}},[[23,1,2]]]);
//# sourceMappingURL=main.a350eeac.chunk.js.map