import { axiosPost } from "./apiClientAuth";

export interface CreatePaymentLinkRequest {
  amount: number;
  name?: string;
}

export interface CreatePaymentLinkResponse {
  success: boolean;
  payment: {
    id: string;
    price: string;
    currency?: {
      symbol: string;
    };
    url: string;
  };
  paylinkId: string;
}

export interface CreateWebhookRequest {
  paymentId: string;
}

export interface CreateWebhookResponse {
  success: boolean;
  data: {
    id: string;
  };
}

/**
 * Creates a Helio payment link for NWT token purchase
 */
export const createPaymentLink = async (
  request: CreatePaymentLinkRequest
): Promise<CreatePaymentLinkResponse> => {
  const response = await axiosPost<CreatePaymentLinkResponse>(
    "/payment/helio/link",
    request
  );
  return response.data;
};

/**
 * Creates a webhook for payment notifications
 */
export const createPaymentWebhook = async (
  request: CreateWebhookRequest
): Promise<CreateWebhookResponse> => {
  const response = await axiosPost<CreateWebhookResponse>(
    "/payment/helio/webhook/create",
    request
  );
  return response.data;
};