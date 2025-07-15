"use client";
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
exports.Separator = Separator;
const React = __importStar(require("react"));
const SeparatorPrimitive = __importStar(require("@radix-ui/react-separator"));
const utils_1 = require("@/lib/utils");
function Separator({ className, orientation = "horizontal", decorative = true, ...props }) {
    return (<SeparatorPrimitive.Root data-slot="separator" decorative={decorative} orientation={orientation} className={(0, utils_1.cn)("bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px", className)} {...props}/>);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VwYXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VwYXJhdG9yLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJILDhCQUFTO0FBekJsQiw2Q0FBOEI7QUFDOUIsOEVBQStEO0FBRS9ELHVDQUFnQztBQUVoQyxTQUFTLFNBQVMsQ0FBQyxFQUNqQixTQUFTLEVBQ1QsV0FBVyxHQUFHLFlBQVksRUFDMUIsVUFBVSxHQUFHLElBQUksRUFDakIsR0FBRyxLQUFLLEVBQzZDO0lBQ3JELE9BQU8sQ0FDTCxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FDdEIsU0FBUyxDQUFDLFdBQVcsQ0FDckIsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQ3ZCLFdBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUN6QixTQUFTLENBQUMsQ0FBQyxJQUFBLFVBQUUsRUFDWCxnS0FBZ0ssRUFDaEssU0FBUyxDQUNWLENBQUMsQ0FDRixJQUFJLEtBQUssQ0FBQyxFQUNWLENBQ0gsQ0FBQTtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0ICogYXMgU2VwYXJhdG9yUHJpbWl0aXZlIGZyb20gXCJAcmFkaXgtdWkvcmVhY3Qtc2VwYXJhdG9yXCJcclxuXHJcbmltcG9ydCB7IGNuIH0gZnJvbSBcIkAvbGliL3V0aWxzXCJcclxuXHJcbmZ1bmN0aW9uIFNlcGFyYXRvcih7XHJcbiAgY2xhc3NOYW1lLFxyXG4gIG9yaWVudGF0aW9uID0gXCJob3Jpem9udGFsXCIsXHJcbiAgZGVjb3JhdGl2ZSA9IHRydWUsXHJcbiAgLi4ucHJvcHNcclxufTogUmVhY3QuQ29tcG9uZW50UHJvcHM8dHlwZW9mIFNlcGFyYXRvclByaW1pdGl2ZS5Sb290Pikge1xyXG4gIHJldHVybiAoXHJcbiAgICA8U2VwYXJhdG9yUHJpbWl0aXZlLlJvb3RcclxuICAgICAgZGF0YS1zbG90PVwic2VwYXJhdG9yXCJcclxuICAgICAgZGVjb3JhdGl2ZT17ZGVjb3JhdGl2ZX1cclxuICAgICAgb3JpZW50YXRpb249e29yaWVudGF0aW9ufVxyXG4gICAgICBjbGFzc05hbWU9e2NuKFxyXG4gICAgICAgIFwiYmctYm9yZGVyIHNocmluay0wIGRhdGEtW29yaWVudGF0aW9uPWhvcml6b250YWxdOmgtcHggZGF0YS1bb3JpZW50YXRpb249aG9yaXpvbnRhbF06dy1mdWxsIGRhdGEtW29yaWVudGF0aW9uPXZlcnRpY2FsXTpoLWZ1bGwgZGF0YS1bb3JpZW50YXRpb249dmVydGljYWxdOnctcHhcIixcclxuICAgICAgICBjbGFzc05hbWVcclxuICAgICAgKX1cclxuICAgICAgey4uLnByb3BzfVxyXG4gICAgLz5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCB7IFNlcGFyYXRvciB9XHJcbiJdfQ==