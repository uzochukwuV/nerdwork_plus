"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = Input;
const React = __importStar(require("react"));
const utils_1 = require("@/lib/utils");
function Input({ className, type, ...props }) {
    return (<input type={type} data-slot="input" className={(0, utils_1.cn)("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", className)} {...props}/>);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnB1dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CUyxzQkFBSztBQXBCZCw2Q0FBOEI7QUFFOUIsdUNBQWdDO0FBRWhDLFNBQVMsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxHQUFHLEtBQUssRUFBaUM7SUFDekUsT0FBTyxDQUNMLENBQUMsS0FBSyxDQUNKLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUNYLFNBQVMsQ0FBQyxPQUFPLENBQ2pCLFNBQVMsQ0FBQyxDQUFDLElBQUEsVUFBRSxFQUNYLGljQUFpYyxFQUNqYywrRUFBK0UsRUFDL0Usd0dBQXdHLEVBQ3hHLFNBQVMsQ0FDVixDQUFDLENBQ0YsSUFBSSxLQUFLLENBQUMsRUFDVixDQUNILENBQUE7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCB7IGNuIH0gZnJvbSBcIkAvbGliL3V0aWxzXCJcclxuXHJcbmZ1bmN0aW9uIElucHV0KHsgY2xhc3NOYW1lLCB0eXBlLCAuLi5wcm9wcyB9OiBSZWFjdC5Db21wb25lbnRQcm9wczxcImlucHV0XCI+KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxpbnB1dFxyXG4gICAgICB0eXBlPXt0eXBlfVxyXG4gICAgICBkYXRhLXNsb3Q9XCJpbnB1dFwiXHJcbiAgICAgIGNsYXNzTmFtZT17Y24oXHJcbiAgICAgICAgXCJmaWxlOnRleHQtZm9yZWdyb3VuZCBwbGFjZWhvbGRlcjp0ZXh0LW11dGVkLWZvcmVncm91bmQgc2VsZWN0aW9uOmJnLXByaW1hcnkgc2VsZWN0aW9uOnRleHQtcHJpbWFyeS1mb3JlZ3JvdW5kIGRhcms6YmctaW5wdXQvMzAgYm9yZGVyLWlucHV0IGZsZXggaC05IHctZnVsbCBtaW4tdy0wIHJvdW5kZWQtbWQgYm9yZGVyIGJnLXRyYW5zcGFyZW50IHB4LTMgcHktMSB0ZXh0LWJhc2Ugc2hhZG93LXhzIHRyYW5zaXRpb24tW2NvbG9yLGJveC1zaGFkb3ddIG91dGxpbmUtbm9uZSBmaWxlOmlubGluZS1mbGV4IGZpbGU6aC03IGZpbGU6Ym9yZGVyLTAgZmlsZTpiZy10cmFuc3BhcmVudCBmaWxlOnRleHQtc20gZmlsZTpmb250LW1lZGl1bSBkaXNhYmxlZDpwb2ludGVyLWV2ZW50cy1ub25lIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCBkaXNhYmxlZDpvcGFjaXR5LTUwIG1kOnRleHQtc21cIixcclxuICAgICAgICBcImZvY3VzLXZpc2libGU6Ym9yZGVyLXJpbmcgZm9jdXMtdmlzaWJsZTpyaW5nLXJpbmcvNTAgZm9jdXMtdmlzaWJsZTpyaW5nLVszcHhdXCIsXHJcbiAgICAgICAgXCJhcmlhLWludmFsaWQ6cmluZy1kZXN0cnVjdGl2ZS8yMCBkYXJrOmFyaWEtaW52YWxpZDpyaW5nLWRlc3RydWN0aXZlLzQwIGFyaWEtaW52YWxpZDpib3JkZXItZGVzdHJ1Y3RpdmVcIixcclxuICAgICAgICBjbGFzc05hbWVcclxuICAgICAgKX1cclxuICAgICAgey4uLnByb3BzfVxyXG4gICAgLz5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCB7IElucHV0IH1cclxuIl19