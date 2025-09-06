import serverless from 'serverless-http';
import { app } from './index.js';
// Export the serverless handler
export const handler = serverless(app, {
    request: (request, event, context) => {
        // Add custom request processing if needed
        console.log('Request:', {
            method: request.method,
            path: request.path,
            headers: request.headers,
        });
    },
    response: (response, request, event, context) => {
        // Add custom response processing if needed
        console.log('Response:', {
            statusCode: response.statusCode,
            headers: response.headers,
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFtYmRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGFtYmRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFakMsZ0NBQWdDO0FBQ2hDLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO0lBQ3JDLE9BQU8sRUFBRSxDQUFDLE9BQVksRUFBRSxLQUFVLEVBQUUsT0FBWSxFQUFFLEVBQUU7UUFDbEQsMENBQTBDO1FBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFO1lBQ3RCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtZQUN0QixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7WUFDbEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1NBQ3pCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxRQUFRLEVBQUUsQ0FBQyxRQUFhLEVBQUUsT0FBWSxFQUFFLEtBQVUsRUFBRSxPQUFZLEVBQUUsRUFBRTtRQUNsRSwyQ0FBMkM7UUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUU7WUFDdkIsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVO1lBQy9CLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTztTQUMxQixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNlcnZlcmxlc3MgZnJvbSAnc2VydmVybGVzcy1odHRwJztcclxuaW1wb3J0IHsgYXBwIH0gZnJvbSAnLi9pbmRleC5qcyc7XHJcblxyXG4vLyBFeHBvcnQgdGhlIHNlcnZlcmxlc3MgaGFuZGxlclxyXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IHNlcnZlcmxlc3MoYXBwLCB7XHJcbiAgcmVxdWVzdDogKHJlcXVlc3Q6IGFueSwgZXZlbnQ6IGFueSwgY29udGV4dDogYW55KSA9PiB7XHJcbiAgICAvLyBBZGQgY3VzdG9tIHJlcXVlc3QgcHJvY2Vzc2luZyBpZiBuZWVkZWRcclxuICAgIGNvbnNvbGUubG9nKCdSZXF1ZXN0OicsIHtcclxuICAgICAgbWV0aG9kOiByZXF1ZXN0Lm1ldGhvZCxcclxuICAgICAgcGF0aDogcmVxdWVzdC5wYXRoLFxyXG4gICAgICBoZWFkZXJzOiByZXF1ZXN0LmhlYWRlcnMsXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHJlc3BvbnNlOiAocmVzcG9uc2U6IGFueSwgcmVxdWVzdDogYW55LCBldmVudDogYW55LCBjb250ZXh0OiBhbnkpID0+IHtcclxuICAgIC8vIEFkZCBjdXN0b20gcmVzcG9uc2UgcHJvY2Vzc2luZyBpZiBuZWVkZWRcclxuICAgIGNvbnNvbGUubG9nKCdSZXNwb25zZTonLCB7XHJcbiAgICAgIHN0YXR1c0NvZGU6IHJlc3BvbnNlLnN0YXR1c0NvZGUsXHJcbiAgICAgIGhlYWRlcnM6IHJlc3BvbnNlLmhlYWRlcnMsXHJcbiAgICB9KTtcclxuICB9LFxyXG59KTtcclxuIl19