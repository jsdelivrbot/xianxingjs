/* day to ms */
var _DAY = 1000 * 60 * 60 * 24;
/* months */
var _months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/* months short */
var _monthsShort = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
/* weeks */
var _weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
/* weeks from monday */
var _weeksFromMonday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
/* weeks short */
var _weeksShort = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
/* weeks from monday */
var _weeksShortFromMonday = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
/* global variable 4 function IdCardValidate : 加权因子 */
var _fctIdCardValidate_Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];
/* global variable 4 function IdCardValidate : 身份证验证位值.10代表X */
var _fctIdCardValidate_ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];

/*-jsfct- Format
 * function 格式化日期
 * parameter 格式(yyyy-MM-dd hh:mm:ss)
 * example [var today = new Date(); var format = today.Format("yyyy-MM-dd");]
 */
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, /*月份*/
    "d+": this.getDate(), /*日*/
    "h+": this.getHours(), /*小时*/
    "m+": this.getMinutes(), /*分*/
    "s+": this.getSeconds(), /*秒*/
    "q+": Math.floor((this.getMonth() + 3) / 3), /*季度*/
    "S": this.getMilliseconds() /*毫秒*/
  };
  var week = {"0" : "\u65e5","1" : "\u4e00","2" : "\u4e8c","3" : "\u4e09","4" : "\u56db","5" : "\u4e94","6" : "\u516d"};
  
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  
  if (/(E+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length>1)?(RegExp.$1.length>2?"\u661f\u671f":"\u5468") : "") + week[this.getDay()+""]);
  
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

/*-jsfct- indexOf
 * function IndexOf的IE7兼容版
 * parameter 元素(obj)
 * example [var array = ["1","2","3"]; var index = array.indexOf("2");]
 */
if (!Array.prototype.indexOf){
  Array.prototype.indexOf = function(elt /*, from*/){
    var len = this.length >>> 0;
    var from = Number(arguments[1]) || 0;
    from = (from < 0) ? Math.ceil(from) : Math.floor(from);
    if (from < 0) from += len;
    for (; from < len; from++){
      if (from in this && this[from] === elt) return from;
    }
    return -1;
  };
}

/*-jsfct- CountLength
 * function 长度计数
 * parameter 
 * example [var str = "中文+English"; var length = str.CountLength();]
 */
String.prototype.CountLength = function () {
  var str = this;
  if (str && str.length > 0) { 
    // remove line breaks
    var noBreaksText = str.replace(/(\r\n|\n|\r)/gm, "");
    return noBreaksText.length;
  }
  return 0;
}

/*-jsfct- IdCardValidate
 * function 身份证验证
 * parameter 身份证号码(idCard)
 * example IdCardValidate("41102319860910****")
 */
function IdCardValidate(idCard) {
  idCard = trim(idCard.replace(/ /g, ""));
  if (idCard.length == 15) {
    return isValidityBrithBy15IdCard(idCard);
  } else if (idCard.length == 18) {
    var a_idCard = idCard.split("");
    if(isValidityBrithBy18IdCard(idCard)&&isTrueValidateCodeBy18IdCard(a_idCard)){
      return true;
    }else {
      return false;
    }
  } else {
    return false;
  }
}

/*-jssubfct-*/
function isTrueValidateCodeBy18IdCard(a_idCard) {
  var sum = 0;
  if (a_idCard[17].toLowerCase() == 'x') {
    a_idCard[17] = 10;
  }
  for ( var i = 0; i < 17; i++) {
    sum += _fctIdCardValidate_Wi[i] * a_idCard[i];
  }
  valCodePosition = sum % 11;
  if (a_idCard[17] == _fctIdCardValidate_ValideCode[valCodePosition]) {
    return true;
  } else {
    return false;
  }
}

/*-jssubfct-*/
function isValidityBrithBy18IdCard(idCard18){
  var year =  idCard18.substring(6,10);
  var month = idCard18.substring(10,12);
  var day = idCard18.substring(12,14);
  var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));

  if(temp_date.getFullYear()!=parseFloat(year)
    ||temp_date.getMonth()!=parseFloat(month)-1
    ||temp_date.getDate()!=parseFloat(day)){
    return false;
  }else{
    return true;
  }
}

/*-jssubfct-*/
function isValidityBrithBy15IdCard(idCard15){   
  var year =  idCard15.substring(6,8);
  var month = idCard15.substring(8,10);
  var day = idCard15.substring(10,12);
  var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));

  if(temp_date.getYear()!=parseFloat(year)
    ||temp_date.getMonth()!=parseFloat(month)-1
    ||temp_date.getDate()!=parseFloat(day)){
      return false;
  }else{
    return true;
  }
}

/*-jsfct1word-trim*/
function trim(str) {   
    return str.replace(/(^\s*)|(\s*$)/g, "");   
}

/*-jsfct1word-nospace-*/
function noSpace(str) {
	return (str.replace(/[\s]+/g,''));
}

/*-jsfct- checkHtmlTags
 * function 检测html标签匹配
 * parameter html
 * example checkHtmlTags("<td></tr>")
 */
function checkHtmlTags(html){
	if (html == null || html == "") return;
	
	var s = noSpace(html).toLowerCase();
	var arrMinus = new Array('<img>','<input>','<meta>','<hr>');//br link
	for (var i = 0; i < arrMinus.length; i ++){
		s = s.replace(arrMinus[i],'');
	}
	
	var arrElement = s.match(/<[/|A-Za-z]+>/ig);
	var stack = new Array();
	stack[0] = '#';
	k = 0;
	for (var j = 0; j < arrElement.length; j ++){
		if (('<'+'/'+stack[k].substr(1)) == arrElement[j]){
			k --;
			stack.length --;
		} else {
			stack[++k] = arrElement[j];
		}
		alert(stack[k]);
	}
	(stack[k] == "#") ? (document.write("All Mathed")) : (document.write("Some Unmatched"));
}

/*-jsfct1word-addDays-*/ 
Date.prototype.addDays = function (num) {
  return new Date((num * _DAY) + this.valueOf());
}

/*-jsfct1word-replaceAll2-*/
String.prototype.replaceAll2 = function(s1, s2) {
  return this.replace(new RegExp(s1,"gm"),s2);
}

/*-Not Recommended ! may be very slow when table is big-*/
/*-jsfct1word-fixTableBorder-donnot hide any tr ! */
function fixTableBorder(tableId){
  $("#"+tableId+" td").each(function(){
    if ($(this).next().length > 0){$(this).css("border-right","0");}
    if ($(this).parent().next().length > 0){$(this).css("border-bottom","0");}
  });
}

/*-jsfct1word-hasClass-*/
function hasClass( elem, cls ) {
  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}

/*JSON_TREE*/
var jsonlint=function(){var a=!0,b=!1,c={},d=function(){var a={trace:function(){},yy:{},symbols_:{error:2,JSONString:3,STRING:4,JSONNumber:5,NUMBER:6,JSONNullLiteral:7,NULL:8,JSONBooleanLiteral:9,TRUE:10,FALSE:11,JSONText:12,JSONValue:13,EOF:14,JSONObject:15,JSONArray:16,"{":17,"}":18,JSONMemberList:19,JSONMember:20,":":21,",":22,"[":23,"]":24,JSONElementList:25,$accept:0,$end:1},terminals_:{2:"error",4:"STRING",6:"NUMBER",8:"NULL",10:"TRUE",11:"FALSE",14:"EOF",17:"{",18:"}",21:":",22:",",23:"[",24:"]"},productions_:[0,[3,1],[5,1],[7,1],[9,1],[9,1],[12,2],[13,1],[13,1],[13,1],[13,1],[13,1],[13,1],[15,2],[15,3],[20,3],[19,1],[19,3],[16,2],[16,3],[25,1],[25,3]],performAction:function(b,c,d,e,f,g,h){var i=g.length-1;switch(f){case 1:this.$=b.replace(/\\(\\|")/g,"$1").replace(/\\n/g,"\n").replace(/\\r/g,"\r").replace(/\\t/g," ").replace(/\\v/g,"").replace(/\\f/g,"\f").replace(/\\b/g,"\b");break;case 2:this.$=Number(b);break;case 3:this.$=null;break;case 4:this.$=!0;break;case 5:this.$=!1;break;case 6:return this.$=g[i-1];case 13:this.$={};break;case 14:this.$=g[i-1];break;case 15:this.$=[g[i-2],g[i]];break;case 16:this.$={},this.$[g[i][0]]=g[i][1];break;case 17:this.$=g[i-2],g[i-2][g[i][0]]=g[i][1];break;case 18:this.$=[];break;case 19:this.$=g[i-1];break;case 20:this.$=[g[i]];break;case 21:this.$=g[i-2],g[i-2].push(g[i])}},table:[{3:5,4:[1,12],5:6,6:[1,13],7:3,8:[1,9],9:4,10:[1,10],11:[1,11],12:1,13:2,15:7,16:8,17:[1,14],23:[1,15]},{1:[3]},{14:[1,16]},{14:[2,7],18:[2,7],22:[2,7],24:[2,7]},{14:[2,8],18:[2,8],22:[2,8],24:[2,8]},{14:[2,9],18:[2,9],22:[2,9],24:[2,9]},{14:[2,10],18:[2,10],22:[2,10],24:[2,10]},{14:[2,11],18:[2,11],22:[2,11],24:[2,11]},{14:[2,12],18:[2,12],22:[2,12],24:[2,12]},{14:[2,3],18:[2,3],22:[2,3],24:[2,3]},{14:[2,4],18:[2,4],22:[2,4],24:[2,4]},{14:[2,5],18:[2,5],22:[2,5],24:[2,5]},{14:[2,1],18:[2,1],21:[2,1],22:[2,1],24:[2,1]},{14:[2,2],18:[2,2],22:[2,2],24:[2,2]},{3:20,4:[1,12],18:[1,17],19:18,20:19},{3:5,4:[1,12],5:6,6:[1,13],7:3,8:[1,9],9:4,10:[1,10],11:[1,11],13:23,15:7,16:8,17:[1,14],23:[1,15],24:[1,21],25:22},{1:[2,6]},{14:[2,13],18:[2,13],22:[2,13],24:[2,13]},{18:[1,24],22:[1,25]},{18:[2,16],22:[2,16]},{21:[1,26]},{14:[2,18],18:[2,18],22:[2,18],24:[2,18]},{22:[1,28],24:[1,27]},{22:[2,20],24:[2,20]},{14:[2,14],18:[2,14],22:[2,14],24:[2,14]},{3:20,4:[1,12],20:29},{3:5,4:[1,12],5:6,6:[1,13],7:3,8:[1,9],9:4,10:[1,10],11:[1,11],13:30,15:7,16:8,17:[1,14],23:[1,15]},{14:[2,19],18:[2,19],22:[2,19],24:[2,19]},{3:5,4:[1,12],5:6,6:[1,13],7:3,8:[1,9],9:4,10:[1,10],11:[1,11],13:31,15:7,16:8,17:[1,14],23:[1,15]},{18:[2,17],22:[2,17]},{18:[2,15],22:[2,15]},{22:[2,21],24:[2,21]}],defaultActions:{16:[2,6]},parseError:function(b,c){throw new Error(b)},parse:function(b){function o(a){d.length=d.length-2*a,e.length=e.length-a,f.length=f.length-a}function p(){var a;return a=c.lexer.lex()||1,typeof a!="number"&&(a=c.symbols_[a]||a),a}var c=this,d=[0],e=[null],f=[],g=this.table,h="",i=0,j=0,k=0,l=2,m=1;this.lexer.setInput(b),this.lexer.yy=this.yy,this.yy.lexer=this.lexer,typeof this.lexer.yylloc=="undefined"&&(this.lexer.yylloc={});var n=this.lexer.yylloc;f.push(n),typeof this.yy.parseError=="function"&&(this.parseError=this.yy.parseError);var q,r,s,t,u,v,w={},x,y,z,A;for(;;){s=d[d.length-1],this.defaultActions[s]?t=this.defaultActions[s]:(q==null&&(q=p()),t=g[s]&&g[s][q]);if(typeof t=="undefined"||!t.length||!t[0]){if(!k){A=[];for(x in g[s])this.terminals_[x]&&x>2&&A.push("'"+this.terminals_[x]+"'");var B="";this.lexer.showPosition?B="Parse error on line "+(i+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+A.join(", ")+", got '"+this.terminals_[q]+"'":B="Parse error on line "+(i+1)+": Unexpected "+(q==1?"end of input":"'"+(this.terminals_[q]||q)+"'"),this.parseError(B,{text:this.lexer.match,token:this.terminals_[q]||q,line:this.lexer.yylineno,loc:n,expected:A})}if(k==3){if(q==m)throw new Error(B||"Parsing halted.");j=this.lexer.yyleng,h=this.lexer.yytext,i=this.lexer.yylineno,n=this.lexer.yylloc,q=p()}for(;;){if(l.toString()in g[s])break;if(s==0)throw new Error(B||"Parsing halted.");o(1),s=d[d.length-1]}r=q,q=l,s=d[d.length-1],t=g[s]&&g[s][l],k=3}if(t[0]instanceof Array&&t.length>1)throw new Error("Parse Error: multiple actions possible at state: "+s+", token: "+q);switch(t[0]){case 1:d.push(q),e.push(this.lexer.yytext),f.push(this.lexer.yylloc),d.push(t[1]),q=null,r?(q=r,r=null):(j=this.lexer.yyleng,h=this.lexer.yytext,i=this.lexer.yylineno,n=this.lexer.yylloc,k>0&&k--);break;case 2:y=this.productions_[t[1]][1],w.$=e[e.length-y],w._$={first_line:f[f.length-(y||1)].first_line,last_line:f[f.length-1].last_line,first_column:f[f.length-(y||1)].first_column,last_column:f[f.length-1].last_column},v=this.performAction.call(w,h,j,i,this.yy,t[1],e,f);if(typeof v!="undefined")return v;y&&(d=d.slice(0,-1*y*2),e=e.slice(0,-1*y),f=f.slice(0,-1*y)),d.push(this.productions_[t[1]][0]),e.push(w.$),f.push(w._$),z=g[d[d.length-2]][d[d.length-1]],d.push(z);break;case 3:return!0}}return!0}},b=function(){var a={EOF:1,parseError:function(b,c){if(!this.yy.parseError)throw new Error(b);this.yy.parseError(b,c)},setInput:function(a){return this._input=a,this._more=this._less=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this},input:function(){var a=this._input[0];this.yytext+=a,this.yyleng++,this.match+=a,this.matched+=a;var b=a.match(/\n/);return b&&this.yylineno++,this._input=this._input.slice(1),a},unput:function(a){return this._input=a+this._input,this},more:function(){return this._more=!0,this},less:function(a){this._input=this.match.slice(a)+this._input},pastInput:function(){var a=this.matched.substr(0,this.matched.length-this.match.length);return(a.length>20?"...":"")+a.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var a=this.match;return a.length<20&&(a+=this._input.substr(0,20-a.length)),(a.substr(0,20)+(a.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var a=this.pastInput(),b=(new Array(a.length+1)).join("-");return a+this.upcomingInput()+"\n"+b+"^"},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var a,b,c,d,e,f;this._more||(this.yytext="",this.match="");var g=this._currentRules();for(var h=0;h<g.length;h++){c=this._input.match(this.rules[g[h]]);if(c&&(!b||c[0].length>b[0].length)){b=c,d=h;if(!this.options.flex)break}}if(b){f=b[0].match(/\n.*/g),f&&(this.yylineno+=f.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:f?f[f.length-1].length-1:this.yylloc.last_column+b[0].length},this.yytext+=b[0],this.match+=b[0],this.yyleng=this.yytext.length,this._more=!1,this._input=this._input.slice(b[0].length),this.matched+=b[0],a=this.performAction.call(this,this.yy,this,g[d],this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1);if(a)return a;return}if(this._input==="")return this.EOF;this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var b=this.next();return typeof b!="undefined"?b:this.lex()},begin:function(b){this.conditionStack.push(b)},popState:function(){return this.conditionStack.pop()},_currentRules:function(){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules},topState:function(){return this.conditionStack[this.conditionStack.length-2]},pushState:function(b){this.begin(b)}};return a.options={},a.performAction=function(b,c,d,e){var f=e;switch(d){case 0:break;case 1:return 6;case 2:return c.yytext=c.yytext.substr(1,c.yyleng-2),4;case 3:return 17;case 4:return 18;case 5:return 23;case 6:return 24;case 7:return 22;case 8:return 21;case 9:return 10;case 10:return 11;case 11:return 8;case 12:return 14;case 13:return"INVALID"}},a.rules=[/^(?:\s+)/,/^(?:(-?([0-9]|[1-9][0-9]+))(\.[0-9]+)?([eE][-+]?[0-9]+)?\b)/,/^(?:"(?:\\[\\"bfnrt/]|\\u[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*")/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:,)/,/^(?::)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:null\b)/,/^(?:$)/,/^(?:.)/],a.conditions={INITIAL:{rules:[0,1,2,3,4,5,6,7,8,9,10,11,12,13],inclusive:!0}},a}();return a.lexer=b,a}();return typeof a!="undefined"&&typeof c!="undefined"&&(c.parser=d,c.parse=function(){return d.parse.apply(d,arguments)},c.main=function(d){if(!d[1])throw new Error("Usage: "+d[0]+" FILE");if(typeof process!="undefined")var e=a("fs").readFileSync(a("path").join(process.cwd(),d[1]),"utf8");else var f=a("file").path(a("file").cwd()),e=f.join(d[1]).read({charset:"utf-8"});return c.parser.parse(e)},typeof b!="undefined"&&a.main===b&&c.main(typeof process!="undefined"?process.argv.slice(1):a("system").args)),c}();
var ExpandImage4JF = 'data:image/gif;base64,R0lGODlhHAALAMQAAP////7++/z8/Pb29fb18PHx7e/w6/Hw6e3s5unp4+Dg3t3a0djY0dnVy9fTxNbQxtLMv8zJurDC1L+9sMK4p32buAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEHABcALAAAAAAcAAsAAAVL4CWOZGmel1StbCWhsFgBdA1UMVwJQd8TuNypMigWD4qgsFQhWJ7PhXI5qhQKCERC0ZhSLxUFo+FwQCJeagUyobjd6aWqtXp979QQADs=';
var CollapseImage4JF = 'data:image/gif;base64,R0lGODlhHAALAMQAAP////7++/z8/Pb29fb18PHx7e/w6/Hw6e3s5unp4+jm2ODg3t3a0dnVy9bQxtLMv8zJurDC1L+9sMK4p32buDMzMwAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEHABcALAAAAAAcAAsAAAVU4CWOZGmeV0StLBWhsEgBdA1QMUwJvMUTuNyJMihaBodFUFiiECxQKGMpqlSq14uVRCkUEJbEokHVZrdmrqLRsDgekDLzQoFIJni8nKlqrV5zgYIhADs=';
window.SINGLE_TAB="  ";window.ImgCollapsed=CollapseImage4JF;window.ImgExpanded=ExpandImage4JF;window.QuoteKeys=true;function $id(a){return document.getElementById(a)}function IsArray(a){return a&&typeof a==="object"&&typeof a.length==="number"&&!(a.propertyIsEnumerable("length"))}function Process(str){SetTab();window.IsCollapsible=true;var a=str;if(!a)a="";var b="";try{if(a==""){a='""'}var c=jsonlint.parse(a);if(c){var d=eval("["+a+"]");b=ProcessObject(d[0],0,false,false,false);$id("Canvas").innerHTML="<PRE class='CodeContainer'>"+b+"</PRE>"}}catch(e){$id("Canvas").innerHTML="<PRE class='fail'>"+e+"</PRE>"}}window._dateObj=new Date();window._regexpObj=new RegExp();function ProcessObject(g,c,d,k,l){var h="";var p=(d)?"<span class='Comma'>,</span> ":"";var m=typeof g;var o="";if(IsArray(g)){if(g.length==0){h+=GetRow(c,"<span class='ArrayBrace'>[ ]</span>"+p,l)}else{o=window.IsCollapsible?'<span><img src="'+window.ImgExpanded+'" onClick="ExpImgClicked(this)" /></span><span class=\'collapsible\'>':"";h+=GetRow(c,"<span class='ArrayBrace'>[</span>"+o,l);for(var f=0;f<g.length;f++){h+=ProcessObject(g[f],c+1,f<(g.length-1),true,false)}o=window.IsCollapsible?"</span>":"";h+=GetRow(c,o+"<span class='ArrayBrace'>]</span>"+p)}}else{if(m=="object"){if(g==null){h+=FormatLiteral("null","",p,c,k,"Null")}else{if(g.constructor==window._dateObj.constructor){h+=FormatLiteral("new Date("+g.getTime()+") /*"+g.toLocaleString()+"*/","",p,c,k,"Date")}else{if(g.constructor==window._regexpObj.constructor){h+=FormatLiteral("new RegExp("+g+")","",p,c,k,"RegExp")}else{var n=0;for(var b in g){n++}if(n==0){h+=GetRow(c,"<span class='ObjectBrace'>{ }</span>"+p,l)}else{o=window.IsCollapsible?'<span><img src="'+window.ImgExpanded+'" onClick="ExpImgClicked(this)" /></span><span class=\'collapsible\'>':"";h+=GetRow(c,"<span class='ObjectBrace'>{</span>"+o,l);var e=0;for(var b in g){var a=window.QuoteKeys?'"':"";h+=GetRow(c+1,"<span class='PropertyName'>"+a+b+a+"</span>: "+ProcessObject(g[b],c+1,++e<n,false,true))}o=window.IsCollapsible?"</span>":"";h+=GetRow(c,o+"<span class='ObjectBrace'>}</span>"+p)}}}}}else{if(m=="number"){h+=FormatLiteral(g,"",p,c,k,"Number")}else{if(m=="boolean"){h+=FormatLiteral(g,"",p,c,k,"Boolean")}else{if(m=="function"){if(g.constructor==window._regexpObj.constructor){h+=FormatLiteral("new RegExp("+g+")","",p,c,k,"RegExp")}else{g=FormatFunction(c,g);h+=FormatLiteral(g,"",p,c,k,"Function")}}else{if(m=="undefined"){h+=FormatLiteral("undefined","",p,c,k,"Null")}else{h+=FormatLiteral(g.toString().split("\\").join("\\\\").split('"').join('\\"'),'"',p,c,k,"String")}}}}}}return h}function FormatLiteral(f,d,b,a,c,e){if(typeof f=="string"){f=f.split("<").join("&lt;").split(">").join("&gt;")}var g="<span class='"+e+"'>"+d+f+d+b+"</span>";if(c){g=GetRow(a,g)}return g}function FormatFunction(a,d){var c="";for(var b=0;b<a;b++){c+=window.TAB}var f=d.toString().split("\n");var e="";for(var b=0;b<f.length;b++){e+=((b==0)?"":c)+f[b]+"\n"}return e}function GetRow(a,d,e){var c="";for(var b=0;b<a&&!e;b++){c+=window.TAB}if(d!=null&&d.length>0&&d.charAt(d.length-1)!="\n"){d=d+"\n"}return c+d}function CollapsibleViewClicked(){$id("CollapsibleViewDetail").style.visibility=$id("CollapsibleView").checked?"visible":"hidden";Process()}function QuoteKeysClicked(){window.QuoteKeys=$id("QuoteKeys").checked;Process()}function CollapseAllClicked(){EnsureIsPopulated();TraverseChildren($id("Canvas"),function(a){if(a.className=="collapsible"){MakeContentVisible(a,false)}},0)}function ExpandAllClicked(){EnsureIsPopulated();TraverseChildren($id("Canvas"),function(a){if(a.className=="collapsible"){MakeContentVisible(a,true)}},0)}function MakeContentVisible(b,c){var a=b.previousSibling.firstChild;if(!!a.tagName&&a.tagName.toLowerCase()=="img"){b.style.display=c?"inline":"none";b.previousSibling.firstChild.src=c?window.ImgExpanded:window.ImgCollapsed}}function TraverseChildren(b,c,d){for(var a=0;a<b.childNodes.length;a++){TraverseChildren(b.childNodes[a],c,d+1)}c(b,d)}function ExpImgClicked(c){var a=c.parentNode.nextSibling;if(!a){return}var b="none";var d=window.ImgCollapsed;if(a.style.display=="none"){b="inline";d=window.ImgExpanded}a.style.display=b;c.src=d}function CollapseLevel(a){EnsureIsPopulated();TraverseChildren($id("Canvas"),function(b,c){if(b.className=="collapsible"){if(c>=a){MakeContentVisible(b,false)}else{MakeContentVisible(b,true)}}},0)}function TabSizeChanged(){Process()}function SetTab(){var a=$id("TabSize");window.TAB=MultiplyString(parseInt("1"),window.SINGLE_TAB)}function EnsureIsPopulated(){if(!$id("Canvas").innerHTML&&!!$id("RawJson").value){Process()}}function MultiplyString(a,c){var d=[];for(var b=0;b<a;b++){d.push(c)}return d.join("")}function SelectAllClicked(){if(!!document.selection&&!!document.selection.empty){document.selection.empty()}else{if(window.getSelection){var b=window.getSelection();if(b.removeAllRanges){window.getSelection().removeAllRanges()}}}var a=(!!document.body&&!!document.body.createTextRange)?document.body.createTextRange():document.createRange();if(!!a.selectNode){a.selectNode($id("Canvas"))}else{if(a.moveToElementText){a.moveToElementText($id("Canvas"))}}if(!!a.select){a.select($id("Canvas"))}else{window.getSelection().addRange(a)}}function LinkToJson(){var a=$id("RawJson").value;a=escape(a.split("/n").join(" ").split("/r").join(" "));$id("InvisibleLinkUrl").value=a;$id("InvisibleLink").submit()};
/* Inside : $("#Canvas") */
/* Process(JSON.stringify(json)) */
