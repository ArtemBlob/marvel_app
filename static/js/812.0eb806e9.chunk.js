"use strict";(self.webpackChunkmarvel=self.webpackChunkmarvel||[]).push([[812],{9613:function(e,r,n){n.d(r,{Z:function(){return c}});var t=n.p+"static/media/error.42292aa12b6bc303ce99.gif",a=n(184),c=function(){return(0,a.jsx)("img",{style:{display:"block",width:"250px",height:"250px",objectFit:"contain",margin:"0 auto"},src:t,alt:"Error"})}},3480:function(e,r,n){n.r(r),n.d(r,{default:function(){return S}});var t=n(885),a=n(2791),c=n(4270),s=n(4304),i=n(2523),o=n.p+"static/media/mjolnir.61f31e1809f12183a524.png",l=n(184),u=function(e){var r=e.data,n=r.name,t=r.thumbnail,a=r.description,c=r.homepage,s=r.wiki,i={objectFit:"cover"};return"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"===t&&(i={objectFit:"contain"}),(0,l.jsxs)("div",{className:"randomchar__block",children:[(0,l.jsx)("img",{src:t,alt:"Random character",className:"randomchar__img",style:i}),(0,l.jsxs)("div",{className:"randomchar__info",children:[(0,l.jsx)("p",{className:"randomchar__name",children:n}),(0,l.jsx)("p",{className:"randomchar__descr",children:a}),(0,l.jsxs)("div",{className:"randomchar__btns",children:[(0,l.jsx)("a",{href:c,className:"button button__main",children:(0,l.jsx)("div",{className:"inner",children:"homepage"})}),(0,l.jsx)("a",{href:s,className:"button button__secondary",children:(0,l.jsx)("div",{className:"inner",children:"Wiki"})})]})]})]})},h=function(){var e=(0,a.useState)({}),r=(0,t.Z)(e,2),n=r[0],c=r[1],h=(0,s.Z)(),d=h.getCharacter,m=h.clearError,f=h.process,p=h.setProcess;(0,a.useEffect)((function(){x();var e=setInterval(x,6e4);return function(){clearInterval(e)}}),[]);var v=function(e){c(e)},x=function(){m();var e=Math.floor(400*Math.random()+1011e3);d(e).then(v).then((function(){return p("confirmed")}))};return(0,l.jsxs)("div",{className:"randomchar",children:[(0,i.Z)(f,u,n),(0,l.jsxs)("div",{className:"randomchar__static",children:[(0,l.jsxs)("p",{className:"randomchar__title",children:["Random character for today!",(0,l.jsx)("br",{}),"Do you want to get to know him better?"]}),(0,l.jsx)("p",{className:"randomchar__title",children:"Or choose another one"}),(0,l.jsx)("button",{onClick:x,className:"button button__main",children:(0,l.jsx)("div",{className:"inner",children:"try it"})}),(0,l.jsx)("img",{src:o,alt:"mjolnir",className:"randomchar__decoration"})]})]})},d=n(2982),m=n(3394),f=n(9613),p=function(e){var r=(0,a.useState)([]),n=(0,t.Z)(r,2),c=n[0],i=n[1],o=(0,a.useState)(!1),u=(0,t.Z)(o,2),h=u[0],p=u[1],v=(0,a.useState)(210),x=(0,t.Z)(v,2),_=x[0],j=x[1],b=(0,a.useState)(!1),g=(0,t.Z)(b,2),N=g[0],Z=g[1],k=(0,s.Z)(),w=k.getAllCharacters,y=k.process,C=k.setProcess;(0,a.useEffect)((function(){E(_,!0)}),[]);var E=function(e,r){p(!r),w(e).then(S).then((function(){return C("confirmed")}))},S=function(e){var r=!1;e.length<9&&(r=!0),i((function(r){return[].concat((0,d.Z)(r),(0,d.Z)(e))})),p(!1),j((function(e){return e+9})),Z(r)},F=(0,a.useRef)([]),T=function(e){F.current.forEach((function(e){return e.classList.remove("char__item_selected")})),F.current[e].classList.add("char__item_selected"),F.current[e].focus()};var P=(0,a.useMemo)((function(){return function(e,r,n){switch(e){case"waiting":return(0,l.jsx)(m.Z,{});case"loading":return n?(0,l.jsx)(r,{}):(0,l.jsx)(m.Z,{});case"confirmed":return(0,l.jsx)(r,{});case"error":return(0,l.jsx)(f.Z,{});default:throw new Error("Unexpected process state")}}(y,(function(){return function(r){var n=r.map((function(r,n){var t={objectFit:"cover"};return"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"===r.thumbnail&&(t={objectFit:"unset"}),(0,l.jsxs)("li",{className:"char__item",tabIndex:0,ref:function(e){return F.current[n]=e},onClick:function(){e.onCharSelected(r.id),T(n)},onKeyDown:function(t){" "!==t.key&&"Enter"!==t.key||(e.onCharSelected(r.id),T(n))},children:[(0,l.jsx)("img",{src:r.thumbnail,alt:r.name,style:t}),(0,l.jsx)("div",{className:"char__name",children:r.name})]})}));return(0,l.jsx)("ul",{className:"char__grid",children:n})}(c)}),h)}),[y]);return(0,l.jsxs)("div",{className:"char__list",children:[P,(0,l.jsx)("button",{className:"button button__main button__long",disabled:h,style:{display:N?"none":"block"},onClick:function(){return E(_)},children:(0,l.jsx)("div",{className:"inner",children:"load more"})})]})},v=function(e){var r=e.data,n=r.name,t=r.description,a=r.thumbnail,c=r.homepage,s=r.wiki,i=r.comics,o={objectFit:"cover"};return"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"===a&&(o={objectFit:"contain"}),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("div",{className:"char__basics",children:[(0,l.jsx)("img",{src:a,alt:n,style:o}),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{className:"char__info-name",children:n}),(0,l.jsxs)("div",{className:"char__btns",children:[(0,l.jsx)("a",{href:c,className:"button button__main",children:(0,l.jsx)("div",{className:"inner",children:"homepage"})}),(0,l.jsx)("a",{href:s,className:"button button__secondary",children:(0,l.jsx)("div",{className:"inner",children:"Wiki"})})]})]})]}),(0,l.jsx)("div",{className:"char__descr",children:t}),(0,l.jsx)("div",{className:"char__comics",children:"Comics:"}),(0,l.jsxs)("ul",{className:"char__comics-list",children:[i.length>0?null:"There is no comics with this character...",i.map((function(e,r){if(!(r>9))return(0,l.jsx)("li",{className:"char__comics-item",children:e.name},r)}))]})]})},x=function(e){var r=(0,a.useState)(null),n=(0,t.Z)(r,2),c=n[0],o=n[1],u=(0,s.Z)(),h=u.getCharacter,d=u.clearError,m=u.process,f=u.setProcess;(0,a.useEffect)((function(){p()}),[e.charId]);var p=function(){var r=e.charId;r&&(d(),h(r).then(x).then((function(){return f("confirmed")})))},x=function(e){o(e)};return(0,l.jsx)("div",{className:"char__info",children:(0,i.Z)(m,v,c)})},_=n(6864),j=n(7781),b=n(542),g=function(){var e=(0,a.useState)(null),r=(0,t.Z)(e,2),n=r[0],c=r[1],i=(0,s.Z)(),o=i.getCharacterByName,u=i.clearError,h=i.process,d=i.setProcess,m=function(e){c(e)},p="error"===h?(0,l.jsx)("div",{className:"char__search-critical-error",children:(0,l.jsx)(f.Z,{})}):null,v=n?n.length>0?(0,l.jsxs)("div",{className:"char__search-wrapper",children:[(0,l.jsxs)("div",{className:"char__search-success",children:["There is! Visit ",n[0].name," page?"]}),(0,l.jsx)(b.rU,{to:"/characters/".concat(n[0].id),className:"button button__secondary",children:(0,l.jsx)("div",{className:"inner",children:"To page"})})]}):(0,l.jsx)("div",{className:"char__search-error",children:"The character was not found. Check the name and try again"}):null;return(0,l.jsxs)("div",{className:"char__search-form",children:[(0,l.jsx)(_.J9,{initialValues:{charName:""},validationSchema:j.Ry({charName:j.Z_().required("This field is required")}),onSubmit:function(e){var r,n=e.charName;r=n,u(),o(r).then(m).then((function(){return d("confirmed")}))},children:(0,l.jsxs)(_.l0,{children:[" ",(0,l.jsx)("label",{className:"char__search-label",htmlFor:"charName",children:"Or find a character by name:"}),(0,l.jsxs)("div",{className:"char__search-wrapper",children:[(0,l.jsx)(_.gN,{id:"charName",name:"charName",type:"text",placeholder:"Enter name"}),(0,l.jsx)("button",{type:"submit",className:"button button__main",disabled:"loading"===h,children:(0,l.jsx)("div",{className:"inner",children:"find"})})]}),(0,l.jsx)(_.Bc,{component:"div",className:"char__search-error",name:"charName"})]})}),v,p]})},N=n(5671),Z=n(3144),k=n(136),w=n(7277),y=function(e){(0,k.Z)(n,e);var r=(0,w.Z)(n);function n(){var e;(0,N.Z)(this,n);for(var t=arguments.length,a=new Array(t),c=0;c<t;c++)a[c]=arguments[c];return(e=r.call.apply(r,[this].concat(a))).state={error:!1},e}return(0,Z.Z)(n,[{key:"componentDidCatch",value:function(e,r){console.log(e,r),this.setState({error:!0})}},{key:"render",value:function(){return this.state.render?(0,l.jsx)(f.Z,{}):this.props.children}}]),n}(a.Component),C=y,E=n.p+"static/media/vision.067d4ae1936d64a577ce.png",S=function(){var e=(0,a.useState)(null),r=(0,t.Z)(e,2),n=r[0],s=r[1];return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(c.q,{children:[(0,l.jsx)("meta",{name:"description",content:"Marvel information portal"}),(0,l.jsx)("title",{children:"Marvel information portal"})]}),(0,l.jsx)(C,{children:(0,l.jsx)(h,{})}),(0,l.jsxs)("div",{className:"char__content",children:[(0,l.jsx)(C,{children:(0,l.jsx)(p,{onCharSelected:function(e){s(e)}})}),(0,l.jsxs)("div",{children:[" ",(0,l.jsx)(C,{children:(0,l.jsx)(x,{charId:n})}),(0,l.jsx)(C,{children:(0,l.jsx)(g,{})})]})]}),(0,l.jsx)("img",{className:"bg-decoration",src:E,alt:"vision"})]})}},4304:function(e,r,n){n.d(r,{Z:function(){return i}});var t=n(4165),a=n(5861),c=n(885),s=n(2791),i=function(){var e=function(){var e=(0,s.useState)("waiting"),r=(0,c.Z)(e,2),n=r[0],i=r[1],o=(0,s.useCallback)(function(){var e=(0,a.Z)((0,t.Z)().mark((function e(r){var n,a,c,s,o,l=arguments;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=l.length>1&&void 0!==l[1]?l[1]:"GET",a=l.length>2&&void 0!==l[2]?l[2]:null,c=l.length>3&&void 0!==l[3]?l[3]:{"Content-Type":"aplication/json"},i("loading"),e.prev=4,e.next=7,fetch(r,{method:n,body:a,headers:c});case 7:if((s=e.sent).ok){e.next=10;break}throw new Error("Could not fetch ".concat(r,", status: ").concat(s.status));case 10:return e.next=12,s.json();case 12:return o=e.sent,e.abrupt("return",o);case 16:throw e.prev=16,e.t0=e.catch(4),i("error"),e.t0;case 20:case"end":return e.stop()}}),e,null,[[4,16]])})));return function(r){return e.apply(this,arguments)}}(),[]);return{request:o,clearError:(0,s.useCallback)((function(){i("loading")}),[]),process:n,setProcess:i}}(),r=e.request,n=e.clearError,i=e.process,o=e.setProcess,l="https://gateway.marvel.com:443/v1/public/",u="apikey=346cb8ad17bfaf962c6faf338c99e4b4",h=function(){var e=(0,a.Z)((0,t.Z)().mark((function e(){var n,a,c=arguments;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=c.length>0&&void 0!==c[0]?c[0]:210,e.next=3,r("".concat(l,"characters?limit=9&offset=").concat(n,"&").concat(u));case 3:return a=e.sent,e.abrupt("return",a.data.results.map(v));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),d=function(){var e=(0,a.Z)((0,t.Z)().mark((function e(n){var a;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r("".concat(l,"characters/").concat(n,"?").concat(u));case 2:return a=e.sent,e.abrupt("return",v(a.data.results[0]));case 4:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}(),m=function(){var e=(0,a.Z)((0,t.Z)().mark((function e(n){var a;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r("".concat(l,"characters?name=").concat(n,"&").concat(u));case 2:return a=e.sent,e.abrupt("return",a.data.results.map(v));case 4:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}(),f=function(){var e=(0,a.Z)((0,t.Z)().mark((function e(){var n,a,c=arguments;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=c.length>0&&void 0!==c[0]?c[0]:0,e.next=3,r("".concat(l,"comics?orderBy=issueNumber&limit=8&offset=").concat(n,"&").concat(u));case 3:return a=e.sent,e.abrupt("return",a.data.results.map(x));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),p=function(){var e=(0,a.Z)((0,t.Z)().mark((function e(n){var a;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r("".concat(l,"comics/").concat(n,"?").concat(u));case 2:return a=e.sent,e.abrupt("return",x(a.data.results[0]));case 4:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}(),v=function(e){return{id:e.id,name:e.name,description:e.description?"".concat(e.description.slice(0,210),"..."):"There is no description for this character",thumbnail:e.thumbnail.path+"."+e.thumbnail.extension,homepage:e.urls[0].url,wiki:e.urls[1].url,comics:e.comics.items}},x=function(e){var r;return{id:e.id,title:e.title,description:e.description||"There is no description",pageCount:e.pageCount?"".concat(e.pageCount," p."):"No information about the number of pages",thumbnail:e.thumbnail.path+"."+e.thumbnail.extension,language:(null===(r=e.textObjects[0])||void 0===r?void 0:r.language)||"en-us",price:e.prices[0].price?"".concat(e.prices[0].price,"$"):"not available"}};return{process:i,setProcess:o,getAllCharacters:h,getCharacter:d,clearError:n,getComic:p,getAllComics:f,getCharacterByName:m}}},2523:function(e,r,n){n.d(r,{Z:function(){return i}});var t=n(3394),a=n(184),c=function(){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("p",{className:"char__select",children:"Please select a character to see information"}),(0,a.jsxs)("div",{className:"skeleton",children:[(0,a.jsxs)("div",{className:"pulse skeleton__header",children:[(0,a.jsx)("div",{className:"pulse skeleton__circle"}),(0,a.jsx)("div",{className:"pulse skeleton__mini"})]}),(0,a.jsx)("div",{className:"pulse skeleton__block"}),(0,a.jsx)("div",{className:"pulse skeleton__block"}),(0,a.jsx)("div",{className:"pulse skeleton__block"})]})]})},s=n(9613),i=function(e,r,n){switch(e){case"waiting":return(0,a.jsx)(c,{});case"loading":return(0,a.jsx)(t.Z,{});case"confirmed":return(0,a.jsx)(r,{data:n});case"error":return(0,a.jsx)(s.Z,{});default:throw new Error("Unexpected process state")}}}}]);
//# sourceMappingURL=812.0eb806e9.chunk.js.map