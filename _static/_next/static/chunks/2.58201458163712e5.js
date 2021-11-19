"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2],{8002:function(e,n,o){o.r(n),o.d(n,{default:function(){return he}});var t=o(28520),r=o.n(t),l=o(85893),a=o(67294),i=o(74201),c=o(63366),s=o(87462),u=(o(45697),o(86010)),d=o(27192),f=o(11496),p=o(33616),m=o(28979),b=o(76087);function h(e){return(0,m.Z)("MuiFormGroup",e)}(0,b.Z)("MuiFormGroup",["root","row"]);const g=["className","row"],v=(0,f.ZP)("div",{name:"MuiFormGroup",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:o}=e;return[n.root,o.row&&n.row]}})((({ownerState:e})=>(0,s.Z)({display:"flex",flexDirection:"column",flexWrap:"wrap"},e.row&&{flexDirection:"row"})));var y=a.forwardRef((function(e,n){const o=(0,p.Z)({props:e,name:"MuiFormGroup"}),{className:t,row:r=!1}=o,a=(0,c.Z)(o,g),i=(0,s.Z)({},o,{row:r}),f=(e=>{const{classes:n,row:o}=e,t={root:["root",o&&"row"]};return(0,d.Z)(t,h,n)})(i);return(0,l.jsx)(v,(0,s.Z)({className:(0,u.Z)(f.root,t),ownerState:i,ref:n},a))})),x=o(54776),Z=o(2734),w=o(98396),j=o(50657),k=o(37645),P=o(6514),O=o(15861),S=o(99226),C=o(31425),F=o(11057),R=o(42283),L=o(33522),M=o(74423),B=o(98216);function I(e){return(0,m.Z)("MuiFormControlLabel",e)}var z=(0,b.Z)("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label"]);const N=["checked","className","componentsProps","control","disabled","disableTypography","inputRef","label","labelPlacement","name","onChange","value"],E=(0,f.ZP)("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:o}=e;return[{[`& .${z.label}`]:n.label},n.root,n[`labelPlacement${(0,B.Z)(o.labelPlacement)}`]]}})((({theme:e,ownerState:n})=>(0,s.Z)({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,[`&.${z.disabled}`]:{cursor:"default"}},"start"===n.labelPlacement&&{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},"top"===n.labelPlacement&&{flexDirection:"column-reverse",marginLeft:16},"bottom"===n.labelPlacement&&{flexDirection:"column",marginLeft:16},{[`& .${z.label}`]:{[`&.${z.disabled}`]:{color:e.palette.text.disabled}}})));var q=a.forwardRef((function(e,n){const o=(0,p.Z)({props:e,name:"MuiFormControlLabel"}),{className:t,componentsProps:r={},control:i,disabled:f,disableTypography:m,label:b,labelPlacement:h="end"}=o,g=(0,c.Z)(o,N),v=(0,M.Z)();let y=f;"undefined"===typeof y&&"undefined"!==typeof i.props.disabled&&(y=i.props.disabled),"undefined"===typeof y&&v&&(y=v.disabled);const x={disabled:y};["checked","name","onChange","value","inputRef"].forEach((e=>{"undefined"===typeof i.props[e]&&"undefined"!==typeof o[e]&&(x[e]=o[e])}));const Z=(0,s.Z)({},o,{disabled:y,label:b,labelPlacement:h}),w=(e=>{const{classes:n,disabled:o,labelPlacement:t}=e,r={root:["root",o&&"disabled",`labelPlacement${(0,B.Z)(t)}`],label:["label",o&&"disabled"]};return(0,d.Z)(r,I,n)})(Z);return(0,l.jsxs)(E,(0,s.Z)({className:(0,u.Z)(w.root,t),ownerState:Z,ref:n},g,{children:[a.cloneElement(i,x),b.type===O.Z||m?b:(0,l.jsx)(O.Z,(0,s.Z)({component:"span",className:w.label},r.typography,{children:b}))]}))})),$=o(41796),D=o(22627),H=o(82607);function W(e){return(0,m.Z)("PrivateSwitchBase",e)}(0,b.Z)("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);const V=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],G=(0,f.ZP)(H.Z,{skipSx:!0})((({ownerState:e})=>(0,s.Z)({padding:9,borderRadius:"50%"},"start"===e.edge&&{marginLeft:"small"===e.size?-3:-12},"end"===e.edge&&{marginRight:"small"===e.size?-3:-12}))),T=(0,f.ZP)("input",{skipSx:!0})({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1});var _=a.forwardRef((function(e,n){const{autoFocus:o,checked:t,checkedIcon:r,className:a,defaultChecked:i,disabled:f,disableFocusRipple:p=!1,edge:m=!1,icon:b,id:h,inputProps:g,inputRef:v,name:y,onBlur:x,onChange:Z,onFocus:w,readOnly:j,required:k,tabIndex:P,type:O,value:S}=e,C=(0,c.Z)(e,V),[F,R]=(0,D.Z)({controlled:t,default:Boolean(i),name:"SwitchBase",state:"checked"}),L=(0,M.Z)();let I=f;L&&"undefined"===typeof I&&(I=L.disabled);const z="checkbox"===O||"radio"===O,N=(0,s.Z)({},e,{checked:F,disabled:I,disableFocusRipple:p,edge:m}),E=(e=>{const{classes:n,checked:o,disabled:t,edge:r}=e,l={root:["root",o&&"checked",t&&"disabled",r&&`edge${(0,B.Z)(r)}`],input:["input"]};return(0,d.Z)(l,W,n)})(N);return(0,l.jsxs)(G,(0,s.Z)({component:"span",className:(0,u.Z)(E.root,a),centerRipple:!0,focusRipple:!p,disabled:I,tabIndex:null,role:void 0,onFocus:e=>{w&&w(e),L&&L.onFocus&&L.onFocus(e)},onBlur:e=>{x&&x(e),L&&L.onBlur&&L.onBlur(e)},ownerState:N,ref:n},C,{children:[(0,l.jsx)(T,(0,s.Z)({autoFocus:o,checked:t,defaultChecked:i,className:E.input,disabled:I,id:z&&h,name:y,onChange:e=>{if(e.nativeEvent.defaultPrevented)return;const n=e.target.checked;R(n),Z&&Z(e,n)},readOnly:j,ref:v,required:k,ownerState:N,tabIndex:P,type:O},"checkbox"===O&&void 0===S?{}:{value:S},g)),F?r:b]}))})),A=o(88169),Q=(0,A.Z)((0,l.jsx)("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),U=(0,A.Z)((0,l.jsx)("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),J=(0,A.Z)((0,l.jsx)("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");function K(e){return(0,m.Z)("MuiCheckbox",e)}var X=(0,b.Z)("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary"]);const Y=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size"],ee=(0,f.ZP)(_,{shouldForwardProp:e=>(0,f.FO)(e)||"classes"===e,name:"MuiCheckbox",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:o}=e;return[n.root,o.indeterminate&&n.indeterminate,"default"!==o.color&&n[`color${(0,B.Z)(o.color)}`]]}})((({theme:e,ownerState:n})=>(0,s.Z)({color:e.palette.text.secondary},!n.disableRipple&&{"&:hover":{backgroundColor:(0,$.Fq)("default"===n.color?e.palette.action.active:e.palette[n.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"default"!==n.color&&{[`&.${X.checked}, &.${X.indeterminate}`]:{color:e.palette[n.color].main},[`&.${X.disabled}`]:{color:e.palette.action.disabled}}))),ne=(0,l.jsx)(U,{}),oe=(0,l.jsx)(Q,{}),te=(0,l.jsx)(J,{});var re=a.forwardRef((function(e,n){var o,t;const r=(0,p.Z)({props:e,name:"MuiCheckbox"}),{checkedIcon:i=ne,color:u="primary",icon:f=oe,indeterminate:m=!1,indeterminateIcon:b=te,inputProps:h,size:g="medium"}=r,v=(0,c.Z)(r,Y),y=m?b:f,x=m?b:i,Z=(0,s.Z)({},r,{color:u,indeterminate:m,size:g}),w=(e=>{const{classes:n,indeterminate:o,color:t}=e,r={root:["root",o&&"indeterminate",`color${(0,B.Z)(t)}`]},l=(0,d.Z)(r,K,n);return(0,s.Z)({},n,l)})(Z);return(0,l.jsx)(ee,(0,s.Z)({type:"checkbox",inputProps:(0,s.Z)({"data-indeterminate":m},h),icon:a.cloneElement(y,{fontSize:null!=(o=y.props.fontSize)?o:g}),checkedIcon:a.cloneElement(x,{fontSize:null!=(t=x.props.fontSize)?t:g}),ownerState:Z,ref:n},v,{classes:w}))}));function le(e,n,o){return n in e?Object.defineProperty(e,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[n]=o,e}function ae(e){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{},t=Object.keys(o);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(o).filter((function(e){return Object.getOwnPropertyDescriptor(o,e).enumerable})))),t.forEach((function(n){le(e,n,o[n])}))}return e}function ie(e,n){if(null==e)return{};var o,t,r=function(e,n){if(null==e)return{};var o,t,r={},l=Object.keys(e);for(t=0;t<l.length;t++)o=l[t],n.indexOf(o)>=0||(r[o]=e[o]);return r}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(t=0;t<l.length;t++)o=l[t],n.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(r[o]=e[o])}return r}var ce=function(e){var n=e.control,o=e.name,t=e.required,r=void 0!==t&&t,a=e.label,i=ie(e,["control","name","required","label"]),c=(0,R.bc)({name:o,control:n,rules:{required:r},defaultValue:!1,shouldUnregister:!0}).field,s=c.onChange,u=c.onBlur,d=c.name,f=c.value,p=c.ref;return(0,l.jsx)(q,{control:(0,l.jsx)(re,ae({onChange:s,onBlur:u,value:f,name:d,inputRef:p},i)),label:a||d})},se=o(88767),ue=o(31812),de=o(9669),fe=o.n(de);function pe(e,n,o,t,r,l,a){try{var i=e[l](a),c=i.value}catch(s){return void o(s)}i.done?n(c):Promise.resolve(c).then(t,r)}function me(e,n,o){return n in e?Object.defineProperty(e,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[n]=o,e}var be=(0,a.forwardRef)((function(e,n){return(0,l.jsx)(x.Z,function(e){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{},t=Object.keys(o);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(o).filter((function(e){return Object.getOwnPropertyDescriptor(o,e).enumerable})))),t.forEach((function(n){me(e,n,o[n])}))}return e}({direction:"up",ref:n},e))}));function he(e){var n,o=e.open,t=e.setOpen,a=(0,se.useQueryClient)(),c=(0,R.cI)(),s=c.control,u=c.handleSubmit,d=function(){t(!1)},f=(0,se.useMutation)((function(e){return fe().post("/api/meals",e)}),{onSuccess:function(){a.invalidateQueries("meals"),d()}}),p=(n=r().mark((function e(n){return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:f.mutate(n);case 1:case"end":return e.stop()}}),e)})),function(){var e=this,o=arguments;return new Promise((function(t,r){var l=n.apply(e,o);function a(e){pe(l,t,r,a,i,"next",e)}function i(e){pe(l,t,r,a,i,"throw",e)}a(void 0)}))}),m=(0,Z.Z)(),b=(0,w.Z)(m.breakpoints.down("md"));return(0,l.jsxs)(j.Z,{open:o,fullScreen:b,onClose:d,TransitionComponent:be,children:[(0,l.jsxs)(k.Z,{children:["New Meal for ",(0,i.Z)(new Date,"eeee, LLLL do")]}),(0,l.jsxs)("form",{onSubmit:u(p),children:[(0,l.jsxs)(P.Z,{children:[(0,l.jsx)(L.Z,{name:"food",label:"Food",control:s,required:!0,fullWidth:!0,placeholder:"What did you eat?"}),(0,l.jsx)(L.Z,{name:"sugar",label:"Sugar Content (g)",control:s,required:!0,fullWidth:!0,placeholder:"How much sugar was in it?",type:"number"}),(0,l.jsx)(O.Z,{align:"center",children:"Mark all the points your food contained"}),(0,l.jsxs)(S.Z,{sx:{display:"flex",placeContent:"center"},children:[(0,l.jsxs)(y,{children:[(0,l.jsx)(ce,{name:"vegetables",label:"Vegetables",control:s}),(0,l.jsx)(ce,{name:"healthyFats",label:"Healthy Fats",control:s}),(0,l.jsx)(ce,{name:"fruitsNuts",label:"Fruits & Nuts",control:s}),(0,l.jsx)(ce,{name:"fishSeafood",label:"Fish & Seafood",control:s})]}),(0,l.jsxs)(y,{children:[(0,l.jsx)(ce,{name:"legumes",label:"Legumes",control:s}),(0,l.jsx)(ce,{name:"dairy",label:"Less than 7oz of Dairy",control:s}),(0,l.jsx)(ce,{name:"wholeGrains",label:"Whole Grains",control:s}),(0,l.jsx)(ce,{name:"meat",label:"Meat",control:s}),(0,l.jsx)(ce,{name:"alcohol",label:"Alcohol",control:s})]})]})]}),(0,l.jsxs)(C.Z,{children:[(0,l.jsx)(F.Z,{disabled:f.isLoading,fullWidth:!0,onClick:d,variant:"outlined",children:"Cancel"}),(0,l.jsx)(ue.Z,{loading:f.isLoading,fullWidth:!0,type:"submit",variant:"contained",children:"Log Meal"})]})]})]})}},33522:function(e,n,o){var t=o(85893),r=o(67473),l=o(42283);function a(e,n,o){return n in e?Object.defineProperty(e,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[n]=o,e}function i(e,n){if(null==e)return{};var o,t,r=function(e,n){if(null==e)return{};var o,t,r={},l=Object.keys(e);for(t=0;t<l.length;t++)o=l[t],n.indexOf(o)>=0||(r[o]=e[o]);return r}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(t=0;t<l.length;t++)o=l[t],n.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(r[o]=e[o])}return r}n.Z=function(e){var n=e.control,o=e.name,c=e.required,s=void 0!==c&&c,u=i(e,["control","name","required"]),d=(0,l.bc)({name:o,control:n,rules:{required:s},defaultValue:"",shouldUnregister:!0}).field,f=d.onChange,p=d.onBlur,m=d.name,b=d.value,h=d.ref;return(0,t.jsx)(r.Z,function(e){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{},t=Object.keys(o);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(o).filter((function(e){return Object.getOwnPropertyDescriptor(o,e).enumerable})))),t.forEach((function(n){a(e,n,o[n])}))}return e}({margin:"dense",onChange:f,onBlur:p,value:b,name:m,inputRef:h},u))}}}]);