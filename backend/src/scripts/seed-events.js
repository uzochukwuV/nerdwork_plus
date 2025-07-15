import { db } from "../config/db";
import { events } from "../model/schema";
async function seedEvents() {
    await db.insert(events).values([
        {
            name: "Nerdwork Launch Summit",
            description: "A launch event for the Nerdwork+ community platform.",
            date: new Date("2025-08-15T18:00:00Z"),
            ticketPrice: 2500,
        },
    ]);
    console.log("Event seeded successfully.");
}
seedEvents().catch((err) => {
    console.error("Seeding failed:", err);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZC1ldmVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZWVkLWV2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxLQUFLLFVBQVUsVUFBVTtJQUN2QixNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQzdCO1lBQ0UsSUFBSSxFQUFFLHdCQUF3QjtZQUM5QixXQUFXLEVBQUUsc0RBQXNEO1lBQ25FLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztZQUN0QyxXQUFXLEVBQUUsSUFBSTtTQUNsQjtLQUNGLENBQUMsQ0FBQztJQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBRUQsVUFBVSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDekIsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN4QyxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSBcIi4uL2NvbmZpZy9kYlwiO1xyXG5pbXBvcnQgeyBldmVudHMgfSBmcm9tIFwiLi4vbW9kZWwvc2NoZW1hXCI7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBzZWVkRXZlbnRzKCkge1xyXG4gIGF3YWl0IGRiLmluc2VydChldmVudHMpLnZhbHVlcyhbXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6IFwiTmVyZHdvcmsgTGF1bmNoIFN1bW1pdFwiLFxyXG4gICAgICBkZXNjcmlwdGlvbjogXCJBIGxhdW5jaCBldmVudCBmb3IgdGhlIE5lcmR3b3JrKyBjb21tdW5pdHkgcGxhdGZvcm0uXCIsXHJcbiAgICAgIGRhdGU6IG5ldyBEYXRlKFwiMjAyNS0wOC0xNVQxODowMDowMFpcIiksXHJcbiAgICAgIHRpY2tldFByaWNlOiAyNTAwLFxyXG4gICAgfSxcclxuICBdKTtcclxuICBjb25zb2xlLmxvZyhcIkV2ZW50IHNlZWRlZCBzdWNjZXNzZnVsbHkuXCIpO1xyXG59XHJcblxyXG5zZWVkRXZlbnRzKCkuY2F0Y2goKGVycikgPT4ge1xyXG4gIGNvbnNvbGUuZXJyb3IoXCJTZWVkaW5nIGZhaWxlZDpcIiwgZXJyKTtcclxufSk7XHJcbiJdfQ==