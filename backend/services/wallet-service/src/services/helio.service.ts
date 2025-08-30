import axios from 'axios';

interface HelioConfig {
  apiKey: string;
  baseUrl: string;
  cluster: 'devnet' | 'mainnet';
}

interface CreatePaymentLinkRequest {
  productName: string;
  productDescription: string;
  productImage?: string;
  price: number;
  currency: 'USDC' | 'SOL';
  receiverWallet: string;
  redirectUrl?: string;
  metadata?: Record<string, any>;
}

interface PaymentLinkResponse {
  id: string;
  url: string;
  qrCode: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
}

interface CheckPaymentStatusResponse {
  id: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  transactionHash?: string;
  amount: number;
  currency: string;
  paidAt?: string;
  metadata?: Record<string, any>;
}

class HelioService {
  private config: HelioConfig;

  constructor(config: HelioConfig) {
    this.config = config;
  }

  async createPaymentLink(request: CreatePaymentLinkRequest): Promise<PaymentLinkResponse> {
    try {
      const response = await axios.post(
        `${this.config.baseUrl}/v1/payments/create`,
        {
          product: {
            name: request.productName,
            description: request.productDescription,
            image: request.productImage,
          },
          amount: request.price,
          currency: request.currency,
          receiver: request.receiverWallet,
          redirect_url: request.redirectUrl,
          cluster: this.config.cluster,
          metadata: request.metadata,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        id: response.data.id,
        url: response.data.url,
        qrCode: response.data.qr_code,
        status: response.data.status,
      };
    } catch (error: any) {
      console.error('Helio create payment link error:', error.response?.data || error.message);
      throw new Error(`Failed to create payment link: ${error.response?.data?.message || error.message}`);
    }
  }

  async checkPaymentStatus(paymentId: string): Promise<CheckPaymentStatusResponse> {
    try {
      const response = await axios.get(
        `${this.config.baseUrl}/v1/payments/${paymentId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
          },
        }
      );

      return {
        id: response.data.id,
        status: response.data.status,
        transactionHash: response.data.transaction_hash,
        amount: response.data.amount,
        currency: response.data.currency,
        paidAt: response.data.paid_at,
        metadata: response.data.metadata,
      };
    } catch (error: any) {
      console.error('Helio check payment status error:', error.response?.data || error.message);
      throw new Error(`Failed to check payment status: ${error.response?.data?.message || error.message}`);
    }
  }

  async processWebhook(payload: any, signature: string): Promise<CheckPaymentStatusResponse> {
    // TODO: Implement webhook signature verification
    // For now, we'll process the webhook payload directly
    
    return {
      id: payload.id,
      status: payload.status,
      transactionHash: payload.transaction_hash,
      amount: payload.amount,
      currency: payload.currency,
      paidAt: payload.paid_at,
      metadata: payload.metadata,
    };
  }
}

export default HelioService;
export type { 
  HelioConfig, 
  CreatePaymentLinkRequest, 
  PaymentLinkResponse, 
  CheckPaymentStatusResponse 
};