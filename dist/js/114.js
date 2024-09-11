"use strict";(self["webpackChunkmyzola_admin"]=self["webpackChunkmyzola_admin"]||[]).push([[114],{1114:function(e,t,n){n.d(t,{FN:function(){return w},Vx:function(){return y},dK:function(){return _},q7:function(){return A}});n(4114);var a=n(6768),i=n(144);
/**
 * Vue 3 Carousel 0.3.3
 * (c) 2024
 * @license MIT
 */
const l={itemsToShow:1,itemsToScroll:1,modelValue:0,transition:300,autoplay:0,snapAlign:"center",wrapAround:!1,throttle:16,pauseAutoplayOnHover:!1,mouseDrag:!0,touchDrag:!0,dir:"ltr",breakpoints:void 0,i18n:{ariaNextSlide:"Navigate to next slide",ariaPreviousSlide:"Navigate to previous slide",ariaNavigateToSlide:"Navigate to slide {slideNumber}",ariaGallery:"Gallery",itemXofY:"Item {currentSlide} of {slidesCount}",iconArrowUp:"Arrow pointing upwards",iconArrowDown:"Arrow pointing downwards",iconArrowRight:"Arrow pointing to the right",iconArrowLeft:"Arrow pointing to the left"}},o={itemsToShow:{default:l.itemsToShow,type:Number},itemsToScroll:{default:l.itemsToScroll,type:Number},wrapAround:{default:l.wrapAround,type:Boolean},throttle:{default:l.throttle,type:Number},snapAlign:{default:l.snapAlign,validator(e){return["start","end","center","center-even","center-odd"].includes(e)}},transition:{default:l.transition,type:Number},breakpoints:{default:l.breakpoints,type:Object},autoplay:{default:l.autoplay,type:Number},pauseAutoplayOnHover:{default:l.pauseAutoplayOnHover,type:Boolean},modelValue:{default:void 0,type:Number},mouseDrag:{default:l.mouseDrag,type:Boolean},touchDrag:{default:l.touchDrag,type:Boolean},dir:{default:l.dir,validator(e){return["rtl","ltr"].includes(e)}},i18n:{default:l.i18n,type:Object},settings:{default(){return{}},type:Object}};function r({config:e,slidesCount:t}){const{snapAlign:n,wrapAround:a,itemsToShow:i=1}=e;if(a)return Math.max(t-1,0);let l;switch(n){case"start":l=t-i;break;case"end":l=t-1;break;case"center":case"center-odd":l=t-Math.ceil((i-.5)/2);break;case"center-even":l=t-Math.ceil(i/2);break;default:l=0;break}return Math.max(l,0)}function u({config:e,slidesCount:t}){const{wrapAround:n,snapAlign:a,itemsToShow:i=1}=e;let l=0;if(n||i>t)return l;switch(a){case"start":l=0;break;case"end":l=i-1;break;case"center":case"center-odd":l=Math.floor((i-1)/2);break;case"center-even":l=Math.floor((i-2)/2);break;default:l=0;break}return l}function s({val:e,max:t,min:n}){return t<n?e:Math.min(Math.max(e,n),t)}function c({config:e,currentSlide:t,slidesCount:n}){const{snapAlign:a,wrapAround:i,itemsToShow:l=1}=e;let o=t;switch(a){case"center":case"center-odd":o-=(l-1)/2;break;case"center-even":o-=(l-2)/2;break;case"end":o-=l-1;break}return i?o:s({val:o,max:n-l,min:0})}function d(e){return e?e.reduce(((e,t)=>{var n;return t.type===a.FK?[...e,...d(t.children)]:"CarouselSlide"===(null===(n=t.type)||void 0===n?void 0:n.name)?[...e,t]:e}),[]):[]}function v({val:e,max:t,min:n=0}){return e>t?v({val:e-(t+1),max:t,min:n}):e<n?v({val:e+(t+1),max:t,min:n}):e}function p(e,t){let n;return t?function(...a){const i=this;n||(e.apply(i,a),n=!0,setTimeout((()=>n=!1),t))}:e}function m(e,t){let n;return function(...a){n&&clearTimeout(n),n=setTimeout((()=>{e(...a),n=null}),t)}}function h(e="",t={}){return Object.entries(t).reduce(((e,[t,n])=>e.replace(`{${t}}`,String(n))),e)}var f,g=(0,a.pM)({name:"ARIA",setup(){const e=(0,a.WQ)("config",(0,i.Kh)(Object.assign({},l))),t=(0,a.WQ)("currentSlide",(0,i.KR)(0)),n=(0,a.WQ)("slidesCount",(0,i.KR)(0));return()=>(0,a.h)("div",{class:["carousel__liveregion","carousel__sr-only"],"aria-live":"polite","aria-atomic":"true"},h(e.i18n["itemXofY"],{currentSlide:t.value+1,slidesCount:n.value}))}}),w=(0,a.pM)({name:"Carousel",props:o,setup(e,{slots:t,emit:n,expose:h}){var f;const w=(0,i.KR)(null),b=(0,i.KR)([]),x=(0,i.KR)(0),S=(0,i.KR)(0),y=(0,i.Kh)(Object.assign({},l));let _,A=Object.assign({},l);const k=(0,i.KR)(null!==(f=e.modelValue)&&void 0!==f?f:0),C=(0,i.KR)(0),T=(0,i.KR)(0),K=(0,i.KR)(0),R=(0,i.KR)(0);let O,W;function M(){_=Object.assign({},e.breakpoints),A=Object.assign(Object.assign(Object.assign({},A),e),{i18n:Object.assign(Object.assign({},A.i18n),e.i18n),breakpoints:void 0}),E(A)}function j(){if(!_||!Object.keys(_).length)return;const e=Object.keys(_).map((e=>Number(e))).sort(((e,t)=>+t-+e));let t=Object.assign({},A);e.some((e=>{const n=window.matchMedia(`(min-width: ${e}px)`).matches;return n&&(t=Object.assign(Object.assign({},t),_[e])),n})),E(t)}function E(e){Object.entries(e).forEach((([e,t])=>y[e]=t))}(0,a.Gt)("config",y),(0,a.Gt)("slidesCount",S),(0,a.Gt)("currentSlide",k),(0,a.Gt)("maxSlide",K),(0,a.Gt)("minSlide",R),(0,a.Gt)("slideWidth",x);const L=m((()=>{j(),Q(),N()}),16);function N(){if(!w.value)return;const e=w.value.getBoundingClientRect();x.value=e.width/y.itemsToShow}function Q(){S.value<=0||(T.value=Math.ceil((S.value-1)/2),K.value=r({config:y,slidesCount:S.value}),R.value=u({config:y,slidesCount:S.value}),y.wrapAround||(k.value=s({val:k.value,max:K.value,min:R.value})))}(0,a.sV)((()=>{(0,a.dY)((()=>N())),setTimeout((()=>N()),1e3),j(),H(),window.addEventListener("resize",L,{passive:!0}),n("init")})),(0,a.hi)((()=>{W&&clearTimeout(W),O&&clearInterval(O),window.removeEventListener("resize",L,{passive:!0})}));let D=!1;const I={x:0,y:0},G={x:0,y:0},B=(0,i.Kh)({x:0,y:0}),V=(0,i.KR)(!1),z=(0,i.KR)(!1),X=()=>{V.value=!0},$=()=>{V.value=!1};function Y(e){["INPUT","TEXTAREA","SELECT"].includes(e.target.tagName)||(D="touchstart"===e.type,D||e.preventDefault(),!D&&0!==e.button||q.value||(I.x=D?e.touches[0].clientX:e.clientX,I.y=D?e.touches[0].clientY:e.clientY,document.addEventListener(D?"touchmove":"mousemove",U,!0),document.addEventListener(D?"touchend":"mouseup",P,!0)))}const U=p((e=>{z.value=!0,G.x=D?e.touches[0].clientX:e.clientX,G.y=D?e.touches[0].clientY:e.clientY;const t=G.x-I.x,n=G.y-I.y;B.y=n,B.x=t}),y.throttle);function P(){const e="rtl"===y.dir?-1:1,t=.4*Math.sign(B.x),n=Math.round(B.x/x.value+t)*e;if(n&&!D){const e=t=>{window.removeEventListener("click",e,!0)};window.addEventListener("click",e,!0)}J(k.value-n),B.x=0,B.y=0,z.value=!1,document.removeEventListener(D?"touchmove":"mousemove",U,!0),document.removeEventListener(D?"touchend":"mouseup",P,!0)}function H(){!y.autoplay||y.autoplay<=0||(O=setInterval((()=>{y.pauseAutoplayOnHover&&V.value||Z()}),y.autoplay))}function F(){O&&(clearInterval(O),O=null),H()}const q=(0,i.KR)(!1);function J(e){const t=y.wrapAround?e:s({val:e,max:K.value,min:R.value});k.value===t||q.value||(n("slide-start",{slidingToIndex:e,currentSlideIndex:k.value,prevSlideIndex:C.value,slidesCount:S.value}),q.value=!0,C.value=k.value,k.value=t,W=setTimeout((()=>{if(y.wrapAround){const a=v({val:t,max:K.value,min:0});a!==k.value&&(k.value=a,n("loop",{currentSlideIndex:k.value,slidingToIndex:e}))}n("update:modelValue",k.value),n("slide-end",{currentSlideIndex:k.value,prevSlideIndex:C.value,slidesCount:S.value}),q.value=!1,F()}),y.transition))}function Z(){J(k.value+y.itemsToScroll)}function ee(){J(k.value-y.itemsToScroll)}const te={slideTo:J,next:Z,prev:ee};(0,a.Gt)("nav",te),(0,a.Gt)("isSliding",q);const ne=(0,a.EW)((()=>c({config:y,currentSlide:k.value,slidesCount:S.value})));(0,a.Gt)("slidesToScroll",ne);const ae=(0,a.EW)((()=>{const e="rtl"===y.dir?-1:1,t=ne.value*x.value*e;return{transform:`translateX(${B.x-t}px)`,transition:`${q.value?y.transition:0}ms`,margin:y.wrapAround?`0 -${S.value*x.value}px`:"",width:"100%"}}));function ie(){M(),j(),Q(),N(),F()}Object.keys(o).forEach((t=>{["modelValue"].includes(t)||(0,a.wB)((()=>e[t]),ie)})),(0,a.wB)((()=>e["modelValue"]),(e=>{e!==k.value&&J(Number(e))})),(0,a.wB)(S,Q),n("before-init"),M();const le={config:y,slidesCount:S,slideWidth:x,next:Z,prev:ee,slideTo:J,currentSlide:k,maxSlide:K,minSlide:R,middleSlide:T};h({updateBreakpointsConfigs:j,updateSlidesData:Q,updateSlideWidth:N,initDefaultConfigs:M,restartCarousel:ie,slideTo:J,next:Z,prev:ee,nav:te,data:le});const oe=t.default||t.slides,re=t.addons,ue=(0,i.Kh)(le);return()=>{const e=d(null===oe||void 0===oe?void 0:oe(ue)),t=(null===re||void 0===re?void 0:re(ue))||[];e.forEach(((e,t)=>e.props.index=t));let n=e;if(y.wrapAround){const t=e.map(((t,n)=>(0,a.E3)(t,{index:-e.length+n,isClone:!0,key:`clone-before-${n}`}))),i=e.map(((t,n)=>(0,a.E3)(t,{index:e.length+n,isClone:!0,key:`clone-after-${n}`})));n=[...t,...e,...i]}b.value=e,S.value=Math.max(e.length,1);const i=(0,a.h)("ol",{class:"carousel__track",style:ae.value,onMousedownCapture:y.mouseDrag?Y:null,onTouchstartPassiveCapture:y.touchDrag?Y:null},n),l=(0,a.h)("div",{class:"carousel__viewport"},i);return(0,a.h)("section",{ref:w,class:{carousel:!0,"is-sliding":q.value,"is-dragging":z.value,"is-hover":V.value,"carousel--rtl":"rtl"===y.dir},dir:y.dir,"aria-label":y.i18n["ariaGallery"],tabindex:"0",onMouseenter:X,onMouseleave:$},[l,t,(0,a.h)(g)])}}});(function(e){e["arrowUp"]="arrowUp",e["arrowDown"]="arrowDown",e["arrowRight"]="arrowRight",e["arrowLeft"]="arrowLeft"})(f||(f={}));const b={arrowUp:"M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z",arrowDown:"M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",arrowRight:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",arrowLeft:"M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"};function x(e){return e in f}const S=e=>{const t=(0,a.WQ)("config",(0,i.Kh)(Object.assign({},l))),n=String(e.name),o=`icon${n.charAt(0).toUpperCase()+n.slice(1)}`;if(!n||"string"!==typeof n||!x(n))return;const r=b[n],u=(0,a.h)("path",{d:r}),s=t.i18n[o]||e.title||n,c=(0,a.h)("title",s);return(0,a.h)("svg",{class:"carousel__icon",viewBox:"0 0 24 24",role:"img","aria-label":s},[c,u])};S.props={name:String,title:String};const y=(e,{slots:t,attrs:n})=>{const{next:o,prev:r}=t||{},u=(0,a.WQ)("config",(0,i.Kh)(Object.assign({},l))),s=(0,a.WQ)("maxSlide",(0,i.KR)(1)),c=(0,a.WQ)("minSlide",(0,i.KR)(1)),d=(0,a.WQ)("currentSlide",(0,i.KR)(1)),v=(0,a.WQ)("nav",{}),{dir:p,wrapAround:m,i18n:h}=u,f="rtl"===p,g=(0,a.h)("button",{type:"button",class:["carousel__prev",!m&&d.value<=c.value&&"carousel__prev--disabled",null===n||void 0===n?void 0:n.class],"aria-label":h["ariaPreviousSlide"],onClick:v.prev},(null===r||void 0===r?void 0:r())||(0,a.h)(S,{name:f?"arrowRight":"arrowLeft"})),w=(0,a.h)("button",{type:"button",class:["carousel__next",!m&&d.value>=s.value&&"carousel__next--disabled",null===n||void 0===n?void 0:n.class],"aria-label":h["ariaNextSlide"],onClick:v.next},(null===o||void 0===o?void 0:o())||(0,a.h)(S,{name:f?"arrowLeft":"arrowRight"}));return[g,w]},_=()=>{const e=(0,a.WQ)("config",(0,i.Kh)(Object.assign({},l))),t=(0,a.WQ)("maxSlide",(0,i.KR)(1)),n=(0,a.WQ)("minSlide",(0,i.KR)(1)),o=(0,a.WQ)("currentSlide",(0,i.KR)(1)),r=(0,a.WQ)("nav",{}),u=e=>v({val:o.value,max:t.value,min:0})===e,s=[];for(let i=n.value;i<t.value+1;i++){const t=(0,a.h)("button",{type:"button",class:{"carousel__pagination-button":!0,"carousel__pagination-button--active":u(i)},"aria-label":h(e.i18n["ariaNavigateToSlide"],{slideNumber:i+1}),onClick:()=>r.slideTo(i)}),n=(0,a.h)("li",{class:"carousel__pagination-item",key:i},t);s.push(n)}return(0,a.h)("ol",{class:"carousel__pagination"},s)};var A=(0,a.pM)({name:"CarouselSlide",props:{index:{type:Number,default:1},isClone:{type:Boolean,default:!1}},setup(e,{slots:t}){const n=(0,a.WQ)("config",(0,i.Kh)(Object.assign({},l))),o=(0,a.WQ)("currentSlide",(0,i.KR)(0)),r=(0,a.WQ)("slidesToScroll",(0,i.KR)(0)),u=(0,a.WQ)("isSliding",(0,i.KR)(!1)),s=(0,a.EW)((()=>e.index===o.value)),c=(0,a.EW)((()=>e.index===o.value-1)),d=(0,a.EW)((()=>e.index===o.value+1)),v=(0,a.EW)((()=>{const t=Math.floor(r.value),a=Math.ceil(r.value+n.itemsToShow-1);return e.index>=t&&e.index<=a}));return()=>{var i;return(0,a.h)("li",{style:{width:100/n.itemsToShow+"%"},class:{carousel__slide:!0,"carousel__slide--clone":e.isClone,"carousel__slide--visible":v.value,"carousel__slide--active":s.value,"carousel__slide--prev":c.value,"carousel__slide--next":d.value,"carousel__slide--sliding":u.value},"aria-hidden":!v.value},null===(i=t.default)||void 0===i?void 0:i.call(t,{isActive:s.value,isClone:e.isClone,isPrev:c.value,isNext:d.value,isSliding:u.value,isVisible:v.value}))}}})}}]);
//# sourceMappingURL=114.js.map