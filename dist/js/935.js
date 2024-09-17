"use strict";(self["webpackChunkmyzola_admin"]=self["webpackChunkmyzola_admin"]||[]).push([[935],{7021:function(e,t,a){a.d(t,{DU:function(){return L},HC:function(){return d},Qv:function(){return c},RL:function(){return b},XM:function(){return v},cE:function(){return E},eX:function(){return r},fv:function(){return S},hU:function(){return m},k1:function(){return u},kN:function(){return _},ob:function(){return k},yM:function(){return p}});var l=a(4373),n=a(254),i=a(4300),s=a(7190);const o="https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIcons-Regular.codepoints",r=["instagram","facebook","whatsapp","linkedin","youtube","twitter"],c=window.innerWidth<=768;function u(){n.A.commit("exploreHub/SET_IS_FETCHING_COMPANIES",!0),i.A.get(s.pe.GET_EXPLORE_LISTED_COMPANIES).then((e=>{n.A.commit("exploreHub/STORE_EXPLORE_LISTED_COMPANIES",e.data.data),n.A.commit("exploreHub/SET_IS_FETCHING_COMPANIES",!1)})).catch((e=>n.A.commit("exploreHub/SET_IS_FETCHING_COMPANIES",!1)))}function d(){n.A.commit("exploreHub/SET_IS_FETCHING_CATEGORIES",!0),i.A.get(s.pe.EXPLORE_HUB_FETCH_LISTING_CATEGORIES).then((e=>{n.A.commit("exploreHub/STORE_EXPLORE_LISTING_CATEGORIES",e.data.data),n.A.commit("exploreHub/SET_IS_FETCHING_CATEGORIES",!1)})).catch((e=>n.A.commit("exploreHub/SET_IS_FETCHING_CATEGORIES",!1)))}function p(){n.A.commit("investmentHub/SET_IS_FETCHING_COMPANIES",!0),i.A.get(s.pe.GET_INVESTMENT_HUB_LISTED_COMPANIES).then((e=>{n.A.commit("investmentHub/STORE_LISTED_COMPANIES",e.data.data),n.A.commit("investmentHub/SET_IS_FETCHING_COMPANIES",!1)})).catch((e=>n.A.commit("investmentHub/SET_IS_FETCHING_COMPANIES",!1)))}function v(){n.A.commit("investmentHub/SET_IS_FETCHING_CATEGORIES",!0),i.A.get(s.pe.INVESTMENT_HUB_FETCH_LISTING_CATEGORIES).then((e=>{n.A.commit("investmentHub/STORE_LISTING_CATEGORIES",e.data.data),n.A.commit("investmentHub/SET_IS_FETCHING_CATEGORIES",!1)})).catch((e=>n.A.commit("investmentHub/SET_IS_FETCHING_CATEGORIES",!1)))}function _(){n.A.commit("auth/SET_IS_FETCHING_ROLES",!0),i.A.get(s.pe.LIST_ROLES).then((e=>{n.A.commit("auth/STORE_ROLES",e.data),n.A.commit("auth/SET_IS_FETCHING_ROLES",!1)})).catch((e=>n.A.commit("auth/SET_IS_FETCHING_ROLES",!1)))}function m(){n.A.commit("auth/SET_IS_FETCHING_USERS",!0),i.A.get(s.pe.LIST_USERS).then((e=>{n.A.commit("auth/STORE_USERS",e.data),n.A.commit("auth/SET_IS_FETCHING_USERS",!1)})).catch((e=>n.A.commit("auth/SET_IS_FETCHING_USERS",!1)))}function E(e){return n.A.getters["auth/isSuperAdmin"]||n.A.state.auth.permissions.includes(e)}function k(){l.A.get(o).then((e=>{const t=e.data,a=t.split("\n"),l=a.map((e=>{const t=e.split(" ");return t[0]}));n.A.commit("shared/STORE_MATERIAL_ICONS_NAMES",l)}))}function L(e=12){let t="",a="A0zBCDy1EFx2GHx3wIJvKL4uMNtOs5PrQR6qSTpU7oVWnXm8YZab9cdefghijkl";for(let l=0;l<e;l++)t+=a.charAt(Math.floor(Math.random()*a.length));return t}function b(e,t="",a=null){let l=parseInt(a)||0,n=(new Intl.NumberFormat).format(parseFloat(e).toFixed(l));return(t?t+" ":"")+n}function S(e,t=2){const a=e.trim().split(/\s+/),l=a.map((e=>e[0].toUpperCase()));return l.slice(0,t).join("")}},9935:function(e,t,a){a.r(t),a.d(t,{default:function(){return Ce}});a(4114);var l=a(6768),n=a(1387),i=a(4232),s=a(144),o=a(5130),r=a(7190),c=a(4300),u=a(7477),d=a(7021),p=a(2933),v=a(782);const _={class:"row"},m={class:"table-responsive m-t-10"},E={class:"table"},k=(0,l.Lk)("thead",null,[(0,l.Lk)("tr",null,[(0,l.Lk)("th",null,"ID"),(0,l.Lk)("th",null,"Title"),(0,l.Lk)("th",null,"Company"),(0,l.Lk)("th",null,"Times Reported"),(0,l.Lk)("th",null,"Details")])],-1),L=["onClick"],b=["onClick"],S=["onClick"],I=["onClick"],h={key:1},T=(0,l.Lk)("td",{colspan:"5",class:"text-center p-3"},"No data",-1),f=[T],g={class:"row",style:{height:"95vh","overflow-y":"scroll"}},C={class:"col-md-12 d-flex justify-content-center flex-wrap p-t-15"},A={class:"p-2"},R={class:"m-0"},y={key:0,class:"col-md-12 d-flex justify-content-center flex-wrap"},N={class:"p-2"},H={class:"m-0"},O={class:"fw-bold"},x={class:"m-0"},w={class:"fw-bold fs-16"},G={key:1,class:"col-md-12 d-flex justify-content-center flex-wrap p-t-10 p-b-10"},F={class:"col-md-5 col-sm-12 d-flex justify-content-between flex-wrap"},P=(0,l.Lk)("small",null,"Listing Company",-1),X={class:"m-0 fw-bold"},M=(0,l.Lk)("small",null,"Times Reported",-1),U={class:"m-0 fw-bold fs-25"},K={class:"col-md-12 d-flex align-items-center reviewer_details"},B=["src"],V={class:"m-l-8"},D={class:"fw-bold fs-12"},Q=(0,l.Lk)("br",null,null,-1),j={class:"fs-12"},W=(0,l.Lk)("br",null,null,-1),J={class:"fs-12"},z={class:"col-md-12 m-t-5 fs-12",style:{color:"#993455"}},q={class:"col-md-12"},Y={class:"fs-11 text-italic"},Z={key:2,class:"col-sm-12 reviews_pagination m-t-20"},ee={class:"pagination justify-content-center"},te=["onClick","innerHTML"],ae={class:"m-t-20 m-b-20 d-flex justify-content-end"};var le={__name:"ReportedListings",setup(e){const t=(0,v.Pj)(),a=(0,s.KR)(!1),n=(0,s.KR)(!1),T=(0,s.KR)(!1),le=(0,s.KR)([]),ne=(0,s.KR)({}),ie=(0,s.KR)({}),se=(0,s.KR)({}),oe=(0,s.KR)(null),re=(0,s.KR)(null),ce=(0,l.EW)((()=>oe.value&&ie.value[oe.value]?ie.value[oe.value]:[]));function ue(){a.value=!0,c.A.post(r.pe.EXPLORE_HUB_REPORTED_LISTINGS).then((e=>{le.value=e.data.data,a.value=!1})).catch((e=>a.value=!1))}function de(e){ne.value=JSON.parse(JSON.stringify(e)),T.value=!0,pe()}function pe(e=null){e||(e=r.pe.EXPLORE_HUB_LISTING_REPORTS);let t={listing_id:ne.value.id};n.value=!0,c.A.post(e,t).then((e=>{se.value=e.data.pagination.links,oe.value=e.data.pagination.current_page,re.value=e.data.pagination.last_page,ie.value[e.data.pagination.current_page]=e.data.data,n.value=!1})).catch((e=>n.value=!1))}function ve(e){if(e.active)return;let t=parseInt(e.url.toString().split("page=")[1]);if(!ie.value[t])return pe(e.url);oe.value=t;let a=JSON.parse(JSON.stringify(se.value)).map((e=>(e.active=e.url&&e.label.length<2&&e.url.includes(`page=${t}`),e))).map((e=>(e.label.toLowerCase().includes("previous")&&(e.url=1==t?null:`${r.pe.EXPLORE_HUB_LISTING_REPORTS}?page=${oe.value-1}`),e.label.toLowerCase().includes("next")&&(e.url=t==re.value?null:`${r.pe.EXPLORE_HUB_LISTING_REPORTS}?page=${oe.value+1}`),e)));se.value=a}function _e(){p.s.prompt("Sure you want to archive this listing?\nPlease give a reason why you want to archive","Confirm Archive",{confirmButtonText:"Archive",cancelButtonText:"Cancel",inputPlaceholder:"Type here why you want to archive",inputValidator:e=>!(!e||!e.length)||"Please give a reason"}).then((({value:e})=>{let t={id:ne.value.id,reason:e};me(t)})).catch((()=>{}))}function me(e){n.value=!0,c.A.post(r.pe.EXPLORE_HUB_ARCHIVE_LISTING,e).then((e=>{$.growl.notice({message:e.data.message}),T.value=!1,ue(),t.commit("exploreHub/STORE_ACTIVE_LISTINGS",[]),n.value=!1})).catch((e=>n.value=!1))}return(0,l.sV)((()=>{ue()})),(e,t)=>{const r=(0,l.g2)("el-button"),c=(0,l.g2)("el-divider"),p=(0,l.g2)("el-dialog"),v=(0,l.gN)("loading");return(0,l.uX)(),(0,l.CE)(l.FK,null,[(0,l.bo)(((0,l.uX)(),(0,l.CE)("div",_,[(0,l.Lk)("div",m,[(0,l.Lk)("table",E,[k,(0,l.Lk)("tbody",null,[le.value.length?((0,l.uX)(!0),(0,l.CE)(l.FK,{key:0},(0,l.pI)(le.value,((e,t)=>((0,l.uX)(),(0,l.CE)("tr",{key:"explore_hub-reported-listings-"+t,style:{cursor:"pointer"}},[(0,l.Lk)("td",{onClick:t=>de(e)},(0,i.v_)(e.listing_id),9,L),(0,l.Lk)("td",{onClick:t=>de(e)},(0,i.v_)(e.title),9,b),(0,l.Lk)("td",{onClick:t=>de(e)},(0,i.v_)(e.company),9,S),(0,l.Lk)("td",{onClick:t=>de(e)},(0,i.v_)(e.times_reported),9,I),(0,l.Lk)("td",null,[(0,l.bF)(r,{onClick:t=>de(e),type:"primary",size:"small",plain:""},{default:(0,l.k6)((()=>[(0,l.eW)("View")])),_:2},1032,["onClick"])])])))),128)):((0,l.uX)(),(0,l.CE)("tr",h,f))])])])])),[[v,a.value]]),ne.value?((0,l.uX)(),(0,l.Wv)(p,{key:0,modelValue:T.value,"onUpdate:modelValue":t[0]||(t[0]=e=>T.value=e),width:"80%",top:"10px","close-on-click-modal":!1,fullscreen:(0,s.R1)(d.Qv),onClosed:t[1]||(t[1]=e=>ie.value={})},{default:(0,l.k6)((()=>[(0,l.bo)(((0,l.uX)(),(0,l.CE)("div",g,[(0,l.Lk)("div",C,[(0,l.Lk)("div",A,[(0,l.Lk)("small",null,"Listing "+(0,i.v_)(ne.value.listing_id),1),(0,l.Lk)("h3",R,(0,i.v_)(ne.value.title),1)])]),(0,s.R1)(d.Qv)?((0,l.uX)(),(0,l.CE)("div",y,[(0,l.Lk)("div",N,[(0,l.Lk)("p",H,[(0,l.eW)(" Listing Company: "),(0,l.Lk)("span",O,(0,i.v_)(ne.value.company),1)]),(0,l.Lk)("p",x,[(0,l.eW)(" Times Reported: "),(0,l.Lk)("span",w,(0,i.v_)(ne.value.times_reported),1)])])])):(0,l.Q3)("",!0),(0,s.R1)(d.Qv)?(0,l.Q3)("",!0):((0,l.uX)(),(0,l.CE)("div",G,[(0,l.Lk)("div",F,[(0,l.Lk)("div",null,[P,(0,l.Lk)("h6",X,(0,i.v_)(ne.value.company),1)]),(0,l.bF)(c,{direction:"vertical",style:{height:"40px"}}),(0,l.Lk)("div",null,[M,(0,l.Lk)("h6",U,(0,i.v_)(ne.value.times_reported),1)])])])),(0,l.bF)(c),(0,l.Lk)("div",{class:(0,i.C4)({"col-md-12 flex-wrap reviews":!0,"d-flex":!(0,s.R1)(d.Qv)})},[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(ce.value,(e=>((0,l.uX)(),(0,l.CE)("div",{key:"page-reviews-"+e.id,class:"col-md-4 col-sm-12 review",style:{padding:"10px"}},[(0,l.Lk)("div",K,[(0,l.Lk)("img",{src:e.reporter.avatar},null,8,B),(0,l.Lk)("div",V,[(0,l.Lk)("h6",null,[(0,l.Lk)("small",null,[(0,l.Lk)("span",D,(0,i.v_)(e.reporter.name),1),Q,(0,l.Lk)("span",j,(0,i.v_)(e.reporter.email),1),W,(0,l.Lk)("span",J,(0,i.v_)(e.reporter.phone),1)])])])]),(0,l.Lk)("div",z,(0,i.v_)("other"==e.reason.toLowerCase()?e.description:e.reason),1),(0,l.Lk)("div",q,[(0,l.Lk)("small",Y,(0,i.v_)(e.date),1)])])))),128))],2),se.value.length>3?((0,l.uX)(),(0,l.CE)("div",Z,[(0,l.Lk)("ul",ee,[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(se.value,(e=>((0,l.uX)(),(0,l.CE)("li",{class:"page-item",key:"pagination-link-"+e.label},[(0,l.Lk)("a",{class:(0,i.C4)({"page-link":!0,disabled:!e.url,active:e.active}),href:"#",onClick:(0,o.D$)((t=>ve(e)),["prevent"]),innerHTML:e.label},null,10,te)])))),128))])])):(0,l.Q3)("",!0),(0,l.Lk)("div",ae,[(0,l.bF)(r,{onClick:_e,icon:(0,s.R1)(u.azJ),type:"danger",text:"",bg:""},{default:(0,l.k6)((()=>[(0,l.eW)("Archive Listing")])),_:1},8,["icon"])])])),[[v,n.value]])])),_:1},8,["modelValue","fullscreen"])):(0,l.Q3)("",!0)],64)}}};const ne=le;var ie=ne;const se={class:"pagetitle"},oe=(0,l.Lk)("h1",null,"Listings",-1),re={class:"breadcrumb"},ce={class:"breadcrumb-item"},ue=(0,l.Lk)("li",{class:"breadcrumb-item"},"Explore Hub",-1),de=(0,l.Lk)("li",{class:"breadcrumb-item active"},"Listings",-1),pe={class:"card"},ve={class:"card-body"},_e=(0,l.Lk)("br",null,null,-1),me={class:"nav nav-tabs",id:"myTab",role:"tablist"},Ee={class:"nav-item",role:"presentation"},ke={class:"nav-item",role:"presentation"},Le={class:"nav-item",role:"presentation"},be={class:"tab-content pt-2",id:"myTabContent"},Se={class:"tab-pane fade show active p-1",id:"explore_listings_active",role:"tabpanel","aria-labelledby":"home-tab"},Ie={class:"tab-pane fade",id:"explore_listings_reported",role:"tabpanel","aria-labelledby":"profile-tab"},he=(0,l.Lk)("div",{class:"tab-pane fade",id:"explore_listings_closed",role:"tabpanel","aria-labelledby":"profile-tab"}," Browse closed listings here ",-1),Te=(0,l.Lk)("div",{class:"tab-pane fade",id:"explore_listings_archived",role:"tabpanel","aria-labelledby":"contact-tab"}," Browse archived listings ",-1);var fe={__name:"Main",setup(e){const t=(0,n.rd)();function a(e){switch(e){case"listed":t.push({name:"explore_hub.listings.active"});case"reviews":case"deleted":}}return(0,l.sV)((()=>{t.push({name:"explore_hub.listings.active"})})),(e,t)=>{const n=(0,l.g2)("router-link"),i=(0,l.g2)("router-view");return(0,l.uX)(),(0,l.CE)(l.FK,null,[(0,l.Lk)("div",se,[oe,(0,l.Lk)("nav",null,[(0,l.Lk)("ol",re,[(0,l.Lk)("li",ce,[(0,l.bF)(n,{to:{name:"dashboard"}},{default:(0,l.k6)((()=>[(0,l.eW)("Home")])),_:1})]),ue,de])])]),(0,l.Lk)("div",pe,[(0,l.Lk)("div",ve,[_e,(0,l.Lk)("ul",me,[(0,l.Lk)("li",Ee,[(0,l.Lk)("button",{class:"nav-link active",onClick:t[0]||(t[0]=e=>a("active")),"data-bs-toggle":"tab","data-bs-target":"#explore_listings_active",type:"button",role:"tab","aria-controls":"home","aria-selected":"false",tabindex:"-1"},"Active")]),(0,l.Lk)("li",ke,[(0,l.Lk)("button",{class:"nav-link",onClick:t[1]||(t[1]=e=>a("reported")),"data-bs-toggle":"tab","data-bs-target":"#explore_listings_reported",type:"button",role:"tab","aria-controls":"contact","aria-selected":"true"},"Reported")]),(0,l.Lk)("li",Le,[(0,l.Lk)("button",{class:"nav-link",onClick:t[2]||(t[2]=e=>a("archived")),"data-bs-toggle":"tab","data-bs-target":"#explore_listings_archived",type:"button",role:"tab","aria-controls":"contact","aria-selected":"true"},"Archived")])]),(0,l.Lk)("div",be,[(0,l.Lk)("div",Se,[(0,l.bF)(i,{name:"explore_listings_active"})]),(0,l.Lk)("div",Ie,[(0,l.bF)(ie)]),he,Te])])])],64)}}};const ge=fe;var Ce=ge}}]);
//# sourceMappingURL=935.js.map