"use strict";(self["webpackChunkmyzola_admin"]=self["webpackChunkmyzola_admin"]||[]).push([[629],{1629:function(e,a,t){t.r(a),t.d(a,{default:function(){return I}});var l=t(6768),o=t(5130),s=t(7871),r=t(144),n=t(6519),c=t(7190),i=t(1387),u=t(782);const m={class:"container-scroller"},d={class:"container-fluid page-body-wrapper full-page-wrapper"},p={class:"content-wrapper d-flex align-items-center auth px-0"},k={class:"row w-100 mx-0"},f={class:"col-lg-4 mx-auto"},g={class:"auth-form-light text-left py-5 px-4 px-sm-5"},h=(0,l.Lk)("div",{class:"brand-logo"},[(0,l.Lk)("img",{src:s,alt:"logo"})],-1),v=(0,l.Lk)("h4",{class:"font-weight-light"},"Sign in to continue.",-1),b={class:"form-group"},L={class:"form-group"},w=(0,l.Lk)("div",{class:"mt-3 d-grid gap-2"},[(0,l.Lk)("button",{type:"submit",class:"btn btn-block btn-lg font-weight-medium auth-form-btn mz-bg mz-bg-hover text-white"},"SIGN IN")],-1),x={class:"my-2 d-flex justify-content-between align-items-center"},y={class:"form-check"},S={class:"form-check-label text-muted"},_=(0,l.Lk)("a",{href:"#"},"Remember me",-1),R=(0,l.Lk)("i",{class:"input-helper"},null,-1),E=(0,l.Lk)("i",{class:"input-helper"},null,-1),N=(0,l.Lk)("a",{href:"#",class:"auth-link text-black"},"Forgot password?",-1);var U={__name:"Login",setup(e){const a=(0,i.rd)(),t=(0,u.Pj)(),s=(0,r.KR)(""),U=(0,r.KR)(""),z=(0,r.KR)(!1),I=(0,r.KR)(!1);function K(){let e={email:s.value.trim(),password:U.value.trim()};I.value=!0,n.A.post(c.p.LOGIN,e).then((e=>{t.commit("auth/STORE_AUTH_TOKEN",e.data.token),t.commit("auth/STORE_AUTH_USER",e.data.user),z&&(localStorage.setItem("mz.admin",JSON.stringify(e.data.user)),localStorage.setItem("bearer_token",e.data.token)),I.value=!1,a.replace({name:"dashboard"})})).catch((e=>I.value=!1))}return(e,a)=>{const t=(0,l.gN)("loading");return(0,l.uX)(),(0,l.CE)("div",m,[(0,l.Lk)("div",d,[(0,l.Lk)("div",p,[(0,l.Lk)("div",k,[(0,l.Lk)("div",f,[(0,l.bo)(((0,l.uX)(),(0,l.CE)("div",g,[h,v,(0,l.Lk)("form",{onSubmit:(0,o.D$)(K,["prevent"]),class:"pt-3"},[(0,l.Lk)("div",b,[(0,l.bo)((0,l.Lk)("input",{type:"email",class:"form-control form-control-lg",placeholder:"Email","onUpdate:modelValue":a[0]||(a[0]=e=>s.value=e),required:""},null,512),[[o.Jo,s.value]])]),(0,l.Lk)("div",L,[(0,l.bo)((0,l.Lk)("input",{type:"password",class:"form-control form-control-lg",placeholder:"Password","onUpdate:modelValue":a[1]||(a[1]=e=>U.value=e),required:""},null,512),[[o.Jo,U.value]])]),w,(0,l.Lk)("div",x,[(0,l.Lk)("div",y,[(0,l.Lk)("label",S,[(0,l.bo)((0,l.Lk)("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":a[2]||(a[2]=e=>z.value=e)},null,512),[[o.lH,z.value]]),_,R,E])]),N])],32)])),[[t,I.value]])])])])])])}}};const z=U;var I=z}}]);
//# sourceMappingURL=629.f916a040.js.map