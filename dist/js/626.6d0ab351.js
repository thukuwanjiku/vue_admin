"use strict";(self["webpackChunkmyzola_admin"]=self["webpackChunkmyzola_admin"]||[]).push([[626],{1626:function(l,a,o){o.r(a),o.d(a,{default:function(){return Y}});var e=o(6768),s=o(5130),c=o(144),t=o(1387),n=o(6519),r=o(7190),d=o(782);const i={class:"col-md-12 grid-margin stretch-card"},u={class:"card"},m={class:"card-body"},p=(0,e.Lk)("h4",{class:"card-title"},"Add Company",-1),k=(0,e.Lk)("br",null,null,-1),v={class:"row"},L={class:"col-md-6"},b={class:"form-group row"},f=(0,e.Lk)("label",{class:"fw-bold"},"Name",-1),h={class:"col-sm-9"},w={class:"col-md-6"},g={class:"form-group row"},y=(0,e.Lk)("label",{class:"fw-bold"},"Description",-1),_={class:"col-sm-9"},C={class:"row"},E={class:"col-md-6"},N={class:"form-group row"},O=(0,e.Lk)("label",{class:"fw-bold"},"Company Logo",-1),S={class:"col-sm-9"},x={class:"col-md-6"},D={class:"form-group row"},J=(0,e.Lk)("label",{class:"fw-bold"},"Contact Person",-1),P={class:"col-sm-9"},R={class:"row"},q={class:"col-md-6"},A={class:"form-group row"},U=(0,e.Lk)("label",{class:"fw-bold"},"Contact Phone",-1),V={class:"col-sm-9"},T={class:"col-md-6"},X={class:"form-group row"},I=(0,e.Lk)("label",{class:"fw-bold"},"Email",-1),K={class:"col-sm-9"},j={class:"row"},z={class:"col-md-6"},M=(0,e.Lk)("button",{class:"btn btn-primary",type:"submit"},"Submit",-1);var F={__name:"Add",setup(l){const a=(0,t.rd)(),o=(0,d.Pj)(),F=(0,c.KR)({name:"",description:"",contact_name:"",contact_phone:"",email:""});let W=(0,c.KR)(null);const Y=(0,c.KR)(!1);function B(l){W.value=l.target.files[0]}function G(){let l=new FormData;Object.keys(F.value).forEach((a=>l.append(a,F.value[a]))),l.append("company_logo",W.value),Y.value=!0,n.A.post(r.p.ADD_EXPLORE_LISTED_COMPANY,l).then((l=>{$.growl.notice({message:l.data.message});let e=JSON.parse(JSON.stringify(o.state.explore.companies));e.unshift(l.data.data),o.commit("explore/STORE_EXPLORE_LISTED_COMPANIES",e),Y.value=!1,a.back()})).catch((l=>Y.value=!1))}return(l,o)=>{const t=(0,e.gN)("loading");return(0,e.uX)(),(0,e.CE)("div",i,[(0,e.Lk)("div",u,[(0,e.Lk)("div",m,[p,k,(0,e.bo)(((0,e.uX)(),(0,e.CE)("form",{onSubmit:(0,s.D$)(G,["prevent"])},[(0,e.Lk)("div",v,[(0,e.Lk)("div",L,[(0,e.Lk)("div",b,[f,(0,e.Lk)("div",h,[(0,e.bo)((0,e.Lk)("input",{type:"text",class:"form-control",placeholder:"Company Name","onUpdate:modelValue":o[0]||(o[0]=l=>F.value.name=l),required:""},null,512),[[s.Jo,F.value.name]])])])]),(0,e.Lk)("div",w,[(0,e.Lk)("div",g,[y,(0,e.Lk)("div",_,[(0,e.bo)((0,e.Lk)("input",{type:"text",class:"form-control",placeholder:"Tagline","onUpdate:modelValue":o[1]||(o[1]=l=>F.value.description=l),required:""},null,512),[[s.Jo,F.value.description]])])])])]),(0,e.Lk)("div",C,[(0,e.Lk)("div",E,[(0,e.Lk)("div",N,[O,(0,e.Lk)("div",S,[(0,e.Lk)("input",{type:"file",class:"form-control",onChange:B,required:""},null,32)])])]),(0,e.Lk)("div",x,[(0,e.Lk)("div",D,[J,(0,e.Lk)("div",P,[(0,e.bo)((0,e.Lk)("input",{type:"text",class:"form-control",placeholder:"Name","onUpdate:modelValue":o[2]||(o[2]=l=>F.value.contact_name=l),required:""},null,512),[[s.Jo,F.value.contact_name]])])])])]),(0,e.Lk)("div",R,[(0,e.Lk)("div",q,[(0,e.Lk)("div",A,[U,(0,e.Lk)("div",V,[(0,e.bo)((0,e.Lk)("input",{type:"text",class:"form-control",placeholder:"Contact phone","onUpdate:modelValue":o[3]||(o[3]=l=>F.value.contact_phone=l),required:""},null,512),[[s.Jo,F.value.contact_phone]])])])]),(0,e.Lk)("div",T,[(0,e.Lk)("div",X,[I,(0,e.Lk)("div",K,[(0,e.bo)((0,e.Lk)("input",{type:"text",class:"form-control",placeholder:"Contact Email","onUpdate:modelValue":o[4]||(o[4]=l=>F.value.email=l),required:""},null,512),[[s.Jo,F.value.email]])])])])]),(0,e.Lk)("div",j,[(0,e.Lk)("div",z,[M,(0,e.eW)("   "),(0,e.Lk)("button",{onClick:o[5]||(o[5]=l=>(0,c.R1)(a).back()),class:"btn btn-secondary",type:"button"},"Cancel")])])],32)),[[t,Y.value]])])])])}}};const W=F;var Y=W}}]);
//# sourceMappingURL=626.6d0ab351.js.map