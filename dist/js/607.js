"use strict";(self["webpackChunkmyzola_admin"]=self["webpackChunkmyzola_admin"]||[]).push([[607],{8607:function(l,e,n){n.r(e),n.d(e,{default:function(){return Y}});n(4114);var a=n(6768),t=n(144),s=n(4232),o=(n(4300),n(7190),n(782)),c=n(1387),i=(n(2933),n(1452)),u=n(7477),d=n(7021);const r=l=>((0,a.Qi)("data-v-3363b61a"),l=l(),(0,a.jt)(),l),k={class:"row p-2"},m={class:"col-sm-12 d-flex m-b-10"},v=r((()=>(0,a.Lk)("br",null,null,-1))),p={class:"table-responsive"},b={class:"table table-hover"},L=r((()=>(0,a.Lk)("thead",null,[(0,a.Lk)("tr",null,[(0,a.Lk)("th",null,"Logo"),(0,a.Lk)("th",null,"Name"),(0,a.Lk)("th",null,"Tagline"),(0,a.Lk)("th",null,"Contact Person"),(0,a.Lk)("th",null,"Actions")])],-1))),_=["onClick"],h=["src","alt"],g=["onClick"],y=["onClick"],C=["onClick"],f={key:1},w=r((()=>(0,a.Lk)("td",{colspan:"5",class:"text-center p-3"},"No data",-1))),E=[w],F={class:"row"},W={class:"col-sm-3"},S=["src"],A={class:"col-sm-6"},N={class:"text-italic"},R={class:"row"},X={class:"col-sm-6"},H=r((()=>(0,a.Lk)("h6",{class:"fw-bold"},"Contact",-1))),I=r((()=>(0,a.Lk)("br",null,null,-1))),T=r((()=>(0,a.Lk)("br",null,null,-1))),O={key:0,class:"col-sm-6"},M=r((()=>(0,a.Lk)("h6",null,"Social Media Handles",-1))),K={class:"d-inline-flex"},P={key:0,class:"row p-4 pb-1"},Q=r((()=>(0,a.Lk)("h6",{class:"fw-bold"},"About",-1))),V=["innerHTML"],x=r((()=>(0,a.Lk)("hr",{class:"m-0"},null,-1))),J={class:"row p-4"},z=r((()=>(0,a.Lk)("strong",null,"Added",-1))),j=r((()=>(0,a.Lk)("br",null,null,-1))),D=r((()=>(0,a.Lk)("br",null,null,-1)));var B={__name:"List",setup(l){const e=(0,o.Pj)(),n=(0,c.rd)(),r=(0,t.KR)(!1),w=(0,t.KR)(null);let B=(0,a.EW)({get:()=>e.state.investmentHub.companies,set:l=>e.commit("investmentHub/STORE_LISTED_COMPANIES",l)}),G=(0,a.EW)({get:()=>e.state.investmentHub.isFetchingCompanies,set:l=>e.commit("investmentHub/SET_IS_FETCHING_COMPANIES",l)});function U(l){switch(l.action){case"view":return Y(l.company);case"edit":return $(l.company);case"archive":break;case"delete":break}}function Y(l){return w.value=JSON.parse(JSON.stringify(l)),r.value=!0}function $(l){e.commit("investmentHub/SET_EDIT_COMPANY",JSON.parse(JSON.stringify(l))),n.push({name:"investment_hub.companies.edit"})}return(0,a.sV)((()=>{B.value.length||(0,d.yM)()})),(l,e)=>{const o=(0,a.g2)("el-button"),c=(0,a.g2)("el-icon"),$=(0,a.g2)("el-dropdown-item"),q=(0,a.g2)("el-dropdown-menu"),Z=(0,a.g2)("el-dropdown"),ll=(0,a.g2)("el-dialog"),el=(0,a.gN)("loading");return(0,a.uX)(),(0,a.CE)(a.FK,null,[(0,a.bo)(((0,a.uX)(),(0,a.CE)("div",k,[(0,a.Lk)("div",m,[(0,a.bF)(o,{onClick:e[0]||(e[0]=l=>(0,t.R1)(n).push({name:"investment_hub.companies.add"})),type:"primary",icon:(0,t.R1)(u.FWt),plain:""},{default:(0,a.k6)((()=>[(0,a.eW)("Add Company")])),_:1},8,["icon"])]),v,(0,a.Lk)("div",p,[(0,a.Lk)("table",b,[L,(0,a.Lk)("tbody",null,[(0,t.R1)(B).length?((0,a.uX)(!0),(0,a.CE)(a.FK,{key:0},(0,a.pI)((0,t.R1)(B),((l,e)=>((0,a.uX)(),(0,a.CE)("tr",{key:"investment_hub-companies-"+e,style:{cursor:"pointer"}},[(0,a.Lk)("td",{onClick:e=>Y(l)},[(0,a.Lk)("img",{class:"table-img",src:l.logo,alt:l.name+"'s logo"},null,8,h)],8,_),(0,a.Lk)("td",{onClick:e=>Y(l)},(0,s.v_)(l.name),9,g),(0,a.Lk)("td",{onClick:e=>Y(l)},(0,s.v_)(l.description),9,y),(0,a.Lk)("td",{onClick:e=>Y(l)},(0,s.v_)(l.contact_name),9,C),(0,a.Lk)("td",null,[(0,a.bF)(Z,{trigger:"click",onCommand:U},{dropdown:(0,a.k6)((()=>[(0,a.bF)(q,null,{default:(0,a.k6)((()=>[(0,a.bF)($,{command:{action:"view",company:l}},{default:(0,a.k6)((()=>[(0,a.eW)("View")])),_:2},1032,["command"]),(0,a.bF)($,{command:{action:"edit",company:l}},{default:(0,a.k6)((()=>[(0,a.eW)("Edit")])),_:2},1032,["command"]),(0,a.bF)($,{command:{action:"archive",company:l}},{default:(0,a.k6)((()=>[(0,a.eW)("Archive")])),_:2},1032,["command"])])),_:2},1024)])),default:(0,a.k6)((()=>[(0,a.bF)(o,{plain:"",type:"primary",size:"small"},{default:(0,a.k6)((()=>[(0,a.eW)(" Actions"),(0,a.bF)(c,{class:"el-icon--right"},{default:(0,a.k6)((()=>[(0,a.bF)((0,t.R1)(u.yd$))])),_:1})])),_:1})])),_:2},1024)])])))),128)):((0,a.uX)(),(0,a.CE)("tr",f,E))])])])])),[[el,(0,t.R1)(G)]]),w.value?((0,a.uX)(),(0,a.Wv)(ll,{key:0,modelValue:r.value,"onUpdate:modelValue":e[1]||(e[1]=l=>r.value=l),width:"60%","align-center":"",fullscreen:(0,t.R1)(d.Qv)},{default:(0,a.k6)((()=>[(0,a.Lk)("div",F,[(0,a.Lk)("div",W,[(0,a.Lk)("img",{src:w.value.logo,alt:"",class:"view_company_logo"},null,8,S)]),(0,a.Lk)("div",A,[(0,a.Lk)("h3",null,(0,s.v_)(w.value.name),1),(0,a.Lk)("p",N,(0,s.v_)(w.value.description),1),(0,a.Lk)("div",R,[(0,a.Lk)("div",X,[H,(0,a.Lk)("p",null,[(0,a.eW)((0,s.v_)(w.value.contact_name)+" ",1),I,(0,a.eW)(" "+(0,s.v_)(w.value.email)+" ",1),T,(0,a.eW)(" "+(0,s.v_)(w.value.contact_phone),1)])]),w.value.socials.length?((0,a.uX)(),(0,a.CE)("div",O,[M,(0,a.Lk)("div",K,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(w.value.socials,((l,e)=>((0,a.uX)(),(0,a.CE)("div",{class:"p-1",key:"form-current-socials-"+e},[(0,a.bF)((0,t.R1)(i.p),{type:l.platform,link:{src:l.link}},null,8,["type","link"])])))),128))])])):(0,a.Q3)("",!0)])])]),w.value.about?((0,a.uX)(),(0,a.CE)("div",P,[Q,(0,a.Lk)("div",{class:"alert alert-secondary alert-dismissible fade show",role:"alert",innerHTML:w.value.about},null,8,V)])):(0,a.Q3)("",!0),x,(0,a.Lk)("div",J,[(0,a.Lk)("p",null,[z,j,(0,a.eW)(" By: "+(0,s.v_)(w.value.added_by)+" ",1),D,(0,a.eW)(" At: "+(0,s.v_)(w.value.added_at),1)])])])),_:1},8,["modelValue","fullscreen"])):(0,a.Q3)("",!0)],64)}}},G=n(1241);const U=(0,G.A)(B,[["__scopeId","data-v-3363b61a"]]);var Y=U}}]);
//# sourceMappingURL=607.js.map