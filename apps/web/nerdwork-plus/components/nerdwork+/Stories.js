"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Stories;
const react_1 = __importDefault(require("react"));
const african_man_png_1 = __importDefault(require("@/assets/nerdwork+/african-man.png"));
const users_png_1 = __importDefault(require("@/assets/nerdwork+/users.png"));
const users_mobile_png_1 = __importDefault(require("@/assets/nerdwork+/users-mobile.png"));
const image_1 = __importDefault(require("next/image"));
const features = [
    {
        heading: "Easy to Start",
        content: "Adjust text size, language (English, Swahili, Yoruba), or dark mode",
    },
    {
        heading: "Grow your Audience",
        content: "Turn your ideas into panels with easy-to-use tools.",
    },
    {
        heading: "Monetise your content",
        content: "Turn your ideas into panels with easy-to-use tools.",
    },
];
function Stories() {
    return (<div data-testid="stories">
      <section className="text-white font-inter md:text-center max-w-[1600px] mx-auto mb-16 flex flex-col gap-20 items-center">
        <div className="flex flex-col gap-6 max-w-[606px] px-7">
          <h2 className="font-obostar text-[40px] max-md:text-[24px]">
            Find New Stories
          </h2>
          <p className="font-medium max-md:text-sm">
            Read tales inspired by tradition, modern life, and bold futures. All
            crafted by African creators.
          </p>
        </div>
        <div data-testid="gallery" className="h-[450px] w-full bg-[url('/nerdwork+/gallery.png')] bg-cover md:bg-center bg-no-repeat z-0"/>
        <section className="flex max-md:flex-col max-md:text-sm justify-between gap-8 md:gap-16 text-left max-w-[1080px] px-7">
          <div>
            <p className="font-medium mb-1">Original N+ Comic</p>
            <p className="text-[#FFFFFF99]">
              What best describes your story. Use eye catching
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">Personalised content</p>
            <p className="text-[#FFFFFF99]">
              What best describes your story. Use eye catching
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">Expert Recommendations</p>
            <p className="text-[#FFFFFF99]">
              Bring your story to life with unique personalities.
            </p>
          </div>
        </section>
      </section>

      <section className="text-white font-inter max-w-[1130px] mx-auto py-16 flex max-lg:flex-col lg:items-center">
        <section className="lg:w-[40%] max-lg:px-7 lg:pl-7">
          <h2 className="font-obostar text-[40px] max-md:text-[24px] mb-6">
            Create your Narratives
          </h2>
          <p className="max-md:text-sm max-md:font-semibold">
            Find the community that speaks to you. Talk about storylines,
            characters and tropes with readers and creators
          </p>

          <div className="mt-24 flex flex-col gap-6 max-md:hidden">
            {features.map((feat, index) => (<div key={index} className="bg-[#131313] px-6 py-4 rounded-[8px]">
                <p>{feat.heading}</p>
                <p className="text-[#ADACAA]">{feat.content}</p>
              </div>))}
          </div>
        </section>
        <figure className="lg:w-[65%]">
          <image_1.default src={african_man_png_1.default} width={1324} height={1123} alt="black african man comic image"/>
        </figure>
        <div className="-mt-24 flex flex-col gap-6 md:hidden text-sm max-lg:px-7">
          {features.map((feat, index) => (<div key={index} className="bg-[#131313] px-6 py-4 rounded-[8px]">
              <p>{feat.heading}</p>
              <p className="text-[#ADACAA]">{feat.content}</p>
            </div>))}
        </div>
      </section>

      <section className="text-white md:text-center font-inter max-w-[1600px] mx-auto py-16 md:mb-16 flex flex-col items-center">
        <div className="max-w-[738px] px-7 flex flex-col gap-4">
          <h2 className="font-obostar text-[40px] max-md:text-2xl">
            Engage with the Platform
          </h2>
          <p className="max-md:text-sm">
            Find the community that speaks to you. Talk about storylines,
            <br className="max-md:hidden"/>
            characters and tropes with readers and creators
          </p>
        </div>
        <image_1.default src={users_png_1.default} width={2344} height={899} className="-mt-20 max-md:hidden" alt="User icons"/>
        <image_1.default src={users_mobile_png_1.default} width={430} height={422} className="md:hidden mt-2 w-full" alt="User icons"/>
      </section>
    </div>);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3Rvcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlN0b3JpZXMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBdUJBLDBCQXdHQztBQS9IRCxrREFBMEI7QUFDMUIseUZBQTREO0FBQzVELDZFQUFxRDtBQUNyRCwyRkFBOEQ7QUFFOUQsdURBQStCO0FBRS9CLE1BQU0sUUFBUSxHQUFHO0lBQ2Y7UUFDRSxPQUFPLEVBQUUsZUFBZTtRQUN4QixPQUFPLEVBQ0wscUVBQXFFO0tBQ3hFO0lBQ0Q7UUFDRSxPQUFPLEVBQUUsb0JBQW9CO1FBQzdCLE9BQU8sRUFBRSxxREFBcUQ7S0FDL0Q7SUFDRDtRQUNFLE9BQU8sRUFBRSx1QkFBdUI7UUFDaEMsT0FBTyxFQUFFLHFEQUFxRDtLQUMvRDtDQUNGLENBQUM7QUFFRixTQUF3QixPQUFPO0lBQzdCLE9BQU8sQ0FDTCxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUN4QjtNQUFBLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxxR0FBcUcsQ0FDdEg7UUFBQSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsd0NBQXdDLENBQ3JEO1VBQUEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLDZDQUE2QyxDQUN6RDs7VUFDRixFQUFFLEVBQUUsQ0FDSjtVQUFBLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyw0QkFBNEIsQ0FDdkM7OztVQUVGLEVBQUUsQ0FBQyxDQUNMO1FBQUEsRUFBRSxHQUFHLENBQ0w7UUFBQSxDQUFDLEdBQUcsQ0FDRixXQUFXLENBQUMsU0FBUyxDQUNyQixTQUFTLENBQUMsNEZBQTRGLEVBRXhHO1FBQUEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLG1HQUFtRyxDQUNwSDtVQUFBLENBQUMsR0FBRyxDQUNGO1lBQUEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FDcEQ7WUFBQSxDQUFDLENBQUMsQ0FBQyxTQUFTLENB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Q0o7VUFBQSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQzNCOztZQUNBLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQzdCOztVQUNGLEVBQUUsQ0FBQyxDQUNMO1FBQUEsRUFBRSxHQUFHLENBQ0w7UUFBQSxDQUFDLGVBQUssQ0FDSixHQUFHLENBQUMsQ0FBQyxtQkFBUyxDQUFDLENBQ2YsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQ1osTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQ1osU0FBUyxDQUFDLHNCQUFzQixDQUNoQyxHQUFHLENBQUMsWUFBWSxFQUVsQjtRQUFBLENBQUMsZUFBSyxDQUNKLEdBQUcsQ0FBQyxDQUFDLDBCQUFXLENBQUMsQ0FDakIsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQ1gsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQ1osU0FBUyxDQUFDLHVCQUF1QixDQUNqQyxHQUFHLENBQUMsWUFBWSxFQUVwQjtNQUFBLEVBQUUsT0FBTyxDQUNYO0lBQUEsRUFBRSxHQUFHLENBQUMsQ0FDUCxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IEFmcmljYW5NYW4gZnJvbSBcIkAvYXNzZXRzL25lcmR3b3JrKy9hZnJpY2FuLW1hbi5wbmdcIjtcclxuaW1wb3J0IFVzZXJJY29ucyBmcm9tIFwiQC9hc3NldHMvbmVyZHdvcmsrL3VzZXJzLnBuZ1wiO1xyXG5pbXBvcnQgVXNlcnNNb2JpbGUgZnJvbSBcIkAvYXNzZXRzL25lcmR3b3JrKy91c2Vycy1tb2JpbGUucG5nXCI7XHJcblxyXG5pbXBvcnQgSW1hZ2UgZnJvbSBcIm5leHQvaW1hZ2VcIjtcclxuXHJcbmNvbnN0IGZlYXR1cmVzID0gW1xyXG4gIHtcclxuICAgIGhlYWRpbmc6IFwiRWFzeSB0byBTdGFydFwiLFxyXG4gICAgY29udGVudDpcclxuICAgICAgXCJBZGp1c3QgdGV4dCBzaXplLCBsYW5ndWFnZSAoRW5nbGlzaCwgU3dhaGlsaSwgWW9ydWJhKSwgb3IgZGFyayBtb2RlXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBoZWFkaW5nOiBcIkdyb3cgeW91ciBBdWRpZW5jZVwiLFxyXG4gICAgY29udGVudDogXCJUdXJuIHlvdXIgaWRlYXMgaW50byBwYW5lbHMgd2l0aCBlYXN5LXRvLXVzZSB0b29scy5cIixcclxuICB9LFxyXG4gIHtcclxuICAgIGhlYWRpbmc6IFwiTW9uZXRpc2UgeW91ciBjb250ZW50XCIsXHJcbiAgICBjb250ZW50OiBcIlR1cm4geW91ciBpZGVhcyBpbnRvIHBhbmVscyB3aXRoIGVhc3ktdG8tdXNlIHRvb2xzLlwiLFxyXG4gIH0sXHJcbl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdG9yaWVzKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGRhdGEtdGVzdGlkPVwic3Rvcmllc1wiPlxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlIGZvbnQtaW50ZXIgbWQ6dGV4dC1jZW50ZXIgbWF4LXctWzE2MDBweF0gbXgtYXV0byBtYi0xNiBmbGV4IGZsZXgtY29sIGdhcC0yMCBpdGVtcy1jZW50ZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTYgbWF4LXctWzYwNnB4XSBweC03XCI+XHJcbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwiZm9udC1vYm9zdGFyIHRleHQtWzQwcHhdIG1heC1tZDp0ZXh0LVsyNHB4XVwiPlxyXG4gICAgICAgICAgICBGaW5kIE5ldyBTdG9yaWVzXHJcbiAgICAgICAgICA8L2gyPlxyXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1tZWRpdW0gbWF4LW1kOnRleHQtc21cIj5cclxuICAgICAgICAgICAgUmVhZCB0YWxlcyBpbnNwaXJlZCBieSB0cmFkaXRpb24sIG1vZGVybiBsaWZlLCBhbmQgYm9sZCBmdXR1cmVzLiBBbGxcclxuICAgICAgICAgICAgY3JhZnRlZCBieSBBZnJpY2FuIGNyZWF0b3JzLlxyXG4gICAgICAgICAgPC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGRhdGEtdGVzdGlkPVwiZ2FsbGVyeVwiXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJoLVs0NTBweF0gdy1mdWxsIGJnLVt1cmwoJy9uZXJkd29yaysvZ2FsbGVyeS5wbmcnKV0gYmctY292ZXIgbWQ6YmctY2VudGVyIGJnLW5vLXJlcGVhdCB6LTBcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiZmxleCBtYXgtbWQ6ZmxleC1jb2wgbWF4LW1kOnRleHQtc20ganVzdGlmeS1iZXR3ZWVuIGdhcC04IG1kOmdhcC0xNiB0ZXh0LWxlZnQgbWF4LXctWzEwODBweF0gcHgtN1wiPlxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1tZWRpdW0gbWItMVwiPk9yaWdpbmFsIE4rIENvbWljPC9wPlxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsjRkZGRkZGOTldXCI+XHJcbiAgICAgICAgICAgICAgV2hhdCBiZXN0IGRlc2NyaWJlcyB5b3VyIHN0b3J5LiBVc2UgZXllIGNhdGNoaW5nXHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1tZWRpdW0gbWItMVwiPlBlcnNvbmFsaXNlZCBjb250ZW50PC9wPlxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsjRkZGRkZGOTldXCI+XHJcbiAgICAgICAgICAgICAgV2hhdCBiZXN0IGRlc2NyaWJlcyB5b3VyIHN0b3J5LiBVc2UgZXllIGNhdGNoaW5nXHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1tZWRpdW0gbWItMVwiPkV4cGVydCBSZWNvbW1lbmRhdGlvbnM8L3A+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWyNGRkZGRkY5OV1cIj5cclxuICAgICAgICAgICAgICBCcmluZyB5b3VyIHN0b3J5IHRvIGxpZmUgd2l0aCB1bmlxdWUgcGVyc29uYWxpdGllcy5cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlIGZvbnQtaW50ZXIgbWF4LXctWzExMzBweF0gbXgtYXV0byBweS0xNiBmbGV4IG1heC1sZzpmbGV4LWNvbCBsZzppdGVtcy1jZW50ZXJcIj5cclxuICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJsZzp3LVs0MCVdIG1heC1sZzpweC03IGxnOnBsLTdcIj5cclxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJmb250LW9ib3N0YXIgdGV4dC1bNDBweF0gbWF4LW1kOnRleHQtWzI0cHhdIG1iLTZcIj5cclxuICAgICAgICAgICAgQ3JlYXRlIHlvdXIgTmFycmF0aXZlc1xyXG4gICAgICAgICAgPC9oMj5cclxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm1heC1tZDp0ZXh0LXNtIG1heC1tZDpmb250LXNlbWlib2xkXCI+XHJcbiAgICAgICAgICAgIEZpbmQgdGhlIGNvbW11bml0eSB0aGF0IHNwZWFrcyB0byB5b3UuIFRhbGsgYWJvdXQgc3RvcnlsaW5lcyxcclxuICAgICAgICAgICAgY2hhcmFjdGVycyBhbmQgdHJvcGVzIHdpdGggcmVhZGVycyBhbmQgY3JlYXRvcnNcclxuICAgICAgICAgIDwvcD5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTI0IGZsZXggZmxleC1jb2wgZ2FwLTYgbWF4LW1kOmhpZGRlblwiPlxyXG4gICAgICAgICAgICB7ZmVhdHVyZXMubWFwKChmZWF0LCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtpbmRleH0gY2xhc3NOYW1lPVwiYmctWyMxMzEzMTNdIHB4LTYgcHktNCByb3VuZGVkLVs4cHhdXCI+XHJcbiAgICAgICAgICAgICAgICA8cD57ZmVhdC5oZWFkaW5nfTwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWyNBREFDQUFdXCI+e2ZlYXQuY29udGVudH08L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgIDxmaWd1cmUgY2xhc3NOYW1lPVwibGc6dy1bNjUlXVwiPlxyXG4gICAgICAgICAgPEltYWdlXHJcbiAgICAgICAgICAgIHNyYz17QWZyaWNhbk1hbn1cclxuICAgICAgICAgICAgd2lkdGg9ezEzMjR9XHJcbiAgICAgICAgICAgIGhlaWdodD17MTEyM31cclxuICAgICAgICAgICAgYWx0PVwiYmxhY2sgYWZyaWNhbiBtYW4gY29taWMgaW1hZ2VcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2ZpZ3VyZT5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIi1tdC0yNCBmbGV4IGZsZXgtY29sIGdhcC02IG1kOmhpZGRlbiB0ZXh0LXNtIG1heC1sZzpweC03XCI+XHJcbiAgICAgICAgICB7ZmVhdHVyZXMubWFwKChmZWF0LCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICA8ZGl2IGtleT17aW5kZXh9IGNsYXNzTmFtZT1cImJnLVsjMTMxMzEzXSBweC02IHB5LTQgcm91bmRlZC1bOHB4XVwiPlxyXG4gICAgICAgICAgICAgIDxwPntmZWF0LmhlYWRpbmd9PC9wPlxyXG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWyNBREFDQUFdXCI+e2ZlYXQuY29udGVudH08L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInRleHQtd2hpdGUgbWQ6dGV4dC1jZW50ZXIgZm9udC1pbnRlciBtYXgtdy1bMTYwMHB4XSBteC1hdXRvIHB5LTE2IG1kOm1iLTE2IGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy1bNzM4cHhdIHB4LTcgZmxleCBmbGV4LWNvbCBnYXAtNFwiPlxyXG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cImZvbnQtb2Jvc3RhciB0ZXh0LVs0MHB4XSBtYXgtbWQ6dGV4dC0yeGxcIj5cclxuICAgICAgICAgICAgRW5nYWdlIHdpdGggdGhlIFBsYXRmb3JtXHJcbiAgICAgICAgICA8L2gyPlxyXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwibWF4LW1kOnRleHQtc21cIj5cclxuICAgICAgICAgICAgRmluZCB0aGUgY29tbXVuaXR5IHRoYXQgc3BlYWtzIHRvIHlvdS4gVGFsayBhYm91dCBzdG9yeWxpbmVzLFxyXG4gICAgICAgICAgICA8YnIgY2xhc3NOYW1lPVwibWF4LW1kOmhpZGRlblwiIC8+XHJcbiAgICAgICAgICAgIGNoYXJhY3RlcnMgYW5kIHRyb3BlcyB3aXRoIHJlYWRlcnMgYW5kIGNyZWF0b3JzXHJcbiAgICAgICAgICA8L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPEltYWdlXHJcbiAgICAgICAgICBzcmM9e1VzZXJJY29uc31cclxuICAgICAgICAgIHdpZHRoPXsyMzQ0fVxyXG4gICAgICAgICAgaGVpZ2h0PXs4OTl9XHJcbiAgICAgICAgICBjbGFzc05hbWU9XCItbXQtMjAgbWF4LW1kOmhpZGRlblwiXHJcbiAgICAgICAgICBhbHQ9XCJVc2VyIGljb25zXCJcclxuICAgICAgICAvPlxyXG4gICAgICAgIDxJbWFnZVxyXG4gICAgICAgICAgc3JjPXtVc2Vyc01vYmlsZX1cclxuICAgICAgICAgIHdpZHRoPXs0MzB9XHJcbiAgICAgICAgICBoZWlnaHQ9ezQyMn1cclxuICAgICAgICAgIGNsYXNzTmFtZT1cIm1kOmhpZGRlbiBtdC0yIHctZnVsbFwiXHJcbiAgICAgICAgICBhbHQ9XCJVc2VyIGljb25zXCJcclxuICAgICAgICAvPlxyXG4gICAgICA8L3NlY3Rpb24+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbiJdfQ==