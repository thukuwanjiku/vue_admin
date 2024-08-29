(function(){"use strict";var e={1751:function(e,n,a){var i=a(5130),t=a(6768);function r(e,n){const a=(0,t.g2)("router-view");return(0,t.uX)(),(0,t.Wv)(a)}var s=a(1241);const o={},l=(0,s.A)(o,[["render",r]]);var c=l,d=a(4458);(0,d.k)("/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});var u=a(438),p=a(3228),m=a(2885);a(4188);(0,i.Ef)(c).use(p.A).use(u.A).use(m.A).mount("#app")},438:function(e,n,a){a.d(n,{A:function(){return fe}});var i=a(1387),t=a(6768),r=a(4232),s=a(144),o=a(85),l=a.p+"img/default_user_avatar.png",c=a(782);const d={id:"header",class:"header fixed-top d-flex align-items-center"},u={class:"d-flex align-items-center justify-content-between"},p=(0,t.Lk)("img",{src:o,alt:""},null,-1),m=(0,t.Lk)("span",{class:"d-none d-lg-block"},"MyZola Admin",-1),h=(0,t.Lk)("i",{class:"bi bi-list toggle-sidebar-btn"},null,-1),f=(0,t.Lk)("div",{class:"search-bar"},[(0,t.Lk)("form",{class:"search-form d-flex align-items-center",method:"POST",action:"#"},[(0,t.Lk)("input",{type:"text",name:"query",placeholder:"Search",title:"Enter search keyword"}),(0,t.Lk)("button",{type:"submit",title:"Search"},[(0,t.Lk)("i",{class:"bi bi-search"})])])],-1),b={class:"header-nav ms-auto"},g={class:"d-flex align-items-center"},v=(0,t.Fv)('<li class="nav-item d-block d-lg-none"><a class="nav-link nav-icon search-bar-toggle" href="#"><i class="bi bi-search"></i></a></li><li class="nav-item dropdown"><a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-bell"></i><span class="badge bg-primary badge-number">4</span></a><ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications"><li class="dropdown-header"> You have 4 new notifications <a href="#"><span class="badge rounded-pill bg-primary p-2 ms-2">View all</span></a></li><li><hr class="dropdown-divider"></li><li class="notification-item"><i class="bi bi-exclamation-circle text-warning"></i><div><h4>Lorem Ipsum</h4><p>Quae dolorem earum veritatis oditseno</p><p>30 min. ago</p></div></li><li><hr class="dropdown-divider"></li><li class="notification-item"><i class="bi bi-x-circle text-danger"></i><div><h4>Atque rerum nesciunt</h4><p>Quae dolorem earum veritatis oditseno</p><p>1 hr. ago</p></div></li><li><hr class="dropdown-divider"></li><li class="notification-item"><i class="bi bi-check-circle text-success"></i><div><h4>Sit rerum fuga</h4><p>Quae dolorem earum veritatis oditseno</p><p>2 hrs. ago</p></div></li><li><hr class="dropdown-divider"></li><li class="notification-item"><i class="bi bi-info-circle text-primary"></i><div><h4>Dicta reprehenderit</h4><p>Quae dolorem earum veritatis oditseno</p><p>4 hrs. ago</p></div></li><li><hr class="dropdown-divider"></li><li class="dropdown-footer"><a href="#">Show all notifications</a></li></ul></li><li class="nav-item dropdown"><a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-chat-left-text"></i><span class="badge bg-success badge-number">3</span></a><ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages"><li class="dropdown-header"> You have 3 new messages <a href="#"><span class="badge rounded-pill bg-primary p-2 ms-2">View all</span></a></li><li><hr class="dropdown-divider"></li><li class="message-item"><a href="#"><img src="assets/img/messages-1.jpg" alt="" class="rounded-circle"><div><h4>Maria Hudson</h4><p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p><p>4 hrs. ago</p></div></a></li><li><hr class="dropdown-divider"></li><li class="message-item"><a href="#"><img src="assets/img/messages-2.jpg" alt="" class="rounded-circle"><div><h4>Anna Nelson</h4><p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p><p>6 hrs. ago</p></div></a></li><li><hr class="dropdown-divider"></li><li class="message-item"><a href="#"><img src="assets/img/messages-3.jpg" alt="" class="rounded-circle"><div><h4>David Muldon</h4><p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p><p>8 hrs. ago</p></div></a></li><li><hr class="dropdown-divider"></li><li class="dropdown-footer"><a href="#">Show all messages</a></li></ul></li>',3),k={class:"nav-item dropdown pe-3"},L={class:"nav-link nav-profile d-flex align-items-center pe-0",href:"#","data-bs-toggle":"dropdown"},w=(0,t.Lk)("img",{src:l,alt:"Profile",class:"rounded-circle"},null,-1),_={class:"d-none d-md-block dropdown-toggle ps-2"},y={class:"dropdown-menu dropdown-menu-end dropdown-menu-arrow profile"},E={class:"dropdown-header"},x=(0,t.Lk)("span",null,"Admin",-1),A=(0,t.Lk)("li",null,[(0,t.Lk)("hr",{class:"dropdown-divider"})],-1),C=(0,t.Lk)("li",null,[(0,t.Lk)("hr",{class:"dropdown-divider"})],-1),S=(0,t.Lk)("i",{class:"bi bi-box-arrow-right"},null,-1),O=(0,t.Lk)("span",null,"Sign Out",-1),T=[S,O];var N={__name:"AppHeader",setup(e){const n=(0,i.rd)(),a=(0,c.Pj)(),o=(0,t.EW)((()=>a.state.auth.user?a.state.auth.user.name.toString().split(" ")[0]:""));function l(){a.commit("auth/LOGOUT"),n.replace({name:"login"})}return(0,t.sV)((()=>{})),(e,n)=>{const i=(0,t.g2)("router-link");return(0,t.uX)(),(0,t.CE)("header",d,[(0,t.Lk)("div",u,[(0,t.bF)(i,{to:{name:"dashboard"},class:"logo d-flex align-items-center"},{default:(0,t.k6)((()=>[p,m])),_:1}),h]),f,(0,t.Lk)("nav",b,[(0,t.Lk)("ul",g,[v,(0,t.Lk)("li",k,[(0,t.Lk)("a",L,[w,(0,t.Lk)("span",_,(0,r.v_)(o.value||""),1)]),(0,t.Lk)("ul",y,[(0,t.Lk)("li",E,[(0,t.Lk)("h6",null,(0,r.v_)((0,s.R1)(a).state.auth.user?.name||""),1),x]),A,C,(0,t.Lk)("li",null,[(0,t.Lk)("a",{onClick:l,class:"dropdown-item d-flex align-items-center",href:"javascript:void"},T)])])])])])])}}};const P=N;var j=P;const F={id:"sidebar",class:"sidebar"},I={class:"sidebar-nav",id:"sidebar-nav"},M={class:"nav-item","data-bs-parent":"#sidebar-nav"},H=(0,t.Lk)("i",{class:"bi bi-grid"},null,-1),R=(0,t.Lk)("span",null,"Dashboard",-1),$={class:"nav-item"},D=(0,t.Lk)("a",{class:"nav-link collapsed","data-bs-target":"#explore-hub-nav","data-bs-toggle":"collapse",href:"#"},[(0,t.Lk)("i",{class:"bx bxs-map"}),(0,t.Lk)("span",null,"Explore Hub"),(0,t.Lk)("i",{class:"bi bi-chevron-down ms-auto"})],-1),X={id:"explore-hub-nav",class:"nav-content collapse","data-bs-parent":"#sidebar-nav"},q=(0,t.Lk)("i",{class:"bi bi-circle"},null,-1),W=(0,t.Lk)("span",null,"Companies",-1),z=(0,t.Lk)("i",{class:"bi bi-circle"},null,-1),G=(0,t.Lk)("span",null,"Categories",-1),U=(0,t.Lk)("li",null,[(0,t.Lk)("a",{href:"#"},[(0,t.Lk)("i",{class:"bi bi-circle"}),(0,t.Lk)("span",null,"Listings")])],-1),V=(0,t.Fv)('<li class="nav-item"><a class="nav-link collapsed" data-bs-target="#investment-hub-nav" data-bs-toggle="collapse" href="#"><i class="bx bx-dollar"></i><span>Investment Hub</span><i class="bi bi-chevron-down ms-auto"></i></a><ul id="investment-hub-nav" class="nav-content collapse" data-bs-parent="#sidebar-nav"><li><a href="#"><i class="bi bi-circle"></i><span>Companies</span></a></li><li><a href="#"><i class="bi bi-circle"></i><span>Categories</span></a></li><li><a href="#"><i class="bi bi-circle"></i><span>Listings</span></a></li></ul></li>',1);function B(e,n){const a=(0,t.g2)("router-link");return(0,t.uX)(),(0,t.CE)("aside",F,[(0,t.Lk)("ul",I,[(0,t.Lk)("li",M,[(0,t.bF)(a,{to:{name:"dashboard"},class:"nav-link collapsed"},{default:(0,t.k6)((()=>[H,R])),_:1})]),(0,t.Lk)("li",$,[D,(0,t.Lk)("ul",X,[(0,t.Lk)("li",null,[(0,t.bF)(a,{to:{name:"explore_hub.companies"}},{default:(0,t.k6)((()=>[q,W])),_:1})]),(0,t.Lk)("li",null,[(0,t.bF)(a,{to:{name:"explore_hub.categories"}},{default:(0,t.k6)((()=>[z,G])),_:1})]),U])]),V])])}var Z=a(1241);const Q={},K=(0,Z.A)(Q,[["render",B]]);var Y=K;const J={id:"footer",class:"footer"},ee=(0,t.Lk)("div",{class:"copyright"},[(0,t.eW)(" © "),(0,t.Lk)("strong",null,[(0,t.Lk)("span",null,"MyZola Admin")]),(0,t.eW)(". All Rights Reserved ")],-1),ne=(0,t.Lk)("div",{class:"credits"},[(0,t.eW)(" Made with "),(0,t.Lk)("i",{class:"bi bi-heart-fill text-danger"})],-1),ae=[ee,ne];function ie(e,n){return(0,t.uX)(),(0,t.CE)("footer",J,ae)}const te={},re=(0,Z.A)(te,[["render",ie]]);var se=re;const oe={id:"main",class:"main"};var le={__name:"Main",setup(e){return(e,n)=>{const a=(0,t.g2)("router-view");return(0,t.uX)(),(0,t.CE)(t.FK,null,[(0,t.bF)(j),(0,t.bF)(Y),(0,t.Lk)("main",oe,[(0,t.bF)(a)]),(0,t.bF)(se)],64)}}};const ce=le;var de=ce,ue=(a(1863),a(3228));const pe="- MyZola Admin";var me=[{path:"/login",name:"login",component:()=>Promise.all([a.e(300),a.e(629)]).then(a.bind(a,1629)),meta:{title:`Login ${pe}`}},{path:"/",name:"home",component:de,meta:{requiresAuth:!0},children:[{path:"/",name:"dashboard",component:()=>Promise.resolve().then(a.bind(a,1863)),meta:{title:`Dashboard ${pe}`}},{path:"explore-hub",children:[{path:"companies",children:[{path:"",name:"explore_hub.companies",component:()=>a.e(378).then(a.bind(a,2378)),meta:{title:`Explore Hub Companies ${pe}`},children:[{path:"",name:"explore_hub.companies.listed",components:{explore_companies_listed:()=>Promise.all([a.e(300),a.e(452),a.e(449)]).then(a.bind(a,6449))},meta:{title:`Explore Hub: Listed Companies ${pe}`}},{path:"add",name:"explore_hub.companies.add",components:{explore_companies_listed:()=>Promise.all([a.e(300),a.e(452),a.e(380),a.e(473)]).then(a.bind(a,2473))},meta:{title:`Explore Hub: Add Company ${pe}`}},{path:"edit",name:"explore_hub.companies.edit",components:{explore_companies_listed:()=>Promise.all([a.e(300),a.e(380),a.e(162)]).then(a.bind(a,162))},meta:{title:`Explore Hub: Edit Company ${pe}`}}]}]},{path:"categories",children:[{path:"",name:"explore_hub.categories",component:()=>Promise.all([a.e(300),a.e(452),a.e(193)]).then(a.bind(a,1193)),meta:{title:`Explore Hub Listing Categories ${pe}`}}]},{path:"listings",name:"explore.listings",component:()=>a.e(640).then(a.bind(a,2640)),meta:{title:`Explore Hub: Listings ${pe}`}}]}]}];const he=(0,i.aE)({history:(0,i.LA)("/"),routes:me});he.beforeEach(((e,n,a)=>{let i=e.meta.title||"MyZola Admin";e.params.title&&(i=`${e.params.title}`),document.title=i;const t=ue.A.getters["auth/isAuthenticated"];e.matched.some((e=>e.meta.requiresAuth))&&!t?a({name:"login"}):a()}));var fe=he},3228:function(e,n,a){a.d(n,{A:function(){return h}});var i=a(782);const t={user:JSON.parse(localStorage.getItem("mz.admin"))||null,accessToken:localStorage.getItem("bearer_token")||null},r={STORE_AUTH_USER(e,n){e.user=n},STORE_AUTH_TOKEN(e,n){e.accessToken=n},LOGOUT(e){e.user=null,e.accessToken=null,localStorage.removeItem("mz.admin"),localStorage.removeItem("bearer_token")}},s={isAuthenticated:e=>!!e.accessToken};var o={namespaced:!0,state:t,mutations:r,getters:s};const l={materialIconsNames:[]},c={STORE_MATERIAL_ICONS_NAMES:(e,n)=>e.materialIconsNames=n};var d={namespaced:!0,state:l,mutations:c};const u={companies:[],editCompany:null,listingCategories:[],isFetchingCategories:!1},p={STORE_EXPLORE_LISTED_COMPANIES:(e,n)=>e.companies=n,SET_EDIT_COMPANY:(e,n)=>e.editCompany=n,STORE_EXPLORE_LISTING_CATEGORIES:(e,n)=>e.listingCategories=n,SET_IS_FETCHING_CATEGORIES:(e,n)=>e.isFetchingCategories=n};var m={namespaced:!0,state:u,mutations:p},h=(0,i.y$)({state:{},mutations:{},getters:{},modules:{auth:o,shared:d,explore:m}})},1863:function(e,n,a){a.r(n),a.d(n,{default:function(){return p}});var i=a(6768),t=a(4232),r=a(782);const s={class:"row"},o={class:"col-md-12 mb-4"},l={class:"font-weight-bold"},c=(0,i.Lk)("h6",{class:"font-weight-normal mb-0"},"Welcome to MyZola Admin",-1);var d={__name:"Dashboard",setup(e){const n=(0,r.Pj)(),a=(0,i.EW)((()=>n.state.auth.user?n.state.auth.user.name.toString().split(" ")[0]:""));return(e,n)=>((0,i.uX)(),(0,i.CE)("div",s,[(0,i.Lk)("div",o,[(0,i.Lk)("h4",l,"Hello "+(0,t.v_)(a.value),1),c])]))}};const u=d;var p=u},85:function(e,n,a){e.exports=a.p+"img/myzola_icon.png"}},n={};function a(i){var t=n[i];if(void 0!==t)return t.exports;var r=n[i]={exports:{}};return e[i].call(r.exports,r,r.exports,a),r.exports}a.m=e,function(){var e=[];a.O=function(n,i,t,r){if(!i){var s=1/0;for(d=0;d<e.length;d++){i=e[d][0],t=e[d][1],r=e[d][2];for(var o=!0,l=0;l<i.length;l++)(!1&r||s>=r)&&Object.keys(a.O).every((function(e){return a.O[e](i[l])}))?i.splice(l--,1):(o=!1,r<s&&(s=r));if(o){e.splice(d--,1);var c=t();void 0!==c&&(n=c)}}return n}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[i,t,r]}}(),function(){a.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(n,{a:n}),n}}(),function(){a.d=function(e,n){for(var i in n)a.o(n,i)&&!a.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:n[i]})}}(),function(){a.f={},a.e=function(e){return Promise.all(Object.keys(a.f).reduce((function(n,i){return a.f[i](e,n),n}),[]))}}(),function(){a.u=function(e){return"js/"+e+".js"}}(),function(){a.miniCssF=function(e){return"css/"+e+".css"}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={},n="myzola-admin:";a.l=function(i,t,r,s){if(e[i])e[i].push(t);else{var o,l;if(void 0!==r)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var u=c[d];if(u.getAttribute("src")==i||u.getAttribute("data-webpack")==n+r){o=u;break}}o||(l=!0,o=document.createElement("script"),o.charset="utf-8",o.timeout=120,a.nc&&o.setAttribute("nonce",a.nc),o.setAttribute("data-webpack",n+r),o.src=i),e[i]=[t];var p=function(n,a){o.onerror=o.onload=null,clearTimeout(m);var t=e[i];if(delete e[i],o.parentNode&&o.parentNode.removeChild(o),t&&t.forEach((function(e){return e(a)})),n)return n(a)},m=setTimeout(p.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=p.bind(null,o.onerror),o.onload=p.bind(null,o.onload),l&&document.head.appendChild(o)}}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){a.p="/"}(),function(){if("undefined"!==typeof document){var e=function(e,n,i,t,r){var s=document.createElement("link");s.rel="stylesheet",s.type="text/css",a.nc&&(s.nonce=a.nc);var o=function(a){if(s.onerror=s.onload=null,"load"===a.type)t();else{var i=a&&a.type,o=a&&a.target&&a.target.href||n,l=new Error("Loading CSS chunk "+e+" failed.\n("+i+": "+o+")");l.name="ChunkLoadError",l.code="CSS_CHUNK_LOAD_FAILED",l.type=i,l.request=o,s.parentNode&&s.parentNode.removeChild(s),r(l)}};return s.onerror=s.onload=o,s.href=n,i?i.parentNode.insertBefore(s,i.nextSibling):document.head.appendChild(s),s},n=function(e,n){for(var a=document.getElementsByTagName("link"),i=0;i<a.length;i++){var t=a[i],r=t.getAttribute("data-href")||t.getAttribute("href");if("stylesheet"===t.rel&&(r===e||r===n))return t}var s=document.getElementsByTagName("style");for(i=0;i<s.length;i++){t=s[i],r=t.getAttribute("data-href");if(r===e||r===n)return t}},i=function(i){return new Promise((function(t,r){var s=a.miniCssF(i),o=a.p+s;if(n(s,o))return t();e(i,o,null,t,r)}))},t={524:0};a.f.miniCss=function(e,n){var a={193:1,380:1,449:1};t[e]?n.push(t[e]):0!==t[e]&&a[e]&&n.push(t[e]=i(e).then((function(){t[e]=0}),(function(n){throw delete t[e],n})))}}}(),function(){var e={524:0};a.f.j=function(n,i){var t=a.o(e,n)?e[n]:void 0;if(0!==t)if(t)i.push(t[2]);else{var r=new Promise((function(a,i){t=e[n]=[a,i]}));i.push(t[2]=r);var s=a.p+a.u(n),o=new Error,l=function(i){if(a.o(e,n)&&(t=e[n],0!==t&&(e[n]=void 0),t)){var r=i&&("load"===i.type?"missing":i.type),s=i&&i.target&&i.target.src;o.message="Loading chunk "+n+" failed.\n("+r+": "+s+")",o.name="ChunkLoadError",o.type=r,o.request=s,t[1](o)}};a.l(s,l,"chunk-"+n,n)}},a.O.j=function(n){return 0===e[n]};var n=function(n,i){var t,r,s=i[0],o=i[1],l=i[2],c=0;if(s.some((function(n){return 0!==e[n]}))){for(t in o)a.o(o,t)&&(a.m[t]=o[t]);if(l)var d=l(a)}for(n&&n(i);c<s.length;c++)r=s[c],a.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return a.O(d)},i=self["webpackChunkmyzola_admin"]=self["webpackChunkmyzola_admin"]||[];i.forEach(n.bind(null,0)),i.push=n.bind(null,i.push.bind(i))}();var i=a.O(void 0,[504],(function(){return a(1751)}));i=a.O(i)})();
//# sourceMappingURL=app.js.map