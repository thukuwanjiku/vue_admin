"use strict";(self["webpackChunkmyzola_admin"]=self["webpackChunkmyzola_admin"]||[]).push([[647],{6647:function(l,e,a){a.r(e),a.d(e,{default:function(){return Y}});a(4114);var n=a(6768),t=a(144),o=a(4232),c=(a(4300),a(7190),a(782)),s=a(1387),i=(a(2933),a(1452)),u=a(7477),d=a(7021);const r=l=>((0,n.Qi)("data-v-08bd40d8"),l=l(),(0,n.jt)(),l),k={class:"row p-2"},m={class:"col-sm-12 d-flex m-b-10"},p=r((()=>(0,n.Lk)("br",null,null,-1))),v={class:"table-responsive"},L={class:"table table-hover"},b=r((()=>(0,n.Lk)("thead",null,[(0,n.Lk)("tr",null,[(0,n.Lk)("th",null,"Logo"),(0,n.Lk)("th",null,"Name"),(0,n.Lk)("th",null,"Tagline"),(0,n.Lk)("th",null,"Contact Person"),(0,n.Lk)("th",null,"Actions")])],-1))),_=["onClick"],h=["src","alt"],g=["onClick"],y=["onClick"],C=["onClick"],f={key:1},E=r((()=>(0,n.Lk)("td",{colspan:"5",class:"text-center p-3"},"No data",-1))),w=[E],F={class:"row"},W={class:"col-sm-3"},x=["src"],R={class:"col-sm-6"},S={class:"text-italic"},A={class:"row"},N={class:"col-sm-6"},X=r((()=>(0,n.Lk)("h6",{class:"fw-bold"},"Contact",-1))),H=r((()=>(0,n.Lk)("br",null,null,-1))),I=r((()=>(0,n.Lk)("br",null,null,-1))),O={key:0,class:"col-sm-6"},T=r((()=>(0,n.Lk)("h6",null,"Social Media Handles",-1))),M={class:"d-inline-flex"},P={key:0,class:"row p-4 pb-1"},K=r((()=>(0,n.Lk)("h6",{class:"fw-bold"},"About",-1))),Q=["innerHTML"],V=r((()=>(0,n.Lk)("hr",{class:"m-0"},null,-1))),J={class:"row p-4"},z=r((()=>(0,n.Lk)("strong",null,"Added",-1))),j=r((()=>(0,n.Lk)("br",null,null,-1))),D=r((()=>(0,n.Lk)("br",null,null,-1)));var B={__name:"List",setup(l){const e=(0,c.Pj)(),a=(0,s.rd)(),r=(0,t.KR)(!1),E=(0,t.KR)(null);let B=(0,n.EW)({get:()=>e.state.exploreHub.companies,set:l=>e.commit("exploreHub/STORE_EXPLORE_LISTED_COMPANIES",l)}),G=(0,n.EW)({get:()=>e.state.exploreHub.isFetchingCompanies,set:l=>e.commit("exploreHub/SET_IS_FETCHING_COMPANIES",l)});function U(l){switch(l.action){case"view":return Y(l.company);case"edit":return $(l.company);case"archive":break;case"delete":break}}function Y(l){return E.value=JSON.parse(JSON.stringify(l)),r.value=!0}function $(l){e.commit("exploreHub/SET_EDIT_COMPANY",JSON.parse(JSON.stringify(l))),a.push({name:"explore_hub.companies.edit"})}return(0,n.sV)((()=>{B.value.length||(0,d.k1)()})),(l,e)=>{const c=(0,n.g2)("el-button"),s=(0,n.g2)("el-icon"),$=(0,n.g2)("el-dropdown-item"),q=(0,n.g2)("el-dropdown-menu"),Z=(0,n.g2)("el-dropdown"),ll=(0,n.g2)("el-dialog"),el=(0,n.gN)("loading");return(0,n.uX)(),(0,n.CE)(n.FK,null,[(0,n.bo)(((0,n.uX)(),(0,n.CE)("div",k,[(0,n.Lk)("div",m,[(0,n.bF)(c,{onClick:e[0]||(e[0]=l=>(0,t.R1)(a).push({name:"explore_hub.companies.add"})),type:"primary",icon:(0,t.R1)(u.FWt),plain:""},{default:(0,n.k6)((()=>[(0,n.eW)("Add Company")])),_:1},8,["icon"])]),p,(0,n.Lk)("div",v,[(0,n.Lk)("table",L,[b,(0,n.Lk)("tbody",null,[(0,t.R1)(B).length?((0,n.uX)(!0),(0,n.CE)(n.FK,{key:0},(0,n.pI)((0,t.R1)(B),((l,e)=>((0,n.uX)(),(0,n.CE)("tr",{key:"explore_hub-companies-"+e,style:{cursor:"pointer"}},[(0,n.Lk)("td",{onClick:e=>Y(l)},[(0,n.Lk)("img",{class:"table-img",src:l.logo,alt:l.name+"'s logo"},null,8,h)],8,_),(0,n.Lk)("td",{onClick:e=>Y(l)},(0,o.v_)(l.name),9,g),(0,n.Lk)("td",{onClick:e=>Y(l)},(0,o.v_)(l.description),9,y),(0,n.Lk)("td",{onClick:e=>Y(l)},(0,o.v_)(l.contact_name),9,C),(0,n.Lk)("td",null,[(0,n.bF)(Z,{trigger:"click",onCommand:U},{dropdown:(0,n.k6)((()=>[(0,n.bF)(q,null,{default:(0,n.k6)((()=>[(0,n.bF)($,{command:{action:"view",company:l}},{default:(0,n.k6)((()=>[(0,n.eW)("View")])),_:2},1032,["command"]),(0,n.bF)($,{command:{action:"edit",company:l}},{default:(0,n.k6)((()=>[(0,n.eW)("Edit")])),_:2},1032,["command"]),(0,n.bF)($,{command:{action:"archive",company:l}},{default:(0,n.k6)((()=>[(0,n.eW)("Archive")])),_:2},1032,["command"])])),_:2},1024)])),default:(0,n.k6)((()=>[(0,n.bF)(c,{plain:"",type:"primary",size:"small"},{default:(0,n.k6)((()=>[(0,n.eW)(" Actions"),(0,n.bF)(s,{class:"el-icon--right"},{default:(0,n.k6)((()=>[(0,n.bF)((0,t.R1)(u.yd$))])),_:1})])),_:1})])),_:2},1024)])])))),128)):((0,n.uX)(),(0,n.CE)("tr",f,w))])])])])),[[el,(0,t.R1)(G)]]),E.value?((0,n.uX)(),(0,n.Wv)(ll,{key:0,modelValue:r.value,"onUpdate:modelValue":e[1]||(e[1]=l=>r.value=l),width:"60%","align-center":"",fullscreen:(0,t.R1)(d.Qv)},{default:(0,n.k6)((()=>[(0,n.Lk)("div",F,[(0,n.Lk)("div",W,[(0,n.Lk)("img",{src:E.value.logo,alt:"",class:"view_company_logo"},null,8,x)]),(0,n.Lk)("div",R,[(0,n.Lk)("h3",null,(0,o.v_)(E.value.name),1),(0,n.Lk)("p",S,(0,o.v_)(E.value.description),1),(0,n.Lk)("div",A,[(0,n.Lk)("div",N,[X,(0,n.Lk)("p",null,[(0,n.eW)((0,o.v_)(E.value.contact_name)+" ",1),H,(0,n.eW)(" "+(0,o.v_)(E.value.email)+" ",1),I,(0,n.eW)(" "+(0,o.v_)(E.value.contact_phone),1)])]),E.value.socials.length?((0,n.uX)(),(0,n.CE)("div",O,[T,(0,n.Lk)("div",M,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(E.value.socials,((l,e)=>((0,n.uX)(),(0,n.CE)("div",{class:"p-1",key:"form-current-socials-"+e},[(0,n.bF)((0,t.R1)(i.p),{type:l.platform,link:{src:l.link}},null,8,["type","link"])])))),128))])])):(0,n.Q3)("",!0)])])]),E.value.about?((0,n.uX)(),(0,n.CE)("div",P,[K,(0,n.Lk)("div",{class:"alert alert-secondary alert-dismissible fade show",role:"alert",innerHTML:E.value.about},null,8,Q)])):(0,n.Q3)("",!0),V,(0,n.Lk)("div",J,[(0,n.Lk)("p",null,[z,j,(0,n.eW)(" By: "+(0,o.v_)(E.value.added_by)+" ",1),D,(0,n.eW)(" At: "+(0,o.v_)(E.value.added_at),1)])])])),_:1},8,["modelValue","fullscreen"])):(0,n.Q3)("",!0)],64)}}},G=a(1241);const U=(0,G.A)(B,[["__scopeId","data-v-08bd40d8"]]);var Y=U}}]);
//# sourceMappingURL=647.js.map