(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{WVLm:function(l,n,u){"use strict";u.r(n);var e=u("CcnG"),d=u("/i4+"),t=u("QyCV"),o=u("sE5F"),a=u("67Y/"),i=function(){function l(l){this.http=l}return l.prototype.login=function(l){var n=new o.d;return n.append("Content-Type","Application/Json"),this.http.post("/api/login",l,{headers:n}).pipe(Object(a.a)(function(l){return l.json()}))},l.ngInjectableDef=e.defineInjectable({factory:function(){return new l(e.inject(o.e))},token:l,providedIn:"root"}),l}(),s=function(){function l(l,n,u,e,d){this.fb=l,this.myRoute=n,this.auth=u,this.auth1=e,this.loginservice=d,this.form=l.group({email:this.username,password:this.password})}return l.prototype.ngOnInit=function(){this.auth.isLoggednIn()&&this.myRoute.navigate(["extension"])},l.prototype.check=function(){var l=this,n={username:this.username,password:this.password};console.log(n),this.loginservice.login(n).subscribe(function(n){console.log(n),500===n.status?(console.log("invalid"),alert("No user")):200===n.status&&!1===n.user.active?(console.log("verify email"),alert("verify email")):200===n.status&&!1===n.user.paid?(alert("Please purchase a plan"),l.auth.sendPaytoken(n.user._id),l.myRoute.navigate(["payment"])):(console.log("fwf"),console.log(n),l.auth.sendToken(n.user.username),l.auth.sendId(n.user._id),l.auth.sendTokenid(n.token),console.log(l.auth.getId()),l.myRoute.navigate(["extension"]))})},l}(),p=function(){return function(){}}(),r=u("yWMr"),c=u("t68o"),m=u("zbXB"),g=u("NcP4"),v=u("xYTU"),h=u("pMnS"),b=u("gIcY"),f=u("ZYCi"),y=u("Ip0R"),C=e["\u0275crt"]({encapsulation:2,styles:[],data:{}});function w(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,59,"div",[["class","app-body"]],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,58,"main",[["class","main d-flex align-items-center"]],null,null,null,null,null)),(l()(),e["\u0275eld"](2,0,null,null,57,"div",[["class","container"]],null,null,null,null,null)),(l()(),e["\u0275eld"](3,0,null,null,56,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](4,0,null,null,55,"div",[["class","col-md-8 mx-auto"]],null,null,null,null,null)),(l()(),e["\u0275eld"](5,0,null,null,54,"div",[["class","card-group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](6,0,null,null,41,"div",[["class","card p-4"]],null,null,null,null,null)),(l()(),e["\u0275eld"](7,0,null,null,40,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),e["\u0275eld"](8,0,null,null,39,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],function(l,n,u){var d=!0;return"submit"===n&&(d=!1!==e["\u0275nov"](l,10).onSubmit(u)&&d),"reset"===n&&(d=!1!==e["\u0275nov"](l,10).onReset()&&d),d},null,null)),e["\u0275did"](9,16384,null,0,b.t,[],null,null),e["\u0275did"](10,4210688,null,0,b.m,[[8,null],[8,null]],null,null),e["\u0275prd"](2048,null,b.c,null,[b.m]),e["\u0275did"](12,16384,null,0,b.l,[[4,b.c]],null,null),(l()(),e["\u0275eld"](13,0,null,null,1,"h1",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Login"])),(l()(),e["\u0275eld"](15,0,null,null,1,"p",[["class","text-muted"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Sign In to your account"])),(l()(),e["\u0275eld"](17,0,null,null,11,"div",[["class","input-group mb-3"]],null,null,null,null,null)),(l()(),e["\u0275eld"](18,0,null,null,2,"div",[["class","input-group-prepend"]],null,null,null,null,null)),(l()(),e["\u0275eld"](19,0,null,null,1,"span",[["class","input-group-text"]],null,null,null,null,null)),(l()(),e["\u0275eld"](20,0,null,null,0,"i",[["class","icon-user"]],null,null,null,null,null)),(l()(),e["\u0275eld"](21,0,null,null,7,"input",[["autocomplete","username"],["class","form-control"],["name","username"],["placeholder","Username"],["required",""],["type","text"]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var d=!0,t=l.component;return"input"===n&&(d=!1!==e["\u0275nov"](l,22)._handleInput(u.target.value)&&d),"blur"===n&&(d=!1!==e["\u0275nov"](l,22).onTouched()&&d),"compositionstart"===n&&(d=!1!==e["\u0275nov"](l,22)._compositionStart()&&d),"compositionend"===n&&(d=!1!==e["\u0275nov"](l,22)._compositionEnd(u.target.value)&&d),"ngModelChange"===n&&(d=!1!==(t.username=u)&&d),d},null,null)),e["\u0275did"](22,16384,null,0,b.d,[e.Renderer2,e.ElementRef,[2,b.a]],null,null),e["\u0275did"](23,16384,null,0,b.q,[],{required:[0,"required"]},null),e["\u0275prd"](1024,null,b.h,function(l){return[l]},[b.q]),e["\u0275prd"](1024,null,b.i,function(l){return[l]},[b.d]),e["\u0275did"](26,671744,null,0,b.n,[[2,b.c],[6,b.h],[8,null],[6,b.i]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,b.j,null,[b.n]),e["\u0275did"](28,16384,null,0,b.k,[[4,b.j]],null,null),(l()(),e["\u0275eld"](29,0,null,null,11,"div",[["class","input-group mb-4"]],null,null,null,null,null)),(l()(),e["\u0275eld"](30,0,null,null,2,"div",[["class","input-group-prepend"]],null,null,null,null,null)),(l()(),e["\u0275eld"](31,0,null,null,1,"span",[["class","input-group-text"]],null,null,null,null,null)),(l()(),e["\u0275eld"](32,0,null,null,0,"i",[["class","icon-lock"]],null,null,null,null,null)),(l()(),e["\u0275eld"](33,0,null,null,7,"input",[["autocomplete","current-password"],["class","form-control"],["name","password"],["placeholder","Password"],["required",""],["type","password"]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var d=!0,t=l.component;return"input"===n&&(d=!1!==e["\u0275nov"](l,34)._handleInput(u.target.value)&&d),"blur"===n&&(d=!1!==e["\u0275nov"](l,34).onTouched()&&d),"compositionstart"===n&&(d=!1!==e["\u0275nov"](l,34)._compositionStart()&&d),"compositionend"===n&&(d=!1!==e["\u0275nov"](l,34)._compositionEnd(u.target.value)&&d),"ngModelChange"===n&&(d=!1!==(t.password=u)&&d),d},null,null)),e["\u0275did"](34,16384,null,0,b.d,[e.Renderer2,e.ElementRef,[2,b.a]],null,null),e["\u0275did"](35,16384,null,0,b.q,[],{required:[0,"required"]},null),e["\u0275prd"](1024,null,b.h,function(l){return[l]},[b.q]),e["\u0275prd"](1024,null,b.i,function(l){return[l]},[b.d]),e["\u0275did"](38,671744,null,0,b.n,[[2,b.c],[6,b.h],[8,null],[6,b.i]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,b.j,null,[b.n]),e["\u0275did"](40,16384,null,0,b.k,[[4,b.j]],null,null),(l()(),e["\u0275eld"](41,0,null,null,6,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](42,0,null,null,2,"div",[["class","col-6"]],null,null,null,null,null)),(l()(),e["\u0275eld"](43,0,null,null,1,"button",[["class","btn btn-primary px-4"],["type","button"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.check()&&e),e},null,null)),(l()(),e["\u0275ted"](-1,null,["Login"])),(l()(),e["\u0275eld"](45,0,null,null,2,"div",[["class","col-6 text-right"]],null,null,null,null,null)),(l()(),e["\u0275eld"](46,0,null,null,1,"button",[["class","btn btn-link px-0"],["type","button"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Forgot password?"])),(l()(),e["\u0275eld"](48,0,null,null,11,"div",[["class","card text-white bg-primary py-5 d-md-down-none"],["style","width:44%"]],null,null,null,null,null)),(l()(),e["\u0275eld"](49,0,null,null,10,"div",[["class","card-body text-center"]],null,null,null,null,null)),(l()(),e["\u0275eld"](50,0,null,null,9,"div",[],null,null,null,null,null)),(l()(),e["\u0275eld"](51,0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Sign up"])),(l()(),e["\u0275eld"](53,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."])),(l()(),e["\u0275eld"](55,0,null,null,4,"a",[],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var d=!0;return"click"===n&&(d=!1!==e["\u0275nov"](l,56).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&d),d},null,null)),e["\u0275did"](56,671744,null,0,f.o,[f.l,f.a,y.h],{routerLink:[0,"routerLink"]},null),e["\u0275pad"](57,1),(l()(),e["\u0275eld"](58,0,null,null,1,"button",[["class","btn btn-primary active mt-3"],["type","button"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Register Now!"]))],function(l,n){var u=n.component;l(n,23,0,""),l(n,26,0,"username",u.username),l(n,35,0,""),l(n,38,0,"password",u.password);var e=l(n,57,0,"/register");l(n,56,0,e)},function(l,n){l(n,8,0,e["\u0275nov"](n,12).ngClassUntouched,e["\u0275nov"](n,12).ngClassTouched,e["\u0275nov"](n,12).ngClassPristine,e["\u0275nov"](n,12).ngClassDirty,e["\u0275nov"](n,12).ngClassValid,e["\u0275nov"](n,12).ngClassInvalid,e["\u0275nov"](n,12).ngClassPending),l(n,21,0,e["\u0275nov"](n,23).required?"":null,e["\u0275nov"](n,28).ngClassUntouched,e["\u0275nov"](n,28).ngClassTouched,e["\u0275nov"](n,28).ngClassPristine,e["\u0275nov"](n,28).ngClassDirty,e["\u0275nov"](n,28).ngClassValid,e["\u0275nov"](n,28).ngClassInvalid,e["\u0275nov"](n,28).ngClassPending),l(n,33,0,e["\u0275nov"](n,35).required?"":null,e["\u0275nov"](n,40).ngClassUntouched,e["\u0275nov"](n,40).ngClassTouched,e["\u0275nov"](n,40).ngClassPristine,e["\u0275nov"](n,40).ngClassDirty,e["\u0275nov"](n,40).ngClassValid,e["\u0275nov"](n,40).ngClassInvalid,e["\u0275nov"](n,40).ngClassPending),l(n,55,0,e["\u0275nov"](n,56).target,e["\u0275nov"](n,56).href)})}function k(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"app-dashboard",[],null,null,null,w,C)),e["\u0275did"](1,114688,null,0,s,[b.e,f.l,d.a,t.a,i],null,null)],function(l,n){l(n,1,0)},null)}var x=e["\u0275ccf"]("app-dashboard",s,k,{},{},[]),I=u("eDkP"),R=u("Fzqc"),q=u("4tE/"),j=u("M2Lx"),L=u("Wf4p"),P=u("wmQ5"),M=u("o3x0"),S=u("jQLj"),T=u("mVsa"),F=u("dWZg"),_=u("uGex"),K=u("v9Dh"),N=u("ZYjt"),V=u("4epT"),Y=u("OkvK"),D=u("lLAP"),E=u("OBdK"),O=u("nl+3"),W=u("JbBL"),Z=u("4c35"),B=u("qAlS"),U=u("6Wmm"),A=u("BgWK"),J=u("UodH"),Q=u("u7R8"),z=u("FVSy"),G=u("de3e"),H=u("/dO6"),X=u("Lwpp"),$=u("SMsm"),ll=u("LC5p"),nl=u("YhbO"),ul=u("jlZm"),el=u("r43C"),dl=u("/VYK"),tl=u("seP3"),ol=u("b716"),al=u("0/Q6"),il=u("Z+uX"),sl=u("Blfk"),pl=u("9It4"),rl=u("Nsh5"),cl=u("w+lc"),ml=u("kWGw"),gl=u("vARd"),vl=u("y4qS"),hl=u("BHnd"),bl=u("La40"),fl=u("8mMr"),yl=u("J12g"),Cl=u("QPkF"),wl=u("YSh2");u.d(n,"LoginModuleNgFactory",function(){return kl});var kl=e["\u0275cmf"](p,[],function(l){return e["\u0275mod"]([e["\u0275mpd"](512,e.ComponentFactoryResolver,e["\u0275CodegenComponentFactoryResolver"],[[8,[r.a,c.a,m.b,m.a,g.a,v.a,v.b,h.a,x]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e["\u0275mpd"](4608,b.u,b.u,[]),e["\u0275mpd"](4608,y.m,y.l,[e.LOCALE_ID,[2,y.w]]),e["\u0275mpd"](4608,I.c,I.c,[I.i,I.e,e.ComponentFactoryResolver,I.h,I.f,e.Injector,e.NgZone,y.d,R.b,[2,y.g]]),e["\u0275mpd"](5120,I.j,I.k,[I.c]),e["\u0275mpd"](5120,q.a,q.b,[I.c]),e["\u0275mpd"](4608,j.c,j.c,[]),e["\u0275mpd"](4608,L.d,L.d,[]),e["\u0275mpd"](5120,P.b,P.a,[[3,P.b]]),e["\u0275mpd"](5120,M.c,M.d,[I.c]),e["\u0275mpd"](135680,M.e,M.e,[I.c,e.Injector,[2,y.g],[2,M.b],M.c,[3,M.e],I.e]),e["\u0275mpd"](4608,S.h,S.h,[]),e["\u0275mpd"](5120,S.a,S.b,[I.c]),e["\u0275mpd"](5120,T.a,T.c,[I.c]),e["\u0275mpd"](4608,L.c,L.y,[[2,L.h],F.a]),e["\u0275mpd"](5120,_.a,_.b,[I.c]),e["\u0275mpd"](5120,K.a,K.b,[I.c]),e["\u0275mpd"](4608,N.f,L.e,[[2,L.i],[2,L.n]]),e["\u0275mpd"](5120,V.b,V.a,[[3,V.b]]),e["\u0275mpd"](5120,Y.b,Y.a,[[3,Y.b]]),e["\u0275mpd"](135680,D.g,D.g,[e.NgZone,F.a]),e["\u0275mpd"](4608,E.e,E.e,[e.TemplateRef]),e["\u0275mpd"](4608,d.a,d.a,[f.l]),e["\u0275mpd"](4608,O.a,O.a,[d.a,f.l]),e["\u0275mpd"](4608,t.a,t.a,[f.l]),e["\u0275mpd"](4608,W.a,W.a,[d.a,f.l]),e["\u0275mpd"](1073742336,b.s,b.s,[]),e["\u0275mpd"](1073742336,b.g,b.g,[]),e["\u0275mpd"](1073742336,R.a,R.a,[]),e["\u0275mpd"](1073742336,L.n,L.n,[[2,L.f],[2,N.g]]),e["\u0275mpd"](1073742336,F.b,F.b,[]),e["\u0275mpd"](1073742336,L.x,L.x,[]),e["\u0275mpd"](1073742336,y.c,y.c,[]),e["\u0275mpd"](1073742336,L.v,L.v,[]),e["\u0275mpd"](1073742336,L.s,L.s,[]),e["\u0275mpd"](1073742336,Z.g,Z.g,[]),e["\u0275mpd"](1073742336,B.c,B.c,[]),e["\u0275mpd"](1073742336,I.g,I.g,[]),e["\u0275mpd"](1073742336,q.c,q.c,[]),e["\u0275mpd"](1073742336,j.d,j.d,[]),e["\u0275mpd"](1073742336,D.a,D.a,[]),e["\u0275mpd"](1073742336,U.a,U.a,[]),e["\u0275mpd"](1073742336,A.c,A.c,[]),e["\u0275mpd"](1073742336,J.c,J.c,[]),e["\u0275mpd"](1073742336,Q.a,Q.a,[]),e["\u0275mpd"](1073742336,z.c,z.c,[]),e["\u0275mpd"](1073742336,G.a,G.a,[]),e["\u0275mpd"](1073742336,H.b,H.b,[]),e["\u0275mpd"](1073742336,X.e,X.e,[]),e["\u0275mpd"](1073742336,$.a,$.a,[]),e["\u0275mpd"](1073742336,P.c,P.c,[]),e["\u0275mpd"](1073742336,M.i,M.i,[]),e["\u0275mpd"](1073742336,S.i,S.i,[]),e["\u0275mpd"](1073742336,ll.a,ll.a,[]),e["\u0275mpd"](1073742336,nl.c,nl.c,[]),e["\u0275mpd"](1073742336,ul.a,ul.a,[]),e["\u0275mpd"](1073742336,L.o,L.o,[]),e["\u0275mpd"](1073742336,el.a,el.a,[]),e["\u0275mpd"](1073742336,dl.c,dl.c,[]),e["\u0275mpd"](1073742336,tl.e,tl.e,[]),e["\u0275mpd"](1073742336,ol.b,ol.b,[]),e["\u0275mpd"](1073742336,al.a,al.a,[]),e["\u0275mpd"](1073742336,T.b,T.b,[]),e["\u0275mpd"](1073742336,L.z,L.z,[]),e["\u0275mpd"](1073742336,L.p,L.p,[]),e["\u0275mpd"](1073742336,_.d,_.d,[]),e["\u0275mpd"](1073742336,K.c,K.c,[]),e["\u0275mpd"](1073742336,V.c,V.c,[]),e["\u0275mpd"](1073742336,il.a,il.a,[]),e["\u0275mpd"](1073742336,sl.c,sl.c,[]),e["\u0275mpd"](1073742336,pl.a,pl.a,[]),e["\u0275mpd"](1073742336,rl.a,rl.a,[]),e["\u0275mpd"](1073742336,cl.a,cl.a,[]),e["\u0275mpd"](1073742336,ml.a,ml.a,[]),e["\u0275mpd"](1073742336,gl.d,gl.d,[]),e["\u0275mpd"](1073742336,Y.c,Y.c,[]),e["\u0275mpd"](1073742336,vl.p,vl.p,[]),e["\u0275mpd"](1073742336,hl.m,hl.m,[]),e["\u0275mpd"](1073742336,bl.a,bl.a,[]),e["\u0275mpd"](1073742336,fl.a,fl.a,[]),e["\u0275mpd"](1073742336,E.c,E.c,[]),e["\u0275mpd"](1073742336,yl.a,yl.a,[]),e["\u0275mpd"](1073742336,Cl.a,Cl.a,[]),e["\u0275mpd"](1073742336,f.p,f.p,[[2,f.v],[2,f.l]]),e["\u0275mpd"](1073742336,p,p,[]),e["\u0275mpd"](256,H.a,{separatorKeyCodes:[wl.f]},[]),e["\u0275mpd"](256,L.g,L.k,[]),e["\u0275mpd"](1024,f.j,function(){return[[{path:"",component:s}]]},[])])})}}]);