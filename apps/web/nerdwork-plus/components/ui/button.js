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
exports.buttonVariants = void 0;
exports.Button = Button;
const React = __importStar(require("react"));
const react_slot_1 = require("@radix-ui/react-slot");
const class_variance_authority_1 = require("class-variance-authority");
const utils_1 = require("@/lib/utils");
const buttonVariants = (0, class_variance_authority_1.cva)("inline-flex items-center font-inter cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
            primary: "bg-[#3373D9] text-primary-foreground shadow-xs hover:bg-[#3373D9]/80",
            dull: "bg-[#343435] text-primary-foreground shadow-xs hover:bg-[#343435]/80",
            destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9",
        },
    },
    defaultVariants: {
        variant: "dull",
        size: "default",
    },
});
exports.buttonVariants = buttonVariants;
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? react_slot_1.Slot : "button";
    return (<Comp data-slot="button" className={(0, utils_1.cn)(buttonVariants({ variant, size, className }))} {...props}/>);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV0dG9uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZEUyx3QkFBTTtBQTdEZiw2Q0FBK0I7QUFDL0IscURBQTRDO0FBQzVDLHVFQUFrRTtBQUVsRSx1Q0FBaUM7QUFFakMsTUFBTSxjQUFjLEdBQUcsSUFBQSw4QkFBRyxFQUN4Qix1ZEFBdWQsRUFDdmQ7SUFDRSxRQUFRLEVBQUU7UUFDUixPQUFPLEVBQUU7WUFDUCxPQUFPLEVBQ0wsa0VBQWtFO1lBQ3BFLE9BQU8sRUFDTCxzRUFBc0U7WUFDeEUsSUFBSSxFQUFFLHNFQUFzRTtZQUM1RSxXQUFXLEVBQ1QsNkpBQTZKO1lBQy9KLE9BQU8sRUFDTCx1SUFBdUk7WUFDekksU0FBUyxFQUNQLHdFQUF3RTtZQUMxRSxLQUFLLEVBQ0gsc0VBQXNFO1lBQ3hFLElBQUksRUFBRSxpREFBaUQ7U0FDeEQ7UUFDRCxJQUFJLEVBQUU7WUFDSixPQUFPLEVBQUUsK0JBQStCO1lBQ3hDLEVBQUUsRUFBRSwrQ0FBK0M7WUFDbkQsRUFBRSxFQUFFLHNDQUFzQztZQUMxQyxJQUFJLEVBQUUsUUFBUTtTQUNmO0tBQ0Y7SUFDRCxlQUFlLEVBQUU7UUFDZixPQUFPLEVBQUUsTUFBTTtRQUNmLElBQUksRUFBRSxTQUFTO0tBQ2hCO0NBQ0YsQ0FDRixDQUFDO0FBdUJlLHdDQUFjO0FBckIvQixTQUFTLE1BQU0sQ0FBQyxFQUNkLFNBQVMsRUFDVCxPQUFPLEVBQ1AsSUFBSSxFQUNKLE9BQU8sR0FBRyxLQUFLLEVBQ2YsR0FBRyxLQUFLLEVBSVA7SUFDRCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLGlCQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUV2QyxPQUFPLENBQ0wsQ0FBQyxJQUFJLENBQ0gsU0FBUyxDQUFDLFFBQVEsQ0FDbEIsU0FBUyxDQUFDLENBQUMsSUFBQSxVQUFFLEVBQUMsY0FBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FDNUQsSUFBSSxLQUFLLENBQUMsRUFDVixDQUNILENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IFNsb3QgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXNsb3RcIjtcclxuaW1wb3J0IHsgY3ZhLCB0eXBlIFZhcmlhbnRQcm9wcyB9IGZyb20gXCJjbGFzcy12YXJpYW5jZS1hdXRob3JpdHlcIjtcclxuXHJcbmltcG9ydCB7IGNuIH0gZnJvbSBcIkAvbGliL3V0aWxzXCI7XHJcblxyXG5jb25zdCBidXR0b25WYXJpYW50cyA9IGN2YShcclxuICBcImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBmb250LWludGVyIGN1cnNvci1wb2ludGVyIGp1c3RpZnktY2VudGVyIGdhcC0yIHdoaXRlc3BhY2Utbm93cmFwIHJvdW5kZWQtbWQgdGV4dC1zbSBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWFsbCBkaXNhYmxlZDpwb2ludGVyLWV2ZW50cy1ub25lIGRpc2FibGVkOm9wYWNpdHktNTAgWyZfc3ZnXTpwb2ludGVyLWV2ZW50cy1ub25lIFsmX3N2Zzpub3QoW2NsYXNzKj0nc2l6ZS0nXSldOnNpemUtNCBzaHJpbmstMCBbJl9zdmddOnNocmluay0wIG91dGxpbmUtbm9uZSBmb2N1cy12aXNpYmxlOmJvcmRlci1yaW5nIGZvY3VzLXZpc2libGU6cmluZy1yaW5nLzUwIGZvY3VzLXZpc2libGU6cmluZy1bM3B4XSBhcmlhLWludmFsaWQ6cmluZy1kZXN0cnVjdGl2ZS8yMCBkYXJrOmFyaWEtaW52YWxpZDpyaW5nLWRlc3RydWN0aXZlLzQwIGFyaWEtaW52YWxpZDpib3JkZXItZGVzdHJ1Y3RpdmVcIixcclxuICB7XHJcbiAgICB2YXJpYW50czoge1xyXG4gICAgICB2YXJpYW50OiB7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIFwiYmctcHJpbWFyeSB0ZXh0LXByaW1hcnktZm9yZWdyb3VuZCBzaGFkb3cteHMgaG92ZXI6YmctcHJpbWFyeS85MFwiLFxyXG4gICAgICAgIHByaW1hcnk6XHJcbiAgICAgICAgICBcImJnLVsjMzM3M0Q5XSB0ZXh0LXByaW1hcnktZm9yZWdyb3VuZCBzaGFkb3cteHMgaG92ZXI6YmctWyMzMzczRDldLzgwXCIsXHJcbiAgICAgICAgZHVsbDogXCJiZy1bIzM0MzQzNV0gdGV4dC1wcmltYXJ5LWZvcmVncm91bmQgc2hhZG93LXhzIGhvdmVyOmJnLVsjMzQzNDM1XS84MFwiLFxyXG4gICAgICAgIGRlc3RydWN0aXZlOlxyXG4gICAgICAgICAgXCJiZy1kZXN0cnVjdGl2ZSB0ZXh0LXdoaXRlIHNoYWRvdy14cyBob3ZlcjpiZy1kZXN0cnVjdGl2ZS85MCBmb2N1cy12aXNpYmxlOnJpbmctZGVzdHJ1Y3RpdmUvMjAgZGFyazpmb2N1cy12aXNpYmxlOnJpbmctZGVzdHJ1Y3RpdmUvNDAgZGFyazpiZy1kZXN0cnVjdGl2ZS82MFwiLFxyXG4gICAgICAgIG91dGxpbmU6XHJcbiAgICAgICAgICBcImJvcmRlciBiZy1iYWNrZ3JvdW5kIHNoYWRvdy14cyBob3ZlcjpiZy1hY2NlbnQgaG92ZXI6dGV4dC1hY2NlbnQtZm9yZWdyb3VuZCBkYXJrOmJnLWlucHV0LzMwIGRhcms6Ym9yZGVyLWlucHV0IGRhcms6aG92ZXI6YmctaW5wdXQvNTBcIixcclxuICAgICAgICBzZWNvbmRhcnk6XHJcbiAgICAgICAgICBcImJnLXNlY29uZGFyeSB0ZXh0LXNlY29uZGFyeS1mb3JlZ3JvdW5kIHNoYWRvdy14cyBob3ZlcjpiZy1zZWNvbmRhcnkvODBcIixcclxuICAgICAgICBnaG9zdDpcclxuICAgICAgICAgIFwiaG92ZXI6YmctYWNjZW50IGhvdmVyOnRleHQtYWNjZW50LWZvcmVncm91bmQgZGFyazpob3ZlcjpiZy1hY2NlbnQvNTBcIixcclxuICAgICAgICBsaW5rOiBcInRleHQtcHJpbWFyeSB1bmRlcmxpbmUtb2Zmc2V0LTQgaG92ZXI6dW5kZXJsaW5lXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHNpemU6IHtcclxuICAgICAgICBkZWZhdWx0OiBcImgtOSBweC00IHB5LTIgaGFzLVs+c3ZnXTpweC0zXCIsXHJcbiAgICAgICAgc206IFwiaC04IHJvdW5kZWQtbWQgZ2FwLTEuNSBweC0zIGhhcy1bPnN2Z106cHgtMi41XCIsXHJcbiAgICAgICAgbGc6IFwiaC0xMCByb3VuZGVkLW1kIHB4LTYgaGFzLVs+c3ZnXTpweC00XCIsXHJcbiAgICAgICAgaWNvbjogXCJzaXplLTlcIixcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBkZWZhdWx0VmFyaWFudHM6IHtcclxuICAgICAgdmFyaWFudDogXCJkdWxsXCIsXHJcbiAgICAgIHNpemU6IFwiZGVmYXVsdFwiLFxyXG4gICAgfSxcclxuICB9XHJcbik7XHJcblxyXG5mdW5jdGlvbiBCdXR0b24oe1xyXG4gIGNsYXNzTmFtZSxcclxuICB2YXJpYW50LFxyXG4gIHNpemUsXHJcbiAgYXNDaGlsZCA9IGZhbHNlLFxyXG4gIC4uLnByb3BzXHJcbn06IFJlYWN0LkNvbXBvbmVudFByb3BzPFwiYnV0dG9uXCI+ICZcclxuICBWYXJpYW50UHJvcHM8dHlwZW9mIGJ1dHRvblZhcmlhbnRzPiAmIHtcclxuICAgIGFzQ2hpbGQ/OiBib29sZWFuO1xyXG4gIH0pIHtcclxuICBjb25zdCBDb21wID0gYXNDaGlsZCA/IFNsb3QgOiBcImJ1dHRvblwiO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPENvbXBcclxuICAgICAgZGF0YS1zbG90PVwiYnV0dG9uXCJcclxuICAgICAgY2xhc3NOYW1lPXtjbihidXR0b25WYXJpYW50cyh7IHZhcmlhbnQsIHNpemUsIGNsYXNzTmFtZSB9KSl9XHJcbiAgICAgIHsuLi5wcm9wc31cclxuICAgIC8+XHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IHsgQnV0dG9uLCBidXR0b25WYXJpYW50cyB9O1xyXG4iXX0=